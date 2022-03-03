const defaultMaxWidth = "300px";
const defaultBackground = "rgba(255, 255, 255, 1)";
const defaultColor = "rgba(0, 0, 0, 1)";

export default class Pannel {
    dom: HTMLElement;
    titleDom: HTMLElement;
    listDom: HTMLElement;
    isInsert: boolean = false;
    name?: string;
    className?: string;
    maxWidth?: string;
    background?: string;
    color?: string;
    title?: string;
    list: Array<PannelListValue> = [];
    constructor(options?: PannelOptions) {
        options && this.setOptions(options);
        this.init();
    }

    init(): void {
        const dom = document.createElement('div');
        this.name && dom.setAttribute('name', this.name);
        this.className && dom.setAttribute('class', this.className);
        dom.style.maxWidth = this.maxWidth || defaultMaxWidth;
        dom.style.background = this.background || defaultBackground;
        dom.style.color = this.color || defaultColor;
        dom.style.position = 'fixed';
        dom.style.display = 'block';
        dom.style.top = '0';
        dom.style.left = '0';
        this.dom = dom;
        this.createTitle();
        this.createList();
    }

    setOptions(options?: PannelOptions): void {
        if(!options) return;
        this.name = options.name;
        this.className = options.className;
        this.maxWidth = options.maxWidth;
        this.background = options.background;
        this.color = options.color;
        this.title = options.title;
        this.list = options.list || [];
    }

    setList(list?: Array<PannelListValue>): void {
        this.list = list || [];
    }

    createTitle(): void {
        if(!this.dom) return;
        if(!this.titleDom) {
            const dom = document.createElement('h3');
            dom.style.textAlign = 'center';
            this.titleDom = dom;
        }
        if(this.title) {
            this.titleDom.innerText = this.title;
            if(!this.dom.contains(this.titleDom)) {
                this.dom.childElementCount === 0 ? this.dom.appendChild(this.titleDom) : this.dom.insertBefore(this.titleDom, this.dom.firstChild);
            }
        } else {
            this.dom.contains(this.titleDom) && this.dom.removeChild(this.titleDom);
        }
    }

    createList(): void {
        if(!this.dom) return;
        if(!this.listDom) {
            const dom = document.createElement('ul');
            dom.style.listStyle = 'none';
            dom.style.padding = '0';
            dom.style.margin = '0 12px';
            this.listDom = dom;
        }
        if(!this.list || this.list.length === 0) {
            this.dom.contains(this.listDom) && this.dom.removeChild(this.listDom);
            this.dom.style.display = 'none';
        } else {
            this.dom.style.display = 'block';
            if(!this.dom.contains(this.listDom)) {
                this.dom.appendChild(this.listDom);
            }
            this.listDom.innerHTML = "";
            this.list.forEach(({label, value}) => {
                const liDom = document.createElement("li");
                liDom.style.display = 'grid';
                liDom.style.gridTemplateColumns = '70px 1fr';
                liDom.style.columnGap = '12px';
                liDom.style.margin = '6px 0';
                const labelDom = document.createElement("span");
                labelDom.style.textAlign = 'right';
                // labelDom.style.fontWeight = 'bold';
                labelDom.innerHTML = label;
                liDom.appendChild(labelDom);
                const valueDom = document.createElement('span');
                valueDom.innerHTML = value;
                liDom.appendChild(valueDom);
                this.listDom.appendChild(liDom);
            })
        }
    }

    update(): void {
        if(!this.isInsert) {
            document.body.appendChild(this.dom);
            this.isInsert = true;
        }
        this.createTitle();
        this.createList();
    }
}