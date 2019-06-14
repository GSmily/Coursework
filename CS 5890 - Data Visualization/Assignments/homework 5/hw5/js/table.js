/** Class implementing the table. */
class Table {
  /**
   * Creates a Table Object
   */
  constructor(teamData, treeObject) {
    // Maintain reference to the tree Object; 
    this.tree = treeObject; 

    // Create list of all elements that will populate the table
    // Initially, the tableElements will be identical to the teamData
    this.tableElements = teamData.slice(); // 

    // Store all match data for the 2014 Fifa cup
    this.teamData = teamData.slice();

    // Default values for the Table Headers
    this.tableHeaders = ["Delta Goals", "Result", "Wins", "Losses", "TotalGames"];

    // To be used when sizing the svgs in the table cells.
    this.cell = {
      "width": 70,
      "height": 20,
      "buffer": 15
    };

    this.bar = {
      "height": 20
    };

    // Set variables for commonly accessed data columns
    this.goalsMadeHeader = 'Goals Made';
    this.goalsConcededHeader = 'Goals Conceded';

    // Setup the scales

    this.goalScale = d3.scaleLinear()
      .domain([0, 18])
      .range([0, 150]); 

    // Used for games/wins/losses
    this.gameScale = d3.scaleLinear()
      .domain([0, 7])
      .range([0, 70]); 

    // Color scales
    // For aggregate columns  Use colors '#ece2f0', '#016450' for the range.
    this.aggregateColorScale = d3.scaleLinear()
      .domain([0, 7])
      .range(["#ece2f0", "#016450"]);

    // For goal Column. Use colors '#cb181d', '#034e7b'  for the range.
    this.goalColorScale = d3.scaleThreshold()
      .domain([0])
      .range(["#cb181d", "#034e7b"]);
  }

  /**
   * Creates a table skeleton including headers that when clicked allow
   * you to sort the table by the chosen attribute.
   * Also calculates aggregate values of goals, wins, losses and total
   * games as a function of country.
   */
  createTable() {

    // Create the x axes for the goalScale.
    let xAxis = d3.axisTop(this.goalScale)

    // Add GoalAxis to header of col 1.
    d3.select("td#goalHeader")
      .append("svg")
      .attr("width", 200)
      .attr("height", 30)
      .append("g")
      .attr("transform", `translate(21, 20)`)
      .call(xAxis)

    // Start of Part V (Sorting)
    
    const self = this;
    let remember;
    let result = 1;

    function sortByTeam(a, b) {
      return result * a.key.localeCompare(b.key);
    };

    function sortByGoals(a, b) {
      return result * (b.value["Delta Goals"]- a.value["Delta Goals"]);
    };

    function sortByRound(a, b) {
      return result * (b.value.Result.ranking - a.value.Result.ranking);
    };

    function sortByWins(a, b) {
      return result * (b.value.Wins - a.value.Wins);
    };

    function sortByLosses(a, b) {
      return result * (b.value.Losses - a.value.Losses);
    };

    function sortByTotalGames(a, b) {
      return result * (b.value.TotalGames - a.value.TotalGames);
    };

    d3.select("table#matchTable")
      .select("thead")
      .select("tr#firstRow")
      .selectAll("th, td")
      .style("cursor", "pointer")
      .style("font-weight", "bold")
      .on("click", function() {
        self.collapseList();

        // If a column is desending and different column is clicked,
        // make it ascend sort first.
        if (remember === this.innerText)
          result *= -1
        else
          result = 1

        // Set sorting callback for clicking on headers
        switch(this.innerText) {
          case "Team":
            self.tableElements.sort(sortByTeam);
            break;

          case "Goals\n":
            self.tableElements.sort(sortByGoals);
            break;

          case "Round/Result":
            self.tableElements.sort(sortByRound);
            break;

          case "Wins":
            self.tableElements.sort(sortByWins);
            break;

          case "Losses":
            self.tableElements.sort(sortByLosses);
            break;

          case "Total Games":
            self.tableElements.sort(sortByTotalGames);
            break;
        }

        remember = this.innerText

        // Deletes and recreates the table.
        d3.select("table#matchTable")
          .select("tbody")
          .selectAll("tr")
          .remove();
        self.updateTable();
      });
  }

