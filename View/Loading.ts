class Loading {
    
    private static amount = 0;
    private static timer = 0;
    private static delay = 500;

    public static start() {
        this.amount++;

        document.body.appendChild(this.view);
        clearTimeout(this.timer);
    }

    public static stop() {
        (--this.amount) <= 0 && (this.timer = setTimeout(() => {
            this.amount <= 0 && this.view.remove();
        }, this.delay))
    }


    private static _view: HTMLElement;
    private static get view() {
        if (!this._view) {
            this._view = document.createElement('x-loading');            
        }
        return this._view;
    }

}

