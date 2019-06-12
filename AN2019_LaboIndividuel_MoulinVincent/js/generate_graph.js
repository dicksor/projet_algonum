/* 
Algorithme numérique - Labo individuel

Auteur : Moulin Vincent
Classe : INF2dlm-a
Date de création : 08.05.2019
*/

let mapData = new Map();

/**
* findPath() est une fonction appelée par le bouton qui permet de lancer la recherche d'itinéraire
* Son but est de récupérer les valeurs contenues dans les inputs du formulaire, 
* de recevoir le chemin le splus court entre les deux et afficher diverses données.
* @param aucun
* @return void
*/
function findPath() {

  //mapData.getLineName("RedBull");
  //console.log(mapData.getLineColor("Riverbank"));

  // Récupération des différentes valeurs contenues dans les inputs
  let from = document.getElementById("inputFrom").value;
  let to = document.getElementById("inputTo").value;

  // Variable qui stockera le text final a affecté à la balise d'affichage
  let text = "";

  // on vérifie que les deux valeurs ont bien des valeurs
  if(from && to){
    // Récupération d'un tableau contenant les noeuds qui sont traversés pour le parcours, ainsi que la sommes des pondérations
    // Prend en paramètre la station de départ et d'arrivée
    let data = g.findPathDijkstra(from, to);

    // Préparation des données à afficher
    text += "<br><strong>Longueur du chemin</strong> : " + data[1] + "<br>";
    text += "<strong>Prix du parcours</strong> : " + (data[1]*0.2).toFixed(2) + ".-<br>"; // J'ai décidé de fixer à 0.20.- le parcours entre deux stations
    text += "<strong>Arrêts</strong> :<br>";


    let textStations = "";
    let color = "";
    // Parcours de toutes les stations à traverser et affichage
    for (let i = 0; i < data[0].length; i++) { 

      color = mapData.getLineColor(mapData.getLineName(data[0][i]));

      if(color == "node")
      {
        textStations = "<span style='font-weight:bold'>" + data[0][i] + " (NODE)</span>";
        color = "black";
      }
      else if(color == "multiline")
      {
        textStations = "<i>\"" + data[0][i] + "\" (multi-line)</i>";
        color = "black";
      }
      else
      {
        textStations = data[0][i];
      }

      text += "- <span style='color:" + color + ";'>" + textStations + "</span><br>";
    }
  } else {
    // Si non, on affiche un message d'erreur
    text = "<br><br><strong style='color:red;'>Veuillez sélectionner deux stations!</strong>";
  }

  document.getElementById("path").innerHTML = text; // On affecte la valeur de la variable text à la balise de paragraphe avec l'id "path"
}

/**
* clearAll() est une fonction qui est appelée par le bouton "Effacer tout" qui permet de remettre à zéro les champs et l'affichage de l'itinéraire
* @param aucun
* @return void
*/
function clearAll() {
  document.getElementById("inputFrom").value = "";
  document.getElementById("inputTo").value = "";
  document.getElementById("path").innerHTML = "";
}


// Instanciation d'un nouvel objet d ela classe graphe
let g = new Graph();

// Ajout de tous les noeuds à notre graphe

// Brune
g.addNode("CarltonArms");
g.addNode("CarpentersArms");
g.addNode("Grapes");
g.addNode("SirIsaacNewton");
g.addNode("Architect");
g.addNode("CastleInn");
g.addNode("Punter");
g.addNode("Pickerel"); // Node
g.addNode("BaronOfBeef"); // Multiple
g.addNode("Mitre"); // Multiple
g.addNode("BrewHouse"); // Node

// Verte
g.addNode("GreenManGrantchester");
g.addNode("RedLion");
g.addNode("RupertBrook");
g.addNode("BlueBallInn");
g.addNode("RedBull");
g.addNode("Granta"); // Node
g.addNode("Mill"); // Multiple
g.addNode("Regal"); // Node
g.addNode("ElmTree"); // Node
g.addNode("Hopbine");
g.addNode("BurleighArms");
g.addNode("CornerHouse");
g.addNode("Wrestlers");
g.addNode("AncientShepherds");
g.addNode("KingsHead");
g.addNode("Plough");

