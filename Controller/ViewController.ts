class ViewController extends Jinclude {

    private _inited = false;

    public init() {
        !this._inited && this._layout();
        this._inited = true;
        return this;
    }

    private _layout() {
        this.startInclude();
        this.layout();
    }
    protected layout() {

    }

    protected endInclude() {
        let url = this.loadView();
        if (!url) {
            this._onCreate();
            return;
        }

        Jinclude.get(url, (str: string) => {
            str = this.disposeView(str);
            let div = document.createElement('div');
            div.innerHTML = str;

            this._view = <HTMLElement>div.firstElementChild;
            let nodes = this._view.querySelectorAll('[jv]');

            nodes.forEach((node) => {
                var jv = node.getAttribute('jv');
                jv && this[jv] === void 0 && (this[jv] = node);
            })
            this._onCreate();
        }, () => { this._onCreate(); })

    }

    protected loadView(): string {
        return null;
    }

    protected disposeView(str: string) {
        return str.Lreplace;
    } 

    private _onCreate() {
        if (!this._view) {
            this._view = document.createElement('div');
        }
        this.container.appendChild(this.view);
        this.onCreate();
        this._addEvent();
    }

    protected onCreate() {

    }

    private _onAppear() {

        this.onAppear();
    }
    protected onAppear() {

    }

    private _onDisappear() {

        this.onDisappear();
    }
    protected onDisappear() {

    }

    private _addEvent() {
        this.view.addEventListener('click', this._listener);
        this.addEvent();
    }
    protected addEvent() {

    }
    private _action = {
        'vc-cancel': () => { this.naviVc && this.naviVc.pop(); },
        'vc-cancel-all': () => { this.naviVc && this.naviVc.popAll(); }
    }
    public action = {};
    private _listener = (e) => {
        let target = e.target || e.srcElement;
        let at = target.getAttribute('at');
        this._action && this._action[at] && this._action[at]();
        this.action && this.action[at] && this.action[at](target);
        this.onListener(at, target);
    }

    protected onListener(at, target) {

    }

    private _removeEvent() {
        this.view.removeEventListener('click', this._listener);
        this.removeEvent();
    }
    protected removeEvent() {

    }

    private _onDestory() {
        this._removeEvent();
        this.container.remove();
        this.onDestory();
    }
    protected onDestory() {

    }


    protected _container: HTMLElement;
    public get container() {
        if (!this._container) {
            this._container = document.createElement('x-viewController');
            this._container.updateStyle({
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: '#fff',
                overflowX: 'hidden', overflowY: 'auto'
            })
        }
        return this._container;
    }

    private _view: HTMLElement;
    public get view() {
        return this._view;
    }


    private __button: any;
    private _title: string;
    set title(title: string) {
        this._title = title;
        this.__button && this.__button.text && (this.__button.text.innerHTML = title);
    }
    get title() {
        return this._title;
    }


    public naviVc: NaviController;

    public renderController(parent: HTMLElement) {

        if (!parent) return;

        parent.appendChild(this.container);

        this._onAppear();

    }

    public __appearController() {

        this.container.style.display = 'initial';

        this._onAppear();
    }

    public __disappearController() {
        this.container.style.display = 'none';

        this._onDisappear();
    }

    public __pushToNaviController(navi: NaviController) {
        this.naviVc = navi;
        navi.container.appendChild(this.container);
        this._onAppear();
    }

    public __popFromNaviController() {
        this._onDisappear();
        this.container.remove();
        this._onDestory();
    }


}

class NaviController extends ViewController {

    private _controllers: Array<ViewController> = [];
    private get controllers() {
        return this._controllers || (this._controllers = []);
    }
    get top() {
        let len = this.controllers.length;
        return len == 0 ? null : this.controllers[len - 1];
    }

    public push(viewController: ViewController) {
        let top = this.top;
        if (!viewController || top == viewController) return;
        top && top.__disappearController();
        viewController.init().__pushToNaviController(this);
        this.controllers.push(viewController);
    }

    public pop() {
        if (this.controllers.length == 0) return;

        let viewController = this.controllers.pop();
        viewController && viewController.__popFromNaviController();

        let top = this.top;
        top && top.__appearController();
    }

    public popAll() {
        for (var x in this.controllers) {
            this.controllers[x].__popFromNaviController();
        }
        this._controllers = [];
    }


    public __popFromNaviController() {

        this.popAll();
        this['onDisappear']();
        this.container.remove();
        this['onDestory']();

    }

    public get container() {
        if (!this._container) {
            this._container = document.createElement('x-naviController');
            this._container.updateStyle({
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: '#fff',
                overflowX: 'hidden', overflowY: 'auto'
            })
        }
        return this._container;
    }
}

interface NpcControllerItem {
    name: string,
    get: () => ViewController;
    vc?: ViewController
}
class NpcController {

    public static controllers: { [k: string]: ViewController } = {};
    public static navibar: HTMLElement;
    public static container: HTMLElement;

    public static init() {

        this.navibar.addEventListener('click', (this._listener = (e) => {
            let target = e.target || e.srcElement;
            let at = target.getAttribute('at');
            let ptarget = target.parentElement;

            switch (at) {
                case 'close':
                    ptarget.remove();
                    this.del(ptarget['npcItem']);
                    break;
                case 'text':
                    this.show(ptarget['npcItem']);
                    break;
            }

        }))

        return this;
    }

    private static _listener: any;

    public static button(): any {
        let button = 'div'.C;
        let text = 'div'.C;
        let close = 'span'.C;

        close.addClass('fa fa-close').at('close');
        text.at('text');
        button['text'] = text;
        button.updateStyle({ cursor: 'pointer' }).addSubview(text, close);

        return button;
    }


    static add(item: NpcControllerItem) {

        if (this.controllers[item.name] !== void 0) {
            this.show(item);
            return;
        }

        let last = this.navibar.lastElementChild;
        last && this.hide(last['npcItem']);

        let vc = item.get().init();
        this.controllers[item.name] = vc;
        let button = this.button();
        button.text.innerHTML = vc.title;
        button['npcItem'] = item;

        vc['__button'] = button;

        this.navibar.appendChild(button);
        this.container.appendChild(vc.container);
        this.toggleButton(button);
    }

    static hide(item: NpcControllerItem) {

        let vc = this.controllers[item.name];
        vc && vc.__disappearController();
    }

    static show(item: NpcControllerItem) {
        let last = this.navibar.lastElementChild;
        last && last['npcItem'].name != item.name && this.hide(last['npcItem']);


        let vc = this.controllers[item.name];
        vc && vc.__appearController();

        let nodes = this.navibar.children;
        for (var i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            if (node['npcItem'].name == item.name) {
                this.toggleButton(node);
                break;
            }
        }
    }

    static del(item: NpcControllerItem) {

        let vc = this.controllers[item.name];
        vc && vc.__popFromNaviController();
        delete this.controllers[item.name];

        let last = this.navibar.lastElementChild;
        last && this.show(last['npcItem']);

    }



    static toggleButton(btn) {

        let nodes = this.navibar.childNodes;

        nodes.forEach(function (node: Element) {
            if (node == btn) {
                node.setAttribute('active', '');
            } else {
                node.removeAttribute('active');
            }
        })

    }

}