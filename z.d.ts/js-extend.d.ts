interface Element {
    setStyle(style: StyleStringInterface): HTMLElement;
    updateStyle(styel: StyleInterface): HTMLElement;
    at(action: string): HTMLElement;
    addSubview(...a): HTMLElement;
    html(str): HTMLElement;
    /**
     * 上级
     * @param selector
     */
    parent(selector?): HTMLElement | null;
    addClass(...a: Array<string>): HTMLElement;
}

interface HTMLElement {
    intVal: number;
    floatVal: number;
    md5Val: string;
    unitVal(a?: 's' | 'e'): number;
}

interface HTMLSelectElement {
    sub(item, selected?);
}




interface String {
    element: HTMLElement;
    C: HTMLElement;
    trim(): string;
    isEmpty: boolean;
    md5: string;
    L: string;
    Lreplace: string;
}


interface ObjectConstructor {
    isArray(a): boolean;
}

interface Array<T> {
    
}