// Bleue
g.addNode("Boathouse");
g.addNode("PortlandArms");
g.addNode("Waterman");
g.addNode("OldSpring"); // Node
g.addNode("Haymakers");
g.addNode("GreenDragon");

// Noire
g.addNode("Ship");
g.addNode("GoldenHind");
g.addNode("MiltonArms");
g.addNode("FortStGeorge");
g.addNode("Maypole");
g.addNode("PantonArms");
g.addNode("Alma");
g.addNode("GreenManTrumpington");
g.addNode("HudsonsAleHouse");
g.addNode("LordByronInn");

// Jaune
g.addNode("Eagle"); // Node
g.addNode("Anchor");
g.addNode("ClarendonArms"); // Node
g.addNode("StRadegund");
g.addNode("KingStreetRun");
g.addNode("ChampionOfTheThames");

// Rouge
g.addNode("BathHouse");
g.addNode("PintShop");
g.addNode("Cricketers");
g.addNode("FreePress");
g.addNode("TramDepot");
g.addNode("DukeOfCambridge");
g.addNode("BlueMoon");
g.addNode("Dobblers");
g.addNode("AlexandraArms");
g.addNode("Geldart");
g.addNode("CambridgeBlue");
g.addNode("Petersfield");
g.addNode("KingstonArms");

// Grise
g.addNode("SixBells");
g.addNode("LiveAndLetLive");
g.addNode("SalisburyArms");
g.addNode("WhiteSwan");
g.addNode("DevonshireArms");
g.addNode("EarlOfBeaconsfield");
g.addNode("Empress");
g.addNode("RoyalStandard");
g.addNode("Brook");

// Violette
g.addNode("GrainStore");
g.addNode("PrinceRegent");
g.addNode("FlyingPig");
g.addNode("EarlOfDerby");
g.addNode("Rock");
g.addNode("Med");
g.addNode("QueenEdith");

// Ajout des relations entre les noeuds

// Brune
g.addEdge("CarltonArms", "CarpentersArms", 1);
g.addEdge("CarpentersArms", "Grapes", 1);
g.addEdge("Grapes", "SirIsaacNewton", 1);
g.addEdge("SirIsaacNewton", "Architect", 1);
g.addEdge("Architect", "CastleInn", 1);
g.addEdge("CastleInn", "Punter", 1);
g.addEdge("Punter", "Pickerel", 1);
g.addEdge("Pickerel", "BaronOfBeef", 1);
g.addEdge("BaronOfBeef", "Mitre", 1);
g.addEdge("Mitre", "BrewHouse", 1);

// Verte
g.addEdge("GreenManGrantchester", "RedLion", 1);
g.addEdge("RedLion", "RupertBrook", 1);
g.addEdge("RupertBrook", "BlueBallInn", 1);
g.addEdge("BlueBallInn", "RedBull", 1);
g.addEdge("RedBull", "Granta", 1);
g.addEdge("Granta", "Mill", 1);
g.addEdge("Mill", "Regal", 1);
g.addEdge("Regal", "ElmTree", 1);
g.addEdge("ElmTree", "Hopbine", 1);
g.addEdge("Hopbine", "BurleighArms", 1);
g.addEdge("BurleighArms", "CornerHouse", 1);
g.addEdge("CornerHouse", "Wrestlers", 1);
g.addEdge("Wrestlers", "AncientShepherds", 1);
g.addEdge("AncientShepherds", "KingsHead", 1);
g.addEdge("KingsHead", "Plough", 1);

