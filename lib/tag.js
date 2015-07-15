function Tag(name, props) {
  this.name = name;
  this.props = props;
  this.children = [];
}

Tag.prototype.toString = function() {
  var props = this.props ? ' ' + this.props : '';

  return '<' + this.name + props + '>' +
    this.children.join('') +
  '</' + this.name + '>';
};

module.exports = Tag;