/*
 * Jui 自定义视图
 * 依赖 JEvent.ts,Extend.ts 
 * */

/** */
class Jui {

    static get Xswitch() {
        return Xswitch;
    }

    static get Xenum() {
        return Xenum;
    }

    static get Xtab() {
        return Xtab;
    }

    static get Xradio() {
        return Xradio;
    }

    static render(element?) {

        for (var x in this) {
            if (typeof (this[x].render) === 'function') {
                this[x].render(element)
            }
        }

    }

    static init() {

        console.log('Jui', 'init....');
        window.addEventListener('load', () => {
            for (var x in this) {
                if (typeof (this[x].init) == 'function') {
                    this[x].init();
                }
            }

        })
    }
}

Jui.init();



class JuiRender {

    static render(element?) {
        element = element === void 0 ? document : element;

        let selector = this.selector();
        if (!selector) return;

        let nodes = element.querySelectorAll(selector);

        nodes.forEach((node) => {
            node.onclick = this.listener.bind(this);
            node.setAttribute('render', '')
        })
    }

    static selector() {
        return ""
    }

    static listener(event: Event) {

    }
}

class Xswitch extends JuiRender {

    static selector() {
        return 'x-switch:not([render]),x-switch-ios:not([render]),x-checkbox:not([render])'
    }

    static listener(e) {
        e.stopPropagation && e.stopPropagation();
        this.click(e.currentTarget);
    }

    static click(target) {
        if (target.hasAttribute('checked')) {
            target.removeAttribute('checked');
        } else {
            target.setAttribute('checked', '');
        }
    }

    static init() {
        JEvent.addListener(this.selector(), (target) => {
            !target.onclick && this.click(target);
        })
    }
}

class Xradio extends JuiRender {
    static selector() {
        return 'x-radio:not([render])'
    }

    static listener(e) {
        e.stopPropagation && e.stopPropagation();
        this.click(e.currentTarget);
    }

    static click(target) {
        target.setAttribute('checked', true);

        var name = target.getAttribute("name");
        if (name) {
            var nodes = document.querySelectorAll("x-radio[name='" + name + "']");
            var len = nodes.length;
            for (var i = 0; i < len; i++) {
                if (nodes[i] == target) continue;
                nodes[i].removeAttribute("checked");
            }
        }
    }

    static init() {
        JEvent.addListener(this.selector(), (target) => {
            !target.onclick && this.click(target);
        })
    }

}

class Xenum extends JuiRender {

    static selector() {
        return 'x-enum:not([render])';
    }

    static listener(event: Event) {
        event.stopPropagation && event.stopPropagation();
        this.click(event.target || event.srcElement);
    }

    static click(target) {
        let source = target.parent('x-enum');
        if (!source) return;

        let nodes = source.children;
        let len = nodes.length;
        for (var i = 0; i < len; i++) {
            let node = nodes.item(i);
            if (node == target) {
                node.setAttribute('checked', '')
            } else {
                node.removeAttribute('checked');
            }
        }
    }

    static init() {
        JEvent.addListener(this.selector()+">*", (target) => {
            !target.onclick && this.click(target);
        })
    }
}


class Xtab extends JuiRender {

    static selector() {
        return 'x-tab:not([render]) > x-tab-button';
    }
    static listener(event: Event) {
        this.click(event.target || event.srcElement);
    }

    static click(target) {
        if (!target.matches('x-i')) return;
        let source = target.parent('x-tab-button');
        if (source.hasAttribute('disabled')) return;
        let ptarget = source.parentElement;
        let tabname = target.getAttribute('tabname');

        let buttons = source.children;
        let buttons_len = buttons.length;
        for (var i = 0; i < buttons_len; i++) {
            let node = buttons[i];
            if (node == target) node.setAttribute('selected', '');
            else node.removeAttribute('selected')
        }

        let content = ptarget.querySelector('x-tab-content');
        if (!content) return;

        let contens = content.children;
        let contens_len = contens.length;
        for (var i = 0; i < contens_len; i++) {
            let node = contens[i];
            let tn = node.getAttribute('tabname');
            if (tn == tabname) node.setAttribute('selected', '');
            else node.removeAttribute('selected')
        }
    }

    static init() {
        JEvent.addListener(this.selector()+ '>x-i', (target) => {
            !target.parentElement.onclick && this.click(target);
        })
    }
}