// Bleue
g.addEdge("GreenDragon", "Haymakers", 1);
g.addEdge("Haymakers", "OldSpring", 1);
g.addEdge("OldSpring", "Waterman", 1);
g.addEdge("Waterman", "PortlandArms", 1);
g.addEdge("PortlandArms", "Boathouse", 1);
g.addEdge("Boathouse", "Pickerel", 1);
g.addEdge("Pickerel", "Granta", 1);

// Noire
g.addEdge("Ship", "GoldenHind", 1);
g.addEdge("GoldenHind", "MiltonArms", 1);
g.addEdge("MiltonArms", "OldSpring", 1);
g.addEdge("OldSpring", "FortStGeorge", 1);
g.addEdge("FortStGeorge", "Maypole", 1);
g.addEdge("Maypole", "BrewHouse", 1);
g.addEdge("BrewHouse", "Regal", 1);
g.addEdge("Regal", "PantonArms", 1);
g.addEdge("PantonArms", "Alma", 1);
g.addEdge("Alma", "GreenManTrumpington", 1);
g.addEdge("GreenManTrumpington", "HudsonsAleHouse", 1);
g.addEdge("HudsonsAleHouse", "LordByronInn", 1);

// Jaune
g.addEdge("BaronOfBeef", "Mitre", 1);
g.addEdge("Mitre", "BrewHouse", 1);
g.addEdge("BrewHouse", "ChampionOfTheThames", 1);
g.addEdge("ChampionOfTheThames", "KingStreetRun", 1);
g.addEdge("KingStreetRun", "StRadegund", 1);
g.addEdge("StRadegund", "ClarendonArms", 1);
g.addEdge("ClarendonArms", "Regal", 1);
g.addEdge("Regal", "Mill", 1);
g.addEdge("Mill", "Anchor", 1);
g.addEdge("Anchor", "Eagle", 1);
g.addEdge("Eagle", "BaronOfBeef", 1);

// Rouge
g.addEdge("Eagle", "BathHouse", 1);
g.addEdge("BathHouse", "PintShop", 1);
g.addEdge("PintShop", "ClarendonArms", 1);
g.addEdge("ClarendonArms", "ElmTree", 1);
g.addEdge("ElmTree", "Cricketers", 1);
g.addEdge("Cricketers", "FreePress", 1);
g.addEdge("FreePress", "TramDepot", 1);
g.addEdge("TramDepot", "DukeOfCambridge", 1);
g.addEdge("DukeOfCambridge", "BlueMoon", 1);
g.addEdge("BlueMoon", "Dobblers", 1);
g.addEdge("Dobblers", "AlexandraArms", 1);
g.addEdge("AlexandraArms", "Geldart", 1);
g.addEdge("Geldart", "CambridgeBlue", 1);
g.addEdge("CambridgeBlue", "Petersfield", 1);
g.addEdge("Petersfield", "KingstonArms", 1);

// Grise
g.addEdge("ElmTree", "SixBells", 1);
g.addEdge("SixBells", "LiveAndLetLive", 1);
g.addEdge("LiveAndLetLive", "SalisburyArms", 1);
g.addEdge("SalisburyArms", "WhiteSwan", 1);
g.addEdge("WhiteSwan", "DevonshireArms", 1);
g.addEdge("DevonshireArms", "EarlOfBeaconsfield", 1);
g.addEdge("EarlOfBeaconsfield", "Empress", 1);
g.addEdge("Empress", "RoyalStandard", 1);
g.addEdge("RoyalStandard", "Brook", 1);

// Violette
g.addEdge("Mill", "Regal", 1);
g.addEdge("Regal", "GrainStore", 1);
g.addEdge("GrainStore", "PrinceRegent", 1);
g.addEdge("PrinceRegent", "FlyingPig", 1);
g.addEdge("FlyingPig", "EarlOfDerby", 1);
g.addEdge("EarlOfDerby", "Rock", 1);
g.addEdge("Rock", "Med", 1);
g.addEdge("Med", "QueenEdith", 1);