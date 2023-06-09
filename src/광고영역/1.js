function initSmartFocus() {
    $(".smartfocus").each(function(e, t) {
        $(t).blur(),
        $(t).focus(),
        $(t).select()
    })
}
function initEasySelect() {
    $(".easy-select").on("focus click", function() {
        $(this).hasClass("selected") || this.select(),
        $(this).toggleClass("selected")
    })
}
(function() {
    var e = this;
    (function() {
        (function() {
            this.Rails = {
                linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
                buttonClickSelector: {
                    selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
                    exclude: "form button"
                },
                inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
                formSubmitSelector: "form",
                formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
                formDisableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
                formEnableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
                fileInputSelector: "input[name][type=file]:not([disabled])",
                linkDisableSelector: "a[data-disable-with], a[data-disable]",
                buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]"
            }
        }
        ).call(this)
    }
    ).call(e);
    var t = e.Rails;
    (function() {
        (function() {
            var e, n;
            n = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector,
            t.matches = function(e, t) {
                return null != t.exclude ? n.call(e, t.selector) && !n.call(e, t.exclude) : n.call(e, t)
            }
            ,
            e = "_ujsData",
            t.getData = function(t, n) {
                var r;
                return null != (r = t[e]) ? r[n] : void 0
            }
            ,
            t.setData = function(t, n, r) {
                return null == t[e] && (t[e] = {}),
                t[e][n] = r
            }
            ,
            t.$ = function(e) {
                return Array.prototype.slice.call(document.querySelectorAll(e))
            }
        }
        ).call(this),
        function() {
            var e, n, r;
            e = t.$,
            r = t.csrfToken = function() {
                var e;
                return (e = document.querySelector("meta[name=csrf-token]")) && e.content
            }
            ,
            n = t.csrfParam = function() {
                var e;
                return (e = document.querySelector("meta[name=csrf-param]")) && e.content
            }
            ,
            t.CSRFProtection = function(e) {
                var t;
                if (null != (t = r()))
                    return e.setRequestHeader("X-CSRF-Token", t)
            }
            ,
            t.refreshCSRFTokens = function() {
                var t, i;
                if (i = r(),
                t = n(),
                null != i && null != t)
                    return e('form input[name="' + t + '"]').forEach(function(e) {
                        return e.value = i
                    })
            }
        }
        .call(this),
        function() {
            var e, n, r;
            r = t.matches,
            e = window.CustomEvent,
            "function" != typeof e && (e = function(e, t) {
                var n;
                return n = document.createEvent("CustomEvent"),
                n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail),
                n
            }
            ,
            e.prototype = window.Event.prototype),
            n = t.fire = function(t, n, r) {
                var i;
                return i = new e(n,{
                    bubbles: !0,
                    cancelable: !0,
                    detail: r
                }),
                t.dispatchEvent(i),
                !i.defaultPrevented
            }
            ,
            t.stopEverything = function(e) {
                return n(e.target, "ujs:everythingStopped"),
                e.preventDefault(),
                e.stopPropagation(),
                e.stopImmediatePropagation()
            }
            ,
            t.delegate = function(e, t, n, i) {
                return e.addEventListener(n, function(e) {
                    var n;
                    for (n = e.target; n instanceof Element && !r(n, t); )
                        n = n.parentNode;
                    if (n instanceof Element && !1 === i.call(n, e))
                        return e.preventDefault(),
                        e.stopPropagation()
                })
            }
        }
        .call(this),
        function() {
            var e, n, r, i, o, a;
            n = t.CSRFProtection,
            i = t.fire,
            e = {
                "*": "*/*",
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript",
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            t.ajax = function(e) {
                var t;
                return e = o(e),
                t = r(e, function() {
                    var n;
                    return n = a(t.response, t.getResponseHeader("Content-Type")),
                    2 === Math.floor(t.status / 100) ? "function" == typeof e.success && e.success(n, t.statusText, t) : "function" == typeof e.error && e.error(n, t.statusText, t),
                    "function" == typeof e.complete ? e.complete(t, t.statusText) : void 0
                }),
                "function" == typeof e.beforeSend && e.beforeSend(t, e),
                t.readyState === XMLHttpRequest.OPENED ? t.send(e.data) : i(document, "ajaxStop")
            }
            ,
            o = function(t) {
                return t.url = t.url || location.href,
                t.type = t.type.toUpperCase(),
                "GET" === t.type && t.data && (t.url.indexOf("?") < 0 ? t.url += "?" + t.data : t.url += "&" + t.data),
                null == e[t.dataType] && (t.dataType = "*"),
                t.accept = e[t.dataType],
                "*" !== t.dataType && (t.accept += ", */*; q=0.01"),
                t
            }
            ,
            r = function(e, t) {
                var r;
                return r = new XMLHttpRequest,
                r.open(e.type, e.url, !0),
                r.setRequestHeader("Accept", e.accept),
                "string" == typeof e.data && r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
                e.crossDomain || r.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                n(r),
                r.withCredentials = !!e.withCredentials,
                r.onreadystatechange = function() {
                    if (r.readyState === XMLHttpRequest.DONE)
                        return t(r)
                }
                ,
                r
            }
            ,
            a = function(e, t) {
                var n, r;
                if ("string" == typeof e && "string" == typeof t)
                    if (t.match(/\bjson\b/))
                        try {
                            e = JSON.parse(e)
                        } catch (e) {}
                    else if (t.match(/\b(?:java|ecma)script\b/))
                        r = document.createElement("script"),
                        r.text = e,
                        document.head.appendChild(r).parentNode.removeChild(r);
                    else if (t.match(/\b(xml|html|svg)\b/)) {
                        n = new DOMParser,
                        t = t.replace(/;.+/, "");
                        try {
                            e = n.parseFromString(e, t)
                        } catch (e) {}
                    }
                return e
            }
            ,
            t.href = function(e) {
                return e.href
            }
            ,
            t.isCrossDomain = function(e) {
                var t, n;
                t = document.createElement("a"),
                t.href = location.href,
                n = document.createElement("a");
                try {
                    return n.href = e,
                    !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
                } catch (e) {
                    return e,
                    !0
                }
            }
        }
        .call(this),
        function() {
            var e, n;
            e = t.matches,
            n = function(e) {
                return Array.prototype.slice.call(e)
            }
            ,
            t.serializeElement = function(t, r) {
                var i, o;
                return i = [t],
                e(t, "form") && (i = n(t.elements)),
                o = [],
                i.forEach(function(t) {
                    if (t.name)
                        return e(t, "select") ? n(t.options).forEach(function(e) {
                            if (e.selected)
                                return o.push({
                                    name: t.name,
                                    value: e.value
                                })
                        }) : t.checked || -1 === ["radio", "checkbox", "submit"].indexOf(t.type) ? o.push({
                            name: t.name,
                            value: t.value
                        }) : void 0
                }),
                r && o.push(r),
                o.map(function(e) {
                    return null != e.name ? encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value) : e
                }).join("&")
            }
            ,
            t.formElements = function(t, r) {
                return e(t, "form") ? n(t.elements).filter(function(t) {
                    return e(t, r)
                }) : n(t.querySelectorAll(r))
            }
        }
        .call(this),
        function() {
            var e, n, r;
            n = t.fire,
            r = t.stopEverything,
            t.handleConfirm = function(t) {
                if (!e(this))
                    return r(t)
            }
            ,
            e = function(e) {
                var t, r, i;
                if (!(i = e.getAttribute("data-confirm")))
                    return !0;
                if (t = !1,
                n(e, "confirm")) {
                    try {
                        t = confirm(i)
                    } catch (e) {}
                    r = n(e, "confirm:complete", [t])
                }
                return t && r
            }
        }
        .call(this),
        function() {
            var e, n, r, i, o, a, s, u, l, c, d;
            l = t.matches,
            u = t.getData,
            c = t.setData,
            d = t.stopEverything,
            s = t.formElements,
            t.handleDisabledElement = function(e) {
                var t;
                if (t = this,
                t.disabled)
                    return d(e)
            }
            ,
            t.enableElement = function(e) {
                var n;
                return n = e instanceof Event ? e.target : e,
                l(n, t.linkDisableSelector) ? a(n) : l(n, t.buttonDisableSelector) || l(n, t.formEnableSelector) ? i(n) : l(n, t.formSubmitSelector) ? o(n) : void 0
            }
            ,
            t.disableElement = function(i) {
                var o;
                return o = i instanceof Event ? i.target : i,
                l(o, t.linkDisableSelector) ? r(o) : l(o, t.buttonDisableSelector) || l(o, t.formDisableSelector) ? e(o) : l(o, t.formSubmitSelector) ? n(o) : void 0
            }
            ,
            r = function(e) {
                var t;
                return t = e.getAttribute("data-disable-with"),
                null != t && (c(e, "ujs:enable-with", e.innerHTML),
                e.innerHTML = t),
                e.addEventListener("click", d),
                c(e, "ujs:disabled", !0)
            }
            ,
            a = function(e) {
                var t;
                return t = u(e, "ujs:enable-with"),
                null != t && (e.innerHTML = t,
                c(e, "ujs:enable-with", null)),
                e.removeEventListener("click", d),
                c(e, "ujs:disabled", null)
            }
            ,
            n = function(n) {
                return s(n, t.formDisableSelector).forEach(e)
            }
            ,
            e = function(e) {
                var t;
                return t = e.getAttribute("data-disable-with"),
                null != t && (l(e, "button") ? (c(e, "ujs:enable-with", e.innerHTML),
                e.innerHTML = t) : (c(e, "ujs:enable-with", e.value),
                e.value = t)),
                e.disabled = !0,
                c(e, "ujs:disabled", !0)
            }
            ,
            o = function(e) {
                return s(e, t.formEnableSelector).forEach(i)
            }
            ,
            i = function(e) {
                var t;
                return t = u(e, "ujs:enable-with"),
                null != t && (l(e, "button") ? e.innerHTML = t : e.value = t,
                c(e, "ujs:enable-with", null)),
                e.disabled = !1,
                c(e, "ujs:disabled", null)
            }
        }
        .call(this),
        function() {
            var e;
            e = t.stopEverything,
            t.handleMethod = function(n) {
                var r, i, o, a, s, u, l;
                if (u = this,
                l = u.getAttribute("data-method"))
                    return s = t.href(u),
                    i = t.csrfToken(),
                    r = t.csrfParam(),
                    o = document.createElement("form"),
                    a = "<input name='_method' value='" + l + "' type='hidden' />",
                    null == r || null == i || t.isCrossDomain(s) || (a += "<input name='" + r + "' value='" + i + "' type='hidden' />"),
                    a += '<input type="submit" />',
                    o.method = "post",
                    o.action = s,
                    o.target = u.target,
                    o.innerHTML = a,
                    o.style.display = "none",
                    document.body.appendChild(o),
                    o.querySelector('[type="submit"]').click(),
                    e(n)
            }
        }
        .call(this),
        function() {
            var e, n, r, i, o, a, s, u, l, c = [].slice;
            a = t.matches,
            r = t.getData,
            u = t.setData,
            n = t.fire,
            l = t.stopEverything,
            e = t.ajax,
            i = t.isCrossDomain,
            s = t.serializeElement,
            o = function(e) {
                var t;
                return null != (t = e.getAttribute("data-remote")) && "false" !== t
            }
            ,
            t.handleRemote = function(d) {
                var f, p, h, m, g, y, v;
                return m = this,
                !o(m) || (n(m, "ajax:before") ? (v = m.getAttribute("data-with-credentials"),
                h = m.getAttribute("data-type") || "script",
                a(m, t.formSubmitSelector) ? (f = r(m, "ujs:submit-button"),
                g = r(m, "ujs:submit-button-formmethod") || m.method,
                y = r(m, "ujs:submit-button-formaction") || m.getAttribute("action") || location.href,
                "GET" === g.toUpperCase() && (y = y.replace(/\?.*$/, "")),
                "multipart/form-data" === m.enctype ? (p = new FormData(m),
                null != f && p.append(f.name, f.value)) : p = s(m, f),
                u(m, "ujs:submit-button", null),
                u(m, "ujs:submit-button-formmethod", null),
                u(m, "ujs:submit-button-formaction", null)) : a(m, t.buttonClickSelector) || a(m, t.inputChangeSelector) ? (g = m.getAttribute("data-method"),
                y = m.getAttribute("data-url"),
                p = s(m, m.getAttribute("data-params"))) : (g = m.getAttribute("data-method"),
                y = t.href(m),
                p = m.getAttribute("data-params")),
                e({
                    type: g || "GET",
                    url: y,
                    data: p,
                    dataType: h,
                    beforeSend: function(e, t) {
                        return n(m, "ajax:beforeSend", [e, t]) ? n(m, "ajax:send", [e]) : (n(m, "ajax:stopped"),
                        e.abort())
                    },
                    success: function() {
                        var e;
                        return e = 1 <= arguments.length ? c.call(arguments, 0) : [],
                        n(m, "ajax:success", e)
                    },
                    error: function() {
                        var e;
                        return e = 1 <= arguments.length ? c.call(arguments, 0) : [],
                        n(m, "ajax:error", e)
                    },
                    complete: function() {
                        var e;
                        return e = 1 <= arguments.length ? c.call(arguments, 0) : [],
                        n(m, "ajax:complete", e)
                    },
                    crossDomain: i(y),
                    withCredentials: null != v && "false" !== v
                }),
                l(d)) : (n(m, "ajax:stopped"),
                !1))
            }
            ,
            t.formSubmitButtonClick = function() {
                var e, t;
                if (e = this,
                t = e.form)
                    return e.name && u(t, "ujs:submit-button", {
                        name: e.name,
                        value: e.value
                    }),
                    u(t, "ujs:formnovalidate-button", e.formNoValidate),
                    u(t, "ujs:submit-button-formaction", e.getAttribute("formaction")),
                    u(t, "ujs:submit-button-formmethod", e.getAttribute("formmethod"))
            }
            ,
            t.handleMetaClick = function(e) {
                var t, n, r;
                if (n = this,
                r = (n.getAttribute("data-method") || "GET").toUpperCase(),
                t = n.getAttribute("data-params"),
                (e.metaKey || e.ctrlKey) && "GET" === r && !t)
                    return e.stopImmediatePropagation()
            }
        }
        .call(this),
        function() {
            var e, n, r, i, o, a, s, u, l, c, d, f, p, h;
            a = t.fire,
            r = t.delegate,
            u = t.getData,
            e = t.$,
            h = t.refreshCSRFTokens,
            n = t.CSRFProtection,
            o = t.enableElement,
            i = t.disableElement,
            c = t.handleDisabledElement,
            l = t.handleConfirm,
            p = t.handleRemote,
            s = t.formSubmitButtonClick,
            d = t.handleMetaClick,
            f = t.handleMethod,
            "undefined" == typeof jQuery || null === jQuery || null == jQuery.ajax || jQuery.rails || (jQuery.rails = t,
            jQuery.ajaxPrefilter(function(e, t, r) {
                if (!e.crossDomain)
                    return n(r)
            })),
            t.start = function() {
                if (window._rails_loaded)
                    throw new Error("rails-ujs has already been loaded!");
                return window.addEventListener("pageshow", function() {
                    return e(t.formEnableSelector).forEach(function(e) {
                        if (u(e, "ujs:disabled"))
                            return o(e)
                    }),
                    e(t.linkDisableSelector).forEach(function(e) {
                        if (u(e, "ujs:disabled"))
                            return o(e)
                    })
                }),
                r(document, t.linkDisableSelector, "ajax:complete", o),
                r(document, t.linkDisableSelector, "ajax:stopped", o),
                r(document, t.buttonDisableSelector, "ajax:complete", o),
                r(document, t.buttonDisableSelector, "ajax:stopped", o),
                r(document, t.linkClickSelector, "click", c),
                r(document, t.linkClickSelector, "click", l),
                r(document, t.linkClickSelector, "click", d),
                r(document, t.linkClickSelector, "click", i),
                r(document, t.linkClickSelector, "click", p),
                r(document, t.linkClickSelector, "click", f),
                r(document, t.buttonClickSelector, "click", c),
                r(document, t.buttonClickSelector, "click", l),
                r(document, t.buttonClickSelector, "click", i),
                r(document, t.buttonClickSelector, "click", p),
                r(document, t.inputChangeSelector, "change", c),
                r(document, t.inputChangeSelector, "change", l),
                r(document, t.inputChangeSelector, "change", p),
                r(document, t.formSubmitSelector, "submit", c),
                r(document, t.formSubmitSelector, "submit", l),
                r(document, t.formSubmitSelector, "submit", p),
                r(document, t.formSubmitSelector, "submit", function(e) {
                    return setTimeout(function() {
                        return i(e)
                    }, 13)
                }),
                r(document, t.formSubmitSelector, "ajax:send", i),
                r(document, t.formSubmitSelector, "ajax:complete", o),
                r(document, t.formInputClickSelector, "click", c),
                r(document, t.formInputClickSelector, "click", l),
                r(document, t.formInputClickSelector, "click", s),
                document.addEventListener("DOMContentLoaded", h),
                window._rails_loaded = !0
            }
            ,
            window.Rails === t && a(document, "rails:attachBindings") && t.start()
        }
        .call(this)
    }
    ).call(this),
    "object" == typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd && define(t)
}
).call(this),
function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = !!e && "length"in e && e.length
          , n = pe.type(e);
        return "function" !== n && !pe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    function r(e, t, n) {
        if (pe.isFunction(t))
            return pe.grep(e, function(e, r) {
                return !!t.call(e, r, e) !== n
            });
        if (t.nodeType)
            return pe.grep(e, function(e) {
                return e === t !== n
            });
        if ("string" == typeof t) {
            if (Ce.test(t))
                return pe.filter(t, e, n);
            t = pe.filter(t, e)
        }
        return pe.grep(e, function(e) {
            return pe.inArray(e, t) > -1 !== n
        })
    }
    function i(e, t) {
        do {
            e = e[t]
        } while (e && 1 !== e.nodeType);
        return e
    }
    function o(e) {
        var t = {};
        return pe.each(e.match(Ae) || [], function(e, n) {
            t[n] = !0
        }),
        t
    }
    function a() {
        re.addEventListener ? (re.removeEventListener("DOMContentLoaded", s),
        e.removeEventListener("load", s)) : (re.detachEvent("onreadystatechange", s),
        e.detachEvent("onload", s))
    }
    function s() {
        (re.addEventListener || "load" === e.event.type || "complete" === re.readyState) && (a(),
        pe.ready())
    }
    function u(e, t, n) {
        if (n === undefined && 1 === e.nodeType) {
            var r = "data-" + t.replace(qe, "-$1").toLowerCase();
            if ("string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : He.test(n) ? pe.parseJSON(n) : n)
                } catch (e) {}
                pe.data(e, t, n)
            } else
                n = undefined
        }
        return n
    }
    function l(e) {
        var t;
        for (t in e)
            if (("data" !== t || !pe.isEmptyObject(e[t])) && "toJSON" !== t)
                return !1;
        return !0
    }
    function c(e, t, n, r) {
        if (Le(e)) {
            var i, o, a = pe.expando, s = e.nodeType, u = s ? pe.cache : e, l = s ? e[a] : e[a] && a;
            if (l && u[l] && (r || u[l].data) || n !== undefined || "string" != typeof t)
                return l || (l = s ? e[a] = ne.pop() || pe.guid++ : a),
                u[l] || (u[l] = s ? {} : {
                    toJSON: pe.noop
                }),
                "object" != typeof t && "function" != typeof t || (r ? u[l] = pe.extend(u[l], t) : u[l].data = pe.extend(u[l].data, t)),
                o = u[l],
                r || (o.data || (o.data = {}),
                o = o.data),
                n !== undefined && (o[pe.camelCase(t)] = n),
                "string" == typeof t ? null == (i = o[t]) && (i = o[pe.camelCase(t)]) : i = o,
                i
        }
    }
    function d(e, t, n) {
        if (Le(e)) {
            var r, i, o = e.nodeType, a = o ? pe.cache : e, s = o ? e[pe.expando] : pe.expando;
            if (a[s]) {
                if (t && (r = n ? a[s] : a[s].data)) {
                    pe.isArray(t) ? t = t.concat(pe.map(t, pe.camelCase)) : t in r ? t = [t] : (t = pe.camelCase(t),
                    t = t in r ? [t] : t.split(" ")),
                    i = t.length;
                    for (; i--; )
                        delete r[t[i]];
                    if (n ? !l(r) : !pe.isEmptyObject(r))
                        return
                }
                (n || (delete a[s].data,
                l(a[s]))) && (o ? pe.cleanData([e], !0) : de.deleteExpando || a != a.window ? delete a[s] : a[s] = undefined)
            }
        }
    }
    function f(e, t, n, r) {
        var i, o = 1, a = 20, s = r ? function() {
            return r.cur()
        }
        : function() {
            return pe.css(e, t, "")
        }
        , u = s(), l = n && n[3] || (pe.cssNumber[t] ? "" : "px"), c = (pe.cssNumber[t] || "px" !== l && +u) && Me.exec(pe.css(e, t));
        if (c && c[3] !== l) {
            l = l || c[3],
            n = n || [],
            c = +u || 1;
            do {
                o = o || ".5",
                c /= o,
                pe.style(e, t, c + l)
            } while (o !== (o = s() / u) && 1 !== o && --a)
        }
        return n && (c = +c || +u || 0,
        i = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
        r && (r.unit = l,
        r.start = c,
        r.end = i)),
        i
    }
    function p(e) {
        var t = $e.split("|")
          , n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length; )
                n.createElement(t.pop());
        return n
    }
    function h(e, t) {
        var n, r, i = 0, o = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : undefined;
        if (!o)
            for (o = [],
            n = e.childNodes || e; null != (r = n[i]); i++)
                !t || pe.nodeName(r, t) ? o.push(r) : pe.merge(o, h(r, t));
        return t === undefined || t && pe.nodeName(e, t) ? pe.merge([e], o) : o
    }
    function m(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++)
            pe._data(n, "globalEval", !t || pe._data(t[r], "globalEval"))
    }
    function g(e) {
        Oe.test(e.type) && (e.defaultChecked = e.checked)
    }
    function y(e, t, n, r, i) {
        for (var o, a, s, u, l, c, d, f = e.length, y = p(t), v = [], b = 0; b < f; b++)
            if ((a = e[b]) || 0 === a)
                if ("object" === pe.type(a))
                    pe.merge(v, a.nodeType ? [a] : a);
                else if (Xe.test(a)) {
                    for (u = u || y.appendChild(t.createElement("div")),
                    l = (Ie.exec(a) || ["", ""])[1].toLowerCase(),
                    d = ze[l] || ze._default,
                    u.innerHTML = d[1] + pe.htmlPrefilter(a) + d[2],
                    o = d[0]; o--; )
                        u = u.lastChild;
                    if (!de.leadingWhitespace && Be.test(a) && v.push(t.createTextNode(Be.exec(a)[0])),
                    !de.tbody)
                        for (a = "table" !== l || Ue.test(a) ? "<table>" !== d[1] || Ue.test(a) ? 0 : u : u.firstChild,
                        o = a && a.childNodes.length; o--; )
                            pe.nodeName(c = a.childNodes[o], "tbody") && !c.childNodes.length && a.removeChild(c);
                    for (pe.merge(v, u.childNodes),
                    u.textContent = ""; u.firstChild; )
                        u.removeChild(u.firstChild);
                    u = y.lastChild
                } else
                    v.push(t.createTextNode(a));
        for (u && y.removeChild(u),
        de.appendChecked || pe.grep(h(v, "input"), g),
        b = 0; a = v[b++]; )
            if (r && pe.inArray(a, r) > -1)
                i && i.push(a);
            else if (s = pe.contains(a.ownerDocument, a),
            u = h(y.appendChild(a), "script"),
            s && m(u),
            n)
                for (o = 0; a = u[o++]; )
                    We.test(a.type || "") && n.push(a);
        return u = null,
        y
    }
    function v() {
        return !0
    }
    function b() {
        return !1
    }
    function x() {
        try {
            return re.activeElement
        } catch (e) {}
    }
    function w(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            "string" != typeof n && (r = r || n,
            n = undefined);
            for (s in t)
                w(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n,
        r = n = undefined) : null == i && ("string" == typeof n ? (i = r,
        r = undefined) : (i = r,
        r = n,
        n = undefined)),
        !1 === i)
            i = b;
        else if (!i)
            return e;
        return 1 === o && (a = i,
        i = function(e) {
            return pe().off(e),
            a.apply(this, arguments)
        }
        ,
        i.guid = a.guid || (a.guid = pe.guid++)),
        e.each(function() {
            pe.event.add(this, t, i, r, n)
        })
    }
    function S(e, t) {
        return pe.nodeName(e, "table") && pe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function C(e) {
        return e.type = (null !== pe.find.attr(e, "type")) + "/" + e.type,
        e
    }
    function T(e) {
        var t = rt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
        e
    }
    function E(e, t) {
        if (1 === t.nodeType && pe.hasData(e)) {
            var n, r, i, o = pe._data(e), a = pe._data(t, o), s = o.events;
            if (s) {
                delete a.handle,
                a.events = {};
                for (n in s)
                    for (r = 0,
                    i = s[n].length; r < i; r++)
                        pe.event.add(t, n, s[n][r])
            }
            a.data && (a.data = pe.extend({}, a.data))
        }
    }
    function k(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(),
            !de.noCloneEvent && t[pe.expando]) {
                i = pe._data(t);
                for (r in i.events)
                    pe.removeEvent(t, r, i.handle);
                t.removeAttribute(pe.expando)
            }
            "script" === n && t.text !== e.text ? (C(t).text = e.text,
            T(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML),
            de.html5Clone && e.innerHTML && !pe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Oe.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
            t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }
    }
    function j(e, t, n, r) {
        t = oe.apply([], t);
        var i, o, a, s, u, l, c = 0, d = e.length, f = d - 1, p = t[0], m = pe.isFunction(p);
        if (m || d > 1 && "string" == typeof p && !de.checkClone && nt.test(p))
            return e.each(function(i) {
                var o = e.eq(i);
                m && (t[0] = p.call(this, i, o.html())),
                j(o, t, n, r)
            });
        if (d && (l = y(t, e[0].ownerDocument, !1, e, r),
        i = l.firstChild,
        1 === l.childNodes.length && (l = i),
        i || r)) {
            for (s = pe.map(h(l, "script"), C),
            a = s.length; c < d; c++)
                o = l,
                c !== f && (o = pe.clone(o, !0, !0),
                a && pe.merge(s, h(o, "script"))),
                n.call(e[c], o, c);
            if (a)
                for (u = s[s.length - 1].ownerDocument,
                pe.map(s, T),
                c = 0; c < a; c++)
                    o = s[c],
                    We.test(o.type || "") && !pe._data(o, "globalEval") && pe.contains(u, o) && (o.src ? pe._evalUrl && pe._evalUrl(o.src) : pe.globalEval((o.text || o.textContent || o.innerHTML || "").replace(it, "")));
            l = i = null
        }
        return e
    }
    function A(e, t, n) {
        for (var r, i = t ? pe.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
            n || 1 !== r.nodeType || pe.cleanData(h(r)),
            r.parentNode && (n && pe.contains(r.ownerDocument, r) && m(h(r, "script")),
            r.parentNode.removeChild(r));
        return e
    }
    function N(e, t) {
        var n = pe(t.createElement(e)).appendTo(t.body)
          , r = pe.css(n[0], "display");
        return n.detach(),
        r
    }
    function D(e) {
        var t = re
          , n = ut[e];
        return n || (n = N(e, t),
        "none" !== n && n || (st = (st || pe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),
        t = (st[0].contentWindow || st[0].contentDocument).document,
        t.write(),
        t.close(),
        n = N(e, t),
        st.detach()),
        ut[e] = n),
        n
    }
    function L(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }
    function H(e) {
        if (e in Ct)
            return e;
        for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = St.length; n--; )
            if ((e = St[n] + t)in Ct)
                return e
    }
    function q(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; a < s; a++)
            r = e[a],
            r.style && (o[a] = pe._data(r, "olddisplay"),
            n = r.style.display,
            t ? (o[a] || "none" !== n || (r.style.display = ""),
            "" === r.style.display && Pe(r) && (o[a] = pe._data(r, "olddisplay", D(r.nodeName)))) : (i = Pe(r),
            (n && "none" !== n || !i) && pe._data(r, "olddisplay", i ? n : pe.css(r, "display"))));
        for (a = 0; a < s; a++)
            r = e[a],
            r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }
    function R(e, t, n) {
        var r = bt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }
    function M(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2)
            "margin" === n && (a += pe.css(e, n + Fe[o], !0, i)),
            r ? ("content" === n && (a -= pe.css(e, "padding" + Fe[o], !0, i)),
            "margin" !== n && (a -= pe.css(e, "border" + Fe[o] + "Width", !0, i))) : (a += pe.css(e, "padding" + Fe[o], !0, i),
            "padding" !== n && (a += pe.css(e, "border" + Fe[o] + "Width", !0, i)));
        return a
    }
    function F(e, t, n) {
        var r = !0
          , i = "width" === t ? e.offsetWidth : e.offsetHeight
          , o = pt(e)
          , a = de.boxSizing && "border-box" === pe.css(e, "boxSizing", !1, o);
        if (i <= 0 || null == i) {
            if (i = ht(e, t, o),
            (i < 0 || null == i) && (i = e.style[t]),
            ct.test(i))
                return i;
            r = a && (de.boxSizingReliable() || i === e.style[t]),
            i = parseFloat(i) || 0
        }
        return i + M(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }
    function P(e, t, n, r, i) {
        return new P.prototype.init(e,t,n,r,i)
    }
    function _() {
        return e.setTimeout(function() {
            Tt = undefined
        }),
        Tt = pe.now()
    }
    function O(e, t) {
        var n, r = {
            height: e
        }, i = 0;
        for (t = t ? 1 : 0; i < 4; i += 2 - t)
            n = Fe[i],
            r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e),
        r
    }
    function I(e, t, n) {
        for (var r, i = ($.tweeners[t] || []).concat($.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e))
                return r
    }
    function W(e, t, n) {
        var r, i, o, a, s, u, l, c = this, d = {}, f = e.style, p = e.nodeType && Pe(e), h = pe._data(e, "fxshow");
        n.queue || (s = pe._queueHooks(e, "fx"),
        null == s.unqueued && (s.unqueued = 0,
        u = s.empty.fire,
        s.empty.fire = function() {
            s.unqueued || u()
        }
        ),
        s.unqueued++,
        c.always(function() {
            c.always(function() {
                s.unqueued--,
                pe.queue(e, "fx").length || s.empty.fire()
            })
        })),
        1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY],
        l = pe.css(e, "display"),
        "inline" === ("none" === l ? pe._data(e, "olddisplay") || D(e.nodeName) : l) && "none" === pe.css(e, "float") && (de.inlineBlockNeedsLayout && "inline" !== D(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")),
        n.overflow && (f.overflow = "hidden",
        de.shrinkWrapBlocks() || c.always(function() {
            f.overflow = n.overflow[0],
            f.overflowX = n.overflow[1],
            f.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r],
            kt.exec(i)) {
                if (delete t[r],
                o = o || "toggle" === i,
                i === (p ? "hide" : "show")) {
                    if ("show" !== i || !h || h[r] === undefined)
                        continue;
                    p = !0
                }
                d[r] = h && h[r] || pe.style(e, r)
            } else
                l = undefined;
        if (pe.isEmptyObject(d))
            "inline" === ("none" === l ? D(e.nodeName) : l) && (f.display = l);
        else {
            h ? "hidden"in h && (p = h.hidden) : h = pe._data(e, "fxshow", {}),
            o && (h.hidden = !p),
            p ? pe(e).show() : c.done(function() {
                pe(e).hide()
            }),
            c.done(function() {
                var t;
                pe._removeData(e, "fxshow");
                for (t in d)
                    pe.style(e, t, d[t])
            });
            for (r in d)
                a = I(p ? h[r] : 0, r, c),
                r in h || (h[r] = a.start,
                p && (a.end = a.start,
                a.start = "width" === r || "height" === r ? 1 : 0))
        }
    }
    function B(e, t) {
        var n, r, i, o, a;
        for (n in e)
            if (r = pe.camelCase(n),
            i = t[r],
            o = e[n],
            pe.isArray(o) && (i = o[1],
            o = e[n] = o[0]),
            n !== r && (e[r] = o,
            delete e[n]),
            (a = pe.cssHooks[r]) && "expand"in a) {
                o = a.expand(o),
                delete e[r];
                for (n in o)
                    n in e || (e[n] = o[n],
                    t[n] = i)
            } else
                t[r] = i
    }
    function $(e, t, n) {
        var r, i, o = 0, a = $.prefilters.length, s = pe.Deferred().always(function() {
            delete u.elem
        }), u = function() {
            if (i)
                return !1;
            for (var t = Tt || _(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; a < u; a++)
                l.tweens[a].run(o);
            return s.notifyWith(e, [l, o, n]),
            o < 1 && u ? n : (s.resolveWith(e, [l]),
            !1)
        }, l = s.promise({
            elem: e,
            props: pe.extend({}, t),
            opts: pe.extend(!0, {
                specialEasing: {},
                easing: pe.easing._default
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: Tt || _(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = pe.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(r),
                r
            },
            stop: function(t) {
                var n = 0
                  , r = t ? l.tweens.length : 0;
                if (i)
                    return this;
                for (i = !0; n < r; n++)
                    l.tweens[n].run(1);
                return t ? (s.notifyWith(e, [l, 1, 0]),
                s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]),
                this
            }
        }), c = l.props;
        for (B(c, l.opts.specialEasing); o < a; o++)
            if (r = $.prefilters[o].call(l, e, c, l.opts))
                return pe.isFunction(r.stop) && (pe._queueHooks(l.elem, l.opts.queue).stop = pe.proxy(r.stop, r)),
                r;
        return pe.map(c, I, l),
        pe.isFunction(l.opts.start) && l.opts.start.call(e, l),
        pe.fx.timer(pe.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })),
        l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }
    function z(e) {
        return pe.attr(e, "class") || ""
    }
    function X(e) {
        return function(t, n) {
            "string" != typeof t && (n = t,
            t = "*");
            var r, i = 0, o = t.toLowerCase().match(Ae) || [];
            if (pe.isFunction(n))
                for (; r = o[i++]; )
                    "+" === r.charAt(0) ? (r = r.slice(1) || "*",
                    (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function U(e, t, n, r) {
        function i(s) {
            var u;
            return o[s] = !0,
            pe.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l),
                i(l),
                !1)
            }),
            u
        }
        var o = {}
          , a = e === Yt;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }
    function G(e, t) {
        var n, r, i = pe.ajaxSettings.flatOptions || {};
        for (r in t)
            t[r] !== undefined && ((i[r] ? e : n || (n = {}))[r] = t[r]);
        return n && pe.extend(!0, e, n),
        e
    }
    function V(e, t, n) {
        for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0]; )
            u.shift(),
            i === undefined && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)
            for (a in s)
                if (s[a] && s[a].test(i)) {
                    u.unshift(a);
                    break
                }
        if (u[0]in n)
            o = u[0];
        else {
            for (a in n) {
                if (!u[0] || e.converters[a + " " + u[0]]) {
                    o = a;
                    break
                }
                r || (r = a)
            }
            o = o || r
        }
        if (o)
            return o !== u[0] && u.unshift(o),
            n[o]
    }
    function J(e, t, n, r) {
        var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters)
                l[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o; )
            if (e.responseFields[o] && (n[e.responseFields[o]] = t),
            !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
            u = o,
            o = c.shift())
                if ("*" === o)
                    o = u;
                else if ("*" !== u && u !== o) {
                    if (!(a = l[u + " " + o] || l["* " + o]))
                        for (i in l)
                            if (s = i.split(" "),
                            s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0],
                                c.unshift(s[1]));
                                break
                            }
                    if (!0 !== a)
                        if (a && e["throws"])
                            t = a(t);
                        else
                            try {
                                t = a(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: a ? e : "No conversion from " + u + " to " + o
                                }
                            }
                }
        return {
            state: "success",
            data: t
        }
    }
    function Q(e) {
        return e.style && e.style.display || pe.css(e, "display")
    }
    function Y(e) {
        if (!pe.contains(e.ownerDocument || re, e))
            return !0;
        for (; e && 1 === e.nodeType; ) {
            if ("none" === Q(e) || "hidden" === e.type)
                return !0;
            e = e.parentNode
        }
        return !1
    }
    function K(e, t, n, r) {
        var i;
        if (pe.isArray(t))
            pe.each(t, function(t, i) {
                n || nn.test(e) ? r(e, i) : K(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
            });
        else if (n || "object" !== pe.type(t))
            r(e, t);
        else
            for (i in t)
                K(e + "[" + i + "]", t[i], n, r)
    }
    function Z() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    }
    function ee() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }
    function te(e) {
        return pe.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }
    var ne = []
      , re = e.document
      , ie = ne.slice
      , oe = ne.concat
      , ae = ne.push
      , se = ne.indexOf
      , ue = {}
      , le = ue.toString
      , ce = ue.hasOwnProperty
      , de = {}
      , fe = "1.12.4"
      , pe = function(e, t) {
        return new pe.fn.init(e,t)
    }
      , he = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , me = /^-ms-/
      , ge = /-([\da-z])/gi
      , ye = function(e, t) {
        return t.toUpperCase()
    };
    pe.fn = pe.prototype = {
        jquery: fe,
        constructor: pe,
        selector: "",
        length: 0,
        toArray: function() {
            return ie.call(this)
        },
        get: function(e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : ie.call(this)
        },
        pushStack: function(e) {
            var t = pe.merge(this.constructor(), e);
            return t.prevObject = this,
            t.context = this.context,
            t
        },
        each: function(e) {
            return pe.each(this, e)
        },
        map: function(e) {
            return this.pushStack(pe.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(ie.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length
              , n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: ae,
        sort: ne.sort,
        splice: ne.splice
    },
    pe.extend = pe.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof a && (l = a,
        a = arguments[s] || {},
        s++),
        "object" == typeof a || pe.isFunction(a) || (a = {}),
        s === u && (a = this,
        s--); s < u; s++)
            if (null != (i = arguments[s]))
                for (r in i)
                    e = a[r],
                    n = i[r],
                    a !== n && (l && n && (pe.isPlainObject(n) || (t = pe.isArray(n))) ? (t ? (t = !1,
                    o = e && pe.isArray(e) ? e : []) : o = e && pe.isPlainObject(e) ? e : {},
                    a[r] = pe.extend(l, o, n)) : n !== undefined && (a[r] = n));
        return a
    }
    ,
    pe.extend({
        expando: "jQuery" + (fe + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === pe.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === pe.type(e)
        }
        ,
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !pe.isArray(e) && t - parseFloat(t) + 1 >= 0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== pe.type(e) || e.nodeType || pe.isWindow(e))
                return !1;
            try {
                if (e.constructor && !ce.call(e, "constructor") && !ce.call(e.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (e) {
                return !1
            }
            if (!de.ownFirst)
                for (t in e)
                    return ce.call(e, t);
            for (t in e)
                ;
            return t === undefined || ce.call(e, t)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ue[le.call(e)] || "object" : typeof e
        },
        globalEval: function(t) {
            t && pe.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            }
            )(t)
        },
        camelCase: function(e) {
            return e.replace(me, "ms-").replace(ge, ye)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var r, i = 0;
            if (n(e))
                for (r = e.length; i < r && !1 !== t.call(e[i], i, e[i]); i++)
                    ;
            else
                for (i in e)
                    if (!1 === t.call(e[i], i, e[i]))
                        break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(he, "")
        },
        makeArray: function(e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? pe.merge(r, "string" == typeof e ? [e] : e) : ae.call(r, e)),
            r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (se)
                    return se.call(t, e, n);
                for (r = t.length,
                n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++)
                    if (n in t && t[n] === e)
                        return n
            }
            return -1
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; )
                e[i++] = t[r++];
            if (n !== n)
                for (; t[r] !== undefined; )
                    e[i++] = t[r++];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
                !t(e[i], i) !== a && r.push(e[i]);
            return r
        },
        map: function(e, t, r) {
            var i, o, a = 0, s = [];
            if (n(e))
                for (i = e.length; a < i; a++)
                    null != (o = t(e[a], a, r)) && s.push(o);
            else
                for (a in e)
                    null != (o = t(e[a], a, r)) && s.push(o);
            return oe.apply([], s)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return "string" == typeof t && (i = e[t],
            t = e,
            e = i),
            pe.isFunction(e) ? (n = ie.call(arguments, 2),
            r = function() {
                return e.apply(t || this, n.concat(ie.call(arguments)))
            }
            ,
            r.guid = e.guid = e.guid || pe.guid++,
            r) : undefined
        },
        now: function() {
            return +new Date
        },
        support: de
    }),
    "function" == typeof Symbol && (pe.fn[Symbol.iterator] = ne[Symbol.iterator]),
    pe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        ue["[object " + t + "]"] = t.toLowerCase()
    });
    var ve = function(e) {
        function t(e, t, n, r) {
            var i, o, a, s, u, l, d, p, h = t && t.ownerDocument, m = t ? t.nodeType : 9;
            if (n = n || [],
            "string" != typeof e || !e || 1 !== m && 9 !== m && 11 !== m)
                return n;
            if (!r && ((t ? t.ownerDocument || t : I) !== H && L(t),
            t = t || H,
            R)) {
                if (11 !== m && (l = ye.exec(e)))
                    if (i = l[1]) {
                        if (9 === m) {
                            if (!(a = t.getElementById(i)))
                                return n;
                            if (a.id === i)
                                return n.push(a),
                                n
                        } else if (h && (a = h.getElementById(i)) && _(t, a) && a.id === i)
                            return n.push(a),
                            n
                    } else {
                        if (l[2])
                            return K.apply(n, t.getElementsByTagName(e)),
                            n;
                        if ((i = l[3]) && w.getElementsByClassName && t.getElementsByClassName)
                            return K.apply(n, t.getElementsByClassName(i)),
                            n
                    }
                if (w.qsa && !X[e + " "] && (!M || !M.test(e))) {
                    if (1 !== m)
                        h = t,
                        p = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(be, "\\$&") : t.setAttribute("id", s = O),
                        d = E(e),
                        o = d.length,
                        u = fe.test(s) ? "#" + s : "[id='" + s + "']"; o--; )
                            d[o] = u + " " + f(d[o]);
                        p = d.join(","),
                        h = ve.test(e) && c(t.parentNode) || t
                    }
                    if (p)
                        try {
                            return K.apply(n, h.querySelectorAll(p)),
                            n
                        } catch (e) {} finally {
                            s === O && t.removeAttribute("id")
                        }
                }
            }
            return j(e.replace(se, "$1"), t, n, r)
        }
        function n() {
            function e(n, r) {
                return t.push(n + " ") > S.cacheLength && delete e[t.shift()],
                e[n + " "] = r
            }
            var t = [];
            return e
        }
        function r(e) {
            return e[O] = !0,
            e
        }
        function i(e) {
            var t = H.createElement("div");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function o(e, t) {
            for (var n = e.split("|"), r = n.length; r--; )
                S.attrHandle[n[r]] = t
        }
        function a(e, t) {
            var n = t && e
              , r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || G) - (~e.sourceIndex || G);
            if (r)
                return r;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function s(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }
        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function l(e) {
            return r(function(t) {
                return t = +t,
                r(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--; )
                        n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }
        function c(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        function d() {}
        function f(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++)
                r += e[t].value;
            return r
        }
        function p(e, t, n) {
            var r = t.dir
              , i = n && "parentNode" === r
              , o = B++;
            return t.first ? function(t, n, o) {
                for (; t = t[r]; )
                    if (1 === t.nodeType || i)
                        return e(t, n, o)
            }
            : function(t, n, a) {
                var s, u, l, c = [W, o];
                if (a) {
                    for (; t = t[r]; )
                        if ((1 === t.nodeType || i) && e(t, n, a))
                            return !0
                } else
                    for (; t = t[r]; )
                        if (1 === t.nodeType || i) {
                            if (l = t[O] || (t[O] = {}),
                            u = l[t.uniqueID] || (l[t.uniqueID] = {}),
                            (s = u[r]) && s[0] === W && s[1] === o)
                                return c[2] = s[2];
                            if (u[r] = c,
                            c[2] = e(t, n, a))
                                return !0
                        }
            }
        }
        function h(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--; )
                    if (!e[i](t, n, r))
                        return !1;
                return !0
            }
            : e[0]
        }
        function m(e, n, r) {
            for (var i = 0, o = n.length; i < o; i++)
                t(e, n[i], r);
            return r
        }
        function g(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
                (o = e[s]) && (n && !n(o, r, i) || (a.push(o),
                l && t.push(s)));
            return a
        }
        function y(e, t, n, i, o, a) {
            return i && !i[O] && (i = y(i)),
            o && !o[O] && (o = y(o, a)),
            r(function(r, a, s, u) {
                var l, c, d, f = [], p = [], h = a.length, y = r || m(t || "*", s.nodeType ? [s] : s, []), v = !e || !r && t ? y : g(y, f, e, s, u), b = n ? o || (r ? e : h || i) ? [] : a : v;
                if (n && n(v, b, s, u),
                i)
                    for (l = g(b, p),
                    i(l, [], s, u),
                    c = l.length; c--; )
                        (d = l[c]) && (b[p[c]] = !(v[p[c]] = d));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (l = [],
                            c = b.length; c--; )
                                (d = b[c]) && l.push(v[c] = d);
                            o(null, b = [], l, u)
                        }
                        for (c = b.length; c--; )
                            (d = b[c]) && (l = o ? ee(r, d) : f[c]) > -1 && (r[l] = !(a[l] = d))
                    }
                } else
                    b = g(b === a ? b.splice(h, b.length) : b),
                    o ? o(null, a, b, u) : K.apply(a, b)
            })
        }
        function v(e) {
            for (var t, n, r, i = e.length, o = S.relative[e[0].type], a = o || S.relative[" "], s = o ? 1 : 0, u = p(function(e) {
                return e === t
            }, a, !0), l = p(function(e) {
                return ee(t, e) > -1
            }, a, !0), c = [function(e, n, r) {
                var i = !o && (r || n !== A) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                return t = null,
                i
            }
            ]; s < i; s++)
                if (n = S.relative[e[s].type])
                    c = [p(h(c), n)];
                else {
                    if (n = S.filter[e[s].type].apply(null, e[s].matches),
                    n[O]) {
                        for (r = ++s; r < i && !S.relative[e[r].type]; r++)
                            ;
                        return y(s > 1 && h(c), s > 1 && f(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(se, "$1"), n, s < r && v(e.slice(s, r)), r < i && v(e = e.slice(r)), r < i && f(e))
                    }
                    c.push(n)
                }
            return h(c)
        }
        function b(e, n) {
            var i = n.length > 0
              , o = e.length > 0
              , a = function(r, a, s, u, l) {
                var c, d, f, p = 0, h = "0", m = r && [], y = [], v = A, b = r || o && S.find.TAG("*", l), x = W += null == v ? 1 : Math.random() || .1, w = b.length;
                for (l && (A = a === H || a || l); h !== w && null != (c = b[h]); h++) {
                    if (o && c) {
                        for (d = 0,
                        a || c.ownerDocument === H || (L(c),
                        s = !R); f = e[d++]; )
                            if (f(c, a || H, s)) {
                                u.push(c);
                                break
                            }
                        l && (W = x)
                    }
                    i && ((c = !f && c) && p--,
                    r && m.push(c))
                }
                if (p += h,
                i && h !== p) {
                    for (d = 0; f = n[d++]; )
                        f(m, y, a, s);
                    if (r) {
                        if (p > 0)
                            for (; h--; )
                                m[h] || y[h] || (y[h] = Q.call(u));
                        y = g(y)
                    }
                    K.apply(u, y),
                    l && !r && y.length > 0 && p + n.length > 1 && t.uniqueSort(u)
                }
                return l && (W = x,
                A = v),
                m
            };
            return i ? r(a) : a
        }
        var x, w, S, C, T, E, k, j, A, N, D, L, H, q, R, M, F, P, _, O = "sizzle" + 1 * new Date, I = e.document, W = 0, B = 0, $ = n(), z = n(), X = n(), U = function(e, t) {
            return e === t && (D = !0),
            0
        }, G = 1 << 31, V = {}.hasOwnProperty, J = [], Q = J.pop, Y = J.push, K = J.push, Z = J.slice, ee = function(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] === t)
                    return n;
            return -1
        }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]", oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)", ae = new RegExp(ne + "+","g"), se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$","g"), ue = new RegExp("^" + ne + "*," + ne + "*"), le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]","g"), de = new RegExp(oe), fe = new RegExp("^" + re + "$"), pe = {
            ID: new RegExp("^#(" + re + ")"),
            CLASS: new RegExp("^\\.(" + re + ")"),
            TAG: new RegExp("^(" + re + "|[*])"),
            ATTR: new RegExp("^" + ie),
            PSEUDO: new RegExp("^" + oe),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)","i"),
            bool: new RegExp("^(?:" + te + ")$","i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)","i")
        }, he = /^(?:input|select|textarea|button)$/i, me = /^h\d$/i, ge = /^[^{]+\{\s*\[native \w/, ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ve = /[+~]/, be = /'|\\/g, xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)","ig"), we = function(e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        }, Se = function() {
            L()
        };
        try {
            K.apply(J = Z.call(I.childNodes), I.childNodes),
            J[I.childNodes.length].nodeType
        } catch (e) {
            K = {
                apply: J.length ? function(e, t) {
                    Y.apply(e, Z.call(t))
                }
                : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++]; )
                        ;
                    e.length = n - 1
                }
            }
        }
        w = t.support = {},
        T = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }
        ,
        L = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : I;
            return r !== H && 9 === r.nodeType && r.documentElement ? (H = r,
            q = H.documentElement,
            R = !T(H),
            (n = H.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Se, !1) : n.attachEvent && n.attachEvent("onunload", Se)),
            w.attributes = i(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }),
            w.getElementsByTagName = i(function(e) {
                return e.appendChild(H.createComment("")),
                !e.getElementsByTagName("*").length
            }),
            w.getElementsByClassName = ge.test(H.getElementsByClassName),
            w.getById = i(function(e) {
                return q.appendChild(e).id = O,
                !H.getElementsByName || !H.getElementsByName(O).length
            }),
            w.getById ? (S.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && R) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }
            ,
            S.filter.ID = function(e) {
                var t = e.replace(xe, we);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ) : (delete S.find.ID,
            S.filter.ID = function(e) {
                var t = e.replace(xe, we);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }
            ),
            S.find.TAG = w.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++]; )
                        1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }
            ,
            S.find.CLASS = w.getElementsByClassName && function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && R)
                    return t.getElementsByClassName(e)
            }
            ,
            F = [],
            M = [],
            (w.qsa = ge.test(H.querySelectorAll)) && (i(function(e) {
                q.appendChild(e).innerHTML = "<a id='" + O + "'></a><select id='" + O + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && M.push("[*^$]=" + ne + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || M.push("\\[" + ne + "*(?:value|" + te + ")"),
                e.querySelectorAll("[id~=" + O + "-]").length || M.push("~="),
                e.querySelectorAll(":checked").length || M.push(":checked"),
                e.querySelectorAll("a#" + O + "+*").length || M.push(".#.+[+~]")
            }),
            i(function(e) {
                var t = H.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && M.push("name" + ne + "*[*^$|!~]?="),
                e.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                M.push(",.*:")
            })),
            (w.matchesSelector = ge.test(P = q.matches || q.webkitMatchesSelector || q.mozMatchesSelector || q.oMatchesSelector || q.msMatchesSelector)) && i(function(e) {
                w.disconnectedMatch = P.call(e, "div"),
                P.call(e, "[s!='']:x"),
                F.push("!=", oe)
            }),
            M = M.length && new RegExp(M.join("|")),
            F = F.length && new RegExp(F.join("|")),
            t = ge.test(q.compareDocumentPosition),
            _ = t || ge.test(q.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e
                  , r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }
            : function(e, t) {
                if (t)
                    for (; t = t.parentNode; )
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            U = t ? function(e, t) {
                if (e === t)
                    return D = !0,
                    0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1,
                1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === H || e.ownerDocument === I && _(I, e) ? -1 : t === H || t.ownerDocument === I && _(I, t) ? 1 : N ? ee(N, e) - ee(N, t) : 0 : 4 & n ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return D = !0,
                    0;
                var n, r = 0, i = e.parentNode, o = t.parentNode, s = [e], u = [t];
                if (!i || !o)
                    return e === H ? -1 : t === H ? 1 : i ? -1 : o ? 1 : N ? ee(N, e) - ee(N, t) : 0;
                if (i === o)
                    return a(e, t);
                for (n = e; n = n.parentNode; )
                    s.unshift(n);
                for (n = t; n = n.parentNode; )
                    u.unshift(n);
                for (; s[r] === u[r]; )
                    r++;
                return r ? a(s[r], u[r]) : s[r] === I ? -1 : u[r] === I ? 1 : 0
            }
            ,
            H) : H
        }
        ,
        t.matches = function(e, n) {
            return t(e, null, null, n)
        }
        ,
        t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== H && L(e),
            n = n.replace(ce, "='$1']"),
            w.matchesSelector && R && !X[n + " "] && (!F || !F.test(n)) && (!M || !M.test(n)))
                try {
                    var r = P.call(e, n);
                    if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return r
                } catch (e) {}
            return t(n, H, null, [e]).length > 0
        }
        ,
        t.contains = function(e, t) {
            return (e.ownerDocument || e) !== H && L(e),
            _(e, t)
        }
        ,
        t.attr = function(e, t) {
            (e.ownerDocument || e) !== H && L(e);
            var n = S.attrHandle[t.toLowerCase()]
              , r = n && V.call(S.attrHandle, t.toLowerCase()) ? n(e, t, !R) : undefined;
            return r !== undefined ? r : w.attributes || !R ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }
        ,
        t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        t.uniqueSort = function(e) {
            var t, n = [], r = 0, i = 0;
            if (D = !w.detectDuplicates,
            N = !w.sortStable && e.slice(0),
            e.sort(U),
            D) {
                for (; t = e[i++]; )
                    t === e[i] && (r = n.push(i));
                for (; r--; )
                    e.splice(n[r], 1)
            }
            return N = null,
            e
        }
        ,
        C = t.getText = function(e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += C(e)
                } else if (3 === i || 4 === i)
                    return e.nodeValue
            } else
                for (; t = e[r++]; )
                    n += C(t);
            return n
        }
        ,
        S = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: pe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(xe, we),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(xe, we),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(xe, we).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = $[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && $(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var o = t.attr(i, e);
                        return null == o ? "!=" === n : !n || (o += "",
                        "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3)
                      , a = "last" !== e.slice(-4)
                      , s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    }
                    : function(t, n, u) {
                        var l, c, d, f, p, h, m = o !== a ? "nextSibling" : "previousSibling", g = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !u && !s, b = !1;
                        if (g) {
                            if (o) {
                                for (; m; ) {
                                    for (f = t; f = f[m]; )
                                        if (s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType)
                                            return !1;
                                    h = m = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? g.firstChild : g.lastChild],
                            a && v) {
                                for (f = g,
                                d = f[O] || (f[O] = {}),
                                c = d[f.uniqueID] || (d[f.uniqueID] = {}),
                                l = c[e] || [],
                                p = l[0] === W && l[1],
                                b = p && l[2],
                                f = p && g.childNodes[p]; f = ++p && f && f[m] || (b = p = 0) || h.pop(); )
                                    if (1 === f.nodeType && ++b && f === t) {
                                        c[e] = [W, p, b];
                                        break
                                    }
                            } else if (v && (f = t,
                            d = f[O] || (f[O] = {}),
                            c = d[f.uniqueID] || (d[f.uniqueID] = {}),
                            l = c[e] || [],
                            p = l[0] === W && l[1],
                            b = p),
                            !1 === b)
                                for (; (f = ++p && f && f[m] || (b = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++b || (v && (d = f[O] || (f[O] = {}),
                                c = d[f.uniqueID] || (d[f.uniqueID] = {}),
                                c[e] = [W, b]),
                                f !== t)); )
                                    ;
                            return (b -= i) === r || b % r == 0 && b / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var i, o = S.pseudos[e] || S.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[O] ? o(n) : o.length > 1 ? (i = [e, e, "", n],
                    S.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = o(e, n), a = i.length; a--; )
                            r = ee(e, i[a]),
                            e[r] = !(t[r] = i[a])
                    }) : function(e) {
                        return o(e, 0, i)
                    }
                    ) : o
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = []
                      , n = []
                      , i = k(e.replace(se, "$1"));
                    return i[O] ? r(function(e, t, n, r) {
                        for (var o, a = i(e, null, r, []), s = e.length; s--; )
                            (o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, r, o) {
                        return t[0] = e,
                        i(t, null, o, n),
                        t[0] = null,
                        !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return e = e.replace(xe, we),
                    function(t) {
                        return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                    }
                }),
                lang: r(function(e) {
                    return fe.test(e || "") || t.error("unsupported lang: " + e),
                    e = e.replace(xe, we).toLowerCase(),
                    function(t) {
                        var n;
                        do {
                            if (n = R ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                        } while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === q
                },
                focus: function(e) {
                    return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return !1 === e.disabled
                },
                disabled: function(e) {
                    return !0 === e.disabled
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !S.pseudos.empty(e)
                },
                header: function(e) {
                    return me.test(e.nodeName)
                },
                input: function(e) {
                    return he.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: l(function() {
                    return [0]
                }),
                last: l(function(e, t) {
                    return [t - 1]
                }),
                eq: l(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: l(function(e, t) {
                    for (var n = 0; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                odd: l(function(e, t) {
                    for (var n = 1; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                lt: l(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0; )
                        e.push(r);
                    return e
                }),
                gt: l(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; )
                        e.push(r);
                    return e
                })
            }
        },
        S.pseudos.nth = S.pseudos.eq;
        for (x in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            S.pseudos[x] = s(x);
        for (x in {
            submit: !0,
            reset: !0
        })
            S.pseudos[x] = u(x);
        return d.prototype = S.filters = S.pseudos,
        S.setFilters = new d,
        E = t.tokenize = function(e, n) {
            var r, i, o, a, s, u, l, c = z[e + " "];
            if (c)
                return n ? 0 : c.slice(0);
            for (s = e,
            u = [],
            l = S.preFilter; s; ) {
                r && !(i = ue.exec(s)) || (i && (s = s.slice(i[0].length) || s),
                u.push(o = [])),
                r = !1,
                (i = le.exec(s)) && (r = i.shift(),
                o.push({
                    value: r,
                    type: i[0].replace(se, " ")
                }),
                s = s.slice(r.length));
                for (a in S.filter)
                    !(i = pe[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(),
                    o.push({
                        value: r,
                        type: a,
                        matches: i
                    }),
                    s = s.slice(r.length));
                if (!r)
                    break
            }
            return n ? s.length : s ? t.error(e) : z(e, u).slice(0)
        }
        ,
        k = t.compile = function(e, t) {
            var n, r = [], i = [], o = X[e + " "];
            if (!o) {
                for (t || (t = E(e)),
                n = t.length; n--; )
                    o = v(t[n]),
                    o[O] ? r.push(o) : i.push(o);
                o = X(e, b(i, r)),
                o.selector = e
            }
            return o
        }
        ,
        j = t.select = function(e, t, n, r) {
            var i, o, a, s, u, l = "function" == typeof e && e, d = !r && E(e = l.selector || e);
            if (n = n || [],
            1 === d.length) {
                if (o = d[0] = d[0].slice(0),
                o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && R && S.relative[o[1].type]) {
                    if (!(t = (S.find.ID(a.matches[0].replace(xe, we), t) || [])[0]))
                        return n;
                    l && (t = t.parentNode),
                    e = e.slice(o.shift().value.length)
                }
                for (i = pe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i],
                !S.relative[s = a.type]); )
                    if ((u = S.find[s]) && (r = u(a.matches[0].replace(xe, we), ve.test(o[0].type) && c(t.parentNode) || t))) {
                        if (o.splice(i, 1),
                        !(e = r.length && f(o)))
                            return K.apply(n, r),
                            n;
                        break
                    }
            }
            return (l || k(e, d))(r, t, !R, n, !t || ve.test(e) && c(t.parentNode) || t),
            n
        }
        ,
        w.sortStable = O.split("").sort(U).join("") === O,
        w.detectDuplicates = !!D,
        L(),
        w.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(H.createElement("div"))
        }),
        i(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(e, t, n) {
            if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        w.attributes && i(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || o("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue
        }),
        i(function(e) {
            return null == e.getAttribute("disabled")
        }) || o(te, function(e, t, n) {
            var r;
            if (!n)
                return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }),
        t
    }(e);
    pe.find = ve,
    pe.expr = ve.selectors,
    pe.expr[":"] = pe.expr.pseudos,
    pe.uniqueSort = pe.unique = ve.uniqueSort,
    pe.text = ve.getText,
    pe.isXMLDoc = ve.isXML,
    pe.contains = ve.contains;
    var be = function(e, t, n) {
        for (var r = [], i = n !== undefined; (e = e[t]) && 9 !== e.nodeType; )
            if (1 === e.nodeType) {
                if (i && pe(e).is(n))
                    break;
                r.push(e)
            }
        return r
    }
      , xe = function(e, t) {
        for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
        return n
    }
      , we = pe.expr.match.needsContext
      , Se = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
      , Ce = /^.[^:#\[\.,]*$/;
    pe.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === r.nodeType ? pe.find.matchesSelector(r, e) ? [r] : [] : pe.find.matches(e, pe.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }
    ,
    pe.fn.extend({
        find: function(e) {
            var t, n = [], r = this, i = r.length;
            if ("string" != typeof e)
                return this.pushStack(pe(e).filter(function() {
                    for (t = 0; t < i; t++)
                        if (pe.contains(r[t], this))
                            return !0
                }));
            for (t = 0; t < i; t++)
                pe.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? pe.unique(n) : n),
            n.selector = this.selector ? this.selector + " " + e : e,
            n
        },
        filter: function(e) {
            return this.pushStack(r(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(r(this, e || [], !0))
        },
        is: function(e) {
            return !!r(this, "string" == typeof e && we.test(e) ? pe(e) : e || [], !1).length
        }
    });
    var Te, Ee = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (pe.fn.init = function(e, t, n) {
        var r, i;
        if (!e)
            return this;
        if (n = n || Te,
        "string" == typeof e) {
            if (!(r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : Ee.exec(e)) || !r[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof pe ? t[0] : t,
                pe.merge(this, pe.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : re, !0)),
                Se.test(r[1]) && pe.isPlainObject(t))
                    for (r in t)
                        pe.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            if ((i = re.getElementById(r[2])) && i.parentNode) {
                if (i.id !== r[2])
                    return Te.find(e);
                this.length = 1,
                this[0] = i
            }
            return this.context = re,
            this.selector = e,
            this
        }
        return e.nodeType ? (this.context = this[0] = e,
        this.length = 1,
        this) : pe.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(pe) : (e.selector !== undefined && (this.selector = e.selector,
        this.context = e.context),
        pe.makeArray(e, this))
    }
    ).prototype = pe.fn,
    Te = pe(re);
    var ke = /^(?:parents|prev(?:Until|All))/
      , je = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    pe.fn.extend({
        has: function(e) {
            var t, n = pe(e, this), r = n.length;
            return this.filter(function() {
                for (t = 0; t < r; t++)
                    if (pe.contains(this, n[t]))
                        return !0
            })
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, o = [], a = we.test(e) || "string" != typeof e ? pe(e, t || this.context) : 0; r < i; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && pe.find.matchesSelector(n, e))) {
                        o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? pe.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? pe.inArray(this[0], pe(e)) : pe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(pe.uniqueSort(pe.merge(this.get(), pe(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    pe.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return be(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return be(e, "parentNode", n)
        },
        next: function(e) {
            return i(e, "nextSibling")
        },
        prev: function(e) {
            return i(e, "previousSibling")
        },
        nextAll: function(e) {
            return be(e, "nextSibling")
        },
        prevAll: function(e) {
            return be(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return be(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return be(e, "previousSibling", n)
        },
        siblings: function(e) {
            return xe((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return xe(e.firstChild)
        },
        contents: function(e) {
            return pe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : pe.merge([], e.childNodes)
        }
    }, function(e, t) {
        pe.fn[e] = function(n, r) {
            var i = pe.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n),
            r && "string" == typeof r && (i = pe.filter(r, i)),
            this.length > 1 && (je[e] || (i = pe.uniqueSort(i)),
            ke.test(e) && (i = i.reverse())),
            this.pushStack(i)
        }
    });
    var Ae = /\S+/g;
    pe.Callbacks = function(e) {
        e = "string" == typeof e ? o(e) : pe.extend({}, e);
        var t, n, r, i, a = [], s = [], u = -1, l = function() {
            for (i = e.once,
            r = t = !0; s.length; u = -1)
                for (n = s.shift(); ++u < a.length; )
                    !1 === a[u].apply(n[0], n[1]) && e.stopOnFalse && (u = a.length,
                    n = !1);
            e.memory || (n = !1),
            t = !1,
            i && (a = n ? [] : "")
        }, c = {
            add: function() {
                return a && (n && !t && (u = a.length - 1,
                s.push(n)),
                function t(n) {
                    pe.each(n, function(n, r) {
                        pe.isFunction(r) ? e.unique && c.has(r) || a.push(r) : r && r.length && "string" !== pe.type(r) && t(r)
                    })
                }(arguments),
                n && !t && l()),
                this
            },
            remove: function() {
                return pe.each(arguments, function(e, t) {
                    for (var n; (n = pe.inArray(t, a, n)) > -1; )
                        a.splice(n, 1),
                        n <= u && u--
                }),
                this
            },
            has: function(e) {
                return e ? pe.inArray(e, a) > -1 : a.length > 0
            },
            empty: function() {
                return a && (a = []),
                this
            },
            disable: function() {
                return i = s = [],
                a = n = "",
                this
            },
            disabled: function() {
                return !a
            },
            lock: function() {
                return i = !0,
                n || c.disable(),
                this
            },
            locked: function() {
                return !!i
            },
            fireWith: function(e, n) {
                return i || (n = n || [],
                n = [e, n.slice ? n.slice() : n],
                s.push(n),
                t || l()),
                this
            },
            fire: function() {
                return c.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!r
            }
        };
        return c
    }
    ,
    pe.extend({
        Deferred: function(e) {
            var t = [["resolve", "done", pe.Callbacks("once memory"), "resolved"], ["reject", "fail", pe.Callbacks("once memory"), "rejected"], ["notify", "progress", pe.Callbacks("memory")]]
              , n = "pending"
              , r = {
                state: function() {
                    return n
                },
                always: function() {
                    return i.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var e = arguments;
                    return pe.Deferred(function(n) {
                        pe.each(t, function(t, o) {
                            var a = pe.isFunction(e[t]) && e[t];
                            i[o[1]](function() {
                                var e = a && a.apply(this, arguments);
                                e && pe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                            })
                        }),
                        e = null
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? pe.extend(e, r) : r
                }
            }
              , i = {};
            return r.pipe = r.then,
            pe.each(t, function(e, o) {
                var a = o[2]
                  , s = o[3];
                r[o[1]] = a.add,
                s && a.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock),
                i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments),
                    this
                }
                ,
                i[o[0] + "With"] = a.fireWith
            }),
            r.promise(i),
            e && e.call(i, i),
            i
        },
        when: function(e) {
            var t, n, r, i = 0, o = ie.call(arguments), a = o.length, s = 1 !== a || e && pe.isFunction(e.promise) ? a : 0, u = 1 === s ? e : pe.Deferred(), l = function(e, n, r) {
                return function(i) {
                    n[e] = this,
                    r[e] = arguments.length > 1 ? ie.call(arguments) : i,
                    r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                }
            };
            if (a > 1)
                for (t = new Array(a),
                n = new Array(a),
                r = new Array(a); i < a; i++)
                    o[i] && pe.isFunction(o[i].promise) ? o[i].promise().progress(l(i, n, t)).done(l(i, r, o)).fail(u.reject) : --s;
            return s || u.resolveWith(r, o),
            u.promise()
        }
    });
    var Ne;
    pe.fn.ready = function(e) {
        return pe.ready.promise().done(e),
        this
    }
    ,
    pe.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? pe.readyWait++ : pe.ready(!0)
        },
        ready: function(e) {
            (!0 === e ? --pe.readyWait : pe.isReady) || (pe.isReady = !0,
            !0 !== e && --pe.readyWait > 0 || (Ne.resolveWith(re, [pe]),
            pe.fn.triggerHandler && (pe(re).triggerHandler("ready"),
            pe(re).off("ready"))))
        }
    }),
    pe.ready.promise = function(t) {
        if (!Ne)
            if (Ne = pe.Deferred(),
            "complete" === re.readyState || "loading" !== re.readyState && !re.documentElement.doScroll)
                e.setTimeout(pe.ready);
            else if (re.addEventListener)
                re.addEventListener("DOMContentLoaded", s),
                e.addEventListener("load", s);
            else {
                re.attachEvent("onreadystatechange", s),
                e.attachEvent("onload", s);
                var n = !1;
                try {
                    n = null == e.frameElement && re.documentElement
                } catch (e) {}
                n && n.doScroll && function t() {
                    if (!pe.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (n) {
                            return e.setTimeout(t, 50)
                        }
                        a(),
                        pe.ready()
                    }
                }()
            }
        return Ne.promise(t)
    }
    ,
    pe.ready.promise();
    var De;
    for (De in pe(de))
        break;
    de.ownFirst = "0" === De,
    de.inlineBlockNeedsLayout = !1,
    pe(function() {
        var e, t, n, r;
        (n = re.getElementsByTagName("body")[0]) && n.style && (t = re.createElement("div"),
        r = re.createElement("div"),
        r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
        n.appendChild(r).appendChild(t),
        "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
        de.inlineBlockNeedsLayout = e = 3 === t.offsetWidth,
        e && (n.style.zoom = 1)),
        n.removeChild(r))
    }),
    function() {
        var e = re.createElement("div");
        de.deleteExpando = !0;
        try {
            delete e.test
        } catch (e) {
            de.deleteExpando = !1
        }
        e = null
    }();
    var Le = function(e) {
        var t = pe.noData[(e.nodeName + " ").toLowerCase()]
          , n = +e.nodeType || 1;
        return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute("classid") === t)
    }
      , He = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , qe = /([A-Z])/g;
    pe.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return !!(e = e.nodeType ? pe.cache[e[pe.expando]] : e[pe.expando]) && !l(e)
        },
        data: function(e, t, n) {
            return c(e, t, n)
        },
        removeData: function(e, t) {
            return d(e, t)
        },
        _data: function(e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return d(e, t, !0)
        }
    }),
    pe.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0], a = o && o.attributes;
            if (e === undefined) {
                if (this.length && (i = pe.data(o),
                1 === o.nodeType && !pe._data(o, "parsedAttrs"))) {
                    for (n = a.length; n--; )
                        a[n] && (r = a[n].name,
                        0 === r.indexOf("data-") && (r = pe.camelCase(r.slice(5)),
                        u(o, r, i[r])));
                    pe._data(o, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                pe.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                pe.data(this, e, t)
            }) : o ? u(o, e, pe.data(o, e)) : undefined
        },
        removeData: function(e) {
            return this.each(function() {
                pe.removeData(this, e)
            })
        }
    }),
    pe.extend({
        queue: function(e, t, n) {
            var r;
            if (e)
                return t = (t || "fx") + "queue",
                r = pe._data(e, t),
                n && (!r || pe.isArray(n) ? r = pe._data(e, t, pe.makeArray(n)) : r.push(n)),
                r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = pe.queue(e, t)
              , r = n.length
              , i = n.shift()
              , o = pe._queueHooks(e, t)
              , a = function() {
                pe.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(),
            r--),
            i && ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(e, a, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return pe._data(e, n) || pe._data(e, n, {
                empty: pe.Callbacks("once memory").add(function() {
                    pe._removeData(e, t + "queue"),
                    pe._removeData(e, n)
                })
            })
        }
    }),
    pe.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e,
            e = "fx",
            n--),
            arguments.length < n ? pe.queue(this[0], e) : t === undefined ? this : this.each(function() {
                var n = pe.queue(this, e, t);
                pe._queueHooks(this, e),
                "fx" === e && "inprogress" !== n[0] && pe.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                pe.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1, i = pe.Deferred(), o = this, a = this.length, s = function() {
                --r || i.resolveWith(o, [o])
            };
            for ("string" != typeof e && (t = e,
            e = undefined),
            e = e || "fx"; a--; )
                (n = pe._data(o[a], e + "queueHooks")) && n.empty && (r++,
                n.empty.add(s));
            return s(),
            i.promise(t)
        }
    }),
    function() {
        var e;
        de.shrinkWrapBlocks = function() {
            if (null != e)
                return e;
            e = !1;
            var t, n, r;
            return (n = re.getElementsByTagName("body")[0]) && n.style ? (t = re.createElement("div"),
            r = re.createElement("div"),
            r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
            n.appendChild(r).appendChild(t),
            "undefined" != typeof t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
            t.appendChild(re.createElement("div")).style.width = "5px",
            e = 3 !== t.offsetWidth),
            n.removeChild(r),
            e) : void 0
        }
    }();
    var Re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , Me = new RegExp("^(?:([+-])=|)(" + Re + ")([a-z%]*)$","i")
      , Fe = ["Top", "Right", "Bottom", "Left"]
      , Pe = function(e, t) {
        return e = t || e,
        "none" === pe.css(e, "display") || !pe.contains(e.ownerDocument, e)
    }
      , _e = function(e, t, n, r, i, o, a) {
        var s = 0
          , u = e.length
          , l = null == n;
        if ("object" === pe.type(n)) {
            i = !0;
            for (s in n)
                _e(e, t, s, n[s], !0, o, a)
        } else if (r !== undefined && (i = !0,
        pe.isFunction(r) || (a = !0),
        l && (a ? (t.call(e, r),
        t = null) : (l = t,
        t = function(e, t, n) {
            return l.call(pe(e), n)
        }
        )),
        t))
            for (; s < u; s++)
                t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
    }
      , Oe = /^(?:checkbox|radio)$/i
      , Ie = /<([\w:-]+)/
      , We = /^$|\/(?:java|ecma)script/i
      , Be = /^\s+/
      , $e = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    !function() {
        var e = re.createElement("div")
          , t = re.createDocumentFragment()
          , n = re.createElement("input");
        e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        de.leadingWhitespace = 3 === e.firstChild.nodeType,
        de.tbody = !e.getElementsByTagName("tbody").length,
        de.htmlSerialize = !!e.getElementsByTagName("link").length,
        de.html5Clone = "<:nav></:nav>" !== re.createElement("nav").cloneNode(!0).outerHTML,
        n.type = "checkbox",
        n.checked = !0,
        t.appendChild(n),
        de.appendChecked = n.checked,
        e.innerHTML = "<textarea>x</textarea>",
        de.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue,
        t.appendChild(e),
        n = re.createElement("input"),
        n.setAttribute("type", "radio"),
        n.setAttribute("checked", "checked"),
        n.setAttribute("name", "t"),
        e.appendChild(n),
        de.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked,
        de.noCloneEvent = !!e.addEventListener,
        e[pe.expando] = 1,
        de.attributes = !e.getAttribute(pe.expando)
    }();
    var ze = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: de.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    ze.optgroup = ze.option,
    ze.tbody = ze.tfoot = ze.colgroup = ze.caption = ze.thead,
    ze.th = ze.td;
    var Xe = /<|&#?\w+;/
      , Ue = /<tbody/i;
    !function() {
        var t, n, r = re.createElement("div");
        for (t in {
            submit: !0,
            change: !0,
            focusin: !0
        })
            n = "on" + t,
            (de[t] = n in e) || (r.setAttribute(n, "t"),
            de[t] = !1 === r.attributes[n].expando);
        r = null
    }();
    var Ge = /^(?:input|select|textarea)$/i
      , Ve = /^key/
      , Je = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , Qe = /^(?:focusinfocus|focusoutblur)$/
      , Ye = /^([^.]*)(?:\.(.+)|)/;
    pe.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, a, s, u, l, c, d, f, p, h, m, g = pe._data(e);
            if (g) {
                for (n.handler && (u = n,
                n = u.handler,
                i = u.selector),
                n.guid || (n.guid = pe.guid++),
                (a = g.events) || (a = g.events = {}),
                (c = g.handle) || (c = g.handle = function(e) {
                    return void 0 === pe || e && pe.event.triggered === e.type ? undefined : pe.event.dispatch.apply(c.elem, arguments)
                }
                ,
                c.elem = e),
                t = (t || "").match(Ae) || [""],
                s = t.length; s--; )
                    o = Ye.exec(t[s]) || [],
                    p = m = o[1],
                    h = (o[2] || "").split(".").sort(),
                    p && (l = pe.event.special[p] || {},
                    p = (i ? l.delegateType : l.bindType) || p,
                    l = pe.event.special[p] || {},
                    d = pe.extend({
                        type: p,
                        origType: m,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && pe.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, u),
                    (f = a[p]) || (f = a[p] = [],
                    f.delegateCount = 0,
                    l.setup && !1 !== l.setup.call(e, r, h, c) || (e.addEventListener ? e.addEventListener(p, c, !1) : e.attachEvent && e.attachEvent("on" + p, c))),
                    l.add && (l.add.call(e, d),
                    d.handler.guid || (d.handler.guid = n.guid)),
                    i ? f.splice(f.delegateCount++, 0, d) : f.push(d),
                    pe.event.global[p] = !0);
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, d, f, p, h, m, g = pe.hasData(e) && pe._data(e);
            if (g && (c = g.events)) {
                for (t = (t || "").match(Ae) || [""],
                l = t.length; l--; )
                    if (s = Ye.exec(t[l]) || [],
                    p = m = s[1],
                    h = (s[2] || "").split(".").sort(),
                    p) {
                        for (d = pe.event.special[p] || {},
                        p = (r ? d.delegateType : d.bindType) || p,
                        f = c[p] || [],
                        s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        u = o = f.length; o--; )
                            a = f[o],
                            !i && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1),
                            a.selector && f.delegateCount--,
                            d.remove && d.remove.call(e, a));
                        u && !f.length && (d.teardown && !1 !== d.teardown.call(e, h, g.handle) || pe.removeEvent(e, p, g.handle),
                        delete c[p])
                    } else
                        for (p in c)
                            pe.event.remove(e, p + t[l], n, r, !0);
                pe.isEmptyObject(c) && (delete g.handle,
                pe._removeData(e, "events"))
            }
        },
        trigger: function(t, n, r, i) {
            var o, a, s, u, l, c, d, f = [r || re], p = ce.call(t, "type") ? t.type : t, h = ce.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = r = r || re,
            3 !== r.nodeType && 8 !== r.nodeType && !Qe.test(p + pe.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."),
            p = h.shift(),
            h.sort()),
            a = p.indexOf(":") < 0 && "on" + p,
            t = t[pe.expando] ? t : new pe.Event(p,"object" == typeof t && t),
            t.isTrigger = i ? 2 : 3,
            t.namespace = h.join("."),
            t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            t.result = undefined,
            t.target || (t.target = r),
            n = null == n ? [t] : pe.makeArray(n, [t]),
            l = pe.event.special[p] || {},
            i || !l.trigger || !1 !== l.trigger.apply(r, n))) {
                if (!i && !l.noBubble && !pe.isWindow(r)) {
                    for (u = l.delegateType || p,
                    Qe.test(u + p) || (s = s.parentNode); s; s = s.parentNode)
                        f.push(s),
                        c = s;
                    c === (r.ownerDocument || re) && f.push(c.defaultView || c.parentWindow || e)
                }
                for (d = 0; (s = f[d++]) && !t.isPropagationStopped(); )
                    t.type = d > 1 ? u : l.bindType || p,
                    o = (pe._data(s, "events") || {})[t.type] && pe._data(s, "handle"),
                    o && o.apply(s, n),
                    (o = a && s[a]) && o.apply && Le(s) && (t.result = o.apply(s, n),
                    !1 === t.result && t.preventDefault());
                if (t.type = p,
                !i && !t.isDefaultPrevented() && (!l._default || !1 === l._default.apply(f.pop(), n)) && Le(r) && a && r[p] && !pe.isWindow(r)) {
                    c = r[a],
                    c && (r[a] = null),
                    pe.event.triggered = p;
                    try {
                        r[p]()
                    } catch (e) {}
                    pe.event.triggered = undefined,
                    c && (r[a] = c)
                }
                return t.result
            }
        },
        dispatch: function(e) {
            e = pe.event.fix(e);
            var t, n, r, i, o, a = [], s = ie.call(arguments), u = (pe._data(this, "events") || {})[e.type] || [], l = pe.event.special[e.type] || {};
            if (s[0] = e,
            e.delegateTarget = this,
            !l.preDispatch || !1 !== l.preDispatch.call(this, e)) {
                for (a = pe.event.handlers.call(this, e, u),
                t = 0; (i = a[t++]) && !e.isPropagationStopped(); )
                    for (e.currentTarget = i.elem,
                    n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped(); )
                        e.rnamespace && !e.rnamespace.test(o.namespace) || (e.handleObj = o,
                        e.data = o.data,
                        (r = ((pe.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) !== undefined && !1 === (e.result = r) && (e.preventDefault(),
                        e.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, e),
                e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a = [], s = t.delegateCount, u = e.target;
            if (s && u.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; u != this; u = u.parentNode || this)
                    if (1 === u.nodeType && (!0 !== u.disabled || "click" !== e.type)) {
                        for (r = [],
                        n = 0; n < s; n++)
                            o = t[n],
                            i = o.selector + " ",
                            r[i] === undefined && (r[i] = o.needsContext ? pe(i, this).index(u) > -1 : pe.find(i, this, null, [u]).length),
                            r[i] && r.push(o);
                        r.length && a.push({
                            elem: u,
                            handlers: r
                        })
                    }
            return s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            }),
            a
        },
        fix: function(e) {
            if (e[pe.expando])
                return e;
            var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = Je.test(i) ? this.mouseHooks : Ve.test(i) ? this.keyHooks : {}),
            r = a.props ? this.props.concat(a.props) : this.props,
            e = new pe.Event(o),
            t = r.length; t--; )
                n = r[t],
                e[n] = o[n];
            return e.target || (e.target = o.srcElement || re),
            3 === e.target.nodeType && (e.target = e.target.parentNode),
            e.metaKey = !!e.metaKey,
            a.filter ? a.filter(e, o) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, o = t.button, a = t.fromElement;
                return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || re,
                i = r.documentElement,
                n = r.body,
                e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0),
                e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)),
                !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a),
                e.which || o === undefined || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
                e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== x() && this.focus)
                        try {
                            return this.focus(),
                            !1
                        } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === x() && this.blur)
                        return this.blur(),
                        !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (pe.nodeName(this, "input") && "checkbox" === this.type && this.click)
                        return this.click(),
                        !1
                },
                _default: function(e) {
                    return pe.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n) {
            var r = pe.extend(new pe.Event, n, {
                type: e,
                isSimulated: !0
            });
            pe.event.trigger(r, null, t),
            r.isDefaultPrevented() && n.preventDefault()
        }
    },
    pe.removeEvent = re.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }
    : function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && ("undefined" == typeof e[r] && (e[r] = null),
        e.detachEvent(r, n))
    }
    ,
    pe.Event = function(e, t) {
        if (!(this instanceof pe.Event))
            return new pe.Event(e,t);
        e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && !1 === e.returnValue ? v : b) : this.type = e,
        t && pe.extend(this, t),
        this.timeStamp = e && e.timeStamp || pe.now(),
        this[pe.expando] = !0
    }
    ,
    pe.Event.prototype = {
        constructor: pe.Event,
        isDefaultPrevented: b,
        isPropagationStopped: b,
        isImmediatePropagationStopped: b,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = v,
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = v,
            e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(),
            e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = v,
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    pe.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        pe.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this, i = e.relatedTarget, o = e.handleObj;
                return i && (i === r || pe.contains(r, i)) || (e.type = o.origType,
                n = o.handler.apply(this, arguments),
                e.type = t),
                n
            }
        }
    }),
    de.submit || (pe.event.special.submit = {
        setup: function() {
            if (pe.nodeName(this, "form"))
                return !1;
            pe.event.add(this, "click._submit keypress._submit", function(e) {
                var t = e.target
                  , n = pe.nodeName(t, "input") || pe.nodeName(t, "button") ? pe.prop(t, "form") : undefined;
                n && !pe._data(n, "submit") && (pe.event.add(n, "submit._submit", function(e) {
                    e._submitBubble = !0
                }),
                pe._data(n, "submit", !0))
            })
        },
        postDispatch: function(e) {
            e._submitBubble && (delete e._submitBubble,
            this.parentNode && !e.isTrigger && pe.event.simulate("submit", this.parentNode, e))
        },
        teardown: function() {
            if (pe.nodeName(this, "form"))
                return !1;
            pe.event.remove(this, "._submit")
        }
    }),
    de.change || (pe.event.special.change = {
        setup: function() {
            if (Ge.test(this.nodeName))
                return "checkbox" !== this.type && "radio" !== this.type || (pe.event.add(this, "propertychange._change", function(e) {
                    "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
                }),
                pe.event.add(this, "click._change", function(e) {
                    this._justChanged && !e.isTrigger && (this._justChanged = !1),
                    pe.event.simulate("change", this, e)
                })),
                !1;
            pe.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Ge.test(t.nodeName) && !pe._data(t, "change") && (pe.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || pe.event.simulate("change", this.parentNode, e)
                }),
                pe._data(t, "change", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type)
                return e.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return pe.event.remove(this, "._change"),
            !Ge.test(this.nodeName)
        }
    }),
    de.focusin || pe.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            pe.event.simulate(t, e.target, pe.event.fix(e))
        };
        pe.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this
                  , i = pe._data(r, t);
                i || r.addEventListener(e, n, !0),
                pe._data(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this
                  , i = pe._data(r, t) - 1;
                i ? pe._data(r, t, i) : (r.removeEventListener(e, n, !0),
                pe._removeData(r, t))
            }
        }
    }),
    pe.fn.extend({
        on: function(e, t, n, r) {
            return w(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return w(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)
                return r = e.handleObj,
                pe(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                this;
            if ("object" == typeof e) {
                for (i in e)
                    this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t,
            t = undefined),
            !1 === n && (n = b),
            this.each(function() {
                pe.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                pe.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n)
                return pe.event.trigger(e, t, n, !0)
        }
    });
    var Ke = / jQuery\d+="(?:null|\d+)"/g
      , Ze = new RegExp("<(?:" + $e + ")[\\s/>]","i")
      , et = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
      , tt = /<script|<style|<link/i
      , nt = /checked\s*(?:[^=]|=\s*.checked.)/i
      , rt = /^true\/(.*)/
      , it = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , ot = p(re)
      , at = ot.appendChild(re.createElement("div"));
    pe.extend({
        htmlPrefilter: function(e) {
            return e.replace(et, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, i, o, a, s, u = pe.contains(e.ownerDocument, e);
            if (de.html5Clone || pe.isXMLDoc(e) || !Ze.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (at.innerHTML = e.outerHTML,
            at.removeChild(o = at.firstChild)),
            !(de.noCloneEvent && de.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || pe.isXMLDoc(e)))
                for (r = h(o),
                s = h(e),
                a = 0; null != (i = s[a]); ++a)
                    r[a] && k(i, r[a]);
            if (t)
                if (n)
                    for (s = s || h(e),
                    r = r || h(o),
                    a = 0; null != (i = s[a]); a++)
                        E(i, r[a]);
                else
                    E(e, o);
            return r = h(o, "script"),
            r.length > 0 && m(r, !u && h(e, "script")),
            r = s = i = null,
            o
        },
        cleanData: function(e, t) {
            for (var n, r, i, o, a = 0, s = pe.expando, u = pe.cache, l = de.attributes, c = pe.event.special; null != (n = e[a]); a++)
                if ((t || Le(n)) && (i = n[s],
                o = i && u[i])) {
                    if (o.events)
                        for (r in o.events)
                            c[r] ? pe.event.remove(n, r) : pe.removeEvent(n, r, o.handle);
                    u[i] && (delete u[i],
                    l || "undefined" == typeof n.removeAttribute ? n[s] = undefined : n.removeAttribute(s),
                    ne.push(i))
                }
        }
    }),
    pe.fn.extend({
        domManip: j,
        detach: function(e) {
            return A(this, e, !0)
        },
        remove: function(e) {
            return A(this, e)
        },
        text: function(e) {
            return _e(this, function(e) {
                return e === undefined ? pe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || re).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return j(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    S(this, e).appendChild(e)
                }
            })
        },
        prepend: function() {
            return j(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = S(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return j(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return j(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && pe.cleanData(h(e, !1)); e.firstChild; )
                    e.removeChild(e.firstChild);
                e.options && pe.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null != e && e,
            t = null == t ? e : t,
            this.map(function() {
                return pe.clone(this, e, t)
            })
        },
        html: function(e) {
            return _e(this, function(e) {
                var t = this[0] || {}
                  , n = 0
                  , r = this.length;
                if (e === undefined)
                    return 1 === t.nodeType ? t.innerHTML.replace(Ke, "") : undefined;
                if ("string" == typeof e && !tt.test(e) && (de.htmlSerialize || !Ze.test(e)) && (de.leadingWhitespace || !Be.test(e)) && !ze[(Ie.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = pe.htmlPrefilter(e);
                    try {
                        for (; n < r; n++)
                            t = this[n] || {},
                            1 === t.nodeType && (pe.cleanData(h(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return j(this, arguments, function(t) {
                var n = this.parentNode;
                pe.inArray(this, e) < 0 && (pe.cleanData(h(this)),
                n && n.replaceChild(t, this))
            }, e)
        }
    }),
    pe.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        pe.fn[e] = function(e) {
            for (var n, r = 0, i = [], o = pe(e), a = o.length - 1; r <= a; r++)
                n = r === a ? this : this.clone(!0),
                pe(o[r])[t](n),
                ae.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var st, ut = {
        HTML: "block",
        BODY: "block"
    }, lt = /^margin/, ct = new RegExp("^(" + Re + ")(?!px)[a-z%]+$","i"), dt = function(e, t, n, r) {
        var i, o, a = {};
        for (o in t)
            a[o] = e.style[o],
            e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t)
            e.style[o] = a[o];
        return i
    }, ft = re.documentElement;
    !function() {
        function t() {
            var t, c, d = re.documentElement;
            d.appendChild(u),
            l.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
            n = i = s = !1,
            r = a = !0,
            e.getComputedStyle && (c = e.getComputedStyle(l),
            n = "1%" !== (c || {}).top,
            s = "2px" === (c || {}).marginLeft,
            i = "4px" === (c || {
                width: "4px"
            }).width,
            l.style.marginRight = "50%",
            r = "4px" === (c || {
                marginRight: "4px"
            }).marginRight,
            t = l.appendChild(re.createElement("div")),
            t.style.cssText = l.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
            t.style.marginRight = t.style.width = "0",
            l.style.width = "1px",
            a = !parseFloat((e.getComputedStyle(t) || {}).marginRight),
            l.removeChild(t)),
            l.style.display = "none",
            o = 0 === l.getClientRects().length,
            o && (l.style.display = "",
            l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            l.childNodes[0].style.borderCollapse = "separate",
            t = l.getElementsByTagName("td"),
            t[0].style.cssText = "margin:0;border:0;padding:0;display:none",
            (o = 0 === t[0].offsetHeight) && (t[0].style.display = "",
            t[1].style.display = "none",
            o = 0 === t[0].offsetHeight)),
            d.removeChild(u)
        }
        var n, r, i, o, a, s, u = re.createElement("div"), l = re.createElement("div");
        l.style && (l.style.cssText = "float:left;opacity:.5",
        de.opacity = "0.5" === l.style.opacity,
        de.cssFloat = !!l.style.cssFloat,
        l.style.backgroundClip = "content-box",
        l.cloneNode(!0).style.backgroundClip = "",
        de.clearCloneStyle = "content-box" === l.style.backgroundClip,
        u = re.createElement("div"),
        u.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
        l.innerHTML = "",
        u.appendChild(l),
        de.boxSizing = "" === l.style.boxSizing || "" === l.style.MozBoxSizing || "" === l.style.WebkitBoxSizing,
        pe.extend(de, {
            reliableHiddenOffsets: function() {
                return null == n && t(),
                o
            },
            boxSizingReliable: function() {
                return null == n && t(),
                i
            },
            pixelMarginRight: function() {
                return null == n && t(),
                r
            },
            pixelPosition: function() {
                return null == n && t(),
                n
            },
            reliableMarginRight: function() {
                return null == n && t(),
                a
            },
            reliableMarginLeft: function() {
                return null == n && t(),
                s
            }
        }))
    }();
    var pt, ht, mt = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (pt = function(t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e),
        n.getComputedStyle(t)
    }
    ,
    ht = function(e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || pt(e),
        a = n ? n.getPropertyValue(t) || n[t] : undefined,
        "" !== a && a !== undefined || pe.contains(e.ownerDocument, e) || (a = pe.style(e, t)),
        n && !de.pixelMarginRight() && ct.test(a) && lt.test(t) && (r = s.width,
        i = s.minWidth,
        o = s.maxWidth,
        s.minWidth = s.maxWidth = s.width = a,
        a = n.width,
        s.width = r,
        s.minWidth = i,
        s.maxWidth = o),
        a === undefined ? a : a + ""
    }
    ) : ft.currentStyle && (pt = function(e) {
        return e.currentStyle
    }
    ,
    ht = function(e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || pt(e),
        a = n ? n[t] : undefined,
        null == a && s && s[t] && (a = s[t]),
        ct.test(a) && !mt.test(t) && (r = s.left,
        i = e.runtimeStyle,
        o = i && i.left,
        o && (i.left = e.currentStyle.left),
        s.left = "fontSize" === t ? "1em" : a,
        a = s.pixelLeft + "px",
        s.left = r,
        o && (i.left = o)),
        a === undefined ? a : a + "" || "auto"
    }
    );
    var gt = /alpha\([^)]*\)/i
      , yt = /opacity\s*=\s*([^)]*)/i
      , vt = /^(none|table(?!-c[ea]).+)/
      , bt = new RegExp("^(" + Re + ")(.*)$","i")
      , xt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , wt = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , St = ["Webkit", "O", "Moz", "ms"]
      , Ct = re.createElement("div").style;
    pe.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = ht(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": de.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = pe.camelCase(t), u = e.style;
                if (t = pe.cssProps[s] || (pe.cssProps[s] = H(s) || s),
                a = pe.cssHooks[t] || pe.cssHooks[s],
                n === undefined)
                    return a && "get"in a && (i = a.get(e, !1, r)) !== undefined ? i : u[t];
                if (o = typeof n,
                "string" === o && (i = Me.exec(n)) && i[1] && (n = f(e, t, i),
                o = "number"),
                null != n && n === n && ("number" === o && (n += i && i[3] || (pe.cssNumber[s] ? "" : "px")),
                de.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"),
                !(a && "set"in a && (n = a.set(e, n, r)) === undefined)))
                    try {
                        u[t] = n
                    } catch (e) {}
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = pe.camelCase(t);
            return t = pe.cssProps[s] || (pe.cssProps[s] = H(s) || s),
            a = pe.cssHooks[t] || pe.cssHooks[s],
            a && "get"in a && (o = a.get(e, !0, n)),
            o === undefined && (o = ht(e, t, r)),
            "normal" === o && t in wt && (o = wt[t]),
            "" === n || n ? (i = parseFloat(o),
            !0 === n || isFinite(i) ? i || 0 : o) : o
        }
    }),
    pe.each(["height", "width"], function(e, t) {
        pe.cssHooks[t] = {
            get: function(e, n, r) {
                if (n)
                    return vt.test(pe.css(e, "display")) && 0 === e.offsetWidth ? dt(e, xt, function() {
                        return F(e, t, r)
                    }) : F(e, t, r)
            },
            set: function(e, n, r) {
                var i = r && pt(e);
                return R(e, n, r ? M(e, t, r, de.boxSizing && "border-box" === pe.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }),
    de.opacity || (pe.cssHooks.opacity = {
        get: function(e, t) {
            return yt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style
              , r = e.currentStyle
              , i = pe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : ""
              , o = r && r.filter || n.filter || "";
            n.zoom = 1,
            (t >= 1 || "" === t) && "" === pe.trim(o.replace(gt, "")) && n.removeAttribute && (n.removeAttribute("filter"),
            "" === t || r && !r.filter) || (n.filter = gt.test(o) ? o.replace(gt, i) : o + " " + i)
        }
    }),
    pe.cssHooks.marginRight = L(de.reliableMarginRight, function(e, t) {
        if (t)
            return dt(e, {
                display: "inline-block"
            }, ht, [e, "marginRight"])
    }),
    pe.cssHooks.marginLeft = L(de.reliableMarginLeft, function(e, t) {
        if (t)
            return (parseFloat(ht(e, "marginLeft")) || (pe.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - dt(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            }) : 0)) + "px"
    }),
    pe.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        pe.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++)
                    i[e + Fe[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        },
        lt.test(e) || (pe.cssHooks[e + t].set = R)
    }),
    pe.fn.extend({
        css: function(e, t) {
            return _e(this, function(e, t, n) {
                var r, i, o = {}, a = 0;
                if (pe.isArray(t)) {
                    for (r = pt(e),
                    i = t.length; a < i; a++)
                        o[t[a]] = pe.css(e, t[a], !1, r);
                    return o
                }
                return n !== undefined ? pe.style(e, t, n) : pe.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return q(this, !0)
        },
        hide: function() {
            return q(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Pe(this) ? pe(this).show() : pe(this).hide()
            })
        }
    }),
    pe.Tween = P,
    P.prototype = {
        constructor: P,
        init: function(e, t, n, r, i, o) {
            this.elem = e,
            this.prop = n,
            this.easing = i || pe.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = o || (pe.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = P.propHooks[this.prop];
            return e && e.get ? e.get(this) : P.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = P.propHooks[this.prop];
            return this.options.duration ? this.pos = t = pe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : P.propHooks._default.set(this),
            this
        }
    },
    P.prototype.init.prototype = P.prototype,
    P.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = pe.css(e.elem, e.prop, ""),
                t && "auto" !== t ? t : 0)
            },
            set: function(e) {
                pe.fx.step[e.prop] ? pe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[pe.cssProps[e.prop]] && !pe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : pe.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    },
    P.propHooks.scrollTop = P.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    pe.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    },
    pe.fx = P.prototype.init,
    pe.fx.step = {};
    var Tt, Et, kt = /^(?:toggle|show|hide)$/, jt = /queueHooks$/;
    pe.Animation = pe.extend($, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return f(n.elem, e, Me.exec(t), n),
                n
            }
            ]
        },
        tweener: function(e, t) {
            pe.isFunction(e) ? (t = e,
            e = ["*"]) : e = e.match(Ae);
            for (var n, r = 0, i = e.length; r < i; r++)
                n = e[r],
                $.tweeners[n] = $.tweeners[n] || [],
                $.tweeners[n].unshift(t)
        },
        prefilters: [W],
        prefilter: function(e, t) {
            t ? $.prefilters.unshift(e) : $.prefilters.push(e)
        }
    }),
    pe.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? pe.extend({}, e) : {
            complete: n || !n && t || pe.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !pe.isFunction(t) && t
        };
        return r.duration = pe.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in pe.fx.speeds ? pe.fx.speeds[r.duration] : pe.fx.speeds._default,
        null != r.queue && !0 !== r.queue || (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
            pe.isFunction(r.old) && r.old.call(this),
            r.queue && pe.dequeue(this, r.queue)
        }
        ,
        r
    }
    ,
    pe.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Pe).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = pe.isEmptyObject(e)
              , o = pe.speed(t, n, r)
              , a = function() {
                var t = $(this, pe.extend({}, e), o);
                (i || pe._data(this, "finish")) && t.stop(!0)
            };
            return a.finish = a,
            i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop,
                t(n)
            };
            return "string" != typeof e && (n = t,
            t = e,
            e = undefined),
            t && !1 !== e && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0
                  , i = null != e && e + "queueHooks"
                  , o = pe.timers
                  , a = pe._data(this);
                if (i)
                    a[i] && a[i].stop && r(a[i]);
                else
                    for (i in a)
                        a[i] && a[i].stop && jt.test(i) && r(a[i]);
                for (i = o.length; i--; )
                    o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n),
                    t = !1,
                    o.splice(i, 1));
                !t && n || pe.dequeue(this, e)
            })
        },
        finish: function(e) {
            return !1 !== e && (e = e || "fx"),
            this.each(function() {
                var t, n = pe._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = pe.timers, a = r ? r.length : 0;
                for (n.finish = !0,
                pe.queue(this, e, []),
                i && i.stop && i.stop.call(this, !0),
                t = o.length; t--; )
                    o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0),
                    o.splice(t, 1));
                for (t = 0; t < a; t++)
                    r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }),
    pe.each(["toggle", "show", "hide"], function(e, t) {
        var n = pe.fn[t];
        pe.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(O(t, !0), e, r, i)
        }
    }),
    pe.each({
        slideDown: O("show"),
        slideUp: O("hide"),
        slideToggle: O("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        pe.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }),
    pe.timers = [],
    pe.fx.tick = function() {
        var e, t = pe.timers, n = 0;
        for (Tt = pe.now(); n < t.length; n++)
            (e = t[n])() || t[n] !== e || t.splice(n--, 1);
        t.length || pe.fx.stop(),
        Tt = undefined
    }
    ,
    pe.fx.timer = function(e) {
        pe.timers.push(e),
        e() ? pe.fx.start() : pe.timers.pop()
    }
    ,
    pe.fx.interval = 13,
    pe.fx.start = function() {
        Et || (Et = e.setInterval(pe.fx.tick, pe.fx.interval))
    }
    ,
    pe.fx.stop = function() {
        e.clearInterval(Et),
        Et = null
    }
    ,
    pe.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    pe.fn.delay = function(t, n) {
        return t = pe.fx ? pe.fx.speeds[t] || t : t,
        n = n || "fx",
        this.queue(n, function(n, r) {
            var i = e.setTimeout(n, t);
            r.stop = function() {
                e.clearTimeout(i)
            }
        })
    }
    ,
    function() {
        var e, t = re.createElement("input"), n = re.createElement("div"), r = re.createElement("select"), i = r.appendChild(re.createElement("option"));
        n = re.createElement("div"),
        n.setAttribute("className", "t"),
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        e = n.getElementsByTagName("a")[0],
        t.setAttribute("type", "checkbox"),
        n.appendChild(t),
        e = n.getElementsByTagName("a")[0],
        e.style.cssText = "top:1px",
        de.getSetAttribute = "t" !== n.className,
        de.style = /top/.test(e.getAttribute("style")),
        de.hrefNormalized = "/a" === e.getAttribute("href"),
        de.checkOn = !!t.value,
        de.optSelected = i.selected,
        de.enctype = !!re.createElement("form").enctype,
        r.disabled = !0,
        de.optDisabled = !i.disabled,
        t = re.createElement("input"),
        t.setAttribute("value", ""),
        de.input = "" === t.getAttribute("value"),
        t.value = "t",
        t.setAttribute("type", "radio"),
        de.radioValue = "t" === t.value
    }();
    var At = /\r/g
      , Nt = /[\x20\t\r\n\f]+/g;
    pe.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0];
            {
                if (arguments.length)
                    return r = pe.isFunction(e),
                    this.each(function(n) {
                        var i;
                        1 === this.nodeType && (i = r ? e.call(this, n, pe(this).val()) : e,
                        null == i ? i = "" : "number" == typeof i ? i += "" : pe.isArray(i) && (i = pe.map(i, function(e) {
                            return null == e ? "" : e + ""
                        })),
                        (t = pe.valHooks[this.type] || pe.valHooks[this.nodeName.toLowerCase()]) && "set"in t && t.set(this, i, "value") !== undefined || (this.value = i))
                    });
                if (i)
                    return (t = pe.valHooks[i.type] || pe.valHooks[i.nodeName.toLowerCase()]) && "get"in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value,
                    "string" == typeof n ? n.replace(At, "") : null == n ? "" : n)
            }
        }
    }),
    pe.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = pe.find.attr(e, "value");
                    return null != t ? t : pe.trim(pe.text(e)).replace(Nt, " ")
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || i < 0, a = o ? null : [], s = o ? i + 1 : r.length, u = i < 0 ? s : o ? i : 0; u < s; u++)
                        if (n = r[u],
                        (n.selected || u === i) && (de.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !pe.nodeName(n.parentNode, "optgroup"))) {
                            if (t = pe(n).val(),
                            o)
                                return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = pe.makeArray(t), a = i.length; a--; )
                        if (r = i[a],
                        pe.inArray(pe.valHooks.option.get(r), o) > -1)
                            try {
                                r.selected = n = !0
                            } catch (e) {
                                r.scrollHeight
                            }
                        else
                            r.selected = !1;
                    return n || (e.selectedIndex = -1),
                    i
                }
            }
        }
    }),
    pe.each(["radio", "checkbox"], function() {
        pe.valHooks[this] = {
            set: function(e, t) {
                if (pe.isArray(t))
                    return e.checked = pe.inArray(pe(e).val(), t) > -1
            }
        },
        de.checkOn || (pe.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    });
    var Dt, Lt, Ht = pe.expr.attrHandle, qt = /^(?:checked|selected)$/i, Rt = de.getSetAttribute, Mt = de.input;
    pe.fn.extend({
        attr: function(e, t) {
            return _e(this, pe.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                pe.removeAttr(this, e)
            })
        }
    }),
    pe.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return "undefined" == typeof e.getAttribute ? pe.prop(e, t, n) : (1 === o && pe.isXMLDoc(e) || (t = t.toLowerCase(),
                i = pe.attrHooks[t] || (pe.expr.match.bool.test(t) ? Lt : Dt)),
                n !== undefined ? null === n ? void pe.removeAttr(e, t) : i && "set"in i && (r = i.set(e, n, t)) !== undefined ? r : (e.setAttribute(t, n + ""),
                n) : i && "get"in i && null !== (r = i.get(e, t)) ? r : (r = pe.find.attr(e, t),
                null == r ? undefined : r))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!de.radioValue && "radio" === t && pe.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r, i = 0, o = t && t.match(Ae);
            if (o && 1 === e.nodeType)
                for (; n = o[i++]; )
                    r = pe.propFix[n] || n,
                    pe.expr.match.bool.test(n) ? Mt && Rt || !qt.test(n) ? e[r] = !1 : e[pe.camelCase("default-" + n)] = e[r] = !1 : pe.attr(e, n, ""),
                    e.removeAttribute(Rt ? n : r)
        }
    }),
    Lt = {
        set: function(e, t, n) {
            return !1 === t ? pe.removeAttr(e, n) : Mt && Rt || !qt.test(n) ? e.setAttribute(!Rt && pe.propFix[n] || n, n) : e[pe.camelCase("default-" + n)] = e[n] = !0,
            n
        }
    },
    pe.each(pe.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = Ht[t] || pe.find.attr;
        Mt && Rt || !qt.test(t) ? Ht[t] = function(e, t, r) {
            var i, o;
            return r || (o = Ht[t],
            Ht[t] = i,
            i = null != n(e, t, r) ? t.toLowerCase() : null,
            Ht[t] = o),
            i
        }
        : Ht[t] = function(e, t, n) {
            if (!n)
                return e[pe.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }),
    Mt && Rt || (pe.attrHooks.value = {
        set: function(e, t, n) {
            if (!pe.nodeName(e, "input"))
                return Dt && Dt.set(e, t, n);
            e.defaultValue = t
        }
    }),
    Rt || (Dt = {
        set: function(e, t, n) {
            var r = e.getAttributeNode(n);
            if (r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)),
            r.value = t += "",
            "value" === n || t === e.getAttribute(n))
                return t
        }
    },
    Ht.id = Ht.name = Ht.coords = function(e, t, n) {
        var r;
        if (!n)
            return (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
    }
    ,
    pe.valHooks.button = {
        get: function(e, t) {
            var n = e.getAttributeNode(t);
            if (n && n.specified)
                return n.value
        },
        set: Dt.set
    },
    pe.attrHooks.contenteditable = {
        set: function(e, t, n) {
            Dt.set(e, "" !== t && t, n)
        }
    },
    pe.each(["width", "height"], function(e, t) {
        pe.attrHooks[t] = {
            set: function(e, n) {
                if ("" === n)
                    return e.setAttribute(t, "auto"),
                    n
            }
        }
    })),
    de.style || (pe.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || undefined
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    });
    var Ft = /^(?:input|select|textarea|button|object)$/i
      , Pt = /^(?:a|area)$/i;
    pe.fn.extend({
        prop: function(e, t) {
            return _e(this, pe.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = pe.propFix[e] || e,
            this.each(function() {
                try {
                    this[e] = undefined,
                    delete this[e]
                } catch (e) {}
            })
        }
    }),
    pe.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return 1 === o && pe.isXMLDoc(e) || (t = pe.propFix[t] || t,
                i = pe.propHooks[t]),
                n !== undefined ? i && "set"in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = pe.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Ft.test(e.nodeName) || Pt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }),
    de.hrefNormalized || pe.each(["href", "src"], function(e, t) {
        pe.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }),
    de.optSelected || (pe.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex),
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    pe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        pe.propFix[this.toLowerCase()] = this
    }),
    de.enctype || (pe.propFix.enctype = "encoding");
    var _t = /[\t\r\n\f]/g;
    pe.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (pe.isFunction(e))
                return this.each(function(t) {
                    pe(this).addClass(e.call(this, t, z(this)))
                });
            if ("string" == typeof e && e)
                for (t = e.match(Ae) || []; n = this[u++]; )
                    if (i = z(n),
                    r = 1 === n.nodeType && (" " + i + " ").replace(_t, " ")) {
                        for (a = 0; o = t[a++]; )
                            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        s = pe.trim(r),
                        i !== s && pe.attr(n, "class", s)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (pe.isFunction(e))
                return this.each(function(t) {
                    pe(this).removeClass(e.call(this, t, z(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(Ae) || []; n = this[u++]; )
                    if (i = z(n),
                    r = 1 === n.nodeType && (" " + i + " ").replace(_t, " ")) {
                        for (a = 0; o = t[a++]; )
                            for (; r.indexOf(" " + o + " ") > -1; )
                                r = r.replace(" " + o + " ", " ");
                        s = pe.trim(r),
                        i !== s && pe.attr(n, "class", s)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : pe.isFunction(e) ? this.each(function(n) {
                pe(this).toggleClass(e.call(this, n, z(this), t), t)
            }) : this.each(function() {
                var t, r, i, o;
                if ("string" === n)
                    for (r = 0,
                    i = pe(this),
                    o = e.match(Ae) || []; t = o[r++]; )
                        i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else
                    e !== undefined && "boolean" !== n || (t = z(this),
                    t && pe._data(this, "__className__", t),
                    pe.attr(this, "class", t || !1 === e ? "" : pe._data(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++]; )
                if (1 === n.nodeType && (" " + z(n) + " ").replace(_t, " ").indexOf(t) > -1)
                    return !0;
            return !1
        }
    }),
    pe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        pe.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }),
    pe.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    });
    var Ot = e.location
      , It = pe.now()
      , Wt = /\?/
      , Bt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    pe.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse)
            return e.JSON.parse(t + "");
        var n, r = null, i = pe.trim(t + "");
        return i && !pe.trim(i.replace(Bt, function(e, t, i, o) {
            return n && t && (r = 0),
            0 === r ? e : (n = i || t,
            r += !o - !i,
            "")
        })) ? Function("return " + i)() : pe.error("Invalid JSON: " + t)
    }
    ,
    pe.parseXML = function(t) {
        var n, r;
        if (!t || "string" != typeof t)
            return null;
        try {
            e.DOMParser ? (r = new e.DOMParser,
            n = r.parseFromString(t, "text/xml")) : (n = new e.ActiveXObject("Microsoft.XMLDOM"),
            n.async = "false",
            n.loadXML(t))
        } catch (e) {
            n = undefined
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || pe.error("Invalid XML: " + t),
        n
    }
    ;
    var $t = /#.*$/
      , zt = /([?&])_=[^&]*/
      , Xt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm
      , Ut = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
      , Gt = /^(?:GET|HEAD)$/
      , Vt = /^\/\//
      , Jt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
      , Qt = {}
      , Yt = {}
      , Kt = "*/".concat("*")
      , Zt = Ot.href
      , en = Jt.exec(Zt.toLowerCase()) || [];
    pe.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Zt,
            type: "GET",
            isLocal: Ut.test(en[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Kt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": pe.parseJSON,
                "text xml": pe.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? G(G(e, pe.ajaxSettings), t) : G(pe.ajaxSettings, e)
        },
        ajaxPrefilter: X(Qt),
        ajaxTransport: X(Yt),
        ajax: function(t, n) {
            function r(t, n, r, i) {
                var o, d, v, b, w, C = n;
                2 !== x && (x = 2,
                u && e.clearTimeout(u),
                c = undefined,
                s = i || "",
                S.readyState = t > 0 ? 4 : 0,
                o = t >= 200 && t < 300 || 304 === t,
                r && (b = V(f, S, r)),
                b = J(f, b, S, o),
                o ? (f.ifModified && (w = S.getResponseHeader("Last-Modified"),
                w && (pe.lastModified[a] = w),
                (w = S.getResponseHeader("etag")) && (pe.etag[a] = w)),
                204 === t || "HEAD" === f.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state,
                d = b.data,
                v = b.error,
                o = !v)) : (v = C,
                !t && C || (C = "error",
                t < 0 && (t = 0))),
                S.status = t,
                S.statusText = (n || C) + "",
                o ? m.resolveWith(p, [d, C, S]) : m.rejectWith(p, [S, C, v]),
                S.statusCode(y),
                y = undefined,
                l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [S, f, o ? d : v]),
                g.fireWith(p, [S, C]),
                l && (h.trigger("ajaxComplete", [S, f]),
                --pe.active || pe.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t,
            t = undefined),
            n = n || {};
            var i, o, a, s, u, l, c, d, f = pe.ajaxSetup({}, n), p = f.context || f, h = f.context && (p.nodeType || p.jquery) ? pe(p) : pe.event, m = pe.Deferred(), g = pe.Callbacks("once memory"), y = f.statusCode || {}, v = {}, b = {}, x = 0, w = "canceled", S = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === x) {
                        if (!d)
                            for (d = {}; t = Xt.exec(s); )
                                d[t[1].toLowerCase()] = t[2];
                        t = d[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function() {
                    return 2 === x ? s : null
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return x || (e = b[n] = b[n] || e,
                    v[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return x || (f.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (x < 2)
                            for (t in e)
                                y[t] = [y[t], e[t]];
                        else
                            S.always(e[S.status]);
                    return this
                },
                abort: function(e) {
                    var t = e || w;
                    return c && c.abort(t),
                    r(0, t),
                    this
                }
            };
            if (m.promise(S).complete = g.add,
            S.success = S.done,
            S.error = S.fail,
            f.url = ((t || f.url || Zt) + "").replace($t, "").replace(Vt, en[1] + "//"),
            f.type = n.method || n.type || f.method || f.type,
            f.dataTypes = pe.trim(f.dataType || "*").toLowerCase().match(Ae) || [""],
            null == f.crossDomain && (i = Jt.exec(f.url.toLowerCase()),
            f.crossDomain = !(!i || i[1] === en[1] && i[2] === en[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (en[3] || ("http:" === en[1] ? "80" : "443")))),
            f.data && f.processData && "string" != typeof f.data && (f.data = pe.param(f.data, f.traditional)),
            U(Qt, f, n, S),
            2 === x)
                return S;
            l = pe.event && f.global,
            l && 0 == pe.active++ && pe.event.trigger("ajaxStart"),
            f.type = f.type.toUpperCase(),
            f.hasContent = !Gt.test(f.type),
            a = f.url,
            f.hasContent || (f.data && (a = f.url += (Wt.test(a) ? "&" : "?") + f.data,
            delete f.data),
            !1 === f.cache && (f.url = zt.test(a) ? a.replace(zt, "$1_=" + It++) : a + (Wt.test(a) ? "&" : "?") + "_=" + It++)),
            f.ifModified && (pe.lastModified[a] && S.setRequestHeader("If-Modified-Since", pe.lastModified[a]),
            pe.etag[a] && S.setRequestHeader("If-None-Match", pe.etag[a])),
            (f.data && f.hasContent && !1 !== f.contentType || n.contentType) && S.setRequestHeader("Content-Type", f.contentType),
            S.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Kt + "; q=0.01" : "") : f.accepts["*"]);
            for (o in f.headers)
                S.setRequestHeader(o, f.headers[o]);
            if (f.beforeSend && (!1 === f.beforeSend.call(p, S, f) || 2 === x))
                return S.abort();
            w = "abort";
            for (o in {
                success: 1,
                error: 1,
                complete: 1
            })
                S[o](f[o]);
            if (c = U(Yt, f, n, S)) {
                if (S.readyState = 1,
                l && h.trigger("ajaxSend", [S, f]),
                2 === x)
                    return S;
                f.async && f.timeout > 0 && (u = e.setTimeout(function() {
                    S.abort("timeout")
                }, f.timeout));
                try {
                    x = 1,
                    c.send(v, r)
                } catch (e) {
                    if (!(x < 2))
                        throw e;
                    r(-1, e)
                }
            } else
                r(-1, "No Transport");
            return S
        },
        getJSON: function(e, t, n) {
            return pe.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return pe.get(e, undefined, t, "script")
        }
    }),
    pe.each(["get", "post"], function(e, t) {
        pe[t] = function(e, n, r, i) {
            return pe.isFunction(n) && (i = i || r,
            r = n,
            n = undefined),
            pe.ajax(pe.extend({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            }, pe.isPlainObject(e) && e))
        }
    }),
    pe._evalUrl = function(e) {
        return pe.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }
    ,
    pe.fn.extend({
        wrapAll: function(e) {
            if (pe.isFunction(e))
                return this.each(function(t) {
                    pe(this).wrapAll(e.call(this, t))
                });
            if (this[0]) {
                var t = pe(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; )
                        e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return pe.isFunction(e) ? this.each(function(t) {
                pe(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = pe(this)
                  , n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = pe.isFunction(e);
            return this.each(function(n) {
                pe(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                pe.nodeName(this, "body") || pe(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    pe.expr.filters.hidden = function(e) {
        return de.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : Y(e)
    }
    ,
    pe.expr.filters.visible = function(e) {
        return !pe.expr.filters.hidden(e)
    }
    ;
    var tn = /%20/g
      , nn = /\[\]$/
      , rn = /\r?\n/g
      , on = /^(?:submit|button|image|reset|file)$/i
      , an = /^(?:input|select|textarea|keygen)/i;
    pe.param = function(e, t) {
        var n, r = [], i = function(e, t) {
            t = pe.isFunction(t) ? t() : null == t ? "" : t,
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (t === undefined && (t = pe.ajaxSettings && pe.ajaxSettings.traditional),
        pe.isArray(e) || e.jquery && !pe.isPlainObject(e))
            pe.each(e, function() {
                i(this.name, this.value)
            });
        else
            for (n in e)
                K(n, e[n], t, i);
        return r.join("&").replace(tn, "+")
    }
    ,
    pe.fn.extend({
        serialize: function() {
            return pe.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = pe.prop(this, "elements");
                return e ? pe.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !pe(this).is(":disabled") && an.test(this.nodeName) && !on.test(e) && (this.checked || !Oe.test(e))
            }).map(function(e, t) {
                var n = pe(this).val();
                return null == n ? null : pe.isArray(n) ? pe.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(rn, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(rn, "\r\n")
                }
            }).get()
        }
    }),
    pe.ajaxSettings.xhr = e.ActiveXObject !== undefined ? function() {
        return this.isLocal ? ee() : re.documentMode > 8 ? Z() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Z() || ee()
    }
    : Z;
    var sn = 0
      , un = {}
      , ln = pe.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function() {
        for (var e in un)
            un[e](undefined, !0)
    }),
    de.cors = !!ln && "withCredentials"in ln,
    ln = de.ajax = !!ln,
    ln && pe.ajaxTransport(function(t) {
        if (!t.crossDomain || de.cors) {
            var n;
            return {
                send: function(r, i) {
                    var o, a = t.xhr(), s = ++sn;
                    if (a.open(t.type, t.url, t.async, t.username, t.password),
                    t.xhrFields)
                        for (o in t.xhrFields)
                            a[o] = t.xhrFields[o];
                    t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType),
                    t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                    for (o in r)
                        r[o] !== undefined && a.setRequestHeader(o, r[o] + "");
                    a.send(t.hasContent && t.data || null),
                    n = function(e, r) {
                        var o, u, l;
                        if (n && (r || 4 === a.readyState))
                            if (delete un[s],
                            n = undefined,
                            a.onreadystatechange = pe.noop,
                            r)
                                4 !== a.readyState && a.abort();
                            else {
                                l = {},
                                o = a.status,
                                "string" == typeof a.responseText && (l.text = a.responseText);
                                try {
                                    u = a.statusText
                                } catch (e) {
                                    u = ""
                                }
                                o || !t.isLocal || t.crossDomain ? 1223 === o && (o = 204) : o = l.text ? 200 : 404
                            }
                        l && i(o, u, l, a.getAllResponseHeaders())
                    }
                    ,
                    t.async ? 4 === a.readyState ? e.setTimeout(n) : a.onreadystatechange = un[s] = n : n()
                },
                abort: function() {
                    n && n(undefined, !0)
                }
            }
        }
    }),
    pe.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return pe.globalEval(e),
                e
            }
        }
    }),
    pe.ajaxPrefilter("script", function(e) {
        e.cache === undefined && (e.cache = !1),
        e.crossDomain && (e.type = "GET",
        e.global = !1)
    }),
    pe.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n = re.head || pe("head")[0] || re.documentElement;
            return {
                send: function(r, i) {
                    t = re.createElement("script"),
                    t.async = !0,
                    e.scriptCharset && (t.charset = e.scriptCharset),
                    t.src = e.url,
                    t.onload = t.onreadystatechange = function(e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null,
                        t.parentNode && t.parentNode.removeChild(t),
                        t = null,
                        n || i(200, "success"))
                    }
                    ,
                    n.insertBefore(t, n.firstChild)
                },
                abort: function() {
                    t && t.onload(undefined, !0)
                }
            }
        }
    });
    var cn = []
      , dn = /(=)\?(?=&|$)|\?\?/;
    pe.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = cn.pop() || pe.expando + "_" + It++;
            return this[e] = !0,
            e
        }
    }),
    pe.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, a, s = !1 !== t.jsonp && (dn.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && dn.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0])
            return i = t.jsonpCallback = pe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
            s ? t[s] = t[s].replace(dn, "$1" + i) : !1 !== t.jsonp && (t.url += (Wt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
            t.converters["script json"] = function() {
                return a || pe.error(i + " was not called"),
                a[0]
            }
            ,
            t.dataTypes[0] = "json",
            o = e[i],
            e[i] = function() {
                a = arguments
            }
            ,
            r.always(function() {
                o === undefined ? pe(e).removeProp(i) : e[i] = o,
                t[i] && (t.jsonpCallback = n.jsonpCallback,
                cn.push(i)),
                a && pe.isFunction(o) && o(a[0]),
                a = o = undefined
            }),
            "script"
    }),
    pe.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e)
            return null;
        "boolean" == typeof t && (n = t,
        t = !1),
        t = t || re;
        var r = Se.exec(e)
          , i = !n && [];
        return r ? [t.createElement(r[1])] : (r = y([e], t, i),
        i && i.length && pe(i).remove(),
        pe.merge([], r.childNodes))
    }
    ;
    var fn = pe.fn.load;
    pe.fn.load = function(e, t, n) {
        if ("string" != typeof e && fn)
            return fn.apply(this, arguments);
        var r, i, o, a = this, s = e.indexOf(" ");
        return s > -1 && (r = pe.trim(e.slice(s, e.length)),
        e = e.slice(0, s)),
        pe.isFunction(t) ? (n = t,
        t = undefined) : t && "object" == typeof t && (i = "POST"),
        a.length > 0 && pe.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments,
            a.html(r ? pe("<div>").append(pe.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }
        ),
        this
    }
    ,
    pe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        pe.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    pe.expr.filters.animated = function(e) {
        return pe.grep(pe.timers, function(t) {
            return e === t.elem
        }).length
    }
    ,
    pe.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l, c = pe.css(e, "position"), d = pe(e), f = {};
            "static" === c && (e.style.position = "relative"),
            s = d.offset(),
            o = pe.css(e, "top"),
            u = pe.css(e, "left"),
            l = ("absolute" === c || "fixed" === c) && pe.inArray("auto", [o, u]) > -1,
            l ? (r = d.position(),
            a = r.top,
            i = r.left) : (a = parseFloat(o) || 0,
            i = parseFloat(u) || 0),
            pe.isFunction(t) && (t = t.call(e, n, pe.extend({}, s))),
            null != t.top && (f.top = t.top - s.top + a),
            null != t.left && (f.left = t.left - s.left + i),
            "using"in t ? t.using.call(e, f) : d.css(f)
        }
    },
    pe.fn.extend({
        offset: function(e) {
            if (arguments.length)
                return e === undefined ? this : this.each(function(t) {
                    pe.offset.setOffset(this, e, t)
                });
            var t, n, r = {
                top: 0,
                left: 0
            }, i = this[0], o = i && i.ownerDocument;
            if (o)
                return t = o.documentElement,
                pe.contains(t, i) ? ("undefined" != typeof i.getBoundingClientRect && (r = i.getBoundingClientRect()),
                n = te(o),
                {
                    top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                    left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                }) : r
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                    top: 0,
                    left: 0
                }, r = this[0];
                return "fixed" === pe.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(),
                t = this.offset(),
                pe.nodeName(e[0], "html") || (n = e.offset()),
                n.top += pe.css(e[0], "borderTopWidth", !0),
                n.left += pe.css(e[0], "borderLeftWidth", !0)),
                {
                    top: t.top - n.top - pe.css(r, "marginTop", !0),
                    left: t.left - n.left - pe.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && !pe.nodeName(e, "html") && "static" === pe.css(e, "position"); )
                    e = e.offsetParent;
                return e || ft
            })
        }
    }),
    pe.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = /Y/.test(t);
        pe.fn[e] = function(r) {
            return _e(this, function(e, r, i) {
                var o = te(e);
                if (i === undefined)
                    return o ? t in o ? o[t] : o.document.documentElement[r] : e[r];
                o ? o.scrollTo(n ? pe(o).scrollLeft() : i, n ? i : pe(o).scrollTop()) : e[r] = i
            }, e, r, arguments.length, null)
        }
    }),
    pe.each(["top", "left"], function(e, t) {
        pe.cssHooks[t] = L(de.pixelPosition, function(e, n) {
            if (n)
                return n = ht(e, t),
                ct.test(n) ? pe(e).position()[t] + "px" : n
        })
    }),
    pe.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        pe.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            pe.fn[r] = function(r, i) {
                var o = arguments.length && (n || "boolean" != typeof r)
                  , a = n || (!0 === r || !0 === i ? "margin" : "border");
                return _e(this, function(t, n, r) {
                    var i;
                    return pe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement,
                    Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? pe.css(t, n, a) : pe.style(t, n, r, a)
                }, t, o ? r : undefined, o, null)
            }
        })
    }),
    pe.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }),
    pe.fn.size = function() {
        return this.length
    }
    ,
    pe.fn.andSelf = pe.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return pe
    });
    var pn = e.jQuery
      , hn = e.$;
    return pe.noConflict = function(t) {
        return e.$ === pe && (e.$ = hn),
        t && e.jQuery === pe && (e.jQuery = pn),
        pe
    }
    ,
    t || (e.jQuery = e.$ = pe),
    pe
}),
function(e, t) {
    "use strict";
    e.rails !== t && e.error("jquery-ujs has already been loaded!");
    var n, r = e(document);
    e.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
        fileInputSelector: "input[name][type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function() {
            return e("meta[name=csrf-token]").attr("content")
        },
        csrfParam: function() {
            return e("meta[name=csrf-param]").attr("content")
        },
        CSRFProtection: function(e) {
            var t = n.csrfToken();
            t && e.setRequestHeader("X-CSRF-Token", t)
        },
        refreshCSRFTokens: function() {
            e('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken())
        },
        fire: function(t, n, r) {
            var i = e.Event(n);
            return t.trigger(i, r),
            !1 !== i.result
        },
        confirm: function(e) {
            return confirm(e)
        },
        ajax: function(t) {
            return e.ajax(t)
        },
        href: function(e) {
            return e[0].href
        },
        isRemote: function(e) {
            return e.data("remote") !== t && !1 !== e.data("remote")
        },
        handleRemote: function(r) {
            var i, o, a, s, u, l;
            if (n.fire(r, "ajax:before")) {
                if (s = r.data("with-credentials") || null,
                u = r.data("type") || e.ajaxSettings && e.ajaxSettings.dataType,
                r.is("form")) {
                    i = r.data("ujs:submit-button-formmethod") || r.attr("method"),
                    o = r.data("ujs:submit-button-formaction") || r.attr("action"),
                    a = e(r[0]).serializeArray();
                    var c = r.data("ujs:submit-button");
                    c && (a.push(c),
                    r.data("ujs:submit-button", null)),
                    r.data("ujs:submit-button-formmethod", null),
                    r.data("ujs:submit-button-formaction", null)
                } else
                    r.is(n.inputChangeSelector) ? (i = r.data("method"),
                    o = r.data("url"),
                    a = r.serialize(),
                    r.data("params") && (a = a + "&" + r.data("params"))) : r.is(n.buttonClickSelector) ? (i = r.data("method") || "get",
                    o = r.data("url"),
                    a = r.serialize(),
                    r.data("params") && (a = a + "&" + r.data("params"))) : (i = r.data("method"),
                    o = n.href(r),
                    a = r.data("params") || null);
                return l = {
                    type: i || "GET",
                    data: a,
                    dataType: u,
                    beforeSend: function(e, i) {
                        if (i.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script),
                        !n.fire(r, "ajax:beforeSend", [e, i]))
                            return !1;
                        r.trigger("ajax:send", e)
                    },
                    success: function(e, t, n) {
                        r.trigger("ajax:success", [e, t, n])
                    },
                    complete: function(e, t) {
                        r.trigger("ajax:complete", [e, t])
                    },
                    error: function(e, t, n) {
                        r.trigger("ajax:error", [e, t, n])
                    },
                    crossDomain: n.isCrossDomain(o)
                },
                s && (l.xhrFields = {
                    withCredentials: s
                }),
                o && (l.url = o),
                n.ajax(l)
            }
            return !1
        },
        isCrossDomain: function(e) {
            var t = document.createElement("a");
            t.href = location.href;
            var n = document.createElement("a");
            try {
                return n.href = e,
                n.href = n.href,
                !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
            } catch (e) {
                return !0
            }
        },
        handleMethod: function(r) {
            var i = n.href(r)
              , o = r.data("method")
              , a = r.attr("target")
              , s = n.csrfToken()
              , u = n.csrfParam()
              , l = e('<form method="post" action="' + i + '"></form>')
              , c = '<input name="_method" value="' + o + '" type="hidden" />';
            u === t || s === t || n.isCrossDomain(i) || (c += '<input name="' + u + '" value="' + s + '" type="hidden" />'),
            a && l.attr("target", a),
            l.hide().append(c).appendTo("body"),
            l.submit()
        },
        formElements: function(t, n) {
            return t.is("form") ? e(t[0].elements).filter(n) : t.find(n)
        },
        disableFormElements: function(t) {
            n.formElements(t, n.disableSelector).each(function() {
                n.disableFormElement(e(this))
            })
        },
        disableFormElement: function(e) {
            var n, r;
            n = e.is("button") ? "html" : "val",
            r = e.data("disable-with"),
            r !== t && (e.data("ujs:enable-with", e[n]()),
            e[n](r)),
            e.prop("disabled", !0),
            e.data("ujs:disabled", !0)
        },
        enableFormElements: function(t) {
            n.formElements(t, n.enableSelector).each(function() {
                n.enableFormElement(e(this))
            })
        },
        enableFormElement: function(e) {
            var n = e.is("button") ? "html" : "val";
            e.data("ujs:enable-with") !== t && (e[n](e.data("ujs:enable-with")),
            e.removeData("ujs:enable-with")),
            e.prop("disabled", !1),
            e.removeData("ujs:disabled")
        },
        allowAction: function(e) {
            var t, r = e.data("confirm"), i = !1;
            if (!r)
                return !0;
            if (n.fire(e, "confirm")) {
                try {
                    i = n.confirm(r)
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
                t = n.fire(e, "confirm:complete", [i])
            }
            return i && t
        },
        blankInputs: function(t, n, r) {
            var i, o, a, s, u = e(), l = n || "input,textarea", c = t.find(l), d = {};
            return c.each(function() {
                i = e(this),
                i.is("input[type=radio]") ? (s = i.attr("name"),
                d[s] || (0 === t.find('input[type=radio]:checked[name="' + s + '"]').length && (a = t.find('input[type=radio][name="' + s + '"]'),
                u = u.add(a)),
                d[s] = s)) : (o = i.is("input[type=checkbox],input[type=radio]") ? i.is(":checked") : !!i.val()) === r && (u = u.add(i))
            }),
            !!u.length && u
        },
        nonBlankInputs: function(e, t) {
            return n.blankInputs(e, t, !0)
        },
        stopEverything: function(t) {
            return e(t.target).trigger("ujs:everythingStopped"),
            t.stopImmediatePropagation(),
            !1
        },
        disableElement: function(e) {
            var r = e.data("disable-with");
            r !== t && (e.data("ujs:enable-with", e.html()),
            e.html(r)),
            e.bind("click.railsDisable", function(e) {
                return n.stopEverything(e)
            }),
            e.data("ujs:disabled", !0)
        },
        enableElement: function(e) {
            e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")),
            e.removeData("ujs:enable-with")),
            e.unbind("click.railsDisable"),
            e.removeData("ujs:disabled")
        }
    },
    n.fire(r, "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, r) {
        e.crossDomain || n.CSRFProtection(r)
    }),
    e(window).on("pageshow.rails", function() {
        e(e.rails.enableSelector).each(function() {
            var t = e(this);
            t.data("ujs:disabled") && e.rails.enableFormElement(t)
        }),
        e(e.rails.linkDisableSelector).each(function() {
            var t = e(this);
            t.data("ujs:disabled") && e.rails.enableElement(t)
        })
    }),
    r.on("ajax:complete", n.linkDisableSelector, function() {
        n.enableElement(e(this))
    }),
    r.on("ajax:complete", n.buttonDisableSelector, function() {
        n.enableFormElement(e(this))
    }),
    r.on("click.rails", n.linkClickSelector, function(t) {
        var r = e(this)
          , i = r.data("method")
          , o = r.data("params")
          , a = t.metaKey || t.ctrlKey;
        if (!n.allowAction(r))
            return n.stopEverything(t);
        if (!a && r.is(n.linkDisableSelector) && n.disableElement(r),
        n.isRemote(r)) {
            if (a && (!i || "GET" === i) && !o)
                return !0;
            var s = n.handleRemote(r);
            return !1 === s ? n.enableElement(r) : s.fail(function() {
                n.enableElement(r)
            }),
            !1
        }
        return i ? (n.handleMethod(r),
        !1) : void 0
    }),
    r.on("click.rails", n.buttonClickSelector, function(t) {
        var r = e(this);
        if (!n.allowAction(r) || !n.isRemote(r))
            return n.stopEverything(t);
        r.is(n.buttonDisableSelector) && n.disableFormElement(r);
        var i = n.handleRemote(r);
        return !1 === i ? n.enableFormElement(r) : i.fail(function() {
            n.enableFormElement(r)
        }),
        !1
    }),
    r.on("change.rails", n.inputChangeSelector, function(t) {
        var r = e(this);
        return n.allowAction(r) && n.isRemote(r) ? (n.handleRemote(r),
        !1) : n.stopEverything(t)
    }),
    r.on("submit.rails", n.formSubmitSelector, function(r) {
        var i, o, a = e(this), s = n.isRemote(a);
        if (!n.allowAction(a))
            return n.stopEverything(r);
        if (a.attr("novalidate") === t)
            if (a.data("ujs:formnovalidate-button") === t) {
                if ((i = n.blankInputs(a, n.requiredInputSelector, !1)) && n.fire(a, "ajax:aborted:required", [i]))
                    return n.stopEverything(r)
            } else
                a.data("ujs:formnovalidate-button", t);
        if (s) {
            if (o = n.nonBlankInputs(a, n.fileInputSelector)) {
                setTimeout(function() {
                    n.disableFormElements(a)
                }, 13);
                var u = n.fire(a, "ajax:aborted:file", [o]);
                return u || setTimeout(function() {
                    n.enableFormElements(a)
                }, 13),
                u
            }
            return n.handleRemote(a),
            !1
        }
        setTimeout(function() {
            n.disableFormElements(a)
        }, 13)
    }),
    r.on("click.rails", n.formInputClickSelector, function(t) {
        var r = e(this);
        if (!n.allowAction(r))
            return n.stopEverything(t);
        var i = r.attr("name")
          , o = i ? {
            name: i,
            value: r.val()
        } : null
          , a = r.closest("form");
        0 === a.length && (a = e("#" + r.attr("form"))),
        a.data("ujs:submit-button", o),
        a.data("ujs:formnovalidate-button", r.attr("formnovalidate")),
        a.data("ujs:submit-button-formaction", r.attr("formaction")),
        a.data("ujs:submit-button-formmethod", r.attr("formmethod"))
    }),
    r.on("ajax:send.rails", n.formSubmitSelector, function(t) {
        this === t.target && n.disableFormElements(e(this))
    }),
    r.on("ajax:complete.rails", n.formSubmitSelector, function(t) {
        this === t.target && n.enableFormElements(e(this))
    }),
    e(function() {
        n.refreshCSRFTokens()
    }))
}(jQuery),
function() {
    var e = this;
    (function() {
        (function() {
            var e = [].slice;
            this.ActionCable = {
                INTERNAL: {
                    message_types: {
                        welcome: "welcome",
                        ping: "ping",
                        confirmation: "confirm_subscription",
                        rejection: "reject_subscription"
                    },
                    default_mount_path: "/cable",
                    protocols: ["actioncable-v1-json", "actioncable-unsupported"]
                },
                WebSocket: window.WebSocket,
                logger: window.console,
                createConsumer: function(e) {
                    var n;
                    return null == e && (e = null != (n = this.getConfig("url")) ? n : this.INTERNAL.default_mount_path),
                    new t.Consumer(this.createWebSocketURL(e))
                },
                getConfig: function(e) {
                    var t;
                    return t = document.head.querySelector("meta[name='action-cable-" + e + "']"),
                    null != t ? t.getAttribute("content") : void 0
                },
                createWebSocketURL: function(e) {
                    var t;
                    return e && !/^wss?:/i.test(e) ? (t = document.createElement("a"),
                    t.href = e,
                    t.href = t.href,
                    t.protocol = t.protocol.replace("http", "ws"),
                    t.href) : e
                },
                startDebugging: function() {
                    return this.debugging = !0
                },
                stopDebugging: function() {
                    return this.debugging = null
                },
                log: function() {
                    var t, n;
                    if (t = 1 <= arguments.length ? e.call(arguments, 0) : [],
                    this.debugging)
                        return t.push(Date.now()),
                        (n = this.logger).log.apply(n, ["[ActionCable]"].concat(e.call(t)))
                }
            }
        }
        ).call(this)
    }
    ).call(e);
    var t = e.ActionCable;
    (function() {
        (function() {
            var e = function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            };
            t.ConnectionMonitor = function() {
                function n(t) {
                    this.connection = t,
                    this.visibilityDidChange = e(this.visibilityDidChange, this),
                    this.reconnectAttempts = 0
                }
                var r, i, o;
                return n.pollInterval = {
                    min: 3,
                    max: 30
                },
                n.staleThreshold = 6,
                n.prototype.start = function() {
                    if (!this.isRunning())
                        return this.startedAt = i(),
                        delete this.stoppedAt,
                        this.startPolling(),
                        document.addEventListener("visibilitychange", this.visibilityDidChange),
                        t.log("ConnectionMonitor started. pollInterval = " + this.getPollInterval() + " ms")
                }
                ,
                n.prototype.stop = function() {
                    if (this.isRunning())
                        return this.stoppedAt = i(),
                        this.stopPolling(),
                        document.removeEventListener("visibilitychange", this.visibilityDidChange),
                        t.log("ConnectionMonitor stopped")
                }
                ,
                n.prototype.isRunning = function() {
                    return null != this.startedAt && null == this.stoppedAt
                }
                ,
                n.prototype.recordPing = function() {
                    return this.pingedAt = i()
                }
                ,
                n.prototype.recordConnect = function() {
                    return this.reconnectAttempts = 0,
                    this.recordPing(),
                    delete this.disconnectedAt,
                    t.log("ConnectionMonitor recorded connect")
                }
                ,
                n.prototype.recordDisconnect = function() {
                    return this.disconnectedAt = i(),
                    t.log("ConnectionMonitor recorded disconnect")
                }
                ,
                n.prototype.startPolling = function() {
                    return this.stopPolling(),
                    this.poll()
                }
                ,
                n.prototype.stopPolling = function() {
                    return clearTimeout(this.pollTimeout)
                }
                ,
                n.prototype.poll = function() {
                    return this.pollTimeout = setTimeout(function(e) {
                        return function() {
                            return e.reconnectIfStale(),
                            e.poll()
                        }
                    }(this), this.getPollInterval())
                }
                ,
                n.prototype.getPollInterval = function() {
                    var e, t, n, i;
                    return i = this.constructor.pollInterval,
                    n = i.min,
                    t = i.max,
                    e = 5 * Math.log(this.reconnectAttempts + 1),
                    Math.round(1e3 * r(e, n, t))
                }
                ,
                n.prototype.reconnectIfStale = function() {
                    if (this.connectionIsStale())
                        return t.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + this.getPollInterval() + " ms, time disconnected = " + o(this.disconnectedAt) + " s, stale threshold = " + this.constructor.staleThreshold + " s"),
                        this.reconnectAttempts++,
                        this.disconnectedRecently() ? t.log("ConnectionMonitor skipping reopening recent disconnect") : (t.log("ConnectionMonitor reopening"),
                        this.connection.reopen())
                }
                ,
                n.prototype.connectionIsStale = function() {
                    var e;
                    return o(null != (e = this.pingedAt) ? e : this.startedAt) > this.constructor.staleThreshold
                }
                ,
                n.prototype.disconnectedRecently = function() {
                    return this.disconnectedAt && o(this.disconnectedAt) < this.constructor.staleThreshold
                }
                ,
                n.prototype.visibilityDidChange = function() {
                    if ("visible" === document.visibilityState)
                        return setTimeout(function(e) {
                            return function() {
                                if (e.connectionIsStale() || !e.connection.isOpen())
                                    return t.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState),
                                    e.connection.reopen()
                            }
                        }(this), 200)
                }
                ,
                i = function() {
                    return (new Date).getTime()
                }
                ,
                o = function(e) {
                    return (i() - e) / 1e3
                }
                ,
                r = function(e, t, n) {
                    return Math.max(t, Math.min(n, e))
                }
                ,
                n
            }()
        }
        ).call(this),
        function() {
            var e, n, r, i, o, a = [].slice, s = function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            }, u = [].indexOf || function(e) {
                for (var t = 0, n = this.length; t < n; t++)
                    if (t in this && this[t] === e)
                        return t;
                return -1
            }
            ;
            i = t.INTERNAL,
            n = i.message_types,
            r = i.protocols,
            o = 2 <= r.length ? a.call(r, 0, e = r.length - 1) : (e = 0,
            []),
            r[e++],
            t.Connection = function() {
                function e(e) {
                    this.consumer = e,
                    this.open = s(this.open, this),
                    this.subscriptions = this.consumer.subscriptions,
                    this.monitor = new t.ConnectionMonitor(this),
                    this.disconnected = !0
                }
                return e.reopenDelay = 500,
                e.prototype.send = function(e) {
                    return !!this.isOpen() && (this.webSocket.send(JSON.stringify(e)),
                    !0)
                }
                ,
                e.prototype.open = function() {
                    return this.isActive() ? (t.log("Attempted to open WebSocket, but existing socket is " + this.getState()),
                    !1) : (t.log("Opening WebSocket, current state is " + this.getState() + ", subprotocols: " + r),
                    null != this.webSocket && this.uninstallEventHandlers(),
                    this.webSocket = new t.WebSocket(this.consumer.url,r),
                    this.installEventHandlers(),
                    this.monitor.start(),
                    !0)
                }
                ,
                e.prototype.close = function(e) {
                    var t, n;
                    if (t = (null != e ? e : {
                        allowReconnect: !0
                    }).allowReconnect,
                    t || this.monitor.stop(),
                    this.isActive())
                        return null != (n = this.webSocket) ? n.close() : void 0
                }
                ,
                e.prototype.reopen = function() {
                    var e;
                    if (t.log("Reopening WebSocket, current state is " + this.getState()),
                    !this.isActive())
                        return this.open();
                    try {
                        return this.close()
                    } catch (n) {
                        return e = n,
                        t.log("Failed to reopen WebSocket", e)
                    } finally {
                        t.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms"),
                        setTimeout(this.open, this.constructor.reopenDelay)
                    }
                }
                ,
                e.prototype.getProtocol = function() {
                    var e;
                    return null != (e = this.webSocket) ? e.protocol : void 0
                }
                ,
                e.prototype.isOpen = function() {
                    return this.isState("open")
                }
                ,
                e.prototype.isActive = function() {
                    return this.isState("open", "connecting")
                }
                ,
                e.prototype.isProtocolSupported = function() {
                    var e;
                    return e = this.getProtocol(),
                    u.call(o, e) >= 0
                }
                ,
                e.prototype.isState = function() {
                    var e, t;
                    return t = 1 <= arguments.length ? a.call(arguments, 0) : [],
                    e = this.getState(),
                    u.call(t, e) >= 0
                }
                ,
                e.prototype.getState = function() {
                    var e, t;
                    for (t in WebSocket)
                        if (WebSocket[t] === (null != (e = this.webSocket) ? e.readyState : void 0))
                            return t.toLowerCase();
                    return null
                }
                ,
                e.prototype.installEventHandlers = function() {
                    var e, t;
                    for (e in this.events)
                        t = this.events[e].bind(this),
                        this.webSocket["on" + e] = t
                }
                ,
                e.prototype.uninstallEventHandlers = function() {
                    var e;
                    for (e in this.events)
                        this.webSocket["on" + e] = function() {}
                }
                ,
                e.prototype.events = {
                    message: function(e) {
                        var t, r, i, o;
                        if (this.isProtocolSupported())
                            switch (i = JSON.parse(e.data),
                            t = i.identifier,
                            r = i.message,
                            o = i.type,
                            o) {
                            case n.welcome:
                                return this.monitor.recordConnect(),
                                this.subscriptions.reload();
                            case n.ping:
                                return this.monitor.recordPing();
                            case n.confirmation:
                                return this.subscriptions.notify(t, "connected");
                            case n.rejection:
                                return this.subscriptions.reject(t);
                            default:
                                return this.subscriptions.notify(t, "received", r)
                            }
                    },
                    open: function() {
                        if (t.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol"),
                        this.disconnected = !1,
                        !this.isProtocolSupported())
                            return t.log("Protocol is unsupported. Stopping monitor and disconnecting."),
                            this.close({
                                allowReconnect: !1
                            })
                    },
                    close: function() {
                        if (t.log("WebSocket onclose event"),
                        !this.disconnected)
                            return this.disconnected = !0,
                            this.monitor.recordDisconnect(),
                            this.subscriptions.notifyAll("disconnected", {
                                willAttemptReconnect: this.monitor.isRunning()
                            })
                    },
                    error: function() {
                        return t.log("WebSocket onerror event")
                    }
                },
                e
            }()
        }
        .call(this),
        function() {
            var e = [].slice;
            t.Subscriptions = function() {
                function n(e) {
                    this.consumer = e,
                    this.subscriptions = []
                }
                return n.prototype.create = function(e, n) {
                    var r, i, o;
                    return r = e,
                    i = "object" == typeof r ? r : {
                        channel: r
                    },
                    o = new t.Subscription(this.consumer,i,n),
                    this.add(o)
                }
                ,
                n.prototype.add = function(e) {
                    return this.subscriptions.push(e),
                    this.consumer.ensureActiveConnection(),
                    this.notify(e, "initialized"),
                    this.sendCommand(e, "subscribe"),
                    e
                }
                ,
                n.prototype.remove = function(e) {
                    return this.forget(e),
                    this.findAll(e.identifier).length || this.sendCommand(e, "unsubscribe"),
                    e
                }
                ,
                n.prototype.reject = function(e) {
                    var t, n, r, i, o;
                    for (r = this.findAll(e),
                    i = [],
                    t = 0,
                    n = r.length; t < n; t++)
                        o = r[t],
                        this.forget(o),
                        this.notify(o, "rejected"),
                        i.push(o);
                    return i
                }
                ,
                n.prototype.forget = function(e) {
                    var t;
                    return this.subscriptions = function() {
                        var n, r, i, o;
                        for (i = this.subscriptions,
                        o = [],
                        n = 0,
                        r = i.length; n < r; n++)
                            (t = i[n]) !== e && o.push(t);
                        return o
                    }
                    .call(this),
                    e
                }
                ,
                n.prototype.findAll = function(e) {
                    var t, n, r, i, o;
                    for (r = this.subscriptions,
                    i = [],
                    t = 0,
                    n = r.length; t < n; t++)
                        o = r[t],
                        o.identifier === e && i.push(o);
                    return i
                }
                ,
                n.prototype.reload = function() {
                    var e, t, n, r, i;
                    for (n = this.subscriptions,
                    r = [],
                    e = 0,
                    t = n.length; e < t; e++)
                        i = n[e],
                        r.push(this.sendCommand(i, "subscribe"));
                    return r
                }
                ,
                n.prototype.notifyAll = function() {
                    var t, n, r, i, o, a, s;
                    for (n = arguments[0],
                    t = 2 <= arguments.length ? e.call(arguments, 1) : [],
                    o = this.subscriptions,
                    a = [],
                    r = 0,
                    i = o.length; r < i; r++)
                        s = o[r],
                        a.push(this.notify.apply(this, [s, n].concat(e.call(t))));
                    return a
                }
                ,
                n.prototype.notify = function() {
                    var t, n, r, i, o, a, s;
                    for (a = arguments[0],
                    n = arguments[1],
                    t = 3 <= arguments.length ? e.call(arguments, 2) : [],
                    s = "string" == typeof a ? this.findAll(a) : [a],
                    o = [],
                    r = 0,
                    i = s.length; r < i; r++)
                        a = s[r],
                        o.push("function" == typeof a[n] ? a[n].apply(a, t) : void 0);
                    return o
                }
                ,
                n.prototype.sendCommand = function(e, t) {
                    var n;
                    return n = e.identifier,
                    this.consumer.send({
                        command: t,
                        identifier: n
                    })
                }
                ,
                n
            }()
        }
        .call(this),
        function() {
            t.Subscription = function() {
                function e(e, n, r) {
                    this.consumer = e,
                    null == n && (n = {}),
                    this.identifier = JSON.stringify(n),
                    t(this, r)
                }
                var t;
                return e.prototype.perform = function(e, t) {
                    return null == t && (t = {}),
                    t.action = e,
                    this.send(t)
                }
                ,
                e.prototype.send = function(e) {
                    return this.consumer.send({
                        command: "message",
                        identifier: this.identifier,
                        data: JSON.stringify(e)
                    })
                }
                ,
                e.prototype.unsubscribe = function() {
                    return this.consumer.subscriptions.remove(this)
                }
                ,
                t = function(e, t) {
                    var n, r;
                    if (null != t)
                        for (n in t)
                            r = t[n],
                            e[n] = r;
                    return e
                }
                ,
                e
            }()
        }
        .call(this),
        function() {
            t.Consumer = function() {
                function e(e) {
                    this.url = e,
                    this.subscriptions = new t.Subscriptions(this),
                    this.connection = new t.Connection(this)
                }
                return e.prototype.send = function(e) {
                    return this.connection.send(e)
                }
                ,
                e.prototype.connect = function() {
                    return this.connection.open()
                }
                ,
                e.prototype.disconnect = function() {
                    return this.connection.close({
                        allowReconnect: !1
                    })
                }
                ,
                e.prototype.ensureActiveConnection = function() {
                    if (!this.connection.isActive())
                        return this.connection.open()
                }
                ,
                e
            }()
        }
        .call(this)
    }
    ).call(this),
    "object" == typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd && define(t)
}
.call(this),
function() {
    this.App || (this.App = {}),
    App.cable = ActionCable.createConsumer()
}
.call(this);
