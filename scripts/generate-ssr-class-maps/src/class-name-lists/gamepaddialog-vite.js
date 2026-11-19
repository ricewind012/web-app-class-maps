var ps = `lEqqqt0n--k-`,
	ms = `LfGMZCNzH20-`,
	hs = `kwxrGJQL5-4-`,
	gs = `VCubv9Yx4Q0-`,
	_s = `PZj-hOZa3Q8-`,
	vs = `tZJ0p3KkoMw-`,
	ys = `d9idqOcUtlU-`,
	bs = `BS96L19566Q-`,
	xs = `KCUAMncpiAg-`,
	Ss = `ApdBYSq-TZo-`,
	Cs = `_7IQ7dO6JJsQ-`,
	ws = `_4UYxIKgcQq4-`,
	Ts = `_92AC1lv53VI-`,
	Es = `P3v2mjrES6c-`,
	Ds = `S9g96mcfmi4-`,
	Os = `WZzEh-SQnS4-`,
	ks = `lLuNx2UE5xM-`,
	As = `_3voolpCtr6w-`,
	js = `UyZdvt4zZpI-`,
	Ms = `afIqIzaVohw-`,
	Ns = `mF7P-GaWW84-`,
	Ps = `kYWJ-fTvdPQ-`,
	Fs = `MGJwtg4H5Gw-`,
	Is = `ls-795tDYbY-`,
	Ls = `O6SsL9fKklo-`,
	Rs = `nXfSwUfMNG0-`,
	zs = `_3hRhxB634VE-`,
	Bs = `zRC7XaDPwrE-`,
	Vs = `_8wZT5dUg-Ls-`;
