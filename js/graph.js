class Graph {
	constructor() {
		this.nodes = [];
		this.adjacencyList = {};
	}

	addNode(node) {
		this.nodes.push(node);
		this.adjacencyList[node] = [];
	}

	addEdge(firstNode, secondNode, weight) {
		this.adjacencyList[firstNode].push({node:secondNode, weight: weight});
		this.adjacencyList[secondNode].push({node:firstNode, weight: weight});
	}

	findPathDijkstra(startNode, endNode) {
		let times = {};
		let backtrace = {};
		let pq = new PriorityQueue();

		times[startNode] = 0;

		this.nodes.forEach(node => {
			if(node !== startNode) {
				times[node] = Infinity;
			}
		});

		pq.enqueue([startNode, 0]);

		while(!pq.isEmpty()) {
			let shortestStep = pq.dequeue();
			let currentNode = shortestStep[0];

			this.adjacencyList[currentNode].forEach(neighbor => {
				let time = times[currentNode] + neighbor.weight;

				if(time < times[neighbor.node]) {
					times[neighbor.node] = time;
					backtrace[neighbor.node] = currentNode;
					pq.enqueue([neighbor.node, time]);
				}
			});
		}

		let path = [endNode];
		let lastStep = endNode;

		while(lastStep !== startNode) {
			path.unshift(backtrace[lastStep]);
			lastStep = backtrace[lastStep];
		}

		//return `path is ${path} and time is ${times[endNode]}`;

		let arrayPathTime = [];
		arrayPathTime[0] = path;
		arrayPathTime[1] = times[endNode];

		return arrayPathTime;
	}
}


