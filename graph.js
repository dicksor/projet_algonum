class Graph {
	constructor() {
		this.edges = {};
		this.nodes = [];
	}

	addNode(node) {
		this.nodes.push(node);
		this.edges[node] = [];
	}

	addEdge(node1, node2, weight=1) {
		this.edges[node1].push({ node: node2, weight: weight });
      	this.edges[node2].push({ node: node1, weight: weight });
	}

	display() {
      let graph = "";
      this.nodes.forEach(node => {
         graph += node + "->" + this.edges[node].map(n => n.node).join(", ") + "\n";
      });
      console.log(graph);
   	}

   	addDirectedEdge(node1, node2, weight = 1) {
      this.edges[node1].push({ node: node2, weight: weight });
   	}

   	dijkstraAlgorithm(startNode) {
      let distances = {};

      // Stores the reference to previous nodes
      let prev = {};
      let pq = new PriorityQueue(this.nodes.length * this.nodes.length);

      // Set distances to all nodes to be infinite except startNode
      distances[startNode] = 0;
      pq.enqueue(startNode, 0);

      this.nodes.forEach(node => {
         if (node !== startNode) {
         	distances[node] = Infinity;
         }
         prev[node] = null;
      });

      while (!pq.isEmpty()) {
         let minNode = pq.dequeue();
         let currNode = minNode.data;
         let weight = minNode.priority;

         this.edges[currNode].forEach(neighbor => {
            let alt = distances[currNode] + neighbor.weight;
            
            if (alt < distances[neighbor.node]) {
               distances[neighbor.node] = alt;
               prev[neighbor.node] = currNode;
               pq.enqueue(neighbor.node, distances[neighbor.node]);  
            }
         });
      }

      console.log(prev);

      return distances;
   }
};
