var Toast = /** @class */ (function () {
    function Toast() {
    }
    Object.defineProperty(Toast, "view", {
        get: function () {
            if (this._view)
                return this._view;
            this._view = document.createElement('div');
            this._view.updateStyle({
                position: 'fixed',
                top: '50%',
                left: '50%',
                color: '#000',
                background: 'rgba(255,255,255,1)',
                borderRadius: '5px',
                padding: '10px 20px',
                maxWidth: '400px',
                wordBreak: 'break-all',
                transitionDuration: '0.5s',
                webkitTransitionDuration: '0.5s',
                transitionProperty: 'opacity,left',
                webkitTransitionProperty: 'opacity, left',
                opacity: '0',
                boxShadow: 'rgba(0,0,0,0.2) 0 0 5px',
                border: '1px solid #d4d4d4'
            });
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    Toast.title = function (title, duration) {
        var _this = this;
        if (duration === void 0) { duration = 3000; }
        document.body.appendChild(this.view);
        this.view.innerHTML = title;
        this.view.updateStyle({
            marginLeft: this.view.clientWidth * -0.5 + "px",
            marginTop: this.view.clientHeight * -0.5 + 'px'
        });
        setTimeout(function () { _this.view.style.opacity = "1"; }, 10);
        clearTimeout(this._timer);
        this._timer = setTimeout(function () {
            _this.view.style.opacity = "0";
            setTimeout(function () { _this.view.remove(); }, 500);
        }, duration);
    };
    return Toast;
}());
//window.addEventListener('load', function () {
//    Toast.title("哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈");
//})
//# sourceMappingURL=Toast.js.map