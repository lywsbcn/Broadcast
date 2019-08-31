class JEvent {
    private static action: { [K: string]: any } = {};

    public static init() {
        console.log("JEvnet", 'init....');
        window.addEventListener('click', this.listener);
    }

    private static listener = (e) => {
        let target = e.target || e.srcElement;
        JEvent.click(target);
    }
    private static click(target) {

        for (var x in this.action) {

            if (target.matches(x)) {

                let list = this.action[x];

                for (var y in list) {
                    list[y].apply(target, [target]);
                }

            }

        }

        //let tag = target.tagName.toLowerCase();
        //let list = this.action[tag] || [];
        //for (var x in list) {
        //    list[x].apply(target, [target]);
        //}
    }

    public static addListener(selector: string, callback: Function) {
        if (typeof (callback) !== 'function') return;

        let list = this.action[selector] || (this.action[selector] = []);
        for (var x in list) {
            if (list[x] == callback) return;
        }
        list.push(callback);
    }

    public static removeListener(selector: string, callback?: Function) {

        if (!callback) {
            delete this.action[selector];
            return;
        }
        let list = this.action[selector] || [];
        let i = list.length;
        while (i--) {
            list[i] == callback && list.splice(i, 1);
        }
    }
}

JEvent.init();