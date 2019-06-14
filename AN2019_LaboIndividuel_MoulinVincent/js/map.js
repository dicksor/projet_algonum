/* 
Algorithme numérique - Labo individuel

Auteur : Moulin Vincent
Classe : INF2dlm-a
Date de création : 08.05.2019
*/

/**
* Classe Map
* permet de récupérer des informations sur la map à l'aide de plusieurs fonctions
*/
class Map {

	/**
	* Le constructeur de notre classe, instancie deux tableaux, destinés à du stockage
	* @param aucun
	* @return void
	*/
	constructor()
	{
		this.linesColor = [];
		this.linesStations = [];

		this.readJson();
	}

	/**
	* getLineColor(stationName) : fonction qui permet de récupérer la couleur de ligne sur laquelle se toruve une station
	* @param stationName : String -> nom d'une station
	* @return color : String -> la couleur en hexa
	*/
	getLineColor(lineName)
	{
		// si c'est une station "spéciale", on retourne sa particularité
		if(lineName == "node")
		{
			return "node";
		}
		else if(lineName == "multiline")
		{
			return "multiline";
		}
		else
		{
			// return de la couleur correspondant à la ligne
			return this.linesColor[lineName];
		}
	}

	/**
	* getLineName(stationName) : fonction qui permet de récupérer le nom de la ligne sur laquelle se toruve une station
	* @param stationName : String -> nom d'une station
	* @return line : String -> nom de la ligne
	*/
	getLineName(stationName)
	{
		let i = 0;
		let listStations = [];

		for(let stations in this.linesStations)
		{
			for(i = 0; i < this.linesStations[stations].length; i++)
			{
				if(this.linesStations[stations][i].name == stationName)
				{
					if(this.linesStations[stations][i].node == "yes")
					{
						return "node"; // si == yes, alros c'est un noeud
					}
					else
					{
						listStations.push(stations); // on ajoute une station correspondant à la station en paramètre
					}
				}
			}
		}

		if(listStations.length == 1) // si taille d ela liste à un, alors on prend le nom de la ligne, sinon c'est une stations multiline
		{
			return listStations[0];
		}
		else
		{
			return "multiline";
		}
	}

	/**
	* readJsonFile(file, callback) : fonction qui permet la lecture d'un fichier JSON
	* @param file : String -> nom d'un fichier
	* @param callback : Function -> fonction callback
	* @return void
	*/
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

	/**
	* readJson() : fonction qui utilise readJsonFile pour récupérer les données d'un json
	* @param aucun
	* @return void
	*/
	readJson()
	{

		this.readJsonFile("json/stations.json", (data) => {
			let obj = JSON.parse(data);
			let lines = obj.lines;
			
			let arrayLines = Object.keys(lines).map(function(key) {
			  return [Number(key), lines[key]];
			});

			let s = 0;
			for(let i = 0; i < arrayLines.length; i++)
			{
				this.linesColor[arrayLines[i][1].name] = arrayLines[i][1].color; // création d'un tableau qui a pour index le nom d'une ligne et comme valeur sa couleur en hexa
				this.linesStations[arrayLines[i][1].name] = []; // tableau deux dimensions qui aura comme index le nom d'une ligne, et le sous-tableau contiendra les stations liées

				for(s = 0; s < arrayLines[i][1].nodes.length; s++)
				{
					if(arrayLines[i][1].nodes[s].name != undefined)
					{
						if(arrayLines[i][1].nodes[s].marker != undefined)
						{
							this.linesStations[arrayLines[i][1].name].push({name:arrayLines[i][1].nodes[s].name, node:"yes"});  // Ajout de la ligne, mis à yes si un marker est défini
						}
						else
						{
							this.linesStations[arrayLines[i][1].name].push({name:arrayLines[i][1].nodes[s].name, node:"no"}); // Ajout de la ligne, mis à no si pas de marker (donc pas un noeud)
						}
						
					}
				}
			}
	  	});
	}
}