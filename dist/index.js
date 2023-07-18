function Vr(r, e) {
  for (var t = 0; t < e.length; t++) {
    const n = e[t];
    if (typeof n != 'string' && !Array.isArray(n)) {
      for (const s in n)
        if (s !== 'default' && !(s in r)) {
          const i = Object.getOwnPropertyDescriptor(n, s);
          i && Object.defineProperty(r, s, i.get ? i : { enumerable: !0, get: () => n[s] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, { value: 'Module' }));
}
(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s);
  new MutationObserver((s) => {
    for (const i of s)
      if (i.type === 'childList')
        for (const o of i.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && n(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : s.crossOrigin === 'anonymous'
        ? (i.credentials = 'omit')
        : (i.credentials = 'same-origin'),
      i
    );
  }
  function n(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = t(s);
    fetch(s.href, i);
  }
})();
const Wr = (r, e) => r === e,
  re = Symbol('solid-proxy'),
  xt = Symbol('solid-track'),
  Qe = { equals: Wr };
let Pe = null,
  pr = wr;
const ie = 1,
  Ze = 2,
  vr = { owned: null, cleanups: null, context: null, owner: null },
  dt = {};
var B = null;
let ft = null,
  L = null,
  J = null,
  te = null,
  it = 0;
function We(r, e) {
  const t = L,
    n = B,
    s = r.length === 0,
    i = s ? vr : { owned: null, cleanups: null, context: null, owner: e === void 0 ? n : e },
    o = s ? r : () => r(() => W(() => ot(i)));
  (B = i), (L = null);
  try {
    return ce(o, !0);
  } finally {
    (L = t), (B = n);
  }
}
function K(r, e) {
  e = e ? Object.assign({}, Qe, e) : Qe;
  const t = { value: r, observers: null, observerSlots: null, comparator: e.equals || void 0 },
    n = (s) => (typeof s == 'function' && (s = s(t.value)), br(t, s));
  return [_r.bind(t), n];
}
function Vt(r, e, t) {
  const n = Ue(r, e, !0, ie);
  xe(n);
}
function N(r, e, t) {
  const n = Ue(r, e, !1, ie);
  xe(n);
}
function st(r, e, t) {
  pr = sn;
  const n = Ue(r, e, !1, ie);
  (!t || !t.render) && (n.user = !0), te ? te.push(n) : xe(n);
}
function V(r, e, t) {
  t = t ? Object.assign({}, Qe, t) : Qe;
  const n = Ue(r, e, !0, 0);
  return (
    (n.observers = null),
    (n.observerSlots = null),
    (n.comparator = t.equals || void 0),
    xe(n),
    _r.bind(n)
  );
}
function Xr(r, e, t) {
  let n, s, i;
  (arguments.length === 2 && typeof e == 'object') || arguments.length === 1
    ? ((n = !0), (s = r), (i = e || {}))
    : ((n = r), (s = e), (i = t || {}));
  let o = null,
    a = dt,
    c = !1,
    u = 'initialValue' in i,
    l = typeof n == 'function' && V(n);
  const h = new Set(),
    [f, p] = (i.storage || K)(i.initialValue),
    [g, y] = K(void 0),
    [_, $] = K(void 0, { equals: !1 }),
    [m, k] = K(u ? 'ready' : 'unresolved');
  function x(O, D, I, U) {
    return (
      o === O &&
        ((o = null),
        U !== void 0 && (u = !0),
        (O === a || D === a) && i.onHydrated && queueMicrotask(() => i.onHydrated(U, { value: D })),
        (a = dt),
        M(D, I)),
      D
    );
  }
  function M(O, D) {
    ce(() => {
      D === void 0 && p(() => O), k(D !== void 0 ? 'errored' : u ? 'ready' : 'unresolved'), y(D);
      for (const I of h.keys()) I.decrement();
      h.clear();
    }, !1);
  }
  function Y() {
    const O = tn,
      D = f(),
      I = g();
    if (I !== void 0 && !o) throw I;
    return (
      L &&
        !L.user &&
        O &&
        Vt(() => {
          _(), o && (O.resolved || h.has(O) || (O.increment(), h.add(O)));
        }),
      D
    );
  }
  function Z(O = !0) {
    if (O !== !1 && c) return;
    c = !1;
    const D = l ? l() : n;
    if (D == null || D === !1) {
      x(o, W(f));
      return;
    }
    const I = a !== dt ? a : W(() => s(D, { value: f(), refetching: O }));
    return typeof I != 'object' || !(I && 'then' in I)
      ? (x(o, I, void 0, D), I)
      : ((o = I),
        (c = !0),
        queueMicrotask(() => (c = !1)),
        ce(() => {
          k(u ? 'refreshing' : 'pending'), $();
        }, !1),
        I.then(
          (U) => x(I, U, void 0, D),
          (U) => x(I, void 0, xr(U), D),
        ));
  }
  return (
    Object.defineProperties(Y, {
      state: { get: () => m() },
      error: { get: () => g() },
      loading: {
        get() {
          const O = m();
          return O === 'pending' || O === 'refreshing';
        },
      },
      latest: {
        get() {
          if (!u) return Y();
          const O = g();
          if (O && !o) throw O;
          return f();
        },
      },
    }),
    l ? Vt(() => Z(!1)) : Z(!1),
    [Y, { refetch: Z, mutate: p }]
  );
}
function Yr(r) {
  return ce(r, !1);
}
function W(r) {
  if (L === null) return r();
  const e = L;
  L = null;
  try {
    return r();
  } finally {
    L = e;
  }
}
function Qr(r) {
  st(() => W(r));
}
function yr(r) {
  return B === null || (B.cleanups === null ? (B.cleanups = [r]) : B.cleanups.push(r)), r;
}
function Zr(r, e) {
  Pe || (Pe = Symbol('error')), (B = Ue(void 0, void 0, !0)), (B.context = { [Pe]: [e] });
  try {
    return r();
  } catch (t) {
    Mt(t);
  } finally {
    B = B.owner;
  }
}
function mr() {
  return L;
}
function en(r) {
  const e = V(r),
    t = V(() => St(e()));
  return (
    (t.toArray = () => {
      const n = t();
      return Array.isArray(n) ? n : n != null ? [n] : [];
    }),
    t
  );
}
let tn;
function _r() {
  if (this.sources && this.state)
    if (this.state === ie) xe(this);
    else {
      const r = J;
      (J = null), ce(() => tt(this), !1), (J = r);
    }
  if (L) {
    const r = this.observers ? this.observers.length : 0;
    L.sources
      ? (L.sources.push(this), L.sourceSlots.push(r))
      : ((L.sources = [this]), (L.sourceSlots = [r])),
      this.observers
        ? (this.observers.push(L), this.observerSlots.push(L.sources.length - 1))
        : ((this.observers = [L]), (this.observerSlots = [L.sources.length - 1]));
  }
  return this.value;
}
function br(r, e, t) {
  let n = r.value;
  return (
    (!r.comparator || !r.comparator(n, e)) &&
      ((r.value = e),
      r.observers &&
        r.observers.length &&
        ce(() => {
          for (let s = 0; s < r.observers.length; s += 1) {
            const i = r.observers[s],
              o = ft && ft.running;
            o && ft.disposed.has(i),
              (o ? !i.tState : !i.state) && (i.pure ? J.push(i) : te.push(i), i.observers && $r(i)),
              o || (i.state = ie);
          }
          if (J.length > 1e6) throw ((J = []), new Error());
        }, !1)),
    e
  );
}
function xe(r) {
  if (!r.fn) return;
  ot(r);
  const e = B,
    t = L,
    n = it;
  (L = B = r), rn(r, r.value, n), (L = t), (B = e);
}
function rn(r, e, t) {
  let n;
  try {
    n = r.fn(e);
  } catch (s) {
    return (
      r.pure && ((r.state = ie), r.owned && r.owned.forEach(ot), (r.owned = null)),
      (r.updatedAt = t + 1),
      Mt(s)
    );
  }
  (!r.updatedAt || r.updatedAt <= t) &&
    (r.updatedAt != null && 'observers' in r ? br(r, n) : (r.value = n), (r.updatedAt = t));
}
function Ue(r, e, t, n = ie, s) {
  const i = {
    fn: r,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: B,
    context: null,
    pure: t,
  };
  return B === null || (B !== vr && (B.owned ? B.owned.push(i) : (B.owned = [i]))), i;
}
function et(r) {
  if (r.state === 0) return;
  if (r.state === Ze) return tt(r);
  if (r.suspense && W(r.suspense.inFallback)) return r.suspense.effects.push(r);
  const e = [r];
  for (; (r = r.owner) && (!r.updatedAt || r.updatedAt < it); ) r.state && e.push(r);
  for (let t = e.length - 1; t >= 0; t--)
    if (((r = e[t]), r.state === ie)) xe(r);
    else if (r.state === Ze) {
      const n = J;
      (J = null), ce(() => tt(r, e[0]), !1), (J = n);
    }
}
function ce(r, e) {
  if (J) return r();
  let t = !1;
  e || (J = []), te ? (t = !0) : (te = []), it++;
  try {
    const n = r();
    return nn(t), n;
  } catch (n) {
    t || (te = null), (J = null), Mt(n);
  }
}
function nn(r) {
  if ((J && (wr(J), (J = null)), r)) return;
  const e = te;
  (te = null), e.length && ce(() => pr(e), !1);
}
function wr(r) {
  for (let e = 0; e < r.length; e++) et(r[e]);
}
function sn(r) {
  let e,
    t = 0;
  for (e = 0; e < r.length; e++) {
    const n = r[e];
    n.user ? (r[t++] = n) : et(n);
  }
  for (e = 0; e < t; e++) et(r[e]);
}
function tt(r, e) {
  r.state = 0;
  for (let t = 0; t < r.sources.length; t += 1) {
    const n = r.sources[t];
    if (n.sources) {
      const s = n.state;
      s === ie ? n !== e && (!n.updatedAt || n.updatedAt < it) && et(n) : s === Ze && tt(n, e);
    }
  }
}
function $r(r) {
  for (let e = 0; e < r.observers.length; e += 1) {
    const t = r.observers[e];
    t.state || ((t.state = Ze), t.pure ? J.push(t) : te.push(t), t.observers && $r(t));
  }
}
function ot(r) {
  let e;
  if (r.sources)
    for (; r.sources.length; ) {
      const t = r.sources.pop(),
        n = r.sourceSlots.pop(),
        s = t.observers;
      if (s && s.length) {
        const i = s.pop(),
          o = t.observerSlots.pop();
        n < s.length && ((i.sourceSlots[o] = n), (s[n] = i), (t.observerSlots[n] = o));
      }
    }
  if (r.owned) {
    for (e = r.owned.length - 1; e >= 0; e--) ot(r.owned[e]);
    r.owned = null;
  }
  if (r.cleanups) {
    for (e = r.cleanups.length - 1; e >= 0; e--) r.cleanups[e]();
    r.cleanups = null;
  }
  (r.state = 0), (r.context = null);
}
function xr(r) {
  return r instanceof Error
    ? r
    : new Error(typeof r == 'string' ? r : 'Unknown error', { cause: r });
}
function Wt(r, e) {
  for (const t of r) t(e);
}
function Mt(r) {
  const e = Pe && Sr(B, Pe);
  if (!e) throw r;
  const t = xr(r);
  te
    ? te.push({
        fn() {
          Wt(e, t);
        },
        state: ie,
      })
    : Wt(e, t);
}
function Sr(r, e) {
  return r ? (r.context && r.context[e] !== void 0 ? r.context[e] : Sr(r.owner, e)) : void 0;
}
function St(r) {
  if (typeof r == 'function' && !r.length) return St(r());
  if (Array.isArray(r)) {
    const e = [];
    for (let t = 0; t < r.length; t++) {
      const n = St(r[t]);
      Array.isArray(n) ? e.push.apply(e, n) : e.push(n);
    }
    return e;
  }
  return r;
}
const on = Symbol('fallback');
function Xt(r) {
  for (let e = 0; e < r.length; e++) r[e]();
}
function an(r, e, t = {}) {
  let n = [],
    s = [],
    i = [],
    o = 0,
    a = e.length > 1 ? [] : null;
  return (
    yr(() => Xt(i)),
    () => {
      let c = r() || [],
        u,
        l;
      return (
        c[xt],
        W(() => {
          let f = c.length,
            p,
            g,
            y,
            _,
            $,
            m,
            k,
            x,
            M;
          if (f === 0)
            o !== 0 && (Xt(i), (i = []), (n = []), (s = []), (o = 0), a && (a = [])),
              t.fallback && ((n = [on]), (s[0] = We((Y) => ((i[0] = Y), t.fallback()))), (o = 1));
          else if (o === 0) {
            for (s = new Array(f), l = 0; l < f; l++) (n[l] = c[l]), (s[l] = We(h));
            o = f;
          } else {
            for (
              y = new Array(f),
                _ = new Array(f),
                a && ($ = new Array(f)),
                m = 0,
                k = Math.min(o, f);
              m < k && n[m] === c[m];
              m++
            );
            for (k = o - 1, x = f - 1; k >= m && x >= m && n[k] === c[x]; k--, x--)
              (y[x] = s[k]), (_[x] = i[k]), a && ($[x] = a[k]);
            for (p = new Map(), g = new Array(x + 1), l = x; l >= m; l--)
              (M = c[l]), (u = p.get(M)), (g[l] = u === void 0 ? -1 : u), p.set(M, l);
            for (u = m; u <= k; u++)
              (M = n[u]),
                (l = p.get(M)),
                l !== void 0 && l !== -1
                  ? ((y[l] = s[u]), (_[l] = i[u]), a && ($[l] = a[u]), (l = g[l]), p.set(M, l))
                  : i[u]();
            for (l = m; l < f; l++)
              l in y
                ? ((s[l] = y[l]), (i[l] = _[l]), a && ((a[l] = $[l]), a[l](l)))
                : (s[l] = We(h));
            (s = s.slice(0, (o = f))), (n = c.slice(0));
          }
          return s;
        })
      );
      function h(f) {
        if (((i[l] = f), a)) {
          const [p, g] = K(l);
          return (a[l] = g), e(c[l], p);
        }
        return e(c[l]);
      }
    }
  );
}
function S(r, e) {
  return W(() => r(e || {}));
}
function Fe() {
  return !0;
}
const Ot = {
  get(r, e, t) {
    return e === re ? t : r.get(e);
  },
  has(r, e) {
    return e === re ? !0 : r.has(e);
  },
  set: Fe,
  deleteProperty: Fe,
  getOwnPropertyDescriptor(r, e) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return r.get(e);
      },
      set: Fe,
      deleteProperty: Fe,
    };
  },
  ownKeys(r) {
    return r.keys();
  },
};
function gt(r) {
  return (r = typeof r == 'function' ? r() : r) ? r : {};
}
function ln() {
  for (let r = 0, e = this.length; r < e; ++r) {
    const t = this[r]();
    if (t !== void 0) return t;
  }
}
function Or(...r) {
  let e = !1;
  for (let i = 0; i < r.length; i++) {
    const o = r[i];
    (e = e || (!!o && re in o)), (r[i] = typeof o == 'function' ? ((e = !0), V(o)) : o);
  }
  if (e)
    return new Proxy(
      {
        get(i) {
          for (let o = r.length - 1; o >= 0; o--) {
            const a = gt(r[o])[i];
            if (a !== void 0) return a;
          }
        },
        has(i) {
          for (let o = r.length - 1; o >= 0; o--) if (i in gt(r[o])) return !0;
          return !1;
        },
        keys() {
          const i = [];
          for (let o = 0; o < r.length; o++) i.push(...Object.keys(gt(r[o])));
          return [...new Set(i)];
        },
      },
      Ot,
    );
  const t = {},
    n = {};
  let s = !1;
  for (let i = r.length - 1; i >= 0; i--) {
    const o = r[i];
    if (!o) continue;
    const a = Object.getOwnPropertyNames(o);
    s = s || (i !== 0 && !!a.length);
    for (let c = 0, u = a.length; c < u; c++) {
      const l = a[c];
      if (!(l === '__proto__' || l === 'constructor'))
        if (l in t) {
          const h = n[l],
            f = Object.getOwnPropertyDescriptor(o, l);
          h
            ? f.get
              ? h.push(f.get.bind(o))
              : f.value !== void 0 && h.push(() => f.value)
            : t[l] === void 0 && (t[l] = f.value);
        } else {
          const h = Object.getOwnPropertyDescriptor(o, l);
          h.get
            ? Object.defineProperty(t, l, {
                enumerable: !0,
                configurable: !0,
                get: ln.bind((n[l] = [h.get.bind(o)])),
              })
            : (t[l] = h.value);
        }
    }
  }
  return t;
}
function cn(r, ...e) {
  if (re in r) {
    const s = new Set(e.length > 1 ? e.flat() : e[0]),
      i = e.map(
        (o) =>
          new Proxy(
            {
              get(a) {
                return o.includes(a) ? r[a] : void 0;
              },
              has(a) {
                return o.includes(a) && a in r;
              },
              keys() {
                return o.filter((a) => a in r);
              },
            },
            Ot,
          ),
      );
    return (
      i.push(
        new Proxy(
          {
            get(o) {
              return s.has(o) ? void 0 : r[o];
            },
            has(o) {
              return s.has(o) ? !1 : o in r;
            },
            keys() {
              return Object.keys(r).filter((o) => !s.has(o));
            },
          },
          Ot,
        ),
      ),
      i
    );
  }
  const t = {},
    n = e.map(() => ({}));
  for (const s of Object.getOwnPropertyNames(r)) {
    const i = Object.getOwnPropertyDescriptor(r, s),
      o = !i.get && !i.set && i.enumerable && i.writable && i.configurable;
    let a = !1,
      c = 0;
    for (const u of e)
      u.includes(s) && ((a = !0), o ? (n[c][s] = i.value) : Object.defineProperty(n[c], s, i)), ++c;
    a || (o ? (t[s] = i.value) : Object.defineProperty(t, s, i));
  }
  return [...n, t];
}
const Tr = (r) => `Stale read from <${r}>.`;
function Er(r) {
  const e = 'fallback' in r && { fallback: () => r.fallback };
  return V(an(() => r.each, r.children, e || void 0));
}
function be(r) {
  const e = r.keyed,
    t = V(() => r.when, void 0, { equals: (n, s) => (e ? n === s : !n == !s) });
  return V(
    () => {
      const n = t();
      if (n) {
        const s = r.children;
        return typeof s == 'function' && s.length > 0
          ? W(() =>
              s(
                e
                  ? n
                  : () => {
                      if (!W(t)) throw Tr('Show');
                      return r.when;
                    },
              ),
            )
          : s;
      }
      return r.fallback;
    },
    void 0,
    void 0,
  );
}
function Tt(r) {
  let e = !1;
  const t = (i, o) => i[0] === o[0] && (e ? i[1] === o[1] : !i[1] == !o[1]) && i[2] === o[2],
    n = en(() => r.children),
    s = V(
      () => {
        let i = n();
        Array.isArray(i) || (i = [i]);
        for (let o = 0; o < i.length; o++) {
          const a = i[o].when;
          if (a) return (e = !!i[o].keyed), [o, a, i[o]];
        }
        return [-1];
      },
      void 0,
      { equals: t },
    );
  return V(
    () => {
      const [i, o, a] = s();
      if (i < 0) return r.fallback;
      const c = a.children;
      return typeof c == 'function' && c.length > 0
        ? W(() =>
            c(
              e
                ? o
                : () => {
                    if (W(s)[0] !== i) throw Tr('Match');
                    return a.when;
                  },
            ),
          )
        : c;
    },
    void 0,
    void 0,
  );
}
function Xe(r) {
  return r;
}
let ze;
function un(r) {
  let e;
  const [t, n] = K(e, void 0);
  return (
    ze || (ze = new Set()),
    ze.add(n),
    yr(() => ze.delete(n)),
    V(
      () => {
        let s;
        if ((s = t())) {
          const i = r.fallback;
          return typeof i == 'function' && i.length ? W(() => i(s, () => n())) : i;
        }
        return Zr(() => r.children, n);
      },
      void 0,
      void 0,
    )
  );
}
const hn = [
    'allowfullscreen',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'disabled',
    'formnovalidate',
    'hidden',
    'indeterminate',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'seamless',
    'selected',
  ],
  dn = new Set([
    'className',
    'value',
    'readOnly',
    'formNoValidate',
    'isMap',
    'noModule',
    'playsInline',
    ...hn,
  ]),
  fn = new Set(['innerHTML', 'textContent', 'innerText', 'children']),
  gn = Object.assign(Object.create(null), { className: 'class', htmlFor: 'for' }),
  pn = Object.assign(Object.create(null), {
    class: 'className',
    formnovalidate: { $: 'formNoValidate', BUTTON: 1, INPUT: 1 },
    ismap: { $: 'isMap', IMG: 1 },
    nomodule: { $: 'noModule', SCRIPT: 1 },
    playsinline: { $: 'playsInline', VIDEO: 1 },
    readonly: { $: 'readOnly', INPUT: 1, TEXTAREA: 1 },
  });
function vn(r, e) {
  const t = pn[r];
  return typeof t == 'object' ? (t[e] ? t.$ : void 0) : t;
}
const yn = new Set([
    'beforeinput',
    'click',
    'dblclick',
    'contextmenu',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'pointerdown',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointerup',
    'touchend',
    'touchmove',
    'touchstart',
  ]),
  mn = { xlink: 'http://www.w3.org/1999/xlink', xml: 'http://www.w3.org/XML/1998/namespace' };
