class Stations {

	constructor()
	{
		this.listStations = [];
	}

	/**
	* addToList(name) : fonction qui permet d'ajouter une station dans la liste
	* @param name : String -> nom d'une station
	* @return void
	*/
	addToList(name)
	{
		this.listStations.push(name)

		if(this.listStations.length > 2) // Si on ajoute une troisième station, on doit en supprimer une
		{
			// Si la dernière station et la nouvelle sont différentes, alors on supprime la première
			// Si non, on enlève celle qu'on vient d'ajouter
			if(this.listStations[1] != this.listStations[2]) 
				this.listStations.shift();
			else
				this.listStations.pop();
		}

		this.displayStations(this.listStations);
	}

	/**
	* displayStations(listStations) : fonction qui permet d'afficher les stations dans les inputs
	* @param name : Array -> tableau de stations
	* @return void
	*/
	displayStations(listStations)
	{

		if(listStations[1] !== undefined){
			document.getElementById("inputTo").value = listStations[1];
		}

		document.getElementById("inputFrom").value = listStations[0];
	}
}