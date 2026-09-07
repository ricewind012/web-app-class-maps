const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f ||
		(m.f = [
			"./assets/BryW0eKn.css",
			"./assets/CBgaPm1z.css",
			"./assets/BJs42CxA.css",
			"./assets/YNo6LF5Z.css",
			"./assets/CBv2tb10.css",
		]),
) => i.map((i) => d[i]);
import { a as e, c as t, n, t as r } from "./DFiLEQmc2.js";
import { r as i, t as a } from "./Bqc-Ym2G2.js";
import {
	B as o,
	C as s,
	Dt as c,
	E as l,
	Et as u,
	H as d,
	L as f,
	N as p,
	P as ee,
	R as m,
	St as te,
	U as ne,
	V as h,
	W as g,
	_ as re,
	_t as ie,
	at as ae,
	b as oe,
	d as se,
	dt as ce,
	f as le,
	ft as ue,
	gt as _,
	h as de,
	ht as fe,
	kt as v,
	lt as pe,
	m as me,
	ot as he,
	pt as ge,
	st as _e,
	v as ve,
	vt as y,
	w as ye,
	xt as be,
	z as xe,
} from "./DmvLhahn2.js";
import {
	B as b,
	F as x,
	H as Se,
	I as S,
	L as C,
	P as w,
	R as T,
	T as E,
	V as D,
	a as Ce,
	i as O,
	p as we,
	r as Te,
	z as k,
} from "./PSsEs55v2.js";
import { t as Ee } from "./Dhv2yGMg.js";
import { i as De } from "./BkxMFwAF.js";
import { n as Oe, r as ke, t as Ae } from "./DSqYuTT6.js";
import { t as je } from "./Bh9cjZqW.js";
import { r as Me } from "./cjiVvgC1.js";
import { O as A, k as Ne, l as Pe, w as j } from "./CnIfO9ag.js";
import {
	E as Fe,
	M as Ie,
	N as Le,
	O as Re,
	P as ze,
	Q as Be,
	T as Ve,
	g as He,
	t as Ue,
} from "./BzvX85JA.js";
import { t as We } from "./C-wcQN4Q.js";
import { i as Ge, n as Ke } from "./DOyw9tYB.js";
import { i as qe } from "./BD3B3bL7.js";
import { n as Je, t as Ye } from "./1NLvOy5U.js";
import { t as Xe } from "./l8olwIXb.js";
import { n as Ze, r as Qe, t as $e } from "./agI6uIS2.js";
import { t as et } from "./C9Ema4r-.js";
import {
	c as tt,
	i as nt,
	n as rt,
	r as it,
	s as at,
	t as ot,
	u as st,
} from "./DhWxahn3.js";
import { t as ct } from "./CZ0KhRqe2.js";
import { t as lt } from "./ObY6nUFu2.js";
import { s as ut } from "./BS3_IYaP2.js";
import { t as M } from "./B0l2Vchu2.js";
import { t as dt } from "./7SqrCSp62.js";
import {
	h as ft,
	m as pt,
	n as mt,
	p as ht,
	t as N,
	y as gt,
} from "./DsuiNrSq2.js";
import { n as _t, t as vt } from "./DTvcf4Di2.js";
import { n as yt } from "./BI3iqedu2.js";
import { t as bt } from "./CcTyJyjd2.js";
import { t as xt } from "./C1Uk77sk2.js";
import { t as St } from "./Cifja9LD2.js";
import { t as Ct } from "./zj83qARe2.js";
import { t as wt } from "./BMd7ecqM.js";
import { t as Tt } from "./BkwhAEek.js";
import { t as Et } from "./BrWIVkUC.js";
import { t as Dt } from "./CV_Orl6a2.js";
import { t as Ot } from "./BOXIk7fV2.js";
import { t as kt } from "./mf-KwFGr2.js";
import { t as At } from "./C_2tiK3U2.js";
import { a as jt } from "./fRrd3lP22.js";
import { n as Mt } from "./DgqLPeZP.js";
import { t as P } from "./CMX99r1J.js";
import { t as Nt } from "./Bf1-HiJI.js";
import { t as Pt } from "./CVP2pcQr.js";
import { t as Ft } from "./AMpDnS932.js";
var F = t(n(), 1),
	I = r(),
	L = new g(`FocusHistory`).Debug;
function It(e) {
	let t = (t) => {
			L(
				`preserving state and suppressing focus for tree ${e.id} for navigation type ${t.navigationType}`,
			);
			let n = window.navigation.currentEntry?.getState() ?? {};
			if (t.navigationType != `replace`) {
				let t = p(e.Root);
				window.navigation.updateCurrentEntry({ state: { ...n, [Rt(e)]: t } });
			} else
				n[z] &&
					t.intercept({
						focusReset: `manual`,
						async handler() {
							let { [Rt(e)]: n, ...r } = t.destination.getState() ?? {};
							window.navigation.updateCurrentEntry({
								state: { ...r, [z]: !0 },
							});
						},
					});
			e.DeferredFocus.SuppressFocus();
		},
		n = (t) => {
			Lt(e) ? e.DeferredFocus.Reset() : e.DeferredFocus.ExecuteQueuedFocus();
		},
		r = new fe();
	return (
		window.navigation.addEventListener(`navigate`, t),
		r.Push(() => window.navigation.removeEventListener(`navigate`, t)),
		window.navigation.addEventListener(`navigatesuccess`, n),
		r.Push(() => window.navigation.removeEventListener(`navigatesuccess`, n)),
		Bt(),
		Ht() ? Vt(e, r) : Lt(e),
		r.GetUnregisterFunc()
	);
}
function Lt(e, t) {
	let n = t ?? zt(e);
	return (
		L(
			`Restoring focus state for ${e.id}, ${n ? `history available` : `no history`}`,
		),
		n ? (ee(e.Root, n, 0), !0) : !1
	);
}
function Rt(e) {
	return `FocusHistory_${e.id}`;
}
function zt(e) {
	return window.navigation.currentEntry?.getState()?.[Rt(e)];
}
var R;
function Bt() {
	if (!R) {
		R = new u();
		let e = performance.now();
		window.addEventListener(`message`, (n) => {
			typeof n.data == `string` &&
				n.data == `FocusRestoreReady` &&
				(L(
					`Got FocusRestoreReady event from page after ${performance.now() - e}ms, will record in history.  ${R.CountRegistered()} trees waiting.`,
				),
				Ut(),
				R.Dispatch(),
				R.ClearAllCallbacks(),
				window.clearTimeout(t));
		});
		let t = window.setTimeout(() => {
			R.CountRegistered() &&
				(console.warn(`Waited 4000ms for FocusRestoreReady, proceeding`),
				R.Dispatch());
		}, 4e3);
	}
}
function Vt(e, t) {
	if (window.__bFocusRestoreReady) {
		Lt(e);
		return;
	}
	(L(
		`Wait for page enabled, suppressing focus in ${e.id} until we hear that page is ready`,
	),
		e.DeferredFocus.SuppressFocus());
	let n = zt(e),
		r = R.Register(() => {
			Lt(e, n) ? e.DeferredFocus.Reset() : e.DeferredFocus.ExecuteQueuedFocus();
		}).Unregister;
	t.Push(r);
}
var z = `FocusHistoryWaitForPage`;
function Ht() {
	let e = window.navigation.currentEntry?.getState();
	return (L(`Wait for page? ${e?.[z] ? `wait` : `no`} `, e), !!e?.[z]);
}
function Ut() {
	window.navigation.updateCurrentEntry({
		state: { ...window.navigation.currentEntry?.getState(), [z]: !0 },
	});
}
var Wt = new g(`FocusNavigation`).Debug,
	Gt = new g(`GamepadEvents`).Debug,
	Kt = class {
		m_Controller;
		m_context;
		m_window;
		m_ParentNavTree;
		m_rgChildNavTrees = [];
		m_ID;
		m_valueIsMounted = _(!1);
		m_bIsEnabled = !1;
		m_tsLastActivated;
		m_Root;
		m_onActivateCallbacks = new u();
		m_onDeactivateCallbacks = new u();
		m_onActiveFocusStateChangedCallbacks = new u();
		m_onChildTreesChanged = new u();
		m_Properties;
		m_bExcludeFromScrollRegionSearch = !1;
		m_onGlobalButtonDown;
		m_rgOnUnhandledButton = [];
		m_rgGlobalButtonHandlers = [];
		constructor(e, t, n, r, i) {
			((this.m_Controller = e),
				(this.m_context = t),
				(this.m_ID = n),
				(this.m_ParentNavTree = r),
				(this.m_Root = new ye(this, null, null)),
				this.m_Root.SetProperties({ layout: l.COLUMN }),
				(this.m_Properties = i));
		}
		get id() {
			return this.m_ID;
		}
		get Parent() {
			return this.m_ParentNavTree;
		}
		get ChildTrees() {
			return this.m_rgChildNavTrees;
		}
		get Root() {
			return this.m_Root;
		}
		get Controller() {
			return this.m_Controller;
		}
		get WindowContext() {
			return this.m_context;
		}
		get Window() {
			return this.m_window;
		}
		BUseVirtualFocus() {
			return this.m_Properties.virtualFocus ?? !1;
		}
		BIsModal() {
			return this.m_Properties.modal ?? !1;
		}
		FindModalDescendant() {
			for (let e of this.m_rgChildNavTrees) {
				if (e.BIsModal() && e.BIsEnabled()) return e;
				let t = e.FindModalDescendant();
				if (t) return t;
			}
		}
		BIsContextActive() {
			return this.m_Controller.BIsInActiveContext(this);
		}
		CreateNode(e, t) {
			return new ye(this, e, t);
		}
		RegisterNavigationItem(e, t) {
			return (e.OnMount(t), () => e.OnUnmount());
		}
		OnChildActivated(e) {
			this.m_valueIsMounted.Value &&
				this.m_Controller.OnGamepadNavigationTreeFocused(this, e);
		}
		m_lastFocusNode;
		m_bWasActiveForLastFocusChange;
		m_lastFocusNodeXMovement = new Jt();
		m_lastFocusNodeYMovement = new Jt();
		GetLastFocusedNode() {
			return this.m_lastFocusNode;
		}
		GetLastFocusedMovementRect(e) {
			if (e == `x`) return this.m_lastFocusNodeXMovement.GetRect();
			if (e == `y`) return this.m_lastFocusNodeYMovement.GetRect();
		}
		get OnActivateCallbacks() {
			return this.m_onActivateCallbacks;
		}
		get OnDeactivateCallbacks() {
			return this.m_onDeactivateCallbacks;
		}
		get OnChildTreesChangedCallbacks() {
			return this.m_onChildTreesChanged;
		}
		get OnActiveStateChangedCallbacks() {
			return this.m_onActiveFocusStateChangedCallbacks;
		}
		OnActivate(e) {
			((this.m_tsLastActivated = performance.now()),
				this.m_onActivateCallbacks.Dispatch(this, e),
				this.m_onActiveFocusStateChangedCallbacks.Dispatch(!0, this));
			for (let e = this.m_lastFocusNode; e; e = e.Parent) e.SetFocusWithin(!0);
		}
		OnDeactivate(e) {
			(this.m_onDeactivateCallbacks.Dispatch(this, e),
				this.m_onActiveFocusStateChangedCallbacks.Dispatch(!1, this),
				(this.m_bWasActiveForLastFocusChange = !1));
			for (let e = this.m_lastFocusNode; e; e = e.Parent) e.SetFocusWithin(!1);
		}
		OnContextActiveStateChanged(e) {
			this.m_onActiveFocusStateChangedCallbacks.Dispatch(e, this);
		}
		IsActiveFocusNavTree() {
			return this.m_Controller.IsActiveFocusNavTree(this);
		}
		TakeFocus(e, t = !1) {
			let n = !1;
			(t
				? (n = this.Root.BVisibleChildTakeFocus(e))
				: this.m_lastFocusNode && (n = this.m_lastFocusNode.BTakeFocus(e)),
				(n ||= this.Root.BTakeFocus(e)),
				n || this.TransferFocus(e, this.Root));
		}
		Activate(e = !1) {
			this.m_Controller.OnGamepadNavigationTreeActivated(
				this.FindModalDescendant() ?? this,
				e,
			);
		}
		Deactivate() {
			this.m_Controller.BlurNavTree(this);
		}
		BIsEnabled() {
			return this.m_bIsEnabled;
		}
		get SubscribableIsMounted() {
			return this.m_valueIsMounted;
		}
		BIsActive() {
			return (
				this.m_valueIsMounted.Value &&
				(this.m_Controller.IsActiveNavTree(this) ||
					this.m_Controller.IsActiveFocusNavTree(this))
			);
		}
		BIsActiveFocus() {
			return (
				this.m_valueIsMounted.Value &&
				this.m_Controller.IsActiveFocusNavTree(this)
			);
		}
		BIsActiveWithinContext() {
			return (
				this.m_valueIsMounted.Value &&
				(this.m_context.m_LastActiveNavTree == this ||
					this.m_context.m_LastActiveFocusNavTree == this)
			);
		}
		GetTimeLastActivated() {
			return this.m_tsLastActivated;
		}
		MountNavTree(e) {
			this.m_window = e;
			let t = this.m_Root.Element;
			((t.__nav_tree = this),
				t.__nav_wrapper && t.__nav_wrapper.BindTree(this));
			let n = new fe();
			return (
				this.m_valueIsMounted.Set(!0),
				n.Push(() => this.m_valueIsMounted.Set(!1)),
				this.m_ParentNavTree &&
					n.Push(this.m_ParentNavTree.AddChildNavTree(this)),
				this.m_Properties.historyMode == `navigationapi` && n.Push(It(this)),
				this.m_onActiveFocusStateChangedCallbacks.Dispatch(
					this.BIsActive(),
					this,
				),
				n.GetUnregisterFunc()
			);
		}
		SetIsEnabled(e) {
			this.m_bIsEnabled != e &&
				((this.m_bIsEnabled = e),
				this.m_bIsEnabled || (this.m_tsLastActivated = void 0));
		}
		GetExcludeFromScrollRegionSearch() {
			return this.m_bExcludeFromScrollRegionSearch;
		}
		SetExcludeFromScrollRegionSearch(e) {
			this.m_bExcludeFromScrollRegionSearch = e;
		}
		GetParentEmbeddedNavTree() {
			return this.m_Properties.bIsEmbeddedInLegacyTree
				? this.m_ParentNavTree
				: void 0;
		}
		RegisterOnUnhandledButtonCallback(e) {
			return (
				this.m_rgOnUnhandledButton.push(e),
				() => {
					v(this.m_rgOnUnhandledButton, e);
				}
			);
		}
		RegisterGlobalButtonHandler(e, t, n) {
			let r = { button: e, description: n, fnCallback: t };
			return (
				this.m_rgGlobalButtonHandlers.push(r),
				this.UpdateRootActionDescriptionMap(),
				() => {
					(v(this.m_rgGlobalButtonHandlers, r),
						this.UpdateRootActionDescriptionMap());
				}
			);
		}
		UpdateRootActionDescriptionMap() {
			let e = {};
			for (let { button: t, description: n } of this.m_rgGlobalButtonHandlers)
				n && (e[t] = n);
			this.m_Root.SetProperties({
				...this.m_Root.m_Properties,
				actionDescriptionMap: e,
			});
		}
		SetOnGlobalButtonDown(e) {
			this.m_onGlobalButtonDown = e;
		}
		OnRootButtonDown(e) {
			for (let t = this; t; t = t.Parent)
				if (
					(t.m_onGlobalButtonDown && t.m_onGlobalButtonDown(e), e.cancelBubble)
				)
					return !1;
			return this.HandleButtonDownEventAsLogicalEvent(e);
		}
		TryRootButtonListeners(e) {
			for (let { button: t, fnCallback: n } of this.m_rgGlobalButtonHandlers)
				if (t == e.detail.button && n(e) !== !1) return !1;
			for (let t of this.m_rgOnUnhandledButton) if (t(e) !== !1) return !1;
			return !0;
		}
		HandleButtonDownEventAsLogicalEvent(e) {
			let { bUnhandled: t, bHadLogicalEventMapping: n } = xe(e);
			return (
				Gt(
					`Logical gamepad Event fired: ${h[e.detail.button]}, had logical event: ${n}, was handled: ${!t}`,
				),
				(t &&= this.TryRootButtonListeners(e)),
				(t &&= this.m_Controller.FireUnhandledGamepadEventCallbacks(e)),
				e.stopPropagation(),
				t
			);
		}
		m_DeferredFocus = new Yt(this);
		get DeferredFocus() {
			return this.m_DeferredFocus;
		}
		AddChildNavTree(e) {
			return (
				this.m_rgChildNavTrees.push(e),
				this.OnChildTreesChangedCallbacks.Dispatch(`add`, e),
				() => {
					(v(this.m_rgChildNavTrees, e),
						this.OnChildTreesChangedCallbacks.Dispatch(`remove`, e));
				}
			);
		}
		TransferFocus(e, t, n, r) {
			((n ??= h.INVALID),
				(r ??= !1),
				this.m_Controller.BatchedUpdate(() =>
					this.TransferFocusInternal(e, t, n, r),
				));
		}
		TransferFocusInternal(e, t, n, r) {
			let i = s(n),
				a = this.m_lastFocusNode;
			if (a == t && (this.m_bWasActiveForLastFocusChange || !this.BIsActive()))
				return;
			Wt(
				`Transfer focus in ${this.id}, source: ${e && m[e]}, from/to:`,
				a?.m_element,
				t?.m_element,
			);
			let o = { blurredNode: a, focusedNode: t, focusSource: e },
				c = qt(a, t);
			if (a) {
				a.SetHasFocus(!1);
				for (let e = a; e && e != c; e = e.Parent) e.SetFocusWithin(!1);
			}
			if (t) {
				t.SetHasFocus(!0);
				for (let e = t; e && e != c; e = e.Parent) e.SetFocusWithin(!0);
			}
			let l = this.m_context.OnFocusChangeStart(e, this, a, t);
			(t && t.SetDOMFocusAndScroll(e, a, n, r),
				a &&
					(f(a.Element, `vgp_onblur`, o),
					a.m_FocusRing &&
						(!t || a.m_FocusRing != t.m_FocusRing) &&
						a.m_FocusRing.OnBlur(e, a, t)),
				t &&
					(f(t.Element, `vgp_onfocus`, o),
					t.m_FocusRing &&
						(a && t.m_FocusRing == a.m_FocusRing
							? t.m_FocusRing.OnFocusChange(e, a, t)
							: t.m_FocusRing.OnFocus(e, t, a))),
				(this.m_lastFocusNode = t),
				(this.m_bWasActiveForLastFocusChange = this.BIsActive()),
				i == `x`
					? this.m_lastFocusNodeXMovement.SetNode(t?.Element)
					: i == `y`
						? this.m_lastFocusNodeYMovement.SetNode(t?.Element)
						: (this.m_lastFocusNodeXMovement.Reset(),
							this.m_lastFocusNodeYMovement.Reset()),
				this.m_context.OnFocusChangeComplete(l));
		}
	};
function qt(e, t) {
	if (!t || !e) return null;
	let n = t,
		r = e;
	for (; n.GetDepth() > r.GetDepth() && n.Parent;) n = n.Parent;
	for (; r.GetDepth() > n.GetDepth() && r.Parent;) r = r.Parent;
	for (; n != r && n && r;) ((n = n.Parent), (r = r.Parent));
	return n;
}
var Jt = class {
		m_element;
		m_rect;
		SetNode(e) {
			((this.m_element = e),
				(this.m_rect = e ? e.getBoundingClientRect() : void 0));
		}
		Reset() {
			this.SetNode(void 0);
		}
		GetRect() {
			return this.m_element?.isConnected
				? this.m_element.getBoundingClientRect()
				: this.m_rect;
		}
	},
	Yt = class {
		m_tree;
		m_target;
		m_interval;
		m_schExecuteQueuedFocus = new ge();
		m_bSuppressed = !1;
		constructor(e) {
			this.m_tree = e;
		}
		RequestFocus(e, t) {
			if (!e) {
				this.m_target = void 0;
				return;
			}
			((this.m_target = { ...t, node: e }),
				!this.m_interval &&
					!this.m_bSuppressed &&
					this.m_schExecuteQueuedFocus.Schedule(1, () => {
						((this.m_interval = void 0), this.ExecuteQueuedFocus());
					}));
		}
		BHasQueuedFocusNode() {
			return !!this.m_target;
		}
		BIsQueuedFocusNode(e) {
			return this.m_target && this.m_target.node == e;
		}
		SuppressFocus() {
			((this.m_bSuppressed = !0), this.ClearInterval());
		}
		Reset() {
			((this.m_bSuppressed = !1),
				(this.m_target = void 0),
				this.ClearInterval());
		}
		ClearInterval() {
			this.m_schExecuteQueuedFocus.Cancel();
		}
		ExecuteQueuedFocus() {
			if (((this.m_bSuppressed = !1), this.m_target)) {
				let { node: e, bFocusDescendant: t } = this.m_target;
				((this.m_target = void 0),
					Wt(
						`DeferredFocus in ${this.m_tree.id} - focusing ${t ? `descendant of` : `node`} ${e.NavKey}`,
					),
					t
						? e.BChildTakeFocus(m.AUTOFOCUS) ||
							this.m_tree.TransferFocus(m.AUTOFOCUS, e)
						: e.BTakeFocus(m.AUTOFOCUS) || this.m_tree.TakeFocus(m.AUTOFOCUS));
			}
		}
	},
	B = new g(`FocusNavigation`).Debug,
	Xt = class {
		m_rootWindow;
		m_activeWindow;
		m_activeBrowserView;
		m_valueIsActive = _(!1);
		m_controller;
		m_rgGamepadNavigationTrees = [];
		m_LastActiveNavTree;
		m_LastActiveFocusNavTree;
		m_bMounted = !0;
		m_schDeferredActivate = new ge();
		m_FocusChangedCallbacks = new u();
		m_NavTreeActivatedOrReactivatedCallbacks = new u();
		m_bIsGamepadInputSuppressed = !1;
		m_bVR = !1;
		m_fnGetNavTreeToActivateOverride;
		constructor(e, t, n, r) {
			((this.m_controller = e),
				(this.m_rootWindow = t),
				(this.m_activeWindow = t),
				(this.m_bIsGamepadInputSuppressed = n),
				(this.m_bVR = r));
		}
		get RootWindow() {
			return this.m_rootWindow;
		}
		get ActiveWindow() {
			return this.m_activeWindow;
		}
		FindNavTreeInFocusedWindow() {
			for (let e = this.m_rgGamepadNavigationTrees.length - 1; e >= 0; e--) {
				let t = this.m_rgGamepadNavigationTrees[e];
				if (t.Window?.document.hasFocus()) return t;
			}
		}
		FindNavTreeInWindow(e, t = !0) {
			for (let n = this.m_rgGamepadNavigationTrees.length - 1; n >= 0; n--) {
				let r = this.m_rgGamepadNavigationTrees[n];
				if (!(t && !r.BIsEnabled()) && r.Window == e) return r;
			}
		}
		OnMount(e) {
			e == this.m_rootWindow && (this.m_bMounted = !0);
		}
		Destroy(e) {
			e == this.m_rootWindow
				? (B(`${this.LogName(e)} Destroying context for window`),
					(this.m_bMounted = !1),
					this.m_schDeferredActivate.Cancel(),
					this.SetActive(!1, e),
					this.m_controller.DestroyContext(this))
				: B(`${this.LogName(e)} Child window destroyed`);
		}
		SetActive(e, t, n = void 0) {
			this.m_controller.BatchedUpdate(() => {
				if (e && !this.m_controller.BCanActivateContext(this)) {
					B(
						`${this.LogName(t)} Skipping context activation due to CFocusNavWindowContext`,
					);
					return;
				}
				let r = this.m_valueIsActive.Value != e;
				(e
					? ((this.m_activeWindow = t),
						(this.m_activeBrowserView = n),
						this.m_controller.OnContextActivated(this))
					: ((this.m_activeBrowserView = void 0),
						this.m_controller.OnContextDeactivated(this, !1)),
					this.m_valueIsActive.Set(e),
					r && this.m_LastActiveFocusNavTree?.OnContextActiveStateChanged(e));
			});
		}
		OnActivate(e) {
			(this.BIsActive() &&
				this.m_activeWindow == e &&
				this.m_activeBrowserView === void 0) ||
				(B(
					`${this.LogName(e)} Activating context, there are ${this.m_rgGamepadNavigationTrees.length} trees in this context`,
				),
				this.SetActive(!0, e));
		}
		OnActivateBrowserView(e, t) {
			(this.BIsActive() &&
				this.m_activeWindow == e &&
				this.m_activeBrowserView == t) ||
				(B(`${this.LogName(e)} Browser View "${t}" activated in context`),
				this.SetActive(!0, e, t));
		}
		OnDeactivate(e) {
			this.m_activeWindow == e
				? (B(`${this.LogName(e)} Deactivate context for window`),
					this.SetActive(!1, e))
				: B(
						`${this.LogName(e)} Blurred, but not deactivating because (${this.m_activeWindow?.name}) has focus.`,
					);
		}
		OnDeactivateBrowserView(e, t) {
			(B(`${this.LogName(e)} Browser View "${t}" deactivated in context`),
				this.m_activeBrowserView == t && this.SetActive(!1, e, t));
		}
		SetGamepadInputSuppressed(e) {
			this.m_bIsGamepadInputSuppressed = e;
		}
		BIsGamepadInputSuppressed() {
			return this.m_bIsGamepadInputSuppressed;
		}
		BIsVR() {
			return this.m_bVR;
		}
		BIsActive() {
			return this.m_valueIsActive.Value;
		}
		get IsActive() {
			return this.m_valueIsActive;
		}
		AddNavTree(e) {
			this.m_rgGamepadNavigationTrees.push(e);
		}
		LogName(e = void 0) {
			return e && this.m_rootWindow != e
				? `(${this.m_rootWindow.name}) > (${e.name})`
				: `(${this.m_rootWindow.name})`;
		}
		SetNavTreeToActivateOverride(e) {
			this.m_fnGetNavTreeToActivateOverride = e;
		}
		FindNavTreeToActivate() {
			let e,
				t = this.m_fnGetNavTreeToActivateOverride?.();
			if (t?.BIsEnabled()) e = t;
			else
				for (let t = this.m_rgGamepadNavigationTrees.length - 1; t >= 0; t--) {
					let n = this.m_rgGamepadNavigationTrees[t];
					if (n.BIsEnabled()) {
						e = n;
						break;
					}
				}
			return e?.FindModalDescendant() ?? e;
		}
		SetActiveNavTree(e, t = !1) {
			if (e && this.m_LastActiveNavTree == e) {
				this.m_NavTreeActivatedOrReactivatedCallbacks.Dispatch(e);
				return;
			}
			let n = this.m_LastActiveNavTree;
			(n && v(this.m_rgGamepadNavigationTrees, n),
				(e ||= this.FindNavTreeToActivate()));
			let r = this.m_LastActiveFocusNavTree == e;
			(e && v(this.m_rgGamepadNavigationTrees, e),
				(this.m_LastActiveNavTree = e),
				(!e || !e.BUseVirtualFocus()) && (this.m_LastActiveFocusNavTree = e),
				B(
					`${this.LogName(e?.Window)} Move from nav tree ${n?.id} to nav tree ${e?.id} ${t ? `taking focus` : `no focus`}`,
				),
				n && this.m_rgGamepadNavigationTrees.push(n),
				e &&
					(this.m_rgGamepadNavigationTrees.push(e),
					!r &&
						t &&
						!e.DeferredFocus.BHasQueuedFocusNode() &&
						e.DeferredFocus.RequestFocus(e.Root),
					this.m_NavTreeActivatedOrReactivatedCallbacks.Dispatch(e)),
				n && n != this.m_LastActiveFocusNavTree && n.OnDeactivate(e),
				e && !r && e.OnActivate(n));
		}
		BlurNavTree(e) {
			(this.m_LastActiveNavTree == e && this.SetActiveNavTree(void 0, !0),
				v(this.m_rgGamepadNavigationTrees, e),
				this.m_rgGamepadNavigationTrees.unshift(e));
		}
		async UnregisterGamepadNavigationTree(e) {
			(v(this.m_rgGamepadNavigationTrees, e),
				B(
					`(${this.m_rootWindow.name}) Unregister tree ${e?.id} ${this.m_LastActiveFocusNavTree == e ? `(was active)` : `(inactive)`}`,
				),
				e.SetIsEnabled(!1),
				this.m_LastActiveNavTree == e &&
					this.m_bMounted &&
					(await this.m_schDeferredActivate.AsyncSchedule(1, () => {
						(!this.m_LastActiveNavTree || this.m_LastActiveNavTree == e) &&
							this.SetActiveNavTree(void 0, !0);
					})));
		}
		get FocusChangedCallbacks() {
			return this.m_FocusChangedCallbacks;
		}
		get NavTreeActivatedOrReactivatedCallbacks() {
			return this.m_NavTreeActivatedOrReactivatedCallbacks;
		}
		m_iFocusChangeStack = 0;
		m_ActiveFocusChange;
		OnFocusChangeStart(e, t, n, r) {
			return (
				this.m_iFocusChangeStack == 0
					? (this.m_ActiveFocusChange = {
							source: e,
							from: n || void 0,
							to: r || void 0,
						})
					: this.m_ActiveFocusChange &&
						(!this.m_ActiveFocusChange.from &&
							n &&
							(this.m_ActiveFocusChange.from = n),
						r && (this.m_ActiveFocusChange.to = r)),
				this.m_iFocusChangeStack++
			);
		}
		OnFocusChangeComplete(e) {
			if (
				(this.m_iFocusChangeStack--,
				i(e == this.m_iFocusChangeStack, `out of order focus pop`),
				this.m_iFocusChangeStack == 0)
			) {
				let { source: e, from: t, to: n } = this.m_ActiveFocusChange ?? {};
				this.m_FocusChangedCallbacks.Dispatch(e, t, n);
			}
		}
		get NavigationSourceGlyphInfo() {
			return this.m_controller.NavigationSourceGlyphInfo;
		}
	},
	V = new g(`FocusNavigation`).Debug,
	Zt = new g(`FocusNavigation`).Assert,
	Qt = `focus-nav-show-debug-focus-ring`;
