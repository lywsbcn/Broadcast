var Broadcast = /** @class */ (function () {
    function Broadcast() {
        /**根据 名称保存的 回调的列表*/
        this.map = new Object();
    }
    /**
     * 默认的通知队列
     * */
    Broadcast.default = function () {
        if (!this.manager)
            this.manager = new Broadcast();
        return this.manager;
    };
    /**
     * 添加 广播
     * @param target 响应的对象
     * @param name  响应的广播名称
     * @param block 响应的关闭回调
     */
    Broadcast.prototype.addListener = function (target, name, block) {
        if (name === void 0 || !name || name == "")
            return;
        if (target === void 0 || !target)
            return;
        if (block === void 0 || !block || typeof (block) !== "function")
            return;
        var list;
        if (this.map[name] === void 0) {
            list = [];
            this.map[name] = list;
        }
        else {
            list = this.map[name];
        }
        for (var i = 0; i < list.length; i++) {
            var obj_1 = list[i];
            if (target == obj_1.target && block == obj_1.block) {
                return;
            }
        }
        list.push({ name: name, target: target, block: block });
    };
    /**
     * 移除 广播
     * @param target 必须指定
     * @param name  如果name 未指定,则删除所有name中target的回调
     * @param block 如果指定了回调,只有相同是才会删除
     */
    Broadcast.prototype.removeListener = function (target, name, block) {
        if (target === void 0 || !target)
            return;
        if (name !== void 0 && name && name != "") {
            if (this.map[name] === void 0)
                return;
            console.log(this.map[name]);
            var list_1 = this.map[name];
            for (var i = list_1.length - 1; i >= 0; i--) {
                var obj_2 = list_1[i];
                if (block) {
                    if (target == obj_2.target && block == obj_2.block) {
                        list_1.splice(i, 1);
                        break;
                    }
                }
                else {
                    if (target == obj_2.target) {
                        list_1.splice(i, 1);
                    }
                }
            }
            return;
        }
        for (var x in this.map) {
            var list_2 = this.map[x];
            for (var i = list_2.length - 1; i >= 0; i--) {
                var obj_3 = list_2[i];
                if (block) {
                    if (target == obj_3.target && block == obj_3.block) {
                        list_2.splice(i, 1);
                        break;
                    }
                }
                else {
                    if (target == obj_3.target) {
                        list_2.splice(i, 1);
                    }
                }
            }
        }
    };
    /**
     * 发送广播
     * @param name 广播名称
     * @param data 广播发送的数据
     */
    Broadcast.prototype.post = function (name, data) {
        if (name === void 0 || !name || name == "")
            return;
        if (this.map[name] === void 0)
            return;
        var list = this.map[name];
        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            if (typeof (obj.block) === "function") {
                obj.block(obj.name, data);
            }
        }
    };
    Broadcast.manager = null;
    return Broadcast;
}());
//class test {
//    public name = "test";
//    public doing() {
//        Broadcast.default().addListener(this, "balanceUpdate", this.balanceUpdate);
//        Broadcast.default().addListener(this, "statusUpdate", this.statusUpdate);
//    }
//    private balanceUpdate(dis,data) {
//        console.log(dis,data);
//    }
//    private statusUpdate(dis, data) {
//        console.log(dis, data);
//    }
//}
//class test2 {
//    public name = "test2";
//    public doing() {
//        Broadcast.default().addListener(this, "balanceUpdate", this.balanceUpdate);
//        Broadcast.default().addListener(this, "statusUpdate", this.statusUpdate);
//    }
//    private balanceUpdate(dis, data) {
//        console.log(dis, data);
//    }
//    private statusUpdate(dis, data) {
//        console.log(dis, data);
//    }
//}
//let aa = new test();
//aa.doing();
//let bb = new test2();
//bb.doing();
//Broadcast.default().post("balanceUpdate", 10000);
//Broadcast.default().post("statusUpdate", 2);
//# sourceMappingURL=Broadcast.js.map