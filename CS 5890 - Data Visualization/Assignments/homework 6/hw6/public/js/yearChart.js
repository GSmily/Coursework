class YearChart {

  /**
   * Constructor for the Year Chart
   *
   * @param electoralVoteChart instance of ElectoralVoteChart
   * @param tileChart instance of TileChart
   * @param votePercentageChart instance of Vote Percentage Chart
   * @param electionInfo instance of ElectionInfo
   * @param electionWinners data corresponding to the winning parties over mutiple election years
   */
  constructor (electoralVoteChart, tileChart, votePercentageChart, electionWinners) {

    //Creating YearChart instance
    this.electoralVoteChart = electoralVoteChart;
    this.tileChart = tileChart;
    this.votePercentageChart = votePercentageChart;
    // the data
    this.electionWinners = electionWinners;
    
    // Initializes the svg elements required for this chart
    this.margin = {top: 10, right: 20, bottom: 30, left: 50};
    let divyearChart = d3.select("#year-chart").classed("fullView", true);

    //fetch the svg bounds
    this.svgBounds = divyearChart.node().getBoundingClientRect();
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = 100;

    //add the svg to the div
    this.svg = divyearChart.append("svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight)
      .append("g")
      .attr("transform", "translate(20, 30)");

    this.selected = null;
  }

  /**
   * Returns the class that needs to be assigned to an element.
   *
   * @param party an ID for the party that is being referred to.
   */
  chooseClass (data) {
    if (data == "R") {
      return "yearChart republican";
    }
    else if (data == "D") {
      return "yearChart democrat";
    }
    else if (data == "I") {
      return "yearChart independent";
    }
  }

  /**
   * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
   */
  update () {

    //Domain definition for global color scale
    let domain = [-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60];

    //Color range for global color scale
    let range = ["#063e78", "#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15", "#860308"];

    //ColorScale be used consistently by all the charts
    this.colorScale = d3.scaleQuantile()
      .domain(domain)
      .range(range);

    // ******* PART I *******

    // Create the chart by adding circle elements representing each election year
    let domainOfYears = [];
    this.electionWinners.forEach(d => {
      domainOfYears.push(d.YEAR);
    });

    let scaleYears = d3.scaleBand()
      .domain(domainOfYears)
      .range([50, this.svgWidth]);

    let yearChart = this.svg
      .selectAll("circle")
      .data(this.electionWinners)
      .enter();

    //Styles the chart by adding a dashed line that connects all the years.
    yearChart
      .append("line")
      .attr("x1", this.svgWidth - 45)
      .attr("class", "lineChart")

    //Appends text information of each year right below the corresponding circle
    yearChart
      .append("text")
      .text(d => d.YEAR)
      .attr("dx", d => scaleYears(d.YEAR))
      .attr("dy", 50)
      .attr("class", "yeartext");

    //The circles are colored based on the winning party for that year.
    let yearCircles = yearChart
      .append("circle")
      .attr("r", 15)
      .attr("cx", d => scaleYears(d.YEAR))
      .attr("class", d => this.chooseClass(d.PARTY));

    //Clicking on any specific year highlights that circle and updates the rest of the visualizations
    yearCircles
      .on("click", d => {
        d3.select(d3.event.target.parentNode).selectAll("circle").classed("selected", false);
        d3.select(d3.event.target).classed("selected", true);

        // Election information corresponding to the year selected is loaded and passed to the update methods of the other visualizations.
        d3.csv(`data/Year_Timeline_${d.YEAR}.csv`).then(electionResult => {
          this.electoralVoteChart.update(electionResult, this.colorScale);
          this.votePercentageChart.update(electionResult, this.colorScale);
          this.tileChart.update(electionResult, this.colorScale)
        });
      })
      .on("mouseenter", () => d3.select(d3.event.target).classed("highlighted", true))
      .on("mouseleave", () => d3.select(d3.event.target).classed("highlighted", false));
  }
}
