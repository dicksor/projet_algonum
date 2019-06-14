/* 
Algorithme numérique - Labo individuel

Auteur : Moulin Vincent
Classe : INF2dlm-a
Date de création : 08.05.2019
*/

/**
* Classe PriorityQueue
* Contient un certain nombre de méthodes permettant d'intéragir avec une file de priorité
*/
class PriorityQueue {

	/**
	* Le constructeur de notre classe, instancie un attribut, un tableau de nos éléments
	* @param aucun
	* @return void
	*/
	constructor() {
		this.collection = [];
	}

	/**
	* enqueue(element) : fonction qui permet l'enfilement d'un élément dans notre queue
	* @param element : Array -> contient le nom du sommet et sa priorité
	* @return void
	*/
	enqueue(element) {
		if(this.isEmpty()) {
			this.collection.push(element)
		} else {
			let added = false;
			for(let i = 1; i <= this.collection.length; i++) {
				if(element[1] < this.collection[i-1][1]) {
					this.collection.splice(i-1, 0, element);
					added = true;
					break;
				}
			}

			if(!added) {
				this.collection.push(element);
			}
		}
	}

	/**
	* dequeue() : fonction qui défile et retourn le sommet avce la plus grande priorité
	* @param aucun
	* @return value : Array -> contenant le sommet et sa priorité
	*/
	dequeue() {
		let value = this.collection.shift();
		return value;
	}

	/**
	* isEmpty() : fonction qui permet de savoir si la queue est vide
	* @param aucun
	* @return boolean -> true ou false selon si le tableau est vide ou non
	*/
	isEmpty() {
		return (this.collection.length === 0);
	}
}