function _n(r, e, t) {
  let n = t.length,
    s = e.length,
    i = n,
    o = 0,
    a = 0,
    c = e[s - 1].nextSibling,
    u = null;
  for (; o < s || a < i; ) {
    if (e[o] === t[a]) {
      o++, a++;
      continue;
    }
    for (; e[s - 1] === t[i - 1]; ) s--, i--;
    if (s === o) {
      const l = i < n ? (a ? t[a - 1].nextSibling : t[i - a]) : c;
      for (; a < i; ) r.insertBefore(t[a++], l);
    } else if (i === a) for (; o < s; ) (!u || !u.has(e[o])) && e[o].remove(), o++;
    else if (e[o] === t[i - 1] && t[a] === e[s - 1]) {
      const l = e[--s].nextSibling;
      r.insertBefore(t[a++], e[o++].nextSibling), r.insertBefore(t[--i], l), (e[s] = t[i]);
    } else {
      if (!u) {
        u = new Map();
        let h = a;
        for (; h < i; ) u.set(t[h], h++);
      }
      const l = u.get(e[o]);
      if (l != null)
        if (a < l && l < i) {
          let h = o,
            f = 1,
            p;
          for (; ++h < s && h < i && !((p = u.get(e[h])) == null || p !== l + f); ) f++;
          if (f > l - a) {
            const g = e[o];
            for (; a < l; ) r.insertBefore(t[a++], g);
          } else r.replaceChild(t[a++], e[o++]);
        } else o++;
      else e[o++].remove();
    }
  }
}
const Yt = '_$DX_DELEGATE';
function bn(r, e, t, n = {}) {
  let s;
  return (
    We((i) => {
      (s = i), e === document ? r() : j(e, r(), e.firstChild ? null : void 0, t);
    }, n.owner),
    () => {
      s(), (e.textContent = '');
    }
  );
}
function P(r, e, t) {
  let n;
  const s = () => {
      const o = document.createElement('template');
      return (o.innerHTML = r), t ? o.content.firstChild.firstChild : o.content.firstChild;
    },
    i = e
      ? () => W(() => document.importNode(n || (n = s()), !0))
      : () => (n || (n = s())).cloneNode(!0);
  return (i.cloneNode = i), i;
}
function Ne(r, e = window.document) {
  const t = e[Yt] || (e[Yt] = new Set());
  for (let n = 0, s = r.length; n < s; n++) {
    const i = r[n];
    t.has(i) || (t.add(i), e.addEventListener(i, On));
  }
}
function E(r, e, t) {
  t == null ? r.removeAttribute(e) : r.setAttribute(e, t);
}
function wn(r, e, t, n) {
  n == null ? r.removeAttributeNS(e, t) : r.setAttributeNS(e, t, n);
}
function Ae(r, e) {
  e == null ? r.removeAttribute('class') : (r.className = e);
}
function kr(r, e, t, n) {
  if (n) Array.isArray(t) ? ((r[`$$${e}`] = t[0]), (r[`$$${e}Data`] = t[1])) : (r[`$$${e}`] = t);
  else if (Array.isArray(t)) {
    const s = t[0];
    r.addEventListener(e, (t[0] = (i) => s.call(r, t[1], i)));
  } else r.addEventListener(e, t);
}
function Ar(r, e, t = {}) {
  const n = Object.keys(e || {}),
    s = Object.keys(t);
  let i, o;
  for (i = 0, o = s.length; i < o; i++) {
    const a = s[i];
    !a || a === 'undefined' || e[a] || (Qt(r, a, !1), delete t[a]);
  }
  for (i = 0, o = n.length; i < o; i++) {
    const a = n[i],
      c = !!e[a];
    !a || a === 'undefined' || t[a] === c || !c || (Qt(r, a, !0), (t[a] = c));
  }
  return t;
}
function $n(r, e, t) {
  if (!e) return t ? E(r, 'style') : e;
  const n = r.style;
  if (typeof e == 'string') return (n.cssText = e);
  typeof t == 'string' && (n.cssText = t = void 0), t || (t = {}), e || (e = {});
  let s, i;
  for (i in t) e[i] == null && n.removeProperty(i), delete t[i];
  for (i in e) (s = e[i]), s !== t[i] && (n.setProperty(i, s), (t[i] = s));
  return t;
}
function jr(r, e = {}, t, n) {
  const s = {};
  return (
    n || N(() => (s.children = $e(r, e.children, s.children))),
    N(() => e.ref && e.ref(r)),
    N(() => xn(r, e, t, !0, s, !0)),
    s
  );
}
function Pr(r, e, t) {
  return W(() => r(e, t));
}
function j(r, e, t, n) {
  if ((t !== void 0 && !n && (n = []), typeof e != 'function')) return $e(r, e, n, t);
  N((s) => $e(r, e(), s, t), n);
}
function xn(r, e, t, n, s = {}, i = !1) {
  e || (e = {});
  for (const o in s)
    if (!(o in e)) {
      if (o === 'children') continue;
      s[o] = Zt(r, o, null, s[o], t, i);
    }
  for (const o in e) {
    if (o === 'children') {
      n || $e(r, e.children);
      continue;
    }
    const a = e[o];
    s[o] = Zt(r, o, a, s[o], t, i);
  }
}
function Sn(r) {
  return r.toLowerCase().replace(/-([a-z])/g, (e, t) => t.toUpperCase());
}
function Qt(r, e, t) {
  const n = e.trim().split(/\s+/);
  for (let s = 0, i = n.length; s < i; s++) r.classList.toggle(n[s], t);
}
function Zt(r, e, t, n, s, i) {
  let o, a, c, u, l;
  if (e === 'style') return $n(r, t, n);
  if (e === 'classList') return Ar(r, t, n);
  if (t === n) return n;
  if (e === 'ref') i || t(r);
  else if (e.slice(0, 3) === 'on:') {
    const h = e.slice(3);
    n && r.removeEventListener(h, n), t && r.addEventListener(h, t);
  } else if (e.slice(0, 10) === 'oncapture:') {
    const h = e.slice(10);
    n && r.removeEventListener(h, n, !0), t && r.addEventListener(h, t, !0);
  } else if (e.slice(0, 2) === 'on') {
    const h = e.slice(2).toLowerCase(),
      f = yn.has(h);
    if (!f && n) {
      const p = Array.isArray(n) ? n[0] : n;
      r.removeEventListener(h, p);
    }
    (f || t) && (kr(r, h, t, f), f && Ne([h]));
  } else if (e.slice(0, 5) === 'attr:') E(r, e.slice(5), t);
  else if (
    (l = e.slice(0, 5) === 'prop:') ||
    (c = fn.has(e)) ||
    (!s && ((u = vn(e, r.tagName)) || (a = dn.has(e)))) ||
    (o = r.nodeName.includes('-'))
  )
    l && ((e = e.slice(5)), (a = !0)),
      e === 'class' || e === 'className'
        ? Ae(r, t)
        : o && !a && !c
        ? (r[Sn(e)] = t)
        : (r[u || e] = t);
  else {
    const h = s && e.indexOf(':') > -1 && mn[e.split(':')[0]];
    h ? wn(r, h, e, t) : E(r, gn[e] || e, t);
  }
  return t;
}
function On(r) {
  const e = `$$${r.type}`;
  let t = (r.composedPath && r.composedPath()[0]) || r.target;
  for (
    r.target !== t && Object.defineProperty(r, 'target', { configurable: !0, value: t }),
      Object.defineProperty(r, 'currentTarget', {
        configurable: !0,
        get() {
          return t || document;
        },
      });
    t;

  ) {
    const n = t[e];
    if (n && !t.disabled) {
      const s = t[`${e}Data`];
      if ((s !== void 0 ? n.call(t, s, r) : n.call(t, r), r.cancelBubble)) return;
    }
    t = t._$host || t.parentNode || t.host;
  }
}
function $e(r, e, t, n, s) {
  for (; typeof t == 'function'; ) t = t();
  if (e === t) return t;
  const i = typeof e,
    o = n !== void 0;
  if (((r = (o && t[0] && t[0].parentNode) || r), i === 'string' || i === 'number'))
    if ((i === 'number' && (e = e.toString()), o)) {
      let a = t[0];
      a && a.nodeType === 3 ? (a.data = e) : (a = document.createTextNode(e)), (t = ye(r, t, n, a));
    } else t !== '' && typeof t == 'string' ? (t = r.firstChild.data = e) : (t = r.textContent = e);
  else if (e == null || i === 'boolean') t = ye(r, t, n);
  else {
    if (i === 'function')
      return (
        N(() => {
          let a = e();
          for (; typeof a == 'function'; ) a = a();
          t = $e(r, a, t, n);
        }),
        () => t
      );
    if (Array.isArray(e)) {
      const a = [],
        c = t && Array.isArray(t);
      if (Et(a, e, t, s)) return N(() => (t = $e(r, a, t, n, !0))), () => t;
      if (a.length === 0) {
        if (((t = ye(r, t, n)), o)) return t;
      } else c ? (t.length === 0 ? er(r, a, n) : _n(r, t, a)) : (t && ye(r), er(r, a));
      t = a;
    } else if (e.nodeType) {
      if (Array.isArray(t)) {
        if (o) return (t = ye(r, t, n, e));
        ye(r, t, null, e);
      } else
        t == null || t === '' || !r.firstChild ? r.appendChild(e) : r.replaceChild(e, r.firstChild);
      t = e;
    } else console.warn('Unrecognized value. Skipped inserting', e);
  }
  return t;
}
function Et(r, e, t, n) {
  let s = !1;
  for (let i = 0, o = e.length; i < o; i++) {
    let a = e[i],
      c = t && t[i],
      u;
    if (!(a == null || a === !0 || a === !1))
      if ((u = typeof a) == 'object' && a.nodeType) r.push(a);
      else if (Array.isArray(a)) s = Et(r, a, c) || s;
      else if (u === 'function')
        if (n) {
          for (; typeof a == 'function'; ) a = a();
          s = Et(r, Array.isArray(a) ? a : [a], Array.isArray(c) ? c : [c]) || s;
        } else r.push(a), (s = !0);
      else {
        const l = String(a);
        c && c.nodeType === 3 && c.data === l ? r.push(c) : r.push(document.createTextNode(l));
      }
  }
  return s;
}
function er(r, e, t = null) {
  for (let n = 0, s = e.length; n < s; n++) r.insertBefore(e[n], t);
}
function ye(r, e, t, n) {
  if (t === void 0) return (r.textContent = '');
  const s = n || document.createTextNode('');
  if (e.length) {
    let i = !1;
    for (let o = e.length - 1; o >= 0; o--) {
      const a = e[o];
      if (s !== a) {
        const c = a.parentNode === r;
        !i && !o ? (c ? r.replaceChild(s, a) : r.insertBefore(s, t)) : c && a.remove();
      } else i = !0;
    }
  } else r.insertBefore(s, t);
  return [s];
}
const kt = Symbol('store-raw'),
  Ie = Symbol('store-node');
