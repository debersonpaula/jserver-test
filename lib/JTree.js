"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TJNode {
    constructor(object, parent) {
        this.object = object;
        this.parent = parent;
        this.nodes = {};
    }
    add(key, object) {
        // console.log('add > ', key, object);
        const newNode = new TJNode(object, this);
        this.nodes[key] = newNode;
        // console.log('nodes > ', this.nodes);
        return newNode;
    }
    toJSON() {
        let result = Object.assign({}, this.object);
        // console.log('toJSON ', this.nodes);
        for (const i in this.nodes) {
            // console.log('for - ', i);
            result[i] = this.nodes[i].toJSON();
        }
        return result;
    }
}
exports.TJNode = TJNode;
