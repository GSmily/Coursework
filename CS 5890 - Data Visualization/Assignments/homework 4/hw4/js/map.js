/** Class implementing the map view. */
class Map {
  /**
   * Creates a Map Object
   */
  constructor() {
    this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);

  }

  /**
   * Function that clears the map
   */
  clearMap() {
    // Clears the map of any colors/markers
    d3.select("g#map")
      .selectAll("path")
      .classed("host", false)
      .classed("team", false);
    d3.select("g#map")
      .selectAll("circle")
      .remove();
  }

  /**
   * Update Map with info for a specific FIFA World Cup
   * @param wordcupData the data for one specific world cup
   */
  updateMap(worldcupData) {
    //Clear any previous selections;
    this.clearMap();
    console.log(worldcupData)

    // Selects the host country and changes it's color.
    d3.select("g#map")
      .selectAll("path#" + worldcupData.hostCountryCode)
      .classed("host", true);

    // Iterates through all participating teams and changes their color.
    worldcupData.teams_iso.forEach(team_iso => {
      d3.select("g#map")
        .select("path#" + team_iso)
        .classed("team", true);
    });

    // Adds a marker for the winner on the map.
    let gold = this.projection(worldcupData.win_pos);
    d3.select("g#map")
      .append("circle")
      .attr("cx", gold[0])
      .attr("cy", gold[1])
      .attr("r", 7)
      .attr("class", "gold");

    // Adds a marker for the runner up on the map.
    let silver = this.projection(worldcupData.ru_pos);
    d3.select("g#map")
      .append("circle")
      .attr("cx", silver[0])
      .attr("cy", silver[1])
      .attr("r", 7)
      .attr("class", "silver");
  }

  /**
   * Renders the actual map
   * @param the json data with the shape of all countries
   */
  drawMap(world) {
    let path = d3.geoPath()
      .projection(this.projection);

    // Converts the topoJSON file to geoJSON.
    let geo = topojson.feature(world, world.objects.countries);

    // Gridlines
    let graticule = d3.geoGraticule();

    // Draw the map.
    d3.select("g#map")
      .selectAll("path")
      .data(geo.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("id", d => d.id)
      .attr("class", "countries");

    // Draws gridlines to the map.
    d3.select("g#map")
      .append("path")
      .datum(graticule)
      .attr("d", path)
      .attr("class", "grat");
  }
}
