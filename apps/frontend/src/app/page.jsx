// this is the main entry point for the CogWorks application
import React from 'react';

export const metadata = { title: "Dashboard" };

export default async function HomePage() {
    // render dashboard cards per wireframe with static placeholders
    const metrics = [
        { label: 'Active Jobs', value: 12, delta: '+2 from yesterday', variant: 'primary' },
        { label: 'Queued Jobs', value: 8, delta: '—', variant: 'secondary' },
        { label: 'Completed Today', value: 5, delta: '25% vs avg', variant: 'success' },
        { label: 'Low Stock Items', value: 3, delta: 'needs attention', variant: 'danger' },
    ];
    const recent = Array.from({ length: 5 }).map((_, i) => ({
        title: `Brake Repair - Trek 7.${i+1}`,
        customer: 'John Smith',
        status: i % 3 === 0 ? 'Queued' : i % 3 === 1 ? 'In Progress' : 'Completed',
    }));
    const updates = [
        '#1234 started',
        'Mike - ETA 20 min',
        '#1210 completed',
        'SKU BRK-1001 low stock',
        '#1215 paused',
    ];
    return (
        <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="h4">Dashboard</h2>
            </div>

            <div className="row g-3 mb-3">
                {metrics.map((m) => (
                    <div key={m.label} className="col-12 col-sm-6 col-lg-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-baseline justify-content-between">
                                    <div>
                                        <div className="fs-4 fw-bold">{m.value}</div>
                                        <div className="text-muted small">{m.label}</div>
                                    </div>
                                    <span className={`badge bg-${m.variant}`}></span>
                                </div>
                                <div className="small text-muted mt-2">{m.delta}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-3">
                <div className="col-12 col-lg-8">
                    <div className="card h-100">
                        <div className="card-header">Recent Jobs</div>
                        <div className="list-group list-group-flush">
                            {recent.map((r, i) => (
                                <div key={i} className="list-group-item d-flex align-items-center justify-content-between">
                                    <div>
                                        <div className="fw-semibold">{r.title}</div>
                                        <div className="small text-muted">Customer: {r.customer}</div>
                                    </div>
                                    <span className={`badge ${r.status === 'Completed' ? 'bg-success' : r.status === 'Queued' ? 'bg-secondary' : 'bg-warning text-dark'}`}>{r.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="card h-100">
                        <div className="card-header">Live Updates</div>
                        <ul className="list-group list-group-flush">
                            {updates.map((u, i) => (
                                <li key={i} className="list-group-item small">{u}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}