function Cr(r) {
  let e = r[re];
  if (!e && (Object.defineProperty(r, re, { value: (e = new Proxy(r, kn)) }), !Array.isArray(r))) {
    const t = Object.keys(r),
      n = Object.getOwnPropertyDescriptors(r);
    for (let s = 0, i = t.length; s < i; s++) {
      const o = t[s];
      n[o].get &&
        Object.defineProperty(r, o, { enumerable: n[o].enumerable, get: n[o].get.bind(e) });
    }
  }
  return e;
}
function rt(r) {
  let e;
  return (
    r != null &&
    typeof r == 'object' &&
    (r[re] || !(e = Object.getPrototypeOf(r)) || e === Object.prototype || Array.isArray(r))
  );
}
function De(r, e = new Set()) {
  let t, n, s, i;
  if ((t = r != null && r[kt])) return t;
  if (!rt(r) || e.has(r)) return r;
  if (Array.isArray(r)) {
    Object.isFrozen(r) ? (r = r.slice(0)) : e.add(r);
    for (let o = 0, a = r.length; o < a; o++) (s = r[o]), (n = De(s, e)) !== s && (r[o] = n);
  } else {
    Object.isFrozen(r) ? (r = Object.assign({}, r)) : e.add(r);
    const o = Object.keys(r),
      a = Object.getOwnPropertyDescriptors(r);
    for (let c = 0, u = o.length; c < u; c++)
      (i = o[c]), !a[i].get && ((s = r[i]), (n = De(s, e)) !== s && (r[i] = n));
  }
  return r;
}
function Bt(r) {
  let e = r[Ie];
  return e || Object.defineProperty(r, Ie, { value: (e = Object.create(null)) }), e;
}
function At(r, e, t) {
  return r[e] || (r[e] = Ir(t));
}
function Tn(r, e) {
  const t = Reflect.getOwnPropertyDescriptor(r, e);
  return (
    !t ||
      t.get ||
      !t.configurable ||
      e === re ||
      e === Ie ||
      (delete t.value, delete t.writable, (t.get = () => r[re][e])),
    t
  );
}
function Rr(r) {
  if (mr()) {
    const e = Bt(r);
    (e._ || (e._ = Ir()))();
  }
}
function En(r) {
  return Rr(r), Reflect.ownKeys(r);
}
function Ir(r) {
  const [e, t] = K(r, { equals: !1, internal: !0 });
  return (e.$ = t), e;
}
const kn = {
  get(r, e, t) {
    if (e === kt) return r;
    if (e === re) return t;
    if (e === xt) return Rr(r), t;
    const n = Bt(r),
      s = n[e];
    let i = s ? s() : r[e];
    if (e === Ie || e === '__proto__') return i;
    if (!s) {
      const o = Object.getOwnPropertyDescriptor(r, e);
      mr() &&
        (typeof i != 'function' || r.hasOwnProperty(e)) &&
        !(o && o.get) &&
        (i = At(n, e, i)());
    }
    return rt(i) ? Cr(i) : i;
  },
  has(r, e) {
    return e === kt || e === re || e === xt || e === Ie || e === '__proto__'
      ? !0
      : (this.get(r, e, r), e in r);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: En,
  getOwnPropertyDescriptor: Tn,
};
function nt(r, e, t, n = !1) {
  if (!n && r[e] === t) return;
  const s = r[e],
    i = r.length;
  t === void 0 ? delete r[e] : (r[e] = t);
  let o = Bt(r),
    a;
  if (((a = At(o, e, s)) && a.$(() => t), Array.isArray(r) && r.length !== i)) {
    for (let c = r.length; c < i; c++) (a = o[c]) && a.$();
    (a = At(o, 'length', i)) && a.$(r.length);
  }
  (a = o._) && a.$();
}
function Dr(r, e) {
  const t = Object.keys(e);
  for (let n = 0; n < t.length; n += 1) {
    const s = t[n];
    nt(r, s, e[s]);
  }
}
function An(r, e) {
  if ((typeof e == 'function' && (e = e(r)), (e = De(e)), Array.isArray(e))) {
    if (r === e) return;
    let t = 0,
      n = e.length;
    for (; t < n; t++) {
      const s = e[t];
      r[t] !== s && nt(r, t, s);
    }
    nt(r, 'length', n);
  } else Dr(r, e);
}
function je(r, e, t = []) {
  let n,
    s = r;
  if (e.length > 1) {
    n = e.shift();
    const o = typeof n,
      a = Array.isArray(r);
    if (Array.isArray(n)) {
      for (let c = 0; c < n.length; c++) je(r, [n[c]].concat(e), t);
      return;
    } else if (a && o === 'function') {
      for (let c = 0; c < r.length; c++) n(r[c], c) && je(r, [c].concat(e), t);
      return;
    } else if (a && o === 'object') {
      const { from: c = 0, to: u = r.length - 1, by: l = 1 } = n;
      for (let h = c; h <= u; h += l) je(r, [h].concat(e), t);
      return;
    } else if (e.length > 1) {
      je(r[n], e, [n].concat(t));
      return;
    }
    (s = r[n]), (t = [n].concat(t));
  }
  let i = e[0];
  (typeof i == 'function' && ((i = i(s, t)), i === s)) ||
    (n === void 0 && i == null) ||
    ((i = De(i)), n === void 0 || (rt(s) && rt(i) && !Array.isArray(i)) ? Dr(s, i) : nt(r, n, i));
}
function jn(...[r, e]) {
  const t = De(r || {}),
    n = Array.isArray(t),
    s = Cr(t);
  function i(...o) {
    Yr(() => {
      n && o.length === 1 ? An(t, o[0]) : je(t, o);
    });
  }
  return [s, i];
}
const Pn = '_rating_10dzp_1',
  Cn = '_rating0_10dzp_11',
  Rn = '_emoji_wrapper_10dzp_41',
  In = '_emoji_10dzp_41',
  Dn = '_rating1_10dzp_1',
  Ln = '_rating2_10dzp_1',
  Un = '_rating3_10dzp_1',
  Nn = '_rating4_10dzp_1',
  Mn = '_rating5_10dzp_1',
  Bn = '_feedback_10dzp_105',
  F = {
    rating: Pn,
    rating0: Cn,
    emoji_wrapper: Rn,
    emoji: In,
    rating1: Dn,
    rating2: Ln,
    rating3: Un,
    rating4: Nn,
    rating5: Mn,
    feedback: Bn,
  },
  Fn = P(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256c0 141.44-114.64 256-256 256-80.48 0-152.32-37.12-199.28-95.28 43.92 35.52 99.84 56.72 160.72 56.72 141.36 0 256-114.56 256-256 0-60.88-21.2-116.8-56.72-160.72C474.8 103.68 512 175.52 512 256z" fill="#f4c534"></path><ellipse transform="scale(-1) rotate(31.21 715.433 -595.455)" cx="166.318" cy="199.829" rx="56.146" ry="56.13" fill="#fff"></ellipse><ellipse transform="rotate(-148.804 180.87 175.82)" cx="180.871" cy="175.822" rx="28.048" ry="28.08" fill="#3e4347"></ellipse><ellipse transform="rotate(-113.778 194.434 165.995)" cx="194.433" cy="165.993" rx="8.016" ry="5.296" fill="#5a5f63"></ellipse><ellipse transform="scale(-1) rotate(31.21 715.397 -1237.664)" cx="345.695" cy="199.819" rx="56.146" ry="56.13" fill="#fff"></ellipse><ellipse transform="rotate(-148.804 360.25 175.837)" cx="360.252" cy="175.84" rx="28.048" ry="28.08" fill="#3e4347"></ellipse><ellipse transform="scale(-1) rotate(66.227 254.508 -573.138)" cx="373.794" cy="165.987" rx="8.016" ry="5.296" fill="#5a5f63"></ellipse><path d="M370.56 344.4c0 7.696-6.224 13.92-13.92 13.92H155.36c-7.616 0-13.92-6.224-13.92-13.92s6.304-13.92 13.92-13.92h201.296c7.696.016 13.904 6.224 13.904 13.92z" fill="#3e4347">',
  ),
  zn = P(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><path d="M328.4 428a92.8 92.8 0 0 0-145-.1 6.8 6.8 0 0 1-12-5.8 86.6 86.6 0 0 1 84.5-69 86.6 86.6 0 0 1 84.7 69.8c1.3 6.9-7.7 10.6-12.2 5.1z" fill="#3e4347"></path><path d="M269.2 222.3c5.3 62.8 52 113.9 104.8 113.9 52.3 0 90.8-51.1 85.6-113.9-2-25-10.8-47.9-23.7-66.7-4.1-6.1-12.2-8-18.5-4.2a111.8 111.8 0 0 1-60.1 16.2c-22.8 0-42.1-5.6-57.8-14.8-6.8-4-15.4-1.5-18.9 5.4-9 18.2-13.2 40.3-11.4 64.1z" fill="#f4c534"></path><path d="M357 189.5c25.8 0 47-7.1 63.7-18.7 10 14.6 17 32.1 18.7 51.6 4 49.6-26.1 89.7-67.5 89.7-41.6 0-78.4-40.1-82.5-89.7A95 95 0 0 1 298 174c16 9.7 35.6 15.5 59 15.5z" fill="#fff"></path><path d="M396.2 246.1a38.5 38.5 0 0 1-38.7 38.6 38.5 38.5 0 0 1-38.6-38.6 38.6 38.6 0 1 1 77.3 0z" fill="#3e4347"></path><path d="M380.4 241.1c-3.2 3.2-9.9 1.7-14.9-3.2-4.8-4.8-6.2-11.5-3-14.7 3.3-3.4 10-2 14.9 2.9 4.9 5 6.4 11.7 3 15z" fill="#fff"></path><path d="M242.8 222.3c-5.3 62.8-52 113.9-104.8 113.9-52.3 0-90.8-51.1-85.6-113.9 2-25 10.8-47.9 23.7-66.7 4.1-6.1 12.2-8 18.5-4.2 16.2 10.1 36.2 16.2 60.1 16.2 22.8 0 42.1-5.6 57.8-14.8 6.8-4 15.4-1.5 18.9 5.4 9 18.2 13.2 40.3 11.4 64.1z" fill="#f4c534"></path><path d="M155 189.5c-25.8 0-47-7.1-63.7-18.7-10 14.6-17 32.1-18.7 51.6-4 49.6 26.1 89.7 67.5 89.7 41.6 0 78.4-40.1 82.5-89.7A95 95 0 0 0 214 174c-16 9.7-35.6 15.5-59 15.5z" fill="#fff"></path><path d="M115.8 246.1a38.5 38.5 0 0 0 38.7 38.6 38.5 38.5 0 0 0 38.6-38.6 38.6 38.6 0 1 0-77.3 0z" fill="#3e4347"></path><path d="M131.6 241.1c3.2 3.2 9.9 1.7 14.9-3.2 4.8-4.8 6.2-11.5 3-14.7-3.3-3.4-10-2-14.9 2.9-4.9 5-6.4 11.7-3 15z" fill="#fff">',
  ),
  qn = P(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><path d="M336.6 403.2c-6.5 8-16 10-25.5 5.2a117.6 117.6 0 0 0-110.2 0c-9.4 4.9-19 3.3-25.6-4.6-6.5-7.7-4.7-21.1 8.4-28 45.1-24 99.5-24 144.6 0 13 7 14.8 19.7 8.3 27.4z" fill="#3e4347"></path><path d="M276.6 244.3a79.3 79.3 0 1 1 158.8 0 79.5 79.5 0 1 1-158.8 0z" fill="#fff"></path><circle cx="340" cy="260.4" r="36.2" fill="#3e4347"></circle><g fill="#fff"><ellipse transform="rotate(-135 326.4 246.6)" cx="326.4" cy="246.6" rx="6.5" ry="10"></ellipse><path d="M231.9 244.3a79.3 79.3 0 1 0-158.8 0 79.5 79.5 0 1 0 158.8 0z"></path></g><circle cx="168.5" cy="260.4" r="36.2" fill="#3e4347"></circle><ellipse transform="rotate(-135 182.1 246.7)" cx="182.1" cy="246.7" rx="10" ry="6.5" fill="#fff">',
  ),
  Hn = P(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M407.7 352.8a163.9 163.9 0 0 1-303.5 0c-2.3-5.5 1.5-12 7.5-13.2a780.8 780.8 0 0 1 288.4 0c6 1.2 9.9 7.7 7.6 13.2z" fill="#3e4347"></path><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><g fill="#fff"><path d="M115.3 339c18.2 29.6 75.1 32.8 143.1 32.8 67.1 0 124.2-3.2 143.2-31.6l-1.5-.6a780.6 780.6 0 0 0-284.8-.6z"></path><ellipse cx="356.4" cy="205.3" rx="81.1" ry="81"></ellipse></g><ellipse cx="356.4" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347"></ellipse><g fill="#fff"><ellipse transform="scale(-1) rotate(45 454 -906)" cx="375.3" cy="188.1" rx="12" ry="8.1"></ellipse><ellipse cx="155.6" cy="205.3" rx="81.1" ry="81"></ellipse></g><ellipse cx="155.6" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347"></ellipse><ellipse transform="scale(-1) rotate(45 454 -421.3)" cx="174.5" cy="188" rx="12" ry="8.1" fill="#fff">',
  ),
  Jn = P(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><path d="M232.3 201.3c0 49.2-74.3 94.2-74.3 94.2s-74.4-45-74.4-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b"></path><path d="M96.1 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2C80.2 229.8 95.6 175.2 96 173.3z" fill="#d03f3f"></path><path d="M215.2 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff"></path><path d="M428.4 201.3c0 49.2-74.4 94.2-74.4 94.2s-74.3-45-74.3-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b"></path><path d="M292.2 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2-77.8-65.7-62.4-120.3-61.9-122.2z" fill="#d03f3f"></path><path d="M411.3 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff"></path><path d="M381.7 374.1c-30.2 35.9-75.3 64.4-125.7 64.4s-95.4-28.5-125.8-64.2a17.6 17.6 0 0 1 16.5-28.7 627.7 627.7 0 0 0 218.7-.1c16.2-2.7 27 16.1 16.3 28.6z" fill="#3e4347"></path><path d="M256 438.5c25.7 0 50-7.5 71.7-19.5-9-33.7-40.7-43.3-62.6-31.7-29.7 15.8-62.8-4.7-75.6 34.3 20.3 10.4 42.8 17 66.5 17z" fill="#e24b4b">',
  ),
  Gn = P(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g fill="#ffd93b"><circle cx="256" cy="256" r="256"></circle><path d="M512 256A256 256 0 0 1 56.8 416.7a256 256 0 0 0 360-360c58 47 95.2 118.8 95.2 199.3z"></path></g><path d="M512 99.4v165.1c0 11-8.9 19.9-19.7 19.9h-187c-13 0-23.5-10.5-23.5-23.5v-21.3c0-12.9-8.9-24.8-21.6-26.7-16.2-2.5-30 10-30 25.5V261c0 13-10.5 23.5-23.5 23.5h-187A19.7 19.7 0 0 1 0 264.7V99.4c0-10.9 8.8-19.7 19.7-19.7h472.6c10.8 0 19.7 8.7 19.7 19.7z" fill="#e9eff4"></path><path d="M204.6 138v88.2a23 23 0 0 1-23 23H58.2a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#45cbea"></path><path d="M476.9 138v88.2a23 23 0 0 1-23 23H330.3a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#e84d88"></path><g fill="#38c0dc"><path d="M95.2 114.9l-60 60v15.2l75.2-75.2zM123.3 114.9L35.1 203v23.2c0 1.8.3 3.7.7 5.4l116.8-116.7h-29.3z"></path></g><g fill="#d23f77"><path d="M373.3 114.9l-66 66V196l81.3-81.2zM401.5 114.9l-94.1 94v17.3c0 3.5.8 6.8 2.2 9.8l121.1-121.1h-29.2z"></path></g><path d="M329.5 395.2c0 44.7-33 81-73.4 81-40.7 0-73.5-36.3-73.5-81s32.8-81 73.5-81c40.5 0 73.4 36.3 73.4 81z" fill="#3e4347"></path><path d="M256 476.2a70 70 0 0 0 53.3-25.5 34.6 34.6 0 0 0-58-25 34.4 34.4 0 0 0-47.8 26 69.9 69.9 0 0 0 52.6 24.5z" fill="#e24b4b"></path><path d="M290.3 434.8c-1 3.4-5.8 5.2-11 3.9s-8.4-5.1-7.4-8.7c.8-3.3 5.7-5 10.7-3.8 5.1 1.4 8.5 5.3 7.7 8.6z" fill="#fff" opacity=".2">',
  ),
  Kn = () =>
    (() => {
      const r = Fn();
      return N(() => E(r, 'class', F.rating0)), r;
    })(),
  Vn = () =>
    (() => {
      const r = zn();
      return N(() => E(r, 'class', F.rating1)), r;
    })(),
  Wn = () =>
    (() => {
      const r = qn();
      return N(() => E(r, 'class', F.rating2)), r;
    })(),
  Xn = () =>
    (() => {
      const r = Hn();
      return N(() => E(r, 'class', F.rating3)), r;
    })(),
  Yn = () =>
    (() => {
      const r = Jn();
      return N(() => E(r, 'class', F.rating4)), r;
    })(),
  Qn = () =>
    (() => {
      const r = Gn();
      return N(() => E(r, 'class', F.rating5)), r;
    })(),
  Lr = { STYLE_PREFIX: '__commentsplugin__', CONTAINER_ID: 'comments-block' },
  ge = (r) => Lr.STYLE_PREFIX + r,
  Zn = P(
    '<div class="flex items-center justify-center p-2 rounded-md"><div><div><input type="radio" name="rating"><label></label><input type="radio" name="rating"><label></label><input type="radio" name="rating"><label></label><input type="radio" name="rating"><label></label><input type="radio" name="rating"><label></label><div><div>',
  ),
  ei = (r) => {
    const [e, t] = K(-1);
    return (
      st(() => {
        r.onChange && r.onChange(e());
      }),
      (() => {
        const n = Zn(),
          s = n.firstChild,
          i = s.firstChild,
          o = i.firstChild,
          a = o.nextSibling,
          c = a.nextSibling,
          u = c.nextSibling,
          l = u.nextSibling,
          h = l.nextSibling,
          f = h.nextSibling,
          p = f.nextSibling,
          g = p.nextSibling,
          y = g.nextSibling,
          _ = y.nextSibling,
          $ = _.firstChild;
        return (
          (o.$$click = () => t(5)),
          (c.$$click = () => t(4)),
          (l.$$click = () => t(3)),
          (f.$$click = () => t(2)),
          (g.$$click = () => t(1)),
          j($, S(Kn, {}), null),
          j($, S(Vn, {}), null),
          j($, S(Wn, {}), null),
          j($, S(Xn, {}), null),
          j($, S(Yn, {}), null),
          j($, S(Qn, {}), null),
          N(
            (m) => {
              const k = F.feedback,
                x = F.rating,
                M = F.rating5,
                Y = F.rating5,
                Z = F.rating4,
                O = F.rating4,
                D = F.rating3,
                I = F.rating3,
                U = F.rating2,
                Me = F.rating2,
                ve = F.rating1,
                d = F.rating1,
                v = `${F.emoji_wrapper} ${ge('emoji-wrapper')}`,
                w = F.emoji;
              return (
                k !== m._v$ && Ae(s, (m._v$ = k)),
                x !== m._v$2 && Ae(i, (m._v$2 = x)),
                M !== m._v$3 && E(o, 'id', (m._v$3 = M)),
                Y !== m._v$4 && E(a, 'for', (m._v$4 = Y)),
                Z !== m._v$5 && E(c, 'id', (m._v$5 = Z)),
                O !== m._v$6 && E(u, 'for', (m._v$6 = O)),
                D !== m._v$7 && E(l, 'id', (m._v$7 = D)),
                I !== m._v$8 && E(h, 'for', (m._v$8 = I)),
                U !== m._v$9 && E(f, 'id', (m._v$9 = U)),
                Me !== m._v$10 && E(p, 'for', (m._v$10 = Me)),
                ve !== m._v$11 && E(g, 'id', (m._v$11 = ve)),
                d !== m._v$12 && E(y, 'for', (m._v$12 = d)),
                v !== m._v$13 && Ae(_, (m._v$13 = v)),
                w !== m._v$14 && Ae($, (m._v$14 = w)),
                m
              );
            },
            {
              _v$: void 0,
              _v$2: void 0,
              _v$3: void 0,
              _v$4: void 0,
              _v$5: void 0,
              _v$6: void 0,
              _v$7: void 0,
              _v$8: void 0,
              _v$9: void 0,
              _v$10: void 0,
              _v$11: void 0,
              _v$12: void 0,
              _v$13: void 0,
              _v$14: void 0,
            },
          ),
          n
        );
      })()
    );
  };
Ne(['click']);
const ti = 'modulepreload',
  ri = function (r) {
    return '/' + r;
  },
  tr = {},
  at = function (e, t, n) {
    if (!t || t.length === 0) return e();
    const s = document.getElementsByTagName('link');
    return Promise.all(
      t.map((i) => {
        if (((i = ri(i)), i in tr)) return;
        tr[i] = !0;
        const o = i.endsWith('.css'),
          a = o ? '[rel="stylesheet"]' : '';
        if (!!n)
          for (let l = s.length - 1; l >= 0; l--) {
            const h = s[l];
            if (h.href === i && (!o || h.rel === 'stylesheet')) return;
          }
        else if (document.querySelector(`link[href="${i}"]${a}`)) return;
        const u = document.createElement('link');
        if (
          ((u.rel = o ? 'stylesheet' : ti),
          o || ((u.as = 'script'), (u.crossOrigin = '')),
          (u.href = i),
          document.head.appendChild(u),
          o)
        )
          return new Promise((l, h) => {
            u.addEventListener('load', l),
              u.addEventListener('error', () => h(new Error(`Unable to preload CSS for ${i}`)));
          });
      }),
    ).then(() => e());
  };
var ni =
  (globalThis && globalThis.__awaiter) ||
  function (r, e, t, n) {
    function s(i) {
      return i instanceof t
        ? i
        : new t(function (o) {
            o(i);
          });
    }
    return new (t || (t = Promise))(function (i, o) {
      function a(l) {
        try {
          u(n.next(l));
        } catch (h) {
          o(h);
        }
      }
      function c(l) {
        try {
          u(n.throw(l));
        } catch (h) {
          o(h);
        }
      }
      function u(l) {
        l.done ? i(l.value) : s(l.value).then(a, c);
      }
      u((n = n.apply(r, e || [])).next());
    });
  };
const ii = (r) => {
  let e;
  return (
    r
      ? (e = r)
      : typeof fetch > 'u'
      ? (e = (...t) =>
          ni(void 0, void 0, void 0, function* () {
            return yield (yield at(() => Promise.resolve().then(() => lt), void 0)).fetch(...t);
          }))
      : (e = fetch),
    (...t) => e(...t)
  );
};
class Ft extends Error {
  constructor(e, t = 'FunctionsError', n) {
    super(e), (super.name = t), (this.context = n);
  }
}
class si extends Ft {
  constructor(e) {
    super('Failed to send a request to the Edge Function', 'FunctionsFetchError', e);
  }
}
class oi extends Ft {
  constructor(e) {
    super('Relay Error invoking the Edge Function', 'FunctionsRelayError', e);
  }
}
class ai extends Ft {
  constructor(e) {
    super('Edge Function returned a non-2xx status code', 'FunctionsHttpError', e);
  }
}
var li =
  (globalThis && globalThis.__awaiter) ||
  function (r, e, t, n) {
    function s(i) {
      return i instanceof t
        ? i
        : new t(function (o) {
            o(i);
          });
    }
    return new (t || (t = Promise))(function (i, o) {
      function a(l) {
        try {
          u(n.next(l));
        } catch (h) {
          o(h);
        }
      }
      function c(l) {
        try {
          u(n.throw(l));
        } catch (h) {
          o(h);
        }
      }
      function u(l) {
        l.done ? i(l.value) : s(l.value).then(a, c);
      }
      u((n = n.apply(r, e || [])).next());
    });
  };
class ci {
  constructor(e, { headers: t = {}, customFetch: n } = {}) {
    (this.url = e), (this.headers = t), (this.fetch = ii(n));
  }
  setAuth(e) {
    this.headers.Authorization = `Bearer ${e}`;
  }
  invoke(e, t = {}) {
    var n;
    return li(this, void 0, void 0, function* () {
      try {
        const { headers: s, method: i, body: o } = t;
        let a = {},
          c;
        o &&
          ((s && !Object.prototype.hasOwnProperty.call(s, 'Content-Type')) || !s) &&
          ((typeof Blob < 'u' && o instanceof Blob) || o instanceof ArrayBuffer
            ? ((a['Content-Type'] = 'application/octet-stream'), (c = o))
            : typeof o == 'string'
            ? ((a['Content-Type'] = 'text/plain'), (c = o))
            : typeof FormData < 'u' && o instanceof FormData
            ? (c = o)
            : ((a['Content-Type'] = 'application/json'), (c = JSON.stringify(o))));
        const u = yield this.fetch(`${this.url}/${e}`, {
            method: i || 'POST',
            headers: Object.assign(Object.assign(Object.assign({}, a), this.headers), s),
            body: c,
          }).catch((p) => {
            throw new si(p);
          }),
          l = u.headers.get('x-relay-error');
        if (l && l === 'true') throw new oi(u);
        if (!u.ok) throw new ai(u);
        let h = ((n = u.headers.get('Content-Type')) !== null && n !== void 0 ? n : 'text/plain')
            .split(';')[0]
            .trim(),
          f;
        return (
          h === 'application/json'
            ? (f = yield u.json())
            : h === 'application/octet-stream'
            ? (f = yield u.blob())
            : h === 'multipart/form-data'
            ? (f = yield u.formData())
            : (f = yield u.text()),
          { data: f, error: null }
        );
      } catch (s) {
        return { data: null, error: s };
      }
    });
  }
}
var ui =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {};
function hi(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, 'default') ? r.default : r;
}
var jt = { exports: {} };
(function (r, e) {
  var t = typeof self < 'u' ? self : ui,
    n = (function () {
      function i() {
        (this.fetch = !1), (this.DOMException = t.DOMException);
      }
      return (i.prototype = t), new i();
    })();
  (function (i) {
    (function (o) {
      var a = {
        searchParams: 'URLSearchParams' in i,
        iterable: 'Symbol' in i && 'iterator' in Symbol,
        blob:
          'FileReader' in i &&
          'Blob' in i &&
          (function () {
            try {
              return new Blob(), !0;
            } catch {
              return !1;
            }
          })(),
        formData: 'FormData' in i,
        arrayBuffer: 'ArrayBuffer' in i,
      };
      function c(d) {
        return d && DataView.prototype.isPrototypeOf(d);
      }
      if (a.arrayBuffer)
        var u = [
            '[object Int8Array]',
            '[object Uint8Array]',
            '[object Uint8ClampedArray]',
            '[object Int16Array]',
            '[object Uint16Array]',
            '[object Int32Array]',
            '[object Uint32Array]',
            '[object Float32Array]',
            '[object Float64Array]',
          ],
          l =
            ArrayBuffer.isView ||
            function (d) {
              return d && u.indexOf(Object.prototype.toString.call(d)) > -1;
            };
      function h(d) {
        if ((typeof d != 'string' && (d = String(d)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(d)))
          throw new TypeError('Invalid character in header field name');
        return d.toLowerCase();
      }
      function f(d) {
        return typeof d != 'string' && (d = String(d)), d;
      }
      function p(d) {
        var v = {
          next: function () {
            var w = d.shift();
            return { done: w === void 0, value: w };
          },
        };
        return (
          a.iterable &&
            (v[Symbol.iterator] = function () {
              return v;
            }),
          v
        );
      }
      function g(d) {
        (this.map = {}),
          d instanceof g
            ? d.forEach(function (v, w) {
                this.append(w, v);
              }, this)
            : Array.isArray(d)
            ? d.forEach(function (v) {
                this.append(v[0], v[1]);
              }, this)
            : d &&
              Object.getOwnPropertyNames(d).forEach(function (v) {
                this.append(v, d[v]);
              }, this);
      }
      (g.prototype.append = function (d, v) {
        (d = h(d)), (v = f(v));
        var w = this.map[d];
        this.map[d] = w ? w + ', ' + v : v;
      }),
        (g.prototype.delete = function (d) {
          delete this.map[h(d)];
        }),
        (g.prototype.get = function (d) {
          return (d = h(d)), this.has(d) ? this.map[d] : null;
        }),
        (g.prototype.has = function (d) {
          return this.map.hasOwnProperty(h(d));
        }),
        (g.prototype.set = function (d, v) {
          this.map[h(d)] = f(v);
        }),
        (g.prototype.forEach = function (d, v) {
          for (var w in this.map) this.map.hasOwnProperty(w) && d.call(v, this.map[w], w, this);
        }),
        (g.prototype.keys = function () {
          var d = [];
          return (
            this.forEach(function (v, w) {
              d.push(w);
            }),
            p(d)
          );
        }),
        (g.prototype.values = function () {
          var d = [];
          return (
            this.forEach(function (v) {
              d.push(v);
            }),
            p(d)
          );
        }),
        (g.prototype.entries = function () {
          var d = [];
          return (
            this.forEach(function (v, w) {
              d.push([w, v]);
            }),
            p(d)
          );
        }),
        a.iterable && (g.prototype[Symbol.iterator] = g.prototype.entries);
      function y(d) {
        if (d.bodyUsed) return Promise.reject(new TypeError('Already read'));
        d.bodyUsed = !0;
      }
      function _(d) {
        return new Promise(function (v, w) {
          (d.onload = function () {
            v(d.result);
          }),
            (d.onerror = function () {
              w(d.error);
            });
        });
      }
      function $(d) {
        var v = new FileReader(),
          w = _(v);
        return v.readAsArrayBuffer(d), w;
      }
      function m(d) {
        var v = new FileReader(),
          w = _(v);
        return v.readAsText(d), w;
      }
      function k(d) {
        for (var v = new Uint8Array(d), w = new Array(v.length), q = 0; q < v.length; q++)
          w[q] = String.fromCharCode(v[q]);
        return w.join('');
      }
      function x(d) {
        if (d.slice) return d.slice(0);
        var v = new Uint8Array(d.byteLength);
        return v.set(new Uint8Array(d)), v.buffer;
      }
      function M() {
        return (
          (this.bodyUsed = !1),
          (this._initBody = function (d) {
            (this._bodyInit = d),
              d
                ? typeof d == 'string'
                  ? (this._bodyText = d)
                  : a.blob && Blob.prototype.isPrototypeOf(d)
                  ? (this._bodyBlob = d)
                  : a.formData && FormData.prototype.isPrototypeOf(d)
                  ? (this._bodyFormData = d)
                  : a.searchParams && URLSearchParams.prototype.isPrototypeOf(d)
                  ? (this._bodyText = d.toString())
                  : a.arrayBuffer && a.blob && c(d)
                  ? ((this._bodyArrayBuffer = x(d.buffer)),
                    (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                  : a.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(d) || l(d))
                  ? (this._bodyArrayBuffer = x(d))
                  : (this._bodyText = d = Object.prototype.toString.call(d))
                : (this._bodyText = ''),
              this.headers.get('content-type') ||
                (typeof d == 'string'
                  ? this.headers.set('content-type', 'text/plain;charset=UTF-8')
                  : this._bodyBlob && this._bodyBlob.type
                  ? this.headers.set('content-type', this._bodyBlob.type)
                  : a.searchParams &&
                    URLSearchParams.prototype.isPrototypeOf(d) &&
                    this.headers.set(
                      'content-type',
                      'application/x-www-form-urlencoded;charset=UTF-8',
                    ));
          }),
          a.blob &&
            ((this.blob = function () {
              var d = y(this);
              if (d) return d;
              if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
              if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              if (this._bodyFormData) throw new Error('could not read FormData body as blob');
              return Promise.resolve(new Blob([this._bodyText]));
            }),
            (this.arrayBuffer = function () {
              return this._bodyArrayBuffer
                ? y(this) || Promise.resolve(this._bodyArrayBuffer)
                : this.blob().then($);
            })),
          (this.text = function () {
            var d = y(this);
            if (d) return d;
            if (this._bodyBlob) return m(this._bodyBlob);
            if (this._bodyArrayBuffer) return Promise.resolve(k(this._bodyArrayBuffer));
            if (this._bodyFormData) throw new Error('could not read FormData body as text');
            return Promise.resolve(this._bodyText);
          }),
          a.formData &&
            (this.formData = function () {
              return this.text().then(D);
            }),
          (this.json = function () {
            return this.text().then(JSON.parse);
          }),
          this
        );
      }
      var Y = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
      function Z(d) {
        var v = d.toUpperCase();
        return Y.indexOf(v) > -1 ? v : d;
      }
      function O(d, v) {
        v = v || {};
        var w = v.body;
        if (d instanceof O) {
          if (d.bodyUsed) throw new TypeError('Already read');
          (this.url = d.url),
            (this.credentials = d.credentials),
            v.headers || (this.headers = new g(d.headers)),
            (this.method = d.method),
            (this.mode = d.mode),
            (this.signal = d.signal),
            !w && d._bodyInit != null && ((w = d._bodyInit), (d.bodyUsed = !0));
        } else this.url = String(d);
        if (
          ((this.credentials = v.credentials || this.credentials || 'same-origin'),
          (v.headers || !this.headers) && (this.headers = new g(v.headers)),
          (this.method = Z(v.method || this.method || 'GET')),
          (this.mode = v.mode || this.mode || null),
          (this.signal = v.signal || this.signal),
          (this.referrer = null),
          (this.method === 'GET' || this.method === 'HEAD') && w)
        )
          throw new TypeError('Body not allowed for GET or HEAD requests');
        this._initBody(w);
      }
      O.prototype.clone = function () {
        return new O(this, { body: this._bodyInit });
      };
      function D(d) {
        var v = new FormData();
        return (
          d
            .trim()
            .split('&')
            .forEach(function (w) {
              if (w) {
                var q = w.split('='),
                  z = q.shift().replace(/\+/g, ' '),
                  C = q.join('=').replace(/\+/g, ' ');
                v.append(decodeURIComponent(z), decodeURIComponent(C));
              }
            }),
          v
        );
      }
      function I(d) {
        var v = new g(),
          w = d.replace(/\r?\n[\t ]+/g, ' ');
        return (
          w.split(/\r?\n/).forEach(function (q) {
            var z = q.split(':'),
              C = z.shift().trim();
            if (C) {
              var Be = z.join(':').trim();
              v.append(C, Be);
            }
          }),
          v
        );
      }
      M.call(O.prototype);
      function U(d, v) {
        v || (v = {}),
          (this.type = 'default'),
          (this.status = v.status === void 0 ? 200 : v.status),
          (this.ok = this.status >= 200 && this.status < 300),
          (this.statusText = 'statusText' in v ? v.statusText : 'OK'),
          (this.headers = new g(v.headers)),
          (this.url = v.url || ''),
          this._initBody(d);
      }
      M.call(U.prototype),
        (U.prototype.clone = function () {
          return new U(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new g(this.headers),
            url: this.url,
          });
        }),
        (U.error = function () {
          var d = new U(null, { status: 0, statusText: '' });
          return (d.type = 'error'), d;
        });
      var Me = [301, 302, 303, 307, 308];
      (U.redirect = function (d, v) {
        if (Me.indexOf(v) === -1) throw new RangeError('Invalid status code');
        return new U(null, { status: v, headers: { location: d } });
      }),
        (o.DOMException = i.DOMException);
      try {
        new o.DOMException();
      } catch {
        (o.DOMException = function (v, w) {
          (this.message = v), (this.name = w);
          var q = Error(v);
          this.stack = q.stack;
        }),
          (o.DOMException.prototype = Object.create(Error.prototype)),
          (o.DOMException.prototype.constructor = o.DOMException);
      }
      function ve(d, v) {
        return new Promise(function (w, q) {
          var z = new O(d, v);
          if (z.signal && z.signal.aborted) return q(new o.DOMException('Aborted', 'AbortError'));
          var C = new XMLHttpRequest();
          function Be() {
            C.abort();
          }
          (C.onload = function () {
            var Te = {
              status: C.status,
              statusText: C.statusText,
              headers: I(C.getAllResponseHeaders() || ''),
            };
            Te.url = 'responseURL' in C ? C.responseURL : Te.headers.get('X-Request-URL');
            var ht = 'response' in C ? C.response : C.responseText;
            w(new U(ht, Te));
          }),
            (C.onerror = function () {
              q(new TypeError('Network request failed'));
            }),
            (C.ontimeout = function () {
              q(new TypeError('Network request failed'));
            }),
            (C.onabort = function () {
              q(new o.DOMException('Aborted', 'AbortError'));
            }),
            C.open(z.method, z.url, !0),
            z.credentials === 'include'
              ? (C.withCredentials = !0)
              : z.credentials === 'omit' && (C.withCredentials = !1),
            'responseType' in C && a.blob && (C.responseType = 'blob'),
            z.headers.forEach(function (Te, ht) {
              C.setRequestHeader(ht, Te);
            }),
            z.signal &&
              (z.signal.addEventListener('abort', Be),
              (C.onreadystatechange = function () {
                C.readyState === 4 && z.signal.removeEventListener('abort', Be);
              })),
            C.send(typeof z._bodyInit > 'u' ? null : z._bodyInit);
        });
      }
      return (
        (ve.polyfill = !0),
        i.fetch || ((i.fetch = ve), (i.Headers = g), (i.Request = O), (i.Response = U)),
        (o.Headers = g),
        (o.Request = O),
        (o.Response = U),
        (o.fetch = ve),
        Object.defineProperty(o, '__esModule', { value: !0 }),
        o
      );
    })({});
  })(n),
    (n.fetch.ponyfill = !0),
    delete n.fetch.polyfill;
  var s = n;
  (e = s.fetch),
    (e.default = s.fetch),
    (e.fetch = s.fetch),
    (e.Headers = s.Headers),
    (e.Request = s.Request),
    (e.Response = s.Response),
    (r.exports = e);
})(jt, jt.exports);
var zt = jt.exports;
const qt = hi(zt),
  lt = Vr({ __proto__: null, default: qt }, [zt]);
class di {
  constructor(e) {
    (this.shouldThrowOnError = !1),
      (this.method = e.method),
      (this.url = e.url),
      (this.headers = e.headers),
      (this.schema = e.schema),
      (this.body = e.body),
      (this.shouldThrowOnError = e.shouldThrowOnError),
      (this.signal = e.signal),
      (this.isMaybeSingle = e.isMaybeSingle),
      e.fetch
        ? (this.fetch = e.fetch)
        : typeof fetch > 'u'
        ? (this.fetch = qt)
        : (this.fetch = fetch);
  }
  throwOnError() {
    return (this.shouldThrowOnError = !0), this;
  }
  then(e, t) {
    this.schema === void 0 ||
      (['GET', 'HEAD'].includes(this.method)
        ? (this.headers['Accept-Profile'] = this.schema)
        : (this.headers['Content-Profile'] = this.schema)),
      this.method !== 'GET' &&
        this.method !== 'HEAD' &&
        (this.headers['Content-Type'] = 'application/json');
    const n = this.fetch;
    let s = n(this.url.toString(), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      signal: this.signal,
    }).then(async (i) => {
      var o, a, c;
      let u = null,
        l = null,
        h = null,
        f = i.status,
        p = i.statusText;
      if (i.ok) {
        if (this.method !== 'HEAD') {
          const $ = await i.text();
          $ === '' ||
            (this.headers.Accept === 'text/csv' ||
            (this.headers.Accept && this.headers.Accept.includes('application/vnd.pgrst.plan+text'))
              ? (l = $)
              : (l = JSON.parse($)));
        }
        const y =
            (o = this.headers.Prefer) === null || o === void 0
              ? void 0
              : o.match(/count=(exact|planned|estimated)/),
          _ = (a = i.headers.get('content-range')) === null || a === void 0 ? void 0 : a.split('/');
        y && _ && _.length > 1 && (h = parseInt(_[1])),
          this.isMaybeSingle &&
            this.method === 'GET' &&
            Array.isArray(l) &&
            (l.length > 1
              ? ((u = {
                  code: 'PGRST116',
                  details: `Results contain ${l.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                  hint: null,
                  message: 'JSON object requested, multiple (or no) rows returned',
                }),
                (l = null),
                (h = null),
                (f = 406),
                (p = 'Not Acceptable'))
              : l.length === 1
              ? (l = l[0])
              : (l = null));
      } else {
        const y = await i.text();
        try {
          (u = JSON.parse(y)),
            Array.isArray(u) && i.status === 404 && ((l = []), (u = null), (f = 200), (p = 'OK'));
        } catch {
          i.status === 404 && y === '' ? ((f = 204), (p = 'No Content')) : (u = { message: y });
        }
        if (
          (u &&
            this.isMaybeSingle &&
            !((c = u?.details) === null || c === void 0) &&
            c.includes('Results contain 0 rows') &&
            ((u = null), (f = 200), (p = 'OK')),
          u && this.shouldThrowOnError)
        )
          throw u;
      }
      return { error: u, data: l, count: h, status: f, statusText: p };
    });
    return (
      this.shouldThrowOnError ||
        (s = s.catch((i) => {
          var o, a, c;
          return {
            error: {
              message: `${(o = i?.name) !== null && o !== void 0 ? o : 'FetchError'}: ${
                i?.message
              }`,
              details: `${(a = i?.stack) !== null && a !== void 0 ? a : ''}`,
              hint: '',
              code: `${(c = i?.code) !== null && c !== void 0 ? c : ''}`,
            },
            data: null,
            count: null,
            status: 0,
            statusText: '',
          };
        })),
      s.then(e, t)
    );
  }
}
class fi extends di {
  select(e) {
    let t = !1;
    const n = (e ?? '*')
      .split('')
      .map((s) => (/\s/.test(s) && !t ? '' : (s === '"' && (t = !t), s)))
      .join('');
    return (
      this.url.searchParams.set('select', n),
      this.headers.Prefer && (this.headers.Prefer += ','),
      (this.headers.Prefer += 'return=representation'),
      this
    );
  }
  order(e, { ascending: t = !0, nullsFirst: n, foreignTable: s } = {}) {
    const i = s ? `${s}.order` : 'order',
      o = this.url.searchParams.get(i);
    return (
      this.url.searchParams.set(
        i,
        `${o ? `${o},` : ''}${e}.${t ? 'asc' : 'desc'}${
          n === void 0 ? '' : n ? '.nullsfirst' : '.nullslast'
        }`,
      ),
      this
    );
  }
  limit(e, { foreignTable: t } = {}) {
    const n = typeof t > 'u' ? 'limit' : `${t}.limit`;
    return this.url.searchParams.set(n, `${e}`), this;
  }
  range(e, t, { foreignTable: n } = {}) {
    const s = typeof n > 'u' ? 'offset' : `${n}.offset`,
      i = typeof n > 'u' ? 'limit' : `${n}.limit`;
    return this.url.searchParams.set(s, `${e}`), this.url.searchParams.set(i, `${t - e + 1}`), this;
  }
  abortSignal(e) {
    return (this.signal = e), this;
  }
  single() {
    return (this.headers.Accept = 'application/vnd.pgrst.object+json'), this;
  }
  maybeSingle() {
    return (
      this.method === 'GET'
        ? (this.headers.Accept = 'application/json')
        : (this.headers.Accept = 'application/vnd.pgrst.object+json'),
      (this.isMaybeSingle = !0),
      this
    );
  }
  csv() {
    return (this.headers.Accept = 'text/csv'), this;
  }
  geojson() {
    return (this.headers.Accept = 'application/geo+json'), this;
  }
  explain({
    analyze: e = !1,
    verbose: t = !1,
    settings: n = !1,
    buffers: s = !1,
    wal: i = !1,
    format: o = 'text',
  } = {}) {
    const a = [
        e ? 'analyze' : null,
        t ? 'verbose' : null,
        n ? 'settings' : null,
        s ? 'buffers' : null,
        i ? 'wal' : null,
      ]
        .filter(Boolean)
        .join('|'),
      c = this.headers.Accept;
    return (
      (this.headers.Accept = `application/vnd.pgrst.plan+${o}; for="${c}"; options=${a};`),
      o === 'json' ? this : this
    );
  }
  rollback() {
    var e;
    return (
      ((e = this.headers.Prefer) !== null && e !== void 0 ? e : '').trim().length > 0
        ? (this.headers.Prefer += ',tx=rollback')
        : (this.headers.Prefer = 'tx=rollback'),
      this
    );
  }
  returns() {
    return this;
  }
}
class we extends fi {
  eq(e, t) {
    return this.url.searchParams.append(e, `eq.${t}`), this;
  }
  neq(e, t) {
    return this.url.searchParams.append(e, `neq.${t}`), this;
  }
  gt(e, t) {
    return this.url.searchParams.append(e, `gt.${t}`), this;
  }
  gte(e, t) {
    return this.url.searchParams.append(e, `gte.${t}`), this;
  }
  lt(e, t) {
    return this.url.searchParams.append(e, `lt.${t}`), this;
  }
  lte(e, t) {
    return this.url.searchParams.append(e, `lte.${t}`), this;
  }
  like(e, t) {
    return this.url.searchParams.append(e, `like.${t}`), this;
  }
  likeAllOf(e, t) {
    return this.url.searchParams.append(e, `like(all).{${t.join(',')}}`), this;
  }
  likeAnyOf(e, t) {
    return this.url.searchParams.append(e, `like(any).{${t.join(',')}}`), this;
  }
  ilike(e, t) {
    return this.url.searchParams.append(e, `ilike.${t}`), this;
  }
  ilikeAllOf(e, t) {
    return this.url.searchParams.append(e, `ilike(all).{${t.join(',')}}`), this;
  }
  ilikeAnyOf(e, t) {
    return this.url.searchParams.append(e, `ilike(any).{${t.join(',')}}`), this;
  }
  is(e, t) {
    return this.url.searchParams.append(e, `is.${t}`), this;
  }
  in(e, t) {
    const n = t
      .map((s) => (typeof s == 'string' && new RegExp('[,()]').test(s) ? `"${s}"` : `${s}`))
      .join(',');
    return this.url.searchParams.append(e, `in.(${n})`), this;
  }
  contains(e, t) {
    return (
      typeof t == 'string'
        ? this.url.searchParams.append(e, `cs.${t}`)
        : Array.isArray(t)
        ? this.url.searchParams.append(e, `cs.{${t.join(',')}}`)
        : this.url.searchParams.append(e, `cs.${JSON.stringify(t)}`),
      this
    );
  }
  containedBy(e, t) {
    return (
      typeof t == 'string'
        ? this.url.searchParams.append(e, `cd.${t}`)
        : Array.isArray(t)
        ? this.url.searchParams.append(e, `cd.{${t.join(',')}}`)
        : this.url.searchParams.append(e, `cd.${JSON.stringify(t)}`),
      this
    );
  }
  rangeGt(e, t) {
    return this.url.searchParams.append(e, `sr.${t}`), this;
  }
  rangeGte(e, t) {
    return this.url.searchParams.append(e, `nxl.${t}`), this;
  }
  rangeLt(e, t) {
    return this.url.searchParams.append(e, `sl.${t}`), this;
  }
  rangeLte(e, t) {
    return this.url.searchParams.append(e, `nxr.${t}`), this;
  }
  rangeAdjacent(e, t) {
    return this.url.searchParams.append(e, `adj.${t}`), this;
  }
  overlaps(e, t) {
    return (
      typeof t == 'string'
        ? this.url.searchParams.append(e, `ov.${t}`)
        : this.url.searchParams.append(e, `ov.{${t.join(',')}}`),
      this
    );
  }
  textSearch(e, t, { config: n, type: s } = {}) {
    let i = '';
    s === 'plain' ? (i = 'pl') : s === 'phrase' ? (i = 'ph') : s === 'websearch' && (i = 'w');
    const o = n === void 0 ? '' : `(${n})`;
    return this.url.searchParams.append(e, `${i}fts${o}.${t}`), this;
  }
  match(e) {
    return (
      Object.entries(e).forEach(([t, n]) => {
        this.url.searchParams.append(t, `eq.${n}`);
      }),
      this
    );
  }
  not(e, t, n) {
    return this.url.searchParams.append(e, `not.${t}.${n}`), this;
  }
  or(e, { foreignTable: t } = {}) {
    const n = t ? `${t}.or` : 'or';
    return this.url.searchParams.append(n, `(${e})`), this;
  }
  filter(e, t, n) {
    return this.url.searchParams.append(e, `${t}.${n}`), this;
  }
}
class gi {
  constructor(e, { headers: t = {}, schema: n, fetch: s }) {
    (this.url = e), (this.headers = t), (this.schema = n), (this.fetch = s);
  }
  select(e, { head: t = !1, count: n } = {}) {
    const s = t ? 'HEAD' : 'GET';
    let i = !1;
    const o = (e ?? '*')
      .split('')
      .map((a) => (/\s/.test(a) && !i ? '' : (a === '"' && (i = !i), a)))
      .join('');
    return (
      this.url.searchParams.set('select', o),
      n && (this.headers.Prefer = `count=${n}`),
      new we({
        method: s,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        fetch: this.fetch,
        allowEmpty: !1,
      })
    );
  }
  insert(e, { count: t, defaultToNull: n = !0 } = {}) {
    const s = 'POST',
      i = [];
    if (
      (this.headers.Prefer && i.push(this.headers.Prefer),
      t && i.push(`count=${t}`),
      n || i.push('missing=default'),
      (this.headers.Prefer = i.join(',')),
      Array.isArray(e))
    ) {
      const o = e.reduce((a, c) => a.concat(Object.keys(c)), []);
      if (o.length > 0) {
        const a = [...new Set(o)].map((c) => `"${c}"`);
        this.url.searchParams.set('columns', a.join(','));
      }
    }
    return new we({
      method: s,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: e,
      fetch: this.fetch,
      allowEmpty: !1,
    });
  }
  upsert(e, { onConflict: t, ignoreDuplicates: n = !1, count: s, defaultToNull: i = !0 } = {}) {
    const o = 'POST',
      a = [`resolution=${n ? 'ignore' : 'merge'}-duplicates`];
    if (
      (t !== void 0 && this.url.searchParams.set('on_conflict', t),
      this.headers.Prefer && a.push(this.headers.Prefer),
      s && a.push(`count=${s}`),
      i || a.push('missing=default'),
      (this.headers.Prefer = a.join(',')),
      Array.isArray(e))
    ) {
      const c = e.reduce((u, l) => u.concat(Object.keys(l)), []);
      if (c.length > 0) {
        const u = [...new Set(c)].map((l) => `"${l}"`);
        this.url.searchParams.set('columns', u.join(','));
      }
    }
    return new we({
      method: o,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: e,
      fetch: this.fetch,
      allowEmpty: !1,
    });
  }
  update(e, { count: t } = {}) {
    const n = 'PATCH',
      s = [];
    return (
      this.headers.Prefer && s.push(this.headers.Prefer),
      t && s.push(`count=${t}`),
      (this.headers.Prefer = s.join(',')),
      new we({
        method: n,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: e,
        fetch: this.fetch,
        allowEmpty: !1,
      })
    );
  }
  delete({ count: e } = {}) {
    const t = 'DELETE',
      n = [];
    return (
      e && n.push(`count=${e}`),
      this.headers.Prefer && n.unshift(this.headers.Prefer),
      (this.headers.Prefer = n.join(',')),
      new we({
        method: t,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        fetch: this.fetch,
        allowEmpty: !1,
      })
    );
  }
}
const pi = '1.7.0',
  vi = { 'X-Client-Info': `postgrest-js/${pi}` };
class yi {
  constructor(e, { headers: t = {}, schema: n, fetch: s } = {}) {
    (this.url = e),
      (this.headers = Object.assign(Object.assign({}, vi), t)),
      (this.schema = n),
      (this.fetch = s);
  }
  from(e) {
    const t = new URL(`${this.url}/${e}`);
    return new gi(t, {
      headers: Object.assign({}, this.headers),
      schema: this.schema,
      fetch: this.fetch,
    });
  }
  rpc(e, t = {}, { head: n = !1, count: s } = {}) {
    let i;
    const o = new URL(`${this.url}/rpc/${e}`);
    let a;
    n
      ? ((i = 'HEAD'),
        Object.entries(t).forEach(([u, l]) => {
          o.searchParams.append(u, `${l}`);
        }))
      : ((i = 'POST'), (a = t));
    const c = Object.assign({}, this.headers);
    return (
      s && (c.Prefer = `count=${s}`),
      new we({
        method: i,
        url: o,
        headers: c,
        schema: this.schema,
        body: a,
        fetch: this.fetch,
        allowEmpty: !1,
      })
    );
  }
}
var pt, rr;
function mi() {
  if (rr) return pt;
  rr = 1;
  var r = function () {
    if (typeof self == 'object' && self) return self;
    if (typeof window == 'object' && window) return window;
    throw new Error('Unable to resolve global `this`');
  };
  return (
    (pt = (function () {
      if (this) return this;
      if (typeof globalThis == 'object' && globalThis) return globalThis;
      try {
        Object.defineProperty(Object.prototype, '__global__', {
          get: function () {
            return this;
          },
          configurable: !0,
        });
      } catch {
        return r();
      }
      try {
        return __global__ || r();
      } finally {
        delete Object.prototype.__global__;
      }
    })()),
    pt
  );
}
const _i = 'websocket',
  bi =
    'Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.',
  wi = [
    'websocket',
    'websockets',
    'socket',
    'networking',
    'comet',
    'push',
    'RFC-6455',
    'realtime',
    'server',
    'client',
  ],
  $i = 'Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)',
  xi = ['Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)'],
  Si = '1.0.34',
  Oi = { type: 'git', url: 'https://github.com/theturtle32/WebSocket-Node.git' },
  Ti = 'https://github.com/theturtle32/WebSocket-Node',
  Ei = { node: '>=4.0.0' },
  ki = {
    bufferutil: '^4.0.1',
    debug: '^2.2.0',
    'es5-ext': '^0.10.50',
    'typedarray-to-buffer': '^3.1.5',
    'utf-8-validate': '^5.0.2',
    yaeti: '^0.0.6',
  },
  Ai = {
    'buffer-equal': '^1.0.0',
    gulp: '^4.0.2',
    'gulp-jshint': '^2.0.4',
    'jshint-stylish': '^2.2.1',
    jshint: '^2.0.0',
    tape: '^4.9.1',
  },
  ji = { verbose: !1 },
  Pi = { test: 'tape test/unit/*.js', gulp: 'gulp' },
  Ci = 'index',
  Ri = { lib: './lib' },
  Ii = 'lib/browser.js',
  Di = 'Apache-2.0',
  Li = {
    name: _i,
    description: bi,
    keywords: wi,
    author: $i,
    contributors: xi,
    version: Si,
    repository: Oi,
    homepage: Ti,
    engines: Ei,
    dependencies: ki,
    devDependencies: Ai,
    config: ji,
    scripts: Pi,
    main: Ci,
    directories: Ri,
    browser: Ii,
    license: Di,
  };
var Ui = Li.version,
  he;
if (typeof globalThis == 'object') he = globalThis;
else
  try {
    he = mi();
  } catch {
  } finally {
    if ((!he && typeof window < 'u' && (he = window), !he))
      throw new Error('Could not determine global this');
  }
var Le = he.WebSocket || he.MozWebSocket,
  Ni = Ui;
function Ur(r, e) {
  var t;
  return e ? (t = new Le(r, e)) : (t = new Le(r)), t;
}
Le &&
  ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function (r) {
    Object.defineProperty(Ur, r, {
      get: function () {
        return Le[r];
      },
    });
  });
var Mi = { w3cwebsocket: Le ? Ur : null, version: Ni };
const Bi = '2.7.2',
  Fi = { 'X-Client-Info': `realtime-js/${Bi}` },
  zi = '1.0.0',
  Nr = 1e4,
  qi = 1e3;
var Ce;
(function (r) {
  (r[(r.connecting = 0)] = 'connecting'),
    (r[(r.open = 1)] = 'open'),
    (r[(r.closing = 2)] = 'closing'),
    (r[(r.closed = 3)] = 'closed');
})(Ce || (Ce = {}));
var X;
(function (r) {
  (r.closed = 'closed'),
    (r.errored = 'errored'),
    (r.joined = 'joined'),
    (r.joining = 'joining'),
    (r.leaving = 'leaving');
})(X || (X = {}));
var ee;
(function (r) {
  (r.close = 'phx_close'),
    (r.error = 'phx_error'),
    (r.join = 'phx_join'),
    (r.reply = 'phx_reply'),
    (r.leave = 'phx_leave'),
    (r.access_token = 'access_token');
})(ee || (ee = {}));
var Pt;
(function (r) {
  r.websocket = 'websocket';
})(Pt || (Pt = {}));
var de;
(function (r) {
  (r.Connecting = 'connecting'), (r.Open = 'open'), (r.Closing = 'closing'), (r.Closed = 'closed');
})(de || (de = {}));
class Mr {
  constructor(e, t) {
    (this.callback = e),
      (this.timerCalc = t),
      (this.timer = void 0),
      (this.tries = 0),
      (this.callback = e),
      (this.timerCalc = t);
  }
  reset() {
    (this.tries = 0), clearTimeout(this.timer);
  }
  scheduleTimeout() {
    clearTimeout(this.timer),
      (this.timer = setTimeout(() => {
        (this.tries = this.tries + 1), this.callback();
      }, this.timerCalc(this.tries + 1)));
  }
}
class Hi {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(e, t) {
    return e.constructor === ArrayBuffer
      ? t(this._binaryDecode(e))
      : t(typeof e == 'string' ? JSON.parse(e) : {});
  }
  _binaryDecode(e) {
    const t = new DataView(e),
      n = new TextDecoder();
    return this._decodeBroadcast(e, t, n);
  }
  _decodeBroadcast(e, t, n) {
    const s = t.getUint8(1),
      i = t.getUint8(2);
    let o = this.HEADER_LENGTH + 2;
    const a = n.decode(e.slice(o, o + s));
    o = o + s;
    const c = n.decode(e.slice(o, o + i));
    o = o + i;
    const u = JSON.parse(n.decode(e.slice(o, e.byteLength)));
    return { ref: null, topic: a, event: c, payload: u };
  }
}
class vt {
  constructor(e, t, n = {}, s = Nr) {
    (this.channel = e),
      (this.event = t),
      (this.payload = n),
      (this.timeout = s),
      (this.sent = !1),
      (this.timeoutTimer = void 0),
      (this.ref = ''),
      (this.receivedResp = null),
      (this.recHooks = []),
      (this.refEvent = null),
      (this.rateLimited = !1);
  }
  resend(e) {
    (this.timeout = e),
      this._cancelRefEvent(),
      (this.ref = ''),
      (this.refEvent = null),
      (this.receivedResp = null),
      (this.sent = !1),
      this.send();
  }
  send() {
    if (this._hasReceived('timeout')) return;
    this.startTimeout(),
      (this.sent = !0),
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload,
        ref: this.ref,
        join_ref: this.channel._joinRef(),
      }) === 'rate limited' && (this.rateLimited = !0);
  }
  updatePayload(e) {
    this.payload = Object.assign(Object.assign({}, this.payload), e);
  }
  receive(e, t) {
    var n;
    return (
      this._hasReceived(e) &&
        t((n = this.receivedResp) === null || n === void 0 ? void 0 : n.response),
      this.recHooks.push({ status: e, callback: t }),
      this
    );
  }
  startTimeout() {
    if (this.timeoutTimer) return;
    (this.ref = this.channel.socket._makeRef()),
      (this.refEvent = this.channel._replyEventName(this.ref));
    const e = (t) => {
      this._cancelRefEvent(), this._cancelTimeout(), (this.receivedResp = t), this._matchReceive(t);
    };
    this.channel._on(this.refEvent, {}, e),
      (this.timeoutTimer = setTimeout(() => {
        this.trigger('timeout', {});
      }, this.timeout));
  }
  trigger(e, t) {
    this.refEvent && this.channel._trigger(this.refEvent, { status: e, response: t });
  }
  destroy() {
    this._cancelRefEvent(), this._cancelTimeout();
  }
  _cancelRefEvent() {
    this.refEvent && this.channel._off(this.refEvent, {});
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer), (this.timeoutTimer = void 0);
  }
  _matchReceive({ status: e, response: t }) {
    this.recHooks.filter((n) => n.status === e).forEach((n) => n.callback(t));
  }
  _hasReceived(e) {
    return this.receivedResp && this.receivedResp.status === e;
  }
}
var nr;
(function (r) {
  (r.SYNC = 'sync'), (r.JOIN = 'join'), (r.LEAVE = 'leave');
})(nr || (nr = {}));
class Re {
  constructor(e, t) {
    (this.channel = e),
      (this.state = {}),
      (this.pendingDiffs = []),
      (this.joinRef = null),
      (this.caller = { onJoin: () => {}, onLeave: () => {}, onSync: () => {} });
    const n = t?.events || { state: 'presence_state', diff: 'presence_diff' };
    this.channel._on(n.state, {}, (s) => {
      const { onJoin: i, onLeave: o, onSync: a } = this.caller;
      (this.joinRef = this.channel._joinRef()),
        (this.state = Re.syncState(this.state, s, i, o)),
        this.pendingDiffs.forEach((c) => {
          this.state = Re.syncDiff(this.state, c, i, o);
        }),
        (this.pendingDiffs = []),
        a();
    }),
      this.channel._on(n.diff, {}, (s) => {
        const { onJoin: i, onLeave: o, onSync: a } = this.caller;
        this.inPendingSyncState()
          ? this.pendingDiffs.push(s)
          : ((this.state = Re.syncDiff(this.state, s, i, o)), a());
      }),
      this.onJoin((s, i, o) => {
        this.channel._trigger('presence', {
          event: 'join',
          key: s,
          currentPresences: i,
          newPresences: o,
        });
      }),
      this.onLeave((s, i, o) => {
        this.channel._trigger('presence', {
          event: 'leave',
          key: s,
          currentPresences: i,
          leftPresences: o,
        });
      }),
      this.onSync(() => {
        this.channel._trigger('presence', { event: 'sync' });
      });
  }
  static syncState(e, t, n, s) {
    const i = this.cloneDeep(e),
      o = this.transformState(t),
      a = {},
      c = {};
    return (
      this.map(i, (u, l) => {
        o[u] || (c[u] = l);
      }),
      this.map(o, (u, l) => {
        const h = i[u];
        if (h) {
          const f = l.map((_) => _.presence_ref),
            p = h.map((_) => _.presence_ref),
            g = l.filter((_) => p.indexOf(_.presence_ref) < 0),
            y = h.filter((_) => f.indexOf(_.presence_ref) < 0);
          g.length > 0 && (a[u] = g), y.length > 0 && (c[u] = y);
        } else a[u] = l;
      }),
      this.syncDiff(i, { joins: a, leaves: c }, n, s)
    );
  }
  static syncDiff(e, t, n, s) {
    const { joins: i, leaves: o } = {
      joins: this.transformState(t.joins),
      leaves: this.transformState(t.leaves),
    };
    return (
      n || (n = () => {}),
      s || (s = () => {}),
      this.map(i, (a, c) => {
        var u;
        const l = (u = e[a]) !== null && u !== void 0 ? u : [];
        if (((e[a] = this.cloneDeep(c)), l.length > 0)) {
          const h = e[a].map((p) => p.presence_ref),
            f = l.filter((p) => h.indexOf(p.presence_ref) < 0);
          e[a].unshift(...f);
        }
        n(a, l, c);
      }),
      this.map(o, (a, c) => {
        let u = e[a];
        if (!u) return;
        const l = c.map((h) => h.presence_ref);
        (u = u.filter((h) => l.indexOf(h.presence_ref) < 0)),
          (e[a] = u),
          s(a, u, c),
          u.length === 0 && delete e[a];
      }),
      e
    );
  }
  static map(e, t) {
    return Object.getOwnPropertyNames(e).map((n) => t(n, e[n]));
  }
  static transformState(e) {
    return (
      (e = this.cloneDeep(e)),
      Object.getOwnPropertyNames(e).reduce((t, n) => {
        const s = e[n];
        return (
          'metas' in s
            ? (t[n] = s.metas.map(
                (i) => ((i.presence_ref = i.phx_ref), delete i.phx_ref, delete i.phx_ref_prev, i),
              ))
            : (t[n] = s),
          t
        );
      }, {})
    );
  }
  static cloneDeep(e) {
    return JSON.parse(JSON.stringify(e));
  }
  onJoin(e) {
    this.caller.onJoin = e;
  }
  onLeave(e) {
    this.caller.onLeave = e;
  }
  onSync(e) {
    this.caller.onSync = e;
  }
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel._joinRef();
  }
}
var R;
(function (r) {
  (r.abstime = 'abstime'),
    (r.bool = 'bool'),
    (r.date = 'date'),
    (r.daterange = 'daterange'),
    (r.float4 = 'float4'),
    (r.float8 = 'float8'),
    (r.int2 = 'int2'),
    (r.int4 = 'int4'),
    (r.int4range = 'int4range'),
    (r.int8 = 'int8'),
    (r.int8range = 'int8range'),
    (r.json = 'json'),
    (r.jsonb = 'jsonb'),
    (r.money = 'money'),
    (r.numeric = 'numeric'),
    (r.oid = 'oid'),
    (r.reltime = 'reltime'),
    (r.text = 'text'),
    (r.time = 'time'),
    (r.timestamp = 'timestamp'),
    (r.timestamptz = 'timestamptz'),
    (r.timetz = 'timetz'),
    (r.tsrange = 'tsrange'),
    (r.tstzrange = 'tstzrange');
})(R || (R = {}));
const ir = (r, e, t = {}) => {
    var n;
    const s = (n = t.skipTypes) !== null && n !== void 0 ? n : [];
    return Object.keys(e).reduce((i, o) => ((i[o] = Ji(o, r, e, s)), i), {});
  },
  Ji = (r, e, t, n) => {
    const s = e.find((a) => a.name === r),
      i = s?.type,
      o = t[r];
    return i && !n.includes(i) ? Br(i, o) : Ct(o);
  },
  Br = (r, e) => {
    if (r.charAt(0) === '_') {
      const t = r.slice(1, r.length);
      return Wi(e, t);
    }
    switch (r) {
      case R.bool:
        return Gi(e);
      case R.float4:
      case R.float8:
      case R.int2:
      case R.int4:
      case R.int8:
      case R.numeric:
      case R.oid:
        return Ki(e);
      case R.json:
      case R.jsonb:
        return Vi(e);
      case R.timestamp:
        return Xi(e);
      case R.abstime:
      case R.date:
      case R.daterange:
      case R.int4range:
      case R.int8range:
      case R.money:
      case R.reltime:
      case R.text:
      case R.time:
      case R.timestamptz:
      case R.timetz:
      case R.tsrange:
      case R.tstzrange:
        return Ct(e);
      default:
        return Ct(e);
    }
  },
  Ct = (r) => r,
  Gi = (r) => {
    switch (r) {
      case 't':
        return !0;
      case 'f':
        return !1;
      default:
        return r;
    }
  },
  Ki = (r) => {
    if (typeof r == 'string') {
      const e = parseFloat(r);
      if (!Number.isNaN(e)) return e;
    }
    return r;
  },
  Vi = (r) => {
    if (typeof r == 'string')
      try {
        return JSON.parse(r);
      } catch (e) {
        return console.log(`JSON parse error: ${e}`), r;
      }
    return r;
  },
  Wi = (r, e) => {
    if (typeof r != 'string') return r;
    const t = r.length - 1,
      n = r[t];
    if (r[0] === '{' && n === '}') {
      let i;
      const o = r.slice(1, t);
      try {
        i = JSON.parse('[' + o + ']');
      } catch {
        i = o ? o.split(',') : [];
      }
      return i.map((a) => Br(e, a));
    }
    return r;
  },
  Xi = (r) => (typeof r == 'string' ? r.replace(' ', 'T') : r);
var sr =
    (globalThis && globalThis.__awaiter) ||
    function (r, e, t, n) {
      function s(i) {
        return i instanceof t
          ? i
          : new t(function (o) {
              o(i);
            });
      }
      return new (t || (t = Promise))(function (i, o) {
        function a(l) {
          try {
            u(n.next(l));
          } catch (h) {
            o(h);
          }
        }
        function c(l) {
          try {
            u(n.throw(l));
          } catch (h) {
            o(h);
          }
        }
        function u(l) {
          l.done ? i(l.value) : s(l.value).then(a, c);
        }
        u((n = n.apply(r, e || [])).next());
      });
    },
  or;
(function (r) {
  (r.ALL = '*'), (r.INSERT = 'INSERT'), (r.UPDATE = 'UPDATE'), (r.DELETE = 'DELETE');
})(or || (or = {}));
var ar;
(function (r) {
  (r.BROADCAST = 'broadcast'), (r.PRESENCE = 'presence'), (r.POSTGRES_CHANGES = 'postgres_changes');
})(ar || (ar = {}));
var lr;
(function (r) {
  (r.SUBSCRIBED = 'SUBSCRIBED'),
    (r.TIMED_OUT = 'TIMED_OUT'),
    (r.CLOSED = 'CLOSED'),
    (r.CHANNEL_ERROR = 'CHANNEL_ERROR');
})(lr || (lr = {}));
class Ht {
  constructor(e, t = { config: {} }, n) {
    (this.topic = e),
      (this.params = t),
      (this.socket = n),
      (this.bindings = {}),
      (this.state = X.closed),
      (this.joinedOnce = !1),
      (this.pushBuffer = []),
      (this.params.config = Object.assign(
        { broadcast: { ack: !1, self: !1 }, presence: { key: '' } },
        t.config,
      )),
      (this.timeout = this.socket.timeout),
      (this.joinPush = new vt(this, ee.join, this.params, this.timeout)),
      (this.rejoinTimer = new Mr(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs)),
      this.joinPush.receive('ok', () => {
        (this.state = X.joined),
          this.rejoinTimer.reset(),
          this.pushBuffer.forEach((s) => s.send()),
          (this.pushBuffer = []);
      }),
      this._onClose(() => {
        this.rejoinTimer.reset(),
          this.socket.log('channel', `close ${this.topic} ${this._joinRef()}`),
          (this.state = X.closed),
          this.socket._remove(this);
      }),
      this._onError((s) => {
        this._isLeaving() ||
          this._isClosed() ||
          (this.socket.log('channel', `error ${this.topic}`, s),
          (this.state = X.errored),
          this.rejoinTimer.scheduleTimeout());
      }),
      this.joinPush.receive('timeout', () => {
        this._isJoining() &&
          (this.socket.log('channel', `timeout ${this.topic}`, this.joinPush.timeout),
          (this.state = X.errored),
          this.rejoinTimer.scheduleTimeout());
      }),
      this._on(ee.reply, {}, (s, i) => {
        this._trigger(this._replyEventName(i), s);
      }),
      (this.presence = new Re(this));
  }
  subscribe(e, t = this.timeout) {
    var n, s;
    if (this.joinedOnce)
      throw "tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";
    {
      const {
        config: { broadcast: i, presence: o },
      } = this.params;
      this._onError((u) => e && e('CHANNEL_ERROR', u)), this._onClose(() => e && e('CLOSED'));
      const a = {},
        c = {
          broadcast: i,
          presence: o,
          postgres_changes:
            (s =
              (n = this.bindings.postgres_changes) === null || n === void 0
                ? void 0
                : n.map((u) => u.filter)) !== null && s !== void 0
              ? s
              : [],
        };
      this.socket.accessToken && (a.access_token = this.socket.accessToken),
        this.updateJoinPayload(Object.assign({ config: c }, a)),
        (this.joinedOnce = !0),
        this._rejoin(t),
        this.joinPush
          .receive('ok', ({ postgres_changes: u }) => {
            var l;
            if (
              (this.socket.accessToken && this.socket.setAuth(this.socket.accessToken),
              u === void 0)
            ) {
              e && e('SUBSCRIBED');
              return;
            } else {
              const h = this.bindings.postgres_changes,
                f = (l = h?.length) !== null && l !== void 0 ? l : 0,
                p = [];
              for (let g = 0; g < f; g++) {
                const y = h[g],
                  {
                    filter: { event: _, schema: $, table: m, filter: k },
                  } = y,
                  x = u && u[g];
                if (x && x.event === _ && x.schema === $ && x.table === m && x.filter === k)
                  p.push(Object.assign(Object.assign({}, y), { id: x.id }));
                else {
                  this.unsubscribe(),
                    e &&
                      e(
                        'CHANNEL_ERROR',
                        new Error(
                          'mismatch between server and client bindings for postgres changes',
                        ),
                      );
                  return;
                }
              }
              (this.bindings.postgres_changes = p), e && e('SUBSCRIBED');
              return;
            }
          })
          .receive('error', (u) => {
            e &&
              e('CHANNEL_ERROR', new Error(JSON.stringify(Object.values(u).join(', ') || 'error')));
          })
          .receive('timeout', () => {
            e && e('TIMED_OUT');
          });
    }
    return this;
  }
  presenceState() {
    return this.presence.state;
  }
  track(e, t = {}) {
    return sr(this, void 0, void 0, function* () {
      return yield this.send(
        { type: 'presence', event: 'track', payload: e },
        t.timeout || this.timeout,
      );
    });
  }
  untrack(e = {}) {
    return sr(this, void 0, void 0, function* () {
      return yield this.send({ type: 'presence', event: 'untrack' }, e);
    });
  }
  on(e, t, n) {
    return this._on(e, t, n);
  }
  send(e, t = {}) {
    return new Promise((n) => {
      var s, i, o;
      const a = this._push(e.type, e, t.timeout || this.timeout);
      a.rateLimited && n('rate limited'),
        e.type === 'broadcast' &&
          !(
            !(
              (o =
                (i = (s = this.params) === null || s === void 0 ? void 0 : s.config) === null ||
                i === void 0
                  ? void 0
                  : i.broadcast) === null || o === void 0
            ) && o.ack
          ) &&
          n('ok'),
        a.receive('ok', () => n('ok')),
        a.receive('timeout', () => n('timed out'));
    });
  }
  updateJoinPayload(e) {
    this.joinPush.updatePayload(e);
  }
  unsubscribe(e = this.timeout) {
    this.state = X.leaving;
    const t = () => {
      this.socket.log('channel', `leave ${this.topic}`),
        this._trigger(ee.close, 'leave', this._joinRef());
    };
    return (
      this.rejoinTimer.reset(),
      this.joinPush.destroy(),
      new Promise((n) => {
        const s = new vt(this, ee.leave, {}, e);
        s
          .receive('ok', () => {
            t(), n('ok');
          })
          .receive('timeout', () => {
            t(), n('timed out');
          })
          .receive('error', () => {
            n('error');
          }),
          s.send(),
          this._canPush() || s.trigger('ok', {});
      })
    );
  }
  _push(e, t, n = this.timeout) {
    if (!this.joinedOnce)
      throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let s = new vt(this, e, t, n);
    return this._canPush() ? s.send() : (s.startTimeout(), this.pushBuffer.push(s)), s;
  }
  _onMessage(e, t, n) {
    return t;
  }
  _isMember(e) {
    return this.topic === e;
  }
  _joinRef() {
    return this.joinPush.ref;
  }
  _trigger(e, t, n) {
    var s, i;
    const o = e.toLocaleLowerCase(),
      { close: a, error: c, leave: u, join: l } = ee;
    if (n && [a, c, u, l].indexOf(o) >= 0 && n !== this._joinRef()) return;
    let f = this._onMessage(o, t, n);
    if (t && !f)
      throw 'channel onMessage callbacks must return the payload, modified or unmodified';
    ['insert', 'update', 'delete'].includes(o)
      ? (s = this.bindings.postgres_changes) === null ||
        s === void 0 ||
        s
          .filter((p) => {
            var g, y, _;
            return (
              ((g = p.filter) === null || g === void 0 ? void 0 : g.event) === '*' ||
              ((_ = (y = p.filter) === null || y === void 0 ? void 0 : y.event) === null ||
              _ === void 0
                ? void 0
                : _.toLocaleLowerCase()) === o
            );
          })
          .map((p) => p.callback(f, n))
      : (i = this.bindings[o]) === null ||
        i === void 0 ||
        i
          .filter((p) => {
            var g, y, _, $, m, k;
            if (['broadcast', 'presence', 'postgres_changes'].includes(o))
              if ('id' in p) {
                const x = p.id,
                  M = (g = p.filter) === null || g === void 0 ? void 0 : g.event;
                return (
                  x &&
                  ((y = t.ids) === null || y === void 0 ? void 0 : y.includes(x)) &&
                  (M === '*' ||
                    M?.toLocaleLowerCase() ===
                      ((_ = t.data) === null || _ === void 0 ? void 0 : _.type.toLocaleLowerCase()))
                );
              } else {
                const x =
                  (m = ($ = p?.filter) === null || $ === void 0 ? void 0 : $.event) === null ||
                  m === void 0
                    ? void 0
                    : m.toLocaleLowerCase();
                return (
                  x === '*' ||
                  x === ((k = t?.event) === null || k === void 0 ? void 0 : k.toLocaleLowerCase())
                );
              }
            else return p.type.toLocaleLowerCase() === o;
          })
          .map((p) => {
            if (typeof f == 'object' && 'ids' in f) {
              const g = f.data,
                { schema: y, table: _, commit_timestamp: $, type: m, errors: k } = g;
              f = Object.assign(
                Object.assign(
                  {},
                  {
                    schema: y,
                    table: _,
                    commit_timestamp: $,
                    eventType: m,
                    new: {},
                    old: {},
                    errors: k,
                  },
                ),
                this._getPayloadRecords(g),
              );
            }
            p.callback(f, n);
          });
  }
  _isClosed() {
    return this.state === X.closed;
  }
  _isJoined() {
    return this.state === X.joined;
  }
  _isJoining() {
    return this.state === X.joining;
  }
  _isLeaving() {
    return this.state === X.leaving;
  }
  _replyEventName(e) {
    return `chan_reply_${e}`;
  }
  _on(e, t, n) {
    const s = e.toLocaleLowerCase(),
      i = { type: s, filter: t, callback: n };
    return this.bindings[s] ? this.bindings[s].push(i) : (this.bindings[s] = [i]), this;
  }
  _off(e, t) {
    const n = e.toLocaleLowerCase();
    return (
      (this.bindings[n] = this.bindings[n].filter((s) => {
        var i;
        return !(
          ((i = s.type) === null || i === void 0 ? void 0 : i.toLocaleLowerCase()) === n &&
          Ht.isEqual(s.filter, t)
        );
      })),
      this
    );
  }
  static isEqual(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (e[n] !== t[n]) return !1;
    return !0;
  }
  _rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
  }
  _onClose(e) {
    this._on(ee.close, {}, e);
  }
  _onError(e) {
    this._on(ee.error, {}, (t) => e(t));
  }
  _canPush() {
    return this.socket.isConnected() && this._isJoined();
  }
  _rejoin(e = this.timeout) {
    this._isLeaving() ||
      (this.socket._leaveOpenTopic(this.topic), (this.state = X.joining), this.joinPush.resend(e));
  }
  _getPayloadRecords(e) {
    const t = { new: {}, old: {} };
    return (
      (e.type === 'INSERT' || e.type === 'UPDATE') && (t.new = ir(e.columns, e.record)),
      (e.type === 'UPDATE' || e.type === 'DELETE') && (t.old = ir(e.columns, e.old_record)),
      t
    );
  }
}
var yt =
  (globalThis && globalThis.__awaiter) ||
  function (r, e, t, n) {
    function s(i) {
      return i instanceof t
        ? i
        : new t(function (o) {
            o(i);
          });
    }
    return new (t || (t = Promise))(function (i, o) {
      function a(l) {
        try {
          u(n.next(l));
        } catch (h) {
          o(h);
        }
      }
      function c(l) {
        try {
          u(n.throw(l));
        } catch (h) {
          o(h);
        }
      }
      function u(l) {
        l.done ? i(l.value) : s(l.value).then(a, c);
      }
      u((n = n.apply(r, e || [])).next());
    });
  };
const Yi = () => {};
class Qi {
  constructor(e, t) {
    var n;
    (this.accessToken = null),
      (this.channels = []),
      (this.endPoint = ''),
      (this.headers = Fi),
      (this.params = {}),
      (this.timeout = Nr),
      (this.transport = Mi.w3cwebsocket),
      (this.heartbeatIntervalMs = 3e4),
      (this.heartbeatTimer = void 0),
      (this.pendingHeartbeatRef = null),
      (this.ref = 0),
      (this.logger = Yi),
      (this.conn = null),
      (this.sendBuffer = []),
      (this.serializer = new Hi()),
      (this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }),
      (this.eventsPerSecondLimitMs = 100),
      (this.inThrottle = !1),
      (this.endPoint = `${e}/${Pt.websocket}`),
      t?.params && (this.params = t.params),
      t?.headers && (this.headers = Object.assign(Object.assign({}, this.headers), t.headers)),
      t?.timeout && (this.timeout = t.timeout),
      t?.logger && (this.logger = t.logger),
      t?.transport && (this.transport = t.transport),
      t?.heartbeatIntervalMs && (this.heartbeatIntervalMs = t.heartbeatIntervalMs);
    const s = (n = t?.params) === null || n === void 0 ? void 0 : n.eventsPerSecond;
    s && (this.eventsPerSecondLimitMs = Math.floor(1e3 / s)),
      (this.reconnectAfterMs = t?.reconnectAfterMs
        ? t.reconnectAfterMs
        : (i) => [1e3, 2e3, 5e3, 1e4][i - 1] || 1e4),
      (this.encode = t?.encode ? t.encode : (i, o) => o(JSON.stringify(i))),
      (this.decode = t?.decode ? t.decode : this.serializer.decode.bind(this.serializer)),
      (this.reconnectTimer = new Mr(
        () =>
          yt(this, void 0, void 0, function* () {
            this.disconnect(), this.connect();
          }),
        this.reconnectAfterMs,
      ));
  }
  connect() {
    this.conn ||
      ((this.conn = new this.transport(this._endPointURL(), [], null, this.headers)),
      this.conn &&
        ((this.conn.binaryType = 'arraybuffer'),
        (this.conn.onopen = () => this._onConnOpen()),
        (this.conn.onerror = (e) => this._onConnError(e)),
        (this.conn.onmessage = (e) => this._onConnMessage(e)),
        (this.conn.onclose = (e) => this._onConnClose(e))));
  }
  disconnect(e, t) {
    this.conn &&
      ((this.conn.onclose = function () {}),
      e ? this.conn.close(e, t ?? '') : this.conn.close(),
      (this.conn = null),
      this.heartbeatTimer && clearInterval(this.heartbeatTimer),
      this.reconnectTimer.reset());
  }
  getChannels() {
    return this.channels;
  }
  removeChannel(e) {
    return yt(this, void 0, void 0, function* () {
      const t = yield e.unsubscribe();
      return this.channels.length === 0 && this.disconnect(), t;
    });
  }
  removeAllChannels() {
    return yt(this, void 0, void 0, function* () {
      const e = yield Promise.all(this.channels.map((t) => t.unsubscribe()));
      return this.disconnect(), e;
    });
  }
  log(e, t, n) {
    this.logger(e, t, n);
  }
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case Ce.connecting:
        return de.Connecting;
      case Ce.open:
        return de.Open;
      case Ce.closing:
        return de.Closing;
      default:
        return de.Closed;
    }
  }
  isConnected() {
    return this.connectionState() === de.Open;
  }
  channel(e, t = { config: {} }) {
    this.isConnected() || this.connect();
    const n = new Ht(`realtime:${e}`, t, this);
    return this.channels.push(n), n;
  }
  push(e) {
    const { topic: t, event: n, payload: s, ref: i } = e;
    let o = () => {
      this.encode(e, (a) => {
        var c;
        (c = this.conn) === null || c === void 0 || c.send(a);
      });
    };
    if ((this.log('push', `${t} ${n} (${i})`, s), this.isConnected()))
      if (['broadcast', 'presence', 'postgres_changes'].includes(n)) {
        if (this._throttle(o)()) return 'rate limited';
      } else o();
    else this.sendBuffer.push(o);
  }
  setAuth(e) {
    (this.accessToken = e),
      this.channels.forEach((t) => {
        e && t.updateJoinPayload({ access_token: e }),
          t.joinedOnce && t._isJoined() && t._push(ee.access_token, { access_token: e });
      });
  }
  _makeRef() {
    let e = this.ref + 1;
    return e === this.ref ? (this.ref = 0) : (this.ref = e), this.ref.toString();
  }
  _leaveOpenTopic(e) {
    let t = this.channels.find((n) => n.topic === e && (n._isJoined() || n._isJoining()));
    t && (this.log('transport', `leaving duplicate topic "${e}"`), t.unsubscribe());
  }
  _remove(e) {
    this.channels = this.channels.filter((t) => t._joinRef() !== e._joinRef());
  }
  _endPointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: zi }));
  }
  _onConnMessage(e) {
    this.decode(e.data, (t) => {
      let { topic: n, event: s, payload: i, ref: o } = t;
      ((o && o === this.pendingHeartbeatRef) || s === i?.type) && (this.pendingHeartbeatRef = null),
        this.log('receive', `${i.status || ''} ${n} ${s} ${(o && '(' + o + ')') || ''}`, i),
        this.channels.filter((a) => a._isMember(n)).forEach((a) => a._trigger(s, i, o)),
        this.stateChangeCallbacks.message.forEach((a) => a(t));
    });
  }
  _onConnOpen() {
    this.log('transport', `connected to ${this._endPointURL()}`),
      this._flushSendBuffer(),
      this.reconnectTimer.reset(),
      this.heartbeatTimer && clearInterval(this.heartbeatTimer),
      (this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs)),
      this.stateChangeCallbacks.open.forEach((e) => e());
  }
  _onConnClose(e) {
    this.log('transport', 'close', e),
      this._triggerChanError(),
      this.heartbeatTimer && clearInterval(this.heartbeatTimer),
      this.reconnectTimer.scheduleTimeout(),
      this.stateChangeCallbacks.close.forEach((t) => t(e));
  }
  _onConnError(e) {
    this.log('transport', e.message),
      this._triggerChanError(),
      this.stateChangeCallbacks.error.forEach((t) => t(e));
  }
  _triggerChanError() {
    this.channels.forEach((e) => e._trigger(ee.error));
  }
  _appendParams(e, t) {
    if (Object.keys(t).length === 0) return e;
    const n = e.match(/\?/) ? '&' : '?',
      s = new URLSearchParams(t);
    return `${e}${n}${s}`;
  }
  _flushSendBuffer() {
    this.isConnected() &&
      this.sendBuffer.length > 0 &&
      (this.sendBuffer.forEach((e) => e()), (this.sendBuffer = []));
  }
  _sendHeartbeat() {
    var e;
    if (this.isConnected()) {
      if (this.pendingHeartbeatRef) {
        (this.pendingHeartbeatRef = null),
          this.log('transport', 'heartbeat timeout. Attempting to re-establish connection'),
          (e = this.conn) === null || e === void 0 || e.close(qi, 'hearbeat timeout');
        return;
      }
      (this.pendingHeartbeatRef = this._makeRef()),
        this.push({
          topic: 'phoenix',
          event: 'heartbeat',
          payload: {},
          ref: this.pendingHeartbeatRef,
        }),
        this.setAuth(this.accessToken);
    }
  }
  _throttle(e, t = this.eventsPerSecondLimitMs) {
    return () =>
      this.inThrottle
        ? !0
        : (e(),
          t > 0 &&
            ((this.inThrottle = !0),
            setTimeout(() => {
              this.inThrottle = !1;
            }, t)),
          !1);
  }
}
class Jt extends Error {
  constructor(e) {
    super(e), (this.__isStorageError = !0), (this.name = 'StorageError');
  }
}
function H(r) {
  return typeof r == 'object' && r !== null && '__isStorageError' in r;
}
class Zi extends Jt {
  constructor(e, t) {
    super(e), (this.name = 'StorageApiError'), (this.status = t);
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status };
  }
}
class cr extends Jt {
  constructor(e, t) {
    super(e), (this.name = 'StorageUnknownError'), (this.originalError = t);
  }
}
var Fr =
  (globalThis && globalThis.__awaiter) ||
  function (r, e, t, n) {
    function s(i) {
      return i instanceof t
        ? i
        : new t(function (o) {
            o(i);
          });
    }
    return new (t || (t = Promise))(function (i, o) {
      function a(l) {
        try {
          u(n.next(l));
        } catch (h) {
          o(h);
        }
      }
      function c(l) {
        try {
          u(n.throw(l));
        } catch (h) {
          o(h);
        }
      }
      function u(l) {
        l.done ? i(l.value) : s(l.value).then(a, c);
      }
      u((n = n.apply(r, e || [])).next());
    });
  };
const zr = (r) => {
    let e;
    return (
      r
        ? (e = r)
        : typeof fetch > 'u'
        ? (e = (...t) =>
            Fr(void 0, void 0, void 0, function* () {
              return yield (yield at(() => Promise.resolve().then(() => lt), void 0)).fetch(...t);
            }))
        : (e = fetch),
      (...t) => e(...t)
    );
  },
  es = () =>
    Fr(void 0, void 0, void 0, function* () {
      return typeof Response > 'u'
        ? (yield at(() => Promise.resolve().then(() => lt), void 0)).Response
        : Response;
    });
var Se =
  (globalThis && globalThis.__awaiter) ||
  function (r, e, t, n) {
    function s(i) {
      return i instanceof t
        ? i
        : new t(function (o) {
            o(i);
          });
    }
    return new (t || (t = Promise))(function (i, o) {
      function a(l) {
        try {
          u(n.next(l));
        } catch (h) {
          o(h);
        }
      }
      function c(l) {
        try {
          u(n.throw(l));
        } catch (h) {
          o(h);
        }
      }
      function u(l) {
        l.done ? i(l.value) : s(l.value).then(a, c);
      }
      u((n = n.apply(r, e || [])).next());
    });
  };
const mt = (r) => r.msg || r.message || r.error_description || r.error || JSON.stringify(r),
  ts = (r, e) =>
    Se(void 0, void 0, void 0, function* () {
      const t = yield es();
      r instanceof t
        ? r
            .json()
            .then((n) => {
              e(new Zi(mt(n), r.status || 500));
            })
            .catch((n) => {
              e(new cr(mt(n), n));
            })
        : e(new cr(mt(r), r));
    }),
  rs = (r, e, t, n) => {
    const s = { method: r, headers: e?.headers || {} };
    return r === 'GET'
      ? s
      : ((s.headers = Object.assign({ 'Content-Type': 'application/json' }, e?.headers)),
        (s.body = JSON.stringify(n)),
        Object.assign(Object.assign({}, s), t));
  };
function ct(r, e, t, n, s, i) {
  return Se(this, void 0, void 0, function* () {
    return new Promise((o, a) => {
      r(t, rs(e, n, s, i))
        .then((c) => {
          if (!c.ok) throw c;
          return n?.noResolveJson ? c : c.json();
        })
        .then((c) => o(c))
        .catch((c) => ts(c, a));
    });
  });
}
function Rt(r, e, t, n) {
  return Se(this, void 0, void 0, function* () {
    return ct(r, 'GET', e, t, n);
  });
}
function le(r, e, t, n, s) {
  return Se(this, void 0, void 0, function* () {
    return ct(r, 'POST', e, n, s, t);
  });
}
function ns(r, e, t, n, s) {
  return Se(this, void 0, void 0, function* () {
    return ct(r, 'PUT', e, n, s, t);
  });
}
function qr(r, e, t, n, s) {
  return Se(this, void 0, void 0, function* () {
    return ct(r, 'DELETE', e, n, s, t);
  });
}
var Q =
  (globalThis && globalThis.__awaiter) ||
  function (r, e, t, n) {
    function s(i) {
      return i instanceof t
        ? i
        : new t(function (o) {
            o(i);
          });
    }
    return new (t || (t = Promise))(function (i, o) {
      function a(l) {
        try {
          u(n.next(l));
        } catch (h) {
          o(h);
        }
      }
      function c(l) {
        try {
          u(n.throw(l));
        } catch (h) {
          o(h);
        }
      }
      function u(l) {
        l.done ? i(l.value) : s(l.value).then(a, c);
      }
      u((n = n.apply(r, e || [])).next());
    });
  };
const is = { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } },
  ur = { cacheControl: '3600', contentType: 'text/plain;charset=UTF-8', upsert: !1 };
class ss {
  constructor(e, t = {}, n, s) {
    (this.url = e), (this.headers = t), (this.bucketId = n), (this.fetch = zr(s));
  }
  uploadOrUpdate(e, t, n, s) {
    return Q(this, void 0, void 0, function* () {
      try {
        let i;
        const o = Object.assign(Object.assign({}, ur), s),
          a = Object.assign(
            Object.assign({}, this.headers),
            e === 'POST' && { 'x-upsert': String(o.upsert) },
          );
        typeof Blob < 'u' && n instanceof Blob
          ? ((i = new FormData()), i.append('cacheControl', o.cacheControl), i.append('', n))
          : typeof FormData < 'u' && n instanceof FormData
          ? ((i = n), i.append('cacheControl', o.cacheControl))
          : ((i = n),
            (a['cache-control'] = `max-age=${o.cacheControl}`),
            (a['content-type'] = o.contentType));
        const c = this._removeEmptyFolders(t),
          u = this._getFinalPath(c),
          l = yield this.fetch(
            `${this.url}/object/${u}`,
            Object.assign(
              { method: e, body: i, headers: a },
              o?.duplex ? { duplex: o.duplex } : {},
            ),
          );
        return l.ok ? { data: { path: c }, error: null } : { data: null, error: yield l.json() };
      } catch (i) {
        if (H(i)) return { data: null, error: i };
        throw i;
      }
    });
  }
  upload(e, t, n) {
    return Q(this, void 0, void 0, function* () {
      return this.uploadOrUpdate('POST', e, t, n);
    });
  }
  uploadToSignedUrl(e, t, n, s) {
    return Q(this, void 0, void 0, function* () {
      const i = this._removeEmptyFolders(e),
        o = this._getFinalPath(i),
        a = new URL(this.url + `/object/upload/sign/${o}`);
      a.searchParams.set('token', t);
      try {
        let c;
        const u = Object.assign({ upsert: ur.upsert }, s),
          l = Object.assign(Object.assign({}, this.headers), { 'x-upsert': String(u.upsert) });
        typeof Blob < 'u' && n instanceof Blob
          ? ((c = new FormData()), c.append('cacheControl', u.cacheControl), c.append('', n))
          : typeof FormData < 'u' && n instanceof FormData
          ? ((c = n), c.append('cacheControl', u.cacheControl))
          : ((c = n),
            (l['cache-control'] = `max-age=${u.cacheControl}`),
            (l['content-type'] = u.contentType));
        const h = yield this.fetch(a.toString(), { method: 'PUT', body: c, headers: l });
        return h.ok ? { data: { path: i }, error: null } : { data: null, error: yield h.json() };
      } catch (c) {
        if (H(c)) return { data: null, error: c };
        throw c;
      }
    });
  }
  createSignedUploadUrl(e) {
    return Q(this, void 0, void 0, function* () {
      try {
        let t = this._getFinalPath(e);
        const n = yield le(
            this.fetch,
            `${this.url}/object/upload/sign/${t}`,
            {},
            { headers: this.headers },
          ),
          s = new URL(this.url + n.url),
          i = s.searchParams.get('token');
        if (!i) throw new Jt('No token returned by API');
        return { data: { signedUrl: s.toString(), path: e, token: i }, error: null };
      } catch (t) {
        if (H(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  update(e, t, n) {
    return Q(this, void 0, void 0, function* () {
      return this.uploadOrUpdate('PUT', e, t, n);
    });
  }
  move(e, t) {
    return Q(this, void 0, void 0, function* () {
      try {
        return {
          data: yield le(
            this.fetch,
            `${this.url}/object/move`,
            { bucketId: this.bucketId, sourceKey: e, destinationKey: t },
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (n) {
        if (H(n)) return { data: null, error: n };
        throw n;
      }
    });
  }
  copy(e, t) {
    return Q(this, void 0, void 0, function* () {
      try {
        return {
          data: {
            path: (yield le(
              this.fetch,
              `${this.url}/object/copy`,
              { bucketId: this.bucketId, sourceKey: e, destinationKey: t },
              { headers: this.headers },
            )).Key,
          },
          error: null,
        };
      } catch (n) {
        if (H(n)) return { data: null, error: n };
        throw n;
      }
    });
  }
  createSignedUrl(e, t, n) {
    return Q(this, void 0, void 0, function* () {
      try {
        let s = this._getFinalPath(e),
          i = yield le(
            this.fetch,
            `${this.url}/object/sign/${s}`,
            Object.assign({ expiresIn: t }, n?.transform ? { transform: n.transform } : {}),
            { headers: this.headers },
          );
        const o = n?.download ? `&download=${n.download === !0 ? '' : n.download}` : '';
        return (
          (i = { signedUrl: encodeURI(`${this.url}${i.signedURL}${o}`) }), { data: i, error: null }
        );
      } catch (s) {
        if (H(s)) return { data: null, error: s };
        throw s;
      }
    });
  }
  createSignedUrls(e, t, n) {
    return Q(this, void 0, void 0, function* () {
      try {
        const s = yield le(
            this.fetch,
            `${this.url}/object/sign/${this.bucketId}`,
            { expiresIn: t, paths: e },
            { headers: this.headers },
          ),
          i = n?.download ? `&download=${n.download === !0 ? '' : n.download}` : '';
        return {
          data: s.map((o) =>
            Object.assign(Object.assign({}, o), {
              signedUrl: o.signedURL ? encodeURI(`${this.url}${o.signedURL}${i}`) : null,
            }),
          ),
          error: null,
        };
      } catch (s) {
        if (H(s)) return { data: null, error: s };
        throw s;
      }
    });
  }
  download(e, t) {
    return Q(this, void 0, void 0, function* () {
      const s = typeof t?.transform < 'u' ? 'render/image/authenticated' : 'object',
        i = this.transformOptsToQueryString(t?.transform || {}),
        o = i ? `?${i}` : '';
      try {
        const a = this._getFinalPath(e);
        return {
          data: yield (yield Rt(this.fetch, `${this.url}/${s}/${a}${o}`, {
            headers: this.headers,
            noResolveJson: !0,
          })).blob(),
          error: null,
        };
      } catch (a) {
        if (H(a)) return { data: null, error: a };
        throw a;
      }
    });
  }
  getPublicUrl(e, t) {
    const n = this._getFinalPath(e),
      s = [],
      i = t?.download ? `download=${t.download === !0 ? '' : t.download}` : '';
    i !== '' && s.push(i);
    const a = typeof t?.transform < 'u' ? 'render/image' : 'object',
      c = this.transformOptsToQueryString(t?.transform || {});
    c !== '' && s.push(c);
    let u = s.join('&');
    return (
      u !== '' && (u = `?${u}`),
      { data: { publicUrl: encodeURI(`${this.url}/${a}/public/${n}${u}`) } }
    );
  }
  remove(e) {
    return Q(this, void 0, void 0, function* () {
      try {
        return {
          data: yield qr(
            this.fetch,
            `${this.url}/object/${this.bucketId}`,
            { prefixes: e },
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (t) {
        if (H(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  list(e, t, n) {
    return Q(this, void 0, void 0, function* () {
      try {
        const s = Object.assign(Object.assign(Object.assign({}, is), t), { prefix: e || '' });
        return {
          data: yield le(
            this.fetch,
            `${this.url}/object/list/${this.bucketId}`,
            s,
            { headers: this.headers },
            n,
          ),
          error: null,
        };
      } catch (s) {
        if (H(s)) return { data: null, error: s };
        throw s;
      }
    });
  }
  _getFinalPath(e) {
    return `${this.bucketId}/${e}`;
  }
  _removeEmptyFolders(e) {
    return e.replace(/^\/|\/$/g, '').replace(/\/+/g, '/');
  }
  transformOptsToQueryString(e) {
    const t = [];
    return (
      e.width && t.push(`width=${e.width}`),
      e.height && t.push(`height=${e.height}`),
      e.resize && t.push(`resize=${e.resize}`),
      e.format && t.push(`format=${e.format}`),
      e.quality && t.push(`quality=${e.quality}`),
      t.join('&')
    );
  }
}
const os = '2.5.1',
  as = { 'X-Client-Info': `storage-js/${os}` };
var me =
  (globalThis && globalThis.__awaiter) ||
  function (r, e, t, n) {
    function s(i) {
      return i instanceof t
        ? i
        : new t(function (o) {
            o(i);
          });
    }
    return new (t || (t = Promise))(function (i, o) {
      function a(l) {
        try {
          u(n.next(l));
        } catch (h) {
          o(h);
        }
      }
      function c(l) {
        try {
          u(n.throw(l));
        } catch (h) {
          o(h);
        }
      }
      function u(l) {
        l.done ? i(l.value) : s(l.value).then(a, c);
      }
      u((n = n.apply(r, e || [])).next());
    });
  };
class ls {
  constructor(e, t = {}, n) {
    (this.url = e), (this.headers = Object.assign(Object.assign({}, as), t)), (this.fetch = zr(n));
  }
  listBuckets() {
    return me(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Rt(this.fetch, `${this.url}/bucket`, { headers: this.headers }),
          error: null,
        };
      } catch (e) {
        if (H(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  getBucket(e) {
    return me(this, void 0, void 0, function* () {
      try {
        return {
          data: yield Rt(this.fetch, `${this.url}/bucket/${e}`, { headers: this.headers }),
          error: null,
        };
      } catch (t) {
        if (H(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  createBucket(e, t = { public: !1 }) {
    return me(this, void 0, void 0, function* () {
      try {
        return {
          data: yield le(
            this.fetch,
            `${this.url}/bucket`,
            {
              id: e,
              name: e,
              public: t.public,
              file_size_limit: t.fileSizeLimit,
              allowed_mime_types: t.allowedMimeTypes,
            },
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (n) {
        if (H(n)) return { data: null, error: n };
        throw n;
      }
    });
  }
  updateBucket(e, t) {
    return me(this, void 0, void 0, function* () {
      try {
        return {
          data: yield ns(
            this.fetch,
            `${this.url}/bucket/${e}`,
            {
              id: e,
              name: e,
              public: t.public,
              file_size_limit: t.fileSizeLimit,
              allowed_mime_types: t.allowedMimeTypes,
            },
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (n) {
        if (H(n)) return { data: null, error: n };
        throw n;
      }
    });
  }
  emptyBucket(e) {
    return me(this, void 0, void 0, function* () {
      try {
        return {
          data: yield le(
            this.fetch,
            `${this.url}/bucket/${e}/empty`,
            {},
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (t) {
        if (H(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  deleteBucket(e) {
    return me(this, void 0, void 0, function* () {
      try {
        return {
          data: yield qr(this.fetch, `${this.url}/bucket/${e}`, {}, { headers: this.headers }),
          error: null,
        };
      } catch (t) {
        if (H(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
}
class cs extends ls {
  constructor(e, t = {}, n) {
    super(e, t, n);
  }
  from(e) {
    return new ss(this.url, this.headers, e, this.fetch);
  }
}
const us = '2.24.0',
  hs = { 'X-Client-Info': `supabase-js/${us}` };
var ds =
  (globalThis && globalThis.__awaiter) ||
  function (r, e, t, n) {
    function s(i) {
      return i instanceof t
        ? i
        : new t(function (o) {
            o(i);
          });
    }
    return new (t || (t = Promise))(function (i, o) {
      function a(l) {
        try {
          u(n.next(l));
        } catch (h) {
          o(h);
        }
      }
      function c(l) {
        try {
          u(n.throw(l));
        } catch (h) {
          o(h);
        }
      }
      function u(l) {
        l.done ? i(l.value) : s(l.value).then(a, c);
      }
      u((n = n.apply(r, e || [])).next());
    });
  };
const fs = (r) => {
    let e;
    return r ? (e = r) : typeof fetch > 'u' ? (e = qt) : (e = fetch), (...t) => e(...t);
  },
  gs = () => (typeof Headers > 'u' ? zt.Headers : Headers),
  ps = (r, e, t) => {
    const n = fs(t),
      s = gs();
    return (i, o) =>
      ds(void 0, void 0, void 0, function* () {
        var a;
        const c = (a = yield e()) !== null && a !== void 0 ? a : r;
        let u = new s(o?.headers);
        return (
          u.has('apikey') || u.set('apikey', r),
          u.has('Authorization') || u.set('Authorization', `Bearer ${c}`),
          n(i, Object.assign(Object.assign({}, o), { headers: u }))
        );
      });
  };
function vs(r) {
  return r.replace(/\/$/, '');
}
function ys(r, e) {
  const { db: t, auth: n, realtime: s, global: i } = r,
    { db: o, auth: a, realtime: c, global: u } = e;
  return {
    db: Object.assign(Object.assign({}, o), t),
    auth: Object.assign(Object.assign({}, a), n),
    realtime: Object.assign(Object.assign({}, c), s),
    global: Object.assign(Object.assign({}, u), i),
  };
}
var pe =
  (globalThis && globalThis.__awaiter) ||
  function (r, e, t, n) {
    function s(i) {
      return i instanceof t
        ? i
        : new t(function (o) {
            o(i);
          });
    }
    return new (t || (t = Promise))(function (i, o) {
      function a(l) {
        try {
          u(n.next(l));
        } catch (h) {
          o(h);
        }
      }
      function c(l) {
        try {
          u(n.throw(l));
        } catch (h) {
          o(h);
        }
      }
      function u(l) {
        l.done ? i(l.value) : s(l.value).then(a, c);
      }
      u((n = n.apply(r, e || [])).next());
    });
  };
function ms(r) {
  return Math.round(Date.now() / 1e3) + r;
}
function _s() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (r) {
    const e = (Math.random() * 16) | 0;
    return (r == 'x' ? e : (e & 3) | 8).toString(16);
  });
}
const ae = () => typeof document < 'u',
  ue = { tested: !1, writable: !1 },
  Ye = () => {
    if (!ae()) return !1;
    try {
      if (typeof globalThis.localStorage != 'object') return !1;
    } catch {
      return !1;
    }
    if (ue.tested) return ue.writable;
    const r = `lswt-${Math.random()}${Math.random()}`;
    try {
      globalThis.localStorage.setItem(r, r),
        globalThis.localStorage.removeItem(r),
        (ue.tested = !0),
        (ue.writable = !0);
    } catch {
      (ue.tested = !0), (ue.writable = !1);
    }
    return ue.writable;
  };
function G(r, e) {
  var t;
  e || (e = ((t = window?.location) === null || t === void 0 ? void 0 : t.href) || ''),
    (r = r.replace(/[\[\]]/g, '\\$&'));
  const n = new RegExp('[?&#]' + r + '(=([^&#]*)|&|#|$)'),
    s = n.exec(e);
  return s ? (s[2] ? decodeURIComponent(s[2].replace(/\+/g, ' ')) : '') : null;
}
const Hr = (r) => {
    let e;
    return (
      r
        ? (e = r)
        : typeof fetch > 'u'
        ? (e = (...t) =>
            pe(void 0, void 0, void 0, function* () {
              return yield (yield at(() => Promise.resolve().then(() => lt), void 0)).fetch(...t);
            }))
        : (e = fetch),
      (...t) => e(...t)
    );
  },
  bs = (r) =>
    typeof r == 'object' &&
    r !== null &&
    'status' in r &&
    'ok' in r &&
    'json' in r &&
    typeof r.json == 'function',
  Ee = (r, e, t) =>
    pe(void 0, void 0, void 0, function* () {
      yield r.setItem(e, JSON.stringify(t));
    }),
  qe = (r, e) =>
    pe(void 0, void 0, void 0, function* () {
      const t = yield r.getItem(e);
      if (!t) return null;
      try {
        return JSON.parse(t);
      } catch {
        return t;
      }
    }),
  _t = (r, e) =>
    pe(void 0, void 0, void 0, function* () {
      yield r.removeItem(e);
    });
function ws(r) {
  const e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let t = '',
    n,
    s,
    i,
    o,
    a,
    c,
    u,
    l = 0;
  for (r = r.replace('-', '+').replace('_', '/'); l < r.length; )
    (o = e.indexOf(r.charAt(l++))),
      (a = e.indexOf(r.charAt(l++))),
      (c = e.indexOf(r.charAt(l++))),
      (u = e.indexOf(r.charAt(l++))),
      (n = (o << 2) | (a >> 4)),
      (s = ((a & 15) << 4) | (c >> 2)),
      (i = ((c & 3) << 6) | u),
      (t = t + String.fromCharCode(n)),
      c != 64 && s != 0 && (t = t + String.fromCharCode(s)),
      u != 64 && i != 0 && (t = t + String.fromCharCode(i));
  return t;
}
class ut {
  constructor() {
    this.promise = new ut.promiseConstructor((e, t) => {
      (this.resolve = e), (this.reject = t);
    });
  }
}
ut.promiseConstructor = Promise;
function hr(r) {
  const e = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i,
    t = r.split('.');
  if (t.length !== 3) throw new Error('JWT is not valid: not a JWT structure');
  if (!e.test(t[1])) throw new Error('JWT is not valid: payload is not in base64url format');
  const n = t[1];
  return JSON.parse(ws(n));
}
function $s(r) {
  return new Promise((e) => {
    setTimeout(() => e(null), r);
  });
}
function xs(r, e) {
  return new Promise((n, s) => {
    pe(this, void 0, void 0, function* () {
      for (let i = 0; i < 1 / 0; i++)
        try {
          const o = yield r(i);
          if (!e(i, null, o)) {
            n(o);
            return;
          }
        } catch (o) {
          if (!e(i, o)) {
            s(o);
            return;
          }
        }
    });
  });
}
function Ss(r) {
  return ('0' + r.toString(16)).substr(-2);
}
function He() {
  const e = new Uint32Array(56);
  if (typeof crypto > 'u') {
    const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~',
      n = t.length;
    let s = '';
    for (let i = 0; i < 56; i++) s += t.charAt(Math.floor(Math.random() * n));
    return s;
  }
  return crypto.getRandomValues(e), Array.from(e, Ss).join('');
}
function Os(r) {
  return pe(this, void 0, void 0, function* () {
    const t = new TextEncoder().encode(r),
      n = yield crypto.subtle.digest('SHA-256', t),
      s = new Uint8Array(n);
    return Array.from(s)
      .map((i) => String.fromCharCode(i))
      .join('');
  });
}
function Ts(r) {
  return btoa(r).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function Je(r) {
  return pe(this, void 0, void 0, function* () {
    if (typeof crypto > 'u')
      return (
        console.warn(
          'WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.',
        ),
        r
      );
    const e = yield Os(r);
    return Ts(e);
  });
}
class Gt extends Error {
  constructor(e, t) {
    super(e), (this.__isAuthError = !0), (this.name = 'AuthError'), (this.status = t);
  }
}
function T(r) {
  return typeof r == 'object' && r !== null && '__isAuthError' in r;
}
class Es extends Gt {
  constructor(e, t) {
    super(e, t), (this.name = 'AuthApiError'), (this.status = t);
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status };
  }
}
function ks(r) {
  return T(r) && r.name === 'AuthApiError';
}
class Jr extends Gt {
  constructor(e, t) {
    super(e), (this.name = 'AuthUnknownError'), (this.originalError = t);
  }
}
class Oe extends Gt {
  constructor(e, t, n) {
    super(e), (this.name = t), (this.status = n);
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status };
  }
}
class _e extends Oe {
  constructor() {
    super('Auth session missing!', 'AuthSessionMissingError', 400);
  }
}
class bt extends Oe {
  constructor() {
    super('Auth session or user missing', 'AuthInvalidTokenResponseError', 500);
  }
}
class Ge extends Oe {
  constructor(e) {
    super(e, 'AuthInvalidCredentialsError', 400);
  }
}
class se extends Oe {
  constructor(e, t = null) {
    super(e, 'AuthImplicitGrantRedirectError', 500), (this.details = null), (this.details = t);
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status, details: this.details };
  }
}
class wt extends Oe {
  constructor(e, t = null) {
    super(e, 'AuthPKCEGrantCodeExchangeError', 500), (this.details = null), (this.details = t);
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status, details: this.details };
  }
}
class It extends Oe {
  constructor(e, t) {
    super(e, 'AuthRetryableFetchError', t);
  }
}
var Kt =
    (globalThis && globalThis.__awaiter) ||
    function (r, e, t, n) {
      function s(i) {
        return i instanceof t
          ? i
          : new t(function (o) {
              o(i);
            });
      }
      return new (t || (t = Promise))(function (i, o) {
        function a(l) {
          try {
            u(n.next(l));
          } catch (h) {
            o(h);
          }
        }
        function c(l) {
          try {
            u(n.throw(l));
          } catch (h) {
            o(h);
          }
        }
        function u(l) {
          l.done ? i(l.value) : s(l.value).then(a, c);
        }
        u((n = n.apply(r, e || [])).next());
      });
    },
  As =
    (globalThis && globalThis.__rest) ||
    function (r, e) {
      var t = {};
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && e.indexOf(n) < 0 && (t[n] = r[n]);
      if (r != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var s = 0, n = Object.getOwnPropertySymbols(r); s < n.length; s++)
          e.indexOf(n[s]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(r, n[s]) &&
            (t[n[s]] = r[n[s]]);
      return t;
    };
const Ke = (r) => r.msg || r.message || r.error_description || r.error || JSON.stringify(r),
  js = (r, e) =>
    Kt(void 0, void 0, void 0, function* () {
      const t = [502, 503, 504];
      bs(r)
        ? t.includes(r.status)
          ? e(new It(Ke(r), r.status))
          : r
              .json()
              .then((n) => {
                e(new Es(Ke(n), r.status || 500));
              })
              .catch((n) => {
                e(new Jr(Ke(n), n));
              })
        : e(new It(Ke(r), 0));
    }),
  Ps = (r, e, t, n) => {
    const s = { method: r, headers: e?.headers || {} };
    return r === 'GET'
      ? s
      : ((s.headers = Object.assign(
          { 'Content-Type': 'application/json;charset=UTF-8' },
          e?.headers,
        )),
        (s.body = JSON.stringify(n)),
        Object.assign(Object.assign({}, s), t));
  };
function A(r, e, t, n) {
  var s;
  return Kt(this, void 0, void 0, function* () {
    const i = Object.assign({}, n?.headers);
    n?.jwt && (i.Authorization = `Bearer ${n.jwt}`);
    const o = (s = n?.query) !== null && s !== void 0 ? s : {};
    n?.redirectTo && (o.redirect_to = n.redirectTo);
    const a = Object.keys(o).length ? '?' + new URLSearchParams(o).toString() : '',
      c = yield Cs(r, e, t + a, { headers: i, noResolveJson: n?.noResolveJson }, {}, n?.body);
    return n?.xform ? n?.xform(c) : { data: Object.assign({}, c), error: null };
  });
}
function Cs(r, e, t, n, s, i) {
  return Kt(this, void 0, void 0, function* () {
    return new Promise((o, a) => {
      r(t, Ps(e, n, s, i))
        .then((c) => {
          if (!c.ok) throw c;
          return n?.noResolveJson ? c : c.json();
        })
        .then((c) => o(c))
        .catch((c) => js(c, a));
    });
  });
}
function oe(r) {
  var e;
  let t = null;
  Ls(r) && ((t = Object.assign({}, r)), (t.expires_at = ms(r.expires_in)));
  const n = (e = r.user) !== null && e !== void 0 ? e : r;
  return { data: { session: t, user: n }, error: null };
}
function fe(r) {
  var e;
  return { data: { user: (e = r.user) !== null && e !== void 0 ? e : r }, error: null };
}
function Rs(r) {
  return { data: r, error: null };
}
function Is(r) {
  const { action_link: e, email_otp: t, hashed_token: n, redirect_to: s, verification_type: i } = r,
    o = As(r, ['action_link', 'email_otp', 'hashed_token', 'redirect_to', 'verification_type']),
    a = { action_link: e, email_otp: t, hashed_token: n, redirect_to: s, verification_type: i },
    c = Object.assign({}, o);
  return { data: { properties: a, user: c }, error: null };
}
function Ds(r) {
  return r;
}
function Ls(r) {
  return r.access_token && r.refresh_token && r.expires_in;
}
var ne =
    (globalThis && globalThis.__awaiter) ||
    function (r, e, t, n) {
      function s(i) {
        return i instanceof t
          ? i
          : new t(function (o) {
              o(i);
            });
      }
      return new (t || (t = Promise))(function (i, o) {
        function a(l) {
          try {
            u(n.next(l));
          } catch (h) {
            o(h);
          }
        }
        function c(l) {
          try {
            u(n.throw(l));
          } catch (h) {
            o(h);
          }
        }
        function u(l) {
          l.done ? i(l.value) : s(l.value).then(a, c);
        }
        u((n = n.apply(r, e || [])).next());
      });
    },
  Us =
    (globalThis && globalThis.__rest) ||
    function (r, e) {
      var t = {};
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && e.indexOf(n) < 0 && (t[n] = r[n]);
      if (r != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var s = 0, n = Object.getOwnPropertySymbols(r); s < n.length; s++)
          e.indexOf(n[s]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(r, n[s]) &&
            (t[n[s]] = r[n[s]]);
      return t;
    };
class Ns {
  constructor({ url: e = '', headers: t = {}, fetch: n }) {
    (this.url = e),
      (this.headers = t),
      (this.fetch = Hr(n)),
      (this.mfa = {
        listFactors: this._listFactors.bind(this),
        deleteFactor: this._deleteFactor.bind(this),
      });
  }
  signOut(e) {
    return ne(this, void 0, void 0, function* () {
      try {
        return (
          yield A(this.fetch, 'POST', `${this.url}/logout`, {
            headers: this.headers,
            jwt: e,
            noResolveJson: !0,
          }),
          { data: null, error: null }
        );
      } catch (t) {
        if (T(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  inviteUserByEmail(e, t = {}) {
    return ne(this, void 0, void 0, function* () {
      try {
        return yield A(this.fetch, 'POST', `${this.url}/invite`, {
          body: { email: e, data: t.data },
          headers: this.headers,
          redirectTo: t.redirectTo,
          xform: fe,
        });
      } catch (n) {
        if (T(n)) return { data: { user: null }, error: n };
        throw n;
      }
    });
  }
  generateLink(e) {
    return ne(this, void 0, void 0, function* () {
      try {
        const { options: t } = e,
          n = Us(e, ['options']),
          s = Object.assign(Object.assign({}, n), t);
        return (
          'newEmail' in n && ((s.new_email = n?.newEmail), delete s.newEmail),
          yield A(this.fetch, 'POST', `${this.url}/admin/generate_link`, {
            body: s,
            headers: this.headers,
            xform: Is,
            redirectTo: t?.redirectTo,
          })
        );
      } catch (t) {
        if (T(t)) return { data: { properties: null, user: null }, error: t };
        throw t;
      }
    });
  }
  createUser(e) {
    return ne(this, void 0, void 0, function* () {
      try {
        return yield A(this.fetch, 'POST', `${this.url}/admin/users`, {
          body: e,
          headers: this.headers,
          xform: fe,
        });
      } catch (t) {
        if (T(t)) return { data: { user: null }, error: t };
        throw t;
      }
    });
  }
  listUsers(e) {
    var t, n, s, i, o, a, c;
    return ne(this, void 0, void 0, function* () {
      try {
        const u = { nextPage: null, lastPage: 0, total: 0 },
          l = yield A(this.fetch, 'GET', `${this.url}/admin/users`, {
            headers: this.headers,
            noResolveJson: !0,
            query: {
              page:
                (n = (t = e?.page) === null || t === void 0 ? void 0 : t.toString()) !== null &&
                n !== void 0
                  ? n
                  : '',
              per_page:
                (i = (s = e?.perPage) === null || s === void 0 ? void 0 : s.toString()) !== null &&
                i !== void 0
                  ? i
                  : '',
            },
            xform: Ds,
          });
        if (l.error) throw l.error;
        const h = yield l.json(),
          f = (o = l.headers.get('x-total-count')) !== null && o !== void 0 ? o : 0,
          p =
            (c = (a = l.headers.get('link')) === null || a === void 0 ? void 0 : a.split(',')) !==
              null && c !== void 0
              ? c
              : [];
        return (
          p.length > 0 &&
            (p.forEach((g) => {
              const y = parseInt(g.split(';')[0].split('=')[1].substring(0, 1)),
                _ = JSON.parse(g.split(';')[1].split('=')[1]);
              u[`${_}Page`] = y;
            }),
            (u.total = parseInt(f))),
          { data: Object.assign(Object.assign({}, h), u), error: null }
        );
      } catch (u) {
        if (T(u)) return { data: { users: [] }, error: u };
        throw u;
      }
    });
  }
  getUserById(e) {
    return ne(this, void 0, void 0, function* () {
      try {
        return yield A(this.fetch, 'GET', `${this.url}/admin/users/${e}`, {
          headers: this.headers,
          xform: fe,
        });
      } catch (t) {
        if (T(t)) return { data: { user: null }, error: t };
        throw t;
      }
    });
  }
  updateUserById(e, t) {
    return ne(this, void 0, void 0, function* () {
      try {
        return yield A(this.fetch, 'PUT', `${this.url}/admin/users/${e}`, {
          body: t,
          headers: this.headers,
          xform: fe,
        });
      } catch (n) {
        if (T(n)) return { data: { user: null }, error: n };
        throw n;
      }
    });
  }
  deleteUser(e, t = !1) {
    return ne(this, void 0, void 0, function* () {
      try {
        return yield A(this.fetch, 'DELETE', `${this.url}/admin/users/${e}`, {
          headers: this.headers,
          body: { should_soft_delete: t },
          xform: fe,
        });
      } catch (n) {
        if (T(n)) return { data: { user: null }, error: n };
        throw n;
      }
    });
  }
  _listFactors(e) {
    return ne(this, void 0, void 0, function* () {
      try {
        const { data: t, error: n } = yield A(
          this.fetch,
          'GET',
          `${this.url}/admin/users/${e.userId}/factors`,
          { headers: this.headers, xform: (s) => ({ data: { factors: s }, error: null }) },
        );
        return { data: t, error: n };
      } catch (t) {
        if (T(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
  _deleteFactor(e) {
    return ne(this, void 0, void 0, function* () {
      try {
        return {
          data: yield A(
            this.fetch,
            'DELETE',
            `${this.url}/admin/users/${e.userId}/factors/${e.id}`,
            { headers: this.headers },
          ),
          error: null,
        };
      } catch (t) {
        if (T(t)) return { data: null, error: t };
        throw t;
      }
    });
  }
}
const Ms = '2.29.0',
  Bs = 'http://localhost:9999',
  Fs = 'supabase.auth.token',
  zs = { 'X-Client-Info': `gotrue-js/${Ms}` },
  qs = 10,
  dr = {
    getItem: (r) => (Ye() ? globalThis.localStorage.getItem(r) : null),
    setItem: (r, e) => {
      Ye() && globalThis.localStorage.setItem(r, e);
    },
    removeItem: (r) => {
      Ye() && globalThis.localStorage.removeItem(r);
    },
  };
function Hs() {
  if (typeof globalThis != 'object')
    try {
      Object.defineProperty(Object.prototype, '__magic__', {
        get: function () {
          return this;
        },
        configurable: !0,
      }),
        (__magic__.globalThis = __magic__),
        delete Object.prototype.__magic__;
    } catch {
      typeof self < 'u' && (self.globalThis = self);
    }
}
var b =
  (globalThis && globalThis.__awaiter) ||
  function (r, e, t, n) {
    function s(i) {
      return i instanceof t
        ? i
        : new t(function (o) {
            o(i);
          });
    }
    return new (t || (t = Promise))(function (i, o) {
      function a(l) {
        try {
          u(n.next(l));
        } catch (h) {
          o(h);
        }
      }
      function c(l) {
        try {
          u(n.throw(l));
        } catch (h) {
          o(h);
        }
      }
      function u(l) {
        l.done ? i(l.value) : s(l.value).then(a, c);
      }
      u((n = n.apply(r, e || [])).next());
    });
  };
Hs();
const Js = {
    url: Bs,
    storageKey: Fs,
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    headers: zs,
    flowType: 'implicit',
  },
  $t = 30 * 1e3,
  Gs = 3;
class Ks {
  constructor(e) {
    var t;
    (this.stateChangeEmitters = new Map()),
      (this.autoRefreshTicker = null),
      (this.visibilityChangedCallback = null),
      (this.refreshingDeferred = null),
      (this.initializePromise = null),
      (this.detectSessionInUrl = !0),
      (this.broadcastChannel = null);
    const n = Object.assign(Object.assign({}, Js), e);
    if (
      ((this.inMemorySession = null),
      (this.storageKey = n.storageKey),
      (this.autoRefreshToken = n.autoRefreshToken),
      (this.persistSession = n.persistSession),
      (this.storage = n.storage || dr),
      (this.admin = new Ns({ url: n.url, headers: n.headers, fetch: n.fetch })),
      (this.url = n.url),
      (this.headers = n.headers),
      (this.fetch = Hr(n.fetch)),
      (this.detectSessionInUrl = n.detectSessionInUrl),
      (this.flowType = n.flowType),
      (this.mfa = {
        verify: this._verify.bind(this),
        enroll: this._enroll.bind(this),
        unenroll: this._unenroll.bind(this),
        challenge: this._challenge.bind(this),
        listFactors: this._listFactors.bind(this),
        challengeAndVerify: this._challengeAndVerify.bind(this),
        getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
      }),
      this.persistSession &&
        this.storage === dr &&
        !Ye() &&
        console.warn(`No storage option exists to persist the session, which may result in unexpected behavior when using auth.
        If you want to set persistSession to true, please provide a storage option or you may set persistSession to false to disable this warning.`),
      ae() && globalThis.BroadcastChannel && this.persistSession && this.storageKey)
    ) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (s) {
        console.error(
          'Failed to create a new BroadcastChannel, multi-tab state changes will not be available',
          s,
        );
      }
      (t = this.broadcastChannel) === null ||
        t === void 0 ||
        t.addEventListener('message', (s) => {
          this._notifyAllSubscribers(s.data.event, s.data.session, !1);
        });
    }
    this.initialize();
  }
  initialize() {
    return (
      this.initializePromise || (this.initializePromise = this._initialize()),
      this.initializePromise
    );
  }
  _initialize() {
    return b(this, void 0, void 0, function* () {
      if (this.initializePromise) return this.initializePromise;
      try {
        const e = ae() ? yield this._isPKCEFlow() : !1;
        if (e || (this.detectSessionInUrl && this._isImplicitGrantFlow())) {
          const { data: t, error: n } = yield this._getSessionFromUrl(e);
          if (n) return yield this._removeSession(), { error: n };
          const { session: s, redirectType: i } = t;
          return (
            yield this._saveSession(s),
            setTimeout(() => {
              i === 'recovery'
                ? this._notifyAllSubscribers('PASSWORD_RECOVERY', s)
                : this._notifyAllSubscribers('SIGNED_IN', s);
            }, 0),
            { error: null }
          );
        }
        return yield this._recoverAndRefresh(), { error: null };
      } catch (e) {
        return T(e) ? { error: e } : { error: new Jr('Unexpected error during initialization', e) };
      } finally {
        yield this._handleVisibilityChange();
      }
    });
  }
  signUp(e) {
    var t, n, s;
    return b(this, void 0, void 0, function* () {
      try {
        yield this._removeSession();
        let i;
        if ('email' in e) {
          const { email: l, password: h, options: f } = e;
          let p = null,
            g = null;
          if (this.flowType === 'pkce') {
            const y = He();
            yield Ee(this.storage, `${this.storageKey}-code-verifier`, y),
              (p = yield Je(y)),
              (g = y === p ? 'plain' : 's256');
          }
          i = yield A(this.fetch, 'POST', `${this.url}/signup`, {
            headers: this.headers,
            redirectTo: f?.emailRedirectTo,
            body: {
              email: l,
              password: h,
              data: (t = f?.data) !== null && t !== void 0 ? t : {},
              gotrue_meta_security: { captcha_token: f?.captchaToken },
              code_challenge: p,
              code_challenge_method: g,
            },
            xform: oe,
          });
        } else if ('phone' in e) {
          const { phone: l, password: h, options: f } = e;
          i = yield A(this.fetch, 'POST', `${this.url}/signup`, {
            headers: this.headers,
            body: {
              phone: l,
              password: h,
              data: (n = f?.data) !== null && n !== void 0 ? n : {},
              channel: (s = f?.channel) !== null && s !== void 0 ? s : 'sms',
              gotrue_meta_security: { captcha_token: f?.captchaToken },
            },
            xform: oe,
          });
        } else throw new Ge('You must provide either an email or phone number and a password');
        const { data: o, error: a } = i;
        if (a || !o) return { data: { user: null, session: null }, error: a };
        const c = o.session,
          u = o.user;
        return (
          o.session &&
            (yield this._saveSession(o.session), this._notifyAllSubscribers('SIGNED_IN', c)),
          { data: { user: u, session: c }, error: null }
        );
      } catch (i) {
        if (T(i)) return { data: { user: null, session: null }, error: i };
        throw i;
      }
    });
  }
  signInWithPassword(e) {
    return b(this, void 0, void 0, function* () {
      try {
        yield this._removeSession();
        let t;
        if ('email' in e) {
          const { email: i, password: o, options: a } = e;
          t = yield A(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
            headers: this.headers,
            body: {
              email: i,
              password: o,
              gotrue_meta_security: { captcha_token: a?.captchaToken },
            },
            xform: oe,
          });
        } else if ('phone' in e) {
          const { phone: i, password: o, options: a } = e;
          t = yield A(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
            headers: this.headers,
            body: {
              phone: i,
              password: o,
              gotrue_meta_security: { captcha_token: a?.captchaToken },
            },
            xform: oe,
          });
        } else throw new Ge('You must provide either an email or phone number and a password');
        const { data: n, error: s } = t;
        return s
          ? { data: { user: null, session: null }, error: s }
          : !n || !n.session || !n.user
          ? { data: { user: null, session: null }, error: new bt() }
          : (n.session &&
              (yield this._saveSession(n.session),
              this._notifyAllSubscribers('SIGNED_IN', n.session)),
            { data: { user: n.user, session: n.session }, error: s });
      } catch (t) {
        if (T(t)) return { data: { user: null, session: null }, error: t };
        throw t;
      }
    });
  }
  signInWithOAuth(e) {
    var t, n, s, i;
    return b(this, void 0, void 0, function* () {
      return (
        yield this._removeSession(),
        yield this._handleProviderSignIn(e.provider, {
          redirectTo: (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo,
          scopes: (n = e.options) === null || n === void 0 ? void 0 : n.scopes,
          queryParams: (s = e.options) === null || s === void 0 ? void 0 : s.queryParams,
          skipBrowserRedirect:
            (i = e.options) === null || i === void 0 ? void 0 : i.skipBrowserRedirect,
        })
      );
    });
  }
  exchangeCodeForSession(e) {
    return b(this, void 0, void 0, function* () {
      const t = yield qe(this.storage, `${this.storageKey}-code-verifier`),
        { data: n, error: s } = yield A(this.fetch, 'POST', `${this.url}/token?grant_type=pkce`, {
          headers: this.headers,
          body: { auth_code: e, code_verifier: t },
          xform: oe,
        });
      return (
        yield _t(this.storage, `${this.storageKey}-code-verifier`),
        s
          ? { data: { user: null, session: null }, error: s }
          : !n || !n.session || !n.user
          ? { data: { user: null, session: null }, error: new bt() }
          : (n.session &&
              (yield this._saveSession(n.session),
              this._notifyAllSubscribers('SIGNED_IN', n.session)),
            { data: n, error: s })
      );
    });
  }
  signInWithIdToken(e) {
    return b(this, void 0, void 0, function* () {
      yield this._removeSession();
      try {
        const { options: t, provider: n, token: s, nonce: i } = e,
          o = yield A(this.fetch, 'POST', `${this.url}/token?grant_type=id_token`, {
            headers: this.headers,
            body: {
              provider: n,
              id_token: s,
              nonce: i,
              gotrue_meta_security: { captcha_token: t?.captchaToken },
            },
            xform: oe,
          }),
          { data: a, error: c } = o;
        return c
          ? { data: { user: null, session: null }, error: c }
          : !a || !a.session || !a.user
          ? { data: { user: null, session: null }, error: new bt() }
          : (a.session &&
              (yield this._saveSession(a.session),
              this._notifyAllSubscribers('SIGNED_IN', a.session)),
            { data: a, error: c });
      } catch (t) {
        if (T(t)) return { data: { user: null, session: null }, error: t };
        throw t;
      }
    });
  }
  signInWithOtp(e) {
    var t, n, s, i, o;
    return b(this, void 0, void 0, function* () {
      try {
        if ((yield this._removeSession(), 'email' in e)) {
          const { email: a, options: c } = e;
          let u = null,
            l = null;
          if (this.flowType === 'pkce') {
            const f = He();
            yield Ee(this.storage, `${this.storageKey}-code-verifier`, f),
              (u = yield Je(f)),
              (l = f === u ? 'plain' : 's256');
          }
          const { error: h } = yield A(this.fetch, 'POST', `${this.url}/otp`, {
            headers: this.headers,
            body: {
              email: a,
              data: (t = c?.data) !== null && t !== void 0 ? t : {},
              create_user: (n = c?.shouldCreateUser) !== null && n !== void 0 ? n : !0,
              gotrue_meta_security: { captcha_token: c?.captchaToken },
              code_challenge: u,
              code_challenge_method: l,
            },
            redirectTo: c?.emailRedirectTo,
          });
          return { data: { user: null, session: null }, error: h };
        }
        if ('phone' in e) {
          const { phone: a, options: c } = e,
            { error: u } = yield A(this.fetch, 'POST', `${this.url}/otp`, {
              headers: this.headers,
              body: {
                phone: a,
                data: (s = c?.data) !== null && s !== void 0 ? s : {},
                create_user: (i = c?.shouldCreateUser) !== null && i !== void 0 ? i : !0,
                gotrue_meta_security: { captcha_token: c?.captchaToken },
                channel: (o = c?.channel) !== null && o !== void 0 ? o : 'sms',
              },
            });
          return { data: { user: null, session: null }, error: u };
        }
        throw new Ge('You must provide either an email or phone number.');
      } catch (a) {
        if (T(a)) return { data: { user: null, session: null }, error: a };
        throw a;
      }
    });
  }
  verifyOtp(e) {
    var t, n;
    return b(this, void 0, void 0, function* () {
      try {
        e.type !== 'email_change' && e.type !== 'phone_change' && (yield this._removeSession());
        const { data: s, error: i } = yield A(this.fetch, 'POST', `${this.url}/verify`, {
          headers: this.headers,
          body: Object.assign(Object.assign({}, e), {
            gotrue_meta_security: {
              captcha_token: (t = e.options) === null || t === void 0 ? void 0 : t.captchaToken,
            },
          }),
          redirectTo: (n = e.options) === null || n === void 0 ? void 0 : n.redirectTo,
          xform: oe,
        });
        if (i) throw i;
        if (!s) throw new Error('An error occurred on token verification.');
        const o = s.session,
          a = s.user;
        return (
          o?.access_token &&
            (yield this._saveSession(o), this._notifyAllSubscribers('SIGNED_IN', o)),
          { data: { user: a, session: o }, error: null }
        );
      } catch (s) {
        if (T(s)) return { data: { user: null, session: null }, error: s };
        throw s;
      }
    });
  }
  signInWithSSO(e) {
    var t, n, s;
    return b(this, void 0, void 0, function* () {
      try {
        return (
          yield this._removeSession(),
          yield A(this.fetch, 'POST', `${this.url}/sso`, {
            body: Object.assign(
              Object.assign(
                Object.assign(
                  Object.assign(
                    Object.assign({}, 'providerId' in e ? { provider_id: e.providerId } : null),
                    'domain' in e ? { domain: e.domain } : null,
                  ),
                  {
                    redirect_to:
                      (n = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo) !==
                        null && n !== void 0
                        ? n
                        : void 0,
                  },
                ),
                !((s = e?.options) === null || s === void 0) && s.captchaToken
                  ? { gotrue_meta_security: { captcha_token: e.options.captchaToken } }
                  : null,
              ),
              { skip_http_redirect: !0 },
            ),
            headers: this.headers,
            xform: Rs,
          })
        );
      } catch (i) {
        if (T(i)) return { data: null, error: i };
        throw i;
      }
    });
  }
  reauthenticate() {
    return b(this, void 0, void 0, function* () {
      try {
        const {
          data: { session: e },
          error: t,
        } = yield this.getSession();
        if (t) throw t;
        if (!e) throw new _e();
        const { error: n } = yield A(this.fetch, 'GET', `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: e.access_token,
        });
        return { data: { user: null, session: null }, error: n };
      } catch (e) {
        if (T(e)) return { data: { user: null, session: null }, error: e };
        throw e;
      }
    });
  }
  resend(e) {
    return b(this, void 0, void 0, function* () {
      try {
        yield this._removeSession();
        const t = `${this.url}/resend`;
        if ('email' in e) {
          const { email: n, type: s, options: i } = e,
            { error: o } = yield A(this.fetch, 'POST', t, {
              headers: this.headers,
              body: { email: n, type: s, gotrue_meta_security: { captcha_token: i?.captchaToken } },
            });
          return { data: { user: null, session: null }, error: o };
        } else if ('phone' in e) {
          const { phone: n, type: s, options: i } = e,
            { error: o } = yield A(this.fetch, 'POST', t, {
              headers: this.headers,
              body: { phone: n, type: s, gotrue_meta_security: { captcha_token: i?.captchaToken } },
            });
          return { data: { user: null, session: null }, error: o };
        }
        throw new Ge('You must provide either an email or phone number and a type');
      } catch (t) {
        if (T(t)) return { data: { user: null, session: null }, error: t };
        throw t;
      }
    });
  }
  getSession() {
    return b(this, void 0, void 0, function* () {
      yield this.initializePromise;
      let e = null;
      if (this.persistSession) {
        const i = yield qe(this.storage, this.storageKey);
        i !== null && (this._isValidSession(i) ? (e = i) : yield this._removeSession());
      } else e = this.inMemorySession;
      if (!e) return { data: { session: null }, error: null };
      if (!(e.expires_at ? e.expires_at <= Date.now() / 1e3 : !1))
        return { data: { session: e }, error: null };
      const { session: n, error: s } = yield this._callRefreshToken(e.refresh_token);
      return s ? { data: { session: null }, error: s } : { data: { session: n }, error: null };
    });
  }
  getUser(e) {
    var t, n;
    return b(this, void 0, void 0, function* () {
      try {
        if (!e) {
          const { data: s, error: i } = yield this.getSession();
          if (i) throw i;
          e =
            (n = (t = s.session) === null || t === void 0 ? void 0 : t.access_token) !== null &&
            n !== void 0
              ? n
              : void 0;
        }
        return yield A(this.fetch, 'GET', `${this.url}/user`, {
          headers: this.headers,
          jwt: e,
          xform: fe,
        });
      } catch (s) {
        if (T(s)) return { data: { user: null }, error: s };
        throw s;
      }
    });
  }
  updateUser(e, t = {}) {
    return b(this, void 0, void 0, function* () {
      try {
        const { data: n, error: s } = yield this.getSession();
        if (s) throw s;
        if (!n.session) throw new _e();
        const i = n.session,
          { data: o, error: a } = yield A(this.fetch, 'PUT', `${this.url}/user`, {
            headers: this.headers,
            redirectTo: t?.emailRedirectTo,
            body: e,
            jwt: i.access_token,
            xform: fe,
          });
        if (a) throw a;
        return (
          (i.user = o.user),
          yield this._saveSession(i),
          this._notifyAllSubscribers('USER_UPDATED', i),
          { data: { user: i.user }, error: null }
        );
      } catch (n) {
        if (T(n)) return { data: { user: null }, error: n };
        throw n;
      }
    });
  }
  _decodeJWT(e) {
    return hr(e);
  }
  setSession(e) {
    return b(this, void 0, void 0, function* () {
      try {
        if (!e.access_token || !e.refresh_token) throw new _e();
        const t = Date.now() / 1e3;
        let n = t,
          s = !0,
          i = null;
        const o = hr(e.access_token);
        if ((o.exp && ((n = o.exp), (s = n <= t)), s)) {
          const { session: a, error: c } = yield this._callRefreshToken(e.refresh_token);
          if (c) return { data: { user: null, session: null }, error: c };
          if (!a) return { data: { user: null, session: null }, error: null };
          i = a;
        } else {
          const { data: a, error: c } = yield this.getUser(e.access_token);
          if (c) throw c;
          (i = {
            access_token: e.access_token,
            refresh_token: e.refresh_token,
            user: a.user,
            token_type: 'bearer',
            expires_in: n - t,
            expires_at: n,
          }),
            yield this._saveSession(i),
            this._notifyAllSubscribers('SIGNED_IN', i);
        }
        return { data: { user: i.user, session: i }, error: null };
      } catch (t) {
        if (T(t)) return { data: { session: null, user: null }, error: t };
        throw t;
      }
    });
  }
  refreshSession(e) {
    var t;
    return b(this, void 0, void 0, function* () {
      try {
        if (!e) {
          const { data: i, error: o } = yield this.getSession();
          if (o) throw o;
          e = (t = i.session) !== null && t !== void 0 ? t : void 0;
        }
        if (!e?.refresh_token) throw new _e();
        const { session: n, error: s } = yield this._callRefreshToken(e.refresh_token);
        return s
          ? { data: { user: null, session: null }, error: s }
          : n
          ? { data: { user: n.user, session: n }, error: null }
          : { data: { user: null, session: null }, error: null };
      } catch (n) {
        if (T(n)) return { data: { user: null, session: null }, error: n };
        throw n;
      }
    });
  }
  _getSessionFromUrl(e) {
    return b(this, void 0, void 0, function* () {
      try {
        if (!ae()) throw new se('No browser detected.');
        if (this.flowType === 'implicit' && !this._isImplicitGrantFlow())
          throw new se('Not a valid implicit grant flow url.');
        if (this.flowType == 'pkce' && !e) throw new wt('Not a valid PKCE flow url.');
        if (e) {
          const _ = G('code');
          if (!_) throw new wt('No code detected.');
          const { data: $, error: m } = yield this.exchangeCodeForSession(_);
          if (m) throw m;
          if (!$.session) throw new wt('No session detected.');
          let k = new URL(window.location.href);
          return (
            k.searchParams.delete('code'),
            window.history.replaceState(window.history.state, '', k.toString()),
            { data: { session: $.session, redirectType: null }, error: null }
          );
        }
        const t = G('error_description');
        if (t) {
          const _ = G('error_code');
          if (!_) throw new se('No error_code detected.');
          const $ = G('error');
          throw $ ? new se(t, { error: $, code: _ }) : new se('No error detected.');
        }
        const n = G('provider_token'),
          s = G('provider_refresh_token'),
          i = G('access_token');
        if (!i) throw new se('No access_token detected.');
        const o = G('expires_in');
        if (!o) throw new se('No expires_in detected.');
        const a = G('refresh_token');
        if (!a) throw new se('No refresh_token detected.');
        const c = G('token_type');
        if (!c) throw new se('No token_type detected.');
        const l = Math.round(Date.now() / 1e3) + parseInt(o),
          { data: h, error: f } = yield this.getUser(i);
        if (f) throw f;
        const p = h.user,
          g = {
            provider_token: n,
            provider_refresh_token: s,
            access_token: i,
            expires_in: parseInt(o),
            expires_at: l,
            refresh_token: a,
            token_type: c,
            user: p,
          },
          y = G('type');
        return (window.location.hash = ''), { data: { session: g, redirectType: y }, error: null };
      } catch (t) {
        if (T(t)) return { data: { session: null, redirectType: null }, error: t };
        throw t;
      }
    });
  }
  _isImplicitGrantFlow() {
    return ae() && (!!G('access_token') || !!G('error_description'));
  }
  _isPKCEFlow() {
    return b(this, void 0, void 0, function* () {
      const e = yield qe(this.storage, `${this.storageKey}-code-verifier`);
      return !!G('code') && !!e;
    });
  }
  signOut() {
    var e;
    return b(this, void 0, void 0, function* () {
      const { data: t, error: n } = yield this.getSession();
      if (n) return { error: n };
      const s = (e = t.session) === null || e === void 0 ? void 0 : e.access_token;
      if (s) {
        const { error: i } = yield this.admin.signOut(s);
        if (i && !(ks(i) && (i.status === 404 || i.status === 401))) return { error: i };
      }
      return (
        yield this._removeSession(),
        yield _t(this.storage, `${this.storageKey}-code-verifier`),
        this._notifyAllSubscribers('SIGNED_OUT', null),
        { error: null }
      );
    });
  }
  onAuthStateChange(e) {
    const t = _s(),
      n = {
        id: t,
        callback: e,
        unsubscribe: () => {
          this.stateChangeEmitters.delete(t);
        },
      };
    return (
      this.stateChangeEmitters.set(t, n), this.emitInitialSession(t), { data: { subscription: n } }
    );
  }
  emitInitialSession(e) {
    var t, n;
    return b(this, void 0, void 0, function* () {
      try {
        const {
          data: { session: s },
          error: i,
        } = yield this.getSession();
        if (i) throw i;
        (t = this.stateChangeEmitters.get(e)) === null ||
          t === void 0 ||
          t.callback('INITIAL_SESSION', s);
      } catch (s) {
        (n = this.stateChangeEmitters.get(e)) === null ||
          n === void 0 ||
          n.callback('INITIAL_SESSION', null),
          console.error(s);
      }
    });
  }
  resetPasswordForEmail(e, t = {}) {
    return b(this, void 0, void 0, function* () {
      let n = null,
        s = null;
      if (this.flowType === 'pkce') {
        const i = He();
        yield Ee(this.storage, `${this.storageKey}-code-verifier`, i),
          (n = yield Je(i)),
          (s = i === n ? 'plain' : 's256');
      }
      try {
        return yield A(this.fetch, 'POST', `${this.url}/recover`, {
          body: {
            email: e,
            code_challenge: n,
            code_challenge_method: s,
            gotrue_meta_security: { captcha_token: t.captchaToken },
          },
          headers: this.headers,
          redirectTo: t.redirectTo,
        });
      } catch (i) {
        if (T(i)) return { data: null, error: i };
        throw i;
      }
    });
  }
  _refreshAccessToken(e) {
    return b(this, void 0, void 0, function* () {
      try {
        const t = Date.now();
        return yield xs(
          (n) =>
            b(this, void 0, void 0, function* () {
              return (
                yield $s(n * 200),
                yield A(this.fetch, 'POST', `${this.url}/token?grant_type=refresh_token`, {
                  body: { refresh_token: e },
                  headers: this.headers,
                  xform: oe,
                })
              );
            }),
          (n, s, i) => i && i.error && i.error instanceof It && Date.now() + (n + 1) * 200 - t < $t,
        );
      } catch (t) {
        if (T(t)) return { data: { session: null, user: null }, error: t };
        throw t;
      }
    });
  }
  _isValidSession(e) {
    return (
      typeof e == 'object' &&
      e !== null &&
      'access_token' in e &&
      'refresh_token' in e &&
      'expires_at' in e
    );
  }
  _handleProviderSignIn(e, t) {
    return b(this, void 0, void 0, function* () {
      const n = yield this._getUrlForProvider(e, {
        redirectTo: t.redirectTo,
        scopes: t.scopes,
        queryParams: t.queryParams,
      });
      return (
        ae() && !t.skipBrowserRedirect && window.location.assign(n),
        { data: { provider: e, url: n }, error: null }
      );
    });
  }
  _recoverAndRefresh() {
    var e;
    return b(this, void 0, void 0, function* () {
      try {
        const t = yield qe(this.storage, this.storageKey);
        if (!this._isValidSession(t)) {
          t !== null && (yield this._removeSession());
          return;
        }
        const n = Math.round(Date.now() / 1e3);
        if (((e = t.expires_at) !== null && e !== void 0 ? e : 1 / 0) < n + qs) {
          if (this.autoRefreshToken && t.refresh_token) {
            const { error: s } = yield this._callRefreshToken(t.refresh_token);
            s && (console.log(s.message), yield this._removeSession());
          }
        } else this.persistSession && (yield this._saveSession(t)), this._notifyAllSubscribers('SIGNED_IN', t);
      } catch (t) {
        console.error(t);
        return;
      }
    });
  }
  _callRefreshToken(e) {
    var t, n;
    return b(this, void 0, void 0, function* () {
      if (this.refreshingDeferred) return this.refreshingDeferred.promise;
      try {
        if (((this.refreshingDeferred = new ut()), !e)) throw new _e();
        const { data: s, error: i } = yield this._refreshAccessToken(e);
        if (i) throw i;
        if (!s.session) throw new _e();
        yield this._saveSession(s.session),
          this._notifyAllSubscribers('TOKEN_REFRESHED', s.session);
        const o = { session: s.session, error: null };
        return this.refreshingDeferred.resolve(o), o;
      } catch (s) {
        if (T(s)) {
          const i = { session: null, error: s };
          return (t = this.refreshingDeferred) === null || t === void 0 || t.resolve(i), i;
        }
        throw ((n = this.refreshingDeferred) === null || n === void 0 || n.reject(s), s);
      } finally {
        this.refreshingDeferred = null;
      }
    });
  }
  _notifyAllSubscribers(e, t, n = !0) {
    this.broadcastChannel && n && this.broadcastChannel.postMessage({ event: e, session: t }),
      this.stateChangeEmitters.forEach((s) => s.callback(e, t));
  }
  _saveSession(e) {
    return b(this, void 0, void 0, function* () {
      this.persistSession || (this.inMemorySession = e),
        this.persistSession && e.expires_at && (yield this._persistSession(e));
    });
  }
  _persistSession(e) {
    return Ee(this.storage, this.storageKey, e);
  }
  _removeSession() {
    return b(this, void 0, void 0, function* () {
      this.persistSession ? yield _t(this.storage, this.storageKey) : (this.inMemorySession = null);
    });
  }
  _removeVisibilityChangedCallback() {
    const e = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      e && ae() && window?.removeEventListener && window.removeEventListener('visibilitychange', e);
    } catch (t) {
      console.error('removing visibilitychange callback failed', t);
    }
  }
  _startAutoRefresh() {
    return b(this, void 0, void 0, function* () {
      yield this._stopAutoRefresh();
      const e = setInterval(() => this._autoRefreshTokenTick(), $t);
      (this.autoRefreshTicker = e),
        e && typeof e == 'object' && typeof e.unref == 'function'
          ? e.unref()
          : typeof Deno < 'u' && typeof Deno.unrefTimer == 'function' && Deno.unrefTimer(e),
        yield this._autoRefreshTokenTick();
    });
  }
  _stopAutoRefresh() {
    return b(this, void 0, void 0, function* () {
      const e = this.autoRefreshTicker;
      (this.autoRefreshTicker = null), e && clearInterval(e);
    });
  }
  startAutoRefresh() {
    return b(this, void 0, void 0, function* () {
      this._removeVisibilityChangedCallback(), yield this._startAutoRefresh();
    });
  }
  stopAutoRefresh() {
    return b(this, void 0, void 0, function* () {
      this._removeVisibilityChangedCallback(), yield this._stopAutoRefresh();
    });
  }
  _autoRefreshTokenTick() {
    return b(this, void 0, void 0, function* () {
      const e = Date.now();
      try {
        const {
          data: { session: t },
        } = yield this.getSession();
        if (!t || !t.refresh_token || !t.expires_at) return;
        Math.floor((t.expires_at * 1e3 - e) / $t) < Gs &&
          (yield this._callRefreshToken(t.refresh_token));
      } catch (t) {
        console.error('Auto refresh tick failed with error. This is likely a transient error.', t);
      }
    });
  }
  _handleVisibilityChange() {
    return b(this, void 0, void 0, function* () {
      if (!ae() || !window?.addEventListener)
        return this.autoRefreshToken && this.startAutoRefresh(), !1;
      try {
        (this.visibilityChangedCallback = () =>
          b(this, void 0, void 0, function* () {
            return yield this._onVisibilityChanged(!1);
          })),
          window?.addEventListener('visibilitychange', this.visibilityChangedCallback),
          yield this._onVisibilityChanged(!0);
      } catch (e) {
        console.error('_handleVisibilityChange', e);
      }
    });
  }
  _onVisibilityChanged(e) {
    return b(this, void 0, void 0, function* () {
      document.visibilityState === 'visible'
        ? (e || (yield this.initializePromise, yield this._recoverAndRefresh()),
          this.autoRefreshToken && this._startAutoRefresh())
        : document.visibilityState === 'hidden' && this.autoRefreshToken && this._stopAutoRefresh();
    });
  }
  _getUrlForProvider(e, t) {
    return b(this, void 0, void 0, function* () {
      const n = [`provider=${encodeURIComponent(e)}`];
      if (
        (t?.redirectTo && n.push(`redirect_to=${encodeURIComponent(t.redirectTo)}`),
        t?.scopes && n.push(`scopes=${encodeURIComponent(t.scopes)}`),
        this.flowType === 'pkce')
      ) {
        const s = He();
        yield Ee(this.storage, `${this.storageKey}-code-verifier`, s);
        const i = yield Je(s),
          o = s === i ? 'plain' : 's256',
          a = new URLSearchParams({
            code_challenge: `${encodeURIComponent(i)}`,
            code_challenge_method: `${encodeURIComponent(o)}`,
          });
        n.push(a.toString());
      }
      if (t?.queryParams) {
        const s = new URLSearchParams(t.queryParams);
        n.push(s.toString());
      }
      return `${this.url}/authorize?${n.join('&')}`;
    });
  }
  _unenroll(e) {
    var t;
    return b(this, void 0, void 0, function* () {
      try {
        const { data: n, error: s } = yield this.getSession();
        return s
          ? { data: null, error: s }
          : yield A(this.fetch, 'DELETE', `${this.url}/factors/${e.factorId}`, {
              headers: this.headers,
              jwt: (t = n?.session) === null || t === void 0 ? void 0 : t.access_token,
            });
      } catch (n) {
        if (T(n)) return { data: null, error: n };
        throw n;
      }
    });
  }
  _enroll(e) {
    var t, n;
    return b(this, void 0, void 0, function* () {
      try {
        const { data: s, error: i } = yield this.getSession();
        if (i) return { data: null, error: i };
        const { data: o, error: a } = yield A(this.fetch, 'POST', `${this.url}/factors`, {
          body: { friendly_name: e.friendlyName, factor_type: e.factorType, issuer: e.issuer },
          headers: this.headers,
          jwt: (t = s?.session) === null || t === void 0 ? void 0 : t.access_token,
        });
        return a
          ? { data: null, error: a }
          : (!((n = o?.totp) === null || n === void 0) &&
              n.qr_code &&
              (o.totp.qr_code = `data:image/svg+xml;utf-8,${o.totp.qr_code}`),
            { data: o, error: null });
      } catch (s) {
        if (T(s)) return { data: null, error: s };
        throw s;
      }
    });
  }
  _verify(e) {
    var t;
    return b(this, void 0, void 0, function* () {
      try {
        const { data: n, error: s } = yield this.getSession();
        if (s) return { data: null, error: s };
        const { data: i, error: o } = yield A(
          this.fetch,
          'POST',
          `${this.url}/factors/${e.factorId}/verify`,
          {
            body: { code: e.code, challenge_id: e.challengeId },
            headers: this.headers,
            jwt: (t = n?.session) === null || t === void 0 ? void 0 : t.access_token,
          },
        );
        return o
          ? { data: null, error: o }
          : (yield this._saveSession(
              Object.assign({ expires_at: Math.round(Date.now() / 1e3) + i.expires_in }, i),
            ),
            this._notifyAllSubscribers('MFA_CHALLENGE_VERIFIED', i),
            { data: i, error: o });
      } catch (n) {
        if (T(n)) return { data: null, error: n };
        throw n;
      }
    });
  }
  _challenge(e) {
    var t;
    return b(this, void 0, void 0, function* () {
      try {
        const { data: n, error: s } = yield this.getSession();
        return s
          ? { data: null, error: s }
          : yield A(this.fetch, 'POST', `${this.url}/factors/${e.factorId}/challenge`, {
              headers: this.headers,
              jwt: (t = n?.session) === null || t === void 0 ? void 0 : t.access_token,
            });
      } catch (n) {
        if (T(n)) return { data: null, error: n };
        throw n;
      }
    });
  }
  _challengeAndVerify(e) {
    return b(this, void 0, void 0, function* () {
      const { data: t, error: n } = yield this._challenge({ factorId: e.factorId });
      return n
        ? { data: null, error: n }
        : yield this._verify({ factorId: e.factorId, challengeId: t.id, code: e.code });
    });
  }
  _listFactors() {
    return b(this, void 0, void 0, function* () {
      const {
        data: { user: e },
        error: t,
      } = yield this.getUser();
      if (t) return { data: null, error: t };
      const n = e?.factors || [],
        s = n.filter((i) => i.factor_type === 'totp' && i.status === 'verified');
      return { data: { all: n, totp: s }, error: null };
    });
  }
  _getAuthenticatorAssuranceLevel() {
    var e, t;
    return b(this, void 0, void 0, function* () {
      const {
        data: { session: n },
        error: s,
      } = yield this.getSession();
      if (s) return { data: null, error: s };
      if (!n)
        return {
          data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
          error: null,
        };
      const i = this._decodeJWT(n.access_token);
      let o = null;
      i.aal && (o = i.aal);
      let a = o;
      ((t =
        (e = n.user.factors) === null || e === void 0
          ? void 0
          : e.filter((l) => l.status === 'verified')) !== null && t !== void 0
        ? t
        : []
      ).length > 0 && (a = 'aal2');
      const u = i.amr || [];
      return {
        data: { currentLevel: o, nextLevel: a, currentAuthenticationMethods: u },
        error: null,
      };
    });
  }
}
class Vs extends Ks {
  constructor(e) {
    super(e);
  }
}
var Ws =
  (globalThis && globalThis.__awaiter) ||
  function (r, e, t, n) {
    function s(i) {
      return i instanceof t
        ? i
        : new t(function (o) {
            o(i);
          });
    }
    return new (t || (t = Promise))(function (i, o) {
      function a(l) {
        try {
          u(n.next(l));
        } catch (h) {
          o(h);
        }
      }
      function c(l) {
        try {
          u(n.throw(l));
        } catch (h) {
          o(h);
        }
      }
      function u(l) {
        l.done ? i(l.value) : s(l.value).then(a, c);
      }
      u((n = n.apply(r, e || [])).next());
    });
  };
const Xs = { headers: hs },
  Ys = { schema: 'public' },
  Qs = { autoRefreshToken: !0, persistSession: !0, detectSessionInUrl: !0, flowType: 'implicit' },
  Zs = {};
class eo {
  constructor(e, t, n) {
    var s, i, o, a, c, u, l, h;
    if (((this.supabaseUrl = e), (this.supabaseKey = t), !e))
      throw new Error('supabaseUrl is required.');
    if (!t) throw new Error('supabaseKey is required.');
    const f = vs(e);
    (this.realtimeUrl = `${f}/realtime/v1`.replace(/^http/i, 'ws')),
      (this.authUrl = `${f}/auth/v1`),
      (this.storageUrl = `${f}/storage/v1`),
      (this.functionsUrl = `${f}/functions/v1`);
    const p = `sb-${new URL(this.authUrl).hostname.split('.')[0]}-auth-token`,
      g = {
        db: Ys,
        realtime: Zs,
        auth: Object.assign(Object.assign({}, Qs), { storageKey: p }),
        global: Xs,
      },
      y = ys(n ?? {}, g);
    (this.storageKey =
      (i = (s = y.auth) === null || s === void 0 ? void 0 : s.storageKey) !== null && i !== void 0
        ? i
        : ''),
      (this.headers =
        (a = (o = y.global) === null || o === void 0 ? void 0 : o.headers) !== null && a !== void 0
          ? a
          : {}),
      (this.auth = this._initSupabaseAuthClient(
        (c = y.auth) !== null && c !== void 0 ? c : {},
        this.headers,
        (u = y.global) === null || u === void 0 ? void 0 : u.fetch,
      )),
      (this.fetch = ps(
        t,
        this._getAccessToken.bind(this),
        (l = y.global) === null || l === void 0 ? void 0 : l.fetch,
      )),
      (this.realtime = this._initRealtimeClient(
        Object.assign({ headers: this.headers }, y.realtime),
      )),
      (this.rest = new yi(`${f}/rest/v1`, {
        headers: this.headers,
        schema: (h = y.db) === null || h === void 0 ? void 0 : h.schema,
        fetch: this.fetch,
      })),
      this._listenForAuthEvents();
  }
  get functions() {
    return new ci(this.functionsUrl, { headers: this.headers, customFetch: this.fetch });
  }
  get storage() {
    return new cs(this.storageUrl, this.headers, this.fetch);
  }
  from(e) {
    return this.rest.from(e);
  }
  rpc(e, t = {}, n) {
    return this.rest.rpc(e, t, n);
  }
  channel(e, t = { config: {} }) {
    return this.realtime.channel(e, t);
  }
  getChannels() {
    return this.realtime.getChannels();
  }
  removeChannel(e) {
    return this.realtime.removeChannel(e);
  }
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  _getAccessToken() {
    var e, t;
    return Ws(this, void 0, void 0, function* () {
      const { data: n } = yield this.auth.getSession();
      return (t = (e = n.session) === null || e === void 0 ? void 0 : e.access_token) !== null &&
        t !== void 0
        ? t
        : null;
    });
  }
  _initSupabaseAuthClient(
    {
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: n,
      storage: s,
      storageKey: i,
      flowType: o,
    },
    a,
    c,
  ) {
    const u = { Authorization: `Bearer ${this.supabaseKey}`, apikey: `${this.supabaseKey}` };
    return new Vs({
      url: this.authUrl,
      headers: Object.assign(Object.assign({}, u), a),
      storageKey: i,
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: n,
      storage: s,
      flowType: o,
      fetch: c,
    });
  }
  _initRealtimeClient(e) {
    return new Qi(
      this.realtimeUrl,
      Object.assign(Object.assign({}, e), {
        params: Object.assign({ apikey: this.supabaseKey }, e?.params),
      }),
    );
  }
  _listenForAuthEvents() {
    return this.auth.onAuthStateChange((t, n) => {
      this._handleTokenChanged(t, n?.access_token, 'CLIENT');
    });
  }
  _handleTokenChanged(e, t, n) {
    (e === 'TOKEN_REFRESHED' || e === 'SIGNED_IN') && this.changedAccessToken !== t
      ? (this.realtime.setAuth(t ?? null), (this.changedAccessToken = t))
      : e === 'SIGNED_OUT' &&
        (this.realtime.setAuth(this.supabaseKey),
        n == 'STORAGE' && this.auth.signOut(),
        (this.changedAccessToken = void 0));
  }
}
const to = (r, e, t) => new eo(r, e, t),
  Gr = to(
    'https://vzebfzndoudotlartpam.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6ZWJmem5kb3Vkb3RsYXJ0cGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MTIxMzAsImV4cCI6MjAwNTE4ODEzMH0.q1GUrMv_2vfjvXDe2x5v5I1hCXVqkJElJB6QXtxZmxw',
  ),
  Kr = 4,
  ro = (r, e) => {
    r -= 1;
    const t = e ? +e : 3,
      n = r ? r * t : 0,
      s = r ? n + e - 1 : e - 1;
    return { from: n, to: s };
  };
async function no(r = 1) {
  const { from: e, to: t } = ro(Math.max(1, r), Kr),
    n = Gr.from('comments')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: !1 })
      .range(e, t);
  n.eq('show', 'true');
  const { data: s, status: i, count: o } = await n;
  return i === 0 ? Promise.reject('Database Sleep') : { data: s, count: o, page: r };
}
async function io(r) {
  so(r);
  const { data: e, error: t } = await Gr.from('comments').insert(r);
  return e;
}
const so = (r) => {
    if (typeof r != 'object') throw Error('Is not Object');
    if (r.show) throw new Error("show should't exist");
    const e = ['created_at', 'rating', 'email', 'name', 'comment'];
    for (const t of e) if (!r[t]) throw new Error(`${t} is missing or empty`);
    if (r.rating === -1) throw new Error('rating');
  },
  oo = P(
    '<button class="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">',
  ),
  ao = P(
    '<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" class="mr-1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="4" r="24" stroke-dasharray="113.09733552923255 39.69911184307752"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.6s" values="0 50 50;360 50 50" keyTimes="0;1">',
  ),
  lo = P(
    '<div class="flex flex-col"><hr class="my-4 "><div class="mb-4"><label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label><input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Введите email" required></div><div class="mb-4"><label for="name" class="block mb-2 text-sm font-medium text-gray-900">Имя</label><input type="name" name="name" id="name" maxlength="52" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Введите имя" required></div><div class="mb-4"><label for="comment" class="block mb-2 text-sm font-medium text-gray-900">Комментарий</label><textarea cols="30" rows="5" name="comment" id="comment" maxlength="512" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></textarea></div><button type="submit" class="flex self-center items-center text-white bg-blue-700 disabled:opacity-80 disabled:cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm pr-5 pl-3 py-2.5">Отправить',
  ),
  co = P('<form class="flex flex-col w-full mt-5 p-5 bg-white shadow-lg">'),
  uo = P('<div>Спасибо! Ваш отзыв был успешно отправлен'),
  ho = P('<div class=" pt-4 pb-6 flex flex-col items-center w-full">'),
  fo = () => {
    const [r, e] = K(!1),
      [t, n] = K(!1),
      [s, i] = K(!1);
    let o;
    const [a, c] = jn({ name: '', email: '', comment: '', rating: -1 }),
      u = (f) => {
        const { name: p, value: g } = f.currentTarget;
        c({ ...a, [p]: g });
      };
    function l() {
      e((f) => !f);
    }
    async function h(f) {
      f.preventDefault();
      try {
        const p = JSON.parse(JSON.stringify(a)),
          g = new Date(),
          y = g.getFullYear(),
          _ = g.getMonth() + 1,
          $ = g.getDate();
        i(!0), await io({ ...p, created_at: `${y}-${_}-${$}` }), n(!0);
      } catch (p) {
        console.error(p);
      } finally {
        i(!1);
      }
    }
    return (
      st(() => {
        (a.rating !== -1 || r()) &&
          (o?.scrollIntoView({ behavior: 'smooth', block: 'end' }), a.rating);
      }),
      Qr(() => {}),
      (() => {
        const f = ho(),
          p = o;
        return (
          typeof p == 'function' ? Pr(p, f) : (o = f),
          j(
            f,
            S(be, {
              get when() {
                return !t();
              },
              get children() {
                const g = oo();
                return (g.$$click = l), j(g, () => (r() ? 'Скрыть форму' : 'Оставить отзыв')), g;
              },
            }),
            null,
          ),
          j(
            f,
            S(be, {
              get when() {
                return V(() => !!r())() && !t();
              },
              get children() {
                const g = co();
                return (
                  g.addEventListener('submit', h),
                  j(g, S(ei, { onChange: (y) => c({ ...a, rating: y }) }), null),
                  j(
                    g,
                    S(be, {
                      get when() {
                        return a.rating !== -1;
                      },
                      get children() {
                        const y = lo(),
                          _ = y.firstChild,
                          $ = _.nextSibling,
                          m = $.firstChild,
                          k = m.nextSibling,
                          x = $.nextSibling,
                          M = x.firstChild,
                          Y = M.nextSibling,
                          Z = x.nextSibling,
                          O = Z.firstChild,
                          D = O.nextSibling,
                          I = Z.nextSibling,
                          U = I.firstChild;
                        return (
                          k.addEventListener('change', u),
                          Y.addEventListener('change', u),
                          D.addEventListener('change', u),
                          j(
                            I,
                            S(be, {
                              get when() {
                                return s();
                              },
                              get children() {
                                return ao();
                              },
                            }),
                            U,
                          ),
                          N(() => (I.disabled = s())),
                          y
                        );
                      },
                    }),
                    null,
                  ),
                  g
                );
              },
            }),
            null,
          ),
          j(
            f,
            S(be, {
              get when() {
                return t();
              },
              get children() {
                return uo();
              },
            }),
            null,
          ),
          N(() => E(f, 'id', ge('add-comment-form'))),
          f
        );
      })()
    );
  };
