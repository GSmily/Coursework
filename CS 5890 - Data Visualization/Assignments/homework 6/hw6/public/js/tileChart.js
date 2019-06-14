/** Class implementing the tileChart. */
class TileChart {

  /**
   * Initializes the svg elements required to lay the tiles
   * and to populate the legend.
   */
  constructor(tooltip){

    let divTiles = d3.select("#tiles").classed("content", true);
    this.margin = {top: 30, right: 20, bottom: 30, left: 50};
    //Gets access to the div element created for this chart and legend element from HTML
    let svgBounds = divTiles.node().getBoundingClientRect();
    this.svgWidth = svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = this.svgWidth/2;
    let legendHeight = 100;
    //add the svg to the div
    let legend = d3.select("#legend").classed("content",true);

    //creates svg elements within the div
    this.legendSvg = legend.append("svg")
      .attr("width",this.svgWidth)
      .attr("height",legendHeight)
      .attr("transform", "translate(" + this.margin.left + ",0)")
      .append("g")
      .attr("transform", "translate(20, 0)");

    this.svg = divTiles.append("svg")
      .attr("width",this.svgWidth)
      .attr("height",this.svgHeight)
      .attr("transform", "translate(" + this.margin.left + ",0)")

    this.tooltip = tooltip;
  };

  /**
   * Returns the class that needs to be assigned to an element.
   *
   * @param party an ID for the party that is being referred to.
   */
  chooseClass (party) {
    if (party == "R"){
      return "republican";
    }
    else if (party== "D"){
      return "democrat";
    }
    else if (party == "I"){
      return "independent";
    }
  }

  /**
   * Creates tiles and tool tip for each state, legend for encoding the
   * color scale information.
   *
   * @param electionResult election data for the year selected
   * @param colorScale global quantile scale based on the winning
   * margin between republicans and democrats
   */
  update (electionResult, colorScale){
    // ******* PART IV *******
    this.svg.selectAll("*").remove();

    //Calculates the maximum number of rows and columns
    this.maximumColumns = d3.max(electionResult, d => +d.Space) + 1;
    this.maximumRows = d3.max(electionResult, d => +d.Row) + 1;

    let rectangleHeight = this.svgHeight / this.maximumRows;
    let rectangleWidth = this.svgWidth / this.maximumColumns;

    //X and Y scales for rows and columns
    let xScale = d3.scaleLinear()
      .domain([0, this.maximumColumns])
      .range([0, this.svgWidth])

    let yScale = d3.scaleLinear()
      .domain([0, this.maximumRows])
      .range([0, this.svgHeight])

    //Make rectangles corresponding to each state according to the 'row' and 'column' information in the data.
    this.svg
      .selectAll("rect")
      .data(electionResult)
      .enter()
      .append("rect")
      .attr("width", rectangleWidth)
      .attr("height", rectangleHeight)
      .attr("x", d => xScale(d.Space))
      .attr("y", d => yScale(d.Row))
      //Use global color scale to color code the tiles.
      .attr("fill", d => d.RD_Difference === "0" ? "green" : colorScale(d.RD_Difference))
      .attr("class", "tile")
      //Calls the tool tip on hover over the tiles to display stateName, count of electoral votes
      //then, vote percentage and number of votes won by each party.
      .on("mouseover", d => this.tooltip.mouseover(d))
      .on("mouseout", d => this.tooltip.mouseout(d))
      .on("mousemove", d => this.tooltip.mousemove(d));

    //Displays the state abbreviation and number of electoral votes on each of the rectangles  
    let tileChartText = this.svg
      .selectAll("text")
      .data(electionResult)
      .enter()

    tileChartText
      .append("text")
      .text(d => d.Abbreviation)
      .attr("x", d => xScale(d.Space) + (rectangleWidth / 2))
      .attr("y", d => yScale(d.Row) + (rectangleHeight / 2) - 10)
      .attr("class", "tilestext")

    tileChartText
      .append("text")
      .text(d => d.Total_EV)
      .attr("x", d => xScale(d.Space) + (rectangleWidth / 2))
      .attr("y", d => yScale(d.Row) + (rectangleHeight / 2) + 25)
      .attr("class", "tilestext")  

    // ******* EXTRA CREDIT 3 *******
    //Tansforms the legend element to appear in the center and makes a call to this element for it to display.
    let legendXValue = [65, 155, 245, 335, 425, 515, 605, 695, 785, 875, 965, 1055]
    let legendColorRange = ["#063e78", "#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15", "#860308"];
    let legendTextArray = ["-60.0 to -50.0", "-50.0 to -40.0", "-40.0 to -30.0", "-30.0 to -20.0", "-20.0 to -10.0", "-10.0 to 0.0", "0.0 to 10.0",
      "10.0 to 20.0", "20.0 to 30.0", "30.0 to 40.0", "40.0 to 50.0", "50.0 to 60.0"]

    this.legendSvg
      .selectAll("rect")
      .data(legendXValue)
      .enter()
      .append("rect")
      .attr("x", d => d)
      .attr("width", 90)
      .attr("height", 10)
      .attr("fill", (d, i) => legendColorRange[i])
      .attr("class", "electoralVotes")

    this.legendSvg
      .selectAll("text")
      .data(legendXValue)
      .enter()
      .append("text")
      .text((_, i) => legendTextArray[i])
      .attr("x", d => d)
      .attr("y", 25)
      .attr("font-size", 13)
  };
}
