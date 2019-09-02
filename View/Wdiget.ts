class Wdiget extends View {

    public init() {
        super.init();



        this.view.addEventListener("click", this.__listener);

        this.show();

        return this;
    }

    protected show() {
        document.body.appendChild(this.view);

        setTimeout(() => {
            this.view.style.opacity = "1";
            this.content.style.transform = "scale(1)";
        }, 100)


    }

    protected hide() {
        this.view.style.opacity = "0";
        this.content.style.transform = "scale(0.8)";
        setTimeout(() => { this.view.remove() }, 200)

    }

    public get view() {
        if (!this._view) {
            this._view = "Wdiget".C.setStyle({
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'position': 'fixed',
                'background': 'rgba(0,0,0,0.1)',
                'opacity': 0,
                'top': 0,
                'left': 0,
                'right': 0,
                'bottom': 0,
                'transition-duration': '0.05s'
            }).addSubview(this.content);
        }
        return this._view;
    }

    protected _content: HTMLDivElement;
    protected get content(): HTMLDivElement {
        return this._content || (this._content = 'div'.C.setStyle({
            'max-height': '100%',
            'overflow': 'auto',
            'background': '#fff',
            'position': 'relative',
            'transform': "scale(0.8)",
            'transition-duration': '.05s'
        }));
    }


    private __listener = (e) => {
        e.stopPropagation();
        let target = e.target || e.srcElement
        let at = target.getAttribute("at") || "";
        this._listener(at, target);
    }

    protected _listener(at: string, target: HTMLElement) {

    }


    public destory() {
        super.destory();

        this.view.removeEventListener("click", this.__listener);
        this.hide();
    }

}


class WdigetAlert extends Wdiget {

    public init() {
        super.init();

        this.content.updateStyle({
            borderRadius: "5px",
            width: "300px",
            background: "rgba(242,242,242,.98)",
            color: '#000',
            boxShadow: '3px 3px 10px #999999',
        }).addSubview(this.tilte, this.textPre, this.buttonLayer)

        return this;
    }

    protected _listener(at, target) {
        switch (at) {
            case "confirm":
                if (typeof (this._handler) === 'function') {
                    this._handler();
                }
                this._handler = null;
                this.destory();
                break;
        }
    }

    protected _title: HTMLDivElement;
    protected get tilte(): HTMLDivElement {
        return this._title || (this._title = 'div'.C.updateStyle({
            //fontWeight: 'bold',
            //textAlign: 'center',
            padding: "8px 10px"
        }).html('提示'))
    }

    protected _textPre: HTMLPreElement;
    protected get textPre(): HTMLPreElement {
        return this._textPre || (this._textPre = 'pre'.C.updateStyle({
            textAlign: 'center',
            fontSize: '12px',
            margin: '0 10px',
            padding: '10px',
            background: '#fff',
            border: '1px solid #ccc',
            minHeight: '60px',
            whiteSpace: 'normal'
        }))
    }

    protected _buttonLayer: HTMLDivElement;
    protected get buttonLayer(): HTMLDivElement {
        return this._buttonLayer || (this._buttonLayer = 'div'.C.updateStyle({
            height: '35px',
            lineHeight: '35px',
            margin: '0 10px 10px 10px',
            position: 'relative',
            cursor: 'pointer',
            background: '#fafafa',
            border: '1px solid #ccc',
            borderTop: 0
        }).addSubview(this.confirmButton))
    }

    protected _confirmButton: HTMLDivElement;
    protected get confirmButton(): HTMLDivElement {
        return this._confirmButton || (this._confirmButton = 'div'.C.updateStyle({
            width: '100%',
            height: '100%',
            display: 'inline-block',
            textAlign: 'center',
            color: 'rgb(52,124,232)',

        }).at('confirm').html('确定'))
    }

    /**
     * 设置标题
     * @param title
     * @param callback 传入标题对象
     */
    public setTitle(title: string, callback?: (title: HTMLDivElement) => void) {
        this.tilte.innerHTML = title;
        if (typeof (callback) === 'function') {
            callback(this.tilte)
        }
        return this;
    }

    /**
     * 设置确认按钮
     * @param text
     * @param callback 传入确认按钮
     */
    public setConfirmButton(text: string, callback?: (confirm: HTMLDivElement) => void) {
        this.confirmButton.innerHTML = text;
        if (typeof (callback) === 'function') {
            callback(this.confirmButton)
        }
        return this;
    }


