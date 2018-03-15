export class TJNode<T> {
  protected parent?: TJNode<T>;
  public object: T;
  public nodes: { [s: string]: TJNode<T> }
  
  constructor(object?: any, parent?: TJNode<T>){
    this.object = object;
    this.parent = parent;
    this.nodes = {};
  }

  add(key: string, object: any): TJNode<T> {
    const newNode = new TJNode(object, this);
    this.nodes[key] = newNode;
    return newNode;
  }

  toJSON() {
    let result: any = Object.assign({}, this.object);
    for (const i in this.nodes) {
      result[i] = this.nodes[i].toJSON();
    }
    return result;
  }
}