Ne(['click']);
const go = P('<svg>'),
  Dt = (r) => {
    const [e, t] = cn(r, ['path']);
    return (() => {
      const n = go();
      return (
        jr(
          n,
          Or(
            {
              get viewBox() {
                return e.path.mini ? '0 0 20 20' : '0 0 24 24';
              },
              get fill() {
                return e.path.outline ? 'none' : 'currentColor';
              },
              get stroke() {
                return e.path.outline ? 'currentColor' : 'none';
              },
              get ['stroke-width']() {
                return e.path.outline ? 1.5 : void 0;
              },
            },
            t,
          ),
          !0,
          !0,
        ),
        j(n, () => e.path.path),
        n
      );
    })();
  },
  po = P(
    '<svg><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></svg>',
    !1,
    !0,
  ),
  vo = { path: () => po(), outline: !0, mini: !1 },
  yo = P(
    '<svg><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"></svg>',
    !1,
    !0,
  ),
  mo = { path: () => yo(), outline: !1, mini: !1 },
  _o = Array.from({ length: 5 }).fill(0),
  Lt = 24,
  bo = P(
    '<svg><path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd"></svg>',
    !1,
    !0,
  ),
  wo = { path: () => bo(), outline: !1, mini: !0 },
  $o = P(
    '<div class="w-fit ml-auto absolute right-0 bottom-0 hover:opacity-80 cursor-pointer transition-opacity duration-300">',
  ),
  xo = P('<div class="relative my-2"><p>'),
  So = ({ content: r, ...e }) => {
    const { class: t, ...n } = e;
    let s;
    const [i, o] = K(!0),
      [a, c] = K(!1);
    return (
      st(() => {
        const u = s.offsetHeight < s.scrollHeight || s.offsetWidth < s.scrollWidth;
        c(u);
      }),
      (() => {
        const u = xo(),
          l = u.firstChild;
        return (
          Pr((h) => (s = h), l),
          jr(
            l,
            Or(
              {
                get classList() {
                  return {
                    [`${t} pr-8 transition-all duration-500`]: !0,
                    ['line-clamp-3 max-h-[6em]']: i(),
                    ['line-clamp-[40] max-h-[40em] ']: !i(),
                  };
                },
              },
              n,
            ),
            !1,
            !0,
          ),
          j(l, r),
          j(
            u,
            S(be, {
              get when() {
                return a();
              },
              get children() {
                const h = $o();
                return (
                  (h.$$click = () => o((f) => !f)),
                  j(h, () =>
                    S(Dt, {
                      path: wo,
                      width: Lt,
                      get classList() {
                        return { 'transition-all duration-300': !0, 'rotate-180': !i() };
                      },
                    }),
                  ),
                  N(() => E(h, 'title', i() ? 'Раскрыть' : 'Скрыть')),
                  h
                );
              },
            }),
            null,
          ),
          u
        );
      })()
    );
  };
