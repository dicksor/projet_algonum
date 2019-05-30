let container = d3.select('#tube-map');
let width = 1200;
let height = 1200;

let mapDisplay = new Map();

let map = d3.tubeMap()
  .width(width)
  .height(height)
  .margin({
    top: 20,
    right: 20,
    bottom: 40,
    left: 10,
  })
  .on("click", function (name) {
    mapDisplay.addToList(name);
  });


d3.json("json/stations.json").then(function(data) {

    container.datum(data).call(map);

    let svg = container.select('svg');

    zoom = d3
      .zoom()
      .scaleExtent([1, 3])
      .on('zoom', zoomed);

    let zoomContainer = svg.call(zoom);
    let initialScale = 1;

    //zoom.scaleTo(zoomContainer, initialScale);
    //zoom.translateTo(zoomContainer, initialTranslate[0], initialTranslate[1]);

    function zoomed() {
      svg.select('g').attr('transform', d3.event.transform.toString());
    }

});