function $t() {
	return sessionStorage.getItem(Qt) == `shown`;
}
function en(e) {
	e ? sessionStorage.setItem(Qt, `shown`) : sessionStorage.removeItem(Qt);
}
function tn(e, t) {
	return (
		e?.eActivationSourceType === t?.eActivationSourceType &&
		e?.nActiveGamepadIndex === t?.nActiveGamepadIndex &&
		e?.nLastActiveGamepadIndex === t?.nLastActiveGamepadIndex
	);
}
var nn = class {
	m_rgGamepadInputSources = [];
	m_DefaultContext;
	m_rgAllContexts = [];
	m_ActiveContext;
	m_LastActiveContext;
	m_ContextSetChangedCallbacks = new u();
	m_rgCatchAllGamepadInput = [];
	m_UnhandledButtonEventsCallbacks = new u();
	m_navigationSource = _(
		{
			eActivationSourceType: d.UNKNOWN,
			nActiveGamepadIndex: -1,
			nLastActiveGamepadIndex: -1,
		},
		tn,
	);
	m_navigationSourceSupportsFocus = ie(this.m_navigationSource, (e) =>
		o(e?.eActivationSourceType),
	);
	m_bShowDebugFocusRing = _(!1);
	m_glyphInfo = _({ nControllerType: 4, nControllerStyle: 100 });
	m_bRestoringHistory = !1;
	m_fnGamepadEventUpdateBatcher = (e) => e();
	constructor() {
		window.FocusNavController = this;
	}
	Init() {
		this.m_bShowDebugFocusRing.Set($t());
	}
	CreateContext(e, t, n) {
		let r = new Xt(this, e, t, n);
		return (
			this.m_rgAllContexts.push(r),
			setTimeout(() => this.m_ContextSetChangedCallbacks.Dispatch(), 0),
			r
		);
	}
	DestroyContext(e) {
		(v(this.m_rgAllContexts, e), this.m_ContextSetChangedCallbacks.Dispatch());
	}
	GetDefaultContext() {
		return (
			(this.m_DefaultContext ||= this.CreateContext(window, !1, !1)),
			this.m_DefaultContext
		);
	}
	GetActiveContext() {
		return this.m_ActiveContext;
	}
	BHasVRGamepadNavigationContext() {
		return this.m_rgAllContexts?.some(
			(e) => e.BIsVR() && !e.BIsGamepadInputSuppressed(),
		);
	}
	FindContextForRootWindow(e) {
		return this.m_rgAllContexts?.find((t) => t.RootWindow == e);
	}
	BCanActivateContext(e) {
		return !(!e || (this.BHasVRGamepadNavigationContext() && !e.BIsVR()));
	}
	FindAnActiveContext() {
		if (!this.m_ActiveContext && this.m_rgAllContexts.length != 0) {
			console.warn(`No active context; finding one`);
			for (let e of this.m_rgAllContexts) {
				let t = e.FindNavTreeInFocusedWindow();
				if (t && this.BCanActivateContext(e)) {
					(V(
						`${e.LogName(t.Window)} Found a focused window; setting this context as active.`,
					),
						(this.m_ActiveContext = e),
						this.m_ActiveContext.OnActivate(t.Window));
					break;
				}
			}
		}
		return (
			!this.m_ActiveContext &&
				this.m_LastActiveContext &&
				this.BCanActivateContext(this.m_LastActiveContext) &&
				(V(
					`Failed to find an active context, will fall back to ${this.m_LastActiveContext.LogName()}`,
				),
				(this.m_ActiveContext = this.m_LastActiveContext),
				this.m_ActiveContext.OnActivate(
					this.m_LastActiveContext.m_LastActiveFocusNavTree?.Window,
				)),
			this.m_ActiveContext
		);
	}
	SetShowDebugFocusRing(e) {
		(this.m_bShowDebugFocusRing.Set(e), en(e));
	}
	GetShowDebugFocusRing() {
		return this.m_bShowDebugFocusRing;
	}
	RegisterInputSource(e) {
		let t = new fe();
		return (
			this.m_rgGamepadInputSources.push(e),
			t.PushArrayRemove(this.m_rgGamepadInputSources, e),
			t.Push(e.RegisterForGamepadButtonDown(this.OnButtonDown).Unregister),
			t.Push(e.RegisterForGamepadButtonUp(this.OnButtonUp).Unregister),
			t.Push(
				e.RegisterForNavigationTypeChange(this.OnNavigationTypeChange)
					.Unregister,
			),
			e.SetRepeatAllowed(() => this.m_ActiveContext?.BIsActive() ?? !1),
			t.Push(() => e.SetRepeatAllowed()),
			e.GetSourceType() == d.GAMEPAD && this.UpdateSourceToGamepad(),
			t.Push(e.Init(this).Unregister),
			t.GetUnregisterFunc()
		);
	}
	UpdateSourceToGamepad(e = !1) {
		(this.m_navigationSource.Value.eActivationSourceType == d.UNKNOWN || e) &&
			this.m_navigationSource.Set({
				...this.m_navigationSource.Value,
				eActivationSourceType: d.GAMEPAD,
			});
	}
	SetGamepadEventUpdateBatcher(e) {
		this.m_fnGamepadEventUpdateBatcher = e;
	}
	get NavigationSource() {
		return this.m_navigationSource;
	}
	get NavigationSourceSupportsFocus() {
		return this.m_navigationSourceSupportsFocus;
	}
	get NavigationSourceGlyphInfo() {
		return this.m_glyphInfo;
	}
	DispatchVirtualButtonClick(e, t, n) {
		let r;
		(t && (r = this.GetActiveContext() ?? this.FindAnActiveContext()),
			this.OnButtonDown(
				e,
				n ?? d.GAMEPAD,
				-1,
				void 0,
				void 0,
				void 0,
				t,
				r,
				!0,
			),
			this.OnButtonUp(e, n ?? d.GAMEPAD, -1, void 0, void 0, void 0, t, r, !0));
	}
	DispatchVirtualGamepad(e, t) {
		switch (e) {
			case `vgp_onbuttondown`:
				this.OnButtonDown(t.button, t.source, -1, t.is_repeat);
				break;
			case `vgp_onbuttonup`:
				this.OnButtonUp(t.button, t.source, -1);
				break;
		}
	}
	BGlobalGamepadButton(e) {
		return e === h.STEAM_GUIDE || e === h.STEAM_QUICK_MENU || e === h.CANCEL;
	}
	GetEventTarget(e, t, n = !1) {
		let r = this.GetActiveContext();
		!r && n && (r = this.FindAnActiveContext());
		let i = r?.ActiveWindow?.document.activeElement;
		if (r?.m_LastActiveNavTree) {
			if (
				((t ||= this.m_navigationSource?.Value?.eActivationSourceType),
				!r.m_LastActiveNavTree.GetLastFocusedNode() &&
					o(t) &&
					(V(
						`GetEventTarget: Context ${r.LogName()} tree ${r.m_LastActiveNavTree.id} has no focused node, ${n ? `finding one` : `will not find one`}`,
					),
					n && r.m_LastActiveNavTree.TakeFocus(m.GAMEPAD, !0),
					!this.BGlobalGamepadButton(e)))
			)
				return [void 0, r];
			r.m_LastActiveNavTree.GetLastFocusedNode()
				? (i = r.m_LastActiveNavTree?.GetLastFocusedNode()?.Element)
				: V(
						`GetEventTarget: Context ${r.LogName()} tree ${r.m_LastActiveNavTree.id} still has no focused node - will fall back to document.activeElement`,
					);
		}
		return [i, r];
	}
	ChangeNavigationSource(e, t, n, r) {
		let i = this.m_navigationSource.Value,
			a = i.nLastActiveGamepadIndex;
		return (
			i.nActiveGamepadIndex != null &&
				i.nActiveGamepadIndex >= 0 &&
				(a = i.nActiveGamepadIndex),
			this.m_navigationSource.Set({
				eActivationSourceType: e,
				nActiveGamepadIndex: t,
				nLastActiveGamepadIndex: a,
			}),
			n &&
				r &&
				this.m_glyphInfo.Set({ nControllerType: n, nControllerStyle: r }),
			e != d.MOUSE &&
				pe(`Browser.HideCursorUntilMouseEvent`) &&
				SteamClient.Browser.HideCursorUntilMouseEvent(),
			i.eActivationSourceType != e
		);
	}
	OnButtonActionInternal(e, t, n, r, i, a, o, s, c, l) {
		for (let n = this.m_rgCatchAllGamepadInput.length - 1; n >= 0; n--)
			if (this.m_rgCatchAllGamepadInput[n](t, e, i ?? !1)) {
				e &&
					V(
						`Ignoring button press - gamepad input is suppressed by parent window`,
					);
				return;
			}
		Zt(
			!!a == !!o,
			`Must set both overrideContext and overrideElement or neither`,
		);
		let u = a,
			d = o;
		if (
			((u == null || d == null) && ([u, d] = this.GetEventTarget(t, n, e)),
			d?.BIsGamepadInputSuppressed() && !s)
		) {
			V(
				`Suppressing ${h[t]} input on element ${u?.className} because tree ${d?.m_LastActiveNavTree?.id} has it disabled`,
			);
			return;
		}
		(this.ChangeNavigationSource(n, r, c, l),
			e && V(`Firing ${h[t]} in tree ${d?.m_LastActiveNavTree?.id} at `, u),
			this.BatchedUpdate(() =>
				f(u, e ? `vgp_onbuttondown` : `vgp_onbuttonup`, {
					button: t,
					source: n,
					is_repeat: i,
				}),
			));
	}
	OnButtonDown(e, t, n, r, i, a, o, s, c) {
		this.OnButtonActionInternal(!0, e, t, n, r, o, s, c, i, a);
	}
	OnButtonUp(e, t, n, r, i, a, o, s, c) {
		this.OnButtonActionInternal(!1, e, t, n, !1, o, s, c, i, a);
	}
	BatchedUpdate(e) {
		this.m_fnGamepadEventUpdateBatcher(e);
	}
	OnNavigationTypeChange(e) {
		if (
			this.ChangeNavigationSource(e, -1) &&
			!(!document.hasFocus() && !this.m_LastActiveContext?.BIsVR()) &&
			(e == d.MOUSE || e == d.TOUCH) &&
			this.m_ActiveContext?.m_LastActiveNavTree
		) {
			let e = this.m_ActiveContext.m_LastActiveNavTree.GetLastFocusedNode(),
				t = rn(e?.Element) ? e : null;
			this.m_ActiveContext.m_LastActiveNavTree?.TransferFocus(m.APPLICATION, t);
		}
	}
	NewGamepadNavigationTree(e, t, n, r) {
		return new Kt(this, e, t, n, r);
	}
	RegisterGamepadNavigationTree(e, t) {
		V(`Registering focusnav tree `, e.id);
		let n = e.WindowContext;
		n.AddNavTree(e);
		let r = e.MountNavTree(t);
		return (
			!e.Parent &&
				e.BIsEnabled() &&
				(this.BCanActivateContext(n) &&
					(this.m_LastActiveContext = this.m_ActiveContext = n),
				n.BIsVR() || n.SetActiveNavTree(e, !0)),
			() => {
				n.UnregisterGamepadNavigationTree(e).then(() => r());
			}
		);
	}
	OnGamepadNavigationTreeActivated(e, t = !1) {
		e.WindowContext.SetActiveNavTree(e, t);
	}
	OnGamepadNavigationTreeFocused(e, t, n = !1) {
		let r = e.WindowContext;
		(r != this.m_ActiveContext &&
			V(`(${r.LogName(e.Window)}) Focus event in inactive window`),
			e != r.m_LastActiveFocusNavTree &&
				e != r.m_LastActiveNavTree &&
				(r.m_LastActiveFocusNavTree?.GetParentEmbeddedNavTree() == e ||
				e.GetParentEmbeddedNavTree() == r.m_LastActiveFocusNavTree
					? t == m.AUTOFOCUS && r.m_LastActiveNavTree?.GetLastFocusedNode()
						? V(
								`There was an autofocus event in ${e.id}, but the active nav tree is ${r.m_LastActiveFocusNavTree?.id} and we already have something focused.  Source: ${t && m[t]}.`,
							)
						: (V(
								`There was a focus event in ${e.id}, allowing focus transfer to activate nav tree due to parent embedded relationship`,
							),
							e.Activate())
					: V(
							`There was a focus event in ${e.id}, but the active nav tree is ${r.m_LastActiveFocusNavTree?.id} so it is being ignored.  Source: ${t && m[t]}.`,
						)));
	}
	BlurNavTree(e) {
		e.WindowContext.BlurNavTree(e);
	}
	IsActiveFocusNavTree(e) {
		return !!(e && e == this.m_ActiveContext?.m_LastActiveFocusNavTree);
	}
	IsActiveNavTree(e) {
		return !!(e && e == this.m_ActiveContext?.m_LastActiveNavTree);
	}
	GetActiveNavTree() {
		return this.m_ActiveContext?.m_LastActiveNavTree;
	}
	BIsInActiveContext(e) {
		return !!(e && e.WindowContext == this.m_ActiveContext);
	}
	RegisterForUnhandledButtonDownEvents(e) {
		return this.m_UnhandledButtonEventsCallbacks.Register(e);
	}
	get ContextSetChangedCallbacks() {
		return this.m_ContextSetChangedCallbacks;
	}
	FireUnhandledGamepadEventCallbacks(e) {
		return this.m_UnhandledButtonEventsCallbacks.CountRegistered()
			? (this.m_UnhandledButtonEventsCallbacks.Dispatch(e), !1)
			: !0;
	}
	SetCatchAllGamepadInput(e) {
		return (
			this.m_rgCatchAllGamepadInput.push(e),
			{
				Unregister: () => {
					let t = this.m_rgCatchAllGamepadInput.indexOf(e);
					t >= 0 && this.m_rgCatchAllGamepadInput.splice(t, 1);
				},
			}
		);
	}
	TakeFocusChangingIFrame() {
		window.focus();
		let e =
			this.m_ActiveContext?.m_LastActiveFocusNavTree ||
			this.m_ActiveContext?.m_LastActiveNavTree;
		e && e.TakeFocus(m.APPLICATION);
	}
	OnContextActivated(e) {
		((this.m_ActiveContext = e), (this.m_LastActiveContext = e));
	}
	OnContextDeactivated(e, t) {
		(t &&
			(this.m_LastActiveContext == e && (this.m_LastActiveContext = void 0),
			this.DestroyContext(e)),
			this.m_ActiveContext == e && (this.m_ActiveContext = void 0));
	}
	BIsRestoringHistory() {
		return this.m_bRestoringHistory;
	}
	async RestoreHistoryTransaction(e) {
		this.m_bRestoringHistory = !0;
		try {
			await e();
		} finally {
			this.m_bRestoringHistory = !1;
		}
	}
};
(y([c], nn.prototype, `OnButtonDown`, null),
	y([c], nn.prototype, `OnButtonUp`, null),
	y([c], nn.prototype, `OnNavigationTypeChange`, null));
function rn(e) {
	if (!ae(e)) return !1;
	let t = e.tagName;
	return he(t, _e(e) ? e.type : void 0);
}
var an = F.lazy(() =>
	a(() => import(`./BzIy0sFB.js`), __vite__mapDeps([0]), import.meta.url),
);
function on(e) {
	return qe().metrics
		? (0, I.jsx)(F.Suspense, { children: (0, I.jsx)(an, { ...e }) })
		: null;
}
var sn = `BvATwcUCrt0-`,
	cn = (0, F.createContext)({}),
	ln = (0, F.createContext)(() => {});
function un(e) {
	let [t, n] = (0, F.useState)({});
	return (0, I.jsx)(cn.Provider, {
		value: t,
		children: (0, I.jsx)(ln.Provider, { value: n, children: e.children }),
	});
}
function dn() {
	return (0, F.useContext)(cn);
}
var H = t(lt(), 1),
	fn = F.memo(function (e) {
		let {
				defaultTextSize: t,
				accentColor: n = `blue`,
				dullColor: r = `greyneutral`,
				successColor: i = `green`,
				warningColor: a = `yellow`,
				errorColor: o = `red`,
				bodyTextColor: s = `text-light`,
				successTextColor: c = `text-green`,
				warningTextColor: l = `text-red`,
				errorTextColor: u = `text-red`,
				breakpoints: d,
				variants: f,
				children: p,
				zoo: ee,
			} = e,
			m;
		return (
			t &&
				(m = {
					"--default-font-size": `var(--text-size-${t})`,
					"--default-line-height": `var(--line-height-${t})`,
					"--default-letter-spacing": `var(--letter-spacing-${t})`,
				}),
			(0, I.jsx)(un, {
				children: (0, I.jsx)(ht, {
					breakpoints: d,
					children: (0, I.jsx)(pn, {
						children: (0, I.jsx)(`div`, {
							className: (0, H.default)(sn, `noOpinionatedGlobalStyles`),
							style: m,
							children: (0, I.jsxs)(xt, {
								accentColor: n,
								dullColor: r,
								successColor: i,
								warningColor: a,
								errorColor: o,
								bodyTextColor: s,
								successTextColor: c,
								warningTextColor: l,
								errorTextColor: u,
								variants: f,
								children: [p, !1],
							}),
						}),
					}),
				}),
			})
		);
	});