function Hs(e) {
	let {
			className: t,
			modalClassName: n,
			onCancel: r,
			closeModal: i,
			bOKDisabled: a,
			bCloseAfterOK: o = !0,
			onOK: s,
			bAllowFullSize: c,
			bDestructiveWarning: l,
			bDisableBackgroundDismiss: u,
			bHideCloseIcon: d,
			children: f,
			"aria-labelledby": p,
			...m
		} = e,
		h = y();
	k(
		i || r,
		`Either closeModal or onCancel should be passed to GenericDialog. Classes: ${t} ${n}`,
	);
	let g = U.useCallback(() => {
			(r && r()) || (i && i());
		}, [r, i]),
		_ = U.useCallback(async () => {
			a || (s && (await s()), o && i && i());
		}, [a, o, s, i]);
	return (0, q.jsx)(Yr, {
		onEscKeypress: g,
		className: n,
		bDestructiveWarning: l,
		bDisableBackgroundDismiss: u,
		bHideCloseIcon: d,
		children: (0, q.jsx)(ia, {
			role: `dialog`,
			"aria-labelledby": p || void 0,
			...m,
			classNameContent: V(
				`GenericDialogBase`,
				`GenericConfirmDialog`,
				c && `DialogContentFullSize`,
				t,
			),
			onSubmit: _,
			bCenterVertically: !h,
			children: f,
		}),
	});
}
function Us(e) {
	let { title: t, titleClassName: n, children: r, ...i } = e,
		a = U.useId();
	return (0, q.jsxs)(Hs, {
		"aria-labelledby": t ? a : ``,
		...i,
		children: [
			t &&
				(0, q.jsx)(zi, {
					id: a,
					className: n,
					children: t,
				}),
			r,
		],
	});
}
function Ws(e, t, n, r, i, a, o) {
	return new Promise((s, c) => {
		e(
			(0, q.jsx)(Ks, {
				strTitle: t,
				strDescription: n,
				strOKButtonText: r,
				strCancelButtonText: i,
				onOK: s,
				onCancel: c,
				bDestructiveWarning: a,
				children: o,
			}),
		);
	});
}
function Gs(e, t, n, r, i) {
	return new Promise((a, o) => {
		e(
			(0, q.jsx)(Ks, {
				bAlertDialog: !0,
				strTitle: t,
				strDescription: n,
				strOKButtonText: r,
				onOK: a,
				onCancel: a,
				children: i,
			}),
		);
	});
}
function Ks(e) {
	function t(t) {
		return () => {
			(t && t(), e.closeModal && e.closeModal());
		};
	}
	let {
			strTitle: n,
			strDescription: r,
			strOKButtonText: i,
			strCancelButtonText: a,
			onGamepadCancel: o,
			strGamepadCancelDescription: s,
			strMiddleButtonText: c,
			onMiddleButton: l,
			bAlertDialog: u,
			bProgressDialog: d,
			focusButton: f,
			children: p,
			...m
		} = e,
		h = i || C(`#Button_Close`),
		g = (0, q.jsx)(pa, {
			bOKDisabled: e.bOKDisabled,
			bCancelDisabled: e.bCancelDisabled,
			strOKText: i,
			onCancel: t(e.onCancel),
			strCancelText: a,
			focusButton: f,
		});
	d
		? (g = void 0)
		: u
			? (g = (0, q.jsx)(sa, {
					children: h,
				}))
			: l &&
				(g = (0, q.jsx)(ma, {
					bOKDisabled: e.bOKDisabled,
					bCancelDisabled: e.bCancelDisabled,
					strOKText: i,
					onCancel: t(e.onCancel),
					strCancelText: a,
					focusButton: f,
					onUpdate: () => {
						(l(), e.closeModal && e.closeModal());
					},
					strUpdateText: c,
					bUpdateDisabled: e.bMiddleDisabled,
				}));
	let _ = U.useId();
	return (0, q.jsx)(Us, {
		...m,
		title:
			n ||
			(0, q.jsx)(q.Fragment, {
				children: `\xA0`,
			}),
		"aria-describedby": _,
		children: (0, q.jsxs)(Ki, {
			onCancelButton: t(o || e.onCancel),
			onCancelActionDescription: s,
			children: [
				(0, q.jsxs)(Wi, {
					children: [
						(0, q.jsx)(`div`, {
							id: _,
							style: {
								display: `contents`,
							},
							children: r,
						}),
						p,
					],
				}),
				(0, q.jsx)(Hi, {
					children: g,
				}),
			],
		}),
	});
}
function qs(e) {
	let t = {
		strTitle: C(`#Error_FailureNotice`),
		strDescription: C(`#Error_GenericFailureDescription`),
		bAlertDialog: !0,
		bDestructiveWarning: !0,
		onOK: () => {},
		onCancel: () => {},
		...e,
	};
	return (0, q.jsx)(Ks, {
		...t,
	});
}
function Js(e, t) {
	Qr(
		(0, q.jsx)(qs, {
			strDescription: e,
		}),
		t,
	);
}
function Ys(e) {
	let t = {
		onOK: () => {},
		onCancel: () => {},
		strDescription: (0, q.jsxs)(`span`, {
			style: {
				whiteSpace: `pre-line`,
			},
			children: [` `, e.strDescription, ` `],
		}),
		bAlertDialog: !0,
		...e,
	};
	return (0, q.jsx)(Ks, {
		...t,
	});
}
function Xs(e, t, n) {
	Qr(
		(0, q.jsx)(Ys, {
			strTitle: e,
			strDescription: t,
		}),
		n,
	);
}
function Zs(e) {
	return e ? e + `_Label` : void 0;
}
function Qs(e) {
	return e ? e + `_Description` : void 0;
}
function $s(e, t) {
	let { label: n, description: r } = t;
	return {
		"aria-labelledby": n ? Zs(e) : void 0,
		"aria-describedby": r ? Qs(e) : void 0,
	};
}
function X(e, t) {
	let {
			accessibilityId: n,
			label: r,
			description: i,
			icon: a,
			children: o,
			childrenLayout: s,
			inlineWrap: c,
			childrenContainerWidth: l,
			spacingBetweenLabelAndChild: u,
			padding: d,
			disabled: f,
			bottomSeparator: p,
			className: m,
			highlightOnFocus: h,
			indentLevel: g,
			verticalAlignment: _,
			iconLocation: v,
			tooltip: y,
			explainer: b,
			explainerTitle: x,
			transparentBackground: S,
			...C
		} = e,
		w = Ti(),
		T = s ?? `inline`,
		E = v ?? `front`,
		D = E == `front` && !!a,
		ee = E == `before-children` && !!a,
		O = T == `inline` && !!o,
		k = T == `below` && !!o,
		A = c ?? `keep-inline`,
		j = !!(C.onClick || C.onActivate || C.focusable),
		M = (D && !!a) || !!r,
		N = l ?? `min`,
		P = u ?? `standard`,
		F = d ?? `standard`,
		te = p ?? `standard`,
		ne = h ?? !0,
		re = g ?? 0,
		I = _ ?? `center`,
		ie = !w && !S,
		L = tc(x ?? r, b),
		z = U.useRef(void 0),
		ae = R(z, e.navRef),
		oe = U.useCallback(
			(e) => {
				z.current && (z.current?.TakeFocus(), e.preventDefault());
			},
			[z],
		),
		se = (0, q.jsxs)(`div`, {
			className: ys,
			children: [
				ee &&
					(0, q.jsx)(`div`, {
						className: V(`-mv7APUvgY0-`, `p1s7AZ5q4Ao-`),
						children: a,
					}),
				(0, q.jsx)(`div`, {
					className: bs,
					children: o,
				}),
			],
		});
	return (0, q.jsxs)(B, {
		focusable: j,
		noFocusRing: !0,
		scrollIntoViewWhenChildFocused: !0,
		onActivate: C.onClick ? (e) => C.onClick?.(e) : void 0,
		ref: t,
		onMouseDown: j ? void 0 : oe,
		...C,
		...L,
		navRef: ae,
		className: V(
			m,
			hs,
			w && `-EO4FT59VAE-`,
			f && `tZJ0p3KkoMw-`,
			O && void 0,
			k && `_9pFiF1gbI9o-`,
			I == `center` && `FMpWcLvqFIY-`,
			A == `shift-children-below` && `JWxNjd0AnXw-`,
			te == `standard` && `CF7n8ePpMiI-`,
			te == `thick` && `MYSrDGxxWHs-`,
			N == `fixed` && `_85iACv78fHc-`,
			N == `max` && `eM2QEVfngbM-`,
			P == `standard` && `umeu-qXKQjo-`,
			F == `standard` && `yEWiNUJm9rE-`,
			F == `compact` && `Lp7SIUigpfY-`,
			j && `DEO4wTNKBQY-`,
			ne && `ypXE1Kh2LZY-`,
			ie && `-ELZx7BKnW4-`,
		),
		style: {
			"--indent-level": re,
		},
		children: [
			(0, q.jsxs)(`div`, {
				className: xs,
				children: [
					M &&
						(0, q.jsx)(`div`, {
							className: `bQjqavPfRH4-`,
							children: (0, q.jsxs)(`div`, {
								className: `ApdBYSq-TZo-`,
								id: Zs(n),
								children: [
									D &&
										(0, q.jsx)(`div`, {
											className: V(`-mv7APUvgY0-`, `g1VEgslk2-k-`),
											children: a,
										}),
									r,
									y &&
										(0, q.jsx)(xi, {
											tooltip: y,
										}),
								],
							}),
						}),
					k && se,
					i &&
						(0, q.jsx)(ec, {
							accessibilityId: Qs(n),
							children: i,
						}),
				],
			}),
			O &&
				(0, q.jsx)(`div`, {
					className: `VG45c-H2PHw-`,
					children: se,
				}),
		],
	});
}
function ec(e) {
	let { accessibilityId: t, className: n, children: r } = e;
	return (0, q.jsx)(`div`, {
		className: V(Cs, n),
		id: Qs(t),
		children: r,
	});
}
function tc(e, t) {
	let n = Ce(),
		r = U.useCallback(() => {
			Xs(e, t, n.ownerWindow ?? window);
		}, [n, e, t]);
	return t == null
		? {}
		: {
				onOptionsButton: r,
				onOptionsActionDescription: C(`#Field_MoreInfo_Action`),
			};
}
var nc = U.forwardRef(function (e, t) {
	return (0, q.jsx)(X, {
		ref: t,
		accessibilityId: null,
		...e,
	});
});
function rc(e) {
	let {
		layout: t,
		label: n,
		transparentBackground: r,
		description: i,
		...a
	} = e;
	return (0, q.jsx)(X, {
		accessibilityId: null,
		label: n,
		description: i,
		spacingBetweenLabelAndChild: `none`,
		childrenLayout: e.layout,
		transparentBackground: r,
		...a,
		children: (0, q.jsx)(`div`, {
			className: Is,
			children: e.children,
		}),
	});
}
function ic(e, t, n = [`label`, `button`]) {
	let r = U.useId(),
		i = $s(e, t),
		a = {
			id: r,
			"aria-labelledby": ``,
		};
	return (
		(a[`aria-labelledby`] = n
			.map((e) => (e == `button` ? r : i[`aria-labelledby`]))
			.join(` `)),
		(a[`aria-describedby`] = i[`aria-describedby`]),
		a
	);
}
var ac = U.forwardRef(function (e, t) {
		let {
				label: n,
				description: r,
				explainer: i,
				icon: a,
				layout: o,
				disabled: s,
				onActivate: c,
				indentLevel: l,
				bottomSeparator: u,
				highlightOnFocus: d,
				childrenContainerWidth: f,
				padding: p,
				inlineWrap: m,
				transparentBackground: h,
				fieldClassName: g,
				fieldChildren: _,
				accessibilityNameOrder: v,
				...y
			} = e,
			{ refWithValue: b, refForElement: x } = j(t),
			S = U.useId();
		return (0, q.jsxs)(X, {
			accessibilityId: S,
			label: n,
			indentLevel: l,
			description: r,
			icon: a,
			bottomSeparator: u,
			highlightOnFocus: d,
			childrenLayout: o ?? `inline`,
			childrenContainerWidth: f ?? `min`,
			onMouseDown: (e) => {
				(b.current?.focus(), e.preventDefault());
			},
			padding: p,
			inlineWrap: m,
			explainer: i,
			className: g,
			disabled: s,
			transparentBackground: h,
			onActivate: s ? c : void 0,
			children: [
				(0, q.jsx)(oc, {
					accessibilityId: S,
					...e,
					ref: x,
				}),
				_,
			],
		});
	}),
	oc = U.forwardRef(function (e, t) {
		let {
				accessibilityId: n,
				label: r,
				description: i,
				explainer: a,
				icon: o,
				layout: s,
				disabled: c,
				onActivate: l,
				indentLevel: u,
				bottomSeparator: d,
				highlightOnFocus: f,
				childrenContainerWidth: p,
				padding: m,
				inlineWrap: h,
				transparentBackground: g,
				fieldClassName: _,
				fieldChildren: v,
				accessibilityNameOrder: y,
				...b
			} = e,
			x = ic(n, e, y);
		return (0, q.jsx)(ca, {
			...b,
			...x,
			disabled: c,
			ref: t,
		});
	}),
	sc = U.forwardRef(function (e, t) {
		let {
				label: n,
				description: r,
				icon: i,
				layout: a,
				bottomSeparator: o,
				highlightOnFocus: s,
				...c
			} = e,
			{ refWithValue: l, refForElement: u } = j(t),
			d = U.useId();
		return (0, q.jsx)(X, {
			accessibilityId: d,
			label: n,
			description: r,
			icon: i,
			bottomSeparator: o,
			highlightOnFocus: s,
			childrenLayout: a ?? `inline`,
			childrenContainerWidth: `fixed`,
			onMouseDown: (e) => {
				(l.current?.element?.focus(), e.preventDefault());
			},
			children: (0, q.jsx)(Ea, {
				...$s(d, e),
				...c,
				ref: u,
			}),
		});
	});
