class Broadcast {
    private static manager: Broadcast = null;

    /**
     * 默认的通知队列
     * */
    public static default() {
        if (!this.manager)
            this.manager = new Broadcast();

        return this.manager;
    }

    /**根据 名称保存的 回调的列表*/
    private map = new Object();

    /**
     * 添加 广播
     * @param target 响应的对象
     * @param name  响应的广播名称
     * @param block 响应的关闭回调
     */
    public addListener(target: any, name: string, block: Function) {
        if (name === void 0 || !name || name == "") return;
        if (target === void 0 || !target) return;
        if (block === void 0 || !block || typeof (block) !== "function") return;

        let list;
        if (this.map[name] === void 0) {
            list = [];
            this.map[name] = list;
        } else {
            list = this.map[name];
        }

        for (var i = 0; i < list.length; i++) {
            let obj = list[i];
            if (target == obj.target && block == obj.block) {
                return;
            }
        }

        list.push({ name: name, target: target, block: block });
    }

    /**
     * 移除 广播
     * @param target 必须指定
     * @param name  如果name 未指定,则删除所有name中target的回调
     * @param block 如果指定了回调,只有相同是才会删除
     */
    public removeListener(target: any, name?: string, block?: Function) {
        if (target === void 0 || !target) return;
        if (name !== void 0 && name && name != "") {
            if (this.map[name] === void 0) return;
            console.log(this.map[name]);
            let list = this.map[name];

            for (var i = list.length - 1; i >= 0; i--) {
                let obj = list[i];
                if (block) {
                    if (target == obj.target && block == obj.block) {
                        list.splice(i, 1);
                        break;
                    }
                } else {
                    if (target == obj.target) {
                        list.splice(i, 1);
                    }
                }
            }

            return;
        }

        for (var x in this.map) {
            let list: Array<any> = this.map[x];

            for (var i = list.length - 1; i >= 0; i--) {
                let obj = list[i];
                if (block) {
                    if (target == obj.target && block == obj.block) {
                        list.splice(i, 1);
                        break;
                    }
                } else {
                    if (target == obj.target) {
                        list.splice(i, 1);
                    }
                }
            }
        }
    }

    /**
     * 发送广播
     * @param name 广播名称
     * @param data 广播发送的数据
     */
    public post(name: string, data?: any) {
        if (name === void 0 || !name || name == "") return;
        if (this.map[name] === void 0) return;
        let list = this.map[name];

        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            if (typeof (obj.block) === "function") {
                obj.block(obj.name, data);
            }
        }
    }
}




//class test {
//    public name = "test";

//    public doing() {
//        Dispense.default().addListener(this, "balanceUpdate", this.balanceUpdate);

//        Dispense.default().addListener(this, "statusUpdate", this.statusUpdate);


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
//        Dispense.default().addListener(this, "balanceUpdate", this.balanceUpdate);

//        Dispense.default().addListener(this, "statusUpdate", this.statusUpdate);


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


//Dispense.default().post("balanceUpdate", 10000);
//Dispense.default().post("statusUpdate", 2);