function pn(e) {
	let { children: t } = e,
		{ formFactorOverride: n } = dn();
	return (0, I.jsx)(pt, { formFactor: n, children: t });
}
function mn() {
	return it(at) === `desktop`;
}
function hn() {
	(nt(at, `desktop`), `location` in window && location.reload());
}
function gn() {
	(mn() && ot(at), `location` in window && location.reload());
}
function _n(e) {
	let { dynamicImport: t, fallback: n, ...r } = e,
		[i] = (0, F.useState)(() => F.lazy(async () => ({ default: await t() })));
	return (0, I.jsx)(Ie, {
		fallback: n,
		children: (0, I.jsx)(F.Suspense, {
			fallback: n,
			children: (0, I.jsx)(i, { ...r }),
		}),
	});
}
var U = t(Se(), 1),
	vn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.country_code || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						country_code: { n: 1, br: C.readString, bw: D.writeString },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetAvailableValveDiscountPromotions_Request`;
		}
	},
	yn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.promotions || w(e.M()),
				U.Message.initialize(this, t, 0, -1, [1], null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: { promotions: { n: 1, c: bn, r: !0, q: !0 } },
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetAvailableValveDiscountPromotions_Response`;
		}
	},
	bn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.promotionid || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						promotionid: { n: 1, br: C.readUint32, bw: D.writeUint32 },
						promotion_description: {
							n: 2,
							br: C.readString,
							bw: D.writeString,
						},
						minimum_cart_amount: {
							n: 3,
							br: C.readInt64String,
							bw: D.writeInt64String,
						},
						minimum_cart_amount_for_display: {
							n: 4,
							br: C.readInt64String,
							bw: D.writeInt64String,
						},
						discount_amount: {
							n: 5,
							br: C.readInt64String,
							bw: D.writeInt64String,
						},
						currency_code: { n: 6, br: C.readInt32, bw: D.writeInt32 },
						available_use_count: { n: 7, br: C.readInt32, bw: D.writeInt32 },
						promotional_discount_type: {
							n: 8,
							br: C.readInt32,
							bw: D.writeInt32,
						},
						loyalty_reward_id: { n: 9, br: C.readInt32, bw: D.writeInt32 },
						localized_name_token: {
							n: 10,
							br: C.readString,
							bw: D.writeString,
						},
						max_use_count: { n: 11, br: C.readInt32, bw: D.writeInt32 },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetAvailableValveDiscountPromotions_Response_ValveDiscountPromotionDetails`;
		}
	},
	xn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.appid || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						appid: { n: 1, br: C.readUint32, bw: D.writeUint32 },
						opt_out_in_library_events: {
							n: 2,
							d: !1,
							br: C.readBool,
							bw: D.writeBool,
						},
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CPerAppEmailOptions`;
		}
	},
	Sn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.clanid || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						clanid: { n: 1, br: C.readUint32, bw: D.writeUint32 },
						opt_out_in_library_events: {
							n: 2,
							d: !1,
							br: C.readBool,
							bw: D.writeBool,
						},
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CPerClanEmailOptions`;
		}
	},
	Cn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.opt_out_token || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						opt_out_token: { n: 1, br: C.readString, bw: D.writeString },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetOptOutEmailOptions_Request`;
		}
	},
	wn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.email || w(e.M()),
				U.Message.initialize(this, t, 0, -1, [10, 11], null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						email: { n: 1, br: C.readString, bw: D.writeString },
						opt_out_all: { n: 2, br: C.readBool, bw: D.writeBool },
						opt_out_wishlist_sales: { n: 3, br: C.readBool, bw: D.writeBool },
						opt_out_seasonal_promo: { n: 4, br: C.readBool, bw: D.writeBool },
						opt_out_wishlist_releases: {
							n: 5,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_greenlight_releases: {
							n: 6,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_curator_connect: { n: 7, br: C.readBool, bw: D.writeBool },
						opt_out_creator_home_releases: {
							n: 8,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_in_library_events: {
							n: 9,
							br: C.readBool,
							bw: D.writeBool,
						},
						per_app_opt_outs: { n: 10, c: xn, r: !0, q: !0 },
						per_clan_opt_outs: { n: 11, c: Sn, r: !0, q: !0 },
						opt_out_loyalty_awards_received: {
							n: 12,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_partner_messages: {
							n: 13,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_year_in_review: { n: 14, br: C.readBool, bw: D.writeBool },
						opt_out_wishlist_demo_releases: {
							n: 15,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_creator_home_demo_releases: {
							n: 16,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_next_fest_starts: {
							n: 17,
							d: !0,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_theme_sale_starts: {
							n: 18,
							d: !0,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_season_pass_ship: {
							n: 19,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_roadmap_ship: { n: 20, br: C.readBool, bw: D.writeBool },
						is_self: { n: 21, br: C.readBool, bw: D.writeBool },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetOptOutEmailOptions_Response`;
		}
	},
	Tn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.opt_out_token || w(e.M()),
				U.Message.initialize(this, t, 0, -1, [10, 11], null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						opt_out_token: { n: 1, br: C.readString, bw: D.writeString },
						opt_out_all: { n: 2, br: C.readBool, bw: D.writeBool },
						opt_out_wishlist_sales: { n: 3, br: C.readBool, bw: D.writeBool },
						opt_out_seasonal_promo: { n: 4, br: C.readBool, bw: D.writeBool },
						opt_out_wishlist_releases: {
							n: 5,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_greenlight_releases: {
							n: 6,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_curator_connect: { n: 7, br: C.readBool, bw: D.writeBool },
						opt_out_creator_home_releases: {
							n: 8,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_in_library_events: {
							n: 9,
							br: C.readBool,
							bw: D.writeBool,
						},
						per_app_opt_outs: { n: 10, c: xn, r: !0, q: !0 },
						per_clan_opt_outs: { n: 11, c: Sn, r: !0, q: !0 },
						opt_out_loyalty_awards_received: {
							n: 12,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_partner_messages: {
							n: 13,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_year_in_review: { n: 14, br: C.readBool, bw: D.writeBool },
						opt_out_wishlist_demo_releases: {
							n: 15,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_creator_home_demo_releases: {
							n: 16,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_next_fest_starts: {
							n: 17,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_theme_sale_starts: {
							n: 18,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_season_pass_ship: {
							n: 19,
							br: C.readBool,
							bw: D.writeBool,
						},
						opt_out_roadmap_ship: { n: 20, br: C.readBool, bw: D.writeBool },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_SetOptOutEmailOptions_Request`;
		}
	},
	En = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(e = null) {
			(super(), U.Message.initialize(this, e, 0, -1, void 0, null));
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(e, t) {
			return e ? { $jspbMessageInstance: t } : {};
		}
		static fromObject(t) {
			return new e();
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(e, t) {
			return e;
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(e, t) {}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_SetOptOutEmailOptions_Response`;
		}
	},
	Dn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.has_wallet || w(e.M()),
				U.Message.initialize(this, t, 0, -1, [13], null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						has_wallet: { n: 1, br: C.readBool, bw: D.writeBool },
						user_country_code: { n: 2, br: C.readString, bw: D.writeString },
						wallet_country_code: { n: 3, br: C.readString, bw: D.writeString },
						wallet_state: { n: 4, br: C.readString, bw: D.writeString },
						balance: { n: 5, br: C.readInt64String, bw: D.writeInt64String },
						delayed_balance: {
							n: 6,
							br: C.readInt64String,
							bw: D.writeInt64String,
						},
						currency_code: { n: 7, br: C.readInt32, bw: D.writeInt32 },
						time_most_recent_txn: { n: 8, br: C.readUint32, bw: D.writeUint32 },
						most_recent_txnid: {
							n: 9,
							br: C.readUint64String,
							bw: D.writeUint64String,
						},
						balance_in_usd: {
							n: 10,
							br: C.readInt64String,
							bw: D.writeInt64String,
						},
						delayed_balance_in_usd: {
							n: 11,
							br: C.readInt64String,
							bw: D.writeInt64String,
						},
						has_wallet_in_other_regions: {
							n: 12,
							br: C.readBool,
							bw: D.writeBool,
						},
						other_regions: {
							n: 13,
							r: !0,
							q: !0,
							br: C.readInt32,
							pbr: C.readPackedInt32,
							bw: D.writeRepeatedInt32,
						},
						formatted_balance: { n: 14, br: C.readString, bw: D.writeString },
						formatted_delayed_balance: {
							n: 15,
							br: C.readString,
							bw: D.writeString,
						},
						delayed_balance_available_min_time: {
							n: 16,
							br: C.readInt32,
							bw: D.writeInt32,
						},
						delayed_balance_available_max_time: {
							n: 17,
							br: C.readInt32,
							bw: D.writeInt32,
						},
						delayed_balance_newest_source: {
							n: 18,
							br: C.readInt32,
							bw: D.writeInt32,
						},
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetWalletDetails_Response`;
		}
	},
	On = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.include_balance_in_usd || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						include_balance_in_usd: { n: 1, br: C.readBool, bw: D.writeBool },
						wallet_region: { n: 2, d: 1, br: C.readInt32, bw: D.writeInt32 },
						include_formatted_balance: {
							n: 3,
							br: C.readBool,
							bw: D.writeBool,
						},
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetClientWalletDetails_Request`;
		}
	},
	kn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(e = null) {
			(super(), U.Message.initialize(this, e, 0, -1, void 0, null));
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(e, t) {
			return e ? { $jspbMessageInstance: t } : {};
		}
		static fromObject(t) {
			return new e();
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(e, t) {
			return e;
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(e, t) {}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetAccountLinkStatus_Request`;
		}
	},
	An = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.pwid || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						pwid: { n: 1, br: C.readUint32, bw: D.writeUint32 },
						identity_verification: {
							n: 2,
							br: C.readUint32,
							bw: D.writeUint32,
						},
						performed_age_verification: {
							n: 3,
							br: C.readBool,
							bw: D.writeBool,
						},
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetAccountLinkStatus_Response`;
		}
	},
	jn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.appid || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: { appid: { n: 1, br: C.readUint32, bw: D.writeUint32 } },
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_CancelLicenseForApp_Request`;
		}
	},
	Mn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(e = null) {
			(super(), U.Message.initialize(this, e, 0, -1, void 0, null));
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(e, t) {
			return e ? { $jspbMessageInstance: t } : {};
		}
		static fromObject(t) {
			return new e();
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(e, t) {
			return e;
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(e, t) {}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_CancelLicenseForApp_Response`;
		}
	},
	Nn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.steamid || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						steamid: {
							n: 1,
							br: C.readFixed64String,
							bw: D.writeFixed64String,
						},
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetUserCountry_Request`;
		}
	},
	Pn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.country || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: { country: { n: 1, br: C.readString, bw: D.writeString } },
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetUserCountry_Response`;
		}
	},
	Fn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.invite_limit || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						invite_limit: { n: 1, br: C.readUint32, bw: D.writeUint32 },
						invite_duration: { n: 2, br: C.readUint32, bw: D.writeUint32 },
						invite_note: { n: 3, br: C.readString, bw: D.writeString },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_CreateFriendInviteToken_Request`;
		}
	},
	In = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.invite_token || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						invite_token: { n: 1, br: C.readString, bw: D.writeString },
						invite_limit: {
							n: 2,
							br: C.readUint64String,
							bw: D.writeUint64String,
						},
						invite_duration: {
							n: 3,
							br: C.readUint64String,
							bw: D.writeUint64String,
						},
						time_created: { n: 4, br: C.readFixed32, bw: D.writeFixed32 },
						valid: { n: 5, br: C.readBool, bw: D.writeBool },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_CreateFriendInviteToken_Response`;
		}
	},
	Ln = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(e = null) {
			(super(), U.Message.initialize(this, e, 0, -1, void 0, null));
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(e, t) {
			return e ? { $jspbMessageInstance: t } : {};
		}
		static fromObject(t) {
			return new e();
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(e, t) {
			return e;
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(e, t) {}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetFriendInviteTokens_Request`;
		}
	},
	Rn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.tokens || w(e.M()),
				U.Message.initialize(this, t, 0, -1, [1], null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: { tokens: { n: 1, c: In, r: !0, q: !0 } },
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_GetFriendInviteTokens_Response`;
		}
	},
	zn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.steamid || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						steamid: {
							n: 1,
							br: C.readFixed64String,
							bw: D.writeFixed64String,
						},
						invite_token: { n: 2, br: C.readString, bw: D.writeString },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_ViewFriendInviteToken_Request`;
		}
	},
	Bn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.valid || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						valid: { n: 1, br: C.readBool, bw: D.writeBool },
						steamid: { n: 2, br: C.readUint64String, bw: D.writeUint64String },
						invite_duration: {
							n: 3,
							br: C.readUint64String,
							bw: D.writeUint64String,
						},
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_ViewFriendInviteToken_Response`;
		}
	},
	Vn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.steamid || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						steamid: {
							n: 1,
							br: C.readFixed64String,
							bw: D.writeFixed64String,
						},
						invite_token: { n: 2, br: C.readString, bw: D.writeString },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_RedeemFriendInviteToken_Request`;
		}
	},
	Hn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(e = null) {
			(super(), U.Message.initialize(this, e, 0, -1, void 0, null));
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(e, t) {
			return e ? { $jspbMessageInstance: t } : {};
		}
		static fromObject(t) {
			return new e();
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(e, t) {
			return e;
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(e, t) {}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_RedeemFriendInviteToken_Response`;
		}
	},
	Un = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.invite_token || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						invite_token: { n: 1, br: C.readString, bw: D.writeString },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_RevokeFriendInviteToken_Request`;
		}
	},
	Wn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(e = null) {
			(super(), U.Message.initialize(this, e, 0, -1, void 0, null));
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(e, t) {
			return e ? { $jspbMessageInstance: t } : {};
		}
		static fromObject(t) {
			return new e();
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(e, t) {
			return e;
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(e, t) {}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_RevokeFriendInviteToken_Response`;
		}
	},
	Gn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.compat_tool || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						compat_tool: { n: 1, br: C.readUint32, bw: D.writeUint32 },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_RegisterCompatTool_Request`;
		}
	},
	Kn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(e = null) {
			(super(), U.Message.initialize(this, e, 0, -1, void 0, null));
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(e, t) {
			return e ? { $jspbMessageInstance: t } : {};
		}
		static fromObject(t) {
			return new e();
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(e, t) {
			return e;
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(e, t) {}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CUserAccount_RegisterCompatTool_Response`;
		}
	},
	qn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.steamid || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						steamid: {
							n: 1,
							br: C.readFixed64String,
							bw: D.writeFixed64String,
						},
						client_token: { n: 2, br: C.readBytes, bw: D.writeBytes },
						expiry: { n: 3, br: C.readUint32, bw: D.writeUint32 },
						deviceid: { n: 4, br: C.readUint32, bw: D.writeUint32 },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CEmbeddedClient_Token`;
		}
	},
	Jn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.result || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						result: { n: 1, br: C.readUint32, bw: D.writeUint32 },
						token: { n: 2, c: qn },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CEmbeddedClient_AuthorizeDevice_Response`;
		}
	},
	Yn = class e extends U.Message {
		static ImplementsStaticInterface() {}
		constructor(t = null) {
			(super(),
				e.prototype.steamid || w(e.M()),
				U.Message.initialize(this, t, 0, -1, void 0, null));
		}
		static sm_m;
		static sm_mbf;
		static M() {
			return (
				(e.sm_m ||= {
					proto: e,
					fields: {
						steamid: {
							n: 1,
							br: C.readFixed64String,
							bw: D.writeFixed64String,
						},
						appid: { n: 2, br: C.readUint32, bw: D.writeUint32 },
						device_info: { n: 3, br: C.readString, bw: D.writeString },
						deviceid: { n: 4, br: C.readUint32, bw: D.writeUint32 },
					},
				}),
				e.sm_m
			);
		}
		static MBF() {
			return ((e.sm_mbf ||= T(e.M())), e.sm_mbf);
		}
		toObject(t = !1) {
			return e.toObject(t, this);
		}
		static toObject(t, n) {
			return b(e.M(), t, n);
		}
		static fromObject(t) {
			return S(e.M(), t);
		}
		static deserializeBinary(t) {
			let n = new U.BinaryReader(t),
				r = new e();
			return e.deserializeBinaryFromReader(r, n);
		}
		static deserializeBinaryFromReader(t, n) {
			return x(e.MBF(), t, n);
		}
		serializeBinary() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBuffer());
		}
		static serializeBinaryToWriter(t, n) {
			k(e.M(), t, n);
		}
		serializeBase64String() {
			var t = new U.BinaryWriter();
			return (e.serializeBinaryToWriter(this, t), t.getResultBase64String());
		}
		getClassName() {
			return `CEmbeddedClient_AuthorizeCurrentDevice_Request`;
		}
	},
	Xn;
(function (e) {
	function t(e, t, n) {
		return e.SendMsg(
			`UserAccount.GetAvailableValveDiscountPromotions#1`,
			E(vn, t, n),
			yn,
			{
				bConstMethod: !0,
				ePrivilege: 2,
				eWebAPIKeyRequirement: 1,
			},
		);
	}
	e.GetAvailableValveDiscountPromotions = t;
	function n(e, t, n) {
		return e.SendMsg(`UserAccount.GetOptOutEmailOptions#1`, E(Cn, t, n), wn, {
			bConstMethod: !0,
			ePrivilege: 2,
		});
	}
	e.GetOptOutEmailOptions = n;
	function r(e, t, n) {
		return e.SendMsg(`UserAccount.SetOptOutEmailOptions#1`, E(Tn, t, n), En, {
			ePrivilege: 2,
		});
	}
	e.SetOptOutEmailOptions = r;
	function i(e, t, n) {
		return e.SendMsg(`UserAccount.GetClientWalletDetails#1`, E(On, t, n), Dn, {
			ePrivilege: 1,
		});
	}
	e.GetClientWalletDetails = i;
	function a(e, t, n) {
		return e.SendMsg(`UserAccount.GetAccountLinkStatus#1`, E(kn, t, n), An, {
			ePrivilege: 1,
		});
	}
	e.GetAccountLinkStatus = a;
	function o(e, t, n) {
		return e.SendMsg(`UserAccount.CancelLicenseForApp#1`, E(jn, t, n), Mn, {
			ePrivilege: 1,
		});
	}
	e.CancelLicenseForApp = o;
	function s(e, t, n) {
		return e.SendMsg(`UserAccount.GetUserCountry#1`, E(Nn, t, n), Pn, {
			ePrivilege: 1,
		});
	}
	e.GetUserCountry = s;
	function c(e, t, n) {
		return e.SendMsg(`UserAccount.CreateFriendInviteToken#1`, E(Fn, t, n), In, {
			ePrivilege: 3,
		});
	}
	e.CreateFriendInviteToken = c;
	function l(e, t, n) {
		return e.SendMsg(`UserAccount.GetFriendInviteTokens#1`, E(Ln, t, n), Rn, {
			ePrivilege: 1,
		});
	}
	e.GetFriendInviteTokens = l;
	function u(e, t, n) {
		return e.SendMsg(`UserAccount.ViewFriendInviteToken#1`, E(zn, t, n), Bn, {
			ePrivilege: 1,
		});
	}
	e.ViewFriendInviteToken = u;
	function d(e, t, n) {
		return e.SendMsg(`UserAccount.RedeemFriendInviteToken#1`, E(Vn, t, n), Hn, {
			ePrivilege: 1,
		});
	}
	e.RedeemFriendInviteToken = d;
	function f(e, t, n) {
		return e.SendMsg(`UserAccount.RevokeFriendInviteToken#1`, E(Un, t, n), Wn, {
			ePrivilege: 1,
		});
	}
	e.RevokeFriendInviteToken = f;
	function p(e, t, n) {
		return e.SendMsg(`UserAccount.RegisterCompatTool#1`, E(Gn, t, n), Kn, {
			ePrivilege: 1,
		});
	}
	e.RegisterCompatTool = p;
})((Xn ||= {}));
var Zn;
(function (e) {
	function t(e, t, n) {
		return e.SendMsg(
			`EmbeddedClient.AuthorizeCurrentDevice#1`,
			E(Yn, t, n),
			Jn,
			{ ePrivilege: 1 },
		);
	}
	e.AuthorizeCurrentDevice = t;
})((Zn ||= {}));
var Qn = 1,
	$n = 2;
function er() {
	return [`CurrentUserWalletDetails`, Ce.accountid];
}
function tr(e) {
	return {
		queryKey: er(),
		queryFn: async () => {
			if (!Ce.accountid) return;
			let t = O.EREALM === Ne.k_ESteamRealmChina;
			return (
				await Xn.GetClientWalletDetails(e, {
					wallet_region: t ? $n : Qn,
					include_formatted_balance: !0,
				})
			)
				.Body()
				.toObject();
		},
		staleTime: 600 * 1e3,
	};
}
function nr() {
	return je(tr(Ge()));
}
var rr = `USDyb53meAE-`,
	ir = `M6Pai7xYxtg-`,
	ar = `_84yL92kXlzo-`,
	or = `-QcLqQWGg4g-`,
	sr = `e-j9Y1J8-N8-`;
async function cr(e, t) {
	let n = new FormData();
	n.set(`language`, e);
	let r = await fetch(t, {
		method: `POST`,
		credentials: `same-origin`,
		body: n,
	});
	if (!r.ok) throw r;
}
function lr(e) {
	let {
			open: t,
			menuAction: n,
			changeLanguagePath: r,
			bLoggedIn: i,
			bSkipLanguagePrefs: a,
			onDismiss: o,
		} = e,
		[s, c] = (0, F.useState)(!1),
		l = (0, F.useRef)(null);
	(0, F.useEffect)(() => {
		t ? l.current?.showModal() : l.current?.close();
	}, [t]);
	async function u(e) {
		c(!0);
		try {
			await cr(e, r);
		} catch (e) {
			(console.error(e), c(!1));
			return;
		}
		i && !a
			? (location.href = O.STORE_BASE_URL + `account/languagepreferences/`)
			: n.href
				? (location.href = n.href)
				: location.reload();
	}
	return (0, I.jsx)(`dialog`, {
		ref: l,
		className: rr,
		onMouseDown: (e) => e.target === l.current && o(),
		children: (0, I.jsxs)(`div`, {
			children: [
				(0, I.jsx)(`hr`, { className: ar }),
				(0, I.jsxs)(`form`, {
					method: `dialog`,
					className: ir,
					onSubmit: (e) => u(e.target.elements.namedItem(`language`)?.value),
					children: [
						(0, I.jsx)(`select`, {
							disabled: s,
							name: `language`,
							onChange: (e) => u(e.target.value),
							defaultValue: Qe().strLanguage,
							children: e.menuAction.children?.map((e) =>
								(0, I.jsx)(
									`option`,
									{ value: e.action_parameters?.language, children: e.label },
									e.label,
								),
							),
						}),
						(0, I.jsx)(`div`, {
							className: or,
							children: (0, I.jsx)(`input`, {
								type: `submit`,
								value: `OK`,
								className: sr,
							}),
						}),
					],
				}),
			],
		}),
	});
}
var ur = `X-UKhqf-Moc-`,
	dr = `nikULGV-7Q0-`,
	fr = `-yy5spKdnuw-`,
	pr = `YIU8yTvS858-`,
	mr = `QO6CjVPSFuI-`,
	hr = `vTro5UlZ-gU-`,
	gr = `En-WtuWIGUc-`,
	_r = `_6SYP6u3KmrY-`,
	vr = `LxGIxXUwILQ-`,
	yr = `XYfgXgWUac8-`,
	br = `_7ykpxZ0stGM-`,
	W = {};
((W.arabic = () => a(() => import(`./CXRh2for.js`), [], import.meta.url)),
	(W.brazilian = () => a(() => import(`./DhfZpnGN.js`), [], import.meta.url)),
	(W.bulgarian = () => a(() => import(`./Db6QlCmU.js`), [], import.meta.url)),
	(W.czech = () => a(() => import(`./CxYWAkLH.js`), [], import.meta.url)),
	(W.danish = () => a(() => import(`./D8WlaMGZ.js`), [], import.meta.url)),
	(W.dutch = () => a(() => import(`./CwS32Wby.js`), [], import.meta.url)),
	(W.english = () => a(() => import(`./Dpu__Y30.js`), [], import.meta.url)),
	(W.finnish = () => a(() => import(`./DLyCHUL7.js`), [], import.meta.url)),
	(W.french = () => a(() => import(`./DlB92d_O2.js`), [], import.meta.url)),
	(W.german = () => a(() => import(`./CB-Znb8_2.js`), [], import.meta.url)),
	(W.greek = () => a(() => import(`./CbjTV9P92.js`), [], import.meta.url)),
	(W.hungarian = () => a(() => import(`./Xxlh2u6E2.js`), [], import.meta.url)),
	(W.indonesian = () => a(() => import(`./nVv36xvQ2.js`), [], import.meta.url)),
	(W.italian = () => a(() => import(`./CTp5PEot2.js`), [], import.meta.url)),
	(W.japanese = () => a(() => import(`./dmz8d30T2.js`), [], import.meta.url)),
	(W.koreana = () => a(() => import(`./BNgmGbLG2.js`), [], import.meta.url)),
	(W.latam = () => a(() => import(`./D3FXvwLL2.js`), [], import.meta.url)),
	(W.malay = () => a(() => import(`./DTbQR3hC2.js`), [], import.meta.url)),
	(W.norwegian = () => a(() => import(`./DKME1Jev2.js`), [], import.meta.url)),
	(W.polish = () => a(() => import(`./DkoXIs9D2.js`), [], import.meta.url)),
	(W.portuguese = () => a(() => import(`./CN1YlgzX2.js`), [], import.meta.url)),
	(W.romanian = () => a(() => import(`./DirR0TcY2.js`), [], import.meta.url)),
	(W.russian = () => a(() => import(`./B6pNkZl-2.js`), [], import.meta.url)),
	(W.sc_schinese = () =>
		a(() => import(`./CldGdb6E2.js`), [], import.meta.url)),
	(W.schinese = () => a(() => import(`./W3xbhZ1a2.js`), [], import.meta.url)),
	(W.spanish = () => a(() => import(`./CK6YAZUQ2.js`), [], import.meta.url)),
	(W.swedish = () => a(() => import(`./CoipiwE-2.js`), [], import.meta.url)),
	(W.tchinese = () => a(() => import(`./lCCmLfi-2.js`), [], import.meta.url)),
	(W.thai = () => a(() => import(`./CtxCBZGM2.js`), [], import.meta.url)),
	(W.turkish = () => a(() => import(`./Be-JwR2a2.js`), [], import.meta.url)),
	(W.ukrainian = () => a(() => import(`./BVB0fHBN2.js`), [], import.meta.url)),
	(W.vietnamese = () =>
		a(() => import(`./CZi0kN3X2.js`), [], import.meta.url)));
async function xr(e) {
	if (W[e]) return await W[e]();
}
var G = We(xr);
function Sr(e = `/logout/`) {
	let t = document.createElement(`form`);
	((t.action = e),
		(t.method = `POST`),
		document.body.appendChild(t),
		t.submit());
}
function Cr(e) {
	let { action: t } = e,
		n = (0, F.useContext)(wr),
		r = `span`,
		i = {};
	return (
		t.href &&
			((r = M),
			(i.to = t.href),
			(i.external = !t.ssr),
			t.href.startsWith(O.STORE_BASE_URL) &&
				(i.snr = { feature: `globalheader` })),
		t.action &&
			(t.href || (r = `button`),
			(i.onClick = async function (e) {
				switch ((e.preventDefault(), t.action)) {
					case 1:
						Sr(n.logoutPath);
						return;
					case 2:
						if (t.action_parameters?.language === void 0)
							throw `Missing language`;
						try {
							await cr(t.action_parameters.language, n.changeLanguagePath);
						} catch (e) {
							console.error(e);
							return;
						}
						n.userDetails
							? (location.href =
									O.STORE_BASE_URL + `account/languagepreferences/`)
							: t.href
								? (location.href = t.href)
								: location.reload();
						return;
				}
			})),
		(0, I.jsx)(P, {
			menuTarget: (0, I.jsxs)(r, {
				...i,
				tabIndex: 0,
				className: gr,
				children: [
					Ye(t.label, (0, I.jsx)(`span`, { className: dr })),
					t.beta &&
						(0, I.jsx)(`span`, {
							className: `_7ngrCnz6jgA-`,
							children: G.Localize(`#beta_tag`),
						}),
				],
			}),
			direction: `left`,
			className: vr,
			children: t.children?.map((e, t) => (0, I.jsx)(Cr, { action: e }, t)),
		})
	);
}
var wr = (0, F.createContext)({});
function Tr(e) {
	return (0, I.jsx)(wr.Provider, {
		value: e,
		children: e.globalActions.map((e, t) =>
			(0, I.jsx)(
				P,
				{
					direction: `down-left`,
					menuTarget: (0, I.jsx)(`button`, {
						className: pr,
						children: e.label,
					}),
					className: _r,
					interactionMode: 1,
					children: e.children?.map((e, t) => (0, I.jsx)(Cr, { action: e }, t)),
				},
				t,
			),
		),
	});
}
function Er() {
	let { data: e } = nr();
	return (0, I.jsx)(`div`, { className: mr, children: e?.formatted_balance });
}
function Dr(e) {
	let { userDetails: t } = e,
		[n, r] = (0, F.useState)(void 0),
		i = `/login/${n ? `?redir=${encodeURIComponent(n)}` : ``}`;
	return (
		(0, F.useEffect)(() => {
			r(location.href);
		}, []),
		t
			? (0, I.jsxs)(`div`, {
					className: ur,
					children: [
						(0, I.jsx)(`a`, {
							className: yr,
							href: O.STORE_BASE_URL + `about/`,
							children: G.Localize(`#global_menu_install_steam`),
						}),
						e.notifications &&
							(0, I.jsx)(`div`, {
								className: `PI-IEC-WlRE-`,
								children: (0, I.jsx)(_n, {
									dynamicImport: async () =>
										(
											await a(
												async () => {
													let { GreenEnvelope: e } = await import(
														`./jS4RLijH.js`
													);
													return { GreenEnvelope: e };
												},
												__vite__mapDeps([1, 2, 3, 4]),
												import.meta.url,
											)
										).GreenEnvelope,
									fallback: (0, I.jsx)(`div`, { className: `FZlHN3ErsM8-` }),
									bResponsiveHeader: !1,
									notifications: e.notifications,
								}),
							}),
						(0, I.jsxs)(`div`, {
							className: hr,
							children: [
								(0, I.jsx)(Tr, {
									userDetails: t,
									globalActions: e.globalActions,
									changeLanguagePath: e.changeLanguagePath,
									logoutPath: e.logoutPath,
								}),
								(0, I.jsx)(Er, {}),
							],
						}),
						(0, I.jsx)(`a`, {
							className: fr,
							href: Ot(t),
							children: (0, I.jsx)(Mt, {
								playerLinkDetails: t,
								statusPosition: `border`,
								alt: ``,
								role: `presentation`,
								size: `Small`,
							}),
						}),
					],
				})
			: (0, I.jsx)(`div`, {
					className: ur,
					children: (0, I.jsxs)(`div`, {
						className: hr,
						children: [
							(0, I.jsx)(`a`, {
								className: (0, H.default)(yr, br),
								href: O.STORE_BASE_URL + `about/`,
								children: G.Localize(`#global_menu_install_steam`),
							}),
							`\xA0`,
							(0, I.jsx)(`a`, {
								href: i,
								className: gr,
								children: G.Localize(`#global_menu_login`),
							}),
							e.globalActions.length > 0 &&
								(0, I.jsxs)(I.Fragment, {
									children: [
										`\xA0\xA0|\xA0\xA0`,
										(0, I.jsx)(Tr, {
											userDetails: t,
											globalActions: e.globalActions,
											changeLanguagePath: e.changeLanguagePath,
											logoutPath: e.logoutPath,
										}),
									],
								}),
						],
					}),
				})
	);
}
var Or = `_7urhuKLYiUk-`,
	kr = `zugXgzI1-Ig-`,
	Ar = `NGjNcNxDz0Y-`,
	jr = `iEaHFy2Quxg-`,
	Mr = `LVqCHgnXxYs-`,
	Nr = `r0Jn4sdskW4-`,
	Pr = `_3xhf62uevQo-`,
	Fr = `JHTb0KR9c-o-`,
	Ir = `FAoztKwEGgQ-`,
	Lr = `JGImopK-SYs-`,
	Rr = `KHtcfezTz4s-`,
	K = (0, F.forwardRef)(function (e, t) {
		let { item: n, responsive: r, className: i, ...a } = e,
			o = n.label;
		return (
			r && (o = n.label_responsive ?? n.label),
			(0, I.jsx)(I.Fragment, {
				children: (0, I.jsxs)(M, {
					className: (0, H.default)(i, n.valveOnly && `_7WvpcB-dbNc-`),
					to: n.href,
					"aria-current": n.active ? `page` : void 0,
					external: !n.ssr,
					snr: n.href.startsWith(O.STORE_BASE_URL) && {
						feature: `globalheader`,
					},
					ref: t,
					...a,
					children: [
						o,
						n.new &&
							(0, I.jsx)(`span`, {
								className: `jxJHmxST56Q-`,
								children: G.Localize(`#m_ext_new`),
							}),
					],
				}),
			})
		);
	});
