const jtree = require('./lib/JTree');
const node = new jtree.TJNode({level: 'master'});

const sub1 = node.add('sub1', {level: 'sub', notes: 'bla bla bla'});
const sub2 = node.add('sub2', {level: 'sub', notes: 'dffsdf sfd'});

const sub3 = sub1.add('sub3', {level: 'sub1', notes: 'bla bla bla'});

console.log(node.toJSON());