function cc(e) {
	let t = e.alignItems ?? `left`,
		n = e.spacing ?? `standard`,
		r = e.itemMaxSize ?? `gamepad`;
	return (0, q.jsx)(B, {
		className: V(
			Rs,
			t == `left` && `_6M0V7laGEWg-`,
			t == `right` && `ABpWqwPRxjo-`,
			t == `center` && `d0EakOJDrII-`,
			n == `standard` && `ekxT6PeL5ks-`,
			n == `extra` && `v3covqW1fis-`,
			r == `desktop` && `gTjATirka8Y-`,
			e.fullWidth && `uaD7cyI7zCE-`,
		),
		navEntryPreferPosition: qe.PREFERRED_CHILD,
		children: U.Children.map(
			e.children,
			(e) =>
				e &&
				(0, q.jsx)(`div`, {
					className: `-Bhx7w1DZSA-`,
					children: e,
				}),
		),
	});
}
function lc(e) {
	let t = Ci(),
		n = U.useMemo(
			() => ({
				...t,
				bClassicMode: !0,
			}),
			[t],
		);
	return (0, q.jsx)(Si.Provider, {
		value: n,
		children: e.children,
	});
}
function uc(e) {
	let {
			children: t,
			alignItems: n,
			spacing: r,
			itemMaxSize: i,
			fullWidth: a,
			...o
		} = e,
		s = {
			fullWidth: a,
			children: t,
			alignItems: n,
			spacing: r,
			itemMaxSize: i,
		};
	return (0, q.jsx)(X, {
		childrenLayout: `below`,
		...o,
		children: (0, q.jsx)(cc, {
			...s,
		}),
	});
}
function dc(e) {
	let { name: t, value: n, ...r } = e;
	return (0, q.jsx)(
		rc,
		{
			label: t,
			focusable: !0,
			inlineWrap: `shift-children-below`,
			...r,
			children: n,
		},
		t,
	);
}
function fc(e) {
	return (0, q.jsx)(`div`, {
		className: V(_s, e.className),
		role: `separator`,
	});
}
function pc(e) {
	let {
			bottomSeparator: t,
			childrenContainerWidth: n,
			childrenLayout: r,
			description: i,
			disabled: a,
			explainer: o,
			explainerTitle: s,
			highlightOnFocus: c,
			icon: l,
			iconLocation: u,
			indentLevel: d,
			inlineWrap: f,
			label: p,
			padding: m,
			spacingBetweenLabelAndChild: h,
			tooltip: g,
			verticalAlignment: _,
			className: v,
			children: y,
			inputClassName: b,
			ref: x,
			...S
		} = e,
		C = U.useId(),
		w = {
			accessibilityId: C,
			bottomSeparator: t,
			childrenContainerWidth: n,
			childrenLayout: r,
			description: i,
			disabled: a,
			explainer: o,
			explainerTitle: s,
			highlightOnFocus: c,
			icon: l,
			iconLocation: u,
			indentLevel: d,
			inlineWrap: f,
			label: p,
			padding: m,
			spacingBetweenLabelAndChild: h,
			tooltip: g,
			verticalAlignment: _,
			className: v,
			ref: x,
		};
	return (0, q.jsxs)(X, {
		...w,
		children: [
			(0, q.jsx)(Ea, {
				...$s(C, e),
				...S,
				className: b,
			}),
			y,
		],
	});
}
var mc = `xHfPnCn4bHY-`,
	hc = `P6bKJOwuOC8-`;