function zr(e) {
	let { navContent: t } = e;
	return (0, I.jsx)(P, {
		menuTarget: (0, I.jsx)(K, { item: t, className: Rr }),
		direction: `right`,
		children: t.children?.map((e, t) => (0, I.jsx)(zr, { navContent: e }, t)),
	});
}
function Br(e) {
	return (0, I.jsx)(`nav`, {
		className: Pr,
		children: (0, I.jsx)(`ul`, {
			className: Fr,
			children: e.navContent.map((e, t) =>
				(0, I.jsx)(
					P,
					{
						menuTarget: (0, I.jsx)(K, {
							item: e,
							className: (0, H.default)(Ir, e.userContent && `Rh10yi6-EHM-`),
						}),
						direction: `down`,
						className: Lr,
						children: e.children?.map((e, t) =>
							(0, I.jsx)(zr, { navContent: e }, t),
						),
					},
					t,
				),
			),
		}),
	});
}
var Vr = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPQAAADUCAYAAACrgw7IAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADmNJREFUeNrs3V9MVGcax/F3/mnQkboQC4qLrstWbWuCNli765+GprVpu7JG24uKe+mu7cVettleNE160ZuaNm1smrRuYiBdErGA1ohlu2ETxe3adqf+KaygBWEFRQYpAyMDwz7vMNAzZwZLd3c4L5PvJ3kCZ4aLyfD8zvuec2be4xofH1cAMoObtwAg0AAINAACDYBAAwQaAIEGQKABEGgABBog0AAINAACDYBAAyDQAIEGQKABEGgABBog0AAINAACDYBAAyDQAIEGQKABEGgABBoAgQYyj9fpF1BeXs5/AXNWRUUFgZ7kcrnUnj17ZvKnS6QKpdZJzaONkEYjUueluqS6Z9LDdk7eotlr8BubJbVPaqfUNvoMDmiSOiL1ntQwx9D/veelLku9RZjhoEek3pS6IrWXQP94Hql3pCqlCugnGCJf6rDUQdMP+Uybch+Oj85JCgtXqIKC5crr9dJeSJvR0VHV1dWpOjuvqWg0an96v5o4n/Msgf5hL6cK8693/EZt3bpNZWffQ7dh1nz33XeqsfGv6pPjdfZg75Z6TepVAj29ovibNGXVqp+rPeW/VcuX/5TuwqxbtGiReuaZHWrD+odUZeVh1dp62fr0K1JVUpc4hk7tdeuxSU5Ortq3bz9hhuOWFRSo3/3+RZWXn2992COj9gETX68Jgc6JT2Om6D3jT3Jy6CYYITs7Wz311DOJwXG7t/f39z9IoJPpMHusU+1fbd5CF8Eomzb9Um3cuCnhsaysrF3W3iXQExKuM6+XYxbARGvWrE3Y9nq9JfJjAYFOVGTd+MV999E5MJK+dGqbduuPI/tMGqVNCHSWdWPePD6qDTPJFDvp8Dr+00eggTnG7UmKy+TI7CXQQOZgyg1kEBeBBkCgARBogEADINAACDRgNr34gU2EQCfrs26EBgfpHBhJL3pgNT4+3kugk7VYN1rbWukcGKmtNbE3o9FoK4FO1mjd+PzvZ1Ot5QQ47ty5zxPn25HI6cnBmkB/r05qap59/fq/1SefHKN7YJT6kydUe/u31ofCbW1tJwl0Mh3mt60PHD9Wq86ePUMXwQi6F48ePWIfnQ8FAoFgfHOMQCd6Q9lOjv3p0AexvSLgpM8+a4j1ok2wpaXFuqbYqCmv15SvfQ2Oj48/53K56pXlmyt6r3j58r/UhodKVElJifL5+K400k9fnvryy3Pq3D8+V4HAP+1Pjw0MDLxgGZ31dHvElNfucvLGWvab1ckb+aLX6313ur/3eDyxxfaBdNHncGQ6Pe3z4XD4perqauuQHZYasv4NN6uLq6qqOlhWVtbr9/s/lM2FSbvGsTHV0dFO18EJ4VAotL+mpqbOml1l2E3sjPqkmIzW47W1tUc7Ojq2SHiP0EMwgfTix11dXZttYY4dKiqDznAbN+WeVFlZOV+P0KWlpUW5ubk7ZRr+mNvtLqG1MFui0WhADgFPBYPBuoaGhlR3yBiS3g1LryY94WimTAx0PNR64TW/sqwGkZeXN6+4uHgt7YZ0aW5ubmlvbw/f5U90YELStyPxPjUq0MbeylHesIi8WbfVxLrHsdPbPT09I/X19QHaDg7RIR6W3hwz9QU6PkLPkCceap/JOyFkJH2NORIP84yCzAg9g/MSauJs4vAcfO2Ym8aUYSe8MinQ0+05AViwwAFAoAEw5bZx8uQBwAgNgEADINAACDRAoAEQaAAEGgCBBkCgAQINgEADINAACDQAAg1kKsdXLCkvL+e/gDmroqKCQE+62zK+NkukCqXWqfgKoECa6MUAz0t1SXXPpIftWCQwtSypfVI7pbbRZ3BAk5S+g8t7yrBb3sy1Y+jnpS5LvUWY4aBHpN6UuiK1l0D/eHr97Xek9O0ICugnGCJf6rDUQdMP+Uybch+Oj85JCgoK1NKlS2O3lAXSRd/h9Pr167GKRqP2p/erifM5zxLoH/ZyqjBv375dbdq0SS1atIhuw6wZHBxUTU1N6tNPP7UHe7fUa1KvEujpFcXfpCkrVqxQu3btUsuWLaO7MOv8fr96/PHH1bp161R1dbW6evWq9elXpKqkLhHo1F63HpssXrxY7d27N/YzFb3H1DU6ys0zkF66B/Wl1ffff1/dvHlz8mGP9N8Bt9v9JIFOlhOfxkx54oknksKsr+2Fw2F1584dFYlE6DTMqocfflgdP358alvCvL2/v/9B+fWCSa/ThLPcOswe61R748aNCX+gQ9zX1xc7riHMcMIDDzyg7r///oTHsrKydll7l0BPSLjOrI9Z7CcnBgYGUp1xBGaVHmwSprdeb4mauH85U26LIuvGqlWrpn7XQdajM2CCvLy8xNHQ7dYfR/bFR2kjbgJvwgidZd3w+Xyxn0NDQ4QZRpk/f779oezJtmXKfRf64r4ONGDU8ak7KS4eg2a65gY6FApxZ0rMJR4CPQ0dZKbamGNcBHoaXJYCCDQAEwOtT4gByJBAAyDQAAg08D8dDkYIdLI+68bw8DCdAyPZP+w0Pj7eS6CTtVg3Ojs76RwYyd6b0Wi0lUAna7RuXLhwgU+JwUjNzc2J8+1I5PTkYE2gv1cnNTi50dvbq06fPk33wChnz55V3d0J6+6H29raThLoZDrMb1sf0IG+ePEiXQQj6F5sbGy0j86HAoFAML45RqATvaFsJ8f0ci96rwg46YsvvkhYeigu2NLScsCybczidqZ87WtQjpufc7lc9cryzRW9V9QnIlavXq3Wrl2rV4igw5B2+vKUBFZ98803qrU16bzX2MDAwAuW0VlPt0dMee0uJ09A2W9WNzo6+qKE9t1ppxNut1qyZAkdh7S5devWXVeTDYfDL1VXV39gfUgq4XoWN6uLq6qqOlhWVtbr9/s/lM2F9uf1umI9PT10HZwQDoVC+2tqauqs2VWG3cTOqE+KyWg9Xltbe7Sjo2OLTHuO0EMwZAr+cVdX12ZbmGOHisqgM9zGTbknVVZW6sWbFpaWlhbl5ubulGn4YzLdLqG1MFtkNhiQqfepYDBY19DQkOoOGUPSu2Hp1aQnHM2UiYGOh1ovvOZXltUg8vLy5hUXF6+l3ZAuzc3NLe3t7eG7/IkOTEj6diTep0YF2tjTxvKGReTNuq0m1j2O3SZHjp9H6uvrA7QdHKJDPCy9aeyX9h0foWfIEw+1z+SdEDKSPuUdiYd5RkFmhJ7BeQk1cTZxeA6+dsxNY8qwE16ZFOjp9pwALFjgACDQAJhy2/C9Z4ARGgCBBgg0AAINgEADINAACDRAoAEQaAAEGgCBBgg0AAINgEAD+P9zfMWS8vJy/guYsyoqKgj0pLst42uj739TKLVOxVcABdJELwZ4XqpLqnsmPWzHIoGpZUntk9optY0+gwOapPQdXN5Tht3yZq4dQz8vdVnqLcIMBz0i9abUFam9BPrH0+tvvyOlb0dQQD/BEPlSh6UOmn7IZ9qU+3B8dE6ydOlSde+99yqPx0N7IW30vaFv3Lihuru7Ux0L71cT53OeJdA/7OVUYd726KNqw4YNyu/3022YNUNDQ+rcuXPqb42N9mDvlnpN6lUCPb2i+Js0Zfny5eqpp5/WN6ijuzDrFixYoLZu3arWrFmjTpw4oa51dFiffkWqSuoSgU7tdeuxyT333KN27d6tsrOzp50WjY6OqpGREX2NgO5D2mRlZakdO3aoP3/0kbp169bkw55oNHrA7XY/SaCT5cSnMVO2yJ7RHmY97RkYGFBDoZAaDofpNMyq1atXqzNnzkxtS5i39/f3Pyi/XjDpdZpwlluH2WOdaq9fvz7hDwYHB9W1a9die0jCDCf8bNUqtXLlSvvovcvauwR6QsJ1Zn3MYnWrtzd21lFPsQEn5efnJ05vvd4SNXH/cqbcFkXWjcIVK6Z+10HWozNggpycnMTR0O3WH0f2xUdpI24Cb8IInWXd8Pl8sZ9yfEKYYRTfvKTPlEye6PEx5b6LSCSigsEgHQSjpPgihsegma65gdZh5s6UmEOMOTFm3LetotFo7FM6wFwavBmhpzFMmIHMCfQd/ekvAJkRaK43AxkUaE6GARkUaAAEGkg7fQXGJkKgk/VZN+7w5QsYKmzrTTk87CXQyVqsGz03btA5MNLNmzftI3YrgU7WaN240tbGiTEYqf3bbxPn25HI6cnBmkB/r05q6lsY+ksZ58+fp3tglEsXL6q+voSjw3BbW9tJAp1Mh/lt6wPnv/5aXb1yhS6CEXQvfvXVV/bR+VAgEJj8BtEYgU70hrKdHNPLvei9IuCklubmhKWH4oItLS0HLNvGfBrKlC9nDMpx83Mul6teWb65oveKepGDwsJCtWLlStbkxqzQl6c6Ojpix8ydnZ32p8cGBgZesIzOero9QqBtJMx/GR0d/YPX633X+nhXV1esmpqa9AoRavHixXQc0ub27duxVWWnEw6H/3js2LFTlofumHQMbdTXJ6uqqg6WlZX1+v3+D2VzYao9p+3EBDBbwqFQaH9NTU2d5TEdZKNuYmfUJ8X27NkzXltbe1SmO1tkL3mEHoIJpBc/llniZluYY4eKJo3OsZmuk9d8p7s/dGVl5Xw9QpeWlhbl5ubulGn4YzLdLqG1MIvH0QE5BDwVDAbrGhoaUt0hY0h6Nyy9mvSEo5kyMdDxUOuF1/QNraZWg8jLy5tXXFy8lnZDujQ3N7e0t7ff7fPHOjAh6duReJ8aFWhjb/gub1hE3qzbamLd49hyiz09PSP19fUB2g4O0SEelt4cM/UFOj5Cz5AnHmqfyTshZCR9jTkSD/OMgswIPYPzEmribOLwHHztmJvGlGEnvDIp0NPtOQFYsMABQKABMOW24XvPACM0AAINEGgABBoAgQZAoAEQaIBAAyDQAAg0AAINEGgABBoAgQZAoAEQaIBAAyDQAAg0AAINgEADBBoAgQZAoAEQaIBAAyDQAAg0gPT4jwADAFEL3o+/RT5ZAAAAAElFTkSuQmCC`,
	Hr = `data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2016.0.0,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20width='355.666px'%20height='89.333px'%20viewBox='0%200%20355.666%2089.333'%20enable-background='new%200%200%20355.666%2089.333'%20xml:space='preserve'%3e%3cg%3e%3cpath%20fill='%23C5C3C0'%20d='M44.238,0.601C21,0.601,1.963,18.519,0.154,41.29l23.71,9.803c2.009-1.374,4.436-2.179,7.047-2.179%20c0.234,0,0.467,0.008,0.698,0.021l10.544-15.283c0-0.073-0.001-0.144-0.001-0.216c0-9.199,7.483-16.683,16.683-16.683%20c9.199,0,16.682,7.484,16.682,16.683c0,9.199-7.483,16.684-16.682,16.684c-0.127,0-0.253-0.003-0.379-0.006l-15.038,10.73%20c0.008,0.195,0.015,0.394,0.015,0.592c0,6.906-5.617,12.522-12.522,12.522c-6.061,0-11.129-4.326-12.277-10.055L1.678,56.893%20c5.25,18.568,22.309,32.181,42.56,32.181c24.432,0,44.237-19.806,44.237-44.235C88.475,20.406,68.669,0.601,44.238,0.601'/%3e%3cpath%20fill='%23C5C3C0'%20d='M27.875,67.723l-5.434-2.245c0.963,2.005,2.629,3.684,4.841,4.606c4.782,1.992,10.295-0.277,12.288-5.063%20c0.965-2.314,0.971-4.869,0.014-7.189c-0.955-2.321-2.757-4.131-5.074-5.097c-2.299-0.957-4.762-0.922-6.926-0.105l5.613,2.321%20c3.527,1.47,5.195,5.52,3.725,9.047C35.455,67.526,31.402,69.194,27.875,67.723'/%3e%3cpath%20fill='%23C5C3C0'%20d='M69.95,33.436c0-6.129-4.986-11.116-11.116-11.116c-6.129,0-11.116,4.987-11.116,11.116%20c0,6.13,4.987,11.115,11.116,11.115C64.964,44.55,69.95,39.565,69.95,33.436%20M50.502,33.417c0-4.612,3.739-8.35,8.351-8.35%20c4.612,0,8.351,3.738,8.351,8.35s-3.739,8.35-8.351,8.35C54.241,41.767,50.502,38.028,50.502,33.417'/%3e%3cpath%20fill='%23C5C3C0'%20d='M135.718,30.868l-2.964,5.21c-2.283-1.595-5.377-2.555-8.078-2.555c-3.087,0-4.997,1.278-4.997,3.567%20c0,2.781,3.393,3.428,8.436,5.238c5.421,1.917,8.537,4.17,8.537,9.135c0,6.793-5.342,10.608-13.02,10.608%20c-3.742,0-8.256-0.966-11.726-3.077l2.162-5.776c2.819,1.489,6.191,2.372,9.197,2.372c4.052,0,5.978-1.495,5.978-3.705%20c0-2.529-2.937-3.289-7.678-4.859c-5.403-1.804-9.147-4.171-9.147-9.666c0-6.197,4.963-9.756,12.104-9.756%20C129.499,27.604,133.499,29.181,135.718,30.868'/%3e%3cpolygon%20fill='%23C5C3C0'%20points='158.888,34.161%20158.888,61.5%20151.909,61.5%20151.909,34.161%20141.779,34.161%20141.779,28.175%20168.988,28.175%20168.988,34.161%20'/%3e%3cpolygon%20fill='%23C5C3C0'%20points='183.7,34.143%20183.7,41.652%20197.056,41.652%20197.056,47.638%20183.7,47.638%20183.7,55.459%20199.196,55.459%20199.196,61.5%20176.723,61.5%20176.723,28.175%20199.196,28.175%20199.196,34.143%20'/%3e%3cpath%20fill='%23C5C3C0'%20d='M214.773,55.03l-2.206,6.471h-7.316l12.495-33.325h7.025L237.619,61.5h-7.563l-2.254-6.471H214.773z%20M221.219,36.125l-4.551,13.343h9.196L221.219,36.125z'/%3e%3cpolygon%20fill='%23C5C3C0'%20points='273.436,41.056%20264.316,60.529%20260.378,60.529%20251.406,41.23%20251.406,61.5%20244.723,61.5%20244.723,28.175%20251.391,28.175%20262.591,52.231%20273.393,28.175%20280.119,28.175%20280.119,61.5%20273.437,61.5%20'/%3e%3cpath%20fill='%23C5C3C0'%20d='M293.611,32.379c0,2.864-2.146,4.649-4.609,4.649c-2.472,0-4.623-1.785-4.623-4.649%20c0-2.863,2.151-4.636,4.623-4.636C291.466,27.743,293.611,29.516,293.611,32.379%20M285.154,32.379c0,2.396,1.726,3.901,3.848,3.901%20c2.114,0,3.833-1.505,3.833-3.901c0-2.403-1.719-3.885-3.833-3.885C286.886,28.494,285.154,29.994,285.154,32.379%20M289.066,30.01%20c1.195,0,1.597,0.632,1.597,1.315c0,0.626-0.371,1.046-0.823,1.26l1.071,2.007h-0.877l-0.903-1.779H288.2v1.779h-0.73V30.01%20H289.066z%20M288.207,32.142h0.814c0.527,0,0.838-0.331,0.838-0.747c0-0.42-0.223-0.69-0.84-0.69h-0.813V32.142z'/%3e%3c/g%3e%3c/svg%3e`,
	Ur = `` + new URL(`assets/mHntPfFv.svg`, import.meta.url).href,
	Wr = `` + new URL(`assets/DfnAe-hE.png`, import.meta.url).href;
function Gr(e) {
	return (0, I.jsx)(`svg`, {
		xmlns: `http://www.w3.org/2000/svg`,
		viewBox: `0 0 12 12`,
		fill: `none`,
		role: `presentation`,
		className: e.className,
		children: (0, I.jsx)(`path`, {
			fill: `currentColor`,
			fillRule: `evenodd`,
			clipRule: `evenodd`,
			d: `M5.81026 6.36084L8.50899 3.66211L9.6875 4.84062L5.81026 8.71786L1.93302 4.84062L3.11153 3.66211L5.81026 6.36084Z`,
		}),
	});
}
(F.createContext({ nBackdropHeight: void 0, bBackdropActive: !1 }),
	F.createContext(void 0));
var Kr = `h3IhvvKqNWg-`,
	qr = `SteamBeta_VOnly_`,
	Jr = {
		name: qr,
		options: { path: `/`, secure: !0 },
		preferenceControls: { isTechnicallyNecessary: !0 },
	};
function Yr(e, t) {
	let n = { ...Jr, name: Xr(e) };
	e.default === t ? ot(n) : nt(n, t ? `1` : `0`);
}
function Xr(e) {
	return `${qr}${e.shortName}`;
}
function Zr(e) {
	let { rgBetas: t, buttonClassName: n } = e,
		[r, i] = F.useState(!1),
		[a, o] = F.useState(null),
		s = Ze({
			open: r,
			onOpenChange: (e) => i(e),
			width: `dropdown`,
			placement: `bottom`,
			activeIndex: a,
			setActiveIndex: (e) => o(e),
			setSelectedIndex: () => i(!1),
			interactions: { click: !0 },
			role: `select`,
		});
	return (0, I.jsxs)($e.Root, {
		state: s,
		children: [
			(0, I.jsx)($e.Anchor, {
				children: (0, I.jsxs)(`button`, {
					className: (0, H.default)(n, Kr),
					children: [
						(0, I.jsx)(`span`, { children: `admin` }),
						(0, I.jsx)(Gr, {}),
					],
				}),
			}),
			(0, I.jsx)($e.Positioner, {
				children: t.map((e) => (0, I.jsx)(Qr, { beta: e }, e.shortName)),
			}),
		],
	});
}
function Qr(e) {
	let { beta: t } = e;
	return (0, I.jsx)($e.Item, {
		onSelect: () => {
			(Yr(t, !(t.enabled ?? t.default)), window.location.reload());
		},
		children: (0, I.jsxs)(`div`, {
			children: [
				(t.enabled ?? t.default) ? `Exit ` : `Enter `,
				` `,
				t.descriptiveName,
			],
		}),
	});
}
function $r(e) {
	let { rgBetas: t, buttonClassName: n } = e;
	return t.length === 0
		? null
		: (0, I.jsx)(Zr, { rgBetas: t, buttonClassName: n });
}
var ei = `sBhqQUbkJpI-`,
	ti = `mkVCTsyaxnE-`,
	ni = `Zmd4yCX8src-`,
	ri = () => {
		(ot(st), window.location.reload());
	};
function ii(e) {
	return (0, I.jsxs)(`span`, {
		className: ei,
		children: [
			(0, I.jsx)(`span`, {
				className: ti,
				children: `You are spoofing another user!`,
			}),
			` `,
			(0, I.jsx)(`span`, {
				className: ni,
				onClick: ri,
				children: `end spoofing`,
			}),
		],
	});
}
function ai(e) {
	let { containerClassname: t, buttonClassName: n, rgBetas: r } = e,
		i = qe().metrics;
	return !e.spoofing && !i
		? null
		: (0, I.jsxs)(`div`, {
				className: t,
				children: [
					e.spoofing && (0, I.jsx)(ii, {}),
					i && (0, I.jsx)(on, { buttonClassName: e.buttonClassName }),
					!!r && (0, I.jsx)($r, { rgBetas: r, buttonClassName: n }),
				],
			});
}
var oi = `_1hK5Pa2qbxc-`,
	si = `Ufm0QNEexSk-`,
	ci = `t4O8ORpLDqs-`,
	li = `sm4uEZwjNDE-`,
	ui = `_-02zffUT45Q-`,
	di = `Pd4GU3H2CTk-`,
	fi = `xAIxVukOqMA-`,
	pi = `a-hmE9BfPIg-`,
	mi = `r0AmiKA39mc-`,
	hi = `VqZq0261-H0-`,
	gi = `rvKsosHxgAE-`,
	_i = `dF3Ge-BMhAM-`,
	vi = `blfsYIXtMMw-`,
	yi = `Fz0HDxt3lDI-`,
	bi = `azd-LnhAMYQ-`,
	xi = `DtHPAA5V4D0-`,
	Si = `h7gD6XW38FA-`,
	Ci = `UvgvOr-m4ME-`,
	wi = `s4-cvghgJD8-`,
	Ti = `A8krqU5RJ-0-`,
	Ei = `T17Yo1S1os8-`,
	Di = `_9ZrfpmnOL3A-`,
	Oi = `x6Nn1-lbN9s-`,
	ki = `JMd0Tzl8xas-`;
