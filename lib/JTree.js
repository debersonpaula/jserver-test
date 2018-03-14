"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TJNode {
    constructor(object, parent) {
        this.object = object;
        this.parent = parent;
        this.nodes = {};
    }
    add(key, object) {
        const newNode = new TJNode(object, this);
        this.nodes[key] = newNode;
        return newNode;
    }
    toJSON() {
        let result = Object.assign({}, this.object);
        for (const i in this.nodes) {
            result[i] = this.nodes[i].toJSON();
        }
        return result;
    }
}
exports.TJNode = TJNode;
