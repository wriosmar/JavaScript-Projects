// Constructor
function Graph() {
  this.nodes = [];
  this.graph = {};

  this.start = null;
  this.end = null;
}

// Adds Node to graph object
Graph.prototype.addNode = function(n) {
  this.nodes.push(n);
  var title = n.value;
  this.graph[title] = n;
}

// Returns the given node
Graph.prototype.getNode = function(node) {
  var n = this.graph[node];
  return n;
}

// Sets start for search
Graph.prototype.setStart = function(actor) {
  // assumes actor is i graph
  this.start = this.graph[actor];
  return this.start;
}

// Sets end for search
Graph.prototype.setEnd = function(actor) {
  // assumes actor is in graph
  this.end = this.graph[actor];
  return this.end;
}

// resets all parameters
Graph.prototype.reset = function() {
  for(var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].searched = false;
    this.nodes[i].parent = null;
  }
}
