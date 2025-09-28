"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";

export default function LoginPage() {
	const router = useRouter();
	const { login, loading } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			await login(email, password);
			router.push('/');
		} catch (err) {
			setError(err.message || 'login failed');
		}
	};

	return (
		<div className="container" style={{ maxWidth: 520 }}>
			<div className="card mt-5">
				<div className="card-body">
					<h3 className="mb-3">Sign in</h3>
					<form onSubmit={onSubmit}>
						<div className="mb-3">
							<label className="form-label">Email</label>
							<input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
						</div>
						<div className="mb-3">
							<label className="form-label">Password</label>
							<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
						</div>
						{error && <div className="alert alert-danger">{error}</div>}
						<button className="btn btn-primary" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
					</form>
				</div>
			</div>
		</div>
	);
}
