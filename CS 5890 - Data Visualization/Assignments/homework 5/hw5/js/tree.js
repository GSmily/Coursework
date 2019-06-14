/** Class implementing the tree view. */
class Tree {
    /**
     * Creates a Tree Object
     */
    constructor() {
    }

    /**
     * Creates a node/edge structure and renders a tree layout based on
     * the input data
     *
     * @param treeData an array of objects that contain parent/child
     * information.
     */
  createTree(treeData) {
    // Create a tree and give it a size() of 800 by 300. 
    const mapFunction = d3.tree().size([800, 300]);

    // Create a root for the tree using d3.stratify(); 
    const root = d3.stratify()
      .id((_, i) => i)
      .parentId(d => d.ParentGame !== "" ? d.ParentGame: null)
      (treeData);
    mapFunction(root);
    // Add nodes and links to the tree. 
    const nodes = root.descendants();
    const links = root.descendants().slice(1);

    // Adds path to tree
    d3.select("g#tree")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("stroke-width", 2)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", function(d) {
        return `M ${d.y},${d.x} ` +
        `C ${(d.y+d.parent.y)/2},${d.x} ` +
        `  ${(d.y+d.parent.y)/2},${d.parent.x} ${d.parent.y},${d.parent.x}`;
      })
      .attr("class", d => "link " + d.data.Team);

    // Adds text to tree
    d3.select("g#tree")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.y}, ${d.x})`)
      .append("text")
      .text(d => d.data.Team)
      .attr("text-anchor", d => d.children === undefined ? "start" : "end")
      .attr("dx", d => d.children === undefined ? 15 : -15)
      .attr("dy", 4)
      .style("font", "14px sans-serif")
      .attr("class", d => d.data.Team);

    // Adds circle nodes to tree
    d3.select("g#tree")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", d => {
        return `translate(${d.y}, ${d.x})`;
      })
      .append('circle')
      .attr("fill", d => d.data["Wins"] === '0' ? "#be2714" : "#364e74" )
      .data(nodes)
      .attr("r", 6)
  };

   /**
   * Removes all highlighting from the tree.
   */
  clearTree() {
    d3.select("g#tree").selectAll("text").classed("selectedLabel", false);
    d3.select("g#tree").selectAll("path").classed("selected", false);
    // You only need two lines of code for this! No loops! 
  }

  /**
   * Updates the highlighting in the tree based on the selected team.
   * Highlights the appropriate team nodes and labels.
   *
   * @param row a string specifying which team was selected in the table.
   */
  updateTree(row) {
    // ******* TODO: PART VII *******
    this.clearTree();

    // Only highlights aggregate teams
    d3.select("g#tree")
      .selectAll("text." + row.key)
      .classed("selectedLabel", true);

    d3.select("g#tree")
      .selectAll("path." + row.key)
      .classed("selected", true);
  }
}
