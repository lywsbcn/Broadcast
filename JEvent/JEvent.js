var JEvent = /** @class */ (function () {
    function JEvent() {
    }
    JEvent.init = function () {
        console.log("JEvnet", 'init....');
        window.addEventListener('click', this.listener);
    };
    JEvent.click = function (target) {
        for (var x in this.action) {
            if (target.matches(x)) {
                var list_1 = this.action[x];
                for (var y in list_1) {
                    list_1[y].apply(target, [target]);
                }
            }
        }
        //let tag = target.tagName.toLowerCase();
        //let list = this.action[tag] || [];
        //for (var x in list) {
        //    list[x].apply(target, [target]);
        //}
    };
    JEvent.addListener = function (selector, callback) {
        if (typeof (callback) !== 'function')
            return;
        var list = this.action[selector] || (this.action[selector] = []);
        for (var x in list) {
            if (list[x] == callback)
                return;
        }
        list.push(callback);
    };
    JEvent.removeListener = function (selector, callback) {
        if (!callback) {
            delete this.action[selector];
            return;
        }
        var list = this.action[selector] || [];
        var i = list.length;
        while (i--) {
            list[i] == callback && list.splice(i, 1);
        }
    };
    JEvent.action = {};
    JEvent.listener = function (e) {
        var target = e.target || e.srcElement;
        JEvent.click(target);
    };
    return JEvent;
}());
JEvent.init();
//# sourceMappingURL=JEvent.js.map