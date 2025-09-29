require("dotenv").config();
const { initFirebase } = require("../src/lib/firebase");

// sample deterministic data used for seeding (no faker)
const db = initFirebase();
if (!db) {
    // eslint-disable-next-line no-console
    console.error("firestore not configured. check .env");
    process.exit(1);
}

const now = Date.now();
const oneDay = 24 * 60 * 60 * 1000;

async function seed() {
    // eslint-disable-next-line no-console
    console.log("seeding database...");

    const batch = db.batch();

    // create mechanics (hard-coded samples)
    const mechanics = [];
    const sampleMechanics = [
        {
            name: "Alex Morgan",
            email: "alex.morgan@example.com",
            // bike-specific skills
            skills: ["wheel truing", "gear indexing", "tune-up"],
            availability: {
                monday: "09:00-17:00",
                tuesday: "09:00-17:00",
                wednesday: "09:00-17:00",
                thursday: "09:00-17:00",
                friday: "09:00-17:00",
            },
        },
        {
            name: "Jamie Lee",
            email: "jamie.lee@example.com",
            skills: ["brakes", "suspension", "frame repair"],
            availability: {
                monday: "08:00-16:00",
                tuesday: "08:00-16:00",
                wednesday: "08:00-16:00",
                thursday: "08:00-16:00",
                friday: "08:00-16:00",
            },
        },
        {
            name: "Sam Patel",
            email: "sam.patel@example.com",
            skills: ["electrical (e-bikes)", "diagnostics", "battery service"],
            availability: {
                monday: "10:00-18:00",
                tuesday: "10:00-18:00",
                wednesday: "10:00-18:00",
                thursday: "10:00-18:00",
                friday: "10:00-18:00",
            },
        },
    ];

    for (const m of sampleMechanics) {
        const ref = db.collection("mechanics").doc();
        mechanics.push({ id: ref.id });
        batch.set(
            ref,
            Object.assign({}, m, { createdAt: now, updatedAt: now })
        );
    }
    // eslint-disable-next-line no-console
    console.log(`- creating ${mechanics.length} mechanics...`);

    // create customers (hard-coded samples)
    const customers = [];
    const sampleCustomers = [
        {
            name: "Taylor Brooks",
            email: "taylor.brooks@example.com",
            phone: "+61400111222",
            notes: "prefers morning appointments",
            vehicles: [
                {
                    // bike stored in vehicle shape for compatibility
                    make: "Specialized",
                    model: "Allez",
                    year: 2018,
                    vin: "SN-ALZ-2018-001",
                },
            ],
        },
        {
            name: "Morgan Smith",
            email: "morgan.smith@example.com",
            phone: "+61400111333",
            notes: "sensitive to certain lubricants",
            vehicles: [
                {
                    make: "Trek",
                    model: "Domane",
                    year: 2020,
                    vin: "SN-DMN-2020-002",
                },
            ],
        },
        {
            name: "Jordan Casey",
            email: "jordan.casey@example.com",
            phone: "+61400111444",
            notes: "runs a small bike fleet",
            vehicles: [
                {
                    make: "Giant",
                    model: "Escape",
                    year: 2019,
                    vin: "SN-GNT-2019-003",
                },
            ],
        },
        {
            name: "Riley Chen",
            email: "riley.chen@example.com",
            phone: "+61400111555",
            notes: "requires loaner while bike is serviced",
            vehicles: [
                {
                    make: "Cannondale",
                    model: "Synapse",
                    year: 2021,
                    vin: "SN-CND-2021-004",
                },
            ],
        },
        {
            name: "Casey Nguyen",
            email: "casey.nguyen@example.com",
            phone: "+61400111666",
            notes: "prefers OEM parts where possible",
            vehicles: [
                {
                    make: "Santa Cruz",
                    model: "5010",
                    year: 2017,
                    vin: "SN-SCX-2017-005",
                },
            ],
        },
        {
            name: "Avery Johnson",
            email: "avery.johnson@example.com",
            phone: "+61400111777",
            notes: "vip customer",
            vehicles: [
                {
                    make: "Specialized",
                    model: "Turbo Vado (e-bike)",
                    year: 2016,
                    vin: "SN-EVB-2016-006",
                },
            ],
        },
    ];

    for (const c of sampleCustomers) {
        const ref = db.collection("customers").doc();
        customers.push({ id: ref.id });
        batch.set(
            ref,
            Object.assign({}, c, { createdAt: now, updatedAt: now })
        );
    }
    // eslint-disable-next-line no-console
    console.log(`- creating ${customers.length} customers...`);

    // create jobs (hard-coded samples referencing created customers/mechanics)
    const jobs = [];
    const sampleJobs = [
        { title: "Basic tune-up", status: "queued", durationHours: 1.5 },
        { title: "Brake adjustment & bleed", status: "in_progress", durationHours: 2 },
        { title: "Wheel truing", status: "waiting_parts", durationHours: 1 },
        { title: "Gear indexing and setup", status: "queued", durationHours: 1.5 },
        { title: "Tubeless tyre install", status: "completed", durationHours: 1 },
        { title: "Suspension service (fork)", status: "completed", durationHours: 2.5 },
        { title: "E-bike battery diagnostic", status: "in_progress", durationHours: 2 },
        { title: "Frame inspection & alignment", status: "queued", durationHours: 1 },
        { title: "Full service (comprehensive)", status: "queued", durationHours: 4 },
        { title: "Wheelset replacement & setup", status: "waiting_parts", durationHours: 2 },
    ];

    for (let i = 0; i < sampleJobs.length; i++) {
        const ref = db.collection("jobs").doc();
        jobs.push({ id: ref.id });
        const start = now + i * oneDay; // schedule jobs on subsequent days
        const sj = sampleJobs[i];
        const customerRef = customers[i % customers.length].id;
        const mechanicRef = mechanics[i % mechanics.length].id;
        batch.set(ref, {
            title: sj.title,
            customerId: customerRef,
            mechanicId: mechanicRef,
            status: sj.status,
            start: start,
            end: start + Math.floor(sj.durationHours * 60 * 60 * 1000),
            notes: `${sj.title} for customer ${customerRef}`,
            createdAt: now,
            updatedAt: now,
        });
    }
    // eslint-disable-next-line no-console
    console.log(`- creating ${jobs.length} jobs...`);

    await batch.commit();
    // eslint-disable-next-line no-console
    console.log("database seeded successfully!");
}

seed().catch((e) => {
    // eslint-disable-next-line no-console
    console.error("seeding failed:", e);
    process.exit(1);
});
