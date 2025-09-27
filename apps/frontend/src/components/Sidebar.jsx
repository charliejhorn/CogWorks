import React from "react";
import Link from "next/link";

export default function Sidebar() {
	return (
		<nav className="d-flex flex-column gap-2 p-3 border-end" style={{ minWidth: 240 }} aria-label="Primary">
			<div className="d-flex align-items-center mb-2">
				<span className="fw-bold">CogWorks</span>
			</div>
			<Link className="btn btn-light text-start" href="/">Dashboard</Link>
			<Link className="btn btn-light text-start" href="/jobs">Jobs</Link>
			<Link className="btn btn-light text-start" href="/customers">Customers</Link>
			<Link className="btn btn-light text-start" href="/inventory">Inventory</Link>
			<Link className="btn btn-light text-start" href="/timetable">Timetable</Link>
		</nav>
	);
}
