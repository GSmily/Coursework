/**
 * Makes the first bar chart appear as a staircase.
 *
 * Note: use only the DOM API, not D3!
 */
function staircase() {
  let svg = document.getElementById("barChart1").children[0];
  let x = 0;

  for (let i = 0; i < svg.children.length; i++) {
    rect = svg.children[i];
    rect.setAttribute("height", (x += 10));
  }
}

/**
 * Render the visualizations
 * @param error
 * @param data
 */
function update(data) {
  let delay = 750;

  // Set up the scales
  let aScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.a)])
    .range([0, 150]);
  let bScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.b)])
    .range([0, 150]);
  let iScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, 110]);

  // Selects and updates the 'a' bar chart bars
  let svgBarChart1 = d3.select("svg#barChart1")
    .select("g")
    .selectAll("rect")
    .data(data);

  svgBarChart1
    .exit()
    .transition()
    .duration(delay)
    .attr("height", 0)
    .remove();

  svgBarChart1
    .on("mouseenter", function (d, i) {
      d3.select(this).style("fill", "orangered")
    })
    .on("mouseleave", function (d, i) {
      d3.select(this).style("fill", "steelblue")
    })
    .transition()
    .duration(delay)
    .attr("height", function(d) { return aScale(d.a); });

  svgBarChart1.enter()
    .append("rect")
    .attr("x", function(d, i) {return 10 + 10*i})
    .attr("y", 0)
    .attr("width", 10)
    .on("mouseenter", function (d, i) {
      d3.select(this).style("fill", "orangered")
    })
    .on("mouseleave", function (d, i) {
      d3.select(this).style("fill", "steelblue")
    })
    .transition()
    .duration(delay)
    .attr("height", function(d) { return aScale(d.a); });

  // Selects and updates the 'b' bar chart bars
  let svgBarChart2 = d3.select("svg#barChart2")
    .select("g")
    .selectAll("rect")
    .data(data);

  svgBarChart2
    .exit()
    .transition()
    .duration(delay)
    .attr("height", 0)
    .remove();

  svgBarChart2
    .on("mouseenter", function (d, i) {
      d3.select(this).style("fill", "orangered")
    })
    .on("mouseleave", function (d, i) {
      d3.select(this).style("fill", "steelblue")
    })
    .transition()
    .duration(delay)
    .attr("height", function(d) { return bScale(d.b); });

  svgBarChart2.enter()
    .append("rect")
    .attr("x", function(d, i) {return 10 + 10*i})
    .attr("y", 0)
    .attr("width", 10)
    .on("mouseenter", function (d, i) {
      d3.select(this).style("fill", "orangered")
    })
    .on("mouseleave", function (d, i) {
      d3.select(this).style("fill", "steelblue")
    })
    .transition()
    .duration(delay)
    .attr("height", function(d) { return bScale(d.b); });

  // Selects and updates the 'a' line chart path
  let aLineGenerator = d3.line()
    .x((d, i) => iScale(i))
    .y((d) => aScale(d.a));

  let svgLineChart1 = d3.select("#lineChart1");
  let pathsLineChart1 = svgLineChart1.selectAll("path")
    .data([data]);

  pathsLineChart1
    .exit()
    .transition()
    .style("opacity", 0)
    .remove();
  
  pathsLineChart1
    .transition()
    .style("opacity", 0)
    .transition()
    .duration(250)
    .attr("d", aLineGenerator)
    .transition()
    .style("opacity", 1);

  pathsLineChart1.enter()
    .append("path")
    .transition()
    .style("opacity", 0)
    .transition()
    .duration(250)
    .attr("d", aLineGenerator)
    .transition()
    .style("opacity", 1);
    
  // Selects and updates the 'b' line chart path
  let bLineGenerator = d3.line()
    .x((d, i) => iScale(i))
    .y((d) => aScale(d.b));

  let svgLineChart2 = d3.select("#lineChart2");
  let pathsLineChart2 = svgLineChart2.selectAll("path")
    .data([data]);

  pathsLineChart2
    .transition()
    .style("opacity", 0)
    .transition()
    .duration(250)
    .attr("d", bLineGenerator)
    .transition()
    .style("opacity", 1);

  pathsLineChart2.enter()
    .append("path")
    .transition()
    .style("opacity", 0)
    .transition(250)
    .attr("d", bLineGenerator)
    .transition()
    .style("opacity", 1);

  // Selects and updates the 'a' area chart path
  let aAreaGenerator = d3.area()
    .x((d, i) => iScale(i))
    .y0(0)
    .y1(d => aScale(d.a));

  let svgAreaChart1 = d3.select("#areaChart1");
  let pathsAreaChart1 = svgAreaChart1.selectAll("path")
    .data([data]);

  pathsAreaChart1
    .transition()
    .style("opacity", 0)
    .transition()
    .duration(250)
    .attr("d", aAreaGenerator)
    .transition()
    .style("opacity", 1);
 

  pathsAreaChart1.enter()
    .append("path")
    .transition()
    .style("opacity", 0)
    .transition()
    .duration(250)
    .attr("d", aAreaGenerator)
    .transition()
    .style("opacity", 1);

  // Selects and updates the 'b' area chart path
  let bAreaGenerator = d3.area()
    .x((d, i) => iScale(i))
    .y0(0)
    .y1(d => aScale(d.b));

  let svgAreaChart2 = d3.select("#areaChart2");
  let pathsAreaChart2 = svgAreaChart2.selectAll("path")
    .data([data]);

  pathsAreaChart2
    .transition()
    .style("opacity", 0)
    .transition()
    .duration(250)
    .attr("d", bAreaGenerator)
    .transition()
    .style("opacity", 1);

  pathsAreaChart2.enter()
    .append("path")
    .transition()
    .style("opacity", 0)
    .transition()
    .duration(250)
    .attr("d", bAreaGenerator)
    .transition()
    .style("opacity", 1);

  // Selects and updates the scatterplot points
  let svgScatterPlot = d3.select("svg#scatterPlot")
    .select("g")
    .selectAll("circle")
    .data(data);

  svgScatterPlot
    .selectAll("title")
    .remove();

  svgScatterPlot
    .exit()
    .remove();

  svgScatterPlot
    .on("click", function (d) {
      console.log("(X, Y): (" + d.a + ", " + d.b + ")");
    })
    .append("title")
    .text(function(d) { return "(X, Y): (" + d.a + ", " + d.b + ")" })

  svgScatterPlot
    .transition()
    .duration(delay)
    .attr("cx", function(d) { return aScale(d.a); })
    .attr("cy", function(d) { return bScale(d.b); });

  svgScatterPlot.enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", function(d) { return aScale(d.a); })
    .attr("cy", function(d) { return bScale(d.b); })
    .on("click", function (d) {
      console.log("(X, Y): (" + d.a + ", " + d.b + ")");
    })
    .append("title")
    .text(function(d) { return "(X, Y): (" + d.a + ", " + d.b + ")" });
}

/**
 * Load the file indicated by the select menu
 */
function changeData() {
  let dataFile = document.getElementById('dataset').value;
  if (document.getElementById('random').checked) {
    randomSubset();
  }
  else {
    let filename = './data/' + dataFile + '.csv';
    dataset = d3.csv(filename, function(d) {
      // Convert each data item to a number.
      return { a:+d.a, b:+d.b };
    })
    // After reading the entire dataset, call update().
      .then(update);
  }
}

/**
 *   Load the file indicated by the select menu, and then slice out a random chunk before passing the data to update()
 */
function randomSubset() {
  let dataFile = document.getElementById('dataset').value;
  if (document.getElementById('random').checked) {
    let filename = './data/' + dataFile + '.csv';
    dataset = d3.csv(filename, function(d) {
      // Convert each data item to a number.
      return { a:+d.a, b:+d.b };
    })
    .then(function(data) {
      let subset = [];
      for (let d of data) {
        if (Math.random() > 0.5) {
          subset.push(d);
        }
      }
      update(subset);
    });
  }
  else {
    changeData();
  }
}
