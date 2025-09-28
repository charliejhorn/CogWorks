export const metadata = { title: "Customers" };

export default async function CustomersPage() {
	return (
		<div className="container-fluid">
			<div className="d-flex align-items-center justify-content-between mb-3">
				<h2 className="h4">Customers</h2>
				<button className="btn btn-primary">New Customer</button>
			</div>
			<div className="mb-3">
				<input className="form-control" placeholder="Search customers..." />
			</div>
			<div className="row g-3">
				{Array.from({ length: 8 }).map((_, i) => (
					<div key={i} className="col-12 col-md-6 col-lg-4 col-xl-3">
						<div className="card h-100">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<strong>John Smith</strong>
									<span className="badge bg-secondary">9 jobs</span>
								</div>
								<div className="small text-muted">john@email.com</div>
								<div className="small text-muted">last visit: {i + 1} days ago</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