    protected _handler: Function;
    /**
     * 点击按钮回调
     * @param callback
     */
    public callback(callback: Function) {
        this._handler = callback;
        return this;
    }

    /**
     * 设置文本
     * @param text
     * @param callback 点击按钮回调
     */
    public text(text, callback?: Function) {
        this.textPre.innerHTML = text;
        this.callback(callback);
        return this;
    }
}

class WdigetMsg extends WdigetAlert {

    protected _comfirmHandler: Function;
    protected _cancelHandler: Function;

    public init() {
        super.init();

        this.confirmButton.style.width = "50%";
        this.buttonLayer.appendChild(this.cancelButton);
        this.buttonLayer.appendChild(this.line);
        this.buttonLayer.appendChild(this.confirmButton);


        return this
    }

    protected _listener(at, target) {
        switch (at) {
            case "confirm":
                if (typeof (this._handler) === 'function') {
                    this._handler(true);
                }
                if (typeof (this._comfirmHandler) === 'function') {
                    this._comfirmHandler();
                }

                this._handler = this._comfirmHandler = null;

                this.destory();
                break;
            case "cancel":
                if (typeof (this._handler) === 'function') {
                    this._handler(false);
                }
                if (typeof (this._cancelHandler) === 'function') {
                    this._cancelHandler();
                }
                this._handler = this._cancelHandler = null;
                this.destory();
                break;
        }
    }

    private _line: HTMLDivElement;
    private get line(): HTMLDivElement {
        return this._line || (this._line = 'div'.C.updateStyle({
            position: 'absolute', top: 0, left: '50%', width: '1px', height: '100%', background: '#ccc'
        }))
    }


    protected _cancelButton: HTMLDivElement
    protected get cancelButton(): HTMLDivElement {
        return this._cancelButton || (this._cancelButton = 'div'.C.updateStyle({
            height: '100%', width: '50%', textAlign: 'center', display: 'inline-block', color: '#fb4a2c'
        })
            .html("取消")
            .at("cancel"))
    }

    /**
     * 设置取消按钮
     * @param text
     * @param callback 传入取消按钮
     */
    public setCancelButton(text, callback?: (cancel: HTMLDivElement) => void) {
        this.cancelButton.innerHTML = text;
        if (typeof (callback) === 'function') {
            callback(this.cancelButton)
        }
        return this;
    }

    /**
     * 点击确认按钮回调
     * 如果 没有返回值,或者返回true 则关闭窗口
     * 如果 返回 false ,则不关闭窗口
     * @param callback
     */
    public confirm(callback: Function) {
        this._comfirmHandler = callback;
        return this;
    }

    /**
     * 点击取消按钮回调
     * @param callback
     */
    public cancel(callback: Function) {
        this._cancelHandler = callback;
        return this;
    }
}


class WdigetEdit extends WdigetMsg {

    protected _input: HTMLInputElement;
    private get input(): HTMLInputElement {
        return this._input || (this._input = 'input'.C.updateStyle({
            border: '1px solid #ccc',
            borderRadius: '3px',
            boxSizing: 'border-box',
            padding: '8px 5px',
            width: '80'
        }))
    }

    protected _tip: HTMLDivElement;
    protected get tip(): HTMLDivElement {
        return this._tip || (this._tip = 'div'.C.updateStyle({
            color: '#f00',
            margin: '0 10%',
            padding: '0 5px',
            boxSizing: 'border-box',
            width: '80%'
        }))
    }


    /**
     * 设置提示说明
     * @param tip
     * @param callback 回传 tip对象
     */
    public setTip(tip: string, callback?: (tip: HTMLDivElement) => void) {
        this.tip.innerHTML = tip;
        if (typeof (callback) === 'function') {
            callback(this.tip)
        }
        return this;
    }

    /**
     * 设置输入框的值
     * @param value
     * @param callback 回传 input对象
     */
    public setInput(value: string, callback?: (input: HTMLInputElement) => void) {
        this.input.value = value;
        if (typeof (callback) === 'function') {
            callback(this.input)
        }
        return this;
    }

    public setInputType(type: string, callback?: (input: HTMLInputElement) => void) {
        this.input.type = type;
        if (typeof (callback) === 'function') {
            callback(this.input)
        }
        return this;
    }

    /**
     * 设置输入框的placeholder
     * @param holder
     * @param callback 回传 input对象
     */
    public setPlaceholder(holder: string, callback?: (input: HTMLInputElement) => void) {
        this.input.placeholder = holder;
        if (typeof (callback) === 'function') {
            callback(this.input)
        }
        return this;
    }

