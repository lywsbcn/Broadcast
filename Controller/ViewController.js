var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ViewController = /** @class */ (function (_super) {
    __extends(ViewController, _super);
    function ViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._inited = false;
        _this._action = {
            'vc-cancel': function () { _this.naviVc && _this.naviVc.pop(); },
            'vc-cancel-all': function () { _this.naviVc && _this.naviVc.popAll(); }
        };
        _this.action = {};
        _this._listener = function (e) {
            var target = e.target || e.srcElement;
            var at = target.getAttribute('at');
            _this._action && _this._action[at] && _this._action[at]();
            _this.action && _this.action[at] && _this.action[at](target);
            _this.onListener(at, target);
        };
        return _this;
    }
    ViewController.prototype.init = function () {
        !this._inited && this._layout();
        this._inited = true;
        return this;
    };
    ViewController.prototype._layout = function () {
        this.startInclude();
        this.layout();
    };
    ViewController.prototype.layout = function () {
    };
    ViewController.prototype.endInclude = function () {
        var _this = this;
        var url = this.loadView();
        if (!url) {
            this._onCreate();
            return;
        }
        Jinclude.get(url, function (str) {
            str = _this.disposeView(str);
            var div = document.createElement('div');
            div.innerHTML = str;
            _this._view = div.firstElementChild;
            var nodes = _this._view.querySelectorAll('[jv]');
            nodes.forEach(function (node) {
                var jv = node.getAttribute('jv');
                jv && _this[jv] === void 0 && (_this[jv] = node);
            });
            _this._onCreate();
        }, function () { _this._onCreate(); });
    };
    ViewController.prototype.loadView = function () {
        return null;
    };
    ViewController.prototype.disposeView = function (str) {
        return str.Lreplace;
    };
    ViewController.prototype._onCreate = function () {
        if (!this._view) {
            this._view = document.createElement('div');
        }
        this.container.appendChild(this.view);
        this.onCreate();
        this._addEvent();
    };
    ViewController.prototype.onCreate = function () {
    };
    ViewController.prototype._onAppear = function () {
        this.onAppear();
    };
    ViewController.prototype.onAppear = function () {
    };
    ViewController.prototype._onDisappear = function () {
        this.onDisappear();
    };
    ViewController.prototype.onDisappear = function () {
    };
    ViewController.prototype._addEvent = function () {
        this.view.addEventListener('click', this._listener);
        this.addEvent();
    };
    ViewController.prototype.addEvent = function () {
    };
    ViewController.prototype.onListener = function (at, target) {
    };
    ViewController.prototype._removeEvent = function () {
        this.view.removeEventListener('click', this._listener);
        this.removeEvent();
    };
    ViewController.prototype.removeEvent = function () {
    };
    ViewController.prototype._onDestory = function () {
        this._removeEvent();
        this.container.remove();
        this.onDestory();
    };
    ViewController.prototype.onDestory = function () {
    };
    Object.defineProperty(ViewController.prototype, "container", {
        get: function () {
            if (!this._container) {
                this._container = document.createElement('x-viewController');
                this._container.updateStyle({
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: '#fff',
                    overflowX: 'hidden', overflowY: 'auto'
                });
            }
            return this._container;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewController.prototype, "view", {
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewController.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (title) {
            this._title = title;
            this.__button && this.__button.text && (this.__button.text.innerHTML = title);
        },
        enumerable: true,
        configurable: true
    });
    ViewController.prototype.renderController = function (parent) {
        if (!parent)
            return;
        parent.appendChild(this.container);
        this._onAppear();
    };
    ViewController.prototype.__appearController = function () {
        this.container.style.display = 'initial';
        this._onAppear();
    };
    ViewController.prototype.__disappearController = function () {
        this.container.style.display = 'none';
        this._onDisappear();
    };
    ViewController.prototype.__pushToNaviController = function (navi) {
        this.naviVc = navi;
        navi.container.appendChild(this.container);
        this._onAppear();
    };
    ViewController.prototype.__popFromNaviController = function () {
        this._onDisappear();
        this.container.remove();
        this._onDestory();
    };
    return ViewController;
}(Jinclude));
var NaviController = /** @class */ (function (_super) {
    __extends(NaviController, _super);
    function NaviController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._controllers = [];
        return _this;
    }
    Object.defineProperty(NaviController.prototype, "controllers", {
        get: function () {
            return this._controllers || (this._controllers = []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NaviController.prototype, "top", {
        get: function () {
            var len = this.controllers.length;
            return len == 0 ? null : this.controllers[len - 1];
        },
        enumerable: true,
        configurable: true
    });
    NaviController.prototype.push = function (viewController) {
        var top = this.top;
        if (!viewController || top == viewController)
            return;
        top && top.__disappearController();
        viewController.init().__pushToNaviController(this);
        this.controllers.push(viewController);
    };
    NaviController.prototype.pop = function () {
        if (this.controllers.length == 0)
            return;
        var viewController = this.controllers.pop();
        viewController && viewController.__popFromNaviController();
        var top = this.top;
        top && top.__appearController();
    };
    NaviController.prototype.popAll = function () {
        for (var x in this.controllers) {
            this.controllers[x].__popFromNaviController();
        }
        this._controllers = [];
    };
    NaviController.prototype.__popFromNaviController = function () {
        this.popAll();
        this['onDisappear']();
        this.container.remove();
        this['onDestory']();
    };
    Object.defineProperty(NaviController.prototype, "container", {
        get: function () {
            if (!this._container) {
                this._container = document.createElement('x-naviController');
                this._container.updateStyle({
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: '#fff',
                    overflowX: 'hidden', overflowY: 'auto'
                });
            }
            return this._container;
        },
        enumerable: true,
        configurable: true
    });
    return NaviController;
}(ViewController));
var NpcController = /** @class */ (function () {
    function NpcController() {
    }
    NpcController.init = function () {
        var _this = this;
        this.navibar.addEventListener('click', (this._listener = function (e) {
            var target = e.target || e.srcElement;
            var at = target.getAttribute('at');
            var ptarget = target.parentElement;
            switch (at) {
                case 'close':
                    ptarget.remove();
                    _this.del(ptarget['npcItem']);
                    break;
                case 'text':
                    _this.show(ptarget['npcItem']);
                    break;
            }
        }));
        return this;
    };
    NpcController.button = function () {
        var button = 'div'.C;
        var text = 'div'.C;
        var close = 'span'.C;
        close.addClass('fa fa-close').at('close');
        text.at('text');
        button['text'] = text;
        button.updateStyle({ cursor: 'pointer' }).addSubview(text, close);
        return button;
    };
    NpcController.add = function (item) {
        if (this.controllers[item.name] !== void 0) {
            this.show(item);
            return;
        }
        var last = this.navibar.lastElementChild;
        last && this.hide(last['npcItem']);
        var vc = item.get().init();
        this.controllers[item.name] = vc;
        var button = this.button();
        button.text.innerHTML = vc.title;
        button['npcItem'] = item;
        vc['__button'] = button;
        this.navibar.appendChild(button);
        this.container.appendChild(vc.container);
        this.toggleButton(button);
    };
    NpcController.hide = function (item) {
        var vc = this.controllers[item.name];
        vc && vc.__disappearController();
    };
    NpcController.show = function (item) {
        var last = this.navibar.lastElementChild;
        last && last['npcItem'].name != item.name && this.hide(last['npcItem']);
        var vc = this.controllers[item.name];
        vc && vc.__appearController();
        var nodes = this.navibar.children;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node['npcItem'].name == item.name) {
                this.toggleButton(node);
                break;
            }
        }
    };
    NpcController.del = function (item) {
        var vc = this.controllers[item.name];
        vc && vc.__popFromNaviController();
        delete this.controllers[item.name];
        var last = this.navibar.lastElementChild;
        last && this.show(last['npcItem']);
    };
    NpcController.toggleButton = function (btn) {
        var nodes = this.navibar.childNodes;
        nodes.forEach(function (node) {
            if (node == btn) {
                node.setAttribute('active', '');
            }
            else {
                node.removeAttribute('active');
            }
        });
    };
    NpcController.controllers = {};
    return NpcController;
}());
//# sourceMappingURL=ViewController.js.map