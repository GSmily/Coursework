class ElectoralVoteChart {
  /**
   * Constructor for the ElectoralVoteChart
   *
   * @param shiftChart an instance of the ShiftChart class
   */
  constructor (shiftChart){
    this.shiftChart = shiftChart;
    
    this.margin = {top: 30, right: 20, bottom: 30, left: 50};
    let divelectoralVotes = d3.select("#electoral-vote").classed("content", true);

    //Gets access to the div element created for this chart from HTML
    this.svgBounds = divelectoralVotes.node().getBoundingClientRect();
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = 150;

    //creates svg element within the div
    this.svg = divelectoralVotes.append("svg")
      .attr("width",this.svgWidth + 50)
      .attr("height",this.svgHeight)
      .append("g")
      .attr("transform", "translate(20, 30)");
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
    else if (party == "D"){
      return "democrat";
    }
    else if (party == "I"){
      return "independent";
    }
  }

  /**
   * Creates the stacked bar chart, text content and tool tips for electoral vote chart
   *
   * @param electionResult election data for the year selected
   * @param colorScale global quantile scale based on the winning margin between republicans and democrats
   */

  update (electionResult, colorScale){
    // ******* PART II *******
    this.svg.selectAll("*").remove();
    
    //Group the states based on the winning party for the state
    let allVotes = 0;
    let independentParty = [];
    let democratParty = [];
    let republicanParty = [];

    electionResult.forEach(d => {
      if(d.RD_Difference < 0) democratParty.push(d);
      else if (d.RD_Difference > 0) republicanParty.push(d);
      else independentParty.push(d);
    })

    //Sorts group of states based on the margin of victory
    independentParty.sort((a, b) => b.Total_EV - a.Total_EV);
    democratParty.sort((a, b) => a.RD_Difference - b.RD_Difference);
    republicanParty.sort((a, b) => a.RD_Difference - b.RD_Difference);

    let sortedData = [];
    sortedData = sortedData.concat(independentParty);
    sortedData = sortedData.concat(democratParty);
    sortedData = sortedData.concat(republicanParty);

    let xCoordinates = [];
    sortedData.forEach(d => {
      xCoordinates.push(allVotes);
      allVotes += parseInt(d.Total_EV);
    });

    let electoralVoteScale = d3.scaleLinear()
      .domain([0, allVotes])
      .range([0, this.svgWidth]);

    //Create the stacked bar chart.
    let electoralVoteChart = this.svg
      .selectAll("rect")
      .data(sortedData)
      .enter();

    electoralVoteChart
      .append("rect")
      .attr("width", d => this.svgWidth * d.Total_EV / allVotes)
      .attr("height", 20)
      .attr("x", (_, i) => electoralVoteScale(xCoordinates[i]))
      .attr("y", 25)
      //Uses the global color scale to color code the rectangles.
      .attr("fill", d => d.RD_Difference === "0" ? "green" : colorScale(d.RD_Difference))
      .attr("class", "electoralVotes")

    //Displays the total count of electoral votes won by the Democrat and Republican party
    //on top of the corresponding groups of bars.
    electoralVoteChart
    .append("text")
    .text(d => d.I_EV_Total)
    .attr("class", "electoralVoteText independent")

    electoralVoteChart
      .append("text")
      .text(d => d.D_EV_Total)
      .attr("dx", d => d.I_EV_Total === "" ? 0 : 120)
      .attr("class", "electoralVoteText democrat")

    electoralVoteChart
      .append("text")
      .text(d => d.R_EV_Total)
      .attr("dx", this.svgWidth)
      .attr("class", "electoralVoteText republican");

    //Display a bar with minimal width in the center of the bar chart to indicate the 50% mark
    electoralVoteChart
      .append("line")
      .attr("x1", this.svgWidth/2)
      .attr("y1", 15)
      .attr("x2", this.svgWidth/2)
      .attr("y2", 55)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .attr("class", "middlePoint")

    //Displays the text mentioning the total number of electoral votes required
    // to win the elections throughout the country
    let votesToWin
    if (electionResult[0].Year == 1960)
      votesToWin = 269
    else if(electionResult[0].Year > 1960)
      votesToWin = 270
    else
      votesToWin = 266

    electoralVoteChart
      .append("text")
      .text(`Electoral Vote (${votesToWin} needed to win)`)
      .attr("dx", this.svgWidth/2 - 140)
      .attr("font-size", 16)

    //******* PART V *******

    //Implements brush on the bar chart created above.
    let brushScale = d3.scaleLinear()
    .domain([0, this.svgWidth])
    .range([0, allVotes])

    let brushed = function() {
      let lowerBound = brushScale(d3.event.selection[0]);
      let upperBound = brushScale(d3.event.selection[1]);

      let total = 0;
      let brushRange = [];

      sortedData.forEach(d => {
        if (total >= lowerBound && total <= upperBound)
          brushRange.push(d);
        else if (total + parseFloat(d.Total_EV) >= lowerBound && total <= lowerBound)
          brushRange.push(d);
          total += parseFloat(d.Total_EV);
      });

      //Calls the update method of shiftChart and pass the data corresponding to brush selection.
      this.shiftChart.update(brushRange);
    }.bind(this);

    //Implements a call back method to handle the brush end event.
    let brush = d3.brushX()
      .extent([[0, 20], [this.svgWidth, 50]])
      .on("brush end", brushed);

    this.svg
      .append("g")
      .attr("class", "brush")
      .call(brush)
  };
}
