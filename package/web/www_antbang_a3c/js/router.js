(function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
})(function (e) {
    function t(t, s) {
        var n, a, o, r = t.nodeName.toLowerCase();
        return "area" === r ? (n = t.parentNode, a = n.name, t.href && a && "map" === n.nodeName.toLowerCase() ? (o = e("img[usemap='#" + a + "']")[0], !!o && i(o)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !t.disabled : "a" === r ? t.href || s : s) && i(t)
    }

    function i(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () {
            return "hidden" === e.css(this, "visibility")
        }).length
    }
    e.ui = e.ui || {}, e.extend(e.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        scrollParent: function (t) {
            var i = this.css("position"),
                    s = "absolute" === i,
                    n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                    a = this.parents().filter(function () {
                var t = e(this);
                return s && "static" === t.css("position") ? !1 : n.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
            }).eq(0);
            return "fixed" !== i && a.length ? a : e(this[0].ownerDocument || document)
        },
        uniqueId: function () {
            var e = 0;
            return function () {
                return this.each(function () {
                    this.id || (this.id = "ui-id-" + ++e)
                })
            }
        }(),
        removeUniqueId: function () {
            return this.each(function () {
                /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
            return function (i) {
                return !!e.data(i, t)
            }
        }) : function (t, i, s) {
            return !!e.data(t, s[3])
        },
        focusable: function (i) {
            return t(i, !isNaN(e.attr(i, "tabindex")))
        },
        tabbable: function (i) {
            var s = e.attr(i, "tabindex"),
                    n = isNaN(s);
            return (n || s >= 0) && t(i, !n)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (t, i) {
        function s(t, i, s, a) {
            return e.each(n, function () {
                i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), i
        }
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                a = i.toLowerCase(),
                o = {
                    innerWidth: e.fn.innerWidth,
                    innerHeight: e.fn.innerHeight,
                    outerWidth: e.fn.outerWidth,
                    outerHeight: e.fn.outerHeight
                };
        e.fn["inner" + i] = function (t) {
            return void 0 === t ? o["inner" + i].call(this) : this.each(function () {
                e(this).css(a, s(this, t) + "px")
            })
        }, e.fn["outer" + i] = function (t, n) {
            return "number" != typeof t ? o["outer" + i].call(this, t) : this.each(function () {
                e(this).css(a, s(this, t, !0, n) + "px")
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function (e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) {
        return function (i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
        focus: function (t) {
            return function (i, s) {
                return "number" == typeof i ? this.each(function () {
                    var t = this;
                    setTimeout(function () {
                        e(t).focus(), s && s.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        disableSelection: function () {
            var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.bind(e + ".ui-disableSelection", function (e) {
                    e.preventDefault()
                })
            }
        }(),
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function (t) {
            if (void 0 !== t)
                return this.css("zIndex", t);
            if (this.length)
                for (var i, s, n = e(this[0]); n.length && n[0] !== document; ) {
                    if (i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s))
                        return s;
                    n = n.parent()
                }
            return 0
        }
    }), e.ui.plugin = {
        add: function (t, i, s) {
            var n, a = e.ui[t].prototype;
            for (n in s)
                a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]])
        },
        call: function (e, t, i, s) {
            var n, a = e.plugins[t];
            if (a && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                for (n = 0; a.length > n; n++)
                    e.options[a[n][0]] && a[n][1].apply(e.element, i)
        }
    };
    var s = 0,
            n = Array.prototype.slice;
    e.cleanData = function (t) {
        return function (i) {
            var s, n, a;
            for (a = 0; null != (n = i[a]); a++)
                try {
                    s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove")
                } catch (o) {
                }
            t(i)
        }
    }(e.cleanData), e.widget = function (t, i, s) {
        var n, a, o, r, h = {},
                l = t.split(".")[0];
        return t = t.split(".")[1], n = l + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function (t) {
            return !!e.data(t, n)
        }, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function (e, t) {
            return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t)
        }, e.extend(o, a, {
            version: s.version,
            _proto: e.extend({}, s),
            _childConstructors: []
        }), r = new i, r.options = e.widget.extend({}, r.options), e.each(s, function (t, s) {
            return e.isFunction(s) ? (h[t] = function () {
                var e = function () {
                    return i.prototype[t].apply(this, arguments)
                },
                        n = function (e) {
                            return i.prototype[t].apply(this, e)
                        };
                return function () {
                    var t, i = this._super,
                            a = this._superApply;
                    return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t
                }
            }(), void 0) : (h[t] = s, void 0)
        }), o.prototype = e.widget.extend(r, {
            widgetEventPrefix: a ? r.widgetEventPrefix || t : t
        }, h, {
            constructor: o,
            namespace: l,
            widgetName: t,
            widgetFullName: n
        }), a ? (e.each(a._childConstructors, function (t, i) {
            var s = i.prototype;
            e.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
    }, e.widget.extend = function (t) {
        for (var i, s, a = n.call(arguments, 1), o = 0, r = a.length; r > o; o++)
            for (i in a[o])
                s = a[o][i], a[o].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s);
        return t
    }, e.widget.bridge = function (t, i) {
        var s = i.prototype.widgetFullName || t;
        e.fn[t] = function (a) {
            var o = "string" == typeof a,
                    r = n.call(arguments, 1),
                    h = this;
            return o ? this.each(function () {
                var i, n = e.data(this, s);
                return "instance" === a ? (h = n, !1) : n ? e.isFunction(n[a]) && "_" !== a.charAt(0) ? (i = n[a].apply(n, r), i !== n && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + a + "'")
            }) : (r.length && (a = e.widget.extend.apply(null, [a].concat(r))), this.each(function () {
                var t = e.data(this, s);
                t ? (t.option(a || {}), t._init && t._init()) : e.data(this, s, new i(a, this))
            })), h
        }
    }, e.Widget = function () {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function (t, i) {
            i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = s++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (e) {
                    e.target === i && this.destroy()
                }
            }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function () {
            return this.element
        },
        option: function (t, i) {
            var s, n, a, o = t;
            if (0 === arguments.length)
                return e.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (o = {}, s = t.split("."), t = s.shift(), s.length) {
                    for (n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++)
                        n[s[a]] = n[s[a]] || {}, n = n[s[a]];
                    if (t = s.pop(), 1 === arguments.length)
                        return void 0 === n[t] ? null : n[t];
                    n[t] = i
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[t] ? null : this.options[t];
                    o[t] = i
                }
            return this._setOptions(o), this
        },
        _setOptions: function (e) {
            var t;
            for (t in e)
                this._setOption(t, e[t]);
            return this
        },
        _setOption: function (e, t) {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function () {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function () {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function (t, i, s) {
            var n, a = this;
            "boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function (s, o) {
                function r() {
                    return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0
                }
                "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
                var h = s.match(/^([\w:-]*)\s*(.*)$/),
                        l = h[1] + a.eventNamespace,
                        u = h[2];
                u ? n.delegate(u, l, r) : i.bind(l, r)
            })
        },
        _off: function (t, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
        },
        _delay: function (e, t) {
            function i() {
                return ("string" == typeof e ? s[e] : e).apply(s, arguments)
            }
            var s = this;
            return setTimeout(i, t || 0)
        },
        _hoverable: function (t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function (t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function (t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function (t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function (t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (t, i, s) {
            var n, a, o = this.options[t];
            if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
                for (n in a)
                    n in i || (i[n] = a[n]);
            return this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (t, i) {
        e.Widget.prototype["_" + t] = function (s, n, a) {
            "string" == typeof n && (n = {
                effect: n
            });
            var o, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
            n = n || {}, "number" == typeof n && (n = {
                duration: n
            }), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r] ? s[t](n) : r !== t && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function (i) {
                e(this)[t](), a && a.call(s[0]), i()
            })
        }
    }), e.widget;
    var a = !1;
    e(document).mouseup(function () {
        a = !1
    }), e.widget("ui.mouse", {
        version: "1.11.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function (e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function (i) {
                return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (t) {
            if (!a) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                var i = this,
                        s = 1 === t.which,
                        n = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    i.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
                    return i._mouseMove(e)
                }, this._mouseUpDelegate = function (e) {
                    return i._mouseUp(e)
                }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), a = !0, !0)) : !0
            }
        },
        _mouseMove: function (t) {
            if (this._mouseMoved) {
                if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button)
                    return this._mouseUp(t);
                if (!t.which)
                    return this._mouseUp(t)
            }
            return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
        },
        _mouseUp: function (t) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), a = !1, !1
        },
        _mouseDistanceMet: function (e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return !0
        }
    }), e.widget("ui.slider", e.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function () {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
        },
        _refresh: function () {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function () {
            var t, i, s = this.options,
                    n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    a = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                    o = [];
            for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), t = n.length; i > t; t++)
                o.push(a);
            this.handles = n.add(e(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (t) {
                e(this).data("ui-slider-handle-index", t)
            })
        },
        _createRange: function () {
            var t = this.options,
                    i = "";
            t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : e.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = e("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function () {
            this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
        },
        _destroy: function () {
            this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function (t) {
            var i, s, n, a, o, r, h, l, u = this,
                    d = this.options;
            return d.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), i = {
                x: t.pageX,
                y: t.pageY
            }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (t) {
                var i = Math.abs(s - u.values(t));
                (n > i || n === i && (t === u._lastChangedValue || u.values(t) === d.min)) && (n = i, a = e(this), o = t)
            }), r = this._start(t, o), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, a.addClass("ui-state-active").focus(), h = a.offset(), l = !e(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - h.left - a.width() / 2,
                top: t.pageY - h.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(t, o, s), this._animateOff = !0, !0))
        },
        _mouseStart: function () {
            return !0
        },
        _mouseDrag: function (e) {
            var t = {
                x: e.pageX,
                y: e.pageY
            },
            i = this._normValueFromMouse(t);
            return this._slide(e, this._handleIndex, i), !1
        },
        _mouseStop: function (e) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function () {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (e) {
            var t, i, s, n, a;
            return "horizontal" === this.orientation ? (t = this.elementSize.width, i = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, i = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / t, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a)
        },
        _start: function (e, t) {
            var i = {
                handle: this.handles[t],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", e, i)
        },
        _slide: function (e, t, i) {
            var s, n, a;
            this.options.values && this.options.values.length ? (s = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > s || 1 === t && s > i) && (i = s), i !== this.values(t) && (n = this.values(), n[t] = i, a = this._trigger("slide", e, {
                handle: this.handles[t],
                value: i,
                values: n
            }), s = this.values(t ? 0 : 1), a !== !1 && this.values(t, i))) : i !== this.value() && (a = this._trigger("slide", e, {
                handle: this.handles[t],
                value: i
            }), a !== !1 && this.value(i))
        },
        _stop: function (e, t) {
            var i = {
                handle: this.handles[t],
                value: this.value()
            };
            this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("stop", e, i)
        },
        _change: function (e, t) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = {
                    handle: this.handles[t],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._lastChangedValue = t, this._trigger("change", e, i)
            }
        },
        value: function (e) {
            return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0), void 0) : this._value()
        },
        values: function (t, i) {
            var s, n, a;
            if (arguments.length > 1)
                return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), void 0;
            if (!arguments.length)
                return this._values();
            if (!e.isArray(arguments[0]))
                return this.options.values && this.options.values.length ? this._values(t) : this.value();
            for (s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1)
                s[a] = this._trimAlignValue(n[a]), this._change(null, a);
            this._refreshValue()
        },
        _setOption: function (t, i) {
            var s, n = 0;
            switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (n = this.options.values.length), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!i), this._super(t, i), t) {
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1)
                        this._change(null, s);
                    this._animateOff = !1;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function () {
            var e = this.options.value;
            return e = this._trimAlignValue(e)
        },
        _values: function (e) {
            var t, i, s;
            if (arguments.length)
                return t = this.options.values[e], t = this._trimAlignValue(t);
            if (this.options.values && this.options.values.length) {
                for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)
                    i[s] = this._trimAlignValue(i[s]);
                return i
            }
            return []
        },
        _trimAlignValue: function (e) {
            if (this._valueMin() >= e)
                return this._valueMin();
            if (e >= this._valueMax())
                return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1,
                    i = (e - this._valueMin()) % t,
                    s = e - i;
            return 2 * Math.abs(i) >= t && (s += i > 0 ? t : -t), parseFloat(s.toFixed(5))
        },
        _calculateNewMax: function () {
            var e = this.options.max,
                    t = this._valueMin(),
                    i = this.options.step,
                    s = Math.floor(+(e - t).toFixed(this._precision()) / i) * i;
            e = s + t, this.max = parseFloat(e.toFixed(this._precision()))
        },
        _precision: function () {
            var e = this._precisionOf(this.options.step);
            return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))), e
        },
        _precisionOf: function (e) {
            var t = "" + e,
                    i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.max
        },
        _refreshValue: function () {
            var t, i, s, n, a, o = this.options.range,
                    r = this.options,
                    h = this,
                    l = this._animateOff ? !1 : r.animate,
                    u = {};
            this.options.values && this.options.values.length ? this.handles.each(function (s) {
                i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), u["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", e(this).stop(1, 1)[l ? "animate" : "css"](u, r.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
                    left: i + "%"
                }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
                    width: i - t + "%"
                }, {
                    queue: !1,
                    duration: r.animate
                })) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
                    bottom: i + "%"
                }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
                    height: i - t + "%"
                }, {
                    queue: !1,
                    duration: r.animate
                }))), t = i
            }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? 100 * ((s - n) / (a - n)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](u, r.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                width: i + "%"
            }, r.animate), "max" === o && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({
                width: 100 - i + "%"
            }, {
                queue: !1,
                duration: r.animate
            }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                height: i + "%"
            }, r.animate), "max" === o && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({
                height: 100 - i + "%"
            }, {
                queue: !1,
                duration: r.animate
            }))
        },
        _handleEvents: {
            keydown: function (t) {
                var i, s, n, a, o = e(t.target).data("ui-slider-handle-index");
                switch (t.keyCode) {
                    case e.ui.keyCode.HOME:
                    case e.ui.keyCode.END:
                    case e.ui.keyCode.PAGE_UP:
                    case e.ui.keyCode.PAGE_DOWN:
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, e(t.target).addClass("ui-state-active"), i = this._start(t, o), i === !1))
                            return
                }
                switch (a = this.options.step, s = n = this.options.values && this.options.values.length ? this.values(o) : this.value(), t.keyCode) {
                    case e.ui.keyCode.HOME:
                        n = this._valueMin();
                        break;
                    case e.ui.keyCode.END:
                        n = this._valueMax();
                        break;
                    case e.ui.keyCode.PAGE_UP:
                        n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                        if (s === this._valueMax())
                            return;
                        n = this._trimAlignValue(s + a);
                        break;
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (s === this._valueMin())
                            return;
                        n = this._trimAlignValue(s - a)
                }
                this._slide(t, o, n)
            },
            keyup: function (t) {
                var i = e(t.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), e(t.target).removeClass("ui-state-active"))
            }
        }
    })
});
$(function () {
    $("#login_pwd").keyup(function (event) {
        e = event ? event : (window.event ? window.event : null);
        if (e.keyCode == 13) {
            var pwd = $("#login_pwd").val();
            userLogin(pwd);
        }
    });
    $("#btn").click(function () {
        loading();
        checkConfig(loadingLay);
        setTimeout(function () {
            layer.close(loadingLay);
            layer.open({
                type: 1,
                title: false,
                shade: [0.7, '#000'],
                closeBtn: false,
                shadeClose: false,
                content: $("#lineOff"),
                skin: 'cy-class'
            });
        }, 2000);
    });
//重新检测
    $(".img2").live('click', function () {
        layer.closeAll();
        loading(1, '正在检测上网方式...');
        checkWanDetectLink();
    });

    $("#lineOffSet").live('click', function () {
        if (wanConfigJsonObject.mode != '' && typeof (wanConfigJsonObject.mode) != 'undefined') {
            checkWanDetect(wanConfigJsonObject.mode);
        } else {
            checkWanDetect(2);
        }
        layer.closeAll();
    });

    $("#lineOffConnect").live('click', function () {
        checkWanDetect(4);
        layer.closeAll();
    });
    $("#user_login").click(function () {
        if ($("#login_pwd").val() == '') {
            getMsg('请输入密码', 1, '#login_pwd');
            return;
        }
        var str = $("#login_pwd").val();
        $("#user_login").text('正在登录');
        $("#user_login").attr("disabled", true);
        userLogin(str);
    });
    $(".nav a").click(function () {
        $(this).addClass("selected").siblings("a").removeClass("selected");
        var id = $(this).attr("data-id"), mclass = '.sub';
        if (mob == 1) {
            mclass = '.sub-box';
        }
        $("#" + id + "_box").show().siblings(mclass).hide();
        if (id == 't_4') {
            getWifiList();
        }
    });
    $(".menu a").click(function () {
        $(this).addClass("selected").siblings("a").removeClass("selected");
        var id = $(this).attr("data-id");
        $("#" + id + "_box").show().siblings(".sub").hide();
        if (id == 'm_2') {
            if (!interval_flag) {
                clearInterval(intervalTimerCount);
                interval_flag = true;
            }
            checkSetting();
        } else if (id == 'm_3') {
            if (!interval_flag) {
                clearInterval(intervalTimerCount);
                interval_flag = true;
            }
            wifiGet('');
            wifiTxrateGet('get', 0);
            wifiGuestGet('get');
        } else if (id == 'm_5') {
            if (!interval_flag) {
                clearInterval(intervalTimerCount);
                interval_flag = true;
            }
            getLanDHCP();
        } else if (id == 'm_6') {
            if (!interval_flag) {
                clearInterval(intervalTimerCount);
                interval_flag = true;
            }
            getClientList();
        } else if (id == 'm_7') {
            if (!interval_flag) {
                clearInterval(intervalTimerCount);
                interval_flag = true;
            }
            setLedOnOff('get');
            checkVersion();
            getTimeRe();
        } else if (id == 'm_8') {
            if (!interval_flag) {
                clearInterval(intervalTimerCount);
                interval_flag = true;
            }
            system_log();
        } else if (id == 'm_9') {
            if (!interval_flag) {
                clearInterval(intervalTimerCount);
                interval_flag = true;
            }
            black_list();
        } else if (id == 'm_1' || id == 'm_4') {
            if (interval_flag) {
                intervalTimerCount = setInterval(function () {
                    router.getDynamicInfo();
                }, commonInterval);
                interval_flag = false;
            }
        }
    });
    $(".data2").click(function () {
        $("#setClient").addClass("selected").siblings("a").removeClass("selected");
        var id = 'm_4';
        $("#" + id + "_box").show().siblings(".sub").hide();
    });

    if (mob == 1) {
        $(".inpt").live("focusin", function () {
            $(this).siblings("label").hide();
        }).live("focusout", function () {
            if ($(this).val() == '') {
                $(this).siblings("label").show();
            }
        });
    }

    //输入框焦点
    $(".inpt").focusin(function () {
        $(this).siblings("label").hide();
    }).focusout(function () {
        if ($(this).val() == '') {
            $(this).siblings("label").show();
        }
    })
    $(".cannel").live("click", function () {
        layer.closeAll();
    })
    $(".macChoose").change(function () {
        var v = $(this).val();
        var typeId = $(this).attr('id');
        var Id = '';
        if (typeId == 'macChoose1') {
            Id = 1;
        } else if (typeId == 'macChoose2') {
            Id = 2;
        } else if (typeId == 'macChoose3') {
            Id = 3;
        }
        var macInpt = $(this).parent().siblings(".macInpt");
        if (v == 1) {
            macInpt.show();
            $(this).parent().siblings(".last").hide();
            $("#mac_box" + Id).hide();
        } else if (v == 2) {
            macInpt.hide();
            getHostRaMac(2, typeId);
        } else if (v == 3) {
            macInpt.hide();
            getHostRaMac(3, typeId);
        }
    });

    //宽带拨号 提交
    $("#btn_1").click(function () {

        var mac = '';
        var account = $("#acc").val();
        var passwd = $("#pwd").val();
        var server = $("#pppoe_server").val()||"";
        var modeclone = $("#macChoose1").val();
        var sd=$("#PpoeHightSet").text();
	    var mtu = $("#pp_mtu").val();
        var dns = $("#pp_dns").val();
        var dns1 = $("#pp_dns1").val();
        if(sd=="高级配置"){
            server="";
            mtu="1480";
            dns="";
            dns1="";
        }
        if (modeclone == 1) {
            mac = $("#macEnter1").val().toUpperCase();
            if (mac == '') {
                //mac = myMac;
            	getMsg("请输入MAC地址！");
            	return;
            }
        } else {
            mac = myMac;
        }
        if (mtu == '') {
            mtu = "1480";
        } else if (trim(mtu) != '') {
            if (/^[0-9]*[1-9][0-9]*$/.test(mtu) === false || mtu < 1000 || mtu > 1492) {
                getMsg('MTU取值范围为1000-1492', 1, '#pp_mtu');
                return;
            }
        }
        if (encodeURI(mtu).indexOf("%20")!="-1") {
            getMsg('MTU请输入合法数值', 1, '#pp_mtu');
            return;
        }
        if (getStrLength(server) > 31) {
            getMsg("服务号有误！", 1, '#pppoe_server');
            return;
        }

        if (dns != "") {
            if (!checkIP(dns)) {
                getMsg("DNS不合法！", 1, '#pp_dns');
                return;
            }
        }

        if (dns1 != "") {
            if (!checkIP(dns1)) {
                getMsg("备用DNS不合法！", 1, '#pp_dns1');
                return;
            }
        }

        if (trim(account) == '') {
            getMsg('请输入宽带账号', 1, '#acc');
            return;
        }

        if (account.indexOf("\"") > -1 || account.indexOf("'") > -1 || account.indexOf("\\") > -1) {
            getMsg("宽带账号不能包含 单双引号、反斜杠！", 1, "#acc");
            return;
        }
        if (getStrLength(account) > 31) {
            getMsg("宽带账号有误！", 1, '#acc');
            return;
        }
        if (trim(passwd) == '') {
            getMsg('请输入宽带密码', 1, '#pwd');
            return;
        }

        if (passwd.indexOf("\"") > -1 || passwd.indexOf("'") > -1 || passwd.indexOf("\\") > -1) {
            getMsg("宽带密码不能包含 单双引号、反斜杠！", 1, "#pwd");
            return;
        }
        if (getStrLength(passwd) > 31) {
            getMsg("宽带密码有误！", 1, '#pwd');
            return;
        }        
        if (!checkMac(mac)) {
            getMsg("MAC地址有误！");
            return;
        }
        if($("#checkstep").val() != 1){
	        account = encodeURIComponent(account);
	        passwd = encodeURIComponent(passwd);
	        server = encodeURIComponent(server);
	        mtu = encodeURIComponent(mtu);
	        $("#pppoe_message").text('');
	        setPPPOE(account, passwd, server, mac, mtu, dns, dns1, modeclone);
        }else{
            $("#step_1").hide();
            $("#step_2").hide();
            $("#step_3").show();
        }

    });

    //DHCP
    $("#btn_3").click(function () {

        var mac = '';
        var mtu = $("#dhcp_mtu").val();
        var dns = $("#dhcp_dns").val();
        var dns1 = $("#dhcp_dns1").val();
        var sd=$("#DhcpHightSet").text();
        var modeclone = $("#macChoose3").val();
        if(sd=="高级配置"){
            dns = "";
            dns1 = "";
            mtu = "1500";
        }
        if (modeclone == 1) {
            mac = $("#macEnter3").val().toUpperCase();
            if (mac == '') {
                //mac = myMac;
                getMsg("请输入MAC地址！");
                return;
            }
        } else {
            mac = myMac;
        }
        if (mtu == '') {
            mtu = "1500";
        } else if (trim(mtu) != '') {
            if (/^[0-9]*[1-9][0-9]*$/.test(mtu) === false || mtu < 1000 || mtu > 1500) {
                getMsg('MTU取值范围为1000-1500', 1, '#dhcp_mtu');
                return;
            }
        }
        if (encodeURI(mtu).indexOf("%20")!="-1") {
            getMsg('MTU请输入合法数值', 1, '#dhcp_mtu');
            return;
        }
        if (dns != "") {
            if (!checkIP(dns)) {
                getMsg("DNS不合法！", 1, '#dhcp_dns');
                return;
            }
        }

        if (dns1 != "") {
            if (!checkIP(dns1)) {
                getMsg("备用DNS不合法！", 1, '#dhcp_dns1');
                return;
            }
        }

        if (!checkMac(mac)) {
            getMsg("MAC地址有误！");
            return;
        }

        if($("#checkstep").val() != 1){
            var fn=function(){
                mtu = encodeURIComponent(mtu);
                setDHCP(mac, mtu, dns, dns1, modeclone);                
            }
            showNetTip(fn);
        }else{
            $("#step_1").hide();
            $("#step_2").hide();
            $("#step_3").show();
        }

    });

    //3g
    $("#btn_5").click(function () {
        setThreeG();
    });

    //STATIC
    $("#btn_2").click(function () {

        var mac = '';
        var static_ip = $("#static_ip").val();
        var static_mask = $("#static_mask").val();
        var static_gw = $("#static_gw").val();
        var static_dns = $("#static_dns").val();
        var static_dns1 = $("#static_dns1").val();
        var modeclone = $("#macChoose2").val();
        var mtu = $("#static_mtu").val();
        var sd=$("#StaticHightSet").text();
        if (sd=="高级配置") {
            static_dns="";
            static_dns1="";
            mtu="1500";
        }
        if (modeclone == 1) {
            mac = $("#macEnter2").val().toUpperCase();
            if (mac == '') {
                //mac = myMac;
            	getMsg("请输入MAC地址！");
            	return;
            }
        } else {
            mac = myMac;
        }

        if (mtu == '') {
            mtu = "1500";
        } else if (trim(mtu) != '') {
            if (/^[0-9]*[1-9][0-9]*$/.test(mtu) === false || mtu < 1000 || mtu > 1500) {
                getMsg('MTU取值范围为1000-1500', 1, '#static_mtu');
                return;
            }
        }
        if (encodeURI(mtu).indexOf("%20")!="-1") {
            getMsg('MTU请输入合法数值', 1, '#static_mtu');
            return;
        }
        if (!checkIP(static_ip)||getIPArray(static_ip)[3]=='255') {
            getMsg("IP地址不合法！", 1, '#static_ip');
            return;
        }

        if (!checkMask(static_mask)) {
            getMsg("子网掩码不合法！", 1, '#static_mask');
            return;
        }

        if (!checkIP(static_gw)) {
            getMsg("默认网关不合法！", 1, '#static_gw');
            return;
        }

        if (static_dns != "") {
            if (!checkIP(static_dns)) {
                getMsg("DNS不合法！", 1, '#static_dns');
                return;
            }
        }

        if (static_dns1 != "") {
            if (!checkIP(static_dns1)) {
                getMsg("备用DNS不合法！", 1, '#static_dns1');
                return;
            }
        }

        if (static_ip == static_gw) {
            getMsg("IP地址或默认网关设置有误！");
            return;
        }

        if (!validateNetwork(static_ip, static_mask, static_gw)) {
            getMsg("IP地址+子网掩码+默认网关设置错误！");
            return;
        }

        if (validateNetwork(static_ip, static_mask)) {
            getMsg("IP地址设置错误！", 1, '#static_ip');
            return;
        }

        if (!checkMac(mac)) {
            getMsg("MAC地址有误！");
            return;
        }
        if($("#checkstep").val() != 1){
            var fn=function(){
                mtu = encodeURIComponent(mtu);
                setStatic(static_ip, static_mask, static_gw, static_dns, static_dns1, mac, mtu, modeclone);
            }
            showNetTip(fn);
        }else{
            $("#step_1").hide();
            $("#step_2").hide();
            $("#step_3").show();
        }

    });

    //WISP
    $("input[name=wifiRadio]").live('click', function () {
        $("#security").val('');
        $("#channel").val('');
        $("#wf_pwd").val('');
        $("#wf_name").text($(this).val());
        var ssid = $(this).val();
        var sec = $(this).attr("sec");
        var channel = $(this).attr("channel");
        if (sec == 'NONE') {
            if (!$("#enter_pwd").hasClass('hide')) {
                $("#enter_pwd").addClass("hide");
                $("#enter_pwd").removeClass('show');
            }
        } else {
            if (!$("#enter_pwd").hasClass('show')) {
                $("#enter_pwd").addClass("show");
                $("#enter_pwd").removeClass('hide');
            }
        }
        $("#security").val(sec);
        $("#channel").val(channel);
    });

    $("#btn_4").live("click", function () {
        var choice = $("#getWifiList").find('input[name=wifiRadio]:selected').length;
        var wf_name = $("#wf_name").text();
        var wf_pwd = $("#wf_pwd").val();
        var mac = myMac;
        var channel = $("#channel").val();
        var sec = $("#security").val();
        if (choice < 1 && (wf_name == '' || wf_name == '请选择' || typeof (wf_name) == 'undefined')) {
            getMsg('请选择或者添加网络！');
            return;
        }
        if (!$("#enter_pwd").hasClass("hide")) {
            if (wf_pwd.length < 1) {
                getMsg('请输入无线密码！', 1, '#wf_pwd');
                return;
            }
            if (wf_pwd.length > 0 && wf_pwd.length < 6 || wf_pwd.length > 31) {
                getMsg('无线密码不能少于6位且不能大于31位！', 1, '#wf_pwd');
                return;
            }
        }
        if (wf_pwd == null || wf_pwd == '') {
            wf_pwd = 'NONE';
            sec = 'NONE';
        }
        wf_name = encodeURIComponent(wf_name);
        wf_pwd = encodeURIComponent(wf_pwd);

        //var w = wifisetconfirm(4);
        //if (w === false) {
        //    return false;
        //} else {
            connectWisp(wf_name, wf_pwd, mac, channel, sec);
        //}
    });
    $("#wifi_set_confirm").click(function () {
        var ssid = trim($("#wf_nameset").val());
        var pwd = $("#wf_pwdset").val();
        var channel = $("#wifiChannel").val();
        var wifiBandwidth = $("#wifiBandwidth").val();
        var hidden_ssid = 0;
        if ($("#hidden_ssid").attr('checked')) {
            hidden_ssid = 1;
        }
        if (ssid == '') {
            getMsg('请输入无线名称！', 1, '#wf_nameset');
            return;
        }
        if (getStrLength(ssid) > 31 || encodeURI(ssid).indexOf("%20")!="-1" || /[\':;*?~`!@#$%^&+={}\[\]\<\\(\),\.\。\，]/.test(ssid)) {
            getMsg('无线名称长度不得超过31位字符或者包含特殊字符！', 1, '#wf_nameset');
            return;
        }

        if (pwd.length > 0) {
            if (pwd.length > 31 || pwd.length < 8) {
                getMsg('密码长度不能超过31位或不能少于8位！', 1, '#wf_pwdset');
                return;
            }
            if (escape(pwd).indexOf("%u") != -1 || encodeURI(pwd).indexOf("%20")!="-1" || /[\'\"{}\[\]]/.test(pwd)) {
                getMsg('密码不能包含中文字符或者特殊字符！', 1, '#wf_pwdset');
                return;
            }
        }
        ssid = encodeURIComponent(ssid);
        pwd = encodeURIComponent(pwd);
        setWifiAp(ssid, pwd, channel, hidden_ssid, wifiBandwidth);
    });
    $(".ssid_add").live("click", function () {
        loading(1, $("#ssid_connect"), 1);
    });

    //确认 添加隐藏ssid
    $("#ssid_confirm").live('click', function () {
        var ssid = $("#ssid").val();
        var pwd = $("#ssid_pwd").val();
        var channel = $("#check_channel").val();
        var check_wpa = $("#check_wpa").val();
        var mac = myMac;
        if (ssid == '' || ssid == null) {
            getMsg('请输入无线名称！', 1, '#ssid');
            return;
        }
        if (getStrLength(ssid) > 31) {
            getMsg('无线名称不能超过31位！', 1, '#ssid');
            return;
        }
        if (!$("#pwd_li").hasClass("hide") && pwd.length < 1) {
            getMsg('请输入无线密码！', 1, '#ssid_pwd');
            return;
        }
        if (pwd.length > 0 && pwd.length < 6 || pwd.length > 31) {
            getMsg('无线密码不能少于6位且不能大于31位！', 1, '#ssid_pwd');
            return;
        }
        //保存ssid信息
        $("#m_ssid").val(ssid);
        $("#m_pwd").val(pwd);
        $("#m_channel").val(channel);
        $("#m_sec").val(check_wpa);

        layer.closeAll();
        if($("#checkstep").val() != 1){
            var fn=function(){
                ssid = encodeURIComponent(ssid);
                pwd = encodeURIComponent(pwd);
                connectWisp(ssid, pwd, mac, channel, check_wpa);
            }
            showNetTip(fn);
        }else{
            $("#step_1").hide();
            $("#step_2").hide();
            $("#step_3").show();
        }
    });
    $("#check_wpa").live("change", function () {
        if ($(this).val() == 1) {
            $("#pwd_li").addClass("hide");
        } else {
            $("#pwd_li").removeClass("hide");
        }
    });
    $("#getWifiList tr").live("click", function () {
        var lock = $(this, 'td div').find('i').hasClass('lock');
        if (mob == 1) {
            lock = $(this, 'li').find('i').hasClass('lock');
        }
        if (lock != true) {
            $("#have_pwd").addClass("hide");
        } else {
            $("#have_pwd").removeClass("hide");
        }
        var ssid = $(this).attr('ssid');
        var channel = $(this).attr("channel");
        var sec = $(this).attr('sec');
        $("#wf_name").text(ssid);
        $("#cyname").text(ssid);
        $("#channel").val(channel);
        $("#data_sec").val(sec);
        loading(0, $("#wifi_zj"), 1);
    });
    $("#wifi_zj_confirm").click(function () {
        $("#ssid").val("");//选择列表时，清空手动填的ssid    	
        var ssid = $("#cyname").text();
        var wf_pwd = $("#wf_pwd").val();
        var sec = $("#data_sec").val();
        var channel = $("#channel").val();
        var mac = myMac;
        ssid = encodeURIComponent(ssid);
        if (!$("#have_pwd").hasClass("hide")) {
            if (wf_pwd == '') {
                getMsg('请输入无线密码！', 1, '#wf_pwd');
                return;
            }
            if (wf_pwd.length > 0 && wf_pwd.length < 6 || wf_pwd.length > 31) {
                getMsg('无线密码不能少于6位且不能大于31位！', 1, '#wf_pwd');
                return;
            }
        }
        wf_pwd = encodeURIComponent(wf_pwd);
        if (wf_pwd == null || wf_pwd == '') {
            wf_pwd = 'NONE';
            sec = 'NONE';
        }
        layer.closeAll();
        if($("#checkstep").val() != 1){
            var fn=function(){
                connectWisp(ssid, wf_pwd, mac, channel, sec);
            }
            showNetTip(fn);
        }else{
            $("#step_1").hide();
            $("#step_2").hide();
            $("#step_3").show();
        }
    });


    $('#lan_ip').live('input propertychange', function() {
        if (checkIP($("#lan_ip").val())) {
            var start_IP=$("#lan_ip_start").val();
            var end_IP=$("#lan_ip_end").val();
            var IP=$("#lan_ip").val();
            
            var start_IPArray=getIPArray(start_IP);
            var end_IPArray=getIPArray(end_IP);
            var IPArray=getIPArray(IP);

            var change_start_IP=IPArray[0]+"."+IPArray[1]+"."+IPArray[2]+"."+(start_IPArray[3]||"50");
            var change_end_IP=IPArray[0]+"."+IPArray[1]+"."+IPArray[2]+"."+(end_IPArray[3]||"249");

            $("#lan_ip_start").val(change_start_IP).siblings("label").hide();
            $("#lan_ip_end").val(change_end_IP).siblings("label").hide();

        }
    });


    $('#lan_ip_start').live('input propertychange', function() {
        if (checkIP($("#lan_ip_start").val())) {
            var start_IP=$("#lan_ip_start").val();
            var end_IP=$("#lan_ip_end").val();
            var IP=$("#lan_ip").val();
            
            var start_IPArray=getIPArray(start_IP);
            var end_IPArray=getIPArray(end_IP);
            var IPArray=getIPArray(IP);

            var change_IPArray=start_IPArray[0]+"."+start_IPArray[1]+"."+start_IPArray[2]+"."+(IPArray[3]||"1");
            var change_end_IP=start_IPArray[0]+"."+start_IPArray[1]+"."+start_IPArray[2]+"."+(end_IPArray[3]||"249");

            $("#lan_ip").val(change_IPArray).siblings("label").hide();
            $("#lan_ip_end").val(change_end_IP).siblings("label").hide();

        }
    });

    $('#lan_ip_end').live('input propertychange', function() {
        if (checkIP($("#lan_ip_end").val())) {
            var start_IP=$("#lan_ip_start").val();
            var end_IP=$("#lan_ip_end").val();
            var IP=$("#lan_ip").val();
            
            var start_IPArray=getIPArray(start_IP);
            var end_IPArray=getIPArray(end_IP);
            var IPArray=getIPArray(IP);

            var change_IPArray=end_IPArray[0]+"."+end_IPArray[1]+"."+end_IPArray[2]+"."+(IPArray[3]||"1");
            var change_statr_IP=end_IPArray[0]+"."+end_IPArray[1]+"."+end_IPArray[2]+"."+(start_IPArray[3]||"50");

            $("#lan_ip").val(change_IPArray).siblings("label").hide();
            $("#lan_ip_start").val(change_statr_IP).siblings("label").hide();

        }
    });
    $("#lan_btn").click(function () {
        var ip = $("#lan_ip").val();
        var ipMark = $("#lanIpMark").val();
        var mask = $("#lan_mask").val();
        var ip_start = $("#lan_ip_start").val();
        var ip_end = $("#lan_ip_end").val();
        var dhcponoff = 1;
        var lan_dns1 = $("#lan_dns1").val();
        var lan_dns2 = $("#lan_dns2").val();
	    if (typeof (wanInfoJsonObject)=='undefined') {
	        getWanInfoJsonObject();
	    }
	    var wan_ip=wanInfoJsonObject.ip;
        var IPArray = getIPArray(ip);
        var wanIPArray = getIPArray(wan_ip);

        var _iparray=IPArray[0]+"."+IPArray[1]+"."+IPArray[2];
        var _waniparray=wanIPArray[0]+"."+wanIPArray[1]+"."+wanIPArray[2];

            
        if(_iparray==_waniparray){
            if(mob==0){
            	getMsg("IP地址与上层路由IP冲突！", 1, '#lan_ip');
            }else{
				getMsg("IP地址与上层路由IP冲突！");
            }
            return;
        }

        /*自动配置起始结束ip 20160831*/

        ip_start = ip_start||IPArray[0]+"."+IPArray[1]+"."+IPArray[2]+"."+"50";

        ip_end = ip_end||IPArray[0]+"."+IPArray[1]+"."+IPArray[2]+"."+"249";

        /*自动配置起始结束ip 20160831*/
        
		if (mob == 1) {
            if ($(".swichBtn").hasClass('close-btn')) {
                dhcponoff = 0;
            }
        } else {
            if (!$("#dhcp_onoff").hasClass('switch3 open3')) {
                dhcponoff = 0;
            }
        }
        
        if (!checkIP(ip)||getIPArray(ip)[3]>248) {
            getMsg("IP地址不合法！", 1, '#lan_ip');
            return;
        }
        if (!checkIP(ip_start)) {
            getMsg("起始IP地址不合法！", 1, '#lan_ip_start');
            return;
        }
        if (!checkIP(ip_end)) {
            getMsg("终止IP地址不合法！", 1, '#lan_ip_end');
            return;
        }
        if (!checkMask(mask)) {
            getMsg("子网掩码不合法！", 1, '#lan_mask');
            return;
        }

        if (lan_dns1 != "") {
            if (!checkIP(lan_dns1)) {
                getMsg("DNS不合法！", 1, '#lan_dns1');
                return;
            }
        }

        if (lan_dns2 != "") {
            if (!checkIP(lan_dns2)) {
                getMsg("备用DNS不合法！", 1, '#lan_dns2');
                return;
            }
        }


//        if (ip_start == ip || ip_end == ip) {
//            getMsg("起始IP地址或终止IP地址不能与IP地址相同！");
//            return;
//        }


        if (ip_start == ip_end) {
            getMsg("起始IP地址与终止IP地址不能相同！");
            return;
        }
        var ip_startthird = ip_start.split('.')[3];
        var ip_endthird = ip_end.split('.')[3];
        if (Number(ip_startthird) >= Number(ip_endthird)) {
            getMsg("起始IP地址配置错误！");
            return;
        }
        if (!isEqualIPAddress(ip_start, ip, mask)) {
            getMsg("起始IP地址与IP地址不在同一网段！", 1, '#lan_ip_start');
            return;
        }
        if (!isEqualIPAddress(ip_start, ip_end, mask)) {
            getMsg("起始IP地址与终止IP地址不在同一网段！", 1, '#lan_ip_start');
            return;
        }
        var fn=function(){
            $("#lan_btn").attr('disabled', true);
            if (ip != ipMark) {
                $("#lan_btn").val('配置中');
                setTimeout(function () {
                    $("#lan_btn").val('确 定');
                    document.location = 'http://' + document.domain;
                }, 15000);
            }
            loading(3, '正在配置...');
            setLanDHCP(ip, mask, ip_start, ip_end, dhcponoff, ipMark, lan_dns1, lan_dns2);
        }
        showNetTip(fn);
    });





    /*IP转换为数组 ["192","168","10","1"] 模式*/
    function getIPArray(ip){
        return ip.split(/\./,4);
    }

    /*取随机数*/
    function GetRandomNum(Min,Max){   
        var Range = Max - Min;   
        var Rand = Math.random();   
        return(Min + Math.round(Rand * Range));   
    }





    /*************** internetType end**********************/



    /*************** getAccountInfo **********************/
    //获取宽带账号密码
    $("#goGet").click(function () {
        loading(1, $("#accountLayer"), 1);
    });
    //取消按钮
    $("#cannel").click(function () {
    	window.location.reload();
        layer.closeAll();
    });

    $("#net_work").click(function () {
        var account = $("#account_get").text();
        var pwd = $("#pwd_get").text();
        window.location.href = 'index.html?acc=' + account + "&pwd=" + pwd;
    });



    $(".data").click(function () {
        $(".menu a:eq(3)").trigger("click");
    })

    /***************** 无线设置 **********************/
//    $("#swichNav a").click(function() {
//        $("#swichDiv").toggle();
//    })
    $("#wf_time_nav a").click(function () {
        $("#wf_time_div").toggle();
    })
    var chks = $("input[name='day']");
    $("#day0").click(function () {
        if ($(this).attr("checked") == "checked") {
            chks.attr("checked", "checked");
        } else {
            chks.removeAttr("checked");
        }
    });
    chks.click(function () {
        var i = 0;
        chks.each(function (index) {
            if ($(this).attr('checked')) {
                i++;
            }
        });
        if (i == 7) {
            $("#day0").attr("checked", "checked");
        } else {
            $("#day0").removeAttr("checked");
        }
    });

    /***************** 无线设置 end**********************/

    /***************** 终端控制 **********************/

    //编辑名称
//    $(".edit").live("click", function() {
//        $(this).parents("tr").find(".name").children("input").removeAttr("readonly").removeClass("nameInpt").select();
//    })
//    $(".name").find("input").live("focusout", function() {
//        $(this).attr("readonly", "readonly");
//        $(this).addClass("nameInpt");
//    })



    //下载、上传限速
    /*   $(".limit").live("focusin", function() {
     $(this).select();
     $(this).val($(this).val().replace(/[Mbps]+$/, ""));
     }).live("focusout", function() {
     if ($(this).val() == "无限制") {
     $(this).val('无限制');
     } else if (isNaN($(this).val())) {
     $(this).val('');
     } else if ($(this).val() > 10) {
     $(this).val('10Mbps');
     $(this).parent().siblings(".progress").slider("value", 10);
     } else if ($(this).val() < 0) {
     $(this).val("无限制");
     $(this).parent().siblings(".progress").slider("value", 0);
     } else {
     var v = $(this).val();
     if (v != '') {
     $(this).val(v + "Mbps");
     $(this).parent().siblings(".progress").slider("value", v);
     }
     
     }
     })*/

    /*进度条*/
    /* for (var i = 1; i <= 10; i++) {
     $("#slider_" + i).slider({
     range: "min",
     step: 0.5,
     value: 3,
     min: 0.5,
     max: 10,
     slide: function(event, ui) {
     $(this).siblings().find("input").val(ui.value + "Mbps");
     }
     });
     }*/

    //开关
    $(".switch2").live("click", function () {
        $(this).toggleClass("open2");
    });
    $(".switch3").live("click", function () {
        $(this).toggleClass("open3");
    });
    $(".switch4").live("click", function () {
        $(this).toggleClass("open4");
        var action = 'add';
        if (!$(this).hasClass('switch4 open4')) {
            action = 'del';
        }
        var mac = $(this).attr('data').toUpperCase();
        wifiGuestList('set', mac, action);
    });

    $(".swichBtn").click(function () {
        $(this).toggleClass("close-btn");
    });

    $("#devices tr").find('div').live("click", function () {
        if ($(this).hasClass('editBtn remove') == true) {
            var mac = $(this).parents("tr").attr("mac");
            var tr = $(this).parents('tr').index();
            removeDownClient(tr, mac);
        }
    });
    $("#add_nat").click(function () {
        var mac = $("#client_list").find("option:selected").attr("mac");
        var out_port = $("#dk_out").val();
        var in_port = $("#dk_inner").val();
        var proto = $("#protocol").val();
        var enable = $("#nat_enable").hasClass('switch2 open2');
        if (enable == true) {
            enable = 1;
        } else {
            enable = 0;
        }
        if (isNaN(out_port) || out_port > 65535 || out_port <= 0) {
            getMsg('请输入正确的外网端口！', 1, '#dk_out');
            return;
        }
        if (isNaN(in_port) || in_port > 65535 || in_port <= 0) {
            getMsg('请输入正确的内网端口！', 1, '#dk_inner');
            return;
        }
        hostNatList('set', mac, 'add', out_port, in_port, proto, enable);
    });

    //确认 设置用户名 密码
    $("#user_confirm").live('click', function () {
        var oldpwd = $("#oldpwd").val();
        if (oldpwd == '') {
            getMsg('请输入旧密码！', 1, '#oldpwd');
            return;
        }
        var name = 'admin';
        var str_md5 = $.md5(name + oldpwd);
        var flag = true;
        $.ajax({
            type: "POST",
            url: actionUrl + "fname=system&opt=login&function=set&usrid=" + str_md5,
            dataType: "JSON",
            async: false,
            success: function (data) {
                if (data.error != 0) {
                    flag = false;
                }
            }
        });
        if (flag == false) {
            getMsg('旧密码验证错误！', 1, '#oldpwd');
            return;
        }
        var pwd = trim($("#userpwd").val());
        if (pwd == '') {
            getMsg('请输入密码！', 1, '#userpwd');
            return;
        }
        if (trim($("#userpwd2").val()) != pwd) {
            getMsg('两次密码不一致！', 1, '#userpwd2');
            return;
        }

        if (oldpwd == pwd) {
            getMsg('新密码和旧密码相同！', 1, '#userpwd');
            return;
        }

        if (pwd.length > 15 || pwd.length < 5) {
            getMsg('密码长度不能超过15位或者小于5位！');
            return;
        }

        if (escape(pwd).indexOf("%u") != -1 || /[\':;*?~`!@#$%^&+={}\[\]\<\\(\),\.\。\，]/.test(pwd)) {
            getMsg('密码不能包含中文字符或者特殊字符！', 1, "#userpwd");
            return;
        }
        setUserAccount(pwd);
    });

    $("#led_on").click(function () {
        setLedOnOff('set', 'on');
    });
    $("#led_off").click(function () {
        setLedOnOff('set', 'off');
    });
    $("#restart").click(function () {
        if (mob == 1) {
            layer.closeAll();
            layer.open({
                content: '确定要重启路由器么？',
                btn: ['确认', '取消'],
                shadeClose: false,
                yes: function () {
                    routerRestart('reboot');
                    $("#restart").val("正在重启...").attr("disabled","true");
                }
            });
        } else {
            layer.confirm('确定要重启路由器么？', function (i) {
                routerRestart('reboot');
                layer.close(i);
                $("#restart").val("正在重启...").attr("disabled","true");
            });
        }
    });

    $("#reback").click(function () {
        if (mob == 1) {
            layer.closeAll();
            layer.open({
                content: '确定要恢复出厂设置么？',
                btn: ['确认', '取消'],
                shadeClose: false,
                yes: function () {
                    routerRestart('default');
                    $("#reback").val("正在恢复出厂设置...").attr("disabled","true");
                }
            });
        } else {
            layer.confirm('确定要恢复出厂设置么？', function (i) {
                routerRestart('default');
                layer.close(i);
                $("#reback").val("正在恢复出厂设置...").attr("disabled","true");
            });
        }
    });
    $("#wifi_on").click(function () {
        $("#swichDiv").show();
        var startHour = $("#startHour").val();
        var startMin = $("#startMin").val();
        var endHour = $("#endHour").val();
        var endMin = $("#endMin").val();
        var week = '';
        if ($("input[name=dayAll]").attr('checked')) {
            week = '1111111';
        } else {
            $("input[name=day]").each(function () {
                if ($(this).attr('checked')) {
                    week += '1';
                } else {
                    week += '0';
                }
            });
        }
        var time_on = 0;
        if ($("#wifiTimeOn").hasClass('selected')) {
            time_on = 1;
        }
        wifiSet(1, time_on, week, startHour, startMin, endHour, endMin);
    });
    $("#wifi_off").click(function () {
        var startHour = $("#startHour").val();
        var startMin = $("#startMin").val();
        var endHour = $("#endHour").val();
        var endMin = $("#endMin").val();
        var week = '';
        if ($("input[name=dayAll]").attr('checked')) {
            week = '1111111';
        } else {
            $("input[name=day]").each(function () {
                if ($(this).attr('checked')) {
                    week += '1';
                } else {
                    week += '0';
                }
            });
        }
        var time_on = 0;
        if ($("#wifiTimeOn").hasClass('selected')) {
            time_on = 1;
        }

        wifiSet(0, time_on, week, startHour, startMin, endHour, endMin, '');
    });
    $("#rate_mode_1").click(function () {
        wifiTxrateGet('set', 30);
    });
    $("#rate_mode_2").click(function () {
        wifiTxrateGet('set', 60);
    });
    $("#rate_mode_3").click(function () {
        wifiTxrateGet('set', 100);
    });
    $("#guest_on").click(function () {
        wifiGuestGet('set', 1);
    });
    $("#guest_off").click(function () {
        wifiGuestGet('set', 0);
    });
    $("#reGuestList").live('click', function () {
        wifiGuestList('get');
    });
    $("#wifiTimeOn").click(function () {
        $("#wifiTimeOn").addClass('selected');
        $("#wifiTimeOff").removeClass('selected');
        $("#wf_time_div").show();
    });
    $("#wifiTimeOff").click(function () {
        $("#wf_time_div").hide();
        var startHour = $("#startHour").val();
        var startMin = $("#startMin").val();
        var endHour = $("#endHour").val();
        var endMin = $("#endMin").val();
        var week = '';
        if ($("input[name=dayAll]").attr('checked')) {
            week = '1111111';
        } else {
            $("input[name=day]").each(function () {
                if ($(this).attr('checked')) {
                    week += '1';
                } else {
                    week += '0';
                }
            });
        }
        wifiSet(1, 0, week, startHour, startMin, endHour, endMin, '');
    });
    $("#client_list").live('change', function () {
        var mac = $(this).find("option:selected").attr("mac");
        hostNatList('get', mac, 'dump');
    });
    $("#wifiTimeConfirm").click(function () {
        var startHour = $("#startHour").val();
        var startMin = $("#startMin").val();
        var endHour = $("#endHour").val();
        var endMin = $("#endMin").val();
        var week = '';
        if ($("input[name=dayAll]").attr('checked')) {
            week = '1111111';
        } else {
            $("input[name=day]").each(function () {
                if ($(this).attr('checked')) {
                    week += '1';
                } else {
                    week += '0';
                }
            });
        }
        var time_on = 0;
        if ($("#wifiTimeOn").hasClass('selected')) {
            time_on = 1;
        }
        if (startHour == endHour && startMin == endMin) {
            getMsg('关闭WIFI时间段设置错误！');
            return;
        }
        if(startHour > endHour && time_on == 1){
            getMsg('WIFI时间段设置错误！');
            return;
        }
        if(startHour == endHour && startMin > endMin && time_on == 1){
            getMsg('WIFI时间段设置错误！');
            return;
        }          
        if (week == '0000000') {
            getMsg('请勾选星期');
            return;
        }
        wifiSet(1, 1, week, startHour, startMin, endHour, endMin, '');
    });
    $(".del_nat").live('click', function () {
        var mac = $("#client_list").find("option:selected").attr("mac");
        var out_port = $(this).parent('tr').children().eq(0).text();
        var in_port = $(this).parent('tr').children().eq(1).text();
        var proto = $(this).parent('tr').children().eq(2).text();
        var enable = $(this).parent('tr').children().eq(3).find('div i').hasClass('switch2 open2');
        var tr = $(this).parents('tr').index();
        proto = changeTuNum(proto);
        if (enable == true) {
            enable = 1;
        } else {
            enable = 0;
        }
        hostNatList('set', mac, 'del', out_port, in_port, proto, enable, tr);
    });
    $(".mod_nat").live('click', function () {
        var mac = $("#client_list").find("option:selected").attr("mac");
        var out_port = $(this).parent('tr').children().eq(0).text();
        var in_port = $(this).parent('tr').children().eq(1).text();
        var proto = $(this).parent('tr').children().eq(2).text();
        var enable = $(this).parent('tr').children().eq(3).find('div i').hasClass('switch2 open2');
        proto = changeTuNum(proto);
        if (enable == true) {
            enable = 1;
        } else {
            enable = 0;
        }
        hostNatList('set', mac, 'mod', out_port, in_port, proto, enable);
    });
    $('#PpoeHightSet').click(function () {
        $(".pp").find('li').each(function (index) {
            if (index > 1) {
                if ($(this).is(':visible') == false) {
                    $(this).show();
                    $("#PpoeHightSet").text('简单配置');
                } else {
                    $(this).hide();
                    // $(this).find('input').val('').siblings("label").show();
                    // $(this).find('select').val(3);
                    // $(this).find("option:selected").text('出厂MAC');
                    // if ($(this).find("span").length == 3) {
                    //     $(this).find("span").last().hide();
                    // }
                    $("#PpoeHightSet").text('高级配置');
                }
            }
        });
    });

    $('#StaticHightSet').click(function () {
        $(".stat").find('li').each(function (index) {
            if (index > 2) {
                if ($(this).is(':visible') == false) {
                    $(this).show();
                    $("#StaticHightSet").text('简单配置');
                } else {
                    $(this).hide();
                    // $(this).find('input').val('').siblings("label").show();
                    // $(this).find('select').val(3);
                    // $(this).find("option:selected").text('出厂MAC');
                    // if ($(this).find("span").length == 3) {
                    //     $(this).find("span").last().hide();
                    // }
                    $("#StaticHightSet").text('高级配置');
                }
            }
        });
    })
    $('#DhcpHightSet').click(function () {
        $(".dh").find('li').each(function (index) {
            if ($(this).is(':visible') == false) {
                $(this).show();
                $("#DhcpHightSet").text('简单配置');
            } else {
                $(this).hide();
                // $(this).find('input').val('').siblings("label").show();
                // $(this).find('select').val(3);
                // $(this).find("option:selected").text('出厂MAC');
                // if ($(this).find("span").length == 3) {
                //     $(this).find("span").last().hide();
                // }
                $("#DhcpHightSet").text('高级配置');
            }
        });
    });

    $("#buy_on").click(function () {
        getSetPrice('set', 1);
    });

    $("#buy_off").click(function () {
        getSetPrice('set', 0);
    });

    $("#getPriceSet").click(function () {
//        $(this).toggleClass("close-btn");
        if ($(this).hasClass('close-btn')) {
            getSetPrice('set', 0);
        } else {
            getSetPrice('set', 1);
        }
    });
    $("#getlog").click(function () {
        system_log();
    });

    $("#exportlog").click(function () {
        system_log(1);
    });

    $("#exportdebug").click(function () {
        getParameter('on');
    });

    //添加黑名单
    $("#add_black").click(function () {
        layer.open({
            type: 1,
            title: false,
            shade: [0.7, '#000'],
            closeBtn: false,
            shadeClose: false,
            content: $("#addBlackList"),
            skin: 'cy-class'
        });
    });

    $(".blackSure").click(function () {
        var mac = $("#black_mac").val();
        if (!checkMac(mac)) {
            getMsg("MAC地址有误！", 1, '#black_mac');
            return;
        }
        edit_black_list(mac, '');
    });

    $(".pink").live('click', function () {
        var index = $(this).parents('tr').index();
        edit_black_list('', index, 'del');
    });



/*定时重启*/
    
    $("#wifiTimeOnre").click(function () {
        $("#wifiTimeOnre").addClass('selected');
        $("#wifiTimeOffre").removeClass('selected');
        $("#wf_time_nav_ree").show();
        $("#wf_time_re_div").show();
    });

    $("#wifiTimeOffre").click(function () {
        var startHour = $("#startHourre").val();
        var startMin = $("#startMinre").val();
        var loop = 1;
        if ($("#wifiTimeOffree").hasClass('selected') === true) {
            loop = 0;
        }
        var week = '', i = 0;
        if ($("input[name=daAll]").attr('checked')) {
            week = '1111111';
        } else {
            $("input[name=da]").each(function () {
                if ($(this).attr('checked')) {
                    if (loop == 0) {
                        i++;
                    }
                    week += '1';
                } else {
                    week += '0';
                }
            });
        }
//        if ((i > 1 || week == '1111111') && loop == 0) {
//            getMsg('循环重启关闭,只能选择一天');
//            return;
//        }

        setTimeRe(0, loop, week, startHour, startMin);
    });
    $("#reTimeConfirm").click(function () {
        var startHour = $("#startHourre").val();
        var startMin = $("#startMinre").val();
        var loop = 1;
        if ($("#wifiTimeOffree").hasClass('selected') === true) {
            loop = 0;
        }
        var week = '';
        var i = 0;
        if ($("input[name=daAll]").attr('checked')) {
            week = '1111111';
        } else {
            $("input[name=da]").each(function () {
                if ($(this).attr('checked')) {
                    if (loop == 0) {
                        i++;
                    }
                    week += '1';
                } else {
                    week += '0';
                }
            });
        }
        if ((i > 1 || week == '1111111') && loop == 0) {
            getMsg('循环重启关闭,只能选择一天');
            return;
        }
        if (week == '0000000') {
            getMsg('请勾选星期');
            return;
        }
        setTimeRe(1, loop, week, startHour, startMin);
    });

    var chksre = $("input[name='da']");
    $("#dy0").click(function () {
        if ($(this).attr("checked") == "checked") {
            chksre.attr("checked", "checked");
        } else {
            chksre.removeAttr("checked");
        }
    });
    for (var i = 1; i <= chksre.length; i++) {
        $("#dy" + i).click(function () {
            $("#dy0").removeAttr("checked");
        })
    }

/*定时重启*/

//登录密码输入框新规则 start

	if(window.ActiveXObject) {
	  $("#login_pwd").keydown(function(){
	  	$('#login_pwd_label').hide();
	  })
	  $("#login_pwd").blur(function(){
	  	if($(this).val()==""){
	  		$('#login_pwd_label').show();
	  	}
	  })
	}else{
		$('#login_pwd').live('input propertychange', function() {
			if($(this).val()!=""){
				$('#login_pwd_label').hide();
			}else{
				$('#login_pwd_label').show();
			}
		})
	}

//登录密码输入框新规则 end

//设置向导 20161115
    
    $(".set-nav a").click(function () {
        $(this).addClass("selected").siblings("a").removeClass("selected");
        // var id = $(this).attr("mode"), mclass = '.sub';
        // if (mob == 1) {
        //     mclass = '.sub-box';
        // }
        // $("#" + id + "_box").show().siblings(mclass).hide();
        // if (id == 't_4') {
        //     getWifiList();
        // }
    });
    
    //下一步
    $("#gostep2").click(function(){
        $("#step_1").hide();
        $("#step_2").show();
        checkedWanState = $(".set-nav a.selected").attr("mode");
        netTypeChoice(checkedWanState);
    });

    $("#wifi_set").click(function(){
        var channel,wifiBandwidth;
        var ssid = trim($("#wf_nameset").val());
        var pwd = $("#wf_pwdset").val();
        if (ssid == '') {
            getMsg('请输入无线名称！', 1, '#wf_nameset');
            return;
        }
        if (getStrLength(ssid) > 31 ||escape(ssid).indexOf("%20") != -1 || /[\':;*?~`!@#$%^&+={}\[\]\<\\(\),\.\。\，]/.test(ssid)) {
            getMsg('无线名称长度不得超过31位字符或者包含特殊字符！', 1, '#wf_nameset');
            return;
        }

        if (pwd.length > 0) {
            if (pwd.length > 31 || pwd.length < 8) {
                getMsg('密码长度不能超过31位或不能少于8位！', 1, '#wf_pwdset');
                return;
            }
            if (escape(pwd).indexOf("%u") != -1 ||escape(pwd).indexOf("%20") != -1 || /[\'\"{}\[\]]/.test(pwd)) {
                getMsg('密码不能包含中文字符或者特殊字符！', 1, '#wf_pwdset');
                return;
            }
        }
        var fn=function(){
            loading(1,"正在配置上网...");
            $.ajax({
                type: "POST",
                url: actionUrl + 'fname=net&opt=wifi_ap&function=get&math=' + Math.random(),
                async:false,
                dataType: "JSON",
                success: function (data) {
                    channel=data.channel;
                    wifiBandwidth=data.bw;
                }
            })
            ssid = encodeURIComponent(ssid);
            pwd = encodeURIComponent(pwd);
            setWifiAp(ssid, pwd, channel, "0", wifiBandwidth, true);
            SetupEnd();
        }
        layer.open({
            title: "提示",
            shadeClose: false,
            closeBtn: false,
            btn: ['确认','取消'],
            content: "1、设置保存后，wifi可能会断开，请重新连接无线路由器！<br />2、IP冲突时，LAN口IP会自动变更，请使用新IP地址登录！",
            tyle: 'background-color: transparent;  box-shadow: none;',
            yes:function(index){
                layer.close(index);
                fn();
            }
        });   
    });

    //上一步
    $(".gostep1").click(function(){
        $("#step_1").show();
        $("#step_2").hide();
        $("#step_3").hide();
    });
    //上一步
    $(".gostep2").click(function(){
        gosecond();
    })
//设置向导 end

});

//设置向导相关函数 statr
//
function SetupEnd(){
    switch(checkedWanState+""){
        case "1":
            Setupdhcp();
            break;
        case "2":
            Setuppppoe();
            break;
        case "3":
            Setupstatic();
            break;
        case "4":
            Setupwisp();
            break;
        default:
            getMsg('未识别的上方方式，请联系客服！');
    }
}
//宽带拨号
function Setuppppoe(){
    var mac = '';
    var account = $("#acc").val();
    var passwd = $("#pwd").val();
    var modeclone = $("#macChoose1").val();
    if (modeclone == 1) {
        mac = $("#macEnter1").val().toUpperCase();
        if (mac == '') {
            mac = myMac;
        }
    } else {
        mac = myMac;
    }
  
    if($("#PpoeHightSet").text()=="高级配置"){
	    var mtu = "1480";
	    var dns = "";
	    var dns1 = "";
	    var server = "";
    }else{
	    var mtu = $("#pp_mtu").val()||"1480";
	    var dns = $("#pp_dns").val();
	    var dns1 = $("#pp_dns1").val();
	    var server = $("#pppoe_server").val();
    }
    account = encodeURIComponent(account);
    passwd = encodeURIComponent(passwd);
    server = encodeURIComponent(server);
    mtu = encodeURIComponent(mtu);
    setPPPOE(account, passwd, server, mac, mtu, dns, dns1, modeclone);
}
//动态IP
function Setupdhcp(){
    var mac = '';
    var modeclone = $("#macChoose3").val();
    if (modeclone == 1) {
        mac = $("#macEnter3").val().toUpperCase();
        if (mac == '') {
            mac = myMac;
        }
    } else {
        mac = myMac;
    }
    if($("#DhcpHightSet").text()=="高级配置"){
	    var mtu = "1500";
	    var dns = "";
	    var dns1 = "";
    }else{
	    var mtu = $("#dhcp_mtu").val()||"1500";
	    var dns = $("#dhcp_dns").val();
	    var dns1 = $("#dhcp_dns1").val();    	
    }
    mtu = encodeURIComponent(mtu);
    setDHCP(mac, mtu, dns, dns1, modeclone);
}
//静态IP
function Setupstatic(){
    var mac = '';
	var static_ip = $("#static_ip").val();
    var static_mask = $("#static_mask").val();
    var static_gw = $("#static_gw").val();    
    var modeclone = $("#macChoose2").val();
    if (modeclone == 1) {
        mac = $("#macEnter2").val().toUpperCase();
        if (mac == '') {
            mac = myMac;
        }
    } else {
        mac = myMac;
    }
    if($("#StaticHightSet").text()=="高级配置"){
	    var static_dns = "";
	    var static_dns1 = "";
	    var mtu = "1500";
    }else{
	    var static_dns = $("#static_dns").val();
	    var static_dns1 = $("#static_dns1").val();
	    var mtu = $("#static_mtu").val()||"1500";
    }
    mtu = encodeURIComponent(mtu);
    setStatic(static_ip, static_mask, static_gw, static_dns, static_dns1, mac, mtu, modeclone);
}

//无线中继
function Setupwisp(){
    var mac=myMac;
    if($("#ssid").val()!=""){
        var ssid = $("#ssid").val();
        var wf_pwd = $("#ssid_pwd").val();
        var channel = $("#check_channel").val();
        var sec = $("#check_wpa").val();
    }else{
        var ssid = $("#cyname").text();
        var wf_pwd = $("#wf_pwd").val();
        var sec = $("#data_sec").val();
        var channel = $("#channel").val();
        if (wf_pwd == null || wf_pwd == '') {
            wf_pwd = 'NONE';
            sec = 'NONE';
        }
    }
    if (mob==1) {
        var ssid=$("#m_ssid").val();
        var wf_pwd=$("#m_pwd").val();
        var channel=$("#m_channel").val();
        var sec=$("#m_sec").val();
    }
    // ssid = encodeURIComponent(ssid);
    // wf_pwd = encodeURIComponent(wf_pwd);
    connectWisp(ssid, wf_pwd, mac, channel, sec);
}
//上一步
function gosecond(){
    $("#btn_1,#btn_2,#btn_3").val("下一步").attr("disabled",false);
    $("#step_1").hide();
    $("#step_2").show();
    $("#step_3").hide();
    $("#t_1_box").hide();
    $("#t_2_box").hide();
    $("#t_3_box").hide();
    $("#t_4_box").hide();
    switch(checkedWanState+""){
        case "1":
            $("#t_3_box").show();
            break;
        case "2":
            $("#t_1_box").show();
            break;
        case "3":
            $("#t_2_box").show();
            break;
        case "4":
            $("#t_4_box").show();
            break;
        default:
            $("#t_3_box").show();
    }
}
//设置向导相关函数 end

Date.prototype.getFormattedDate = function (pattern) {
    function getFullStr(i) {
        return i > 9 ? "" + i : "0" + i;
    }
    pattern = pattern.replace(/yyyy/, this.getFullYear()).replace(/MM/, getFullStr(this.getMonth() + 1)).replace(/dd/, getFullStr(this.getDate())).replace(/hh/, getFullStr(this.getHours())).replace(/mm/, getFullStr(this.getMinutes())).replace(/ss/, getFullStr(this.getSeconds()));
    return pattern;
};

function calcTime(city, offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000 * offset));
    return nd.getFormattedDate("yyyy-MM-dd hh : mm : ss");
}

function loading(num, content_text, type) {
    var content, width = 120;
    if (type == 1 || type == 2) {
        content = content_text;
    } else {
        var images = '../images';
        if (num == 3) {
            width = 32;
        }
        if (mob == 1) {
            width = 20;
            images = '../../images';
        }
        content = '<div class="loading"><p><img src="' + images + '/loading-' + num + '.gif" width="' + width + '"></p><p id="content_message">' + content_text + '</p></div>';
    }
    if (mob == 1) {
        layer.open({
            type: 1,
            shadeClose: false,
            content: content,
            style: 'background-color: transparent;  box-shadow: none;'
        });
    } else {
        layer.open({
            type: 1,
            title: false,
            shade: [0.7, '#000'],
            closeBtn: false,
            shadeClose: false,
            content: content,
            skin: 'cy-class'
        });
    }
}

function wifisetconfirm(type) {
    var user = document.URL;
    var bool = true;
    if (/user/.test(user) === false) {
        var ssid = trim($("#wf_nameset_" + type).val());
        var pwd = $("#wf_pwdset_" + type).val();
        var channel = 0;
        var wifiBandwidth = 1;
        var hidden_ssid = 0;
        if (ssid == '') {
            getMsg('请输入无线名称！', 1, '#wf_nameset_' + type);
            bool = false;
        }
        if (getStrLength(ssid) > 31 || encodeURI(ssid).indexOf("%20")!="-1" || /[\':;*?~`!@#$%^&+={}\[\]\<\\(\),\.\。\，]/.test(ssid)) {
            getMsg('无线名称长度不得超过31位字符或者包含特殊字符！', 1, '#wf_nameset_' + type);
            bool = false;
        }

        if (pwd.length > 0) {
            if (pwd.length > 31 || pwd.length < 8) {
                getMsg('密码长度不能超过31位或不能少于8位！', 1, '#wf_pwdset_' + type);
                bool = false;
            }
            if (escape(pwd).indexOf("%u") != -1 || encodeURI(pwd).indexOf("%20")!="-1" || /[\'\"{}\[\]]/.test(pwd)) {
                getMsg('密码不能包含中文字符或者特殊字符！', 1, '#wf_pwdset_' + type);
                bool = false;
            }
        }
        if (channel === undefined) {
            channel = 0;
        }
        if (wifiBandwidth === undefined) {
            wifiBandwidth = 0;
        }
        if (bool === false) {
            return bool;
        } else {
            ssid = encodeURIComponent(ssid);
            pwd = encodeURIComponent(pwd);
            setWifiAp(ssid, pwd, channel, hidden_ssid, wifiBandwidth, 1);
        }
    }
}

function edit_black_list(mac, index, method) {
    var tr = $("#backList").find('tr'), len = tr.length, macList = [], list = '', macLen = 0, maxNum = 32;
    if (method == 'del') {
        maxNum = 33;
    }
    if (len > 0 && len < maxNum) {
        for (var i = 0; i < len; i++) {
            if (index != i) {
                macList.push(tr.eq(i).children('td').eq(0).text());
            }
        }
        if (mac != '') {
            macList.push(mac);
        }
        var str = isRepeat(macList, mac);
        if (str == false) {
            getMsg('重复添加！');
            return;
        }
        macLen = macList.length;
        list = macList.join(';');
    }

    if (len >= 32 && method != 'del') {
        getMsg('最多能添加32组！');
        return;
    }
    add_black_list(list, macLen, mac, index);
}

function isRepeat(list, mac) {
    var bool = true;
    for (var i = 0; i < list.length; i++) {
        if (list[i] == mac) {
            bool = false;
            break;
        }
    }
    return bool;
}

function tips(content) {
    layer.open({
        title: false,
        shadeClose: false,
        content: content,
        style: 'background-color:#000;opacity:.75; box-shadow: none; text-align:center;color:#fff;',
        time: 1
    });
}
function showNetTip(fn){
    layer.open({
        title: "提示",
        shadeClose: false,
        closeBtn: false,
        btn: ['确认','取消'],
        content: "路由器IP地址有可能会发生变化，请使用手机或电脑的本地IP地址重新登录！",
        tyle: 'background-color: transparent;  box-shadow: none;',
        yes:function(index){
            layer.close(index);
            fn();
        }
    });    
}