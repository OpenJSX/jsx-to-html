function Fragment(children) {
  this.children = children || [];
}

Fragment.prototype.toString = function() {
 return this.children.join('');
};

module.exports = Fragment;