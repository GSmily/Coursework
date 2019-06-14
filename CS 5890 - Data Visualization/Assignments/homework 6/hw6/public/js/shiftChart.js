/** Class implementing the shiftChart. */
class ShiftChart {

  /**
   * Initializes the svg elements required for this chart;
   */
  constructor(){
    this.divShiftChart = d3.select("#shiftChart").classed("sideBar", true);

  };

  stateGetter(selectedStates) {
    let text = "<ul>";
    selectedStates.forEach(row => {
      text += "<li>" + row.State + "</li>"
    })
    text += "</ul>";

    return text;
  }

  /**
   * Creates a list of states that have been selected by brushing over the Electoral Vote Chart
   *
   * @param selectedStates data corresponding to the states selected on brush
   */
  update(selectedStates){
    // ******* PART V *******
    this.divShiftChart.selectAll("text").remove();

    //Display the names of selected states in a list
    this.divShiftChart
      .append("text")
      .html(this.stateGetter(selectedStates));

    //******** PART VI *******
    //Use the shift data corresponding to the selected years and sketch a visualization
    //that encodes the shift information

  };


}
