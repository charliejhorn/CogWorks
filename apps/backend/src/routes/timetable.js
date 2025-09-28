const express = require('express');
const router = express.Router();
const { initFirebase } = require('../lib/firebase');
const { httpError } = require('../lib/errors');

const db = initFirebase();
if (!db) {
  router.use((req, res) => res.status(503).json({ error: 'firestore not configured' }));
  module.exports = router;
  return;
}

function toDateRange(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
  if (isNaN(d)) return null;
  const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0));
  const end = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 59, 59, 999));
  return { startMs: start.getTime(), endMs: end.getTime() };
}

router.get('/', async (req, res, next) => {
  try {
    const date = req.query.date;
    if (!date) return next(httpError(400, 'date is required'));
    const range = toDateRange(date);
    if (!range) return next(httpError(400, 'invalid date'));
    const slotMinutes = Number(process.env.TIMETABLE_SLOT_MIN || 60);
    const slotsPerDay = Math.ceil((24 * 60) / slotMinutes);
    const slotMs = slotMinutes * 60 * 1000;

    // fetch mechanics and jobs for date
    const [mechsSnap, jobsSnap] = await Promise.all([
      db.collection('mechanics').get(),
      db.collection('jobs')
        .where('start', '>=', range.startMs)
        .where('start', '<=', range.endMs)
        .get(),
    ]);

    const mechanics = mechsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const jobs = jobsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    // initialize structure: slots x mechanics
    const slots = [];
    for (let i = 0; i < slotsPerDay; i++) {
      const start = range.startMs + i * slotMs;
      const end = Math.min(start + slotMs, range.endMs);
      const entry = { start, end, mechanics: {} };
      for (const m of mechanics) entry.mechanics[m.id] = { busy: false, jobIds: [] };
      slots.push(entry);
    }

    // map jobs into slots by overlap and mechanic assignment
    for (const j of jobs) {
      const js = j.start || range.startMs;
      const je = j.end || js + slotMs;
      const sIdx = Math.max(0, Math.floor((js - range.startMs) / slotMs));
      const eIdx = Math.min(slots.length - 1, Math.floor((je - range.startMs) / slotMs));
      for (let i = sIdx; i <= eIdx; i++) {
        if (j.mechanicId && slots[i].mechanics[j.mechanicId]) {
          slots[i].mechanics[j.mechanicId].busy = true;
          slots[i].mechanics[j.mechanicId].jobIds.push(j.id);
        }
      }
    }

    res.json({ date, slotMinutes, mechanics: mechanics.map(m => ({ id: m.id, name: m.name })), slots });
  } catch (e) { next(e); }
});

module.exports = router;