function Ai(e) {
	return e.private_data?.persona_state === 0
		? ui
		: e.private_data?.game_id === void 0
			? ci
			: li;
}
function ji() {
	let { data: e } = De();
	return e
		? (0, I.jsx)(`div`, {
				className: di,
				children: (0, I.jsx)(M, {
					snr: !0,
					external: !0,
					to: O.STORE_BASE_URL + `cart`,
					className: di,
					children: G.LocalizeReact(
						`#Cart_CountWidget`,
						(0, I.jsx)(`b`, { children: Xe(e) }),
					),
				}),
			})
		: null;
}
function Mi() {
	let { data: e } = nr();
	return e?.formatted_balance
		? (0, I.jsx)(`div`, {
				className: fi,
				children: (0, I.jsx)(M, {
					snr: !0,
					external: !0,
					to: O.STORE_BASE_URL + `account`,
					className: fi,
					children: G.LocalizeReact(
						`#responsive_menu_wallet_balance`,
						(0, I.jsx)(`b`, { children: e.formatted_balance }),
					),
				}),
			})
		: null;
}
function Ni(e) {
	let { navContent: t, children: n, labelAddition: r } = e,
		i = (0, F.useRef)(null),
		a = (0, F.useRef)(null),
		o = (0, F.useRef)(null),
		s = (0, F.useRef)(void 0);
	if (!n && (!t.children || t.children.length === 0))
		return (0, I.jsx)(K, { item: t, className: hi, responsive: !0 });
	function c() {
		i.current &&
			(s.current && s.current.cancel(),
			(s.current = i.current.animate(
				{
					height: [
						`${o.current.offsetHeight}px`,
						`${a.current.offsetHeight + o.current.offsetHeight}px`,
					],
				},
				{ duration: 250, fill: `forwards` },
			)));
	}
	function l() {
		i.current &&
			(s.current && s.current.cancel(),
			(s.current = i.current.animate(
				{
					height: [
						`${a.current.offsetHeight + o.current.offsetHeight}px`,
						`${o.current.offsetHeight}px`,
					],
				},
				{ duration: 250, fill: `forwards` },
			)),
			s.current.addEventListener(`finish`, () => {
				i.current && (i.current.open = !1);
			}));
	}
	function u() {
		i.current?.open ? c() : i.current && l();
	}
	return (0, I.jsxs)(`details`, {
		name: `responsive-menu`,
		className: pi,
		ref: i,
		onToggle: u,
		children: [
			(0, I.jsxs)(`summary`, {
				className: hi,
				ref: o,
				children: [
					t.label_responsive ?? t.label,
					` `,
					r,
					` `,
					(0, I.jsx)(`div`, { className: gi }),
				],
			}),
			(0, I.jsxs)(`div`, {
				className: mi,
				ref: a,
				children: [
					t.children?.map((e, t) =>
						(0, I.jsx)(K, { item: e, className: _i, responsive: !0 }, t),
					),
					n,
				],
			}),
		],
	});
}
function Pi() {
	return (0, I.jsxs)(I.Fragment, {
		children: [
			(0, I.jsxs)(`div`, {
				className: yi,
				children: [
					(0, I.jsx)(M, {
						snr: !0,
						external: !0,
						to: O.STORE_BASE_URL + `about`,
						children: `关于蒸汽平台`,
					}),
					`\xA0 | \xA0`,
					(0, I.jsx)(M, {
						snr: !0,
						external: !0,
						to: O.STORE_BASE_URL + `steam_refunds`,
						children: `退款政策`,
					}),
					`\xA0 | \xA0`,
					(0, I.jsx)(M, {
						snr: !0,
						external: !0,
						to: O.STORE_BASE_URL + `subscriber_agreement`,
						children: `软件许可服务协议`,
					}),
					`\xA0 | \xA0`,
					(0, I.jsx)(`br`, {}),
					(0, I.jsx)(M, {
						snr: !0,
						external: !0,
						to: O.STORE_BASE_URL + `privacy_agreement`,
						children: `个人信息保护政策`,
					}),
					`\xA0 | \xA0`,
					(0, I.jsx)(M, {
						snr: !0,
						external: !0,
						to: O.STORE_BASE_URL + `data_outbound`,
						children: `个人信息出境告知书`,
					}),
					`\xA0 | \xA0`,
					(0, I.jsx)(`br`, {}),
					(0, I.jsx)(M, {
						to: `https://about.steamchina.com/content_report.html`,
						target: `_blank`,
						rel: `noreferrer`,
						children: `不良内容举报投诉`,
					}),
					`\xA0 | \xA0`,
					(0, I.jsx)(M, {
						to: `https://about.steamchina.com/infringement_report.html`,
						target: `_blank`,
						rel: `noreferrer`,
						children: `侵权投诉`,
					}),
					`\xA0 | \xA0`,
					(0, I.jsx)(M, {
						to: `https://about.steamchina.com/parentguardianship_agreement.html`,
						target: `_blank`,
						rel: `noreferrer`,
						children: `家长监护`,
					}),
				],
			}),
			(0, I.jsxs)(`div`, {
				className: bi,
				children: [
					(0, I.jsxs)(M, {
						external: !0,
						className: Ti,
						to: `http://qr.weibo.cn/g/7kla92`,
						target: `_blank`,
						rel: `noreferrer`,
						children: [
							(0, I.jsx)(`img`, {
								alt: `微博`,
								className: Di,
								src: `${O.STORE_CDN_URL}/public/shared/images/footer/weibo_logo.svg?v=1`,
							}),
							(0, I.jsx)(`div`, { children: `微博` }),
						],
					}),
					(0, I.jsxs)(M, {
						external: !0,
						className: Ti,
						to: `http://weixin.qq.com/r/LC-K0i3EunDFrWmx93o_`,
						target: `_blank`,
						rel: `noreferrer`,
						children: [
							(0, I.jsx)(`img`, {
								alt: `微信`,
								className: Ei,
								src: `${O.STORE_CDN_URL}/public/shared/images/footer/wechat_logo.svg?v=1`,
							}),
							(0, I.jsx)(`div`, { children: `微信` }),
						],
					}),
				],
			}),
			(0, I.jsx)(`hr`, { className: Ci }),
			(0, I.jsxs)(`div`, {
				className: wi,
				children: [
					(0, I.jsx)(M, {
						external: !0,
						to: `https://www.wanmei.com/`,
						target: `_blank`,
						rel: `noreferrer`,
						children: (0, I.jsx)(`img`, {
							className: Oi,
							src: `${O.STORE_CDN_URL}/public/shared/images/footer/pw_logo.svg?v=1`,
							alt: ``,
						}),
					}),
					(0, I.jsx)(M, {
						external: !0,
						to: `https://www.valvesoftware.com`,
						target: `_blank`,
						rel: `noreferrer`,
						children: (0, I.jsx)(`img`, {
							className: ki,
							src: `${O.STORE_CDN_URL}/public/shared/images/footer/valve_logo.svg?v=1`,
							alt: ``,
						}),
					}),
				],
			}),
			(0, I.jsxs)(`div`, {
				className: xi,
				children: [
					(0, I.jsxs)(`div`, {
						children: [
							`© `,
							new Date().getFullYear(),
							` Valve Corporation 版权所有，完美世界已获授权。`,
							(0, I.jsx)(`br`, {}),
							`所有商标均属于其在美国或其他国家的拥有者。`,
						],
					}),
					(0, I.jsxs)(`div`, {
						className: Si,
						children: [
							`© 完美世界征奇(上海)多媒体科技有限公司 版权所有。`,
							(0, I.jsx)(`br`, {}),
							`增值电信业务经营许可证沪B2-20180406`,
						],
					}),
				],
			}),
		],
	});
}
function Fi() {
	return (0, I.jsxs)(I.Fragment, {
		children: [
			(0, I.jsx)(`div`, {
				children: (0, I.jsx)(`img`, {
					src: `${O.STORE_CDN_URL}/public/shared/images/responsive/logo_valve_footer.png`,
					alt: ``,
				}),
			}),
			G.Localize(`#responsive_footer_copyright`),
			` \xA0`,
			(0, I.jsxs)(`span`, {
				children: [
					(0, I.jsx)(M, {
						to: O.STORE_BASE_URL + `privacy_agreement/`,
						target: `_blank`,
						children: G.Localize(`#Common_Footer_PrivacyPolicy`),
					}),
					`\xA0| \xA0`,
					(0, I.jsx)(M, {
						to: `http://www.valvesoftware.com/legal.htm`,
						target: `_blank`,
						children: G.Localize(`#Common_Footer_Legal`),
					}),
					`\xA0| \xA0`,
					(0, I.jsx)(M, {
						to: O.STORE_BASE_URL + `subscriber_agreement/`,
						target: `_blank`,
						children: G.Localize(`#Common_Footer_SSA`),
					}),
					`\xA0| \xA0`,
					(0, I.jsx)(M, {
						to: O.STORE_BASE_URL + `steam_refunds/`,
						target: `_blank`,
						children: G.Localize(`#Common_Footer_Refunds`),
					}),
				],
			}),
		],
	});
}
function Ii(e) {
	let {
			userDetails: t,
			navContent: n,
			globalActions: r,
			changeLanguagePath: i,
			open: o,
			onDismiss: s,
			cartInResponsiveMenu: c,
		} = e,
		[l, u] = (0, F.useState)(!1),
		d = (0, F.useRef)(null),
		f = (0, F.useRef)(void 0);
	(0, F.useEffect)(() => {
		d.current &&
			(o
				? (d.current?.showModal(),
					f.current?.cancel(),
					(f.current = d.current.animate(
						{ transform: [`translateX(var(--closedX))`, `translateX(0)`] },
						{ duration: 250, fill: `forwards`, easing: `ease-in-out` },
					)))
				: f.current &&
					(f.current?.cancel(),
					(f.current = d.current.animate(
						{ transform: [`translateX(0)`, `translateX(var(--closedX))`] },
						{ duration: 250, fill: `forwards`, easing: `ease-in-out` },
					)),
					f.current.addEventListener(`finish`, () => d.current?.close())));
	}, [o]);
	let p =
		r.find((e) => e.id === `language`) ??
		r[0]?.children?.find((e) => e.id === `language`);
	return (0, I.jsxs)(I.Fragment, {
		children: [
			(0, I.jsxs)(`dialog`, {
				className: (0, H.default)(oi, A(O.EREALM) && `kIikLkWFJTg-`),
				ref: d,
				onMouseDown: (e) => e.target === d.current && s(),
				onKeyDown: (e) => e.key === `Escape` && s(),
				inert: !o,
				children: [
					(0, I.jsxs)(`div`, {
						className: si,
						children: [
							!t &&
								(0, I.jsx)(K, {
									className: (0, H.default)(`VqZq0261-H0-`),
									item: {
										href: `/login/`,
										label: G.Localize(`#global_menu_login_caps`),
									},
								}),
							t &&
								(0, I.jsxs)(`div`, {
									className: (0, H.default)(`NB0Mn5wh2Yo-`, Ai(t)),
									children: [
										(0, I.jsxs)(`div`, {
											className: `dogwewx8C8M-`,
											children: [
												(0, I.jsx)(`a`, {
													className: `Iu4lgIr2a7s-`,
													href: Ot(t),
													children: (0, I.jsx)(Mt, {
														playerLinkDetails: t,
														statusPosition: `border`,
														alt: ``,
														role: `presentation`,
														size: `Small`,
														className: `WGjJBhzsjsk-`,
													}),
												}),
												`\xA0`,
												(0, I.jsx)(`a`, {
													className: `S6zOvIteLXo-`,
													href: Ot(t),
													children: t.public_data?.persona_name,
												}),
											],
										}),
										c && (0, I.jsx)(ji, {}),
										(0, I.jsx)(Mi, {}),
									],
								}),
							e.notifications &&
								(0, I.jsx)(Ni, {
									navContent: { label: `Notifications`, href: `` },
									labelAddition: (0, I.jsxs)(`div`, {
										className: (0, H.default)(
											`ukx8XIbMbTo-`,
											e.notifications?.unread_count && `YIoGgjCNvis-`,
										),
										children: [
											e.notifications.unread_count > 0 &&
												(0, I.jsx)(`span`, { className: `O4xN7EkLl8M-` }),
											(0, I.jsx)(`span`, {
												className: `kLME5emTJD4-`,
												children: Xe(e.notifications?.unread_count ?? 0),
											}),
										],
									}),
									children: (0, I.jsx)(_n, {
										dynamicImport: async () =>
											(
												await a(
													async () => {
														let { GreenEnvelope: e } = await import(
															`./jS4RLijH.js`
														);
														return { GreenEnvelope: e };
													},
													__vite__mapDeps([1, 2, 3, 4]),
													import.meta.url,
												)
											).GreenEnvelope,
										fallback: (0, I.jsx)(`div`, {}),
										bResponsiveHeader: !0,
										notifications: e.notifications,
									}),
								}),
							n.map((e, t) => (0, I.jsx)(Ni, { navContent: e }, t)),
							(0, I.jsxs)(`div`, {
								className: `minor_menu_items`,
								children: [
									t &&
										(0, I.jsxs)(I.Fragment, {
											children: [
												(0, I.jsx)(K, {
													className: (0, H.default)(
														`VqZq0261-H0-`,
														`bcVkB8xUKZk-`,
													),
													item: {
														href: O.STORE_BASE_URL + `account`,
														label: G.Localize(`#global_menu_account_details`),
													},
												}),
												(0, I.jsx)(K, {
													className: (0, H.default)(
														`VqZq0261-H0-`,
														`bcVkB8xUKZk-`,
													),
													item: {
														href: O.STORE_BASE_URL + `account/preferences`,
														label: G.Localize(
															`#global_menu_account_preferences`,
														),
													},
												}),
											],
										}),
									!A(O.EREALM) &&
										(0, I.jsx)(I.Fragment, {
											children: (0, I.jsx)(`button`, {
												className: (0, H.default)(
													`VqZq0261-H0-`,
													`bcVkB8xUKZk-`,
												),
												onClick: () => u(!0),
												children: G.Localize(`#global_menu_change_language`),
											}),
										}),
									t &&
										(0, I.jsx)(`button`, {
											className: (0, H.default)(`VqZq0261-H0-`, `bcVkB8xUKZk-`),
											onClick: () => Sr(e.logoutPath),
											children: G.Localize(`#global_menu_change_user`),
										}),
									!A(O.EREALM) &&
										(0, I.jsx)(K, {
											className: (0, H.default)(`VqZq0261-H0-`, `bcVkB8xUKZk-`),
											item: {
												href: O.STORE_BASE_URL + `mobile`,
												label: G.Localize(`#global_menu_getmobileapp`),
											},
										}),
									!mn() &&
										(0, I.jsx)(`button`, {
											className: (0, H.default)(`VqZq0261-H0-`, `bcVkB8xUKZk-`),
											onClick: hn,
											children: G.Localize(`#global_menu_view_desktop_website`),
										}),
								],
							}),
						],
					}),
					(0, I.jsx)(`footer`, {
						className: vi,
						children: A(O.EREALM) ? (0, I.jsx)(Pi, {}) : (0, I.jsx)(Fi, {}),
					}),
				],
			}),
			p &&
				(0, I.jsx)(lr, {
					open: l,
					onDismiss: () => u(!1),
					menuAction: p,
					changeLanguagePath: i,
					bLoggedIn: t != null,
				}),
		],
	});
}
function Li(e) {
	let { fnRenderCustomHeader: t = (e) => e } = e,
		[n, r] = (0, F.useState)(!1);
	return (0, I.jsxs)(I.Fragment, {
		children: [
			(0, I.jsxs)(`header`, {
				className: (0, H.default)(Or, e.className),
				children: [
					(0, I.jsxs)(`div`, {
						className: (0, H.default)(kr, e.bWiderHeader && `C50-GV7vFck-`),
						children: [
							(0, I.jsx)(`a`, {
								href: O.STORE_BASE_URL,
								"aria-label": G.Localize(`#Aria_Steam_Home_Link`),
								className: jr,
								children: (0, I.jsx)(`img`, {
									src: Te(A(O.EREALM) ? Ur : Hr),
									alt: G.Localize(`#Aria_Steam_Home_Link`),
									width: 176,
									height: 44,
								}),
							}),
							(0, I.jsx)(Br, { navContent: e.navContent }),
							(0, I.jsx)(Dr, {
								globalActions: e.globalActions,
								userDetails: e.userDetails,
								notifications: e.notifications,
								changeLanguagePath: e.changeLanguagePath,
								logoutPath: e.logoutPath,
							}),
							(0, I.jsx)(ai, {
								spoofing: e.spoofing,
								containerClassname: e.internalOptionsClassname,
								buttonClassName: e.internalOptionsButtonClassname,
								rgBetas: e.rgBetas,
							}),
							e.children,
						],
					}),
					(0, I.jsx)(`div`, {
						className: Ar,
						children: (0, I.jsxs)(`nav`, {
							children: [
								(0, I.jsxs)(`button`, {
									className: Mr,
									onClick: () => r(!0),
									"aria-expanded": n,
									"aria-label": G.Localize(`#Aria_Navigation`),
									children: [
										(0, I.jsx)(`img`, { src: Te(Vr), alt: ``, className: Nr }),
										e.notifications?.unread_count !== 0 &&
											(0, I.jsx)(`div`, {
												className: `Zw6-HSkC3eM-`,
												children: (0, I.jsx)(`div`, {
													className: (0, H.default)(`Pp8YuIWJVEI-`),
													children: (0, I.jsx)(`span`, {
														className: `wrP3tE9OJHE-`,
														children: Xe(e.notifications?.unread_count ?? 0),
													}),
												}),
											}),
									],
								}),
								t(
									(0, I.jsx)(`a`, {
										href: O.STORE_BASE_URL,
										"aria-label": G.Localize(`#Aria_Steam_Home_Link`),
										className: jr,
										children: (0, I.jsx)(`img`, {
											src: Te(A(O.EREALM) ? Ur : Wr),
											alt: G.Localize(`#Aria_Steam_Home_Link`),
											height: 36,
										}),
									}),
								),
							],
						}),
					}),
				],
			}),
			(0, I.jsx)(Ii, { ...e, open: n, onDismiss: () => r(!1) }),
		],
	});
}
var Ri = `nlTg10o51PM-`,
	zi = `endSACxU25k-`,
	Bi = `Z0Fc4o3bNoI-`,
	Vi = `MhT6639uYT0-`,
	Hi = `p7dHTFbUaGA-`,
	Ui = `PjCIRmdNpcU-`,
	q = {};
((q.arabic = () => a(() => import(`./LUwHt1iu2.js`), [], import.meta.url)),
	(q.brazilian = () => a(() => import(`./B1S9bwXv.js`), [], import.meta.url)),
	(q.bulgarian = () => a(() => import(`./DhGH1ox-.js`), [], import.meta.url)),
	(q.czech = () => a(() => import(`./DXLvWsQk.js`), [], import.meta.url)),
	(q.danish = () => a(() => import(`./Cjb9n6dN.js`), [], import.meta.url)),
	(q.dutch = () => a(() => import(`./DLIzxHOT.js`), [], import.meta.url)),
	(q.english = () => a(() => import(`./DScfh8Vv.js`), [], import.meta.url)),
	(q.finnish = () => a(() => import(`./7Fplu1aK.js`), [], import.meta.url)),
	(q.french = () => a(() => import(`./CU0aB5uw.js`), [], import.meta.url)),
	(q.german = () => a(() => import(`./CQ9GHMwO.js`), [], import.meta.url)),
	(q.greek = () => a(() => import(`./Bu6Sq0Iw.js`), [], import.meta.url)),
	(q.hungarian = () => a(() => import(`./DCh9iehj.js`), [], import.meta.url)),
	(q.indonesian = () => a(() => import(`./DdGnLc1b.js`), [], import.meta.url)),
	(q.italian = () => a(() => import(`./Cp5Z670X.js`), [], import.meta.url)),
	(q.japanese = () => a(() => import(`./BsYQqo12.js`), [], import.meta.url)),
	(q.koreana = () => a(() => import(`./6ReR-yhY.js`), [], import.meta.url)),
	(q.latam = () => a(() => import(`./naFouzaI.js`), [], import.meta.url)),
	(q.malay = () => a(() => import(`./GLVAKsG8.js`), [], import.meta.url)),
	(q.norwegian = () => a(() => import(`./CmTUWuV9.js`), [], import.meta.url)),
	(q.polish = () => a(() => import(`./0poaULCJ.js`), [], import.meta.url)),
	(q.portuguese = () => a(() => import(`./BEOXCx76.js`), [], import.meta.url)),
	(q.romanian = () => a(() => import(`./D1NqqEZ3.js`), [], import.meta.url)),
	(q.russian = () => a(() => import(`./aOGCdsON.js`), [], import.meta.url)),
	(q.sc_schinese = () => a(() => import(`./HcBFaMdc.js`), [], import.meta.url)),
	(q.schinese = () => a(() => import(`./DyyQ740z.js`), [], import.meta.url)),
	(q.spanish = () => a(() => import(`./C2NSXUoB.js`), [], import.meta.url)),
	(q.swedish = () => a(() => import(`./Ui8l-944.js`), [], import.meta.url)),
	(q.tchinese = () => a(() => import(`./DhNWgfl9.js`), [], import.meta.url)),
	(q.thai = () => a(() => import(`./DesX7kM7.js`), [], import.meta.url)),
	(q.turkish = () => a(() => import(`./Bvaj__2-.js`), [], import.meta.url)),
	(q.ukrainian = () => a(() => import(`./BxdXGhky.js`), [], import.meta.url)),
	(q.vietnamese = () => a(() => import(`./CCCqOCYk.js`), [], import.meta.url)));
async function Wi(e) {
	if (q[e]) return await q[e]();
}
var Gi = We(Wi);
async function Ki(e) {
	let t = O.STORE_BASE_URL + `account/ajaxsetcookiepreferences`,
		n = new FormData();
	(n.set(`bAllow`, e.toString()), n.set(`sessionId`, it(tt)));
	let r = await fetch(t, { method: `POST`, credentials: `include`, body: n });
	if (r.ok) {
		let e = await r.json();
		e.transfer_urls &&
			e.transfer_params &&
			e.transfer_urls.forEach(async (t) => {
				let n = new FormData();
				(n.set(`transfer_params`, e.transfer_params),
					fetch(t, { method: `POST`, credentials: `include`, body: n }));
			});
	}
}
function qi() {
	let e = (0, F.useRef)(null);
	return (
		(0, F.useEffect)(() => {
			let t = setTimeout(() => {
				e.current?.show();
			}, 4e3);
			return () => {
				clearTimeout(t);
			};
		}, []),
		(0, I.jsxs)(`dialog`, {
			className: Ri,
			ref: e,
			children: [
				(0, I.jsxs)(`div`, {
					className: zi,
					children: [
						(0, I.jsx)(`div`, {
							className: Hi,
							children: Gi.Localize(`#CookiePrefPopup_Title`),
						}),
						(0, I.jsx)(`div`, {
							className: Hi,
							children: Ye(
								Gi.Localize(`#CookiePrefPopup_Desc`),
								(0, I.jsx)(`a`, {
									href: O.STORE_BASE_URL + `account/cookiepreferences`,
								}),
								(0, I.jsx)(`a`, {
									href: O.STORE_BASE_URL + `privacy_agreement`,
								}),
							),
						}),
					],
				}),
				(0, I.jsxs)(`div`, {
					className: Ui,
					children: [
						(0, I.jsx)(`button`, {
							className: Bi,
							onClick: async () => {
								(await Ki(1), e.current?.close());
							},
							children: Gi.Localize(`#CookiePrefPopup_AcceptAll`),
						}),
						(0, I.jsx)(`button`, {
							className: Vi,
							onClick: async () => {
								(await Ki(0), e.current?.close());
							},
							children: Gi.Localize(`#CookiePrefPopup_RejectAll`),
						}),
					],
				}),
			],
		})
	);
}
function Ji() {
	let e = rt();
	return e && e.preference_state != 4 ? null : (0, I.jsx)(qi, {});
}
var Yi = `GamepadInput`,
	Xi = (function (e) {
		return (
			(e[(e.PageUnloading = 0)] = `PageUnloading`),
			(e[(e.Unknown = 1)] = `Unknown`),
			(e[(e.None = 2)] = `None`),
			(e[(e.Basic = 3)] = `Basic`),
			(e[(e.Full = 4)] = `Full`),
			e
		);
	})({}),
	Zi = `PinnedView`,
	Qi = class {
		PostMessage(e) {}
		RegisterForMessage(e) {}
	},
	$i = class {
		m_fnCallback = void 0;
		constructor() {
			SteamClient.BrowserView.RegisterForMessageFromParent(this.OnMessage);
		}
		RegisterForMessage(e) {
			this.m_fnCallback = e;
		}
		PostMessage(e) {
			let t = JSON.stringify(e);
			SteamClient.BrowserView.PostMessageToParent(Yi, t);
		}
		OnMessage(e, t) {
			if (e == `GamepadInput`) {
				let e = JSON.parse(t);
				this.m_fnCallback(e);
			} else if (e == `Checkout`) {
				let e = JSON.parse(t);
				if (e.action == `paypal_success`)
					try {
						window.OnPayPalSuccess(e.transid);
					} catch {}
				else if (e.action == `paypal_cancel`)
					try {
						window.OnPayPalCancel(e.transid);
					} catch {}
			} else if (e == Zi) {
				let e = JSON.parse(t);
				try {
					window.HandleOverlayWindowPinnedView(
						e.bPinned == 1,
						e.bShowPinnedView == 1,
					);
				} catch {}
			}
		}
	};
y([c], $i.prototype, `OnMessage`, null);
var ea = class {
	m_postWindow;
	m_fnCallback = void 0;
	constructor(e) {
		((this.m_postWindow = e),
			window.addEventListener(`message`, this.OnMessage));
	}
	RegisterForMessage(e) {
		this.m_fnCallback = e;
	}
	PostMessage(e) {
		let t = JSON.stringify(e);
		this.m_postWindow.postMessage({ gamepadMessage: Yi, args: t }, `*`);
	}
	OnMessage(e) {
		let t = e?.data;
		if (t && t.gamepadMessage == `GamepadInput` && t.args) {
			let e = JSON.parse(t.args);
			this.m_fnCallback(e);
		}
	}
};
y([c], ea.prototype, `OnMessage`, null);
var ta = class {
	m_NavigationController;
	m_postMessage;
	m_bIsGamepadInputExternallyControlled = !1;
	constructor(e) {
		if (((this.m_NavigationController = e), na()))
			((this.m_bIsGamepadInputExternallyControlled = !0),
				(this.m_postMessage = new $i()),
				this.m_NavigationController.UpdateSourceToGamepad());
		else {
			let e = window.top;
			e && e != window.self
				? ((this.m_bIsGamepadInputExternallyControlled = !0),
					(this.m_postMessage = new ea(e)))
				: ((this.m_bIsGamepadInputExternallyControlled = !1),
					(this.m_postMessage = new Qi()));
		}
		(this.m_postMessage.RegisterForMessage(this.OnMessage),
			window.addEventListener(`unload`, this.PostPageUnloading),
			this.m_NavigationController.RegisterForUnhandledButtonDownEvents((e) =>
				this.PostButtonPressToSteam(e.detail.button),
			),
			this.UpdateActionDescriptions({}),
			this.SendGameInputState(`CGamepadWebBridgeClient constructor`));
	}
	RegisterForFocusChanged(e) {
		return e.FocusChangedCallbacks.Register(this.OnFocusChanged).Unregister;
	}
	BIsGamepadInputExternallyControlled() {
		return this.m_bIsGamepadInputExternallyControlled;
	}
	BFromActiveNavTree(e, t) {
		let n = t?.Tree;
		return ((n ||= e?.Tree), n && n.Controller.IsActiveFocusNavTree(n));
	}
	OnFocusChanged(e, t, n) {
		this.BFromActiveNavTree(t, n) && this.OnActionDescriptionTargetChanged(n);
	}
	UpdateActionDescriptions(e) {
		this.m_postMessage.PostMessage({
			type: `UpdateActionDescriptions`,
			data: { descriptions: e },
		});
	}
	m_rgCallbackRegistrations = [];
	OnActionDescriptionTargetChanged(e) {
		if (
			(this.m_rgCallbackRegistrations.forEach((e) => e()),
			(this.m_rgCallbackRegistrations = []),
			e)
		) {
			let t = () =>
				this.UpdateActionDescriptions(e.GetActiveActionDescriptions() ?? {});
			t();
			for (let n = e; n != null; n = n.Parent)
				this.m_rgCallbackRegistrations.push(
					n.ActionDescriptionChangedCallbackList.Register(t).Unregister,
				);
		} else this.UpdateActionDescriptions({});
	}
	OnMessage(e) {
		switch (e.type) {
			case `TakeFocus`:
				this.m_NavigationController.TakeFocusChangingIFrame();
				break;
			case `ForwardedGameEventDetail`:
				this.m_NavigationController.DispatchVirtualGamepad(
					e.data.event,
					e.data.details,
				);
				break;
		}
	}
	SendGameInputState(e) {
		let t = Xi.Basic;
		(window.bSupportsGamepadUI && (t = Xi.Full),
			this.m_postMessage.PostMessage({
				type: `GameInputState`,
				data: { source: e, support: t },
			}));
	}
	PostButtonPressToSteam(e) {
		this.m_postMessage.PostMessage({
			type: `ButtonPressed`,
			data: { button: e },
		});
	}
	PostPageUnloading() {
		this.m_postMessage.PostMessage({
			type: `PageUnloading`,
			data: { location: window.location.href },
		});
	}
};
(y([c], ta.prototype, `OnFocusChanged`, null),
	y([c], ta.prototype, `OnMessage`, null),
	y([c], ta.prototype, `PostPageUnloading`, null));
function na() {
	return (
		pe(`BrowserView.RegisterForMessageFromParent`) &&
		pe(`BrowserView.PostMessageToParent`)
	);
}
var ra = [
		{ index: 0, type: h.OK, category: `action` },
		{ index: 1, type: h.CANCEL, category: `action` },
		{ index: 2, type: h.SECONDARY, category: `action` },
		{ index: 3, type: h.OPTIONS, category: `action` },
		{ index: 4, type: h.BUMPER_LEFT, category: `action` },
		{ index: 5, type: h.BUMPER_RIGHT, category: `action` },
		{ index: 6, type: h.TRIGGER_LEFT, category: `action` },
		{ index: 7, type: h.TRIGGER_RIGHT, category: `action` },
		{ index: 8, type: h.SELECT, category: `action` },
		{ index: 9, type: h.START, category: `action` },
		{ index: 10, type: h.LSTICK_CLICK, category: `action` },
		{ index: 11, type: h.RSTICK_CLICK, category: `action` },
		{ index: 12, type: h.DIR_UP, category: `navigation` },
		{ index: 13, type: h.DIR_DOWN, category: `navigation` },
		{ index: 14, type: h.DIR_LEFT, category: `navigation` },
		{ index: 15, type: h.DIR_RIGHT, category: `navigation` },
		{ index: 16, type: h.STEAM_GUIDE, category: `action` },
		{ index: 17, type: h.SELECT, category: `action` },
	],
	ia = class extends ne {
		m_rgGamepadStatus = [];
		constructor() {
			(super(),
				this.SetSourceType(d.GAMEPAD),
				window.addEventListener(`gamepadconnected`, (e) => {
					this.m_bGamepadDetected ||
						(this.OnGamepadDetected(), this.PollGamepads());
				}));
		}
		PollGamepads() {
			let e = navigator.getGamepads();
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (!n) continue;
				this.m_rgGamepadStatus[t] ||
					(this.m_rgGamepadStatus[t] = { buttons: [] });
				let r = this.m_rgGamepadStatus[t];
				for (let e = 0; e < ra.length; e++) {
					let t = ra[e],
						i = t.index;
					n.buttons[i] &&
						(n.buttons[i].pressed
							? r.buttons[i] || ((r.buttons[i] = !0), this.OnButtonDown(t.type))
							: r.buttons[i] && (this.OnButtonUp(t.type), (r.buttons[i] = !1)));
				}
			}
			requestAnimationFrame(this.PollGamepads);
		}
	};
y([c], ia.prototype, `PollGamepads`, null);
var aa = class extends ne {
	m_lastButtonDown = h.INVALID;
	constructor(e) {
		(super(),
			this.SetSourceType(d.KEYBOARD_SIMULATOR),
			e.addEventListener(`keydown`, this.OnKeyDown, { capture: !0 }),
			e.addEventListener(`keyup`, this.OnKeyUp, { capture: !0 }),
			e.addEventListener(`blur`, this.Reset));
	}
	OnKeyDown(e) {
		let t = this.TranslateKey(e);
		t != h.INVALID &&
			(e.preventDefault(),
			e.stopPropagation(),
			t != this.m_lastButtonDown &&
				(this.Reset(), this.OnButtonDown(t), (this.m_lastButtonDown = t)));
	}
	OnKeyUp(e) {
		let t = this.TranslateKey(e);
		t != h.INVALID &&
			(this.OnButtonUp(t),
			(this.m_lastButtonDown = h.INVALID),
			e.preventDefault(),
			e.stopPropagation());
	}
	Reset() {
		this.m_lastButtonDown != h.INVALID &&
			(this.OnButtonUp(this.m_lastButtonDown),
			(this.m_lastButtonDown = h.INVALID));
	}
	GetKeycodeFromEvent(e) {
		return we.PLATFORM === `linux` && e.key.length > 1
			? e.key || e.code
			: e.code || e.key;
	}
	BShouldSwallowEventForTextInputWorkaround(e) {
		if (
			!(
				ae(e.target) &&
				(e.target.nodeName === `INPUT` ||
					e.target.nodeName === `TEXTAREA` ||
					e.target.hasAttribute(`contenteditable`))
			)
		)
			return !1;
		if (e.target.hasAttribute(`contenteditable`)) return !0;
		let t = this.GetKeycodeFromEvent(e),
			n = e.target;
		if (n.type === `range`) return !1;
		let r = Array.from(n.ownerDocument.getElementsByClassName(`gpfocus`)).some(
			(e) => Array.from(e.classList).some((e) => e.includes(`virtualkeyboard`)),
		);
		switch (t) {
			case `ArrowUp`: {
				if (r) return !0;
				let t = n?.value.indexOf(`
`);
				return (
					e.target.nodeName === `TEXTAREA` &&
					t >= 0 &&
					t < (n?.selectionStart ?? 0)
				);
			}
			case `ArrowDown`: {
				if (r) return !0;
				let t = n?.value.lastIndexOf(`
`);
				return (
					e.target.nodeName === `TEXTAREA` &&
					t >= 0 &&
					t >= (n?.selectionStart ?? 0) &&
					(n?.selectionEnd ?? 0) < n?.value.length
				);
			}
			case `ArrowLeft`:
				return r
					? !0
					: (n?.selectionStart ?? 0) > 0 && (n?.selectionEnd ?? 0) > 0;
			case `ArrowRight`:
				return r
					? !0
					: (n?.selectionStart ?? 0) < n?.value.length &&
							(n?.selectionEnd ?? 0) < n?.value.length;
			case `Enter`:
				return !0;
			case `Backspace`:
				return !0;
			default:
				return !1;
		}
	}
	TranslateKey(e) {
		let t = this.GetKeycodeFromEvent(e);
		if (e.altKey || this.BShouldSwallowEventForTextInputWorkaround(e))
			return h.INVALID;
		if (e.ctrlKey)
			if (e.shiftKey)
				switch (t) {
					case `Digit4`:
						return h.TRIGGER_LEFT;
					case `Digit5`:
						return h.TRIGGER_RIGHT;
					default:
						return h.INVALID;
				}
			else
				switch (t) {
					case `Digit1`:
						return h.STEAM_GUIDE;
					case `Digit2`:
						return h.STEAM_QUICK_MENU;
					case `Digit3`:
						return h.SELECT;
					case `Digit4`:
						return h.BUMPER_LEFT;
					case `Digit5`:
						return h.BUMPER_RIGHT;
					case `Digit6`:
						return h.LSTICK_CLICK;
					case `Digit7`:
						return h.RSTICK_CLICK;
					case `Digit8`:
						return h.OPTIONS;
					case `Digit9`:
						return h.SELECT;
					case `Digit0`:
						return h.START;
				}
		else if (!e.shiftKey)
			switch (t) {
				case `Escape`:
					return h.CANCEL;
				case `Enter`:
					return h.OK;
				case `Backspace`:
					return h.SECONDARY;
				case `ArrowUp`:
					return h.DIR_UP;
				case `ArrowDown`:
					return h.DIR_DOWN;
				case `ArrowLeft`:
					return h.DIR_LEFT;
				case `ArrowRight`:
					return h.DIR_RIGHT;
			}
		return h.INVALID;
	}
};
(y([c], aa.prototype, `OnKeyDown`, null),
	y([c], aa.prototype, `OnKeyUp`, null),
	y([c], aa.prototype, `Reset`, null));