Ne(['click']);
const Oo = P(
    '<article class="px-4 py-4 bg-white rounded-md flex flex-col border"><div class="flex justify-between"><h4 class="mr-4 font-bold text-xl line-clamp-1"></h4><div class="flex"></div></div><div class="flex items-end justify-end text-gray-500">',
  ),
  To = P('<div class="text-white w-fit px-2 mt-2">'),
  Eo = P(
    '<div role="status" class="max-w-xs animate-pulse px-4 py-4 bg-white rounded-md flex flex-col border w-[320px]"><div class="flex justify-between"><div class="h-3 bg-gray-200 rounded-full w-36 mb-4"></div><div class="flex gap-1"><div class="h-3 w-3 bg-gray-200 rounded-full mb-4"></div><div class="h-3 w-3 bg-gray-200 rounded-full mb-4"></div><div class="h-3 w-3 bg-gray-200 rounded-full mb-4"></div><div class="h-3 w-3 bg-gray-200 rounded-full mb-4"></div><div class="h-3 w-3 bg-gray-200 rounded-full mb-4"></div></div></div><div class="h-2 bg-gray-200 rounded-full mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full mb-2.5"></div><div class="h-2 bg-gray-200 rounded-full mb-4"></div><div class="h-2 self-end bg-gray-200 rounded-full w-[100px]"></div><span class="sr-only">Loading...',
  ),
  ko = {
    1: 'января',
    2: 'февраля',
    3: 'марта',
    4: 'апреля',
    5: 'мая',
    6: 'июня',
    7: 'июля',
    8: 'августа',
    9: 'сентября',
    10: 'октября',
    11: 'ноября',
    12: 'декабря',
  };
