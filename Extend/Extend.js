/******************************************Element***********************************************/
Element.prototype.setStyle = function (style) {
    var string = "";
    for (var x in style) {
        string += x + ":" + style[x] + ";";
    }
    this.setAttribute("style", string);
    return this;
};
Element.prototype.updateStyle = function (style) {
    for (var x in style) {
        this.style[x] = style[x];
    }
    return this;
};
Element.prototype.at = function (action) {
    this.setAttribute("at", action);
    return this;
};
Element.prototype.addSubview = function () {
    for (var x in arguments) {
        this.appendChild(arguments[x]);
    }
    return this;
};
Element.prototype.html = function (string) {
    this.innerHTML = string;
    return this;
};
Element.prototype.parent = function (selector) {
    var ptarget = this.parentElement;
    if (selector === void 0)
        return ptarget;
    while (ptarget != document.body) {
        if (ptarget.matches(selector))
            return ptarget;
        ptarget = ptarget.parentElement;
    }
    return null;
};
/******************************************HTMLInputElement***********************************************/
Object.defineProperty(HTMLElement.prototype, 'intVal', {
    get: function () {
        var a = parseInt(this.value);
        return isNaN(a) ? 0 : a;
    }
});
Object.defineProperty(HTMLElement.prototype, 'floatVal', {
    get: function () {
        var a = parseFloat(this.value);
        return isNaN(a) ? 0 : a;
    }
});
Object.defineProperty(HTMLElement.prototype, 'md5Val', {
    get: function () {
        return this.value.isEmpty ? "" : this.value.md5;
    }
});
HTMLElement.prototype.unitVal = function (a) {
    if (this.value.isEmpty)
        return 0;
    return Jtool.dateToUnix(this.value, a);
};
/******************************************HTMLSelectElement***********************************************/
HTMLSelectElement.prototype.sub = function (item, selected) {
    if (Object.isArray(item)) {
        for (var x in item) {
            var option = document.createElement('option');
            option.value = item[x][0];
            option.innerHTML = item[x][1];
            if (selected == item[x][0]) {
                option.selected = true;
            }
            this.appendChild(option);
        }
    }
    else {
        for (var x in item) {
            var option = document.createElement('option');
            option.innerHTML = item[x];
            option.value = x;
            if (selected == x) {
                option.selected = true;
            }
            this.appendChild(option);
        }
    }
};
/******************************************String***********************************************/
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
Object.defineProperty(String.prototype, "isEmpty", {
    get: function () {
        return this.trim().length == 0;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(String.prototype, "md5", {
    get: function () {
        return hex_md5(this);
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(String.prototype, "C", {
    get: function () {
        return document.createElement(this);
    }
});
Object.isArray = function (a) {
    return Object.prototype.toString.call(a) == '[object Array]';
};
//# sourceMappingURL=Extend.js.map