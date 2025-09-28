export const metadata = { title: "Timetable" };

function getTodayISO() {
	return new Date().toISOString().slice(0, 10);
}

export default async function TimetablePage({ searchParams }) {
    const params = await searchParams;
	const date = params?.date || getTodayISO();
	// rsc: compute a simple static grid for now
	const mechanics = ["Mike Johnson", "Sarah Wilson", "Alex Chen"];
	const hours = Array.from({ length: 9 }, (_, i) => 9 + i); // 9-17
	return (
		<div className="container-fluid">
			<div className="d-flex align-items-center justify-content-between mb-3">
				<h2 className="h4">Timetable</h2>
				<div className="d-flex gap-2">
					<button className="btn btn-outline-secondary">Previous</button>
					<div className="btn btn-light disabled">{new Date(date).toDateString()}</div>
					<button className="btn btn-outline-secondary">Next</button>
				</div>
			</div>
			<div className="table-responsive">
				<table className="table table-bordered align-middle">
					<thead>
						<tr>
							<th style={{ width: 100 }}>Time</th>
							{mechanics.map((m) => (
								<th key={m}>{m}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{hours.map((h) => (
							<tr key={h}>
								<th>{String(h).padStart(2, "0")}:00</th>
								{mechanics.map((m, i) => (
									<td key={m + i} style={{ height: 80 }}>
										{/* render empty slot placeholder */}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