function Ao(r) {
  const [e, t, n] = r.split('-');
  return `${n} ${ko[Number(t)]}, ${e} г.`;
}
const ke = (r = '') => ge(r ? 'comment-card--' + r : 'comment-card'),
  jo = (r) =>
    (() => {
      const e = Oo(),
        t = e.firstChild,
        n = t.firstChild,
        s = n.nextSibling,
        i = t.nextSibling;
      return (
        j(n, () => r.name),
        j(
          s,
          S(Er, {
            each: _o,
            children: (o, a) =>
              a() + 1 <= r.rating ? S(Dt, { path: mo, width: Lt }) : S(Dt, { path: vo, width: Lt }),
          }),
        ),
        j(
          e,
          S(So, {
            get id() {
              return ke('comment');
            },
            class: 'font-semibold',
            get content() {
              return r.comment;
            },
          }),
          i,
        ),
        j(i, () => Ao(r.created_at)),
        j(
          e,
          (() => {
            const o = V(() => !1);
            return () =>
              o() &&
              (() => {
                const a = To();
                return (
                  j(a, () => (r.show ? 'moderatted' : 'need review')),
                  N(
                    (c) => {
                      const u = r.show === !0,
                        l = r.show === !1;
                      return (
                        u !== c._v$7 && a.classList.toggle('bg-green-700', (c._v$7 = u)),
                        l !== c._v$8 && a.classList.toggle('bg-red-700', (c._v$8 = l)),
                        c
                      );
                    },
                    { _v$7: void 0, _v$8: void 0 },
                  ),
                  a
                );
              })();
          })(),
          null,
        ),
        N(
          (o) => {
            const a = ke(),
              c = r.id,
              u = ke('name'),
              l = r.name,
              h = ke('stars'),
              f = ke('created_at');
            return (
              a !== o._v$ && E(e, 'id', (o._v$ = a)),
              c !== o._v$2 && E(e, 'data-id', (o._v$2 = c)),
              u !== o._v$3 && E(n, 'id', (o._v$3 = u)),
              l !== o._v$4 && E(n, 'title', (o._v$4 = l)),
              h !== o._v$5 && E(s, 'id', (o._v$5 = h)),
              f !== o._v$6 && E(i, 'id', (o._v$6 = f)),
              o
            );
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0, _v$5: void 0, _v$6: void 0 },
        ),
        e
      );
    })(),
  fr = () => Eo(),
  Ut = -1,
  Nt = -2,
  Ve = (r, e) => {
    const t = e - r + 1;
    return Array.from({ length: t }, (n, s) => s + r);
  };
