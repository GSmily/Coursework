/** Class implementing the bar chart view. */
class BarChart {

  /**
   * Create a bar chart instance and pass the other views in.
   * @param worldMap
   * @param infoPanel
   * @param allData
   */
  constructor(worldMap, infoPanel, allData) {
    this.worldMap = worldMap;
    this.infoPanel = infoPanel;
    this.allData = allData;
  }

  /**
   * Render and update the bar chart based on the selection of the data type in the drop-down box
   */
  updateBarChart(selectedDimension) {
    const self = this
    let height=350;
    let width=427;
    let yAxisHeight = d3.max(this.allData, d => d[selectedDimension]);
    let yAxisWidth = 75;

    // Transform years into an array for the x-axis
    let years = [];
    for (var i = 0, l = this.allData.length; i < l; i++) {
      years.push(this.allData[i].year);
    }
    years.reverse()

    // Create the x and y scales.
    let xScale = d3.scaleBand()
      .domain(years)
      .range([0, width])
      .padding(0.25);

    let yScale = d3.scaleLinear()
      .domain([0, yAxisHeight])
      .range([height, 0]);

    // Create colorScale
    let colorScale = d3.scaleLinear()
      .domain([0, yAxisHeight])
      .range(["#FF4500", "#691F01"]);

    // Create the axes
    let xAxis = d3.axisBottom(xScale);
    let yAxis=d3.axisLeft(yScale);

    d3.select("g#yAxis")
      .attr("transform", `translate(${yAxisWidth}, 0)`)
      .transition()
      .duration(1500)
      .call(yAxis);

    d3.select("g#xAxis")
      .attr("transform", `translate(${yAxisWidth}, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-90)")
      .attr("dx", "-2em")
      .attr("dy", "-0.29em");

    // Create the bargraph
    d3.select("g#bars")
      .selectAll("rect")
      .data(this.allData)
      .enter()
      .append("rect");

    // Update the bargraph
    d3.select("g#bars")
      .selectAll("rect")
      .data(this.allData)
      .attr("transform", `translate(${yAxisWidth}, 0)`)
      .attr("x", d => xScale(d.year))
      .attr("width", xScale.bandwidth())
      .transition()
      .duration(1500)
      .attr("y", d => yScale(d[selectedDimension]))
      .attr("height", d => height - yScale(d[selectedDimension]))
      .style("fill", d => colorScale(d[selectedDimension]))
      
    // On-click events
    d3.select("g#bars")
      .selectAll("rect")
      .on("click", function(d) {
        if (self.lastRectangle != null)
          self.lastRectangle.style.fill = self.lastColor;

        self.lastRectangle = this;
        self.lastColor = this.style.fill;

        d3.select(this).style("fill", "#2B8CBE")

        // Update map and info panel
        self.infoPanel.updateInfo(d);
        self.worldMap.updateMap(d);
      })
  }
}
