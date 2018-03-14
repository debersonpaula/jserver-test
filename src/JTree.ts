export class TJNode {
  protected _parent?: TJNode;
  protected _object: any;
  protected _nodes: { [s: string]: TJNode }
  
  constructor(object: any, parent?: TJNode){
    this._object = object;
    this._parent = parent;
    this._nodes = {};
  }

  add(key: string, object: any): TJNode {
    const newNode = new TJNode(object, this);
    this._nodes[key] = newNode;
    return newNode;
  }

  toJSON() {
    let result = this._object;
    for (const i in this._nodes) {
      result[i] = this._nodes[i].toJSON();
    }
    return result;
  }
}