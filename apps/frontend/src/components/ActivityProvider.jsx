"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const ActivityCtx = createContext(null);
export function useActivity() {
	return useContext(ActivityCtx);
}

function FocusTrap({ onClose, children }) {
	// minimal focus trap for modals
	const startRef = useRef(null);
	const endRef = useRef(null);
	useEffect(() => {
		const prev = document.activeElement;
		startRef.current?.focus();
		return () => {
			// restore focus
			if (prev && prev.focus) prev.focus();
		};
	}, []);
	const onKey = useCallback((e) => {
		if (e.key === "Escape") onClose?.();
	}, [onClose]);
	return (
		<div onKeyDown={onKey}>
			<button ref={startRef} className="visually-hidden" aria-hidden="true" />
			{children}
			<button ref={endRef} className="visually-hidden" aria-hidden="true" />
		</div>
	);
}

export default function ActivityProvider({ children }) {
	const [stack, setStack] = useState([]);
	const open = useCallback((Node, props = {}) => setStack((s) => [...s, { Node, props }]), []);
	const closeTop = useCallback(() => setStack((s) => s.slice(0, -1)), []);
	const value = useMemo(() => ({ open, closeTop }), [open, closeTop]);

	return (
		<ActivityCtx.Provider value={value}>
			{children}
			<div id="activity-root" aria-live="polite">
				{stack.map(({ Node, props }, i) => (
					<div key={i} role="dialog" aria-modal className="modal d-block" tabIndex={-1}>
						<div className="modal-dialog modal-lg">
							<div className="modal-content">
								<FocusTrap onClose={closeTop}>
									<div className="modal-body">
										<Node {...props} onClose={closeTop} />
									</div>
								</FocusTrap>
							</div>
						</div>
						<div className="modal-backdrop show" onClick={closeTop} />
					</div>
				))}
			</div>
		</ActivityCtx.Provider>
	);
}
