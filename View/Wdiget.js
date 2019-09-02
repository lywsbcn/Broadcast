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
var Wdiget = /** @class */ (function (_super) {
    __extends(Wdiget, _super);
    function Wdiget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__listener = function (e) {
            e.stopPropagation();
            var target = e.target || e.srcElement;
            var at = target.getAttribute("at") || "";
            _this._listener(at, target);
        };
        return _this;
    }
    Wdiget.prototype.init = function () {
        _super.prototype.init.call(this);
        this.view.addEventListener("click", this.__listener);
        this.show();
        return this;
    };
    Wdiget.prototype.show = function () {
        var _this = this;
        document.body.appendChild(this.view);
        setTimeout(function () {
            _this.view.style.opacity = "1";
            _this.content.style.transform = "scale(1)";
        }, 100);
    };
    Wdiget.prototype.hide = function () {
        var _this = this;
        this.view.style.opacity = "0";
        this.content.style.transform = "scale(0.8)";
        setTimeout(function () { _this.view.remove(); }, 200);
    };
    Object.defineProperty(Wdiget.prototype, "view", {
        get: function () {
            if (!this._view) {
                this._view = "Wdiget".C.setStyle({
                    'display': 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'position': 'fixed',
                    'background': 'rgba(0,0,0,0.1)',
                    'opacity': 0,
                    'top': 0,
                    'left': 0,
                    'right': 0,
                    'bottom': 0,
                    'transition-duration': '0.05s'
                }).addSubview(this.content);
            }
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wdiget.prototype, "content", {
        get: function () {
            return this._content || (this._content = 'div'.C.setStyle({
                'max-height': '100%',
                'overflow': 'auto',
                'background': '#fff',
                'position': 'relative',
                'transform': "scale(0.8)",
                'transition-duration': '.05s'
            }));
        },
        enumerable: true,
        configurable: true
    });
    Wdiget.prototype._listener = function (at, target) {
    };
    Wdiget.prototype.destory = function () {
        _super.prototype.destory.call(this);
        this.view.removeEventListener("click", this.__listener);
        this.hide();
    };
    return Wdiget;
}(View));
var WdigetAlert = /** @class */ (function (_super) {
    __extends(WdigetAlert, _super);
    function WdigetAlert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WdigetAlert.prototype.init = function () {
        _super.prototype.init.call(this);
        this.content.updateStyle({
            borderRadius: "5px",
            width: "300px",
            background: "rgba(242,242,242,.98)",
            color: '#000',
            boxShadow: '3px 3px 10px #999999',
        }).addSubview(this.tilte, this.textPre, this.buttonLayer);
        return this;
    };
    WdigetAlert.prototype._listener = function (at, target) {
        switch (at) {
            case "confirm":
                if (typeof (this._handler) === 'function') {
                    this._handler();
                }
                this._handler = null;
                this.destory();
                break;
        }
    };
    Object.defineProperty(WdigetAlert.prototype, "tilte", {
        get: function () {
            return this._title || (this._title = 'div'.C.updateStyle({
                //fontWeight: 'bold',
                //textAlign: 'center',
                padding: "8px 10px"
            }).html('提示'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WdigetAlert.prototype, "textPre", {
        get: function () {
            return this._textPre || (this._textPre = 'pre'.C.updateStyle({
                textAlign: 'center',
                fontSize: '12px',
                margin: '0 10px',
                padding: '10px',
                background: '#fff',
                border: '1px solid #ccc',
                minHeight: '60px',
                whiteSpace: 'normal'
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WdigetAlert.prototype, "buttonLayer", {
        get: function () {
            return this._buttonLayer || (this._buttonLayer = 'div'.C.updateStyle({
                height: '35px',
                lineHeight: '35px',
                margin: '0 10px 10px 10px',
                position: 'relative',
                cursor: 'pointer',
                background: '#fafafa',
                border: '1px solid #ccc',
                borderTop: 0
            }).addSubview(this.confirmButton));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WdigetAlert.prototype, "confirmButton", {
        get: function () {
            return this._confirmButton || (this._confirmButton = 'div'.C.updateStyle({
                width: '100%',
                height: '100%',
                display: 'inline-block',
                textAlign: 'center',
                color: 'rgb(52,124,232)',
            }).at('confirm').html('确定'));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置标题
     * @param title
     * @param callback 传入标题对象
     */
    WdigetAlert.prototype.setTitle = function (title, callback) {
        this.tilte.innerHTML = title;
        if (typeof (callback) === 'function') {
            callback(this.tilte);
        }
        return this;
    };
    /**
     * 设置确认按钮
     * @param text
     * @param callback 传入确认按钮
     */
    WdigetAlert.prototype.setConfirmButton = function (text, callback) {
        this.confirmButton.innerHTML = text;
        if (typeof (callback) === 'function') {
            callback(this.confirmButton);
        }
        return this;
    };
    /**
     * 点击按钮回调
     * @param callback
     */
    WdigetAlert.prototype.callback = function (callback) {
        this._handler = callback;
        return this;
    };
    /**
     * 设置文本
     * @param text
     * @param callback 点击按钮回调
     */
    WdigetAlert.prototype.text = function (text, callback) {
        this.textPre.innerHTML = text;
        this.callback(callback);
        return this;
    };
    return WdigetAlert;
}(Wdiget));
var WdigetMsg = /** @class */ (function (_super) {
    __extends(WdigetMsg, _super);
    function WdigetMsg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WdigetMsg.prototype.init = function () {
        _super.prototype.init.call(this);
        this.confirmButton.style.width = "50%";
        this.buttonLayer.appendChild(this.cancelButton);
        this.buttonLayer.appendChild(this.line);
        this.buttonLayer.appendChild(this.confirmButton);
        return this;
    };
    WdigetMsg.prototype._listener = function (at, target) {
        switch (at) {
            case "confirm":
                if (typeof (this._handler) === 'function') {
                    this._handler(true);
                }
                if (typeof (this._comfirmHandler) === 'function') {
                    this._comfirmHandler();
                }
                this._handler = this._comfirmHandler = null;
                this.destory();
                break;
            case "cancel":
                if (typeof (this._handler) === 'function') {
                    this._handler(false);
                }
                if (typeof (this._cancelHandler) === 'function') {
                    this._cancelHandler();
                }
                this._handler = this._cancelHandler = null;
                this.destory();
                break;
        }
    };
    Object.defineProperty(WdigetMsg.prototype, "line", {
        get: function () {
            return this._line || (this._line = 'div'.C.updateStyle({
                position: 'absolute', top: 0, left: '50%', width: '1px', height: '100%', background: '#ccc'
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WdigetMsg.prototype, "cancelButton", {
        get: function () {
            return this._cancelButton || (this._cancelButton = 'div'.C.updateStyle({
                height: '100%', width: '50%', textAlign: 'center', display: 'inline-block', color: '#fb4a2c'
            })
                .html("取消")
                .at("cancel"));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置取消按钮
     * @param text
     * @param callback 传入取消按钮
     */
    WdigetMsg.prototype.setCancelButton = function (text, callback) {
        this.cancelButton.innerHTML = text;
        if (typeof (callback) === 'function') {
            callback(this.cancelButton);
        }
        return this;
    };
    /**
     * 点击确认按钮回调
     * 如果 没有返回值,或者返回true 则关闭窗口
     * 如果 返回 false ,则不关闭窗口
     * @param callback
     */
    WdigetMsg.prototype.confirm = function (callback) {
        this._comfirmHandler = callback;
        return this;
    };
    /**
     * 点击取消按钮回调
     * @param callback
     */
    WdigetMsg.prototype.cancel = function (callback) {
        this._cancelHandler = callback;
        return this;
    };
    return WdigetMsg;
}(WdigetAlert));
var WdigetEdit = /** @class */ (function (_super) {
    __extends(WdigetEdit, _super);
    function WdigetEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WdigetEdit.prototype, "input", {
        get: function () {
            return this._input || (this._input = 'input'.C.updateStyle({
                border: '1px solid #ccc',
                borderRadius: '3px',
                boxSizing: 'border-box',
                padding: '8px 5px',
                width: '80'
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WdigetEdit.prototype, "tip", {
        get: function () {
            return this._tip || (this._tip = 'div'.C.updateStyle({
                color: '#f00',
                margin: '0 10%',
                padding: '0 5px',
                boxSizing: 'border-box',
                width: '80%'
            }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置提示说明
     * @param tip
     * @param callback 回传 tip对象
     */
    WdigetEdit.prototype.setTip = function (tip, callback) {
        this.tip.innerHTML = tip;
        if (typeof (callback) === 'function') {
            callback(this.tip);
        }
        return this;
    };
    /**
     * 设置输入框的值
     * @param value
     * @param callback 回传 input对象
     */
    WdigetEdit.prototype.setInput = function (value, callback) {
        this.input.value = value;
        if (typeof (callback) === 'function') {
            callback(this.input);
        }
        return this;
    };
    WdigetEdit.prototype.setInputType = function (type, callback) {
        this.input.type = type;
        if (typeof (callback) === 'function') {
            callback(this.input);
        }
        return this;
    };
    /**
     * 设置输入框的placeholder
     * @param holder
     * @param callback 回传 input对象
     */
    WdigetEdit.prototype.setPlaceholder = function (holder, callback) {
        this.input.placeholder = holder;
        if (typeof (callback) === 'function') {
            callback(this.input);
        }
        return this;
    };
    /**
     * 设置输入框的值
     * @param text
     * @param callback 点击确定按钮回调
     */
    WdigetEdit.prototype.text = function (text, callback) {
        this.input.value = text;
        this.confirm(callback);
        return this;
    };
    WdigetEdit.prototype.init = function () {
        _super.prototype.init.call(this);
        this.textPre.appendChild(this.input);
        this.textPre.appendChild(this.tip);
        return this;
    };
    WdigetEdit.prototype._listener = function (at, target) {
        switch (at) {
            case "confirm":
                if (typeof (this._comfirmHandler) === 'function') {
                    var result = this._comfirmHandler(this.input.value);
                    if (result !== void 0 && !result)
                        return;
                }
                this._comfirmHandler = null;
                this.destory();
                break;
            case "cancel":
                if (typeof (this._cancelHandler) === 'function') {
                    this._cancelHandler();
                }
                this._cancelHandler = null;
                this.destory();
                break;
        }
    };
    return WdigetEdit;
}(WdigetMsg));
var WdigetWindow = /** @class */ (function (_super) {
    __extends(WdigetWindow, _super);
    function WdigetWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionListener = {
            window_close: function () { _this.destory(); }
        };
        _this.action = {};
        return _this;
    }
    WdigetWindow.prototype.init = function () {
        _super.prototype.init.call(this);
        this.content.appendChild(this.titleLayer);
        this.content.appendChild(this.layer);
        return this;
    };
    WdigetWindow.prototype.size = function (w, h) {
        this.content.updateStyle({
            width: w,
            height: h
        });
        return this;
    };
    WdigetWindow.prototype.title = function (title) {
        this.titleLabel.innerHTML = title;
        return this;
    };
    WdigetWindow.prototype.setContent = function (callback) {
        typeof (callback) === 'function' && callback(this.layer, this);
        this.actionListener['addEvent'] && this.actionListener['addEvent'].call(this);
        return this;
    };
    WdigetWindow.prototype.setHtml = function (html, callback) {
        this.setContent(function (layer, win) {
            layer.innerHTML = html;
            var nodes = layer.querySelectorAll('[jv]');
            nodes.forEach(function (node) {
                var jv = node.getAttribute('jv');
                if (jv && win[jv] === void 0) {
                    win[jv] = node;
                }
            });
            typeof (callback) === 'function' && callback(layer, win);
        });
        return this;
    };
    WdigetWindow.prototype.setAction = function (action) {
        this.action = action;
        return this;
    };
    Object.defineProperty(WdigetWindow.prototype, "titleLayer", {
        get: function () {
            if (!this._titleLayer) {
                this._titleLayer = document.createElement('div');
                this._titleLayer.updateStyle({
                    height: '40px',
                    lineHeight: '40px',
                    background: '#fafafa',
                    borderBottom: '1px solid #d4d4d4',
                    boxSizing: 'border-box',
                    padding: '0 10px'
                });
                this._titleLayer.appendChild(this.titleLabel);
                this._titleLayer.appendChild(this.closebutton);
            }
            return this._titleLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WdigetWindow.prototype, "titleLabel", {
        get: function () {
            if (!this._titleLabel) {
                this._titleLabel = document.createElement('span');
                this._titleLabel.updateStyle({ fontWeight: 'bold' });
            }
            return this._titleLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WdigetWindow.prototype, "closebutton", {
        get: function () {
            if (!this._closebutton) {
                this._closebutton = document.createElement('span');
                this._closebutton.updateStyle({ cssFloat: 'right', lineHeight: '40px', fontSize: '18px', cursor: 'pointer' });
                this._closebutton.setAttribute('class', "fa fa-close");
                this._closebutton.setAttribute('at', 'window_close');
            }
            return this._closebutton;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WdigetWindow.prototype, "layer", {
        get: function () {
            if (!this._layer) {
                this._layer = document.createElement('div');
                this._layer.updateStyle({
                    position: 'absolute', top: '40px', left: 0, right: 0, bottom: 0, overflowX: 'hidden', overflowY: 'auto'
                });
            }
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    WdigetWindow.prototype._listener = function (at, target) {
        this.action[at] && this.action[at].call(this, target, this);
        this.actionListener[at] && this.actionListener[at].call(this, target, this);
    };
    WdigetWindow.prototype.destory = function () {
        _super.prototype.destory.call(this);
        this.action['removeEvent'] && this.action['removeEvent'].call(this);
    };
    return WdigetWindow;
}(Wdiget));
//window.addEventListener('load', function () {
//    Msg.window.size("800px", "500px")
//})
var Msg = /** @class */ (function () {
    function Msg() {
    }
    Object.defineProperty(Msg, "alert", {
        get: function () {
            return new WdigetAlert().init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Msg, "msg", {
        get: function () {
            return new WdigetMsg().init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Msg, "edit", {
        get: function () {
            return new WdigetEdit().init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Msg, "window", {
        get: function () {
            return new WdigetWindow().init();
        },
        enumerable: true,
        configurable: true
    });
    return Msg;
}());
//# sourceMappingURL=Wdiget.js.map