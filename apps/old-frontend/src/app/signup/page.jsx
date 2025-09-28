"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, name }),
			});
			if (!res.ok) throw new Error('signup failed');
			// on success redirect to login
			router.push('/login');
		} catch (err) {
			setError(err.message || 'signup failed');
		} finally { setLoading(false); }
	};

	return (
		<div className="container" style={{ maxWidth: 520 }}>
			<div className="card mt-5">
				<div className="card-body">
					<h3 className="mb-3">Create account</h3>
					<form onSubmit={onSubmit}>
						<div className="mb-3">
							<label className="form-label">Name</label>
							<input value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
						</div>
						<div className="mb-3">
							<label className="form-label">Email</label>
							<input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
						</div>
						<div className="mb-3">
							<label className="form-label">Password</label>
							<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
						</div>
						{error && <div className="alert alert-danger">{error}</div>}
						<button className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
					</form>
				</div>
			</div>
		</div>
	);
}