  /**
   * Updates the table contents with a row for each element in the global
   * variable tableElements.
   */
  updateTable() {
    // Create table rows
    let tr = d3.select("tbody")
      .selectAll("tr")
      .data(this.tableElements)
      .enter()
      .append("tr")
      .on("mouseover", d => this.tree.updateTree(d))
      .on("mouseout", d => this.tree.clearTree());

    // Append th elements for the Team Names
    tr.append("th")
      .html(d => d.value.type === "aggregate" ? d.key : "x" + d.key)
      .attr("class", d => d.value.type)
      .on("click", d => {
        if (d.value.type === "game") return; 
        const i = this.tableElements.findIndex(element => element.key === d.key && element.value.type === "aggregate");
        this.updateList(i);
      });

    // Append td elements for the remaining columns. 
    // Data for each cell is of the type: {'type':<'game' or 'aggregate'>,
    // 'value':<[array of 1 or two elements]>}
    let deltaGoals = tr.append("td")
      .append("svg")
      .attr("width", 200)
      .attr("height", 30)
      .append("g")
      .attr("transform", "translate(17, 0)");

    //Create diagrams in the goals column
    // Delta Goals
    deltaGoals.append("rect")
      .attr("x", d => this.goalScale(Math.min(d.value["Goals Made"], d.value["Goals Conceded"])))
      .attr("y", d => {
        if(d.value.type ==="aggregate") 
          return 6.5
        else 
          return 11
      })
      .attr("height", d=> {
        if(d.value.type ==="aggregate") 
          return 17
        else 
          return 8
      })
      .attr("width", d => { 
        if (d.value.type === "game") {
          d.value["Goals Made"] = parseInt(d.value["Goals Made"])
          d.value["Goals Conceded"] = parseInt(d.value["Goals Conceded"])
          d.value["Delta Goals"] =  d.value["Goals Made"] - d.value["Goals Conceded"];
          d.value["TotalGames"] = 0;
          d.value["Wins"] = 0;
          d.value["Losses"] = 0;
        }
        return this.goalScale(Math.abs(d.value["Delta Goals"]))
      })
      .style("fill", d => this.goalColorScale(d.value["Delta Goals"]))
      .attr("class", "goalBar");

    // Goals Made
    deltaGoals.append("circle")
      .attr("cx", d => this.goalScale(d.value["Goals Made"]))
      .attr("cy", 15)
      .style("fill", d => {
        if (d.value.type ==="aggregate")
          return this.goalColorScale(d.value["Goals Made"])
        else
          return "#fffff"
       })
      .style("stroke", d => this.goalColorScale(d.value["Goals Made"]))
      .attr("class", d => d.value.type)
      .append("title")
      .html(d => d.value["Goals Made"]);

    // Goals Conceded
    deltaGoals.append("circle")
      .attr("cx", d => this.goalScale(d.value["Goals Conceded"]))
      .attr("cy", 15)
      .style("fill", d => {
        if (d.value.type ==="aggregate") 
          return d.value["Delta Goals"] !== 0 ? this.goalColorScale(-1-d.value["Goals Conceded"]) : "grey"
        else
          return "#fffff"
      })
      .style("stroke", d => d.value["Delta Goals"] !== 0 ? this.goalColorScale(-1-d.value["Goals Conceded"]) : "grey")
      .attr("class", d => d.value.type)
      .append("title")
      .html(d => d.value["Goals Conceded"]);

    // Round/Results
    let result = tr.append("td")
      .html(d => d.value.Result.label);

    // Bar Charts
    // Wins
    let wins = tr.append("td")
      .append("svg")
      .attr("width", this.cell.width)
      .attr("height", this.cell.height)
      .attr("transform", "translate(-5, 0)");

    wins.append("rect")
      .attr("height", this.cell.height)
      .attr("width", d => this.gameScale(d.value.Wins))
      .style("fill", d => this.aggregateColorScale(d.value.Wins))
      .append("title")
      .html(d => d.value.Wins);

    wins.append("text")
      .html(d => d.value.Wins)
      .attr("x", d => this.gameScale(d.value.Wins - .9))
      .attr("y", 15)
      .attr("class", "label");

    // Losses
    let losses = tr.append("td")
      .append("svg")
      .attr("width", this.cell.width)
      .attr("height", this.cell.height)
      .attr("transform", "translate(-5, 0)");

    losses.append("rect")
      .attr("height", this.cell.height)
      .attr("width", d => this.gameScale(d.value.Losses))
      .style("fill", d => this.aggregateColorScale(d.value.Losses))
      .append("title")
      .html(d => d.value.Losses);

    losses.append("text")
      .html(d => d.value.Losses)
      .attr("x", d => this.gameScale(d.value.Losses - .9))
      .attr("y", 15)
      .attr("class", "label");

    // Total Games
    let totalGames = tr.append("td")
      .append("svg")
      .attr("width", this.cell.width)
      .attr("height", this.cell.height)
      .attr("transform", "translate(-5, 0)");

    totalGames.append("rect")
      .attr("height", this.cell.height)
      .attr("width", d => this.gameScale(d.value.TotalGames))
      .style("fill", d => this.aggregateColorScale(d.value.TotalGames))
      .append("title")
      .html(d => d.value.TotalGames);

    totalGames.append("text")
      .html(d => d.value.TotalGames)
      .attr("x", d => this.gameScale(d.value.TotalGames - .9))
      .attr("y", 15)
      .attr("class", "label");
  };

  /**
   * Updates the global tableElements variable, with a row for each row
   * to be rendered in the table.
   */
  updateList(i) {
    const data = this.tableElements[i]
    const games = data.value.games

    if (this.tableElements[i+1] === undefined) 
      this.tableElements.splice.apply(this.tableElements, [i + 1, 0].concat(games));

    else if (this.tableElements[i+1].value.type === "aggregate")
      this.tableElements.splice.apply(this.tableElements, [i + 1, 0].concat(games));

    else
      this.tableElements.splice(i + 1, games.length);

      d3.select("table#matchTable")
      .select("tbody")
      .selectAll("tr")
      .remove();
    this.updateTable();
    // Only update list for aggregate clicks, not game clicks
  }

  /**
   * Collapses all expanded countries, leaving only rows for aggregate
   * values per country.
   */
  collapseList() {
    this.tableElements = this.tableElements.filter(item => item.value.type === "aggregate");
  }
}
