! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var a = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "/static/", t(0)
}([function(e, t, n) {
    e.exports = n(21)
}, function(e, t) {
    /*!
     * react-lite.js v0.15.14
     * (c) 2016 Jade Gu
     * Released under the MIT License.
     */
    "use strict";

    function n(e, t, n, r, a) {
        var o = {
            vtype: e,
            type: t,
            props: n,
            refs: De,
            key: r,
            ref: a
        };
        return e !== Ie && e !== Ve || (o.uid = ne()), o
    }

    function r(e, t, n) {
        var r = e.vtype,
            a = null;
        return r ? r === Me ? a = l(e, t, n) : r === Ve ? a = x(e, t, n) : r === Ie ? a = y(e, t, n) : r === je && (a = document.createComment("react-empty: " + e.uid)) : a = document.createTextNode(e), a
    }

    function a(e, t, n, r) {
        var a = e.vtype;
        if (a === Ve) return P(e, t, n, r);
        if (a === Ie) return g(e, t, n, r);
        if (a !== Me) return n;
        var i = e.props[Ne] && e.props[Ne].__html;
        return null != i ? (m(e, t, n, r), p(t, n, r)) : (o(e, t, n, r), m(e, t, n, r)), n
    }

    function o(e, t, n, r) {
        var a = {
            removes: [],
            updates: [],
            creates: []
        };
        h(a, e, t, n, r), ee(a.removes, s), ee(a.updates, i), ee(a.creates, u)
    }

    function i(e) {
        if (e) {
            var t = e.vnode,
                n = e.node;
            e.shouldIgnore || (t.vtype ? t.vtype === Me ? m(t, e.newVnode, n, e.parentContext) : t.vtype === Ie ? n = g(t, e.newVnode, n, e.parentContext) : t.vtype === Ve && (n = P(t, e.newVnode, n, e.parentContext)) : n.replaceData(0, n.length, e.newVnode));
            var r = n.parentNode.childNodes[e.index];
            return r !== n && n.parentNode.insertBefore(n, r), n
        }
    }

    function s(e) {
        c(e.vnode, e.node), e.node.parentNode.removeChild(e.node)
    }

    function u(e) {
        var t = r(e.vnode, e.parentContext, e.parentNode.namespaceURI);
        e.parentNode.insertBefore(t, e.parentNode.childNodes[e.index])
    }

    function c(e, t) {
        var n = e.vtype;
        n === Me ? v(e, t) : n === Ve ? w(e, t) : n === Ie && b(e, t)
    }

    function l(e, t, n) {
        var r = e.type,
            a = e.props,
            o = null;
        "svg" === r || n === _e ? (o = document.createElementNS(_e, r), n = _e) : o = document.createElement(r), p(e, o, t);
        var i = r.indexOf("-") >= 0 || null != a.is;
        return ie(o, a, i), N(e.refs, e.ref, o), o
    }

    function p(e, t, n) {
        for (var a = t.vchildren = d(e), o = t.namespaceURI, i = 0, s = a.length; s > i; i++) t.appendChild(r(a[i], n, o))
    }

    function d(e) {
        var t = e.props.children,
            n = [];
        return ct(t) ? ee(t, f, n) : f(t, n), n
    }

    function f(e, t) {
        if (null != e && "boolean" != typeof e) {
            if (!e.vtype) {
                if (e.toJS) return e = e.toJS(), void(ct(e) ? ee(e, f, t) : f(e, t));
                e = "" + e
            }
            t[t.length] = e
        }
    }

    function h(e, t, n, r, a) {
        var o = r.childNodes,
            i = r.vchildren,
            s = r.vchildren = d(n),
            u = i.length,
            c = s.length;
        if (0 !== u)
            if (0 !== c) {
                for (var l = Array(c), p = null, f = null, m = 0; u > m; m++)
                    for (var v = i[m], y = 0; c > y; y++)
                        if (!l[y]) {
                            var g = s[y];
                            if (v === g) {
                                var b = !0;
                                a && (v.vtype !== Ve && v.vtype !== Ie || v.type.contextTypes && (b = !1)), l[y] = {
                                    shouldIgnore: b,
                                    vnode: v,
                                    newVnode: g,
                                    node: o[m],
                                    parentContext: a,
                                    index: y
                                }, i[m] = null;
                                break
                            }
                        }
                for (var m = 0; u > m; m++) {
                    var T = i[m];
                    if (null !== T) {
                        for (var x = !0, y = 0; c > y; y++)
                            if (!l[y]) {
                                var P = s[y];
                                if (P.type === T.type && P.key === T.key && P.refs === T.refs) {
                                    l[y] = {
                                        vnode: T,
                                        newVnode: P,
                                        node: o[m],
                                        parentContext: a,
                                        index: y
                                    }, x = !1;
                                    break
                                }
                            }
                        x && (p || (p = []), p.push({
                            vnode: T,
                            node: o[m]
                        }))
                    }
                }
                for (var m = 0; c > m; m++) {
                    var w = l[m];
                    w ? w.vnode.vtype === Me && h(e, w.vnode, w.newVnode, w.node, w.parentContext) : (f || (f = []), f.push({
                        vnode: s[m],
                        parentNode: r,
                        parentContext: a,
                        index: m
                    }))
                }
                p && e.removes.push(p), f && e.creates.push(f), e.updates.push(l)
            } else
                for (var m = 0; u > m; m++) e.removes.push({
                    vnode: i[m],
                    node: o[m]
                });
        else if (c > 0)
            for (var m = 0; c > m; m++) e.creates.push({
                vnode: s[m],
                parentNode: r,
                parentContext: a,
                index: m
            })
    }

    function m(e, t, n) {
        var r = e.type.indexOf("-") >= 0 || null != e.props.is;
        return se(n, e.props, t.props, r), e.ref !== t.ref && (_(e.refs, e.ref), N(t.refs, t.ref, n)), n
    }

    function v(e, t) {
        for (var n = (e.props, t.vchildren), r = t.childNodes, a = 0, o = n.length; o > a; a++) c(n[a], r[a]);
        _(e.refs, e.ref), t.eventStore = t.vchildren = null
    }

    function y(e, t, n) {
        var a = T(e, t),
            o = r(a, t, n);
        return o.cache = o.cache || {}, o.cache[e.uid] = a, o
    }

    function g(e, t, n, r) {
        var a = e.uid,
            o = n.cache[a];
        delete n.cache[a];
        var i = T(t, r),
            s = A(o, i, n, r);
        return s.cache = s.cache || {}, s.cache[t.uid] = i, s !== n && R(s.cache, n.cache, s), s
    }

    function b(e, t) {
        var n = e.uid,
            r = t.cache[n];
        delete t.cache[n], c(r, t)
    }

    function T(e, t) {
        var r = e.type,
            a = e.props,
            o = C(t, r.contextTypes),
            i = r(a, o);
        if (i && i.render && (i = i.render()), null === i || i === !1) i = n(je);
        else if (!i || !i.vtype) throw new Error("@" + r.name + "#render:You may have returned undefined, an array or some other invalid object");
        return i
    }

    function x(e, t, n) {
        var a = e.type,
            o = e.props,
            i = e.uid,
            s = C(t, a.contextTypes),
            u = new a(o, s),
            c = u.$updater,
            l = u.$cache;
        l.parentContext = t, c.isPending = !0, u.props = u.props || o, u.context = u.context || s, u.componentWillMount && (u.componentWillMount(), u.state = c.getState());
        var p = E(u),
            d = r(p, k(u, t), n);
        return d.cache = d.cache || {}, d.cache[i] = u, l.vnode = p, l.node = d, l.isMounted = !0, Ge.push(u), N(e.refs, e.ref, u), d
    }

    function P(e, t, n, r) {
        var a = e.uid,
            o = n.cache[a],
            i = o.$updater,
            s = o.$cache,
            u = t.type,
            c = t.props,
            l = C(r, u.contextTypes);
        return delete n.cache[a], n.cache[t.uid] = o, s.parentContext = r, o.componentWillReceiveProps && (i.isPending = !0, o.componentWillReceiveProps(c, l), i.isPending = !1), i.emitUpdate(c, l), e.ref !== t.ref && (_(e.refs, e.ref), N(t.refs, t.ref, o)), s.node
    }

    function w(e, t) {
        var n = e.uid,
            r = t.cache[n],
            a = r.$cache;
        delete t.cache[n], _(e.refs, e.ref), r.setState = r.forceUpdate = X, r.componentWillUnmount && r.componentWillUnmount(), c(a.vnode, t), delete r.setState, a.isMounted = !1, a.node = a.parentContext = a.vnode = r.refs = r.context = null
    }

    function C(e, t) {
        var n = {};
        if (!t || !e) return n;
        for (var r in t) t.hasOwnProperty(r) && (n[r] = e[r]);
        return n
    }

    function E(e, t) {
        De = e.refs;
        var r = e.render();
        if (null === r || r === !1) r = n(je);
        else if (!r || !r.vtype) throw new Error("@" + e.constructor.name + "#render:You may have returned undefined, an array or some other invalid object");
        return De = null, r
    }

    function k(e, t) {
        if (e.getChildContext) {
            var n = e.getChildContext();
            n && (t = te(te({}, t), n))
        }
        return t
    }

    function S() {
        var e = Ge.length;
        if (e) {
            var t = Ge;
            Ge = [];
            for (var n = -1; e--;) {
                var r = t[++n],
                    a = r.$updater;
                r.componentDidMount && r.componentDidMount(), a.isPending = !1, a.emitUpdate()
            }
        }
    }

    function A(e, t, n, o) {
        var i = n;
        return null == t ? (c(e, n), n.parentNode.removeChild(n)) : e.type !== t.type || e.key !== t.key ? (c(e, n), i = r(t, o, n.namespaceURI), n.parentNode.replaceChild(i, n)) : (e !== t || o) && (i = a(e, t, n, o)), i
    }

    function O() {
        return this
    }

    function N(e, t, n) {
        e && null != t && n && (n.nodeName && !n.getDOMNode && (n.getDOMNode = O), J(t) ? t(n) : e[t] = n)
    }

    function _(e, t) {
        e && null != t && (J(t) ? t(null) : delete e[t])
    }

    function R(e, t, n) {
        for (var r in t)
            if (t.hasOwnProperty(r)) {
                var a = t[r];
                e[r] = a, a.forceUpdate && (a.$cache.node = n)
            }
    }

    function M(e) {
        this.instance = e, this.pendingStates = [], this.pendingCallbacks = [], this.isPending = !1, this.nextProps = this.nextContext = null, this.clearCallbacks = this.clearCallbacks.bind(this)
    }

    function I(e, t) {
        this.$updater = new M(this), this.$cache = {
            isMounted: !1
        }, this.props = e, this.state = {}, this.refs = {}, this.context = t
    }

    function V(e, t, n, r, a) {
        var o = !0;
        if (e.shouldComponentUpdate && (o = e.shouldComponentUpdate(t, n, r)), o === !1) return e.props = t, e.state = n, void(e.context = r || {});
        var i = e.$cache;
        i.props = t, i.state = n, i.context = r || {}, e.forceUpdate(a)
    }

    function j(e) {
        return e = "onDoubleClick" === e ? "ondblclick" : e, e.toLowerCase()
    }

    function D(e, t, n) {
        if (t = j(t), 1 === qe[t]) return void(e[t] = n);
        var r = e.eventStore || (e.eventStore = {});
        r[t] = n, He[t] || (document.addEventListener(t.substr(2), U, !1), He[t] = !0), Le && t === Fe && e.addEventListener("click", Be, !1);
        var a = e.nodeName;
        "onchange" !== t || "INPUT" !== a && "TEXTAREA" !== a || D(e, "oninput", n)
    }

    function G(e, t) {
        if (t = j(t), 1 === qe[t]) return void(e[t] = null);
        var n = e.eventStore || (e.eventStore = {});
        delete n[t], Le && t === Fe && e.removeEventListener("click", Be, !1);
        var r = e.nodeName;
        "onchange" !== t || "INPUT" !== r && "TEXTAREA" !== r || delete n.oninput
    }

    function U(e) {
        var t = e.target,
            n = e.type,
            r = "on" + n,
            a = void 0;
        for (Ue.isPending = !0; t;) {
            var o = t,
                i = o.eventStore,
                s = i && i[r];
            if (s) {
                if (a || (a = q(e)), a.currentTarget = t, s.call(t, a), a.$cancalBubble) break;
                t = t.parentNode
            } else t = t.parentNode
        }
        Ue.isPending = !1, Ue.batchUpdate()
    }

    function q(e) {
        var t = {},
            n = function() {
                return t.$cancalBubble = !0
            };
        t.nativeEvent = e, t.persist = X;
        for (var r in e) "function" != typeof e[r] ? t[r] = e[r] : "stopPropagation" === r || "stopImmediatePropagation" === r ? t[r] = n : t[r] = e[r].bind(e);
        return t
    }

    function L(e, t) {
        for (var n in t) t.hasOwnProperty(n) && $(e, n, t[n])
    }

    function B(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = "")
    }

    function F(e, t, n) {
        if (t !== n) {
            if (!n && t) return void B(e, t);
            if (n && !t) return void L(e, n);
            for (var r in t) n.hasOwnProperty(r) ? n[r] !== t[r] && $(e, r, n[r]) : e[r] = "";
            for (var r in n) t.hasOwnProperty(r) || $(e, r, n[r])
        }
    }

    function H(e, t) {
        return e + t.charAt(0).toUpperCase() + t.substring(1)
    }

    function $(e, t, n) {
        return !$e[t] && ze.test(n) ? void(e[t] = n + "px") : ("float" === t && (t = "cssFloat"), null != n && "boolean" != typeof n || (n = ""), void(e[t] = n))
    }

    function W(e) {
        var t = e.props,
            n = e.attrNS,
            r = e.domAttrs,
            a = e.domProps;
        for (var o in t)
            if (t.hasOwnProperty(o)) {
                var i = t[o];
                Qe[o] = {
                    attributeName: r.hasOwnProperty(o) ? r[o] : o.toLowerCase(),
                    propertyName: a.hasOwnProperty(o) ? a[o] : o,
                    attributeNamespace: n.hasOwnProperty(o) ? n[o] : null,
                    mustUseProperty: z(i, Ze),
                    hasBooleanValue: z(i, et),
                    hasNumericValue: z(i, tt),
                    hasPositiveNumericValue: z(i, nt),
                    hasOverloadedBooleanValue: z(i, rt)
                }
            }
    }

    function z(e, t) {
        return (e & t) === t
    }

    function Y(e, t, n) {
        var r = Qe.hasOwnProperty(t) && Qe[t];
        if (r)
            if (null == n || r.hasBooleanValue && !n || r.hasNumericValue && isNaN(n) || r.hasPositiveNumericValue && 1 > n || r.hasOverloadedBooleanValue && n === !1) K(e, t);
            else if (r.mustUseProperty) {
            var a = r.propertyName;
            "value" === a && "" + e[a] == "" + n || (e[a] = n)
        } else {
            var o = r.attributeName,
                i = r.attributeNamespace;
            i ? e.setAttributeNS(i, o, "" + n) : r.hasBooleanValue || r.hasOverloadedBooleanValue && n === !0 ? e.setAttribute(o, "") : e.setAttribute(o, "" + n)
        } else Xe(t) && Je.test(t) && (null == n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
    }

    function K(e, t) {
        var n = Qe.hasOwnProperty(t) && Qe[t];
        if (n)
            if (n.mustUseProperty) {
                var r = n.propertyName;
                n.hasBooleanValue ? e[r] = !1 : "value" === r && "" + e[r] == "" || (e[r] = "")
            } else e.removeAttribute(n.attributeName);
        else Xe(t) && e.removeAttribute(t)
    }

    function J(e) {
        return "function" == typeof e
    }

    function X() {}

    function Q(e) {
        return e
    }

    function Z(e, t) {
        return function() {
            return e.apply(this, arguments), t.apply(this, arguments)
        }
    }

    function ee(e, t, n) {
        for (var r = e.length, a = -1; r--;) {
            var o = e[++a];
            ct(o) ? ee(o, t, n) : t(o, n)
        }
    }

    function te(e, t) {
        if (!t) return e;
        for (var n = Object.keys(t), r = n.length; r--;) e[n[r]] = t[n[r]];
        return e
    }

    function ne() {
        return ++lt
    }

    function re(e, t, n, r) {
        pt.test(t) ? D(e, t, n) : "style" === t ? L(e.style, n) : t === Ne ? n && null != n.__html && (e.innerHTML = n.__html) : r ? null == n ? e.removeAttribute(t) : e.setAttribute(t, "" + n) : Y(e, t, n)
    }

    function ae(e, t, n, r) {
        pt.test(t) ? G(e, t) : "style" === t ? B(e.style, n) : t === Ne ? e.innerHTML = "" : r ? e.removeAttribute(t) : K(e, t)
    }

    function oe(e, t, n, r, a) {
        return "value" !== t && "checked" !== t || (r = e[t]), n !== r ? void 0 === n ? void ae(e, t, r, a) : void("style" === t ? F(e.style, r, n) : re(e, t, n, a)) : void 0
    }

    function ie(e, t, n) {
        for (var r in t) "children" !== r && re(e, r, t[r], n)
    }

    function se(e, t, n, r) {
        for (var a in t) "children" !== a && (n.hasOwnProperty(a) ? oe(e, a, n[a], t[a], r) : ae(e, a, t[a], r));
        for (var a in n) "children" === a || t.hasOwnProperty(a) || re(e, a, n[a], r)
    }

    function ue(e, t, n, a) {
        if (!e.vtype) throw new Error("cannot render " + e + " to container");
        var o = t[Re] || (t[Re] = ne()),
            i = dt[o];
        if (i) return void(i === !0 ? dt[o] = i = {
            vnode: e,
            callback: n,
            parentContext: a
        } : (i.vnode = e, i.parentContext = a, i.callback && (i.callback = i.callback ? Z(i.callback, n) : n)));
        dt[o] = !0;
        var s = null,
            u = null;
        if (s = ft[o]) u = A(s, e, t.firstChild, a);
        else {
            u = r(e, a, t.namespaceURI);
            for (var c = null; c = t.lastChild;) t.removeChild(c);
            t.appendChild(u)
        }
        ft[o] = e;
        var l = Ue.isPending;
        Ue.isPending = !0, S(), i = dt[o], delete dt[o];
        var p = null;
        return ct(i) ? p = ue(i.vnode, t, i.parentContext, i.callback) : e.vtype === Me ? p = u : e.vtype === Ve && (p = u.cache[e.uid]), l || (Ue.isPending = !1, Ue.batchUpdate()), n && n.call(p), p
    }

    function ce(e, t, n) {
        return ue(e, t, n)
    }

    function le(e, t, n, r) {
        var a = e.$cache.parentContext;
        return ue(t, n, r, a)
    }

    function pe(e) {
        if (!e.nodeName) throw new Error("expect node");
        var t = e[Re],
            n = null;
        return (n = ft[t]) ? (c(n, e.firstChild), e.removeChild(e.firstChild), delete ft[t], !0) : !1
    }

    function de(e) {
        if (null == e) return null;
        if (e.nodeName) return e;
        var t = e;
        if (t.getDOMNode && t.$cache.isMounted) return t.getDOMNode();
        throw new Error("findDOMNode can not find Node")
    }

    function fe(e, t, r) {
        var a = null;
        if ("string" == typeof e) a = Me;
        else {
            if ("function" != typeof e) throw new Error("React.createElement: unexpect type [ " + e + " ]");
            a = e.prototype && "function" == typeof e.prototype.forceUpdate ? Ve : Ie
        }
        var o = null,
            i = null,
            s = {};
        if (null != t)
            for (var u in t) t.hasOwnProperty(u) && ("key" === u ? void 0 !== t.key && (o = "" + t.key) : "ref" === u ? void 0 !== t.ref && (i = t.ref) : s[u] = t[u]);
        var c = e.defaultProps;
        if (c)
            for (var u in c) void 0 === s[u] && (s[u] = c[u]);
        var l = arguments.length,
            p = r;
        if (l > 3) {
            p = Array(l - 2);
            for (var d = 2; l > d; d++) p[d - 2] = arguments[d]
        }
        return void 0 !== p && (s.children = p), n(a, e, s, o, i)
    }

    function he(e) {
        return null != e && !!e.vtype
    }

    function me(e, t) {
        for (var n = e.type, r = e.key, a = e.ref, o = te(te({
                key: r,
                ref: a
            }, e.props), t), i = arguments.length, s = Array(i > 2 ? i - 2 : 0), u = 2; i > u; u++) s[u - 2] = arguments[u];
        var c = fe.apply(void 0, [n, o].concat(s));
        return c.ref === e.ref && (c.refs = e.refs), c
    }

    function ve(e) {
        var t = function() {
            for (var t = arguments.length, n = Array(t), r = 0; t > r; r++) n[r] = arguments[r];
            return fe.apply(void 0, [e].concat(n))
        };
        return t.type = e, t
    }

    function ye(e) {
        if (he(e)) return e;
        throw new Error("expect only one child")
    }

    function ge(e, t, n) {
        if (null == e) return e;
        var r = 0;
        ct(e) ? ee(e, function(e) {
            t.call(n, e, r++)
        }) : t.call(n, e, r)
    }

    function be(e, t, n) {
        if (null == e) return e;
        var r = [],
            a = {};
        ge(e, function(e, o) {
            var i = {};
            i.child = t.call(n, e, o) || e, i.isEqual = i.child === e;
            var s = i.key = Pe(e, o);
            a.hasOwnProperty(s) ? a[s] += 1 : a[s] = 0, i.index = a[s], r.push(i)
        });
        var o = [];
        return r.forEach(function(e) {
            var t = e.child,
                n = e.key,
                r = e.index,
                i = e.isEqual;
            if (null != t && "boolean" != typeof t) {
                if (!he(t) || null == n) return void o.push(t);
                0 !== a[n] && (n += ":" + r), i || (n = we(t.key || "") + "/" + n), t = me(t, {
                    key: n
                }), o.push(t)
            }
        }), o
    }

    function Te(e) {
        var t = 0;
        return ge(e, function() {
            t++
        }), t
    }

    function xe(e) {
        return be(e, Q) || []
    }

    function Pe(e, t) {
        var n = void 0;
        return n = he(e) && "string" == typeof e.key ? ".$" + e.key : "." + t.toString(36)
    }

    function we(e) {
        return ("" + e).replace(bt, "//")
    }

    function Ce(e, t) {
        e.forEach(function(e) {
            e && (ct(e.mixins) && Ce(e.mixins, t), t(e))
        })
    }

    function Ee(e, t) {
        for (var n in t)
            if (t.hasOwnProperty(n)) {
                var r = t[n];
                if ("getInitialState" !== n) {
                    var a = e[n];
                    J(a) && J(r) ? e[n] = Z(a, r) : e[n] = r
                } else e.$getInitialStates.push(r)
            }
    }

    function ke(e, t) {
        t.propTypes && (e.propTypes = e.propTypes || {}, te(e.propTypes, t.propTypes)), t.contextTypes && (e.contextTypes = e.contextTypes || {}, te(e.contextTypes, t.contextTypes)), te(e, t.statics), J(t.getDefaultProps) && (e.defaultProps = e.defaultProps || {}, te(e.defaultProps, t.getDefaultProps()))
    }

    function Se(e, t) {
        for (var n in t) t.hasOwnProperty(n) && J(t[n]) && (e[n] = t[n].bind(e))
    }

    function Ae() {
        var e = this,
            t = {},
            n = this.setState;
        return this.setState = xt, this.$getInitialStates.forEach(function(n) {
            J(n) && te(t, n.call(e))
        }), this.setState = n, t
    }

    function Oe(e) {
        function t(n, r) {
            I.call(this, n, r), this.constructor = t, e.autobind !== !1 && Se(this, t.prototype), this.state = this.getInitialState() || this.state
        }
        if (!J(e.render)) throw new Error("createClass: spec.render is not function");
        var n = e.mixins || [],
            r = n.concat(e);
        e.mixins = null, t.displayName = e.displayName;
        var a = t.prototype = new xt;
        return a.$getInitialStates = [], Ce(r, function(e) {
            Ee(a, e), ke(t, e)
        }), a.getInitialState = Ae, e.mixins = n, t
    }
    var Ne = "dangerouslySetInnerHTML",
        _e = "http://www.w3.org/2000/svg",
        Re = "liteid",
        Me = 2,
        Ie = 3,
        Ve = 4,
        je = 5,
        De = null,
        Ge = [],
        Ue = {
            updaters: [],
            isPending: !1,
            add: function(e) {
                this.updaters.push(e)
            },
            batchUpdate: function() {
                if (!this.isPending) {
                    this.isPending = !0;
                    for (var e = this.updaters, t = void 0; t = e.pop();) t.updateComponent();
                    this.isPending = !1
                }
            }
        };
    M.prototype = {
        emitUpdate: function(e, t) {
            this.nextProps = e, this.nextContext = t, e || !Ue.isPending ? this.updateComponent() : Ue.add(this)
        },
        updateComponent: function() {
            var e = this.instance,
                t = this.pendingStates,
                n = this.nextProps,
                r = this.nextContext;
            (n || t.length > 0) && (n = n || e.props, r = r || e.context, this.nextProps = this.nextContext = null, V(e, n, this.getState(), r, this.clearCallbacks))
        },
        addState: function(e) {
            e && (this.pendingStates.push(e), this.isPending || this.emitUpdate())
        },
        replaceState: function(e) {
            var t = this.pendingStates;
            t.pop(), t.push([e])
        },
        getState: function() {
            var e = this.instance,
                t = this.pendingStates,
                n = e.state,
                r = e.props;
            return t.length && (n = te({}, n), t.forEach(function(t) {
                return ct(t) ? void(n = te({}, t[0])) : (J(t) && (t = t.call(e, n, r)), void te(n, t))
            }), t.length = 0), n
        },
        clearCallbacks: function() {
            var e = this.pendingCallbacks,
                t = this.instance;
            e.length > 0 && (this.pendingCallbacks = [], e.forEach(function(e) {
                return e.call(t)
            }))
        },
        addCallback: function(e) {
            J(e) && this.pendingCallbacks.push(e)
        }
    }, I.prototype = {
        constructor: I,
        forceUpdate: function(e) {
            var t = this.$updater,
                n = this.$cache,
                r = this.props,
                a = this.state,
                o = this.context;
            if (!t.isPending && n.isMounted) {
                var i = n.props || r,
                    s = n.state || a,
                    u = n.context || {},
                    c = n.parentContext,
                    l = n.node,
                    p = n.vnode;
                n.props = n.state = n.context = null, t.isPending = !0, this.componentWillUpdate && this.componentWillUpdate(i, s, u), this.state = s, this.props = i, this.context = u;
                var d = E(this),
                    f = A(p, d, l, k(this, c));
                f !== l && (f.cache = f.cache || {}, R(f.cache, l.cache, f)), n.vnode = d, n.node = f, S(), this.componentDidUpdate && this.componentDidUpdate(r, a, o), e && e.call(this), t.isPending = !1, t.emitUpdate()
            }
        },
        setState: function(e, t) {
            var n = this.$updater;
            n.addCallback(t), n.addState(e)
        },
        replaceState: function(e, t) {
            var n = this.$updater;
            n.addCallback(t), n.replaceState(e)
        },
        getDOMNode: function() {
            var e = this.$cache.node;
            return e && "#comment" === e.nodeName ? null : e
        },
        isMounted: function() {
            return this.$cache.isMounted
        }
    };
    var qe = {
            onmouseleave: 1,
            onmouseenter: 1,
            onload: 1,
            onunload: 1,
            onscroll: 1,
            onfocus: 1,
            onblur: 1,
            onrowexit: 1,
            onbeforeunload: 1,
            onstop: 1,
            ondragdrop: 1,
            ondragenter: 1,
            ondragexit: 1,
            ondraggesture: 1,
            ondragover: 1,
            oncontextmenu: 1
        },
        Le = "ontouchstart" in document,
        Be = function() {},
        Fe = "onclick",
        He = {},
        $e = {
            animationIterationCount: 1,
            borderImageOutset: 1,
            borderImageSlice: 1,
            borderImageWidth: 1,
            boxFlex: 1,
            boxFlexGroup: 1,
            boxOrdinalGroup: 1,
            columnCount: 1,
            flex: 1,
            flexGrow: 1,
            flexPositive: 1,
            flexShrink: 1,
            flexNegative: 1,
            flexOrder: 1,
            gridRow: 1,
            gridColumn: 1,
            fontWeight: 1,
            lineClamp: 1,
            lineHeight: 1,
            opacity: 1,
            order: 1,
            orphans: 1,
            tabSize: 1,
            widows: 1,
            zIndex: 1,
            zoom: 1,
            fillOpacity: 1,
            floodOpacity: 1,
            stopOpacity: 1,
            strokeDasharray: 1,
            strokeDashoffset: 1,
            strokeMiterlimit: 1,
            strokeOpacity: 1,
            strokeWidth: 1
        },
        We = ["Webkit", "ms", "Moz", "O"];
    Object.keys($e).forEach(function(e) {
        We.forEach(function(t) {
            $e[H(t, e)] = 1
        })
    });
    var ze = /^-?\d+(\.\d+)?$/,
        Ye = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",
        Ke = Ye + "\\-.0-9\\uB7\\u0300-\\u036F\\u203F-\\u2040",
        Je = new RegExp("^[" + Ye + "][" + Ke + "]*$"),
        Xe = RegExp.prototype.test.bind(new RegExp("^(data|aria)-[" + Ke + "]*$")),
        Qe = {},
        Ze = 1,
        et = 4,
        tt = 8,
        nt = 24,
        rt = 32,
        at = {
            props: {
                accept: 0,
                acceptCharset: 0,
                accessKey: 0,
                action: 0,
                allowFullScreen: et,
                allowTransparency: 0,
                alt: 0,
                async: et,
                autoComplete: 0,
                autoFocus: et,
                autoPlay: et,
                capture: et,
                cellPadding: 0,
                cellSpacing: 0,
                charSet: 0,
                challenge: 0,
                checked: Ze | et,
                cite: 0,
                classID: 0,
                className: 0,
                cols: nt,
                colSpan: 0,
                content: 0,
                contentEditable: 0,
                contextMenu: 0,
                controls: et,
                coords: 0,
                crossOrigin: 0,
                data: 0,
                dateTime: 0,
                "default": et,
                defaultValue: Ze,
                defaultChecked: Ze | et,
                defer: et,
                dir: 0,
                disabled: et,
                download: rt,
                draggable: 0,
                encType: 0,
                form: 0,
                formAction: 0,
                formEncType: 0,
                formMethod: 0,
                formNoValidate: et,
                formTarget: 0,
                frameBorder: 0,
                headers: 0,
                height: 0,
                hidden: et,
                high: 0,
                href: 0,
                hrefLang: 0,
                htmlFor: 0,
                httpEquiv: 0,
                icon: 0,
                id: 0,
                inputMode: 0,
                integrity: 0,
                is: 0,
                keyParams: 0,
                keyType: 0,
                kind: 0,
                label: 0,
                lang: 0,
                list: 0,
                loop: et,
                low: 0,
                manifest: 0,
                marginHeight: 0,
                marginWidth: 0,
                max: 0,
                maxLength: 0,
                media: 0,
                mediaGroup: 0,
                method: 0,
                min: 0,
                minLength: 0,
                multiple: Ze | et,
                muted: Ze | et,
                name: 0,
                nonce: 0,
                noValidate: et,
                open: et,
                optimum: 0,
                pattern: 0,
                placeholder: 0,
                poster: 0,
                preload: 0,
                profile: 0,
                radioGroup: 0,
                readOnly: et,
                rel: 0,
                required: et,
                reversed: et,
                role: 0,
                rows: nt,
                rowSpan: tt,
                sandbox: 0,
                scope: 0,
                scoped: et,
                scrolling: 0,
                seamless: et,
                selected: Ze | et,
                shape: 0,
                size: nt,
                sizes: 0,
                span: nt,
                spellCheck: 0,
                src: 0,
                srcDoc: 0,
                srcLang: 0,
                srcSet: 0,
                start: tt,
                step: 0,
                style: 0,
                summary: 0,
                tabIndex: 0,
                target: 0,
                title: 0,
                type: 0,
                useMap: 0,
                value: Ze,
                width: 0,
                wmode: 0,
                wrap: 0,
                about: 0,
                datatype: 0,
                inlist: 0,
                prefix: 0,
                property: 0,
                resource: 0,
                "typeof": 0,
                vocab: 0,
                autoCapitalize: 0,
                autoCorrect: 0,
                autoSave: 0,
                color: 0,
                itemProp: 0,
                itemScope: et,
                itemType: 0,
                itemID: 0,
                itemRef: 0,
                results: 0,
                security: 0,
                unselectable: 0
            },
            attrNS: {},
            domAttrs: {
                acceptCharset: "accept-charset",
                className: "class",
                htmlFor: "for",
                httpEquiv: "http-equiv"
            },
            domProps: {}
        },
        ot = "http://www.w3.org/1999/xlink",
        it = "http://www.w3.org/XML/1998/namespace",
        st = {
            accentHeight: "accent-height",
            accumulate: 0,
            additive: 0,
            alignmentBaseline: "alignment-baseline",
            allowReorder: "allowReorder",
            alphabetic: 0,
            amplitude: 0,
            arabicForm: "arabic-form",
            ascent: 0,
            attributeName: "attributeName",
            attributeType: "attributeType",
            autoReverse: "autoReverse",
            azimuth: 0,
            baseFrequency: "baseFrequency",
            baseProfile: "baseProfile",
            baselineShift: "baseline-shift",
            bbox: 0,
            begin: 0,
            bias: 0,
            by: 0,
            calcMode: "calcMode",
            capHeight: "cap-height",
            clip: 0,
            clipPath: "clip-path",
            clipRule: "clip-rule",
            clipPathUnits: "clipPathUnits",
            colorInterpolation: "color-interpolation",
            colorInterpolationFilters: "color-interpolation-filters",
            colorProfile: "color-profile",
            colorRendering: "color-rendering",
            contentScriptType: "contentScriptType",
            contentStyleType: "contentStyleType",
            cursor: 0,
            cx: 0,
            cy: 0,
            d: 0,
            decelerate: 0,
            descent: 0,
            diffuseConstant: "diffuseConstant",
            direction: 0,
            display: 0,
            divisor: 0,
            dominantBaseline: "dominant-baseline",
            dur: 0,
            dx: 0,
            dy: 0,
            edgeMode: "edgeMode",
            elevation: 0,
            enableBackground: "enable-background",
            end: 0,
            exponent: 0,
            externalResourcesRequired: "externalResourcesRequired",
            fill: 0,
            fillOpacity: "fill-opacity",
            fillRule: "fill-rule",
            filter: 0,
            filterRes: "filterRes",
            filterUnits: "filterUnits",
            floodColor: "flood-color",
            floodOpacity: "flood-opacity",
            focusable: 0,
            fontFamily: "font-family",
            fontSize: "font-size",
            fontSizeAdjust: "font-size-adjust",
            fontStretch: "font-stretch",
            fontStyle: "font-style",
            fontVariant: "font-variant",
            fontWeight: "font-weight",
            format: 0,
            from: 0,
            fx: 0,
            fy: 0,
            g1: 0,
            g2: 0,
            glyphName: "glyph-name",
            glyphOrientationHorizontal: "glyph-orientation-horizontal",
            glyphOrientationVertical: "glyph-orientation-vertical",
            glyphRef: "glyphRef",
            gradientTransform: "gradientTransform",
            gradientUnits: "gradientUnits",
            hanging: 0,
            horizAdvX: "horiz-adv-x",
            horizOriginX: "horiz-origin-x",
            ideographic: 0,
            imageRendering: "image-rendering",
            "in": 0,
            in2: 0,
            intercept: 0,
            k: 0,
            k1: 0,
            k2: 0,
            k3: 0,
            k4: 0,
            kernelMatrix: "kernelMatrix",
            kernelUnitLength: "kernelUnitLength",
            kerning: 0,
            keyPoints: "keyPoints",
            keySplines: "keySplines",
            keyTimes: "keyTimes",
            lengthAdjust: "lengthAdjust",
            letterSpacing: "letter-spacing",
            lightingColor: "lighting-color",
            limitingConeAngle: "limitingConeAngle",
            local: 0,
            markerEnd: "marker-end",
            markerMid: "marker-mid",
            markerStart: "marker-start",
            markerHeight: "markerHeight",
            markerUnits: "markerUnits",
            markerWidth: "markerWidth",
            mask: 0,
            maskContentUnits: "maskContentUnits",
            maskUnits: "maskUnits",
            mathematical: 0,
            mode: 0,
            numOctaves: "numOctaves",
            offset: 0,
            opacity: 0,
            operator: 0,
            order: 0,
            orient: 0,
            orientation: 0,
            origin: 0,
            overflow: 0,
            overlinePosition: "overline-position",
            overlineThickness: "overline-thickness",
            paintOrder: "paint-order",
            panose1: "panose-1",
            pathLength: "pathLength",
            patternContentUnits: "patternContentUnits",
            patternTransform: "patternTransform",
            patternUnits: "patternUnits",
            pointerEvents: "pointer-events",
            points: 0,
            pointsAtX: "pointsAtX",
            pointsAtY: "pointsAtY",
            pointsAtZ: "pointsAtZ",
            preserveAlpha: "preserveAlpha",
            preserveAspectRatio: "preserveAspectRatio",
            primitiveUnits: "primitiveUnits",
            r: 0,
            radius: 0,
            refX: "refX",
            refY: "refY",
            renderingIntent: "rendering-intent",
            repeatCount: "repeatCount",
            repeatDur: "repeatDur",
            requiredExtensions: "requiredExtensions",
            requiredFeatures: "requiredFeatures",
            restart: 0,
            result: 0,
            rotate: 0,
            rx: 0,
            ry: 0,
            scale: 0,
            seed: 0,
            shapeRendering: "shape-rendering",
            slope: 0,
            spacing: 0,
            specularConstant: "specularConstant",
            specularExponent: "specularExponent",
            speed: 0,
            spreadMethod: "spreadMethod",
            startOffset: "startOffset",
            stdDeviation: "stdDeviation",
            stemh: 0,
            stemv: 0,
            stitchTiles: "stitchTiles",
            stopColor: "stop-color",
            stopOpacity: "stop-opacity",
            strikethroughPosition: "strikethrough-position",
            strikethroughThickness: "strikethrough-thickness",
            string: 0,
            stroke: 0,
            strokeDasharray: "stroke-dasharray",
            strokeDashoffset: "stroke-dashoffset",
            strokeLinecap: "stroke-linecap",
            strokeLinejoin: "stroke-linejoin",
            strokeMiterlimit: "stroke-miterlimit",
            strokeOpacity: "stroke-opacity",
            strokeWidth: "stroke-width",
            surfaceScale: "surfaceScale",
            systemLanguage: "systemLanguage",
            tableValues: "tableValues",
            targetX: "targetX",
            targetY: "targetY",
            textAnchor: "text-anchor",
            textDecoration: "text-decoration",
            textRendering: "text-rendering",
            textLength: "textLength",
            to: 0,
            transform: 0,
            u1: 0,
            u2: 0,
            underlinePosition: "underline-position",
            underlineThickness: "underline-thickness",
            unicode: 0,
            unicodeBidi: "unicode-bidi",
            unicodeRange: "unicode-range",
            unitsPerEm: "units-per-em",
            vAlphabetic: "v-alphabetic",
            vHanging: "v-hanging",
            vIdeographic: "v-ideographic",
            vMathematical: "v-mathematical",
            values: 0,
            vectorEffect: "vector-effect",
            version: 0,
            vertAdvY: "vert-adv-y",
            vertOriginX: "vert-origin-x",
            vertOriginY: "vert-origin-y",
            viewBox: "viewBox",
            viewTarget: "viewTarget",
            visibility: 0,
            widths: 0,
            wordSpacing: "word-spacing",
            writingMode: "writing-mode",
            x: 0,
            xHeight: "x-height",
            x1: 0,
            x2: 0,
            xChannelSelector: "xChannelSelector",
            xlinkActuate: "xlink:actuate",
            xlinkArcrole: "xlink:arcrole",
            xlinkHref: "xlink:href",
            xlinkRole: "xlink:role",
            xlinkShow: "xlink:show",
            xlinkTitle: "xlink:title",
            xlinkType: "xlink:type",
            xmlBase: "xml:base",
            xmlLang: "xml:lang",
            xmlSpace: "xml:space",
            y: 0,
            y1: 0,
            y2: 0,
            yChannelSelector: "yChannelSelector",
            z: 0,
            zoomAndPan: "zoomAndPan"
        },
        ut = {
            props: {},
            attrNS: {
                xlinkActuate: ot,
                xlinkArcrole: ot,
                xlinkHref: ot,
                xlinkRole: ot,
                xlinkShow: ot,
                xlinkTitle: ot,
                xlinkType: ot,
                xmlBase: it,
                xmlLang: it,
                xmlSpace: it
            },
            domAttrs: {},
            domProps: {}
        };
    Object.keys(st).map(function(e) {
        ut.props[e] = 0, st[e] && (ut.domAttrs[e] = st[e])
    }), W(at), W(ut);
    var ct = Array.isArray,
        lt = 0,
        pt = /^on/i;
    Object.freeze || (Object.freeze = Q);
    var dt = {},
        ft = {},
        ht = Object.freeze({
            render: ce,
            unstable_renderSubtreeIntoContainer: le,
            unmountComponentAtNode: pe,
            findDOMNode: de
        }),
        mt = "a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|circle|clipPath|defs|ellipse|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|text|tspan",
        vt = {};
    mt.split("|").forEach(function(e) {
        vt[e] = ve(e)
    });
    var yt = function wt() {
        return wt
    };
    yt.isRequired = yt;
    var gt = {
            array: yt,
            bool: yt,
            func: yt,
            number: yt,
            object: yt,
            string: yt,
            any: yt,
            arrayOf: yt,
            element: yt,
            instanceOf: yt,
            node: yt,
            objectOf: yt,
            oneOf: yt,
            oneOfType: yt,
            shape: yt
        },
        bt = /\/(?!\/)/g,
        Tt = Object.freeze({
            only: ye,
            forEach: ge,
            map: be,
            count: Te,
            toArray: xe
        }),
        xt = function() {};
    xt.prototype = I.prototype;
    var Pt = te({
        version: "0.15.1",
        cloneElement: me,
        isValidElement: he,
        createElement: fe,
        createFactory: ve,
        Component: I,
        createClass: Oe,
        Children: Tt,
        PropTypes: gt,
        DOM: vt
    }, ht);
    Pt.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ht, e.exports = Pt
}, function(e, t) {
    e.exports = function(e, t) {
        t = t || "white";
        var n = 44100,
            r = e * n,
            a = new(window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, r, n),
            o = a.createBuffer(1, r, n),
            i = o.getChannelData(0);
        switch (t) {
            case "white":
                for (var s = 0; r > s; s++) i[s] = 2 * Math.random() - 1;
                break;
            case "pink":
                var u, c, l, p, d, f, h;
                u = c = l = p = d = f = h = 0;
                for (var s = 0; r > s; s++) {
                    var m = 2 * Math.random() - 1;
                    u = .99886 * u + .0555179 * m, c = .99332 * c + .0750759 * m, l = .969 * l + .153852 * m, p = .8665 * p + .3104856 * m, d = .55 * d + .5329522 * m, f = -.7616 * f - .016898 * m, i[s] = u + c + l + p + d + f + h + .5362 * m, i[s] *= .11, h = .115926 * m
                }
                break;
            case "brown":
                for (var v = 0, s = 0; r > s; s++) {
                    var m = 2 * Math.random() - 1;
                    i[s] = (v + .02 * m) / 1.02, v = i[s], i[s] *= 3.5
                }
        }
        return o
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    t.__esModule = !0, t.compose = t.applyMiddleware = t.bindActionCreators = t.combineReducers = t.createStore = void 0;
    var a = n(9),
        o = r(a),
        i = n(44),
        s = r(i),
        u = n(43),
        c = r(u),
        l = n(42),
        p = r(l),
        d = n(8),
        f = r(d),
        h = n(10);
    r(h), t.createStore = o["default"], t.combineReducers = s["default"], t.bindActionCreators = c["default"], t.applyMiddleware = p["default"], t.compose = f["default"]
}, function(e, t, n) {
    function r(e) {
        if (!i(e) || d.call(e) != s || o(e)) return !1;
        var t = a(e);
        if (null === t) return !0;
        var n = l.call(t, "constructor") && t.constructor;
        return "function" == typeof n && n instanceof n && c.call(n) == p
    }
    var a = n(33),
        o = n(34),
        i = n(35),
        s = "[object Object]",
        u = Object.prototype,
        c = Function.prototype.toString,
        l = u.hasOwnProperty,
        p = c.call(Object),
        d = u.toString;
    e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    t.__esModule = !0, t.connect = t.Provider = void 0;
    var a = n(38),
        o = r(a),
        i = n(39),
        s = r(i);
    t.Provider = o["default"], t.connect = s["default"]
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(1);
    t["default"] = r.PropTypes.shape({
        subscribe: r.PropTypes.func.isRequired,
        dispatch: r.PropTypes.func.isRequired,
        getState: r.PropTypes.func.isRequired
    })
}, function(e, t) {
    "use strict";

    function n(e) {
        "undefined" != typeof console && "function" == typeof console.error && console.error(e);
        try {
            throw new Error(e)
        } catch (t) {}
    }
    t.__esModule = !0, t["default"] = n
}, function(e, t) {
    "use strict";

    function n() {
        for (var e = arguments.length, t = Array(e), n = 0; e > n; n++) t[n] = arguments[n];
        if (0 === t.length) return function(e) {
            return e
        };
        var r = function() {
            var e = t[t.length - 1],
                n = t.slice(0, -1);
            return {
                v: function() {
                    return n.reduceRight(function(e, t) {
                        return t(e)
                    }, e.apply(void 0, arguments))
                }
            }
        }();
        return "object" == typeof r ? r.v : void 0
    }
    t.__esModule = !0, t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n) {
        function r() {
            y === v && (y = v.slice())
        }

        function o() {
            return m
        }

        function s(e) {
            if ("function" != typeof e) throw new Error("Expected listener to be a function.");
            var t = !0;
            return r(), y.push(e),
                function() {
                    if (t) {
                        t = !1, r();
                        var n = y.indexOf(e);
                        y.splice(n, 1)
                    }
                }
        }

        function l(e) {
            if (!(0, i["default"])(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
            if ("undefined" == typeof e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
            if (g) throw new Error("Reducers may not dispatch actions.");
            try {
                g = !0, m = h(m, e)
            } finally {
                g = !1
            }
            for (var t = v = y, n = 0; n < t.length; n++) t[n]();
            return e
        }

        function p(e) {
            if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
            h = e, l({
                type: c.INIT
            })
        }

        function d() {
            var e, t = s;
            return e = {
                subscribe: function(e) {
                    function n() {
                        e.next && e.next(o())
                    }
                    if ("object" != typeof e) throw new TypeError("Expected the observer to be an object.");
                    n();
                    var r = t(n);
                    return {
                        unsubscribe: r
                    }
                }
            }, e[u["default"]] = function() {
                return this
            }, e
        }
        var f;
        if ("function" == typeof t && "undefined" == typeof n && (n = t, t = void 0), "undefined" != typeof n) {
            if ("function" != typeof n) throw new Error("Expected the enhancer to be a function.");
            return n(a)(e, t)
        }
        if ("function" != typeof e) throw new Error("Expected the reducer to be a function.");
        var h = e,
            m = t,
            v = [],
            y = v,
            g = !1;
        return l({
            type: c.INIT
        }), f = {
            dispatch: l,
            subscribe: s,
            getState: o,
            replaceReducer: p
        }, f[u["default"]] = d, f
    }
    t.__esModule = !0, t.ActionTypes = void 0, t["default"] = a;
    var o = n(4),
        i = r(o),
        s = n(49),
        u = r(s),
        c = t.ActionTypes = {
            INIT: "@@redux/INIT"
        }
}, function(e, t) {
    "use strict";

    function n(e) {
        "undefined" != typeof console && "function" == typeof console.error && console.error(e);
        try {
            throw new Error(e)
        } catch (t) {}
    }
    t.__esModule = !0, t["default"] = n
}, function(e, t) {
    "use strict";

    function n(e) {
        return {
            type: "CHANGE_TEMPO",
            tempo: e
        }
    }

    function r(e) {
        return {
            type: "CHANGE_SWING",
            swing: e
        }
    }

    function a(e) {
        return {
            type: "PATTERN_CHANGE",
            index: e
        }
    }

    function o(e) {
        return {
            type: "TOGGLE_PLAY"
        }
    }

    function i(e) {
        return {
            type: "CHANGE_ACTIVE_SOUND",
            index: e
        }
    }

    function s(e, t) {
        return {
            type: "CHANGE_SOUND_PROPERTY",
            propertyIndex: e,
            value: t
        }
    }

    function u(e) {
        return {
            type: "CHANGE_PATTERN_MODE",
            mode: e
        }
    }

    function c(e) {
        return {
            type: "SET_CURSOR",
            index: e
        }
    }

    function l(e) {
        return {
            type: "SET_ACTIVE_PATTERN_SECTION_INDEX",
            index: e
        }
    }

    function p(e) {
        return {
            type: "CHANGE_SOUND_MODE",
            index: e
        }
    }

    function d() {
        return {
            type: "RESET"
        }
    }

    function f(e) {
        return {
            type: "COPY_PATTERN",
            index: e
        }
    }

    function h(e) {
        return {
            type: "PASTE_PATTERN_TO_TARGET",
            index: e
        }
    }

    function m(e) {
        return {
            type: "CLEAR_PATTERN",
            index: e
        }
    }

    function v(e) {
        return {
            type: "COPY_INSTRUMENT_PATTERN",
            index: e
        }
    }

    function y(e) {
        return {
            type: "PASTE_INSTRUMENT_PATTERN_TO_TARGET",
            index: e
        }
    }

    function g(e) {
        return {
            type: "CLEAR_INSTRUMENT_PATTERN",
            index: e
        }
    }

    function b(e) {
        var t = e.target;
        return /(input|button|select|option)/i.test(t.tagName) ? {
            type: ""
        } : e.metaKey || e.ctrlKey ? {
            type: ""
        } : {
            type: "GENERAL_KEYDOWN",
            which: e.which,
            shift: e.shiftKey
        }
    }

    function T(e) {
        return {
            type: "GENERAL_KEY_UP",
            which: e.which
        }
    }
    Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.changeTempo = n, t.changeSwing = r, t.patternChange = a, t.togglePlay = o, t.changeActiveSound = i, t.changeSoundProperty = s, t.changePatternMode = u, t.setCursor = c, t.setActivePatternSectionIndex = l, t.changeSoundMode = p, t.reset = d,
        t.copyPattern = f, t.pastePattern = h, t.clearPattern = m, t.copyInstrumentPattern = v, t.pasteInstrumentPattern = y, t.clearInstrumentPattern = g, t.handleGeneralKeyDown = b, t.handleGeneralKeyUp = T
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        var r = n - t;
        return r > 60 / (4 * e)
    }

    function a(e, t, n, a) {
        if (y) {
            var i = Object.assign({}, e);
            if (r(e.tempo, y, b.currentTime)) {
                var s = 60 / (4 * e.tempo);
                if (y += s, "AB" === e.patternMode && 15 === g) {
                    if (0 === e.activePatternSection) var u = 1;
                    else var u = 0;
                    n(u), i.activePatternSection = u
                }
                g += 1, g %= 16, t(g), i.cursor = g, i.activePatternSection = a(), o(i)
            }
        } else g = 0, y = b.currentTime, t(g), o(e)
    }

    function o(e) {
        e.sounds.forEach(function(t, n) {
            if (!P) {
                var r = n,
                    a = t.currentModeIndex,
                    o = t.modes[t.currentModeIndex].shortName,
                    s = t.properties,
                    u = 1 === e.pattern[0][e.activePatternSection][e.cursor],
                    c = 1 === e.pattern[n][e.activePatternSection][e.cursor];
                if (u) var l = e.sounds[0].properties[0].value;
                else l = 0;
                var p = y + .05;
                r > 0 && c && i({
                    index: r,
                    currentModeIndex: a,
                    shortName: o,
                    properties: s,
                    accent: u,
                    accentValue: l,
                    when: p
                })
            }
        })
    }

    function i(e) {
        var t = e.index,
            n = e.currentModeIndex,
            r = e.shortName,
            a = e.properties,
            o = e.accent,
            i = e.accentValue,
            s = e.when,
            u = A[t][n];
        if ("function" == typeof u) {
            var c = u();
            a.forEach(function(e) {
                if (/^sd$/i.test(r)) "level" !== e.name && c[e.name] instanceof window.AudioParam && (c[e.name].value = e.value / 127);
                else if (/^(l|m|h)(c|t)$/i.test(r)) c.frequency *= 1 + (a.filter(function(e) {
                    return "tuning" === e.name
                })[0].value - 64) / 127;
                else if (/^oh$/i.test(r)) {
                    var t = a.filter(function(e) {
                        return "decay" === e.name
                    })[0].value;
                    c.duration *= 1 + (t - 100) / 127
                } else if (/^bd$/i.test(r)) {
                    var t = a.filter(function(e) {
                            return "decay" === e.name
                        })[0].value,
                        n = a.filter(function(e) {
                            return "tone" === e.name
                        })[0].value;
                    c.decay = t, c.tone = n
                }
            });
            var l = a.filter(function(e) {
                return "level" === e.name
            })[0].value / 127;
            o && (l *= 1 + i / 127);
            var p = b.createGain();
            p.gain.value = l, c.connect(p), p.connect(T), c.start(s)
        }
    }
    var s = n(46),
        u = n(32),
        c = n(29),
        l = n(51),
        p = n(45),
        d = n(25),
        f = n(27),
        h = n(37),
        m = n(26),
        v = n(20),
        y = !1,
        g = 0,
        b = new(window.AudioContext || window.webkitAudioContext),
        T = b.createDynamicsCompressor();
    T.connect(b.destination), T.ratio.value = 6, T.threshold.value = -20, T.attack.value = .003, T.release.value = .1;
    var x = b.createBiquadFilter();
    x.type = "highpass", x.frequency.value = 300;
    var P = /Firefox/.test(navigator.userAgent);
    if (!window.AudioContext || /iphone|ipad/i.test(navigator.userAgent)) {
        var w = n(52);
        if (w(document.body, b, function(e) {}), "suspended" === b.state) {
            var C = function O() {
                b.resume(), setTimeout(function() {
                    "running" === b.state && (document.body.removeEventListener("touchend", O, !1), document.body.removeEventListener("click", O, !1))
                }, 0)
            };
            document.body.addEventListener("touchend", C, !1), document.body.addEventListener("click", C, !1)
        }
    }
    var E = [],
        k = e.exports = v(function(e, t, n, r) {
            E.forEach(function(e) {
                cancelAnimationFrame(e)
            }), E = [];
            var o = e.props.machine;
            o.playing ? (a(e.props.machine, t, n, r), E.push(requestAnimationFrame(k.bind(null, e, t, n, r)))) : (0 !== o.cursor && t(0), y = !1)
        }, 10),
        S = c(b),
        A = [
            [null],
            [u(b)],
            [s(b)],
            [l(b).bind(null, {
                frequency: 196
            }), l(b).bind(null, {
                frequency: 98
            })],
            [l(b).bind(null, {
                frequency: 294
            }), l(b).bind(null, {
                frequency: 147
            })],
            [l(b).bind(null, {
                frequency: 440
            }), l(b).bind(null, {
                frequency: 220
            })],
            [m(b), p(b)],
            [h(b), d(b)],
            [f(b)],
            [null],
            [S.bind(null, !0)],
            [S.bind(null, !1)]
        ];
    window.oneShot = function(e, t) {
        var n = t.sounds[e],
            r = n.currentModeIndex,
            a = n.modes[n.currentModeIndex].shortName,
            o = n.properties,
            s = !1,
            u = 0,
            c = b.currentTime;
        i({
            index: e,
            currentModeIndex: r,
            shortName: a,
            properties: o,
            accent: s,
            accentValue: u,
            when: c
        })
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        u = n(1),
        c = r(u),
        l = n(12),
        p = r(l),
        d = n(15),
        f = r(d),
        h = n(17),
        m = r(h),
        v = n(16),
        y = r(v),
        g = n(14),
        b = r(g),
        T = n(18),
        x = r(T),
        P = function(e) {
            function t(e, n) {
                a(this, t);
                var r = o(this, Object.getPrototypeOf(t).call(this, e, n));
                return r.listener = p["default"], r.listener(r, r.setCursor.bind(r), r.setActivePatternSection.bind(r), r.getActivePatternSection.bind(r)), document.addEventListener("visibilitychange", r.handleVisibilityChange.bind(r), !1), document.addEventListener("keydown", function(e) {
                    this.props.actions.handleGeneralKeyDown(e)
                }.bind(r)), r
            }
            return i(t, e), s(t, [{
                key: "componentDidUpdate",
                value: function() {
                    this.listener(this, this.setCursor.bind(this), this.setActivePatternSection.bind(this), this.getActivePatternSection.bind(this))
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props,
                        t = e.machine,
                        n = (e.actions, "");
                    return /Firefox/.test(navigator.userAgent) && (n = c["default"].createElement("p", null, c["default"].createElement("i", null, "For Firefox users: some of the drum synths, including the kick, aren't working very well. Hopefully I can improve this situation soon. Until then the sound is muted to avoid damaging your speakers or ears. - Joe"))), c["default"].createElement("section", {
                        className: "main"
                    }, c["default"].createElement("h1", null, "tiny-808"), n, c["default"].createElement(b["default"], {
                        handleSaveClick: function() {
                            var e = this.props.machine;
                            history.pushState(null, null, "#" + encodeURIComponent(JSON.stringify(e)))
                        }.bind(this),
                        handleGetLinkClick: function() {
                            var e = this.props.machine,
                                t = document.location.protocol + "//" + document.location.host + document.location.pathname + "#" + encodeURIComponent(JSON.stringify(e));
                            t = encodeURIComponent(t), window.open("http://tinyurl.com/api-create.php?url=" + t, "_blank", "width=300,height=100")
                        }.bind(this),
                        handleClearClick: this.handleResetClick.bind(this)
                    }), c["default"].createElement(m["default"], {
                        sounds: t.sounds,
                        currentSound: t.sounds[t.activeSoundIndex],
                        handleSoundModeChange: this.handleSoundModeChange.bind(this),
                        activeSoundIndex: t.activeSoundIndex,
                        handleActiveSoundChange: this.handleActiveSoundChange.bind(this)
                    }), c["default"].createElement("br", null), c["default"].createElement(y["default"], {
                        sound: t.sounds[t.activeSoundIndex],
                        handleSoundPropertyChange: this.handleSoundPropertyChange.bind(this)
                    }), c["default"].createElement(x["default"], {
                        pattern: t.pattern[t.activeSoundIndex][t.activePatternSection],
                        handlePatternChange: this.handlePatternChange.bind(this),
                        playing: t.playing,
                        cursor: t.cursor
                    }), c["default"].createElement("br", null), c["default"].createElement("div", null, c["default"].createElement("label", null, "Tempo:"), c["default"].createElement("input", {
                        type: "range",
                        className: "property-range",
                        value: t.tempo,
                        min: "60",
                        max: "200",
                        onChange: this.handleTempoChange.bind(this)
                    }), c["default"].createElement("span", {
                        className: "values"
                    }, t.tempo, " BPM")), c["default"].createElement("br", null), c["default"].createElement("div", {
                        className: "transport"
                    }, c["default"].createElement("div", null, c["default"].createElement("button", {
                        onClick: this.handlePlayClick.bind(this)
                    }, t.playing ? "Pause" : "Play")), c["default"].createElement(f["default"], {
                        activePatternSection: t.activePatternSection,
                        patternMode: t.patternMode,
                        handlePatternModeChange: this.handlePatternModeChange.bind(this),
                        copyPattern: this.props.actions.copyPattern.bind(this),
                        pastePattern: this.props.actions.pastePattern.bind(this),
                        clearPattern: this.props.actions.clearPattern.bind(this),
                        copyInstrumentPattern: this.props.actions.copyInstrumentPattern.bind(this),
                        pasteInstrumentPattern: this.props.actions.pasteInstrumentPattern.bind(this),
                        clearInstrumentPattern: this.props.actions.clearInstrumentPattern.bind(this)
                    })))
                }
            }, {
                key: "handleTempoChange",
                value: function(e) {
                    this.props.actions.changeTempo(parseInt(e.target.value))
                }
            }, {
                key: "handleSwingChange",
                value: function(e) {
                    this.props.actions.changeSwing(parseInt(e.target.value))
                }
            }, {
                key: "handlePatternChange",
                value: function(e) {
                    this.props.actions.patternChange(e)
                }
            }, {
                key: "handlePlayClick",
                value: function() {
                    this.props.actions.togglePlay()
                }
            }, {
                key: "handleResetClick",
                value: function() {
                    this.props.actions.reset()
                }
            }, {
                key: "handleActiveSoundChange",
                value: function(e) {
                    this.props.actions.changeActiveSound(parseInt(e.target.value))
                }
            }, {
                key: "handleSoundPropertyChange",
                value: function(e, t) {
                    this.props.actions.changeSoundProperty(e, parseInt(t.target.value))
                }
            }, {
                key: "handleSoundModeChange",
                value: function(e) {
                    this.props.actions.changeSoundMode(e)
                }
            }, {
                key: "handlePatternModeChange",
                value: function(e) {
                    this.props.actions.changePatternMode(e)
                }
            }, {
                key: "setCursor",
                value: function(e) {
                    this.props.actions.setCursor(e)
                }
            }, {
                key: "setActivePatternSection",
                value: function(e) {
                    this.props.actions.setActivePatternSectionIndex(e)
                }
            }, {
                key: "getActivePatternSection",
                value: function() {
                    return this.props.machine.activePatternSection
                }
            }, {
                key: "handleVisibilityChange",
                value: function() {
                    this.props.machine.playing && document.hidden && this.props.actions.togglePlay()
                }
            }]), t
        }(u.Component);
    P.propTypes = {
        machine: u.PropTypes.object.isRequired,
        actions: u.PropTypes.object.isRequired
    }, t["default"] = P
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        u = n(1),
        c = r(u),
        l = function(e) {
            function t() {
                return a(this, t), o(this, Object.getPrototypeOf(t).apply(this, arguments))
            }
            return i(t, e), s(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                        t = e.handleSaveClick,
                        n = e.handleGetLinkClick,
                        r = e.handleClearClick;
                    return c["default"].createElement("div", {
                        className: "sub-header-actions"
                    }, c["default"].createElement("button", {
                        onClick: t
                    }, "Save to url"), c["default"].createElement("button", {
                        onClick: n
                    }, "Get shortlink"), c["default"].createElement("button", {
                        onClick: r
                    }, "Clear"))
                }
            }]), t
        }(u.Component);
    t["default"] = l
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        u = n(1),
        c = r(u),
        l = function(e) {
            function t() {
                return a(this, t), o(this, Object.getPrototypeOf(t).apply(this, arguments))
            }
            return i(t, e), s(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                        t = e.activePatternSection,
                        n = e.patternMode,
                        r = e.handlePatternModeChange;
                    return c["default"].createElement("form", {
                        className: "pattern-selector"
                    }, c["default"].createElement("label", {
                        className: 0 === t ? "active" : ""
                    }, "A", c["default"].createElement("input", {
                        type: "radio",
                        name: "pattern-mode",
                        value: "A",
                        checked: "A" === n,
                        onChange: r.bind(null, "A"),
                        onKeyDownCapture: this.handleKeyDown.bind(this, 0)
                    })), c["default"].createElement("label", null, "AB", c["default"].createElement("input", {
                        type: "radio",
                        name: "pattern-mode",
                        value: "AB",
                        checked: "AB" === n,
                        onChange: r.bind(null, "AB")
                    })), c["default"].createElement("label", {
                        className: 1 === t ? "active" : ""
                    }, "B", c["default"].createElement("input", {
                        type: "radio",
                        name: "pattern-mode",
                        value: "B",
                        checked: "B" === n,
                        onChange: r.bind(null, "B"),
                        onKeyDownCapture: this.handleKeyDown.bind(this, 1)
                    })))
                }
            }, {
                key: "handleKeyDown",
                value: function(e, t) {
                    if (t.metaKey || t.ctrlKey)
                        if (t.shiftKey) switch (t.which) {
                            case 67:
                                t.preventDefault(), this.props.copyPattern(e);
                                break;
                            case 86:
                                t.preventDefault(), this.props.pastePattern(e);
                                break;
                            case 88:
                                t.preventDefault(), this.props.copyPattern(e), this.props.clearPattern(e)
                        } else switch (t.which) {
                            case 67:
                                this.props.copyInstrumentPattern(e);
                                break;
                            case 86:
                                this.props.pasteInstrumentPattern(e);
                                break;
                            case 88:
                                this.props.copyInstrumentPattern(e), this.props.clearInstrumentPattern(e)
                        }
                }
            }]), t
        }(u.Component);
    t["default"] = l
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        u = n(1),
        c = r(u),
        l = function(e) {
            function t() {
                return a(this, t), o(this, Object.getPrototypeOf(t).apply(this, arguments))
            }
            return i(t, e), s(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                        t = e.sound,
                        n = e.handleSoundPropertyChange;
                    return c["default"].createElement("div", {
                        className: "properties"
                    }, t.name, t.properties.map(function(e, t) {
                        return c["default"].createElement("div", {
                            key: t
                        }, c["default"].createElement("label", null, e.name, ":"), c["default"].createElement("input", {
                            className: "property-range",
                            type: "range",
                            min: "0",
                            max: "127",
                            value: e.value,
                            onChange: n.bind(null, t)
                        }), c["default"].createElement("span", {
                            className: "values"
                        }, e.value))
                    }))
                }
            }]), t
        }(u.Component);
    t["default"] = l
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        u = n(1),
        c = r(u),
        l = function(e) {
            function t() {
                return a(this, t), o(this, Object.getPrototypeOf(t).apply(this, arguments))
            }
            return i(t, e), s(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                        t = e.sounds,
                        n = e.currentSound,
                        r = e.handleSoundModeChange,
                        a = e.activeSoundIndex,
                        o = e.handleActiveSoundChange,
                        i = "";
                    return n.modes.length > 1 && (i = c["default"].createElement("form", {
                        className: "mode-selector"
                    }, n.modes.map(function(e, t) {
                        var a = t === n.currentModeIndex;
                        return c["default"].createElement("span", {
                            key: t
                        }, c["default"].createElement("input", {
                            type: "radio",
                            onChange: r.bind(null, t),
                            name: "instrument-mode",
                            value: t,
                            checked: a
                        }), e.shortName)
                    }))), c["default"].createElement("div", null, c["default"].createElement("div", {
                        className: "range-selector-container"
                    }, t.map(function(e, t) {
                        return c["default"].createElement("span", {
                            key: t,
                            className: "range-name"
                        }, e.modes[e.currentModeIndex].shortName)
                    }), c["default"].createElement("br", null), c["default"].createElement("input", {
                        className: "sounds-range",
                        type: "range",
                        min: 0,
                        max: t.length - 1,
                        value: a,
                        step: 1,
                        onChange: o
                    })), c["default"].createElement("div", null, c["default"].createElement("label", null, "Sound:"), c["default"].createElement("select", {
                        value: a,
                        onChange: o
                    }, t.map(function(e, t) {
                        return c["default"].createElement("option", {
                            value: t,
                            key: t
                        }, e.modes[e.currentModeIndex].name)
                    })), i))
                }
            }]), t
        }(u.Component);
    t["default"] = l
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        u = n(1),
        c = r(u),
        l = function(e) {
            function t() {
                return a(this, t), o(this, Object.getPrototypeOf(t).apply(this, arguments))
            }
            return i(t, e), s(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                        t = e.pattern,
                        n = e.playing,
                        r = e.cursor,
                        a = e.handlePatternChange;
                    return c["default"].createElement("div", null, c["default"].createElement("div", {
                        className: "tick-container"
                    }, t.map(function(e, t) {
                        if (n && r === t) var o = "highlighted";
                        else var o = "";
                        return c["default"].createElement("span", {
                            key: t,
                            className: o
                        }, c["default"].createElement("input", {
                            type: "checkbox",
                            checked: !!e,
                            onChange: a.bind(null, t)
                        }))
                    }.bind(this))), c["default"].createElement("div", {
                        className: "quarters"
                    }, c["default"].createElement("div", null), c["default"].createElement("div", null), c["default"].createElement("div", null), c["default"].createElement("div", null)))
                }
            }]), t
        }(u.Component);
    t["default"] = l
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function u(e) {
        return {
            machine: e.machine
        }
    }

    function c(e) {
        return {
            actions: (0, f.bindActionCreators)(g, e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        p = n(1),
        d = a(p),
        f = n(3),
        h = n(5),
        m = n(13),
        v = a(m),
        y = n(11),
        g = r(y),
        b = function(e) {
            function t() {
                return o(this, t), i(this, Object.getPrototypeOf(t).apply(this, arguments))
            }
            return s(t, e), l(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                        t = e.machine,
                        n = e.actions;
                    return d["default"].createElement("div", null, d["default"].createElement(v["default"], {
                        machine: t,
                        actions: n
                    }))
                }
            }]), t
        }(p.Component);
    t["default"] = (0, h.connect)(u, c)(b)
}, function(e, t) {
    "use strict";
    e.exports = function(e, t, n) {
        t || (t = 250);
        var r, a;
        return function() {
            var o = n || this,
                i = +new Date,
                s = arguments;
            r && r + t > i ? (clearTimeout(a), a = setTimeout(function() {
                r = i, e.apply(o, s)
            }, t)) : (r = i, e.apply(o, s))
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var a = n(1),
        o = r(a),
        i = n(1),
        s = n(5),
        u = n(19),
        c = r(u),
        l = n(24),
        p = r(l);
    (0, i.render)(o["default"].createElement(s.Provider, {
        store: (0, p["default"])()
    }, o["default"].createElement(c["default"], null)), document.getElementById("root"))
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = n(3),
        o = n(23),
        i = r(o),
        s = (0, a.combineReducers)({
            machine: i["default"]
        });
    t["default"] = s
}, function(e, t) {
    "use strict";

    function n() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? r || a : arguments[0],
            t = arguments[1];
        switch (t.type) {
            case "CHANGE_TEMPO":
                return Object.assign({}, e, {
                    tempo: t.tempo
                });
            case "CHANGE_SWING":
                return Object.assign({}, e, {
                    swing: t.swing
                });
            case "TOGGLE_PLAY":
                var n = !e.playing,
                    i = {
                        playing: n
                    };
                return n || "AB" !== e.patternMode || (i.activePatternSection = 0), Object.assign({}, e, i);
            case "CHANGE_ACTIVE_SOUND":
                return Object.assign({}, e, {
                    activeSoundIndex: t.index
                });
            case "CHANGE_SOUND_PROPERTY":
                var s = Object.assign({}, e);
                return s.sounds[s.activeSoundIndex].properties[t.propertyIndex].value = t.value, s;
            case "PATTERN_CHANGE":
                var s = Object.assign({}, e),
                    u = s.pattern[s.activeSoundIndex][s.activePatternSection];
                return 0 === u[t.index] ? u[t.index] = 1 : u[t.index] = 0, s;
            case "CHANGE_PATTERN_MODE":
                var s = Object.assign({}, e, {
                    patternMode: t.mode
                });
                return s.playing ? "B" === t.mode && 1 !== s.activePatternSection ? s.targetPatternSection = 1 : "A" === t.mode && 0 !== s.activePatternSection && (s.targetPatternSection = 0) : "B" === t.mode ? s.activePatternSection = 1 : "A" === t.mode && (s.activePatternSection = 0), s;
            case "SET_CURSOR":
                var s = Object.assign({}, e, {
                    cursor: t.index
                });
                return 0 === t.index && "number" == typeof e.targetPatternSection && ("AB" !== e.patternMode && (s.activePatternSection = e.targetPatternSection), delete s.targetPatternSection), s;
            case "SET_ACTIVE_PATTERN_SECTION_INDEX":
                var s = Object.assign({}, e, {
                    activePatternSection: t.index
                });
                return s;
            case "CHANGE_SOUND_MODE":
                var s = Object.assign({}, e),
                    c = s.sounds[s.activeSoundIndex];
                return c.currentModeIndex = t.index, s;
            case "RESET":
                return JSON.parse(JSON.stringify(o));
            case "COPY_PATTERN":
                var s = Object.assign({}, e);
                return s.copiedPattern = e.pattern.map(function(e) {
                    return e[t.index]
                }), s.copiedPattern = JSON.parse(JSON.stringify(s.copiedPattern)), s;
            case "PASTE_PATTERN_TO_TARGET":
                var s = Object.assign({}, e);
                return s.copiedPattern && s.pattern.forEach(function(e, n) {
                    e[t.index] = s.copiedPattern[n]
                }), s;
            case "CLEAR_PATTERN":
                var s = Object.assign({}, e);
                s.pattern.forEach(function(e, n) {
                    e[t.index] = e[t.index].map(function() {
                        return 0
                    })
                });
            case "COPY_INSTRUMENT_PATTERN":
                var s = Object.assign({}, e);
                return s.copiedInstrumentPattern = e.pattern[e.activeSoundIndex][t.index], s.copiedInstrumentPattern = JSON.parse(JSON.stringify(s.copiedInstrumentPattern)), s;
            case "PASTE_INSTRUMENT_PATTERN_TO_TARGET":
                var s = Object.assign({}, e);
                return s.copiedInstrumentPattern && (s.pattern[e.activeSoundIndex][t.index] = s.copiedInstrumentPattern), s;
            case "CLEAR_INSTRUMENT_PATTERN":
                var s = Object.assign({}, e),
                    l = s.pattern[e.activeSoundIndex][t.index];
                return s.pattern[e.activeSoundIndex][t.index] = l.map(function() {
                    return 0
                }), s;
            case "GENERAL_KEYDOWN":
                var s = Object.assign({}, e),
                    p = !1;
                switch (t.which) {
                    case 81:
                        p = 0;
                        break;
                    case 65:
                        p = 1;
                        break;
                    case 87:
                        p = 6;
                        break;
                    case 83:
                        p = 2;
                        break;
                    case 69:
                        p = 7;
                        break;
                    case 68:
                        p = 2;
                        break;
                    case 70:
                        p = 3;
                        break;
                    case 71:
                        p = 4;
                        break;
                    case 72:
                        p = 5;
                        break;
                    case 84:
                        p = 11;
                        break;
                    case 85:
                        p = 10;
                        break;
                    case 79:
                        p = 9;
                        break;
                    case 80:
                        p = 9;
                        break;
                    case 82:
                        p = 8
                }
                if ("number" == typeof p)
                    if (e.playing) {
                        if (window.oneShot(p, e), t.shift) {
                            var d, f = s.pattern[p][e.activePatternSection][e.cursor];
                            d = 1 === f ? 0 : 1, s.pattern[p][e.activePatternSection][e.cursor] = d
                        }
                        s.activeSoundIndex = p
                    } else t.shift ? s.activeSoundIndex = p : window.oneShot(p, e);
                return s;
            default:
                return e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = n;
    var r, a = {
            tempo: 120,
            swing: 0,
            pattern: [
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            ],
            sounds: [{
                modes: [{
                    name: "Accent",
                    shortName: "AC"
                }],
                currentModeIndex: 0,
                properties: [{
                    name: "level",
                    value: 100
                }]
            }, {
                modes: [{
                    name: "Bass Drum",
                    shortName: "BD"
                }],
                currentModeIndex: 0,
                properties: [{
                    name: "level",
                    value: 100
                }, {
                    name: "tone",
                    value: 64
                }, {
                    name: "decay",
                    value: 20
                }]
            }, {
                modes: [{
                    name: "Snare Drum",
                    shortName: "SD"
                }],
                currentModeIndex: 0,
                properties: [{
                    name: "level",
                    value: 64
                }, {
                    name: "tone",
                    value: 100
                }, {
                    name: "snappy",
                    value: 100
                }]
            }, {
                modes: [{
                    name: "Low Conga",
                    shortName: "LC"
                }, {
                    name: "Low Tom",
                    shortName: "LT"
                }],
                currentModeIndex: 1,
                properties: [{
                    name: "level",
                    value: 100
                }, {
                    name: "tuning",
                    value: 64
                }]
            }, {
                modes: [{
                    name: "Mid Conga",
                    shortName: "MC"
                }, {
                    name: "Mid Tom",
                    shortName: "MT"
                }],
                currentModeIndex: 1,
                properties: [{
                    name: "level",
                    value: 100
                }, {
                    name: "tuning",
                    value: 64
                }]
            }, {
                modes: [{
                    name: "Hi Conga",
                    shortName: "HC"
                }, {
                    name: "Hi Tom",
                    shortName: "HT"
                }],
                currentModeIndex: 1,
                properties: [{
                    name: "level",
                    value: 100
                }, {
                    name: "tuning",
                    value: 64
                }]
            }, {
                modes: [{
                    name: "Claves",
                    shortName: "CL"
                }, {
                    name: "Rim Shot",
                    shortName: "RS"
                }],
                currentModeIndex: 1,
                properties: [{
                    name: "level",
                    value: 100
                }]
            }, {
                modes: [{
                    name: "Maracas",
                    shortName: "MA"
                }, {
                    name: "Hand Clap",
                    shortName: "CP"
                }],
                currentModeIndex: 1,
                properties: [{
                    name: "level",
                    value: 64
                }]
            }, {
                modes: [{
                    name: "Cow Bell",
                    shortName: "CB"
                }],
                currentModeIndex: 0,
                properties: [{
                    name: "level",
                    value: 100
                }]
            }, {
                modes: [{
                    name: "Cymbal",
                    shortName: "CY"
                }],
                currentModeIndex: 0,
                properties: [{
                    name: "level",
                    value: 100
                }, {
                    name: "tone",
                    value: 100
                }, {
                    name: "decay",
                    value: 100
                }]
            }, {
                modes: [{
                    name: "Open HiHat",
                    shortName: "OH"
                }],
                currentModeIndex: 0,
                properties: [{
                    name: "level",
                    value: 100
                }, {
                    name: "decay",
                    value: 100
                }]
            }, {
                modes: [{
                    name: "Closed HiHat",
                    shortName: "CH"
                }],
                currentModeIndex: 0,
                properties: [{
                    name: "level",
                    value: 100
                }]
            }],
            activeSoundIndex: 1,
            activePatternSection: 0,
            playing: !1,
            patternMode: "A"
        },
        o = JSON.parse(JSON.stringify(a));
    try {
        r = JSON.parse(decodeURIComponent(document.location.hash.slice(1))), r.cursor = 0, r.playing = !1
    } catch (i) {
        r = !1
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = (0, o.createStore)(s["default"], e);
        return t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = a;
    var o = n(3),
        i = n(22),
        s = r(i)
}, function(e, t, n) {
    var r = n(2),
        a = r(1);
    e.exports = function(e) {
        var t = 1.2,
            n = 3,
            r = 80,
            o = n / r,
            i = e.createBiquadFilter();
        i.type = "bandpass", i.frequency.value = 800, i.Q.value = .7;
        var s = e.createBiquadFilter();
        s.type = "highpass", s.frequency.value = 600, i.connect(s);
        var u = [];
        return function() {
            var n = e.createGain(),
                c = e.createGain();
            c.gain.value = 0;
            var l = e.createGain();
            l.gain.value = 0, c.connect(i), l.connect(n);
            var p = e.createBufferSource();
            p.buffer = a, p.loop = !0;
            var d = e.createGain();
            d.gain.value = 0;
            var f = e.createGain();
            f.gain.value = 0;
            var h = e.createGain(),
                m = e.createOscillator();
            return m.type = "sawtooth", m.frequency.value = r, m.connect(h.gain), p.connect(d), d.connect(h), h.connect(c), p.connect(f), f.connect(c), s.connect(l), n.start = function(e) {
                for (; u.length;) u.pop().stop(e);
                u.push(n), c.gain.setValueAtTime(0, e + 1e-4), c.gain.linearRampToValueAtTime(1, e + 2e-4), l.gain.setValueAtTime(0, e + 1e-4), l.gain.linearRampToValueAtTime(1, e + 2e-4), d.gain.setValueAtTime(1e-4, e), d.gain.exponentialRampToValueAtTime(1, e + .001), d.gain.linearRampToValueAtTime(1, e + o), d.gain.exponentialRampToValueAtTime(1e-9, e + o + .01), d.gain.setValueAtTime(0, e + o + .02), f.gain.setValueAtTime(1e-4, e), f.gain.setValueAtTime(1e-4, e + o), f.gain.exponentialRampToValueAtTime(1, e + o + .001), f.gain.exponentialRampToValueAtTime(.2, e + .1), f.gain.exponentialRampToValueAtTime(1e-9, e + t), f.gain.setValueAtTime(0, e + t + .01), m.start(e), m.stop(e + t), p.start(e, Math.random() * p.buffer.duration), p.stop(e + t), n.gain.setValueAtTime(0, e + t), p.onended = function() {
                    n.disconnect()
                }
            }, n.stop = function(e) {
                c.gain.setValueAtTime(1, e), c.gain.linearRampToValueAtTime(0, e + 1e-4), l.gain.setValueAtTime(1, e), l.gain.linearRampToValueAtTime(0, e + 1e-4);
                try {
                    m.stop(e)
                } catch (t) {}
                try {
                    p.stop(e)
                } catch (t) {}
            }, n
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        var t = [];
        return function() {
            var n = e.createOscillator(),
                r = e.createGain(),
                a = e.createGain();
            r.value = 0, r.frequency = 2450, r.duration = .2, n.connect(a);
            var o = e.createGain();
            return o.gain.value = .11, a.connect(o), o.connect(r), r.start = function(e) {
                for (; t.length;) t.pop().stop(e);
                t.push(r), n.frequency.value = r.frequency, r.gain.setValueAtTime(1e-5, e + 1e-4), r.gain.exponentialRampToValueAtTime(.3, e + 5e-4), r.gain.exponentialRampToValueAtTime(1e-5, e + r.duration), n.start(e), n.stop(e + r.duration), n.onended = function() {
                    n.disconnect(a)
                }
            }, r.stop = function(e) {
                a.gain.setValueAtTime(1, e), a.gain.linearRampToValueAtTime(0, e + 1e-4)
            }, r
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        return function() {
            var t = 1.2,
                n = e.createOscillator(),
                r = e.createOscillator();
            n.type = "square", r.type = "square", n.frequency.value = 800, r.frequency.value = 540;
            var a = e.createGain(),
                o = e.createBiquadFilter();
            return o.type = "bandpass", n.connect(a), r.connect(a), a.connect(o), o.start = function(e) {
                a.gain.setValueAtTime(.2, e), a.gain.exponentialRampToValueAtTime(1e-5, e + t), n.start(e), r.start(e), n.stop(e + t), r.stop(e + t), n.onended = function() {
                    o.disconnect()
                }
            }, o
        }
    }
}, function(e, t) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        a = function() {
            function e(t, r) {
                n(this, e), this.context = t, this.settings = r, this._setDefaults(), this.source = this._getOnesBufferSource(), this.attackDecayNode = t.createGain(), this.releaseNode = t.createGain(), this.ampNode = t.createGain(), this.outputNode = t.createGain(), this.outputNode.gain.value = this.settings.startLevel, this.ampNode.gain.value = this.settings.maxLevel - this.settings.startLevel, this.source.connect(this.attackDecayNode), this.source.connect(this.outputNode), this.attackDecayNode.connect(this.releaseNode), this.releaseNode.connect(this.ampNode), this.ampNode.connect(this.outputNode.gain)
            }
            return r(e, [{
                key: "_setDefaults",
                value: function() {
                    "string" != typeof this.settings.curve && (this.settings.curve = "linear"), "number" != typeof this.settings.delayTime && (this.settings.delayTime = 0), "number" != typeof this.settings.startLevel && (this.settings.startLevel = 0), "number" != typeof this.settings.maxLevel && (this.settings.maxLevel = 1), "number" != typeof this.settings.sustainLevel && (this.settings.sustainLevel = 1), "number" != typeof this.settings.attackTime && (this.settings.attackTime = 0), "number" != typeof this.settings.holdTime && (this.settings.holdTime = 0), "number" != typeof this.settings.decayTime && (this.settings.decayTime = 0), "number" != typeof this.settings.releaseTime && (this.settings.releaseTime = 0), 0 === this.settings.startLevel && "exponentialRampToValueAtTime" === this._getRampMethodName("attack") && (this.settings.maxLevel < 0 ? this.settings.startLevel = -.001 : this.settings.startLevel = .001),
                        0 !== this.settings.maxLevel || "exponentialRampToValueAtTime" !== this._getRampMethodName("attack") && "exponentialRampToValueAtTime" !== this._getRampMethodName("decay") && "exponentialRampToValueAtTime" !== this._getRampMethodName("release") || (this.settings.startLevel < 0 ? this.settings.maxLevel = -.001 : this.settings.maxLevel = .001), 0 !== this.settings.sustainLevel || "exponentialRampToValueAtTime" !== this._getRampMethodName("decay") && "exponentialRampToValueAtTime" !== this._getRampMethodName("release") || (this.settings.sustainLevel = .001), 0 === this.settings.decayTime && (this.settings.decayTime = .001)
                }
            }, {
                key: "_getOnesBufferSource",
                value: function() {
                    var e = this.context,
                        t = e.createBuffer(1, 2, e.sampleRate),
                        n = t.getChannelData(0);
                    n[0] = 1, n[1] = 1;
                    var r = e.createBufferSource();
                    return r.buffer = t, r.loop = !0, r
                }
            }, {
                key: "connect",
                value: function(e) {
                    this.outputNode.connect(e)
                }
            }, {
                key: "start",
                value: function(e) {
                    var t = this._getRampMethodName("attack"),
                        n = this._getRampMethodName("decay"),
                        r = e + this.settings.delayTime,
                        a = r + this.settings.attackTime,
                        o = a + this.settings.holdTime,
                        i = o + this.settings.decayTime,
                        s = 0;
                    "exponentialRampToValueAtTime" === t && (s = .001), this.attackDecayNode.gain.setValueAtTime(s, e), this.attackDecayNode.gain.setValueAtTime(s, r), this.attackDecayNode.gain[t](1, a), this.attackDecayNode.gain.setValueAtTime(1, o), this.attackDecayNode.gain[n](this.settings.sustainLevel, i), this.source.start(e)
                }
            }, {
                key: "_getRampMethodName",
                value: function(e) {
                    var t = "exponentialRampToValueAtTime",
                        n = "linearRampToValueAtTime",
                        r = n;
                    switch ("exponential" === this.settings.curve && (r = t), e) {
                        case "attack":
                            if (this.settings.attackCurve) {
                                if ("exponential" === this.settings.attackCurve) return t;
                                if ("linear" === this.settings.attackCurve) return n
                            }
                            break;
                        case "decay":
                            if (this.settings.decayCurve) {
                                if ("exponential" === this.settings.decayCurve) return t;
                                if ("linear" === this.settings.decayCurve) return n
                            }
                            break;
                        case "release":
                            if (this.settings.releaseCurve) {
                                if ("exponential" === this.settings.releaseCurve) return t;
                                if ("linear" === this.settings.releaseCurve) return n
                            }
                    }
                    return r
                }
            }, {
                key: "release",
                value: function(e) {
                    this.releasedAt = e;
                    var t = this.releasedAt + this.settings.releaseTime,
                        n = this._getRampMethodName("release"),
                        r = 0;
                    "exponentialRampToValueAtTime" === n && (r = .001), this.releaseNode.gain.setValueAtTime(1, e), this.releaseNode.gain[n](r, t)
                }
            }, {
                key: "stop",
                value: function(e) {
                    this.source.stop(e)
                }
            }, {
                key: "getReleaseCompleteTime",
                value: function() {
                    if ("number" != typeof this.releasedAt) throw new Error("Release has not been called.");
                    return this.releasedAt + this.settings.releaseTime
                }
            }]), e
        }();
    e.exports = a
}, function(e, t, n) {
    var r = n(28);
    e.exports = function(e) {
        var t = [],
            n = 80,
            a = [1, 1.5, 2.08, 2.715, 3.395, 4.105];
        return function(o) {
            var i = e.createBiquadFilter();
            i.type = "highpass", i.frequency.value = 7e3;
            var s = e.createBiquadFilter();
            s.type = "bandpass", s.frequency.value = 1e4, s.connect(i);
            var u = e.createGain(),
                c = e.createGain();
            c.gain.value = 0;
            var l = e.createGain();
            l.gain.value = 0;
            var p = e.createGain();
            p.gain.value = .4, o ? u.duration = 1.3 : u.duration = .1;
            var d = e.createGain();
            d.gain.value = 0, d.connect(s), i.connect(l), l.connect(p), p.connect(u);
            var f = a.map(function(t) {
                var r = e.createOscillator();
                return r.type = "square", r.frequency.value = n * t, r.connect(c), r
            });
            return c.connect(d), u.start = function(n) {
                for (; t.length;) t.pop().stop(n);
                t.push(u), c.gain.setValueAtTime(0, n + 1e-4), c.gain.linearRampToValueAtTime(1, n + 2e-4), l.gain.setValueAtTime(0, n + 1e-4), l.gain.linearRampToValueAtTime(1, n + 2e-4);
                var a = {
                    curve: "exponential",
                    attackTime: 1e-4,
                    attackCurve: "linear",
                    sustainLevel: .3,
                    decayTime: .02
                };
                a.releaseTime = u.duration - a.attackTime - a.decayTime;
                var o = new r(e, a);
                o.connect(d.gain), o.start(n), o.release(n + a.attackTime + a.decayTime);
                var s = o.getReleaseCompleteTime();
                o.stop(s), f.forEach(function(e) {
                    e.start(n), e.stop(s)
                }), f[0].onended = function() {
                    i.disconnect(l), u.disconnect()
                }
            }, u.stop = function(e) {
                c.gain.setValueAtTime(1, e), c.gain.linearRampToValueAtTime(0, e + 1e-4), l.gain.setValueAtTime(1, e), l.gain.linearRampToValueAtTime(0, e + 1e-4), u.gain.setValueAtTime(1, e), u.gain.linearRampToValueAtTime(0, e + 1e-4)
            }, u
        }
    }
}, function(e, t) {
    "use strict";
    var n = {
            childContextTypes: !0,
            contextTypes: !0,
            defaultProps: !0,
            displayName: !0,
            getDefaultProps: !0,
            mixins: !0,
            propTypes: !0,
            type: !0
        },
        r = {
            name: !0,
            length: !0,
            prototype: !0,
            caller: !0,
            arguments: !0,
            arity: !0
        };
    e.exports = function(e, t) {
        if ("string" != typeof t)
            for (var a = Object.getOwnPropertyNames(t), o = 0; o < a.length; ++o)
                if (!n[a[o]] && !r[a[o]]) try {
                    e[a[o]] = t[a[o]]
                } catch (i) {}
                return e
    }
}, function(e, t, n) {
    "use strict";
    var r = function(e, t, n, r, a, o, i, s) {
        if (!e) {
            var u;
            if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var c = [n, r, a, o, i, s],
                    l = 0;
                u = new Error(t.replace(/%s/g, function() {
                    return c[l++]
                })), u.name = "Invariant Violation"
            }
            throw u.framesToPop = 1, u
        }
    };
    e.exports = r
}, function(e, t, n) {
    var r = n(2),
        a = r(1);
    e.exports = function(e, t) {
        t = t || {}, t.tone = "number" == typeof t.tone ? t.tone : 64, t.decay = "number" == typeof t.decay ? t.decay : 64, t.level = "number" == typeof t.level ? t.level : 100;
        var n = [];
        return function() {
            var r = e.createOscillator();
            r.frequency.value = 54;
            var o = e.createGain(),
                i = e.createGain();
            r.connect(i), o.decay = t.decay, o.tone = t.tone;
            var s = e.createGain();
            return s.gain.value = 0, i.connect(s), s.connect(o), o.start = function(t) {
                for ("number" != typeof t && (t = e.currentTime); n.length;) n.pop().stop(t);
                n.push(o), s.gain.setValueAtTime(0, t + 1e-4), s.gain.linearRampToValueAtTime(1, t + 2e-4), max = 2.2, min = .09, duration = (max - min) * (o.decay / 127) + min;
                var u = e.createBufferSource();
                u.buffer = a, u.loop = !0;
                var c = e.createGain(),
                    l = e.createBiquadFilter();
                l.type = "bandpass", l.frequency.value = 2760, l.Q.value = 20, u.connect(l), l.connect(c), c.connect(s), c.gain.setValueAtTime(2 * Math.max(o.tone / 127, 1e-4), t), c.gain.exponentialRampToValueAtTime(1e-4, t + .01), u.start(t), u.stop(t + duration), r.start(t), r.stop(t + duration), r.onended = function() {
                    o.disconnect()
                }, i.gain.setValueAtTime(1e-4, t), i.gain.exponentialRampToValueAtTime(1, t + .004), i.gain.exponentialRampToValueAtTime(1e-4, t + duration)
            }, o.stop = function(t) {
                "number" != typeof t && (t = e.currentTime), s.gain.setValueAtTime(1, t), s.gain.linearRampToValueAtTime(0, t + 1e-4)
            }, o
        }
    }
}, function(e, t) {
    function n(e) {
        return r(Object(e))
    }
    var r = Object.getPrototypeOf;
    e.exports = n
}, function(e, t) {
    function n(e) {
        var t = !1;
        if (null != e && "function" != typeof e.toString) try {
            t = !!(e + "")
        } catch (n) {}
        return t
    }
    e.exports = n
}, function(e, t) {
    function n(e) {
        return !!e && "object" == typeof e
    }
    e.exports = n
}, function(e, t) {
    e.exports = function(e) {
        for (var t, n = "number" == typeof e ? e : 50, r = 44100, a = new Float32Array(r), o = Math.PI / 180, i = 0; r > i; ++i) t = 2 * i / r - 1, a[i] = (3 + n) * t * 20 * o / (Math.PI + n * Math.abs(t));
        return a
    }
}, function(e, t, n) {
    var r = n(2);
    e.exports = function(e, t) {
        return function() {
            var t = .2,
                n = e.createBufferSource();
            n.buffer = r(t);
            var a = e.createBiquadFilter();
            a.type = "bandpass", a.frequency.value = 16e3, a.Q.value = .5;
            var o = e.createGain();
            n.connect(a), a.connect(o);
            var i = e.createGain();
            return o.connect(i), i.start = function(e) {
                n.start(e), o.gain.setValueAtTime(1e-5, e), o.gain.exponentialRampToValueAtTime(1, e + t / 7), o.gain.exponentialRampToValueAtTime(1e-5, e + t), n.stop(e + t), n.onended = function() {
                    i.disconnect()
                }
            }, i
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    t.__esModule = !0, t["default"] = void 0;
    var s = n(1),
        u = n(6),
        c = r(u),
        l = n(7),
        p = (r(l), function(e) {
            function t(n, r) {
                a(this, t);
                var i = o(this, e.call(this, n, r));
                return i.store = n.store, i
            }
            return i(t, e), t.prototype.getChildContext = function() {
                return {
                    store: this.store
                }
            }, t.prototype.render = function() {
                var e = this.props.children;
                return s.Children.only(e)
            }, t
        }(s.Component));
    t["default"] = p, p.propTypes = {
        store: c["default"].isRequired,
        children: s.PropTypes.element.isRequired
    }, p.childContextTypes = {
        store: c["default"].isRequired
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function s(e) {
        return e.displayName || e.name || "Component"
    }

    function u(e, t) {
        try {
            return e.apply(t)
        } catch (n) {
            return S.value = n, S
        }
    }

    function c(e, t, n) {
        var r = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3],
            c = Boolean(e),
            d = e || C,
            h = void 0;
        h = "function" == typeof t ? t : t ? (0, y["default"])(t) : E;
        var v = n || k,
            g = r.pure,
            b = void 0 === g ? !0 : g,
            T = r.withRef,
            P = void 0 === T ? !1 : T,
            O = b && v !== k,
            N = A++;
        return function(e) {
            function t(e, t, n) {
                var r = v(e, t, n);
                return r
            }
            var n = "Connect(" + s(e) + ")",
                r = function(r) {
                    function s(e, t) {
                        a(this, s);
                        var i = o(this, r.call(this, e, t));
                        i.version = N, i.store = e.store || t.store, (0, w["default"])(i.store, 'Could not find "store" in either the context or ' + ('props of "' + n + '". ') + "Either wrap the root component in a <Provider>, " + ('or explicitly pass "store" as a prop to "' + n + '".'));
                        var u = i.store.getState();
                        return i.state = {
                            storeState: u
                        }, i.clearCache(), i
                    }
                    return i(s, r), s.prototype.shouldComponentUpdate = function() {
                        return !b || this.haveOwnPropsChanged || this.hasStoreStateChanged
                    }, s.prototype.computeStateProps = function(e, t) {
                        if (!this.finalMapStateToProps) return this.configureFinalMapState(e, t);
                        var n = e.getState(),
                            r = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(n, t) : this.finalMapStateToProps(n);
                        return r
                    }, s.prototype.configureFinalMapState = function(e, t) {
                        var n = d(e.getState(), t),
                            r = "function" == typeof n;
                        return this.finalMapStateToProps = r ? n : d, this.doStatePropsDependOnOwnProps = 1 !== this.finalMapStateToProps.length, r ? this.computeStateProps(e, t) : n
                    }, s.prototype.computeDispatchProps = function(e, t) {
                        if (!this.finalMapDispatchToProps) return this.configureFinalMapDispatch(e, t);
                        var n = e.dispatch,
                            r = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(n, t) : this.finalMapDispatchToProps(n);
                        return r
                    }, s.prototype.configureFinalMapDispatch = function(e, t) {
                        var n = h(e.dispatch, t),
                            r = "function" == typeof n;
                        return this.finalMapDispatchToProps = r ? n : h, this.doDispatchPropsDependOnOwnProps = 1 !== this.finalMapDispatchToProps.length, r ? this.computeDispatchProps(e, t) : n
                    }, s.prototype.updateStatePropsIfNeeded = function() {
                        var e = this.computeStateProps(this.store, this.props);
                        return this.stateProps && (0, m["default"])(e, this.stateProps) ? !1 : (this.stateProps = e, !0)
                    }, s.prototype.updateDispatchPropsIfNeeded = function() {
                        var e = this.computeDispatchProps(this.store, this.props);
                        return this.dispatchProps && (0, m["default"])(e, this.dispatchProps) ? !1 : (this.dispatchProps = e, !0)
                    }, s.prototype.updateMergedPropsIfNeeded = function() {
                        var e = t(this.stateProps, this.dispatchProps, this.props);
                        return this.mergedProps && O && (0, m["default"])(e, this.mergedProps) ? !1 : (this.mergedProps = e, !0)
                    }, s.prototype.isSubscribed = function() {
                        return "function" == typeof this.unsubscribe
                    }, s.prototype.trySubscribe = function() {
                        c && !this.unsubscribe && (this.unsubscribe = this.store.subscribe(this.handleChange.bind(this)), this.handleChange())
                    }, s.prototype.tryUnsubscribe = function() {
                        this.unsubscribe && (this.unsubscribe(), this.unsubscribe = null)
                    }, s.prototype.componentDidMount = function() {
                        this.trySubscribe()
                    }, s.prototype.componentWillReceiveProps = function(e) {
                        b && (0, m["default"])(e, this.props) || (this.haveOwnPropsChanged = !0)
                    }, s.prototype.componentWillUnmount = function() {
                        this.tryUnsubscribe(), this.clearCache()
                    }, s.prototype.clearCache = function() {
                        this.dispatchProps = null, this.stateProps = null, this.mergedProps = null, this.haveOwnPropsChanged = !0, this.hasStoreStateChanged = !0, this.haveStatePropsBeenPrecalculated = !1, this.statePropsPrecalculationError = null, this.renderedElement = null, this.finalMapDispatchToProps = null, this.finalMapStateToProps = null
                    }, s.prototype.handleChange = function() {
                        if (this.unsubscribe) {
                            var e = this.store.getState(),
                                t = this.state.storeState;
                            if (!b || t !== e) {
                                if (b && !this.doStatePropsDependOnOwnProps) {
                                    var n = u(this.updateStatePropsIfNeeded, this);
                                    if (!n) return;
                                    n === S && (this.statePropsPrecalculationError = S.value), this.haveStatePropsBeenPrecalculated = !0
                                }
                                this.hasStoreStateChanged = !0, this.setState({
                                    storeState: e
                                })
                            }
                        }
                    }, s.prototype.getWrappedInstance = function() {
                        return (0, w["default"])(P, "To access the wrapped instance, you need to specify { withRef: true } as the fourth argument of the connect() call."), this.refs.wrappedInstance
                    }, s.prototype.render = function() {
                        var t = this.haveOwnPropsChanged,
                            n = this.hasStoreStateChanged,
                            r = this.haveStatePropsBeenPrecalculated,
                            a = this.statePropsPrecalculationError,
                            o = this.renderedElement;
                        if (this.haveOwnPropsChanged = !1, this.hasStoreStateChanged = !1, this.haveStatePropsBeenPrecalculated = !1, this.statePropsPrecalculationError = null, a) throw a;
                        var i = !0,
                            s = !0;
                        b && o && (i = n || t && this.doStatePropsDependOnOwnProps, s = t && this.doDispatchPropsDependOnOwnProps);
                        var u = !1,
                            c = !1;
                        r ? u = !0 : i && (u = this.updateStatePropsIfNeeded()), s && (c = this.updateDispatchPropsIfNeeded());
                        var d = !0;
                        return d = u || c || t ? this.updateMergedPropsIfNeeded() : !1, !d && o ? o : (P ? this.renderedElement = (0, p.createElement)(e, l({}, this.mergedProps, {
                            ref: "wrappedInstance"
                        })) : this.renderedElement = (0, p.createElement)(e, this.mergedProps), this.renderedElement)
                    }, s
                }(p.Component);
            return r.displayName = n, r.WrappedComponent = e, r.contextTypes = {
                store: f["default"]
            }, r.propTypes = {
                store: f["default"]
            }, (0, x["default"])(r, e)
        }
    }
    var l = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    };
    t.__esModule = !0, t["default"] = c;
    var p = n(1),
        d = n(6),
        f = r(d),
        h = n(40),
        m = r(h),
        v = n(41),
        y = r(v),
        g = n(7),
        b = (r(g), n(4)),
        T = (r(b), n(30)),
        x = r(T),
        P = n(31),
        w = r(P),
        C = function(e) {
            return {}
        },
        E = function(e) {
            return {
                dispatch: e
            }
        },
        k = function(e, t, n) {
            return l({}, n, e, t)
        },
        S = {
            value: null
        },
        A = 0
}, function(e, t) {
    "use strict";

    function n(e, t) {
        if (e === t) return !0;
        var n = Object.keys(e),
            r = Object.keys(t);
        if (n.length !== r.length) return !1;
        for (var a = Object.prototype.hasOwnProperty, o = 0; o < n.length; o++)
            if (!a.call(t, n[o]) || e[n[o]] !== t[n[o]]) return !1;
        return !0
    }
    t.__esModule = !0, t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return function(t) {
            return (0, a.bindActionCreators)(e, t)
        }
    }
    t.__esModule = !0, t["default"] = r;
    var a = n(3)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a() {
        for (var e = arguments.length, t = Array(e), n = 0; e > n; n++) t[n] = arguments[n];
        return function(e) {
            return function(n, r, a) {
                var i = e(n, r, a),
                    u = i.dispatch,
                    c = [],
                    l = {
                        getState: i.getState,
                        dispatch: function(e) {
                            return u(e)
                        }
                    };
                return c = t.map(function(e) {
                    return e(l)
                }), u = s["default"].apply(void 0, c)(i.dispatch), o({}, i, {
                    dispatch: u
                })
            }
        }
    }
    t.__esModule = !0;
    var o = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    };
    t["default"] = a;
    var i = n(8),
        s = r(i)
}, function(e, t) {
    "use strict";

    function n(e, t) {
        return function() {
            return t(e.apply(void 0, arguments))
        }
    }

    function r(e, t) {
        if ("function" == typeof e) return n(e, t);
        if ("object" != typeof e || null === e) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
        for (var r = Object.keys(e), a = {}, o = 0; o < r.length; o++) {
            var i = r[o],
                s = e[i];
            "function" == typeof s && (a[i] = n(s, t))
        }
        return a
    }
    t.__esModule = !0, t["default"] = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        var n = t && t.type,
            r = n && '"' + n.toString() + '"' || "an action";
        return "Given action " + r + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state.'
    }

    function o(e) {
        Object.keys(e).forEach(function(t) {
            var n = e[t],
                r = n(void 0, {
                    type: s.ActionTypes.INIT
                });
            if ("undefined" == typeof r) throw new Error('Reducer "' + t + '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');
            var a = "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".");
            if ("undefined" == typeof n(void 0, {
                    type: a
                })) throw new Error('Reducer "' + t + '" returned undefined when probed with a random type. ' + ("Don't try to handle " + s.ActionTypes.INIT + ' or other actions in "redux/*" ') + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.")
        })
    }

    function i(e) {
        for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
            var i = t[r];
            "function" == typeof e[i] && (n[i] = e[i])
        }
        var s, u = Object.keys(n);
        try {
            o(n)
        } catch (c) {
            s = c
        }
        return function() {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                t = arguments[1];
            if (s) throw s;
            for (var r = !1, o = {}, i = 0; i < u.length; i++) {
                var c = u[i],
                    l = n[c],
                    p = e[c],
                    d = l(p, t);
                if ("undefined" == typeof d) {
                    var f = a(c, t);
                    throw new Error(f)
                }
                o[c] = d, r = r || d !== p
            }
            return r ? o : e
        }
    }
    t.__esModule = !0, t["default"] = i;
    var s = n(9),
        u = n(4),
        c = (r(u), n(10));
    r(c)
}, function(e, t, n) {
    var r = n(36),
        a = r(1024);
    e.exports = function(e) {
        var t = [];
        return function() {
            var n = e.createWaveShaper();
            n.curve = a;
            var r = e.createBiquadFilter();
            r.type = "highpass", r.frequency.value = 700, n.connect(r);
            var o = e.createGain();
            o.gain.value = 0;
            var i = e.createGain();
            i.gain.value = 0;
            var s = .05,
                u = e.createGain();
            return u.start = function(a) {
                for (; t.length;) t.pop().stop(a);
                t.push(u), o.gain.setValueAtTime(0, a + 1e-4), o.gain.linearRampToValueAtTime(1, a + 2e-4), i.gain.setValueAtTime(0, a + 1e-4), i.gain.linearRampToValueAtTime(1, a + 2e-4), o.connect(n), r.connect(i), i.connect(u);
                var c = [e.createOscillator(), e.createOscillator()];
                c.forEach(function(e, t) {
                    switch (e.type = "triangle", e.connect(o), e.start(a), e.stop(a + s), t) {
                        case 0:
                            e.frequency.value = 500;
                            break;
                        case 1:
                            e.frequency.value = 1720
                    }
                }), c[0].onended = function() {
                    r.disconnect(i)
                }, u.gain.setValueAtTime(.8, a), u.gain.exponentialRampToValueAtTime(1e-5, a + s)
            }, u.stop = function(e) {
                o.gain.setValueAtTime(1, e), o.gain.linearRampToValueAtTime(0, e + 1e-4), i.gain.setValueAtTime(1, e), i.gain.linearRampToValueAtTime(0, e + 1e-4)
            }, u
        }
    }
}, function(e, t, n) {
    var r = n(2),
        a = n(47),
        o = n(48);
    e.exports = function(e, t) {
        var n = [];
        t = t || {}, t.tone = "number" == typeof t.tone ? t.tone : 64, t.snappy = "number" == typeof t.snappy ? t.snappy : 64;
        var i = r(1);
        return function() {
            var t = e.createBiquadFilter();
            t.frequency.value = 4e3, t.gain.value = 6, t.type = "peaking";
            var r = e.createBiquadFilter();
            r.frequency.value = 200, r.gain.value = 12, r.type = "peaking", t.connect(r);
            var s = e.createGain();
            s.gain.value = .4, s.connect(t);
            var u = e.createBiquadFilter();
            u.type = "highpass", u.frequency.value = 1200, u.connect(s);
            var c = e.createBiquadFilter();
            c.type = "highpass", c.frequency.value = 400, c.connect(s);
            var l = e.createGain(),
                p = e.createBufferSource();
            p.buffer = i, p.loop = !0;
            var d = e.createGain();
            d.gain.value = 1, l.snappy = d.gain;
            var f = e.createGain();
            f.gain.value = 0;
            var h = e.createGain();
            h.gain.value = 0;
            var m = e.createGain();
            p.connect(d), d.connect(m), m.connect(h), h.connect(u);
            var v = e.createGain();
            v.connect(f), f.connect(c);
            var y = o(e),
                g = e.createGain();
            g.gain.value = 0, l.detune = g.gain, y.connect(g);
            var b = e.createGain();
            b.gain.value = 0;
            var T = [87.307, 329.628].map(function(t) {
                    var n = e.createOscillator();
                    return n.frequency.value = t, g.connect(n.detune), n
                }),
                x = e.createGain();
            x.gain.value = .5, y.connect(x), l.tone = x.gain;
            var P = e.createGain(),
                w = e.createGain();
            return P.gain.value = -1, w.gain.value = 0, T[0].connect(P), T[1].connect(w), x.connect(P.gain), x.connect(w.gain), P.connect(v), w.connect(v), r.connect(b), b.connect(l), a(p, function() {
                r.disconnect(b)
            }), l.duration = .3, l.start = function(t) {
                for (f.gain.setValueAtTime(0, t + 1e-4), f.gain.linearRampToValueAtTime(1, t + 2e-4), h.gain.setValueAtTime(0, t + 1e-4), h.gain.linearRampToValueAtTime(1, t + 2e-4), b.gain.setValueAtTime(0, t + 1e-4), b.gain.linearRampToValueAtTime(1, t + 2e-4); n.length;) n.pop().stop(t);
                n.push(l), "number" != typeof t && (t = e.currentTime), m.gain.setValueAtTime(1e-4, t), m.gain.exponentialRampToValueAtTime(Math.max(1e-4, 1), t + Math.min(l.duration * (.01 / .3), .01)), m.gain.exponentialRampToValueAtTime(1e-4, t + l.duration), v.gain.setValueAtTime(1e-4, t), v.gain.exponentialRampToValueAtTime(1, t + Math.min(.01, l.duration * (.01 / .3))), v.gain.exponentialRampToValueAtTime(1e-5, t + 2 * l.duration / 3), T.forEach(function(e) {
                    e.start(t), e.stop(t + l.duration)
                }), p.start(t), p.stop(t + l.duration), y.start(t), y.stop(t + l.duration)
            }, l.stop = function(e) {
                f.gain.setValueAtTime(1, e), f.gain.linearRampToValueAtTime(0, e + 1e-4), h.gain.setValueAtTime(1, e), h.gain.linearRampToValueAtTime(0, e + 1e-4), b.gain.setValueAtTime(1, e), b.gain.linearRampToValueAtTime(0, e + 1e-4), l.stop = function() {}, l.gain.setValueAtTime(1, e), l.gain.linearRampToValueAtTime(0, e + .01);
                try {
                    T.forEach(function(t) {
                        t.stop(e + .01)
                    }), p.stop(e + .01), y.stop(e + .01)
                } catch (t) {}
            }, l
        }
    }
}, function(e, t) {
    e.exports = function(e, t) {
        var n = e.context;
        n instanceof(window.OfflineAudioContext || window.webkitOfflineAudioContext) ? n.suspend().then(function() {
            t(), n.resume()
        }) : n instanceof(window.AudioContext || window.webkitAudioContext) && (e.onended = t)
    }
}, function(e, t) {
    e.exports = function(e) {
        var t = e.createBuffer(1, 2, 44100),
            n = t.getChannelData(0);
        n[0] = 1, n[1] = 1;
        var r = e.createBufferSource();
        return r.buffer = t, r.loop = !0, r
    }
}, function(e, t, n) {
    (function(t) {
        "use strict";
        e.exports = n(50)(t || window || this)
    }).call(t, function() {
        return this
    }())
}, function(e, t) {
    "use strict";
    e.exports = function(e) {
        var t, n = e.Symbol;
        return "function" == typeof n ? n.observable ? t = n.observable : (t = n("observable"), n.observable = t) : t = "@@observable", t
    }
}, function(e, t) {
    e.exports = function(e, t) {
        var n = [];
        return function(r) {
            r = r || {};
            var a = e.createOscillator(),
                o = e.createGain(),
                i = e.createGain();
            return o.duration = .5, o.frequency = t || r.frequency || 125, a.connect(i), i.connect(o), o.start = function(e) {
                for (; n.length;) n.pop().stop(e);
                n.push(o), a.frequency.setValueAtTime(1 * o.frequency, e), a.frequency.exponentialRampToValueAtTime(o.frequency, e + .05), o.gain.setValueAtTime(0, e), o.gain.linearRampToValueAtTime(1, e + 5e-4), o.gain.exponentialRampToValueAtTime(.001, e + o.duration), a.start(e), a.stop(e + o.duration), a.onended = function() {
                    a.disconnect(i)
                }
            }, o.stop = function(e) {
                i.gain.setValueAtTime(1, e), i.gain.linearRampToValueAtTime(0, e + .01)
            }, o
        }
    }
}, function(e, t) {
    e.exports = function(e, t, n) {
        function r(a) {
            var o = t.createBuffer(1, 1, 22050),
                i = t.createBufferSource();
            i.buffer = o, i.connect(t.destination), i.start(t.currentTime), setTimeout(function() {
                e.removeEventListener("mousedown", r, !1), e.removeEventListener("touchend", r, !1), n(i.playbackState === i.PLAYING_STATE || i.playbackState === i.FINISHED_STATE)
            }, 1)
        }
        e.addEventListener("mousedown", r, !1), e.addEventListener("touchend", r, !1)
    }
}]);