function Po(r) {
  return V(() => {
    const e = r.getCurrentPage(),
      t = r.totalCount,
      n = r.pageSize,
      s = r.siblingCount ?? 1,
      i = Math.ceil(t / n);
    if (s + 5 >= i) return Ve(1, i);
    const a = Math.max(e - s, 1),
      c = Math.min(e + s, i),
      u = a > 2,
      l = c < i - 2,
      h = 1,
      f = i;
    if (!u && l) {
      const p = 3 + 2 * s;
      return [...Ve(1, p), Nt, i];
    }
    if (u && !l) {
      const p = 3 + 2 * s,
        g = Ve(i - p + 1, i);
      return [h, Ut, ...g];
    }
    if (u && l) {
      const p = Ve(a, c);
      return [h, Ut, ...p, Nt, f];
    }
  });
}
const Co = P('<div class="my-2 mx-2">'),
  Ro = P('<div class="w-full bg-white rounded-md">'),
  Io = P('<div class="flex mt-4 gap-1">'),
  Do = P('<div class="my-4 mx-2">'),
  Lo = P('<button class="px-3 py-1 select-none transition-colors rounded">'),
  Uo = (r) => {
    const e = r.comments.length ?? 0,
      t = Po({ getCurrentPage: r.page, pageSize: Kr, totalCount: r.count, siblingCount: 2 }),
      n = Math.ceil(r.count / r.page());
    return S(Tt, {
      get children() {
        return S(Xe, {
          when: e > 0,
          get children() {
            return [
              S(Tt, {
                get children() {
                  return [
                    S(Xe, {
                      get when() {
                        return r.isLoading;
                      },
                      get children() {
                        return [S(fr, {}), Co(), S(fr, {})];
                      },
                    }),
                    S(Xe, {
                      get when() {
                        return !r.isLoading;
                      },
                      get children() {
                        const s = Ro();
                        return (
                          j(
                            s,
                            S(Er, {
                              get each() {
                                return r.comments;
                              },
                              children: (i, o) => {
                                const a = o() < e - 1;
                                return [S(jo, i), a && Do()];
                              },
                            }),
                          ),
                          N(() => E(s, 'id', ge('comment-container'))),
                          s
                        );
                      },
                    }),
                  ];
                },
              }),
              (() => {
                const s = Io();
                return (
                  j(
                    s,
                    (() => {
                      const i = V(() => !!t());
                      return () =>
                        i() &&
                        t()?.map((o) => {
                          const a = r.page();
                          if (a === o) return S(gr, { page: o, isCurrentPage: !0 });
                          let c = o;
                          return (
                            o === Ut && (c = Math.max(1, a - 5)),
                            o === Nt && (c = Math.min(n, a + 5)),
                            S(gr, { page: o < 0 ? '...' : o, onClick: () => r.onPageClick(c) })
                          );
                        });
                    })(),
                  ),
                  N(() => E(s, 'id', ge('pagination_container'))),
                  s
                );
              })(),
            ];
          },
        });
      },
    });
  };