var J = class extends ne {
	m_nAccumulatedMouseMovement = 0;
	m_bFirstMouseUpdate = !0;
	m_nLastScreenX;
	m_nLastScreenY;
	m_lastButtonDown = h.INVALID;
	constructor(e) {
		(super(),
			this.SetSourceType(d.MOUSE),
			e.addEventListener(`mousedown`, this.OnMouseDown),
			e.addEventListener(`mouseup`, this.OnMouseUp),
			e.addEventListener(`mousemove`, this.OnMouseMove),
			e.addEventListener(`blur`, this.Reset));
	}
	TranslateKey(e) {
		switch (e.button) {
			case 3:
				return h.CANCEL;
			default:
				return h.INVALID;
		}
	}
	OnMouseDown(e) {
		if (e.defaultPrevented) return;
		let t = this.TranslateKey(e);
		t != h.INVALID &&
			(e.preventDefault(),
			t != this.m_lastButtonDown &&
				(this.Reset(), this.OnButtonDown(t), (this.m_lastButtonDown = t)),
			this.OnNavigationTypeChanged(d.MOUSE));
	}
	OnMouseUp(e) {
		let t = this.TranslateKey(e);
		t != h.INVALID &&
			(this.OnButtonUp(t),
			(this.m_lastButtonDown = h.INVALID),
			e.preventDefault());
	}
	OnMouseMove(e) {
		if (!e.defaultPrevented) {
			if (this.m_bFirstMouseUpdate) {
				((this.m_nLastScreenX = e.screenX),
					(this.m_nLastScreenY = e.screenY),
					(this.m_bFirstMouseUpdate = !1));
				return;
			}
			((this.m_nAccumulatedMouseMovement +=
				Math.abs(e.screenX - this.m_nLastScreenX) +
				Math.abs(e.screenY - this.m_nLastScreenY)),
				this.m_nAccumulatedMouseMovement > 500 &&
					(this.Reset(), this.OnNavigationTypeChanged(d.MOUSE)));
		}
	}
	Reset() {
		((this.m_nAccumulatedMouseMovement = 0),
			(this.m_bFirstMouseUpdate = !0),
			this.m_lastButtonDown != h.INVALID &&
				(this.OnButtonUp(this.m_lastButtonDown),
				(this.m_lastButtonDown = h.INVALID)));
	}
};
(y([c], J.prototype, `TranslateKey`, null),
	y([c], J.prototype, `OnMouseDown`, null),
	y([c], J.prototype, `OnMouseUp`, null),
	y([c], J.prototype, `OnMouseMove`, null),
	y([c], J.prototype, `Reset`, null));
var oa = class extends ne {
	constructor(e) {
		(super(),
			this.SetSourceType(d.TOUCH),
			e.addEventListener(`touchstart`, this.OnTouchStart),
			e.addEventListener(`touchend`, this.OnTouchEnd));
	}
	OnTouchStart(e) {
		e.defaultPrevented || this.OnNavigationTypeChanged(d.TOUCH);
	}
	OnTouchEnd(e) {
		e.defaultPrevented || this.OnNavigationTypeChanged(d.TOUCH);
	}
};
(y([c], oa.prototype, `OnTouchStart`, null),
	y([c], oa.prototype, `OnTouchEnd`, null));
var sa = `VirtualKeyboardMessage`;
function ca(e) {
	return e && e.type === sa;
}
var Y = class {
	m_ownerWindow;
	constructor() {}
	Init(e) {
		return (
			(this.m_ownerWindow = e),
			this.m_ownerWindow.addEventListener(`message`, this.OnMessage),
			() => {
				(this.m_ownerWindow.removeEventListener(`message`, this.OnMessage),
					(this.m_ownerWindow = void 0));
			}
		);
	}
	CreateVirtualKeyboardRef() {
		return {
			ShowVirtualKeyboard: this.ShowVirtualKeyboard,
			ShowModalKeyboard: this.ShowModalKeyboard,
			SetAsCurrentVirtualKeyboardTarget: () => {},
			HideVirtualKeyboard: this.HideVirtualKeyboard,
			DelayHideVirtualKeyboard: this.HideVirtualKeyboard,
			BIsActive: () => !0,
			BIsElementValidForInput: () => !0,
		};
	}
	ShowVirtualKeyboard() {
		this.SendMessage({ message: `ShowVirtualKeyboard` });
	}
	ShowModalKeyboard() {
		this.SendMessage({ message: `ShowModalKeyboard` });
	}
	HideVirtualKeyboard(e) {
		this.SendMessage({ message: `HideVirtualKeyboard`, msDelay: e });
	}
	OnBrowserViewMessage(e, t) {
		e == sa && this.InternalDispatchMessage(JSON.parse(t));
	}
	OnMessage(e) {
		this.InternalDispatchMessage(e.data);
	}
	InternalDispatchMessage(e) {
		if (ca(e))
			switch (e.message) {
				case `OnEnterKeyPress`:
					break;
			}
	}
	SendMessage(e) {
		let t = { type: `VirtualKeyboardMessage`, ...e };
		pe(`BrowserView.PostMessageToParent`)
			? SteamClient.BrowserView.PostMessageToParent(t.type, JSON.stringify(t))
			: this.m_ownerWindow &&
				(i(
					this.m_ownerWindow.parent &&
						this.m_ownerWindow.parent != this.m_ownerWindow,
					`CVirtualKeyboardClient: No parent client window available, cannot display virtual keyboard`,
				),
				this.m_ownerWindow.parent.postMessage(t, `*`));
	}
};
(y([c], Y.prototype, `ShowVirtualKeyboard`, null),
	y([c], Y.prototype, `ShowModalKeyboard`, null),
	y([c], Y.prototype, `HideVirtualKeyboard`, null),
	y([c], Y.prototype, `OnBrowserViewMessage`, null),
	y([c], Y.prototype, `OnMessage`, null),
	y(
		[c],
		class {
			m_showKeyboard;
			m_showModalKeyboard;
			m_hideKeyboard;
			constructor(e, t, n, r) {
				((this.m_showKeyboard = t),
					(this.m_showModalKeyboard = n),
					(this.m_hideKeyboard = r),
					e.on(`message`, this.OnMessage));
			}
			OnMessage(e, t, n) {
				if (e == sa) {
					let e = JSON.parse(t);
					if (ca(e))
						switch (e.message) {
							case `ShowVirtualKeyboard`:
								this.m_showKeyboard();
								break;
							case `ShowModalKeyboard`:
								this.m_showModalKeyboard();
								break;
							case `HideVirtualKeyboard`:
								this.m_hideKeyboard();
								break;
						}
				}
			}
		}.prototype,
		`OnMessage`,
		null,
	));
function la(e) {
	let t = j(),
		[n] = F.useState(() => {
			let e = new nn();
			return (t && e.UpdateSourceToGamepad(), e);
		}),
		[r, i] = F.useState(),
		[a] = F.useState(() => new Y()),
		[o, s] = F.useState(void 0);
	return (
		F.useEffect(() => {
			if (t && !r) {
				let e = new ta(n);
				(i(e), s(e.BIsGamepadInputExternallyControlled()));
			}
		}, [t, r, n]),
		F.useEffect(() => {
			if (t) return a.Init(window);
		}, [t, a]),
		(0, I.jsxs)(re, {
			controller: n,
			children: [
				o === !1 && t === !0 && (0, I.jsx)(da, {}),
				(o === !0 || t === !0) && (0, I.jsx)(pa, {}),
				t && (0, I.jsx)(ma, {}),
				(0, I.jsxs)(me, {
					ownerWindow: window,
					children: [
						r && (0, I.jsx)(ua, { bridge: r }),
						(0, I.jsx)(oe, { factory: a, children: e.children }),
					],
				}),
			],
		})
	);
}
function ua(e) {
	let { bridge: t } = e,
		n = de();
	return (
		F.useEffect(() => {
			if (!(!n || !t)) return t.RegisterForFocusChanged(n);
		}, [n, t]),
		null
	);
}
function da() {
	let [e] = F.useState(() => new ia());
	return (ve(e), null);
}
function fa(e) {
	let [t, n] = F.useState(void 0);
	(F.useEffect(() => n(new e(window)), [e]), ve(t));
}
function pa() {
	return (fa(aa), null);
}
function ma() {
	return (fa(J), fa(oa), null);
}
var ha = `SZDk3YnqgsA-`,
	ga = `QWXMPVkRhGI-`,
	_a = `mza1BulfSrM-`,
	va = `hQKLMdLvxDY-`,
	ya = `Z3KlM4Otpc8-`,
	ba = `Oj6f7oEvtuE-`,
	xa = `lE5kWQHyKWU-`;
