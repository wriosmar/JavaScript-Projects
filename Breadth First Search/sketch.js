var data;
var graph;
var dropDown;

function preload() {
	// Load in data from JSON file
  data = loadJSON('kevinbacon.json');
}

function setup() {
	noCanvas();

	// Create the drop down for selecting actor
	dropDown = createSelect();
  dropDown.changed(bfs);

	// New graph object
  graph = new Graph();

	// get movie data
  var movies = data.movies;

	// loop through each movie data point
  for (var i = 0; i < movies.length; i++) {
		// get movie title, create new Node, and add to the graph
    var movie = movies[i].title;
		var movieNode = new Node(movie);
		graph.addNode(movieNode);
		// get cast from movie
    var cast = movies[i].cast;
		// loop through each actor in cast
    for (var j = 0; j < cast.length; j++) {
			// get actor name
      var actor = cast[j];
			// check if actor is already in the graph
      var actorNode = graph.getNode(actor);
      if (actorNode == undefined) {
				// actor is not in graph so create new Node
        actorNode = new Node(actor);
				// add actor as option in dropdown
        dropDown.option(actor);
      }
			// add actor Node to graph and connect actor to movie
      graph.addNode(actorNode);
      movieNode.addEdge(actorNode);
    }
  }
}

// Breadth First Search Algorithm
function bfs() {
	// reset searched and parent parameters
	graph.reset();
	// set start and end
  var start = graph.setStart(dropDown.value());
  var end = graph.setEnd("Kevin Bacon");

	// Nodes that neighbors need to be searched
  var queue = [];

  start.searched = true;
  queue.push(start);
	// while there are still items in the queue
  while (queue.length > 0) {
		// get the top item from queue
    var current = queue.shift();
		// check if current is end
    if (current == end) {
      console.log("Found " + current.value);
      break;
    }
		// get the edges from current Node
    var edges = current.edges;
		// loop through edges
    for (var i = 0; i < edges.length; i++) {
			// get ith edge call it neighbor
      var neighbor = edges[i];
			// if neighbor has not been searched
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    }
  }
	// path taken from start to finish
  var path = [];
	// push the end Node
  path.push(end);
  var next = end.parent;
	// Start from end and move through each parent until start
  while (next != null) {
    path.push(next);
    next = next.parent;
  }

	// print out path taken
  var txt = '';
  for (var i = path.length - 1; i >= 0; i--) {
    var n = path[i];
    txt += n.value
    if (i != 0) {
      txt += ' --> ';
    }
  }
  createP(txt);
}
