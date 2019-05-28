let container = d3.select('#tube-map');
let width = 1200;
let height = 1200;

let mapDisplay = new Map();

let map = d3.tubeMap()
  .width(width)
  .height(height)
  .margin({
    top: 20,
    right: 20,
    bottom: 40,
    left: 10,
  })
  .on("click", function (name) {
    mapDisplay.addToList(name);
  });


d3.json("./stations.json").then(function(data) {

    container.datum(data).call(map);

    let svg = container.select('svg');

    zoom = d3
      .zoom()
      .scaleExtent([1, 3])
      .on('zoom', zoomed);

    let zoomContainer = svg.call(zoom);
    let initialScale = 1;

    //zoom.scaleTo(zoomContainer, initialScale);
    //zoom.translateTo(zoomContainer, initialTranslate[0], initialTranslate[1]);

    function zoomed() {
      svg.select('g').attr('transform', d3.event.transform.toString());
    }

});

/*let g = new Graph();

g.addNode(new Node("Test"));
g.addNode(new Node("Tesdadst"));
g.addNode(new Node("Tesdasst"));

g.addEdge("Test", "Tesdasst", 30);

g.display();*/

let g = new Graph();
g.addNode("A");
g.addNode("B");
g.addNode("C");
g.addNode("D");
g.addNode("E");
g.addNode("F");
g.addNode("G");

g.addEdge("A", "C", 100);
g.addEdge("A", "B", 3);
g.addEdge("A", "D", 4);
g.addEdge("D", "C", 3);
g.addEdge("D", "E", 8);
g.addEdge("E", "F", 10);
g.addEdge("B", "G", 9);
g.addEdge("E", "G", 50);

//g.display();

console.log(g.dijkstraAlgorithm("D"));

/*function Graph() {
  let neighbors = this.neighbors = {}; // Key = vertex, value = array of neighbors.

  this.addEdge = function (u, v) {
    if (neighbors[u] === undefined) {  // Add the edge u -> v.
      neighbors[u] = [];
    }
    neighbors[u].push(v);
    if (neighbors[v] === undefined) {  // Also add the edge v -> u in order
      neighbors[v] = [];               // to implement an undirected graph.
    }                                  // For a directed graph, delete
    neighbors[v].push(u);              // these four lines.
  };

  return this;
}

function djikstra(graph, source) {
  let queue = [ { vertex: source, count: 0 } ],
      visited = { source: true },
      tail = 0;
  while (tail < queue.length) {
    let u = queue[tail].vertex,
        count = queue[tail++].count;  // Pop a vertex off the queue.
    print('distance from ' + source + ' to ' + u + ': ' + count);
    graph.neighbors[u].forEach(function (v) {
      if (!visited[v]) {
        visited[v] = true;
        queue.push({ vertex: v, count: count + 1 });
      }
    });
  }
}

function shortestPath(graph, source, target) {
  if (source == target) {   // Delete these four lines if
    print(source);          // you want to look for a cycle
    return;                 // when the source is equal to
  }                         // the target.
  let queue = [ source ],
      visited = { source: true },
      predecessor = {},
      tail = 0;
  while (tail < queue.length) {
    let u = queue[tail++],  // Pop a vertex off the queue.
        neighbors = graph.neighbors[u];
    for (let i = 0; i < neighbors.length; ++i) {
      let v = neighbors[i];
      if (visited[v]) {
        continue;
      }
      visited[v] = true;
      if (v === target) {   // Check if the path is complete.
        let path = [ v ];   // If so, backtrack through the path.
        while (u !== source) {
          path.push(u);
          u = predecessor[u];
        }
        path.push(u);
        path.reverse();
        print(path.join(' &rarr; '));
        return;
      }
      predecessor[v] = u;
      queue.push(v);
    }
  }
  print('there is no path from ' + source + ' to ' + target);
}

function print(s) {  // A quick and dirty way to display output.
  s = s || '';
  document.getElementById('display').innerHTML += s + '<br>';
}

let graph = new Graph();
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('B', 'E');
graph.addEdge('C', 'D');
graph.addEdge('C', 'E');
graph.addEdge('C', 'G');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');

djikstra(graph, 'A');
print();
shortestPath(graph, 'B', 'G');
print();
shortestPath(graph, 'G', 'A');*/
