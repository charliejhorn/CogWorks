const express = require('express');
const router = express.Router();
const { initFirebase } = require('../lib/firebase');
const { httpError } = require('../lib/errors');
const { requireFields, allowOnly } = require('../lib/validators');

const db = initFirebase();
if (!db) {
  // create a minimal router that returns service unavailable
  router.use((req, res) => res.status(503).json({ error: 'firestore not configured' }));
  module.exports = router;
  return;
}
const COL = 'customers';

// list customers
router.get('/', async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit || 50), 200);
    let q = db.collection(COL).orderBy('createdAt', 'desc').limit(limit);
    const snap = await q.get();
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json({ items: data });
  } catch (e) { next(e); }
});

// get one
router.get('/:id', async (req, res, next) => {
  try {
    const doc = await db.collection(COL).doc(req.params.id).get();
    if (!doc.exists) return next(httpError(404, 'not found'));
    res.json({ id: doc.id, ...doc.data() });
  } catch (e) { next(e); }
});

// create
router.post('/', async (req, res, next) => {
  try {
    const allowed = ['name', 'email', 'phone', 'notes', 'vehicles'];
    const data = allowOnly(req.body || {}, allowed);
    const err = requireFields(data, ['name']);
    if (err) return next(httpError(400, err));
    const now = Date.now();
    data.createdAt = now; data.updatedAt = now;
    const ref = await db.collection(COL).add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (e) { next(e); }
});

// update
router.patch('/:id', async (req, res, next) => {
  try {
    const allowed = ['name', 'email', 'phone', 'notes', 'vehicles'];
    const patch = allowOnly(req.body || {}, allowed);
    if (!Object.keys(patch).length) return next(httpError(400, 'no valid fields'));
    patch.updatedAt = Date.now();
    const ref = db.collection(COL).doc(req.params.id);
    const doc = await ref.get();
    if (!doc.exists) return next(httpError(404, 'not found'));
    await ref.update(patch);
    res.json({ id: ref.id, ...doc.data(), ...patch });
  } catch (e) { next(e); }
});

module.exports = router;
