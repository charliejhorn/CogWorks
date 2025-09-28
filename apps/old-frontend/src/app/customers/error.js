"use client";

export default function Error({ error, reset }) {
	return (
		<div className="alert alert-danger m-3" role="alert">
			<strong>we couldn't load customers.</strong>
			<div className="small text-muted">{error?.message || "unknown error"}</div>
			<button className="btn btn-sm btn-light ms-2" onClick={() => reset?.()}>Try again</button>
		</div>
	);
}
