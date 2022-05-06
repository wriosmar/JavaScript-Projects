// Constructor 
function Node(val) {
  this.value = val;
  this.edges = [];
  this.searched = false;
  this.parent = null;
}

// Adds edge to and from
Node.prototype.addEdge = function(neighbor) {
  this.edges.push(neighbor);
  neighbor.edges.push(this);
}
