class Graph {
	constructor() {
		this.edges = {};
		this.nodes = [];
	}

	addNode(node) {
		this.nodes.push(node.label);
		this.edges[node.label] = [];
	}

	addEdge(node1, node2, weight=1) {
		this.edges[node1].push({ node: node2, weight: weight });
      	this.edges[node2].push({ node: node1, weight: weight });
	}

	display() {
		console.log(this.edges);
	}

	dijkstra(startNode, endNode) {
		let distances = {};
      	let pq = new PriorityQueue(this.nodes.length * this.nodes.length);

		this.nodes.forEach(node => {
		    if (node !== startNode) {
		    	distances[node] = Infinity;
		    }
		    prev[node] = null;
	  	});
	}
}