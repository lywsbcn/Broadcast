class Jform {

    public static get(element: Element, selector = 'name') {
        let data: any = {};
        let nodes = element.querySelectorAll("[" + selector + "]");

        nodes.forEach((node) => {
            let tag = node.tagName.toLocaleLowerCase();
            let name = node.getAttribute(selector);

            name && (this.getAction[tag] ? this.getAction[tag](data, node, name) : this.getAction.__default(data, node, name));
        })

        return data;
    }

    private static getAction = {
        input: function (data, node: HTMLInputElement, name) {
            let type = node.type;

            switch (type) {
                case "radio":
                    data[name] === void 0 && (data[name] = null);
                    node.checked && (data[name] = node.value);
                    break;
                case "checkbox":
                    data[name] === void 0 && (data[name] = []);
                    node.checked && this.__getSetData(data, node.value, name);
                    break;

                default:
                    this.__getSetData(data, node.value, name);
                    break
            }
            
        },
        select: function (data, node, name) { this.input(data, node, name); },

        'x-enum': function (data, node, name) {
            data[name] === void 0 && (data[name] = null);
            let ele = node.querySelector('[checked]');
            ele && (data[name] = ele.getAttribute('value'));
        },
        'x-checkbox': function (data, node, name) {
            data[name] === void 0 && (data[name] = []);
            node.hasAttribute('checked') && this.__getSetData(data, node.getAttribute('value'), name);
        },

        'x-switch': function (data, node, name) {
            data[name] = node.hasAttribute('checked') ? 1 : 0;
        },
        'x-switch-ios': function (data, node, name) {
            this['x-switch'](data, node, name);
        },
        'x-radio': function (data, node, name) {
            data[name] === void 0 && (data[name] = null);
            node.hasAttribute('checked') && (data[name] = node.getAttribute('value'));
        },

        __default: function (data, node: Element, name) {
            let value = node.getAttribute('value') || node.innerHTML || "";
            this.__getSetData(data, value, name);
        },
        __getSetData: function (data, value, name) {
            if (data[name] === void 0 || data[name] === null) (data[name] = value);
            else {
                if (Array.isArray(data[name])) data[name].push(value);
                else data[name] = [data[name]], data[name].push(value);
            }
        }
    }


    public static set(element: Element, data: Object, selector: string = "name") {
        let nodes = element.querySelectorAll("[" + selector + "]");
        nodes.forEach((node) => {
            let tag = node.tagName.toLocaleLowerCase();
            let name = node.getAttribute(selector);
            let value = data[name] === void 0 ? undefined : data[name];
            value !==void 0 && name && (this.setAction[tag] ? this.setAction[tag](value, node, name) : this.setAction.__default(value, node, name));
        })
    }

    private static setAction = {
        input: function (value, node, name) {
            let type = node.type;
            switch (type) {
                case "radio":
                    node.checked = (value + "" == node.value);
                    break;
                case "checkbox":
                    value = Array.isArray(value) ? value : value.split(',');
                    let len = value.length;
                    for (var i = 0; i < len; i++) {
                        if (value[i] + "" == node.value) {
                            node.checked = true;
                            break;
                        }
                    }

                    break;

                default:
                    node.value = value;
                    break
            }
        },

        'x-enum': function (value, node, name) {
            let subs = node.children;
            for (var i = 0; i < subs.length; i++) {
                if (subs[i].getAttribute('value') == value + "") subs[i].setAttribute('checked','');
                else subs[i].removeAttribute('checked');
            }
        },
        'x-checkbox': function (value, node, name) {
            value = Array.isArray(value) ? value : (value+"").split(',');
            let len = value.length;
            for (var i = 0; i < len; i++) {
                if (value[i] + "" == node.getAttribute('value')) {
                    node.setAttribute('checked', '')
                    break;
                } else {
                    node.removeAttribute('checked');
                }
            }
        },

        'x-switch': function (value, node, name) {
            value ? node.setAttrubite('checked', '') : node.removeAttribute('checked');
        },
        'x-switch-ios': function (value, node, name) {
            this['x-switch'](value, node, name);
        },

        'x-radio': function (value, node, name) {
            node.getAttribute('value') == value + "" ? node.setAttribute('checked', '') : node.removeAttribute('checked');
        },

        select: function (value, node, name) { this.input(value, node, name); },

        __default: function (value, node, name) {
            node.value === void 0 ? node.innerHTML = value : node.value = value;
        }
    }

}