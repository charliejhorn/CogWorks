export default function Loading() {
	return (
		<div className="p-3">
			<div className="placeholder-glow">
				<div className="placeholder col-4 mb-3"></div>
				<div className="row g-3">
					{Array.from({ length: 8 }).map((_, i) => (
						<div key={i} className="col-12 col-md-6 col-lg-4 col-xl-3">
							<div className="card h-100 p-3">
								<div className="placeholder col-8 mb-2"></div>
								<div className="placeholder col-10"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