    /**
     * 设置输入框的值
     * @param text
     * @param callback 点击确定按钮回调
     */
    public text(text, callback?: Function) {
        this.input.value = text;
        this.confirm(callback);
        return this;
    }

    public init() {
        super.init();

        this.textPre.appendChild(this.input);
        this.textPre.appendChild(this.tip);

        return this;
    }
    protected _listener(at, target) {
        switch (at) {
            case "confirm":
                if (typeof (this._comfirmHandler) === 'function') {
                    let result = this._comfirmHandler(this.input.value);

                    if (result !== void 0 && !result) return;
                }

                this._comfirmHandler = null;

                this.destory();
                break;
            case "cancel":
                if (typeof (this._cancelHandler) === 'function') {
                    this._cancelHandler();
                }
                this._cancelHandler = null;
                this.destory();
                break;
        }
    }
}

class WdigetWindow extends Wdiget {

    public init() {
        super.init();

        this.content.appendChild(this.titleLayer);
        this.content.appendChild(this.layer);

        return this;
    }


    public size(w, h) {
        this.content.updateStyle({
            width: w,
            height: h
        });
        return this;
    }
    public title(title: string) {
        this.titleLabel.innerHTML = title;
        return this;
    }

    public setContent(callback) {
        typeof (callback) === 'function' && callback(this.layer, this);

        this.actionListener['addEvent'] && this.actionListener['addEvent'].call(this);
        return this;
    }

    public setHtml(html: string, callback) {
        this.setContent(function (layer: HTMLDivElement, win) {
            layer.innerHTML = html;

            let nodes = layer.querySelectorAll('[jv]');

            nodes.forEach((node) => {
                var jv = node.getAttribute('jv');
                if (jv && win[jv] === void 0) {
                    win[jv] = node;
                }
            })

            typeof (callback) === 'function' && callback(layer, win);
        })

        return this;
    }

    public setAction(action) {
        this.action = action;
        return this;
    }

    private _titleLayer: HTMLDivElement;
    private get titleLayer() {
        if (!this._titleLayer) {
            this._titleLayer = document.createElement('div');
            this._titleLayer.updateStyle({
                height: '40px',
                lineHeight: '40px',
                background: '#fafafa',
                borderBottom: '1px solid #d4d4d4',
                boxSizing: 'border-box',
                padding: '0 10px'
            });

            this._titleLayer.appendChild(this.titleLabel);
            this._titleLayer.appendChild(this.closebutton)
        }
        return this._titleLayer;
    }

    private _titleLabel: HTMLSpanElement;
    private get titleLabel() {
        if (!this._titleLabel) {
            this._titleLabel = document.createElement('span');
            this._titleLabel.updateStyle({ fontWeight: 'bold' });
        }
        return this._titleLabel;
    }

    private _closebutton: HTMLSpanElement;
    private get closebutton() {
        if (!this._closebutton) {
            this._closebutton = document.createElement('span');
            this._closebutton.updateStyle({ cssFloat: 'right', lineHeight: '40px', fontSize: '18px', cursor: 'pointer' })
            this._closebutton.setAttribute('class', "fa fa-close");
            this._closebutton.setAttribute('at', 'window_close');
        }
        return this._closebutton;
    }

    private _layer: HTMLDivElement;
    private get layer() {
        if (!this._layer) {
            this._layer = document.createElement('div');
            this._layer.updateStyle({
                position: 'absolute', top: '40px', left: 0, right: 0, bottom: 0, overflowX: 'hidden', overflowY: 'auto'
            })
        }
        return this._layer;
    }


    protected _listener(at: string, target: HTMLElement) {
        this.action[at] && this.action[at].call(this, target, this);
        this.actionListener[at] && this.actionListener[at].call(this, target, this);
    }

    private actionListener = {

        window_close: () => { this.destory() }
    }

    private action = {
    }

    public destory() {
        super.destory();

        this.action['removeEvent'] && this.action['removeEvent'].call(this);
    }

}

//window.addEventListener('load', function () {

//    Msg.window.size("800px", "500px")
//})

class Msg {
    public static get alert(): WdigetAlert {
        return new WdigetAlert().init();
    }

    public static get msg(): WdigetMsg {
        return new WdigetMsg().init();
    }

    public static get edit(): WdigetEdit {
        return new WdigetEdit().init();
    }

    public static get window(): WdigetWindow {
        return new WdigetWindow().init();
    }
}


