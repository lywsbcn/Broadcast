var Jinclude = /** @class */ (function () {
    function Jinclude() {
        this.pattern = Jinclude.includePatternNormal;
        this.baseUrl = "";
        this.included = false;
        this.__index = 0;
        this.__handler = null;
    }
    Jinclude.disposeUrl = function (url) {
        if (!this.cache)
            return url += "?__v=" + (new Date().getTime());
    };
    Jinclude.get = function (url, success, failed) {
        url = this.disposeUrl(url);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', url);
        xmlhttp.onerror = function (e) {
            typeof (failed) === 'function' && failed();
        };
        xmlhttp.onload = function (e) {
            typeof (success) === 'function' && success(this.responseText);
        };
        xmlhttp.send();
    };
    Jinclude.getScript = function (url, success, failed) {
        url = this.disposeUrl(url);
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onerror = function (e) {
            console.log(e);
            typeof (failed) === 'function' && failed();
        };
        script.onload = function () {
            typeof (success) === 'function' && success();
        };
        script.src = url;
        document.head.appendChild(script);
    };
    Jinclude.prototype.include = function () {
        return [];
    };
    Jinclude.prototype.startInclude = function (handler) {
        this.__handler = handler;
        this.__loading();
        this.pattern == Jinclude.includePatternQueue ? this.queueInclude() : this.normalInclude();
    };
    Jinclude.prototype.queueInclude = function () {
        var _this = this;
        !this.__includeList && (this.__includeList = this.include());
        var len = this.__includeList.length;
        if (len == 0 || this.__index > len - 1) {
            this.__endInclude();
            return;
        }
        var url = this.baseUrl + this.__includeList[this.__index];
        if (Jinclude.includeList.indexOf(url) !== -1) {
            this.__index++;
            this.queueInclude();
            return;
        }
        Jinclude.includeList.push(url);
        Jinclude.getScript(url, function () {
            _this.__index++;
            _this.queueInclude();
        }, function () {
            _this.__index++;
            _this.queueInclude();
        });
    };
    Jinclude.prototype.normalInclude = function () {
        var _this = this;
        !this.__includeList && (this.__includeList = this.include());
        var len = this.__includeList.length;
        if (len == 0) {
            this.__endInclude();
            return;
        }
        var amount = len;
        for (var i = 0; i < len; i++) {
            var url = this.baseUrl + this.__includeList[i];
            if (Jinclude.includeList.indexOf(url) !== -1) {
                amount--;
                if (amount <= 0)
                    this.__endInclude();
                continue;
            }
            Jinclude.includeList.push(url);
            Jinclude.getScript(url, function () {
                amount--;
                if (amount <= 0)
                    _this.__endInclude();
            }, function () {
                amount--;
                if (amount <= 0)
                    _this.__endInclude();
            });
        }
    };
    Jinclude.prototype.__endInclude = function () {
        this.included = true;
        this.__unloading();
        typeof (this.__handler) === 'function' && this.__handler();
        this.endInclude();
    };
    /**引入文件完成 */
    Jinclude.prototype.endInclude = function () {
    };
    Jinclude.prototype.__loading = function () {
        Loading.start();
    };
    Jinclude.prototype.__unloading = function () {
        Loading.stop();
    };
    /**********************请求部分****************************/
    Jinclude.cache = false;
    /**************************引入文件逻辑****************************/
    Jinclude.includeList = [];
    /*引入文件模式,普通(一次性的加载)*/
    Jinclude.includePatternNormal = 0;
    /*引入文件模式,队列(一个一个加载)*/
    Jinclude.includePatternQueue = 1;
    return Jinclude;
}());
//# sourceMappingURL=Jinclude.js.map