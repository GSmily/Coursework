// Prim's Maze Algorithm
class Maze {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.total_cells = x * y;
	}

  // Initializes the maze
	initialize() {
		let mazeArray = new Array();

    // Create 2d array with x and y values
		for (let i = 0; i < this.x; i++) {
			mazeArray[i] = new Array();
			for (let j = 0; j < this.y; j++) {
        mazeArray[i][j] = {x: i, y: j, score: -2, end: false};
			}
		}
		return mazeArray;
	}

  // Randomizes the maze
	randomize(mazeArray) {
    let x = this.x;
		let y = this.y;
		let xCoord = parseInt(Math.random() * (this.x - 1));
    let yCoord = parseInt(Math.random() * (this.y - 1));
    let neighborCells = [];
		let frontier = [];
		let randomNeighbor = 0;
		let randomFrontier = 0;

    // Adds a random cell to the maze
		mazeArray[xCoord][yCoord].path = true;

    // Function that adds all neighboring cells
		function addNeighborCells(xCell, yCell, frontier) {
		  	if (frontier.indexOf((xCell + 1) + ',' + yCell) < 0 && mazeArray[xCell + 1] && mazeArray[xCell + 1][yCell] && !mazeArray[xCell + 1][yCell].path) {
		    	frontier.push((xCell + 1) + ',' + yCell);
		  	}
		  	if (frontier.indexOf((xCell - 1) + ',' + yCell) < 0 && mazeArray[xCell - 1] && mazeArray[xCell - 1][yCell] && !mazeArray[xCell - 1][yCell].path) {
		    	frontier.push((xCell - 1) + ',' + yCell);
		  	}
		  	if (frontier.indexOf(xCell + ',' + (yCell - 1)) < 0 && mazeArray[xCell][yCell - 1] && !mazeArray[xCell][yCell - 1].path) {
		    	frontier.push(xCell + ',' + (yCell - 1));
		  	}
		  	if (frontier.indexOf(xCell + ',' + (yCell + 1)) < 0 && mazeArray[xCell][yCell + 1] && !mazeArray[xCell][yCell + 1].path) {
		      frontier.push(xCell + ',' + (yCell + 1));
		  	}
		}

		addNeighborCells(xCoord, yCoord, frontier);

    // Make paths between cells as long as there are walls
		while(frontier.length) {
        // Random wall from frontier
	  		randomFrontier = parseInt(Math.random() * (frontier.length - 1));

        // Random frontier cell
	  		xCoord = parseInt(frontier[randomFrontier].split(',')[0]);
	  		yCoord = parseInt(frontier[randomFrontier].split(',')[1]);

        // Remove the frontier cell
	  		frontier.splice(randomFrontier, 1);

        // Add the new path between neighbors as a part of the maze
	  		if (yCoord + 1 < y && mazeArray[xCoord][yCoord + 1].path === true) {
	    		neighborCells.push('top');
        }
	  		if (xCoord - 1 >= 0 && mazeArray[xCoord - 1][yCoord].path === true) {
	    		neighborCells.push('left');
        }
        if (yCoord - 1 >= 0 && mazeArray[xCoord][yCoord - 1].path === true) {
	    		neighborCells.push('bottom');
	  		}
	  		if (xCoord + 1 < x && mazeArray[xCoord + 1][yCoord].path === true) {
	   			neighborCells.push('right');
	  		}

        // If there are multiple neighbors choose one
	  		if (neighborCells.length > 1) {
	    		randomNeighbor = parseInt(Math.random() * (neighborCells.length - 1));
	  		} 
	  		else {
	    		randomNeighbor = 0;
	  		}

	  		mazeArray[xCoord][yCoord].path = true;

        // Opens path between cells
        if (neighborCells[randomNeighbor] == 'top') {
          mazeArray[xCoord][yCoord].top = true;
          mazeArray[xCoord][yCoord + 1].bottom = true;
        }
        else if (neighborCells[randomNeighbor] == 'left') {
          mazeArray[xCoord][yCoord].left = true;
          mazeArray[xCoord - 1][yCoord].right = true;
        }
        else if (neighborCells[randomNeighbor] == 'bottom') {
          mazeArray[xCoord][yCoord].bottom = true;
          mazeArray[xCoord][yCoord - 1].top = true;
        }
        else if (neighborCells[randomNeighbor] == 'right') {
          mazeArray[xCoord][yCoord].right = true;
          mazeArray[xCoord + 1][yCoord].left = true;
        }

        // Update frontier list
	  		addNeighborCells(xCoord, yCoord, frontier);

	  		neighborCells = [];
		}

    // Set the ending point of the maze
		mazeArray[x - 1][y - 1].end = true;
		return mazeArray;
	}

	get maze() {
		return this.randomize(this.initialize());
	}
}