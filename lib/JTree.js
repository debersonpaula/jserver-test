"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TJNode {
    constructor(object, parent) {
        this._object = object;
        this._parent = parent;
        this._nodes = {};
    }
    add(key, object) {
        const newNode = new TJNode(object, this);
        this._nodes[key] = newNode;
        return newNode;
    }
    toJSON() {
        let result = this._object;
        // result._nodes = [];
        for (const i in this._nodes) {
            // result._nodes.push(this._nodes[i].toJSON());
            result[i] = this._nodes[i].toJSON();
        }
        return result;
    }
}
exports.TJNode = TJNode;
