/* 
Algorithme numérique - Labo individuel

Auteur : Moulin Vincent
Classe : INF2dlm-a
Date de création : 08.05.2019
*/

/**
* Classe Graph
* Permet la construction d'un graphe, et de diverses actions liés à celui-ci
*/
class Graph {

	/**
	* Le constructeur de notre classe, instancie deux attributs, une liste et un tableau
	* @param aucun
	* @return void
	*/
	constructor() {
		this.nodes = [];
		this.adjacencyList = {};
	}

	/**
	* addNode(node) : fonction qui permet l'ajout d'un noeud dans notre graphe
	* @param node : String -> nom d'une station passée en paramètre
	* @return void
	*/
	addNode(node) {
		this.nodes.push(node);
		this.adjacencyList[node] = [];
	}

	/**
	* addEdge(firstNode, secondNode, weight) : fonction qui permet l'ajout d'une relation entre deux noeuds avec leur poids
	* @param firstNode : String -> nom d'une station
	* @param secondNode : String -> nom d'une station qu'on aimerait lier avec la première ! Attention : le graphe est non orienté
	* @param weight : Integer -> poids entre les deux noeuds
	* @return void
	*/
	addEdge(firstNode, secondNode, weight) {
		this.adjacencyList[firstNode].push({node:secondNode, weight: weight});
		this.adjacencyList[secondNode].push({node:firstNode, weight: weight});
	}

	/**
	* findPathDijkstra(startNode, endNode) : fonction qui permet de recevoir en retour la liste du chemin le plus court entre deux noeuds
	* @param startNode : String -> nom d'une station de départ
	* @param endNode : String -> nom d'une station d'arrivée
	* @return arrayPathTime : Array -> retourn un tableau contenant un tableau du chemin et la longueur du chemin
	*/
	findPathDijkstra(startNode, endNode) {
		let times = {};
		let backtrace = {};

		// On déclare un objet de type PriorityQueue afin de pouvoir faire une queue des noeuds en attente
		let pq = new PriorityQueue();

		times[startNode] = 0;

		this.nodes.forEach(node => {
			if(node !== startNode) {
				times[node] = Infinity;
			}
		});

		// On enfile le premier neoud avec une priorité de 0
		pq.enqueue([startNode, 0]);

		// Tant que la liste n'est pas vide, on va la parcourir afin de rencontrer chaque noeud
		while(!pq.isEmpty()) {
			let shortestStep = pq.dequeue();
			let currentNode = shortestStep[0];

			// parcours des voisins du sommet actuel
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

		// une fois l'algorithme effectué, il nous suffit de remonter "l'historique" de notre passage afind e trouver le chemin le plus court
		while(lastStep !== startNode) {
			path.unshift(backtrace[lastStep]);
			lastStep = backtrace[lastStep];
		}

		// construction du tableau pour le return
		let arrayPathTime = [];
		arrayPathTime[0] = path;
		arrayPathTime[1] = times[endNode];

		return arrayPathTime;
	}
}


