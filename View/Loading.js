var Loading = /** @class */ (function () {
    function Loading() {
    }
    Loading.start = function () {
        this.amount++;
        document.body.appendChild(this.view);
        clearTimeout(this.timer);
    };
    Loading.stop = function () {
        var _this = this;
        (--this.amount) <= 0 && (this.timer = setTimeout(function () {
            _this.amount <= 0 && _this.view.remove();
        }, this.delay));
    };
    Object.defineProperty(Loading, "view", {
        get: function () {
            if (!this._view) {
                this._view = document.createElement('x-loading');
            }
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    Loading.amount = 0;
    Loading.timer = 0;
    Loading.delay = 500;
    return Loading;
}());
//# sourceMappingURL=Loading.js.map