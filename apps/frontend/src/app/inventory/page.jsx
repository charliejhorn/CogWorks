export const metadata = { title: "Inventory" };

export default async function InventoryPage() {
	return (
		<div className="container-fluid">
			<div className="d-flex align-items-center justify-content-between mb-3">
				<h2 className="h4">Inventory</h2>
				<button className="btn btn-primary">Add Item</button>
			</div>
			<div className="d-flex gap-2 mb-3">
				<input className="form-control w-auto" placeholder="Search inventory..." />
				<select className="form-select w-auto">
					<option>All</option>
					<option>Low Stock</option>
					<option>In Stock</option>
				</select>
			</div>
			<div className="row g-3">
				{Array.from({ length: 12 }).map((_, i) => (
					<div key={i} className="col-12 col-md-6 col-lg-4 col-xl-3">
						<div className="card h-100">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<strong>Brake Pads - Shimano</strong>
									<span className="badge bg-warning text-dark">Medium</span>
								</div>
								<div className="small text-muted">SKU: BRK-{1000 + i}</div>
								<div className="small text-muted">Qty: {10 + i}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
