"use client";

import Sidebar from "@/components/Sidebar";

export default function HomePage() {
    const recent = Array.from({ length: 5 }).map((_, i) => ({
        title: `Brake Repair - Trek 7.${i + 1}`,
        customer: "John Smith",
        status:
            i % 3 === 0 ? "Queued" : i % 3 === 1 ? "In Progress" : "Completed",
    }));

    return (
        <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="h4">Dashboard</h2>
            </div>
            <div className="card h-100">
                <div className="card-header">Recent Jobs</div>
                <div className="list-group list-group-flush">
                    {recent.map((r, i) => (
                        <div
                            key={i}
                            className="list-group-item d-flex align-items-center justify-content-between"
                        >
                            <div>
                                <div className="fw-semibold">{r.title}</div>
                                <div className="small text-muted">
                                    Customer: {r.customer}
                                </div>
                            </div>
                            <span
                                className={`badge ${
                                    r.status === "Completed"
                                        ? "bg-success"
                                        : r.status === "Queued"
                                        ? "bg-secondary"
                                        : "bg-warning text-dark"
                                }`}
                            >
                                {r.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
