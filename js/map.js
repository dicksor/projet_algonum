class Map {
	constructor()
	{
		this.listStations = [];
		//this.readJson();
	}

	addToList(name)
	{
		//console.log(this.listStations.length)
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

	displayStations(listStations)
	{

		if(listStations[1] !== undefined){
			document.getElementById("inputTo").value = listStations[1];
		}

		document.getElementById("inputFrom").value = listStations[0];
	}

	getLineColor(stationName)
	{

	}

	// Fonction permettant de lire un fichier JSON, et qui contient une fonction callback
	readJsonFile(file, callback) {
	    let rawFile = new XMLHttpRequest();
	    rawFile.overrideMimeType("application/json");
	    rawFile.open("GET", file, true);
	    rawFile.onreadystatechange = function() {
	        if (rawFile.readyState === 4 && rawFile.status == "200")
	            callback(rawFile.responseText);
	    }
	    rawFile.send(null);
	}

	// Fonction qui retourne une variable contenant le JSON
	readJson()
	{
		this.readJsonFile("json/stations.json", function(data){
			let obj = JSON.parse(data);
			let stations = obj.stations;
			
			let arrayStations = Object.keys(stations).map(function(key) {
			  return [Number(key), stations[key]];
			});

			//console.log(stations["Anchor"]);
			
			for(let i = 0; i < arrayStations.length; i++)
			{
				console.log(arrayStations[i][1]);
			}
	  	});
	}
}