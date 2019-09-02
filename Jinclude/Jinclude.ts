class Jinclude {
    /**********************请求部分****************************/
    static cache = false;
    private static disposeUrl(url: string) {
        if (!this.cache) return url += "?__v=" + (new Date().getTime())
    }

    static get(url: string, success: Function, failed?: Function) {
        url = this.disposeUrl(url);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', url);
        xmlhttp.onerror = function (e) {
            typeof (failed) === 'function' && failed();
        }
        xmlhttp.onload = function (e) {
            typeof (success) === 'function' && success(this.responseText);
        }

        xmlhttp.send()
    }

    static getScript(url: string, success: Function, failed?: Function) {
        url = this.disposeUrl(url);
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.onerror = function (e) {
            console.log(e);
            typeof (failed) === 'function' && failed();
        }
        script.onload = function () {
            typeof (success) === 'function' && success();
        }
        script.src = url;

        document.head.appendChild(script);
    }

    /**************************引入文件逻辑****************************/
    private static includeList: Array<string> = [];

    /*引入文件模式,普通(一次性的加载)*/
    public static readonly includePatternNormal = 0;
    /*引入文件模式,队列(一个一个加载)*/
    public static readonly includePatternQueue = 1;

    public pattern = Jinclude.includePatternNormal;
    public baseUrl = "";
    protected included = false;
    private __index = 0;
     
    public include(): Array<string> {
        return [];
    }

    private __handler: Function = null;
    public startInclude(handler?: Function) {
        this.__handler = handler;
        this.__loading();

        this.pattern == Jinclude.includePatternQueue ? this.queueInclude() : this.normalInclude();
    }
    private __includeList: Array<string>;
    private queueInclude() {
        !this.__includeList && (this.__includeList = this.include());
        let len = this.__includeList.length;

        if (len == 0 || this.__index > len - 1) {
            this.__endInclude();
            return;
        }

        let url = this.baseUrl + this.__includeList[this.__index];
        if (Jinclude.includeList.indexOf(url) !== -1) {
            this.__index++;
            this.queueInclude();
            return;
        }

        Jinclude.includeList.push(url);
        Jinclude.getScript(url, () => {
            this.__index++;
            this.queueInclude();
        }, () => {
            this.__index++;
            this.queueInclude();
        });

    }

    private normalInclude() {
        !this.__includeList && (this.__includeList = this.include());
        let len = this.__includeList.length;

        if (len == 0) {
            this.__endInclude();
            return;
        }

        let amount = len;
        for (var i = 0; i < len; i++) {
            let url = this.baseUrl + this.__includeList[i];
            if (Jinclude.includeList.indexOf(url) !== -1) {
                amount--;
                if (amount <= 0) this.__endInclude();
                continue;
            }

            Jinclude.includeList.push(url);
            Jinclude.getScript(url, () => {
                amount--;
                if (amount <= 0) this.__endInclude();
            }, () => {
                amount--;
                if (amount <= 0) this.__endInclude();
            });

        }
    }

    private __endInclude() {
        this.included = true;
        this.__unloading();
        typeof (this.__handler) === 'function' && this.__handler();
        this.endInclude();
    }

    /**引入文件完成 */
    protected endInclude() {

    }
    private __loading() {
        Loading.start();
    }

    private __unloading() {
        Loading.stop();
    }

    get className(): string {
        try {
            return this['constructor']['name'];
        } catch (e) {
            return "";
        }
    }
}