function gc(e) {
	let {
			childrenKey: t,
			childrenClasses: n,
			children: r,
			directionClass: i,
			animate: a = !0,
			sizeClass: o,
		} = e,
		s = V(mc, i);
	return (0, q.jsx)(kn, {
		className: s,
		appear: !1,
		enter: a,
		exit: a,
		children: (0, q.jsx)(
			_c,
			{
				childrenClasses: n,
				sizeClass: o,
				children: r,
			},
			t,
		),
	});
}
function _c(e) {
	let { sizeClass: t, children: n, childrenClasses: r, navKey: i, ...a } = e,
		[o, s, c, l] = vc(),
		u = U.useRef(!0),
		d = U.useCallback(() => u.current, [u]),
		f = U.useCallback(() => {
			((u.current = !0), c());
		}, [c]),
		p = U.useCallback(() => {
			((u.current = !1), l());
		}, [l]),
		m = e.childrenClasses,
		h = {
			enter: m.enterStart,
			enterActive: m.enterEnd,
			exit: m.exitStart,
			exitActive: m.exitEnd,
		};
	return o.current && !o.current.ownerDocument.defaultView
		? null
		: (0, q.jsx)(bn, {
				nodeRef: o,
				classNames: h,
				in: !0,
				timeout: 1e4,
				addEndListener: s,
				onEntering: f,
				onExiting: p,
				...a,
				children: (0, q.jsx)(`div`, {
					ref: o,
					className: V(hc, m.base),
					children: (0, q.jsx)(B, {
						className: t,
						fnCanTakeFocus: d,
						navKey: i,
						children: e.children,
					}),
				}),
			});
}
function vc() {
	let e = U.useRef(null),
		t = U.useRef(void 0);
	return (
		U.useLayoutEffect(() => {
			let n = e.current;
			if (!n || t.current) return;
			t.current = {
				element: n,
				activeProps: new Set(),
				bExiting: !1,
				fnDone: null,
			};
			let r = t.current;
			n.addEventListener(
				`transitionrun`,
				(e) => {
					e.target == n && r.activeProps.add(e.propertyName);
				},
				!1,
			);
			let i = (e) => {
				e.target == n &&
					(r.activeProps.delete(e.propertyName),
					r.fnDone && r.activeProps.size == 0 && r.bExiting && r.fnDone());
			};
			(n.addEventListener(`transitionend`, i, !1),
				n.addEventListener(`transitioncancel`, i, !1));
		}, []),
		[
			e,
			U.useCallback(
				(e) => {
					t.current ? (t.current.fnDone = e) : e();
				},
				[t],
			),
			U.useCallback(() => {
				t.current && (t.current.bExiting = !1);
			}, [t]),
			U.useCallback(() => {
				t.current && (t.current.bExiting = !0);
			}, [t]),
		]
	);
}
function yc(e, t) {
	return {
		base: t,
		enterStart: e.Enter,
		enterEnd: e.EnterActive,
		exitStart: e.Exit,
		exitEnd: e.ExitActive,
	};
}
var bc = (function (e) {
	return (
		(e[(e.None = 0)] = `None`),
		(e[(e.Left = 1)] = `Left`),
		(e[(e.Right = 2)] = `Right`),
		(e[(e.Up = 3)] = `Up`),
		(e[(e.Down = 4)] = `Down`),
		e
	);
})({});
function xc(e, t) {
	return t == 1
		? e.Left
		: t == 2
			? e.Right
			: t == 3
				? e.Up
				: t == 4
					? e.Down
					: ``;
}
function Sc(e, t, n, r) {
	let i = U.useRef(null),
		a = U.useRef(0);
	if (i.current == t) return a.current;
	let o = n(e, t),
		s = o;
	i.current != null && (s = n(e, i.current));
	let c = 0;
	return (
		s < o ? (c = r[1]) : s > o && (c = r[0]),
		(i.current = t),
		(a.current = c),
		c
	);
}
