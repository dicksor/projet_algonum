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
						return "node";
					}
					else
					{
						listStations.push(stations);
					}
				}
			}
		}

		if(listStations.length == 1)
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
				this.linesColor[arrayLines[i][1].name] = arrayLines[i][1].color;
				this.linesStations[arrayLines[i][1].name] = [];

				for(s = 0; s < arrayLines[i][1].nodes.length; s++)
				{
					if(arrayLines[i][1].nodes[s].name != undefined)
					{

						if(arrayLines[i][1].nodes[s].marker != undefined)
						{
							this.linesStations[arrayLines[i][1].name].push({name:arrayLines[i][1].nodes[s].name, node:"yes"});
						}
						else
						{
							this.linesStations[arrayLines[i][1].name].push({name:arrayLines[i][1].nodes[s].name, node:"no"});
						}
						
					}
				}
			}
	  	});
	}
}