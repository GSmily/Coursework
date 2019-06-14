/** Class implementing the votePercentageChart. */
class VotePercentageChart {

  /**
   * Initializes the svg elements required for this chart;
   */
  constructor(tooltip){
    this.margin = {top: 30, right: 20, bottom: 30, left: 50};
    let divvotesPercentage = d3.select("#votes-percentage").classed("content", true);

    //fetch the svg bounds
    this.svgBounds = divvotesPercentage.node().getBoundingClientRect();
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = 200;

    //add the svg to the div
    this.svg = divvotesPercentage.append("svg")
      .attr("width",this.svgWidth)
      .attr("height",this.svgHeight)
      .append("g")
      .attr("transform", "translate(20, 70)");

    this.tooltip = tooltip;
  }

  /**
   * Returns the class that needs to be assigned to an element.
   *
   * @param party an ID for the party that is being referred to.
   */
  chooseClass(data) {
    if (data == "R"){
      return "republican votesPercentageText";
    }
    else if (data == "D"){
      return "democrat votesPercentageText";
    }
    else if (data == "I"){
      return "independent votesPercentageText";
    }
  }

  /**
   * Renders the HTML content for tool tip
   *
   * @param tooltip_data information that needs to be populated in the tool tip
   * @return text HTML content for toop tip
   */
  tooltip_render (tooltip_data) {
    let text = "<ul>";
    tooltip_data.forEach((row)=>{
      text += "<li class = " + this.chooseClass(row.party)+ ">" + row.nominee+":\t\t"+row.votecount+"("+row.percentage+"%)" + "</li>"
    });
    text += "</ul>"

    return text;
  }

  /**
   * Creates the stacked bar chart, text content and tool tips for Vote Percentage chart
   *
   * @param electionResult election data for the year selected
   */
  update (electionResult){
    // ******* PART III *******
    this.svg.selectAll("*").remove();

    let stringToFloat = (str) => str === "" ? 0 : parseFloat(str.slice(0, -1));

    //Creates the stacked bar chart.
    let dataMap = [];
    dataMap.push({
      "party": "I",
      "nominee": electionResult[0].I_Nominee_prop,
      "votecount": electionResult[0].I_Votes_Total,
      "percentage": stringToFloat(electionResult[0].I_PopularPercentage)
    });

    dataMap.push({
      "party": "D",
      "nominee": electionResult[0].D_Nominee_prop,
      "votecount": electionResult[0].D_Votes_Total,
      "percentage": stringToFloat(electionResult[0].D_PopularPercentage)
    });

    dataMap.push({
      "party": "R",
      "nominee": electionResult[0].R_Nominee_prop,
      "votecount": electionResult[0].R_Votes_Total,
      "percentage": stringToFloat(electionResult[0].R_PopularPercentage)
    });

    let xCoordinates = [
      0,
      dataMap[0].percentage,
      dataMap[0].percentage + dataMap[1].percentage
    ];

    let votePercentScale = d3.scaleLinear()
      .domain([0, 99])
      .range([0, this.svgWidth])

    let votePercentageChart = this.svg
    .selectAll("rect")
    .data(dataMap)
    .enter();

    votePercentageChart
      .append("rect")
      .attr("width", d => votePercentScale(d.percentage))
      .attr("height", 20)
      .attr("x", (_, i) => votePercentScale(xCoordinates[i]))
      .attr("y", 25)
      //Uses chooseeClass to color code the rectangles.
      .attr("class", d => this.chooseClass(d.party) + " votesPercentage");

    //Displays the total percentage of votes won by each party
    //on top of the corresponding groups of bars.
    votePercentageChart
      .selectAll("text")
      .data(dataMap)
      .enter()
      .append("text")
      .text(d => d.percentage > 0 ? d.percentage + "%" : "")
      .attr("dx", (d, i) => {
        if (d.party === "R")
          return this.svgWidth - 20
        else if (d.party === "I")
          return 0;
        else if (d.party === "D" && dataMap[0].percentage !== 0)
          return 200;
        return 0;
      })
      .attr("class", d => this.chooseClass(d.party))

    //Displays the party nominee name.
    votePercentageChart
    .append("text")
    .text(d => d.nominee)
    .attr("dx", d => {
      if (d.party === "R")
        return this.svgWidth - 20
      else if (d.party === "I")
        return 0;
      else if (d.party === "D" && dataMap[0].percentage !== 0)
        return 200;
      return 0;
    })
    .attr("dy", -35)
    .attr("class", d => this.chooseClass(d.party))

    //Displays a bar with minimal width in the center of the bar chart to indicate the 50% mark
    votePercentageChart
      .append("line")
      .attr("x1", this.svgWidth/2)
      .attr("y1", 15)
      .attr("x2", this.svgWidth/2)
      .attr("y2", 55)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .attr("class", "middlePoint")

    //Displays the text mentioning details about this mark on top of the bar
    votePercentageChart
      .append("text")
      .text("Popular Vote (50%)")
      .attr("dx", this.svgWidth/2 - 70)
      .attr("font-size", 16)

    let tooltipDataMap = [];
    //If statement whether to show Independent data or not
    if (electionResult[0].I_PopularPercentage !== "")
    tooltipDataMap.push({
        "party": "I",
        "nominee": electionResult[0].I_Nominee_prop,
        "votecount": electionResult[0].I_Votes_Total,
        "percentage": stringToFloat(electionResult[0].I_PopularPercentage)
      });

      tooltipDataMap.push({
      "party": "D",
      "nominee": electionResult[0].D_Nominee_prop,
      "votecount": electionResult[0].D_Votes_Total,
      "percentage": stringToFloat(electionResult[0].D_PopularPercentage)
    });

    tooltipDataMap.push({
      "party": "R",
      "nominee": electionResult[0].R_Nominee_prop,
      "votecount": electionResult[0].R_Votes_Total,
      "percentage": stringToFloat(electionResult[0].R_PopularPercentage)
    });

    //Calls the tool tip on hover over the bars to display stateName, count of electoral votes,
    //vote percentage, and number of votes won by each party.
    let div = d3.select("body")
      .append("div")
      .attr("class", "d3-tip")
      .style("opacity", 0)
      .html(this.tooltip_render(tooltipDataMap))

    this.svg
      .selectAll("rect")
      .on("mouseover", () => {
        div.transition()
          .style("opacity", 1);
        div.style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY + 15) + "px");
      })
      .on("mouseout", () => {
        div.transition()
          .style("opacity", 0)
      })
  };
}
