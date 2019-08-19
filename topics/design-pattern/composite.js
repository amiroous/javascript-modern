class Component {

    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get type() {}
    addChild(component) {}

    removeChildByName(componentName) {}
    removeChildByIndex(componentIndex) {}
    getChildByName(componentName) {}
    getChildByIndex(componentIndex) {}

    get numberOfChildren() {}

    static logNodeTree(root) {

        let nodeTree = '';

        const scan = (node, indent = 0) => {

            nodeTree += `${'--'.repeat(indent)}${node.name}\n`;
            indent++;

            for (let i = 0; i < node.numberOfChildren; i++) {
                scan(node.getChildByIndex(i), indent);
            }

        };

        scan(root);

        return nodeTree;
    }
}


class Leaf extends Component{

    constructor(name) {
        super(name);
        this._type = 'Leaf Node';
    }

    get type() {
        return this._type;
    }

    get numberOfChildren() {
        return 0;
    }
}


class Composite extends Component{

    constructor(name) {
        super(name);
        this._type = 'Composite Node';
        this._children = [];
    }

    get type() {
        return this._type;
    }

    addChild(component) {
        this._children = [...this._children, component];
    }

    removeChildByName(componentName) {
        this._children = this._children
            .filter(child => child.name !== componentName);
    }

    removeChildByIndex(componentIndex) {
        this._children = this._children.filter(child => this._children.indexOf(child) !== componentIndex);
    }

    getChildByName(componentName) {
        return this._children.find(child => child.name === componentName);
    }

    getChildByIndex(componentIndex) {
        return this._children.find(child => this._children.indexOf(child) === componentIndex);
    }

    get numberOfChildren() {
        return this._children.length;
    }

}

const page = new Composite('Page');
const body = new Composite('Body');
const title = new Leaf('Title');
const article = new Composite('Article');
const article_title = new Leaf('Article Title');
const article_copy = new Leaf('Article Copy');

article.addChild(article_title);
article.addChild(article_copy);

body.addChild(title);
body.addChild(article);

page.addChild(body);

console.log(Component.logNodeTree(page));