function Sa() {
	return (0, I.jsxs)(`svg`, {
		xmlns: `http://www.w3.org/2000/svg`,
		width: `142`,
		height: `44`,
		viewBox: `0 0 142 44`,
		fill: `#C7C5C2`,
		children: [
			(0, I.jsx)(`path`, {
				d: `M22,0C10.4,0,0.9,8.9,0,20.2l11.8,4.9c1-0.7,2.2-1.1,3.5-1.1c0.1,0,0.2,0,0.3,0l5.3-7.6c0,0,0-0.1,0-0.1    c0-4.6,3.7-8.3,8.3-8.3c4.6,0,8.3,3.7,8.3,8.3s-3.7,8.3-8.3,8.3c-0.1,0-0.1,0-0.2,0L21.6,30c0,0.1,0,0.2,0,0.3    c0,3.4-2.8,6.2-6.2,6.2c-3,0-5.5-2.2-6.1-5L0.8,28C3.4,37.2,11.9,44,22,44C34.2,44,44,34.1,44,22S34.2,0,22,0z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M13.8,33.4l-2.7-1.1c0.5,1,1.3,1.8,2.4,2.3c2.4,1,5.1-0.1,6.1-2.5c0.5-1.1,0.5-2.4,0-3.6    c-0.5-1.2-1.4-2.1-2.5-2.5c-1.1-0.5-2.4-0.5-3.5-0.1l2.8,1.2c1.8,0.7,2.6,2.7,1.9,4.5C17.6,33.3,15.6,34.1,13.8,33.4z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M34.8,16.3c0-3-2.5-5.5-5.5-5.5c-3.1,0-5.5,2.5-5.5,5.5s2.5,5.5,5.5,5.5C32.3,21.9,34.8,19.4,34.8,16.3z     M25.1,16.3c0-2.3,1.9-4.2,4.2-4.2s4.2,1.9,4.2,4.2c0,2.3-1.9,4.2-4.2,4.2S25.1,18.6,25.1,16.3z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M45.9,6.4c0,1.3-1,2.1-2.1,2.1c-1.1,0-2.1-0.8-2.1-2.1s1-2.1,2.1-2.1C44.9,4.3,45.9,5.1,45.9,6.4z M42,6.4    c0,1.1,0.8,1.8,1.8,1.8c1,0,1.8-0.7,1.8-1.8c0-1.1-0.8-1.8-1.8-1.8C42.8,4.6,42,5.3,42,6.4z M43.8,5.3c0.6,0,0.7,0.3,0.7,0.6    c0,0.3-0.2,0.5-0.4,0.6l0.5,0.9h-0.4l-0.4-0.8h-0.5v0.8h-0.3V5.3L43.8,5.3L43.8,5.3z M43.4,6.3h0.4c0.3,0,0.4-0.2,0.4-0.4    c0-0.2-0.1-0.3-0.4-0.3h-0.4V6.3z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M141.9,12.7c0,1.3-1,2.1-2.1,2.1c-1.1,0-2.1-0.8-2.1-2.1s1-2.1,2.1-2.1C141,10.5,141.9,11.4,141.9,12.7z     M138,12.7c0,1.1,0.8,1.8,1.8,1.8c1,0,1.8-0.7,1.8-1.8c0-1.1-0.8-1.8-1.8-1.8C138.8,10.8,138,11.5,138,12.7z M139.8,11.6    c0.6,0,0.7,0.3,0.7,0.6c0,0.3-0.2,0.5-0.4,0.6l0.5,0.9h-0.4l-0.4-0.8h-0.5v0.8h-0.3v-2.1L139.8,11.6L139.8,11.6z M139.4,12.6h0.4    c0.3,0,0.4-0.2,0.4-0.4c0-0.2-0.1-0.3-0.4-0.3h-0.4V12.6z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M65.9,20.5c-1.1,3-3.6,5-6.5,6.1c-0.3-0.6-0.8-1.4-1.3-1.9c1.8-0.5,3.5-1.5,4.6-2.8H59v-1.9h5l0.4-0.1    L65.9,20.5z M58.4,30.6c0.8-0.8,1.7-2,2.2-3l2.1,1c-0.6,1-1.4,2.3-2.2,3.1L58.4,30.6z M62.7,15.8h-4.1v-2.1h4.1v-1.1h2.5v1.1h5.2    v-1.1h2.5v1.1h4.1v2.1h-4.1v1.1h-2.5v-1.1h-5.2v1.1h-2.5V15.8z M61.4,25.6h12.2v2H61.4V25.6z M75.7,20.8c-0.9,0.7-1.9,1.4-2.8,1.9    c1.3,0.6,2.7,1.1,4.2,1.4c-0.5,0.5-1.2,1.4-1.5,2.1c-2.6-0.7-5-2.1-6.7-3.9v1c0,1-0.2,1.5-0.9,1.8c-0.7,0.3-1.6,0.3-2.7,0.3    c-0.1-0.6-0.4-1.3-0.7-1.9c0.7,0,1.4,0,1.6,0c0.2,0,0.3-0.1,0.3-0.3v-2.9c0.7-0.3,1.4-0.7,2.1-1.2h-7.1v-1.9h9.6l0.5-0.1l1.5,1.3    c-0.9,0.7-2.1,1.5-3.3,2.2c0.3,0.4,0.8,0.8,1.3,1.1c0.9-0.6,2-1.5,2.6-2.2L75.7,20.8z M66.2,28.2c0.3,1,0.6,2.3,0.6,3.1l-2.4,0.4    c0-0.8-0.2-2.2-0.5-3.2L66.2,28.2z M70.5,27.9c0.6,0.9,1.1,2.1,1.3,3l-2.2,0.7c-0.1-0.8-0.6-2.1-1.2-3L70.5,27.9z M74.7,27.6    c0.9,0.9,2,2.2,2.5,3.1l-2.2,1c-0.5-0.9-1.5-2.2-2.4-3.2L74.7,27.6z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M82.2,22.2c-0.8-0.6-2.4-1.4-3.6-2l1.3-1.8c1.1,0.5,2.8,1.3,3.6,1.8L82.2,22.2z M79.3,29.7    c1-1.5,2.5-4,3.6-6.3l1.9,1.6c-1,2.1-2.2,4.4-3.3,6.3L79.3,29.7z M83.3,16.8c-0.7-0.6-2.3-1.6-3.5-2.2l1.4-1.8    c1.1,0.5,2.7,1.4,3.5,2L83.3,16.8z M87.1,17.8c-0.5,0.7-0.9,1.2-1.4,1.8c-0.5-0.4-1.4-1.2-2-1.5c1.5-1.3,2.8-3.5,3.5-5.6l2.4,0.6    c-0.2,0.5-0.4,1-0.7,1.5h9v2.1H87.8C87.6,17.1,87.4,17.4,87.1,17.8l9-0.1v2h-9L87.1,17.8L87.1,17.8z M95.7,20.9c0,5,0,8.5,0.7,8.5    c0.2,0,0.3-1.1,0.3-2.6c0.4,0.5,1,1.2,1.4,1.5c-0.2,2.3-0.6,3.4-2,3.4c-2.5,0-2.8-3.4-2.9-8.7h-8.3v-2.1h9.6v0L95.7,20.9    L95.7,20.9z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M118.4,24.9h-8.1v6.8h-2.6v-6.8h-8v-2.5h8v-6.2h-6.9v-2.4h16.4v2.4h-6.9v6.2h8.1V24.9z M104.2,16.8    c0.7,1.3,1.4,3,1.7,4.2l-2.4,0.7c-0.2-1.1-0.8-2.9-1.5-4.3L104.2,16.8z M111.9,21.1c0.7-1.2,1.4-3,1.8-4.3l2.6,0.7    c-0.7,1.6-1.6,3.3-2.3,4.3L111.9,21.1z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M133.2,14.4c1.9,1.8,4.4,4.3,5.4,6l-2.1,1.5c-0.3-0.5-0.6-1-1.1-1.6c-11,0.5-12.4,0.6-13.5,0.9    c-0.1-0.5-0.5-1.7-0.8-2.3c0.5-0.1,1-0.5,1.7-1.2c0.7-0.6,3-3.1,4.4-5.6l2.5,1c-1.3,1.9-2.9,3.7-4.5,5.2l8.5-0.3    c-0.8-0.9-1.6-1.8-2.4-2.5L133.2,14.4z M122.6,22.6h13.9v9h-2.6v-1h-8.7v1h-2.5V22.6z M125.2,25v3.3h8.7V25H125.2z`,
			}),
		],
	});
}
function Ca() {
	return (0, I.jsxs)(`svg`, {
		width: `98`,
		height: `34`,
		viewBox: `0 0 98 34`,
		xmlns: `http://www.w3.org/2000/svg`,
		fill: `#C30A14`,
		children: [
			(0, I.jsx)(`path`, {
				d: `M4.61077 4.15321H19.2526V6.65217H23.617V1.26708H14.6418C14.5362 1.0911 14.4658 0.950311 14.3251 0.809524C13.8675 0.31677 13.1284 0 11.7557 0C10.6646 0 9.85507 0.492754 9.46791 1.26708H0.281574V6.68737H4.61077V4.15321ZM75.6377 0.31677V13.6563H77.0807L76.7288 14.6066C76.6936 14.7474 76.4472 15.1346 76.2008 15.3106C75.9897 15.4865 75.4265 15.5921 74.9689 15.5921H74.4058V18.8654H74.6874C77.2215 18.8654 78.0663 18.9358 78.8054 18.3375C79.2629 17.9855 79.6501 17.5631 80.0021 17.1056V20.3789C80.0021 20.5549 79.8261 20.7309 79.6501 20.7309H56.2091C55.8923 20.7309 55.7516 20.5549 55.7164 20.2381V7.4265H57.6874V19.0062H67.8592C71.2733 19.0062 71.6957 17.3168 71.5901 14.8178V7.4265H73.3147V4.08282H71.6253V0.52795H67.7888V4.08282H61.5942V0.52795H57.6874V4.08282H55.7164V0.52795H51.8095V4.08282H50.8592V7.4265H51.8095V20.6253V21.3644C51.8447 23.3354 52.6542 23.9689 54.6253 23.9689H80.1077C83.1346 23.9689 83.7681 22.4907 83.6625 20.0621V15.029H81.058L81.5507 13.6563H90.7371C91.3354 14.8178 91.7226 15.5569 91.6874 15.4161C91.617 15.3106 91.6522 15.3458 91.7226 15.4513H90.7371V23.9337H94.3975V18.6542C94.8551 19.0062 95.207 19.0414 96.087 19.0414H97.8468V15.4865H96.6149C96.2981 15.4865 95.8406 14.7474 95.6646 14.501C95.6294 14.4658 95.4534 14.1843 95.1718 13.6563C95.5942 13.5859 95.9462 13.4099 96.1574 13.1988C96.8613 12.5652 97.0725 11.8965 97.0725 10.9462V0.31677H75.6377ZM61.559 7.4265H67.7184V15.1346C67.7184 15.3458 67.5424 15.4865 67.3665 15.4865H61.559V7.4265ZM84.4017 10.911H79.5093V8.37681H84.4017V10.911ZM84.4369 5.63147H79.5445V3.09731H84.4369V5.63147ZM93.2008 9.92547C93.2008 10.0663 93.0952 10.4534 92.9545 10.6294C92.7785 10.8054 92.7433 10.911 92.2857 10.911H88.0621V8.37681H93.2008V9.92547ZM93.236 5.63147H88.0973V3.09731H93.236V5.63147ZM23.1594 7.07453H0.63354V9.96066H23.1594V7.07453ZM40.441 17.7391H49.0642V15.0642H39.4203C39.4907 14.4658 39.5963 13.8323 39.6315 13.1988H49.0642V10.5238H39.6315V9.04555H49.0642V6.3354H39.6315V4.75155H49.0642V2.0766H46.7412L47.7267 0.351967H42.9752L41.9897 2.0766H32.8737L31.9586 0.351967H27.6646L28.5797 2.0766H26.0455V4.75155H35.0207C35.0207 5.2795 35.0207 5.80745 35.0207 6.3354H26.0807V9.01035H35.0559C35.0559 9.5383 35.0559 10.0311 35.0559 10.4886H26.0807V13.1636H35.0559C35.0559 13.6915 35.0207 14.0083 35.0207 14.0787C35.0207 14.3954 34.9503 14.7122 34.8799 15.029H26.0807V17.7039H33.648C32.6977 19.0766 30.6563 20.6957 24.5321 20.6957C23.3706 20.6957 21.0476 20.6957 18.6542 20.6957V14.7122H23.441V11.8261H0V14.7122H5.20911L0.0351967 23.7578H4.78675L9.96066 14.7474H14.3954V23.7578H24.4265C30.8323 23.7578 33.7536 22.913 36.1822 20.8012C36.6046 20.4493 36.9917 20.1325 37.3085 19.8157L43.0456 23.7578H50.8592V20.5901H44.6646L40.441 17.7391Z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M14.9234 29.2835C14.9234 29.2835 12.6004 29.2835 11.7909 29.2835C11.2629 29.2835 10.9462 29.4947 10.735 29.7059C10.8406 28.7204 11.5445 28.0517 12.4244 27.8405C12.8468 27.7349 13.234 27.6997 13.5859 27.6997C14.4658 27.6997 15.0994 27.9461 15.0994 27.9109C15.1698 27.9461 15.2402 27.9461 15.2754 27.9109C15.3106 27.8757 15.3458 27.8405 15.3458 27.7701V26.6438C15.3458 26.5382 15.2402 26.3974 15.0994 26.3622C15.0994 26.3622 14.2195 26.151 13.058 26.151C12.5652 26.151 12.0021 26.1862 11.4741 26.2918C9.96066 26.6086 8.37681 27.6645 8.30642 29.7411C8.30642 30.1635 8.34162 30.5506 8.41201 30.9026C8.76398 32.4864 10.1015 33.296 11.3333 33.5775C11.8261 33.6831 12.354 33.7183 12.8468 33.7183C14.1491 33.7183 15.2754 33.472 15.2754 33.472C15.3458 33.4368 15.4162 33.4016 15.4162 33.296V32.2753C15.4162 32.2049 15.381 32.0993 15.3106 32.0641C15.2754 32.0289 15.205 32.0289 15.1346 32.0289C15.1346 32.0289 14.2195 32.2753 13.234 32.2753C12.8116 32.2753 12.3892 32.2401 12.0373 32.0993C11.3333 31.8529 10.9814 31.3954 10.8054 30.797H15.0642C15.1698 30.797 15.2402 30.7266 15.2402 30.621V29.5651C15.2402 29.4947 15.205 29.4243 15.1346 29.3539C15.0642 29.3187 14.9938 29.2835 14.9234 29.2835ZM23.4058 28.9668C23.4058 28.6852 23.3706 28.4036 23.3002 28.1221C23.089 27.1366 22.2795 26.3974 20.9068 26.2214C20.3085 26.151 19.5694 26.1158 18.8654 26.1158C17.6335 26.1158 16.5072 26.1862 16.5072 26.1862C16.4017 26.1862 16.3313 26.2566 16.3313 26.3622V33.472C16.3313 33.5423 16.3665 33.6127 16.4017 33.6831C16.4721 33.7535 16.5424 33.7535 16.6128 33.7535H18.2671C18.3727 33.7535 18.4431 33.6831 18.4431 33.5775C18.4431 33.5775 18.4431 28.6852 18.4431 27.5941C18.7598 27.5589 19.0414 27.5589 19.2878 27.5589C19.8861 27.5589 20.3085 27.6293 20.5901 27.7701C20.8364 27.9109 20.9772 28.0517 21.0476 28.3684C21.0828 28.5092 21.0828 28.65 21.0828 28.826C21.0476 29.9875 20.6605 30.2691 19.1118 30.3043C19.0062 30.3043 18.9358 30.3746 18.9358 30.4802C18.9358 31.0434 18.9358 31.2546 18.9358 31.2546C18.9358 31.325 18.971 31.3954 19.0062 31.4657C19.0766 31.5361 19.147 31.5713 19.2174 31.5713C19.2174 31.5713 19.3582 31.5713 19.5694 31.5713H19.6046C20.4141 31.6417 20.8012 32.2753 21.0124 33.0496C21.0476 33.1904 21.0828 33.3664 21.0828 33.5072C21.0828 33.5775 21.118 33.6479 21.1884 33.6831C21.2588 33.7183 21.3292 33.7535 21.3644 33.7535H23.3002C23.4058 33.7535 23.5114 33.6479 23.4762 33.5424C23.4762 33.472 23.441 33.3664 23.441 33.296C23.265 32.5568 22.8427 31.6769 22.2091 31.1138C22.9834 30.6914 23.4058 29.8819 23.4058 28.9668ZM7.91926 28.1573C7.70808 27.1366 6.82816 26.3622 5.45549 26.2214C4.85715 26.151 4.04762 26.1158 3.2733 26.1158C1.90062 26.1158 0.598347 26.1862 0.598347 26.1862C0.492757 26.1862 0.422363 26.2566 0.422363 26.3622V33.472C0.422363 33.5423 0.45756 33.6127 0.492757 33.6831C0.56315 33.7535 0.633543 33.7535 0.703937 33.7535H2.56936C2.67495 33.7535 2.74534 33.6831 2.74534 33.5775C2.74534 33.5775 2.74534 32.6272 2.74534 31.5009C2.78054 31.5361 2.85093 31.5713 2.88613 31.5713C2.88613 31.5713 3.41408 31.6065 4.08282 31.6065C4.61077 31.6065 5.20911 31.5713 5.73706 31.5009C7.14493 31.2546 8.02485 30.2691 8.02485 28.9668C8.02485 28.6852 7.98965 28.4388 7.91926 28.1573ZM5.56108 28.826C5.56108 29.4243 5.3851 29.7059 4.99793 29.9171C4.57557 30.1283 3.87164 30.1987 2.81574 30.1987C2.78054 30.1987 2.78054 30.1987 2.74534 30.1987C2.74534 29.0724 2.74534 28.0165 2.74534 27.5589C3.06211 27.5237 3.34369 27.5237 3.59007 27.5237C4.22361 27.5237 4.71636 27.5941 4.99793 27.7701C5.27951 27.9109 5.42029 28.0869 5.52588 28.4036C5.52588 28.5796 5.56108 28.6852 5.56108 28.826ZM45.5797 26.3622C45.5797 26.3622 44.6998 26.151 43.5383 26.151C43.0456 26.151 42.4824 26.1862 41.9545 26.327C40.441 26.6438 38.8571 27.6997 38.7868 29.7763C38.7868 30.1987 38.822 30.5858 38.8923 30.9378C39.2443 32.5216 40.5818 33.3312 41.8137 33.6127C42.3064 33.7183 42.7992 33.7535 43.3271 33.7535C44.5942 33.7535 45.7557 33.5072 45.7557 33.5072C45.8261 33.472 45.8965 33.4368 45.8965 33.3312V32.3457C45.8965 32.2753 45.8613 32.1697 45.7909 32.1345C45.7205 32.0641 45.6501 32.0641 45.5445 32.0641C45.5445 32.0641 44.6294 32.3105 43.6439 32.2753C43.2215 32.2753 42.7992 32.2401 42.4472 32.0993C41.6729 31.8177 41.3209 31.3953 41.1449 30.6914C41.0745 30.445 41.0745 30.1987 41.0745 29.9171C41.0745 28.826 41.9193 28.0869 42.8344 27.8757C43.2567 27.7701 43.6439 27.7349 43.9959 27.7349C44.8758 27.7349 45.5093 27.9813 45.5093 27.9461C45.5797 27.9813 45.6501 27.9813 45.6853 27.9461C45.7205 27.9109 45.7557 27.8757 45.7557 27.8053V26.679C45.8261 26.5382 45.7205 26.3974 45.5797 26.3622ZM53.5694 26.3974C53.499 26.327 53.4286 26.2918 53.3582 26.2918H46.3892C46.2836 26.2918 46.2133 26.3622 46.2133 26.4678V27.5589C46.2133 27.6293 46.2485 27.6997 46.3188 27.7701C46.3892 27.8405 46.4596 27.8757 46.53 27.8757H48.7826V33.472C48.7826 33.5423 48.8178 33.6127 48.8882 33.6831C48.9586 33.7535 49.029 33.7535 49.0994 33.7535H51C51.1056 33.7535 51.176 33.6831 51.176 33.5775V27.8757H53.5342C53.6398 27.8757 53.7102 27.8053 53.7102 27.6997V26.6086C53.675 26.503 53.6398 26.4326 53.5694 26.3974ZM30.6915 29.2835C30.6915 29.2835 28.2981 29.2835 27.4886 29.2835C26.9607 29.2835 26.6439 29.4947 26.4327 29.7059C26.5031 28.474 27.3126 27.5941 28.5797 27.5941H31.1491C31.2547 27.5941 31.3251 27.5237 31.3251 27.4181V26.4326C31.3251 26.3622 31.2899 26.2918 31.2195 26.2214C31.1491 26.151 31.0787 26.1158 31.0083 26.1158H27.383C25.3768 26.1158 24.0041 27.7701 24.0041 29.6707C24.0041 30.9378 24.0041 33.4368 24.0041 33.4368C24.0041 33.5072 24.0393 33.5775 24.1097 33.6479C24.1801 33.7183 24.2505 33.7183 24.3209 33.7183H26.2567C26.3623 33.7183 26.4327 33.6479 26.4327 33.5424C26.4327 31.7825 26.4327 31.1138 26.4327 30.7618H30.8323C30.9379 30.7618 31.0083 30.6914 31.0083 30.5858V29.5299C31.0083 29.4595 30.9731 29.3891 30.9027 29.3187C30.8323 29.3187 30.7619 29.2835 30.6915 29.2835ZM35.4783 27.8757C35.9006 27.7701 36.2878 27.7349 36.6398 27.7349C37.5197 27.7349 38.1532 27.9813 38.1532 27.9461C38.2236 27.9813 38.294 27.9813 38.3292 27.9461C38.3644 27.9109 38.3996 27.8757 38.3996 27.8053V26.679C38.3996 26.5734 38.294 26.4326 38.1532 26.3974C38.1532 26.3974 37.2733 26.1862 36.1118 26.1862C35.6191 26.1862 35.0559 26.2214 34.528 26.327C33.0145 26.6438 31.4306 27.6997 31.3603 29.7763C31.3603 30.1987 31.3955 30.5858 31.4658 30.973C31.8178 32.5568 33.1553 33.3664 34.3872 33.6479C34.8799 33.7535 35.4079 33.7887 35.9006 33.7887C37.2029 33.7887 38.3292 33.5424 38.3292 33.5424C38.3996 33.5072 38.47 33.472 38.47 33.3664V32.3809C38.47 32.3105 38.4348 32.2049 38.3644 32.1697C38.294 32.0993 38.2236 32.0993 38.118 32.0993C38.118 32.0993 37.2029 32.3457 36.2174 32.3457C35.795 32.3457 35.3375 32.3105 35.0207 32.1697C34.3168 31.9233 33.9296 31.4657 33.7184 30.8674H38.0124C38.118 30.8674 38.1884 30.797 38.1884 30.6914V29.6355C38.1884 29.5651 38.1532 29.4947 38.0828 29.4243C38.0124 29.3539 37.942 29.3539 37.8716 29.3539H34.6687C34.1408 29.3539 33.824 29.5651 33.6128 29.7763C33.8944 28.7556 34.6335 28.0869 35.4783 27.8757Z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M75.7433 29.1779C75.3913 27.594 74.1242 26.7845 73.0683 26.5381C72.646 26.4325 72.2588 26.3973 71.8364 26.3973C71.4141 26.3973 71.0269 26.4325 70.6046 26.5381C69.3375 26.8549 67.8944 27.8756 67.8944 30.1282C67.8944 30.5857 67.9296 31.0081 68.0352 31.3601C68.352 32.8031 69.4079 33.5423 70.4286 33.8238C70.9213 33.9646 71.4141 34.035 71.9068 34.035C72.3644 34.035 72.8219 33.9646 73.2795 33.859C74.6522 33.5071 75.8841 32.3104 75.8841 30.269C75.8489 29.8466 75.8137 29.4946 75.7433 29.1779ZM73.4907 30.093C73.4907 31.7824 72.5404 32.5568 71.766 32.5216C71.2029 32.5216 70.5694 32.1344 70.323 31.0785C70.2526 30.8321 70.2174 30.5154 70.2174 30.1634C70.2526 28.6147 71.0621 27.8756 71.9068 27.8756C72.5756 27.8756 73.1387 28.298 73.3851 29.2483C73.4555 29.4946 73.4907 29.7762 73.4907 30.093ZM67.1201 26.6085C67.0497 26.5381 66.9793 26.5381 66.9089 26.5381H65.1491C65.0435 26.5381 64.9379 26.6085 64.9379 26.7141C64.9379 26.7141 64.9379 30.7969 64.9379 31.6768C64.9027 32.1696 64.7267 32.3808 64.1636 32.416C63.6356 32.3808 63.6004 32.3456 63.4948 32.064C63.4948 31.9936 63.4948 31.888 63.4948 31.8176V26.8197C63.4948 26.7493 63.4596 26.6789 63.4244 26.6085C63.354 26.5381 63.2837 26.5381 63.2133 26.5381H61.4886C61.383 26.5381 61.2774 26.6085 61.2774 26.7141V31.8176C61.207 32.24 60.9959 32.3808 60.4679 32.3808C59.9752 32.3456 59.94 32.2752 59.8344 31.9936C59.8344 31.9232 59.8344 31.8528 59.8344 31.7472C59.8344 30.8673 59.8344 26.7845 59.8344 26.7845C59.8344 26.7141 59.7992 26.6437 59.764 26.5733C59.6936 26.5029 59.6232 26.5029 59.5528 26.5029H57.793C57.6874 26.5029 57.5818 26.5733 57.5818 26.6789C57.5818 26.6789 57.5818 29.5298 57.5818 30.9025C57.5818 31.2193 57.5818 31.5361 57.6522 31.8176C57.793 32.3456 58.0393 32.8735 58.5673 33.2607C59.06 33.6479 59.7288 33.8238 60.6087 33.8238C61.383 33.8238 61.9462 33.7534 62.4037 33.6127C62.8613 33.7534 63.4244 33.8238 64.1988 33.8238H64.234C66.4514 33.8238 67.1553 32.4512 67.1553 31.0081C67.1553 29.6354 67.1553 26.7845 67.1553 26.7845C67.2257 26.7493 67.1905 26.6789 67.1201 26.6085ZM89.4348 32.2752C89.0124 32.3456 88.6253 32.416 88.3085 32.416C87.3582 32.3808 86.9358 32.1344 86.7598 31.4657C86.7246 31.3249 86.7246 31.1489 86.7246 30.9377C86.7246 30.0578 86.7246 26.7141 86.7246 26.7141C86.7246 26.6437 86.6894 26.5733 86.6542 26.5029C86.5839 26.4325 86.5135 26.3973 86.4431 26.3973H84.5424C84.4369 26.3973 84.3313 26.4677 84.3313 26.5733C84.3313 26.5733 84.3313 29.565 84.3313 30.9377C84.3313 31.2193 84.3313 31.5009 84.4017 31.7824C84.5424 32.3456 84.824 32.8735 85.352 33.2607C85.8799 33.6479 86.6191 33.859 87.5694 33.859C88.4845 33.859 89.0828 33.7534 89.5756 33.6127C89.646 33.5775 89.7164 33.5423 89.7164 33.4367V32.4864C89.7164 32.416 89.6812 32.3456 89.6108 32.2752C89.5756 32.3104 89.5052 32.2752 89.4348 32.2752ZM81.0932 26.5381C80.4948 26.4677 79.7557 26.4325 79.0518 26.4325C77.8199 26.4325 76.6936 26.5029 76.6936 26.5029C76.588 26.5029 76.5176 26.5733 76.5176 26.6789V33.6479C76.5176 33.7183 76.5176 33.7886 76.588 33.859C76.6584 33.9294 76.7288 33.9294 76.7992 33.9294H78.4534C78.559 33.9294 78.6646 33.859 78.6646 33.7534C78.6646 33.7534 78.6646 28.9667 78.6646 27.9108C78.9814 27.8756 79.2629 27.8756 79.5445 27.8756C80.1429 27.8756 80.5652 27.946 80.8468 28.0868C81.0932 28.2276 81.234 28.3684 81.3044 28.6851C81.3395 28.8259 81.3396 28.9667 81.3396 29.1427C81.3044 30.3042 80.882 30.5505 79.3685 30.5857C79.2629 30.5857 79.1926 30.6561 79.1926 30.7617C79.1926 31.3249 79.1926 31.5361 79.1926 31.5361C79.1926 31.6064 79.2277 31.6768 79.2629 31.712C79.3333 31.7824 79.4037 31.7824 79.4741 31.8176C79.4741 31.8176 79.6149 31.8176 79.8261 31.8176C79.8613 31.8176 79.8965 31.8176 79.9669 31.8176C80.7412 31.888 81.058 32.4512 81.234 33.1551C81.2692 33.3311 81.3044 33.5423 81.3044 33.7183C81.3044 33.7886 81.3395 33.859 81.4099 33.8942C81.4803 33.9294 81.5507 33.9646 81.5859 33.9646H83.5217C83.6273 33.9646 83.7329 33.859 83.6977 33.7534C83.6977 33.6831 83.6625 33.5775 83.6625 33.5071C83.4865 32.8031 83.0642 31.9232 82.4306 31.3601C83.205 30.9377 83.5921 30.1634 83.6273 29.2483C83.6273 28.9667 83.5921 28.6851 83.5569 28.4035C83.2754 27.4532 82.4306 26.6789 81.0932 26.5381ZM94.6087 26.5733C93.94 26.4677 92.9193 26.4325 92.0745 26.4325C91.1946 26.4325 90.4555 26.4677 90.4555 26.4677C90.3499 26.4677 90.2795 26.5381 90.2795 26.6437V26.8901V27.8404V33.5775C90.2795 33.6479 90.2795 33.7183 90.3499 33.7886C90.4203 33.859 90.4907 33.859 90.5611 33.859H92.3209C92.4265 33.859 92.4969 33.7886 92.4969 33.6831C92.4969 33.7183 92.5321 33.7534 92.5673 33.7886C92.6377 33.859 92.7081 33.8942 92.7785 33.8942C92.7785 33.8942 92.8841 33.8942 93.06 33.8942C93.588 33.8942 94.6439 33.859 95.3478 33.6831C96.8261 33.2959 97.882 32.24 97.8468 30.0578C97.8468 29.7058 97.8116 29.3891 97.7412 29.1075C97.2836 27.418 95.8406 26.7493 94.6087 26.5733ZM95.383 29.917C95.383 31.4305 94.7847 32.3808 92.6025 32.4864C92.5321 32.4864 92.4969 32.5216 92.4617 32.592V27.946C92.6377 27.946 92.8137 27.946 92.9545 27.946C94.4679 27.9812 95.1014 28.4036 95.3126 29.3187C95.3478 29.4946 95.383 29.6706 95.383 29.917Z`,
			}),
		],
	});
}
function wa() {
	return (0, I.jsxs)(`svg`, {
		xmlns: `http://www.w3.org/2000/svg`,
		width: `100`,
		height: `28`,
		viewBox: `0 0 100 28`,
		fill: `#C30A14`,
		children: [
			(0, I.jsx)(`path`, { d: `M30.4,15.3h3.5l-1.8-6.8L30.4,15.3z` }),
			(0, I.jsx)(`path`, {
				d: `M0.7,0.2c0,0,0,18.2,0,27.2c32.2,0,92.8,0,92.8,0V0.2H0.7z M15.8,21.8h-2.9L8.1,5.8h3.2l3.1,12.1l3-12.1h3.3
	L15.8,21.8z M35.6,21.8l-1.1-4.1h-4.8c0,0-0.8,3.2-1,3.9c-1,0.1-3.3,0-3.3,0L30,5.8h4.3l4.5,16.1H35.6z M56.1,21.8h-9.9V5.8h3.2
	v13.3H56L56.1,21.8L56.1,21.8z M67.7,21.8h-2.9L59.9,5.8h3.3l3.1,11.9l3-11.9h3.3L67.7,21.8z M85.9,7.8h-4.3c0,0,0,1.5,0,2.3
	c1.3,0,2.6,0,4,0c0,0.7,0,1.4,0,2.1c-1.3,0-2.6,0-4,0c0,0.8,0,1.6,0,2.4c1.4,0,4.3,0,4.3,0v2.1h-6.7V5.8h6.7V7.8z`,
			}),
			(0, I.jsxs)(`g`, {
				children: [
					(0, I.jsx)(`path`, {
						d: `M94.5,0.4h-0.6V0.2h1.4v0.2h-0.6v1.5h-0.2V0.4z`,
					}),
					(0, I.jsx)(`path`, {
						d: `M97.3,0.2v1.7h-0.2V0.6l-0.6,1.3h-0.2l-0.6-1.3v1.3h-0.2V0.2h0.2l0.7,1.4l0.6-1.4H97.3z`,
					}),
				],
			}),
		],
	});
}
function X(e) {
	let { href: t, ...n } = e,
		r = ke();
	return (
		t?.startsWith(O.STORE_BASE_URL) && (t = Ae(r, t)),
		(0, I.jsx)(Ct, {
			href: t,
			color: `dull-11`,
			target: `_blank`,
			whiteSpace: `nowrap`,
			...n,
		})
	);
}
function Ta(e) {
	let t = ft();
	return t === `initial` || t === `sm`
		? null
		: (0, I.jsx)(`footer`, {
				className: (0, H.default)(ya, e.className),
				children: (0, I.jsxs)(mt, {
					className: ba,
					children: [
						(0, I.jsxs)(N, {
							align: `center`,
							justify: `between`,
							children: [
								(0, I.jsx)(X, {
									href: O.STORE_BASE_URL,
									children: (0, I.jsx)(Sa, {}),
								}),
								(0, I.jsxs)(mt, {
									className: xa,
									children: [
										(0, I.jsx)(X, {
											href: `https://about.steamchina.com/upgrade_announcement.html`,
											children: `公告`,
										}),
										`\xA0 | \xA0`,
										(0, I.jsx)(X, {
											href: O.STORE_BASE_URL + `about`,
											children: `关于蒸汽平台`,
										}),
										`\xA0 | \xA0`,
										(0, I.jsx)(X, {
											href: O.STORE_BASE_URL + `steam_refunds`,
											children: `退款政策`,
										}),
										`\xA0 | \xA0`,
										(0, I.jsx)(X, {
											href: O.STORE_BASE_URL + `subscriber_agreement`,
											children: `软件许可服务协议`,
										}),
										`\xA0 | \xA0`,
										(0, I.jsx)(X, {
											href: O.STORE_BASE_URL + `privacy_agreement`,
											children: `个人信息保护政策`,
										}),
										`\xA0 | \xA0`,
										(0, I.jsx)(X, {
											href: O.STORE_BASE_URL + `data_outbound`,
											children: `个人信息出境告知书`,
										}),
										`\xA0 | \xA0`,
										(0, I.jsx)(X, {
											href: `https://about.steamchina.com/content_report.html`,
											children: `不良内容举报投诉`,
										}),
										`\xA0 | \xA0`,
										(0, I.jsx)(`br`, {}),
										(0, I.jsx)(X, {
											href: `https://about.steamchina.com/infringement_report.html`,
											children: `侵权投诉`,
										}),
										`\xA0 | \xA0`,
										(0, I.jsx)(X, {
											href: `https://about.steamchina.com/parentguardianship_agreement.html`,
											children: `家长监护`,
										}),
									],
								}),
							],
						}),
						(0, I.jsx)(`hr`, {}),
						(0, I.jsxs)(N, {
							align: `center`,
							justify: `between`,
							children: [
								(0, I.jsxs)(N, {
									gap: `2`,
									children: [
										(0, I.jsx)(X, {
											href: `https://www.wanmei.com/`,
											children: (0, I.jsx)(Ca, {}),
										}),
										(0, I.jsx)(X, {
											href: `https://www.valvesoftware.com`,
											children: (0, I.jsx)(wa, {}),
										}),
									],
								}),
								(0, I.jsxs)(N, {
									gap: `5`,
									children: [
										(0, I.jsx)(Nt, {
											hoverContent: (0, I.jsx)(`img`, {
												alt: ``,
												src:
													O.STORE_CDN_URL +
													`public/shared/images/footer/Weibo-QR.png?v=2`,
											}),
											children: (0, I.jsxs)(N, {
												align: `center`,
												children: [
													(0, I.jsx)(`img`, {
														alt: `微博`,
														src:
															O.STORE_CDN_URL +
															`public/shared/images/footer/weibo_logo.svg?v=1`,
													}),
													(0, I.jsx)(yt, { children: `微博` }),
												],
											}),
										}),
										(0, I.jsx)(Nt, {
											hoverContent: (0, I.jsx)(`img`, {
												alt: ``,
												src:
													O.STORE_CDN_URL +
													`public/shared/images/footer/WeChat-QR.png?v=2`,
											}),
											children: (0, I.jsxs)(N, {
												align: `center`,
												children: [
													(0, I.jsx)(`img`, {
														alt: `微信`,
														src:
															O.STORE_CDN_URL +
															`public/shared/images/footer/wechat_logo.svg?v=1`,
													}),
													(0, I.jsx)(yt, { children: `微信` }),
												],
											}),
										}),
									],
								}),
							],
						}),
						(0, I.jsxs)(N, {
							align: `center`,
							justify: `between`,
							marginTop: `5`,
							children: [
								(0, I.jsxs)(mt, {
									children: [
										`© `,
										new Date().getFullYear(),
										` Valve Corporation 版权所有，完美世界已获授权。`,
										(0, I.jsx)(`br`, {}),
										`所有商标均属于其在美国或其他国家的拥有者。`,
									],
								}),
								(0, I.jsxs)(mt, {
									children: [
										`© 完美世界征奇(上海)多媒体科技有限公司 版权所有。`,
										(0, I.jsx)(`br`, {}),
										(0, I.jsx)(X, {
											href: `https://beian.miit.gov.cn`,
											children: `沪ICP备 17051673号-4`,
										}),
										(0, I.jsx)(`br`, {}),
										`增值电信业务经营许可证沪B2-20180406`,
										(0, I.jsx)(`br`, {}),
										`沪网文：(2023) 3444-243号`,
										(0, I.jsx)(`br`, {}),
										`联网备案号：沪公网安31011002005473号`,
										(0, I.jsx)(`br`, {}),
										`举报电话: 021-51796887 举报邮箱: feedback@pwrd.com`,
									],
								}),
							],
						}),
					],
				}),
			});
}
var Z = {};
((Z.arabic = () => a(() => import(`./TrJW4YjE2.js`), [], import.meta.url)),
	(Z.brazilian = () => a(() => import(`./CmSCuj9F.js`), [], import.meta.url)),
	(Z.bulgarian = () => a(() => import(`./Bcqj-yX9.js`), [], import.meta.url)),
	(Z.czech = () => a(() => import(`./C8LMZtdG.js`), [], import.meta.url)),
	(Z.danish = () => a(() => import(`./D8sh6M_E.js`), [], import.meta.url)),
	(Z.dutch = () => a(() => import(`./CVdGXsGJ.js`), [], import.meta.url)),
	(Z.english = () => a(() => import(`./ALw9WebG.js`), [], import.meta.url)),
	(Z.finnish = () => a(() => import(`./Z0vaB1X6.js`), [], import.meta.url)),
	(Z.french = () => a(() => import(`./BmAfZGOx.js`), [], import.meta.url)),
	(Z.german = () => a(() => import(`./2EtwW25Q.js`), [], import.meta.url)),
	(Z.greek = () => a(() => import(`./D99hloAm.js`), [], import.meta.url)),
	(Z.hungarian = () => a(() => import(`./TEYaEDzP.js`), [], import.meta.url)),
	(Z.indonesian = () => a(() => import(`./BXrqjxNe.js`), [], import.meta.url)),
	(Z.italian = () => a(() => import(`./CQn-CF8y.js`), [], import.meta.url)),
	(Z.japanese = () => a(() => import(`./U1pv2K3U.js`), [], import.meta.url)),
	(Z.koreana = () => a(() => import(`./9BljKl4-.js`), [], import.meta.url)),
	(Z.latam = () => a(() => import(`./CChq3nwH.js`), [], import.meta.url)),
	(Z.malay = () => a(() => import(`./Blu1d9Z5.js`), [], import.meta.url)),
	(Z.norwegian = () => a(() => import(`./DmqdN3yo.js`), [], import.meta.url)),
	(Z.polish = () => a(() => import(`./KEIVB8aZ.js`), [], import.meta.url)),
	(Z.portuguese = () => a(() => import(`./Bva7Sidn.js`), [], import.meta.url)),
	(Z.romanian = () => a(() => import(`./C-VLbDw-.js`), [], import.meta.url)),
	(Z.russian = () => a(() => import(`./VbPteYh7.js`), [], import.meta.url)),
	(Z.schinese = () => a(() => import(`./d4ZYcKYB.js`), [], import.meta.url)),
	(Z.spanish = () => a(() => import(`./BVd_xq4v.js`), [], import.meta.url)),
	(Z.swedish = () => a(() => import(`./BCw3azU4.js`), [], import.meta.url)),
	(Z.tchinese = () => a(() => import(`./Cz5kqhv-.js`), [], import.meta.url)),
	(Z.thai = () => a(() => import(`./BGfcOwcC.js`), [], import.meta.url)),
	(Z.turkish = () => a(() => import(`./j1LZrmVQ.js`), [], import.meta.url)),
	(Z.ukrainian = () => a(() => import(`./obTdC1je.js`), [], import.meta.url)),
	(Z.vietnamese = () => a(() => import(`./BPDy8dkX.js`), [], import.meta.url)));