function gr({ isCurrentPage: r, onClick: e, page: t }) {
  return (() => {
    const n = Lo();
    return (
      kr(n, 'click', e, !0),
      j(n, t),
      N(
        (s) => {
          const i = !!r,
            o = ge('pagination-button'),
            a = {
              'bg-blue-700 text-white cursor-default': r,
              'cursor-pointer  hover:bg-slate-100': !r,
            };
          return (
            i !== s._v$ && E(n, 'data-iscurrent', (s._v$ = i)),
            o !== s._v$2 && E(n, 'id', (s._v$2 = o)),
            (s._v$3 = Ar(n, a, s._v$3)),
            s
          );
        },
        { _v$: void 0, _v$2: void 0, _v$3: void 0 },
      ),
      n
    );
  })();
}
Ne(['click']);
const No = P(
    '<section class="w-full max-w-2xl flex flex-col items-center justify-center mx-auto p-4">',
  ),
  Mo = () => {
    const [r, e] = K(1),
      [t] = Xr(r, (n) => no(n));
    return (() => {
      const n = No();
      return (
        j(
          n,
          S(Tt, {
            get children() {
              return S(un, {
                get fallback() {
                  return [];
                },
                get children() {
                  return S(Xe, {
                    get when() {
                      return t();
                    },
                    get children() {
                      return [
                        S(Uo, {
                          get comments() {
                            return t()?.data || [];
                          },
                          page: r,
                          get count() {
                            return t()?.count ?? 0;
                          },
                          onPageClick: (s) => e(s),
                          get isLoading() {
                            return t.loading;
                          },
                        }),
                        S(fo, {}),
                      ];
                    },
                  });
                },
              });
            },
          }),
        ),
        N(() => E(n, 'id', ge('entry-point'))),
        n
      );
    })();
  };
const Bo = document.getElementById(Lr.CONTAINER_ID);
bn(() => S(Mo, {}), Bo);
