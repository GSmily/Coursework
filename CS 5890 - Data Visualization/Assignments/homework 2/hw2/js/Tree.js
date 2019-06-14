/** Class representing a Tree. */
class Tree {
	/**
	 * Creates a Tree Object
	 * parentNode, children, parentName, level, position
	 * @param {json[]} json - array of json object with name and parent fields
	 */
	constructor(json) {
		// Initialize array of nodes
		let nodes = [];

		// Create Nodes
		for (let i = 0; i < json.length; ++i)
			nodes.push(new Node(json[i].name, json[i].parent));

		// Link Children and Parents
		for (let i = 0; i < nodes.length; ++i) {
			let link = nodes.find(function(e) {
				return e.name === nodes[i].parentName;
			});

			if (link !== undefined) {
				nodes[i].parentNode = link;
				link.addChild(nodes[i]);
			}
		}
		this.nodes = nodes;
		this.positions = {};
	}

	/**
	 * Function that builds a tree from a list of nodes with parent refs
	 */
	buildTree() {
		let root = this.nodes.find(function(e) {
			return e.parentName === "root";
		});

        // Assigned Positions and Levels by making calls to assignPosition() and assignLevel()
		this.assignLevel(root, 0);
		this.assignPosition(root, 0);
    }

	/**
	 * Recursive function that assign positions to each node
	 */
	assignPosition(node, position) {
		node.position = this.positions[node.level]++;

		if(isNaN(node.position)){
			this.positions[node.level] = position + 1;
			node.position = position;
		}

		if(node.children.length === 0) return;

		for(let i = 0; i < node.children.length; ++i)
			this.assignPosition(node.children[i], node.position);
	}

	/**
	 * Recursive function that assign levels to each node
	 */
	assignLevel(node, level) {
		node.level = level;

		if(node.children.length === 0) return;

		for(let i = 0; i < node.children.length; ++i)
			this.assignLevel(node.children[i], level + 1);
	}

	/**
	 * Function that renders the tree
	 */
	renderTree() {
	// Scaling values
	let xScaling = 250;
	let yScaling = 130;
	let rScaling = 50;
	let padding = 75;

	// Append svg element to the body of the page
	let svg = d3.select("body")
				.append("svg")
				.attr("width", 1200)
				.attr("height", 1200)

	// Edges of the tree
	for(let i = 0; i < this.nodes.length; ++i){
		for(let j = 0; j < this.nodes[i].children.length; ++j) {
			svg.append("line")
			   .attr("x1", this.nodes[i].level * xScaling + padding)
			   .attr("x2", this.nodes[i].children[j].level * xScaling + padding)
			   .attr("y1", this.nodes[i].position * yScaling + padding)
			   .attr("y2", this.nodes[i].children[j].position * yScaling + padding)
		}
	}

	// Nodes of the tree
	svg.selectAll("circle")
	   .data(this.nodes)
	   .enter()
	   .append("circle")
	   .attr("cx", function(d) {return d.level * xScaling + padding;})
	   .attr("cy", function(d) {return d.position * yScaling + padding;})
	   .attr("r", 1 * rScaling)

	// Labels of the nodes
	svg.selectAll("text")
	   .data(this.nodes)
	   .enter()
	   .append("text")
	   .attr("x", function(d) {return d.level * xScaling + padding;})
	   .attr("y", function(d) {return d.position * yScaling + padding;})
	   .text(function(d) {return d.name;})
	   .attr("class", "label")
    }
}