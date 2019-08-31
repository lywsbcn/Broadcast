/*
 * Jui 自定义视图
 * 依赖 JEvent.ts,Extend.ts
 * */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** */
var Jui = /** @class */ (function () {
    function Jui() {
    }
    Object.defineProperty(Jui, "Xswitch", {
        get: function () {
            return Xswitch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jui, "Xenum", {
        get: function () {
            return Xenum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jui, "Xtab", {
        get: function () {
            return Xtab;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jui, "Xradio", {
        get: function () {
            return Xradio;
        },
        enumerable: true,
        configurable: true
    });
    Jui.render = function (element) {
        for (var x in this) {
            if (typeof (this[x].render) === 'function') {
                this[x].render(element);
            }
        }
    };
    Jui.init = function () {
        var _this = this;
        console.log('Jui', 'init....');
        window.addEventListener('load', function () {
            for (var x in _this) {
                if (typeof (_this[x].init) == 'function') {
                    _this[x].init();
                }
            }
        });
    };
    return Jui;
}());
Jui.init();
var JuiRender = /** @class */ (function () {
    function JuiRender() {
    }
    JuiRender.render = function (element) {
        var _this = this;
        element = element === void 0 ? document : element;
        var selector = this.selector();
        if (!selector)
            return;
        var nodes = element.querySelectorAll(selector);
        nodes.forEach(function (node) {
            node.onclick = _this.listener.bind(_this);
            node.setAttribute('render', '');
        });
    };
    JuiRender.selector = function () {
        return "";
    };
    JuiRender.listener = function (event) {
    };
    return JuiRender;
}());
var Xswitch = /** @class */ (function (_super) {
    __extends(Xswitch, _super);
    function Xswitch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Xswitch.selector = function () {
        return 'x-switch:not([render]),x-switch-ios:not([render]),x-checkbox:not([render])';
    };
    Xswitch.listener = function (e) {
        e.stopPropagation && e.stopPropagation();
        this.click(e.currentTarget);
    };
    Xswitch.click = function (target) {
        if (target.hasAttribute('checked')) {
            target.removeAttribute('checked');
        }
        else {
            target.setAttribute('checked', '');
        }
    };
    Xswitch.init = function () {
        var _this = this;
        JEvent.addListener(this.selector(), function (target) {
            !target.onclick && _this.click(target);
        });
    };
    return Xswitch;
}(JuiRender));
var Xradio = /** @class */ (function (_super) {
    __extends(Xradio, _super);
    function Xradio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Xradio.selector = function () {
        return 'x-radio:not([render])';
    };
    Xradio.listener = function (e) {
        e.stopPropagation && e.stopPropagation();
        this.click(e.currentTarget);
    };
    Xradio.click = function (target) {
        target.setAttribute('checked', true);
        var name = target.getAttribute("name");
        if (name) {
            var nodes = document.querySelectorAll("x-radio[name='" + name + "']");
            var len = nodes.length;
            for (var i = 0; i < len; i++) {
                if (nodes[i] == target)
                    continue;
                nodes[i].removeAttribute("checked");
            }
        }
    };
    Xradio.init = function () {
        var _this = this;
        JEvent.addListener(this.selector(), function (target) {
            !target.onclick && _this.click(target);
        });
    };
    return Xradio;
}(JuiRender));
var Xenum = /** @class */ (function (_super) {
    __extends(Xenum, _super);
    function Xenum() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Xenum.selector = function () {
        return 'x-enum:not([render])';
    };
    Xenum.listener = function (event) {
        event.stopPropagation && event.stopPropagation();
        this.click(event.target || event.srcElement);
    };
    Xenum.click = function (target) {
        var source = target.parent('x-enum');
        if (!source)
            return;
        var nodes = source.children;
        var len = nodes.length;
        for (var i = 0; i < len; i++) {
            var node = nodes.item(i);
            if (node == target) {
                node.setAttribute('checked', '');
            }
            else {
                node.removeAttribute('checked');
            }
        }
    };
    Xenum.init = function () {
        var _this = this;
        JEvent.addListener(this.selector() + ">*", function (target) {
            !target.onclick && _this.click(target);
        });
    };
    return Xenum;
}(JuiRender));
var Xtab = /** @class */ (function (_super) {
    __extends(Xtab, _super);
    function Xtab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Xtab.selector = function () {
        return 'x-tab:not([render]) > x-tab-button';
    };
    Xtab.listener = function (event) {
        this.click(event.target || event.srcElement);
    };
    Xtab.click = function (target) {
        if (!target.matches('x-i'))
            return;
        var source = target.parent('x-tab-button');
        if (source.hasAttribute('disabled'))
            return;
        var ptarget = source.parentElement;
        var tabname = target.getAttribute('tabname');
        var buttons = source.children;
        var buttons_len = buttons.length;
        for (var i = 0; i < buttons_len; i++) {
            var node = buttons[i];
            if (node == target)
                node.setAttribute('selected', '');
            else
                node.removeAttribute('selected');
        }
        var content = ptarget.querySelector('x-tab-content');
        if (!content)
            return;
        var contens = content.children;
        var contens_len = contens.length;
        for (var i = 0; i < contens_len; i++) {
            var node = contens[i];
            var tn = node.getAttribute('tabname');
            if (tn == tabname)
                node.setAttribute('selected', '');
            else
                node.removeAttribute('selected');
        }
    };
    Xtab.init = function () {
        var _this = this;
        JEvent.addListener(this.selector() + '>x-i', function (target) {
            !target.parentElement.onclick && _this.click(target);
        });
    };
    return Xtab;
}(JuiRender));
//# sourceMappingURL=Jui.js.map