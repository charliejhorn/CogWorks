export const metadata = { title: "Jobs" };

export default async function JobsPage() {
	// render a skeleton list per wireframe; server component placeholder
	const tabs = ["All Jobs", "In Progress", "Queued", "Completed"];
	return (
		<div className="container-fluid">
			<div className="d-flex align-items-center justify-content-between mb-3">
				<h2 className="h4">Jobs</h2>
				<button className="btn btn-primary">New Job</button>
			</div>
			<div className="mb-3 d-flex gap-2">
				<input className="form-control w-auto" placeholder="Search jobs..." />
				<button className="btn btn-outline-secondary">Filters</button>
			</div>
			<ul className="nav nav-pills mb-3">
				{tabs.map((t) => (
					<li className="nav-item" key={t}>
						<a className="nav-link" aria-current="page">{t}</a>
					</li>
				))}
			</ul>
			<div className="list-group">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="list-group-item d-flex justify-content-between align-items-center">
						<div>
							<div className="fw-semibold">#12{i} Brake Adjustment</div>
							<small className="text-muted">Customer: John Smith • Mechanic: Mike Johnson</small>
						</div>
						<span className="badge bg-warning text-dark">In Progress</span>
					</div>
				))}
			</div>
		</div>
	);
}