async function Ea(e) {
	if (Z[e]) return await Z[e]();
}
var Q = We(Ea);
function Da() {
	return (0, I.jsxs)(`svg`, {
		xmlns: `http://www.w3.org/2000/svg`,
		width: `142`,
		height: `34`,
		viewBox: `0 0 142 34`,
		fill: `currentColor`,
		children: [
			(0, I.jsx)(`path`, {
				d: `M16.832 0C7.95936 0 0.690707 6.8414 0 15.5358L9.05289 19.2787C9.81996 18.7541 10.7466 18.4467 11.7436 18.4467C11.8329 18.4467 11.9219 18.4498 12.0101 18.4548L16.0359 12.6194C16.0359 12.5916 16.0356 12.5645 16.0356 12.537C16.0356 9.02463 18.8927 6.16711 22.4054 6.16711C25.9178 6.16711 28.7749 9.02463 28.7749 12.537C28.7749 16.0493 25.9178 18.9072 22.4054 18.9072C22.3569 18.9072 22.3088 18.9061 22.2607 18.9049L16.5189 23.0018C16.522 23.0763 16.5247 23.1523 16.5247 23.2278C16.5247 25.8647 14.38 28.009 11.7436 28.009C9.42936 28.009 7.49431 26.3572 7.05598 24.1698L0.581889 21.4933C2.58643 28.5828 9.09985 33.7805 16.832 33.7805C26.1606 33.7805 33.7225 26.2182 33.7225 16.8908C33.7225 7.56189 26.1602 0 16.832 0Z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M10.5846 25.6287L8.50977 24.7715C8.87746 25.537 9.51356 26.1781 10.3581 26.5301C12.184 27.2907 14.2889 26.4244 15.0499 24.597C15.4184 23.7135 15.4207 22.7379 15.0553 21.8521C14.6906 20.9659 14.0026 20.2748 13.1179 19.906C12.2401 19.5406 11.2997 19.5539 10.4735 19.8659L12.6166 20.7521C13.9633 21.3134 14.6001 22.8597 14.0389 24.2064C13.4787 25.5534 11.9312 26.1903 10.5846 25.6287Z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M26.6497 12.5368C26.6497 10.1966 24.746 8.29248 22.4054 8.29248C20.0653 8.29248 18.1611 10.1966 18.1611 12.5368C18.1611 14.8773 20.0653 16.7807 22.4054 16.7807C24.746 16.7803 26.6497 14.8769 26.6497 12.5368ZM19.2241 12.5295C19.2241 10.7686 20.6517 9.34133 22.4127 9.34133C24.1736 9.34133 25.6012 10.7686 25.6012 12.5295C25.6012 14.2904 24.1736 15.7177 22.4127 15.7177C20.6517 15.7177 19.2241 14.2901 19.2241 12.5295Z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M59.9854 10.1185L58.4527 12.8127C57.2721 11.9879 55.6722 11.4915 54.2754 11.4915C52.6791 11.4915 51.6914 12.1523 51.6914 13.336C51.6914 14.7741 53.446 15.1087 56.0538 16.0447C58.8571 17.036 60.4684 18.201 60.4684 20.7685C60.4684 24.2813 57.706 26.2541 53.7356 26.2541C51.8005 26.2541 49.4663 25.7545 47.6719 24.6629L48.7899 21.6761C50.2476 22.446 51.9913 22.9027 53.5458 22.9027C55.6411 22.9027 56.6371 22.1296 56.6371 20.9867C56.6371 19.679 55.1183 19.286 52.6667 18.4741C49.8727 17.5412 47.9366 16.3172 47.9366 13.4756C47.9366 10.2711 50.5031 8.43066 54.1958 8.43066C56.7695 8.43066 58.838 9.24616 59.9854 10.1185Z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M71.9674 11.5261V25.6635H68.3585V11.5261H63.1201V8.43066H77.1903V11.5261H71.9674Z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M84.7983 11.5168V15.3998H91.7049V18.4953H84.7983V22.5396H92.8116V25.6635H81.1904V8.43066H92.8116V11.5168H84.7983Z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M100.866 22.3173L99.7256 25.6635H95.9424L102.404 8.43066H106.036L112.68 25.663H108.769L107.604 22.3168L100.866 22.3173ZM104.2 12.5412L101.846 19.4411H106.602L104.2 12.5412Z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M131.201 15.0916L126.485 25.1614H124.449L119.809 15.1816V25.6635H116.354V8.43066H119.802L125.593 20.8704L131.179 8.43066H134.657V25.6635H131.202L131.201 15.0916Z`,
			}),
			(0, I.jsx)(`path`, {
				d: `M141.634 9.63026C141.634 11.1113 140.525 12.0343 139.251 12.0343C137.973 12.0343 136.86 11.1113 136.86 9.63026C136.86 8.14976 137.973 7.23291 139.251 7.23291C140.525 7.23291 141.634 8.14976 141.634 9.63026ZM137.261 9.63026C137.261 10.8693 138.154 11.6475 139.251 11.6475C140.344 11.6475 141.233 10.8693 141.233 9.63026C141.233 8.38763 140.344 7.62126 139.251 7.62126C138.157 7.62126 137.261 8.39694 137.261 9.63026ZM139.284 8.40521C139.902 8.40521 140.11 8.73203 140.11 9.08522C140.11 9.40893 139.918 9.62612 139.684 9.73678L140.238 10.7746H139.785L139.318 9.85469H138.836V10.7746H138.459V8.40521H139.284ZM138.84 9.5077H139.261C139.533 9.5077 139.694 9.33654 139.694 9.12142C139.694 8.90423 139.579 8.76461 139.26 8.76461H138.839V9.5077H138.84Z`,
			}),
		],
	});
}
function Oa() {
	let e = (0, F.useId)();
	return (0, I.jsxs)(`svg`, {
		xmlns: `http://www.w3.org/2000/svg`,
		width: `95`,
		height: `27`,
		viewBox: `0 0 95 27`,
		fill: `currentColor`,
		children: [
			(0, I.jsxs)(`g`, {
				clipPath: `url(#${e})`,
				children: [
					(0, I.jsx)(`path`, {
						d: `M29.1289 15.142H32.6305L30.8018 8.41162L29.1289 15.142Z`,
					}),
					(0, I.jsx)(`path`, {
						d: `M0 27H91.2646V0H0V27ZM14.822 21.4914H11.9334L7.21098 5.58171H10.3333L13.3777 17.591L16.3442 5.58171H19.6172L14.822 21.4914ZM34.3041 21.4914L33.2391 17.5127H28.5218C28.5218 17.5127 27.701 20.7134 27.5347 21.4131C26.584 21.4862 24.2617 21.4131 24.2617 21.4131L28.7504 5.58171H33.0105L37.4992 21.4914H34.3041ZM54.3889 21.4914H44.6478V5.58171H47.7702V18.8128H54.3889V21.4914ZM65.8028 21.4914H62.987L58.1918 5.58171H61.392L64.4365 17.4396L67.4029 5.58171H70.598L65.8028 21.4914ZM83.7627 7.64939H79.5026V9.9416H83.3835V12.0041H79.5026V14.3746H83.7627V16.4423H77.144V5.58171H83.7627V7.64939Z`,
					}),
					(0, I.jsx)(`path`, {
						d: `M93.4622 0C94.3194 0 95 0.699671 95 1.57687C95 2.45407 94.3194 3.15896 93.4518 3.15896C92.5842 3.15896 91.8984 2.46451 91.8984 1.57687C91.8984 0.689228 92.5946 0 93.4518 0H93.457H93.4622ZM93.457 0.245407C92.766 0.245407 92.1998 0.84065 92.1998 1.57687C92.1998 2.31309 92.766 2.91356 93.4622 2.91356C94.1584 2.91878 94.7143 2.32876 94.7143 1.58209C94.7143 0.835428 94.1584 0.245407 93.4622 0.245407H93.457ZM93.1609 2.49062H92.8803V0.736221C93.0258 0.715336 93.1661 0.69445 93.3739 0.69445C93.6388 0.69445 93.8155 0.751886 93.9194 0.824986C94.0233 0.903307 94.0804 1.0234 94.0804 1.19049C94.0804 1.42023 93.9246 1.56121 93.7375 1.61864V1.63431C93.8882 1.66564 93.9973 1.80139 94.0285 2.06246C94.07 2.33398 94.1116 2.43841 94.1428 2.49584H93.8466C93.8051 2.43841 93.7635 2.27654 93.7272 2.0468C93.6856 1.82228 93.5713 1.73874 93.3479 1.73874H93.1557V2.49584L93.1609 2.49062ZM93.1609 1.51944H93.3635C93.5921 1.51944 93.7895 1.43589 93.7895 1.21659C93.7895 1.05995 93.6752 0.908528 93.3635 0.908528C93.2752 0.908528 93.2076 0.91375 93.1609 0.924193V1.51944Z`,
					}),
				],
			}),
			(0, I.jsx)(`defs`, {
				children: (0, I.jsx)(`clipPath`, {
					id: e,
					children: (0, I.jsx)(`rect`, {
						width: `95`,
						height: `27`,
						fill: `white`,
					}),
				}),
			}),
		],
	});
}
function ka() {
	return (0, I.jsx)(`svg`, {
		width: `24`,
		height: `22`,
		viewBox: `0 0 24 22`,
		fill: `currentColor`,
		xmlns: `http://www.w3.org/2000/svg`,
		children: (0, I.jsx)(`path`, {
			d: `M5.20232 2.04977C7.95386 4.13518 10.9135 8.36354 12.0001 10.6327C13.0868 8.3637 16.0462 4.13514 18.7978 2.04977C20.7832 0.545013 24 -0.619279 24 3.08556C24 3.82547 23.5798 9.30116 23.3333 10.1901C22.4767 13.2807 19.355 14.069 16.5782 13.5919C21.432 14.4259 22.6667 17.1884 20.0001 19.9508C14.9357 25.1972 12.7211 18.6345 12.1534 16.9528C12.0494 16.6446 12.0007 16.5003 12 16.623C11.9993 16.5003 11.9506 16.6446 11.8466 16.9528C11.2791 18.6345 9.06454 25.1974 3.99987 19.9508C1.33323 17.1884 2.56794 14.4257 7.42179 13.5919C4.64492 14.069 1.5232 13.2807 0.666658 10.1901C0.420196 9.30108 0 3.82538 0 3.08556C0 -0.619279 3.21689 0.545013 5.20218 2.04977H5.20232Z`,
		}),
	});
}
function Aa() {
	return (0, I.jsx)(`svg`, {
		width: `22`,
		height: `22`,
		viewBox: `0 0 22 22`,
		fill: `currentColor`,
		xmlns: `http://www.w3.org/2000/svg`,
		children: (0, I.jsx)(`path`, {
			d: `M10.9998 0C4.92482 0 0 4.94301 0 11.0404C0 16.2179 3.55161 20.5625 8.34267 21.7558V14.4144H6.07452V11.0404H8.34267V9.58661C8.34267 5.82889 10.0371 4.08716 13.7128 4.08716C14.4097 4.08716 15.6122 4.2245 16.1041 4.3614V7.4196C15.8445 7.39221 15.3935 7.37853 14.8334 7.37853C13.0299 7.37853 12.333 8.06435 12.333 9.84716V11.0404H15.9259L15.3086 14.4144H12.333V22C17.7796 21.3398 22 16.6851 22 11.0404C21.9996 4.94301 17.0747 0 10.9998 0Z`,
		}),
	});
}
function ja() {
	return (0, I.jsx)(`svg`, {
		width: `30`,
		height: `22`,
		viewBox: `0 0 30 22`,
		fill: `currentColor`,
		xmlns: `http://www.w3.org/2000/svg`,
		children: (0, I.jsx)(`path`, {
			d: `M11.9318 6.84835V15.7121L19.7727 11.2801L11.9318 6.84835ZM29.3731 18.5011C29.028 19.7918 28.0114 20.8083 26.7208 21.1533C24.3813 21.7803 14.9999 21.7803 14.9999 21.7803C14.9999 21.7803 5.61873 21.7803 3.27924 21.1533C1.98856 20.8083 0.971973 19.7918 0.626931 18.5011C0 16.1616 0 11.2802 0 11.2802C0 11.2802 0 6.3991 0.626931 4.05945C0.971973 2.76859 1.98843 1.7522 3.27924 1.40697C5.61873 0.780272 14.9999 0.780273 14.9999 0.780273C14.9999 0.780273 24.3813 0.780272 26.7208 1.40697C28.0114 1.7522 29.028 2.76859 29.3731 4.05945C30 6.3991 30 11.2803 30 11.2803C30 11.2803 30 16.1616 29.3731 18.5011Z`,
		}),
	});
}
function Ma() {
	return (0, I.jsx)(`svg`, {
		width: `20`,
		height: `22`,
		viewBox: `0 0 20 22`,
		fill: `currentColor`,
		xmlns: `http://www.w3.org/2000/svg`,
		children: (0, I.jsx)(`path`, {
			d: `M11.9027 9.45261L19.3482 0.560547H17.5838L11.119 8.2814L5.95547 0.560547H0L7.8082 12.2358L0 21.5605H1.76443L8.59152 13.4071L14.0445 21.5605H20L11.9023 9.45261H11.9027ZM9.48608 12.3387L8.69495 11.1761L2.40018 1.92521H5.11025L10.1902 9.39099L10.9813 10.5536L17.5847 20.2579H14.8746L9.48608 12.3392V12.3387Z`,
		}),
	});
}
function Na(e) {
	return (0, I.jsx)(N, { direction: `column`, gap: `4`, ...e });
}
function Pa(e) {
	return (0, I.jsx)(St, {
		level: `3`,
		color: `dull-12`,
		weight: `heavy`,
		className: va,
		...e,
	});
}
function $(e) {
	let { href: t, ...n } = e,
		r = ke();
	return (
		t?.startsWith(O.STORE_BASE_URL) && (t = Ae(r, t)),
		(0, I.jsx)(Ct, {
			href: t,
			color: `dull-11`,
			target: `_blank`,
			whiteSpace: `nowrap`,
			...n,
		})
	);
}
function Fa() {
	let e = ft();
	return (0, I.jsxs)(N, {
		gridArea: `main`,
		direction: `column`,
		gap: `5`,
		align: `start`,
		children: [
			(0, I.jsxs)(N, {
				gap: `6`,
				align: `center`,
				children: [
					(0, I.jsx)($, {
						href: O.STORE_BASE_URL,
						children: (0, I.jsx)(Da, {}),
					}),
					(0, I.jsx)($, {
						href: `https://valvesoftware.com`,
						children: (0, I.jsx)(Oa, {}),
					}),
				],
			}),
			(0, I.jsx)(yt, {
				as: `p`,
				size: `1`,
				className: ga,
				children: Je(
					Q.Localize(`#footer_legal_notice`, new Date().getFullYear()),
				),
			}),
			(0, I.jsxs)(N, {
				gap: `6`,
				align: `center`,
				className: _a,
				children: [
					(0, I.jsx)($, {
						href: `https://www.youtube.com/@Steam`,
						children: (0, I.jsx)(ja, {}),
					}),
					(0, I.jsx)($, {
						href: `https://bsky.app/profile/steampowered.com`,
						children: (0, I.jsx)(ka, {}),
					}),
					(0, I.jsx)($, {
						href: `https://facebook.com/steam`,
						children: (0, I.jsx)(Aa, {}),
					}),
					(0, I.jsx)($, {
						href: `https://twitter.com/steam`,
						children: (0, I.jsx)(Ma, {}),
					}),
				],
			}),
			(0, I.jsxs)(N, {
				gap: `5`,
				children: [
					e === `initial` &&
						!O.IN_MOBILE_WEBVIEW &&
						(0, I.jsx)(_t, {
							href: O.STORE_BASE_URL + `mobile/`,
							children: Q.Localize(`#footer_link_get_mobile_apps`),
						}),
					mn() &&
						(0, I.jsx)(vt, {
							color: `dull`,
							onClick: gn,
							children: Q.Localize(`#footer_view_mobile_website`),
						}),
				],
			}),
		],
	});
}
function Ia(e) {
	return (
		(0, F.use)(Q.Ready()),
		(0, I.jsx)(xt, {
			breakpoints: { sm: 700 },
			children: (0, I.jsxs)(Tt, {
				as: `footer`,
				areas: {
					initial: `"steam valve" "legal more" "main main"`,
					sm: `"steam valve legal more" "main main empty empty"`,
					md: `"main steam valve legal more"`,
				},
				columns: {
					initial: `min-content min-content`,
					sm: `min-content min-content max-content max-content`,
					md: `fit-content(400px) max-content max-content max-content max-content`,
				},
				className: (0, H.default)(ha, e.className),
				justifyContent: { initial: `start`, sm: `start`, md: `center` },
				gap: { initial: `6`, sm: `9` },
				padding: `7`,
				zIndex: `1`,
				textAlign: `start`,
				id: `footer`,
				children: [
					(0, I.jsx)(Fa, {}),
					(0, I.jsxs)(Na, {
						gridArea: `steam`,
						children: [
							(0, I.jsx)(Pa, {
								children: Q.Localize(`#footer_link_header_steam`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `about/`,
								children: Q.Localize(`#footer_link_about_steam`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `subscriber_agreement/`,
								children: Q.Localize(`#footer_link_steam_ssa`),
							}),
							(0, I.jsx)($, {
								href: O.PARTNER_BASE_URL,
								children: Q.Localize(`#footer_link_steamworks`),
							}),
							(0, I.jsx)($, {
								href: O.PARTNER_BASE_URL + `steamdirect`,
								children: Q.Localize(`#footer_link_steam_distribution`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `digitalgiftcards/`,
								children: Q.Localize(`#footer_link_gift_cards`),
							}),
						],
					}),
					(0, I.jsxs)(Na, {
						gridArea: `valve`,
						children: [
							(0, I.jsx)(Pa, {
								children: Q.Localize(`#footer_link_header_valve`),
							}),
							(0, I.jsx)($, {
								href: `https://valvesoftware.com/about`,
								children: Q.Localize(`#footer_link_about_valve`),
							}),
							(0, I.jsx)($, {
								href: `https://valvesoftware.com/`,
								children: Q.Localize(`#footer_link_jobs`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `hardware/`,
								children: Q.Localize(`#footer_link_hardware`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `hardware_recycling/`,
								children: Q.Localize(`#footer_link_recycling`),
							}),
						],
					}),
					(0, I.jsxs)(Na, {
						gridArea: `legal`,
						children: [
							(0, I.jsx)(Pa, {
								children: Q.Localize(`#footer_link_header_legal`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `privacy_agreement/`,
								children: Q.Localize(`#footer_link_privacy`),
							}),
							(0, I.jsx)($, {
								href: `https://help.steampowered.com/faqs/view/10BB-D27A-6378-4436`,
								children: Q.Localize(`#footer_link_accessibility`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `legal/`,
								children: Q.Localize(`#footer_link_notices_and_policies`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `account/cookiepreferences/`,
								children: Q.Localize(`#footer_link_cookies`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `steam_refunds/`,
								children: Q.Localize(`#footer_link_refunds`),
							}),
						],
					}),
					(0, I.jsxs)(Na, {
						gridArea: `more`,
						children: [
							(0, I.jsx)(Pa, {
								children: Q.Localize(`#footer_link_header_more`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `about/`,
								children: Q.Localize(`#footer_link_get_steam`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `mobile/`,
								children: Q.Localize(`#footer_link_get_mobile_apps`),
							}),
							(0, I.jsx)($, {
								href: O.HELP_BASE_URL,
								children: Q.Localize(`#footer_link_get_support`),
							}),
							(0, I.jsx)($, {
								href: O.STORE_BASE_URL + `account/`,
								children: Q.Localize(`#footer_link_my_account`),
							}),
						],
					}),
				],
			}),
		})
	);
}
function La(e) {
	return j()
		? null
		: (0, I.jsx)(Oe, {
				controller: `footer`,
				method: `footer`,
				children: A(O.EREALM)
					? (0, I.jsx)(Ta, { ...e })
					: (0, I.jsx)(Ia, { ...e }),
			});
}
var Ra = class {
		async GetObject(e) {
			try {
				let t = await this.GetString(e);
				return t ? JSON.parse(t) : null;
			} catch {
				return null;
			}
		}
		async StoreObject(e, t) {
			return this.StoreString(e, JSON.stringify(t));
		}
	},
	za = class extends Ra {
		GetString(e) {
			return Promise.resolve(localStorage.getItem(e));
		}
		StoreString(e, t) {
			return (localStorage.setItem(e, t), Promise.resolve());
		}
		RemoveObject(e) {
			return (localStorage.removeItem(e), Promise.resolve());
		}
	};
function Ba(e) {
	let { steamid: t, children: n } = e,
		r = F.useRef(`steamInterface` in e ? e.steamInterface : void 0),
		i = F.useRef(void 0),
		a = `strWebAPIToken` in e ? e.strWebAPIToken : void 0;
	return (0, I.jsx)(Ke, {
		useActiveSteamInterface: F.useCallback(
			() => ((r.current ||= new et(O.WEBAPI_BASE_URL, a, !1, Va)), r.current),
			[a],
		),
		useStorage: F.useCallback(() => ((i.current ||= new za()), i.current), []),
		children: (0, I.jsx)(Et, {
			steamid: t,
			children: (0, I.jsx)(gt, { children: n }),
		}),
	});
}
async function Va(e) {
	try {
		let t = await (
			await fetch(`${O.LOGIN_BASE_URL}jwt/ajaxrefresh`, {
				method: `POST`,
				body: new URLSearchParams({ redir: window.location.href }),
				credentials: `include`,
				mode: `cors`,
			})
		).json();
		if (!t || !t.success)
			return (console.error(`ajaxrefresh failed: "${t.error}"`), ``);
		if (t.success) {
			let n = await (
				await fetch(t.login_url, {
					method: `POST`,
					body: new URLSearchParams({ ...t, prior: e }),
				})
			).json();
			return !n || n.result !== 1
				? (console.error(`Token refresh: failed to set token: ${n.result}`), ``)
				: n.token;
		}
	} catch (e) {
		console.error(`Failed to refresh token: ${e}`);
	}
	return ``;
}
var Ha = e({
		Arrow: () => po,
		BackgroundAnimation: () => mo,
		BasicContextMenuContainer: () => qa,
		BasicContextMenuHeader: () => Ga,
		BasicContextMenuHeaderShrinkableSpacing: () => Ka,
		BasicContextMenuModal: () => Wa,
		Capitalized: () => oo,
		ContextMenuSeparator: () => uo,
		Destructive: () => eo,
		Emphasis: () => no,
		Focused: () => ao,
		"ItemFocusAnim-darkGrey": () => vo,
		"ItemFocusAnim-darkGreySettings": () => _o,
		"ItemFocusAnim-darkerGrey": () => go,
		"ItemFocusAnim-darkerGrey-nocolor": () => ho,
		"ItemFocusAnim-green": () => Co,
		"ItemFocusAnim-grey": () => yo,
		"ItemFocusAnim-translucent-white-10": () => bo,
		"ItemFocusAnim-translucent-white-20": () => xo,
		"ItemFocusAnimBorder-darkGrey": () => So,
		Label: () => fo,
		MenuSectionHeader: () => so,
		Positive: () => to,
		Selected: () => io,
		SubMenu: () => lo,
		UpperCase: () => co,
		active: () => ro,
		contextMenu: () => Ya,
		contextMenuContents: () => Xa,
		contextMenuFade: () => Qa,
		contextMenuItem: () => $a,
		default: () => Eo,
		"duration-app-launch": () => Ua,
		focusAnimation: () => wo,
		hasSubMenu: () => Za,
		hoverAnimation: () => To,
		slideInAnimation: () => Ja,
	}),
	Ua = `800ms`,
	Wa = `zIqKYLyjLDE-`,
	Ga = `QEqisB3QH6Y-`,
	Ka = `_10VZDl1S08Y-`,
	qa = `l55Qe9TRfWE-`,
	Ja = `P4ZPME0FQ0Q-`,
	Ya = `J49QvnbmR4o-`,
	Xa = `UsMszraE8Ts-`,
	Za = `_4opXG7WIDiM-`,
	Qa = `SY8HeIZAWTY-`,
	$a = `ifEDAYoKQZA-`,
	eo = `c9cBCqvRKIo-`,
	to = `N94BC56I6uk-`,
	no = `_4-FaJ3cVKd8-`,
	ro = `_4Z62LmEDnlc-`,
	io = `Ot2l8QCFbYw-`,
	ao = `O10dnuCtwuk-`,
	oo = `_9kFtKJpEINs-`,
	so = `Ajs9PcIe9Ak-`,
	co = `fj-p9B7Ar2Q-`,
	lo = `mZXAxtt8FmM-`,
	uo = `cPv4Xc7IDnQ-`,
	fo = `InE8BB-Fxp8-`,
	po = `xJCVpcgk4LA-`,
	mo = `m93aoWJlOCE-`,
	ho = `YvNC8luwtfc-`,
	go = `_5A0hah79ug8-`,
	_o = `Mal6k7DjPUQ-`,
	vo = `CT39We8M7uI-`,
	yo = `bESapfyiJAQ-`,
	bo = `YeVMYyR0HhM-`,
	xo = `_3h1WS4g7IRM-`,
	So = `UDD33NXGwZo-`,
	Co = `mMTi3RvNMbc-`,
	wo = `HPrMq1RsxVs-`,
	To = `D0Bepl124b8-`,
	Eo = {
		"duration-app-launch": `800ms`,
		BasicContextMenuModal: Wa,
		BasicContextMenuHeader: Ga,
		BasicContextMenuHeaderShrinkableSpacing: Ka,
		BasicContextMenuContainer: qa,
		slideInAnimation: Ja,
		contextMenu: Ya,
		contextMenuContents: Xa,
		hasSubMenu: Za,
		contextMenuFade: Qa,
		contextMenuItem: $a,
		Destructive: eo,
		Positive: to,
		Emphasis: no,
		active: ro,
		Selected: io,
		Focused: ao,
		Capitalized: oo,
		MenuSectionHeader: so,
		UpperCase: co,
		SubMenu: lo,
		ContextMenuSeparator: uo,
		Label: fo,
		Arrow: po,
		BackgroundAnimation: mo,
		"ItemFocusAnim-darkerGrey-nocolor": `YvNC8luwtfc-`,
		"ItemFocusAnim-darkerGrey": `_5A0hah79ug8-`,
		"ItemFocusAnim-darkGreySettings": `Mal6k7DjPUQ-`,
		"ItemFocusAnim-darkGrey": `CT39We8M7uI-`,
		"ItemFocusAnim-grey": `bESapfyiJAQ-`,
		"ItemFocusAnim-translucent-white-10": `YeVMYyR0HhM-`,
		"ItemFocusAnim-translucent-white-20": `_3h1WS4g7IRM-`,
		"ItemFocusAnimBorder-darkGrey": `UDD33NXGwZo-`,
		"ItemFocusAnim-green": `mMTi3RvNMbc-`,
		focusAnimation: wo,
		hoverAnimation: To,
	};
function Do(e) {
	let { managerOverride: t } = e,
		n = Le(),
		r = t ?? n,
		i = te();
	return (
		be(r.OnMenusChanged, i),
		(0, I.jsx)(Pt, {
			active: !!r.ActiveMenu,
			children: (0, I.jsx)(Oo, { ActiveMenu: r.ActiveMenu }),
		})
	);
}
function Oo(e) {
	let { ActiveMenu: t } = e,
		n = F.useCallback(() => {
			t?.OnCancel();
		}, [t]);
	F.useEffect(() => () => t?.Hide(), [t]);
	let r = [],
		i = null;
	At(() => {
		for (let e = t; e && e.visible; e = e.submenu)
			(r.push((0, I.jsx)(ko, { instance: e }, e.key)), (i = e.label));
	});
	let a = F.useCallback(
		(e) => {
			e.currentTarget == e.target && n();
		},
		[n],
	);
	return (0, I.jsx)(Ve, {
		padding: `none`,
		children: (0, I.jsxs)(`div`, {
			onClick: a,
			className: wt(`BasicUIContextMenu`, Wa),
			children: [
				i &&
					(0, I.jsx)(I.Fragment, {
						children: (0, I.jsx)(`div`, {
							className: `QEqisB3QH6Y-`,
							children: i,
						}),
					}),
				(0, I.jsx)(kt, {
					className: qa,
					onCancelButton: n,
					onClick: a,
					children: r,
				}),
			],
		}),
	});
}
function ko(e) {
	let { instance: t } = e,
		n = j(),
		r = F.useCallback(() => {
			n && ce.PlayNavSound(ue.FailedNav);
		}, [n]),
		i = F.useMemo(
			() => ({
				instance: t,
				styles: Ha,
				presentation: 1,
				callbacks: { onDisabledItemSelected: r },
			}),
			[t, r],
		);
	return (0, I.jsx)(Dt, {
		children: (0, I.jsx)(jt.Provider, { value: i, children: t.ReactElement }),
	});
}
function Ao() {
	return F.useMemo(() => jo(), []);
}
function jo() {
	return function (e) {
		let {
				refNavTree: t,
				className: n,
				active: r,
				children: i,
				modalKey: a,
			} = e,
			o = F.useRef(void 0);
		return (
			ut(o, r, !0),
			(0, I.jsx)(le, {
				className: n,
				navTreeRef: Pe(o, t),
				modal: !0,
				enabled: r,
				navID: `ModalDialogOverlay_${a}`,
				children: i,
			})
		);
	};
}
function Mo(e) {
	let {
		className: t,
		onEscKeypress: n,
		padding: r = `standard`,
		bGamepadUIScrollWithin: i,
		children: a,
	} = e;
	return (0, I.jsx)(kt, {
		className: wt(
			ze,
			r == `standard` && `OaiXfc-WlaQ-`,
			i && `dz-Wyy2Ybkc-`,
			t,
		),
		onCancelButton: n,
		focusableIfEmpty: !0,
		children: (0, I.jsx)(bt, { children: (0, I.jsx)(Dt, { children: a }) }),
	});
}
function No(e) {
	let t = F.useMemo(() => ({ ModalPosition: Mo }), []);
	return (0, I.jsx)(Fe.Provider, { value: t, children: e.children });
}
function Po(e) {
	let t = Ao(),
		n = F.useMemo(() => ({ DropDownMenu: He, Content: Ue }), []);
	return (0, I.jsx)(Be.Provider, {
		value: n,
		children: (0, I.jsx)(No, {
			children: (0, I.jsx)(Re, {
				...e,
				bUseDialogElement: !1,
				DialogWrapper: t,
				ContextMenuComponent: Do,
			}),
		}),
	});
}
function Fo(e) {
	let t = j(),
		n = { bRenderOverlayAtRoot: !0, bUsePopups: !1, ...e };
	return t ? (0, I.jsx)(Po, { ...n }) : (0, I.jsx)(Re, { ...n });
}
var Io = `t-LlQicBZjE-`,
	Lo = `Mp6FkxWGdWs-`,
	Ro = `bMvLQ9GXq-E-`,
	zo = `YhgFcZPycbw-`,
	Bo = dt({ Component: Vo });
function Vo({ children: e }) {
	let {
			strWebAPIToken: t,
			steamid: n,
			header: r,
			currentUserLinkDetails: i,
			bShowGlobalHeader: a,
			bShowGlobalFooter: o,
			bInsideModal: s,
			strHtmlClass: c,
			cssVars: l,
			spoofing: u,
		} = Bo.useLoaderData(),
		d = j();
	return (0, I.jsx)(Ho, {
		strWebAPIToken: t,
		steamid: n,
		children: (0, I.jsxs)(`html`, {
			lang: Qe().strISOCode,
			className: c,
			style: l,
			children: [
				(0, I.jsxs)(`head`, {
					children: [
						s && (0, I.jsx)(`base`, { target: `_top` }),
						(0, I.jsx)(Me, {}),
					],
				}),
				(0, I.jsx)(`body`, {
					className: Lo,
					children: (0, I.jsx)(se, {
						navID: `CommunityTemplate`,
						disabledRoot: !d,
						historyMode: `navigationapi`,
						children: (0, I.jsx)(`div`, {
							className: Ro,
							children: (0, I.jsx)(bt, {
								children: (0, I.jsx)(Fo, {
									children: (0, I.jsxs)(fn, {
										children: [
											a &&
												r &&
												(0, I.jsx)(F.Suspense, {
													children: (0, I.jsx)(Li, {
														navContent: r.navContent,
														globalActions: r.globalActions,
														notifications: r.notifications,
														userDetails: i,
														cartInResponsiveMenu: !1,
														changeLanguagePath: `/actions/SetLanguage/`,
														logoutPath: `/login/logout/`,
														internalOptionsClassname: `t5vw-35f5J8-`,
														internalOptionsButtonClassname: `gmfn-yFroqw-`,
														spoofing: u,
													}),
												}),
											(0, I.jsxs)(`div`, {
												className: zo,
												children: [
													(0, I.jsx)(`div`, { className: Io }),
													(0, I.jsx)(Ji, {}),
													(0, I.jsx)(ct, { children: e }),
												],
											}),
											o && (0, I.jsx)(La, {}),
										],
									}),
								}),
							}),
						}),
					}),
				}),
			],
		}),
	});
}
function Ho(e) {
	let { strWebAPIToken: t, steamid: n, children: r } = e,
		{ storeBrowseContext: i } = Bo.useLoaderData();
	return (0, I.jsx)(la, {
		children: (0, I.jsx)(Ft, {
			children: (0, I.jsx)(Ba, {
				strWebAPIToken: t,
				steamid: n,
				children: (0, I.jsx)(Ee, {
					context: i,
					msDelayBatch: 250,
					children: r,
				}),
			}),
		}),
	});
}
export { Bo as route };
//# sourceMappingURL=BvtxbEMc.js.map
