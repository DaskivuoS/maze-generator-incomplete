//----------------------------------------------------------------THE GLOBAL VARIABLES

var base = new Array();// this essentially holds the maze

var y_resolution = 20;
var x_resolution = 20;

var starting_point = new Array();

var ending_point;
var breakpoints = new Array();
var breakpoints_direction = new Array();
var breakpoints_index = 0;
var is_breakpoint = false;

var taken_cells = new Array();
var taken_index = 0;

var display = "";

for(var i=0;i<y_resolution;i++)
{
	base[i] = new Array();
	for(var j=0;j<x_resolution;j++)
	{
		base[i][j] = "";
	}
}

var steps = new Array(); // holds the turns taken, in order
var values = new Array();

var number_of_steps = 0;

//--------------------------------------------------------------FUNCTIONS

//--------------------------------------------------------------RELATED TO ACTUAL MAKING OF THE MAZE

function identify_maze_start()
{
	// now we go on to create a maze

	// FIRST WE DECIDE WHERE TO START THE MAZE FROM !
	var direction = get_random_direction();
	var index = 0;
	var number_of_zeroes = 0;
	if(direction == "up" || direction == "down")
	{
		number_of_zeroes = (''+x_resolution).length;
		index = Math.floor(Math.random()*Math.pow(10,number_of_zeroes)/(Math.pow(10,number_of_zeroes)/x_resolution));
	}
	if(direction == "left" || direction == "right")
	{
		number_of_zeroes = (''+y_resolution).length;
		index = Math.floor(Math.random()*Math.pow(10,number_of_zeroes)/(Math.pow(10,number_of_zeroes)/y_resolution));
	}
	console.log(index+" is the number from "+direction);

	if(direction == "left")
	{
		starting_point = [index,0];
	}
	if(direction == "up")
	{
		starting_point = [0,index];
	}
	if(direction == "right")
	{
		starting_point = [index,(x_resolution-1)];
	}
	if(direction == "down")
	{
		starting_point = [(y_resolution-1),index];
	}
	base[starting_point[0]][starting_point[1]] = "x";
	console.log("("+starting_point+") is the starting poing of the maze");
}

function make_main_path()
{
	if(check_if_done == true)
	{
		console.clear();
		console.log("All the cells have been filled up !");
	}
	// the focus of this function is to make the main tunnel
	var current_location = starting_point;
	var proposed_direction = assign_beginning_direction(current_location);
	console.log("We are digging the main tunnel, starting from "+current_location+" towards "+proposed_direction);

	var i=0;
	for(i=0;;)
	{
		// we need go no more when all the cells have been filled
		if(check_if_done() == true)
		{
			console.clear();
			console.log("We have finished making the maze !");
			break;
		}
		console.clear();
		console.log(i);
		
		var proposed_location = to_next_location(current_location,proposed_direction);
		if(proposed_location != false)
		{
			// we need to check if the cell is taken or not
			var is_taken = check_if_taken(proposed_location);
			if(is_taken == false)
			{
				// we can utilise this cell
				console.log("We shift to ("+proposed_location+") from ("+current_location+")");
				current_location = proposed_location;
				base[current_location[0]][current_location[1]] = assign_symbol(proposed_direction);
				proposed_direction = get_random_direction();
				taken_cells[taken_index] = current_location;
				display_block();
				i++; // a step counted
				taken_index++;
			}
			else
			{
				// the proposed location is taken, we need to get another way out
				deadlock_handler();
				break;
			}
		}
		else
		{
			// we have run our course to an edge
			// we go along another path
			console.log("We ran out of bounds and so, a new course...");

			// we keep the position and number of steps taken stored for later reference
			console.log("We add a possible ending point to our list");
			ending_point = current_location;

			deadlock_handler();
			break;
		}
	}
	console.log("The ending point is "+ending_point);
	base[ending_point[0]][ending_point[1]] = "v";
	console.log("The taken cells are, in order :");
	for(var i=0;i<taken_index;i++)
	{
		console.log(taken_cells[i]);
	}
}

function make_branch(cell)
{
	if(check_if_done == true)
	{
		console.clear();
		console.log("All the cells have been filled up !");
	}

	// the objective of this is to make a branch from a specified cell
	// this is somewhat similar to the function to make the main path

	var current_location = cell;

	for(var i=0;;)
	{
		if(check_if_done() == true)
		{
			console.clear();
			console.log("We have finished making the maze !");
			break;
		}

		// here we write the code to make a branch
		// we need to properly calculate the number of steps from start to a potential finishing point

		console.clear();

		var proposed_direction = get_random_direction();
		var proposed_location = to_next_location(current_location,proposed_direction);

		// we need to check if it is a start from a breakpoint
		if(is_breakpoint == true)
		{
			is_breakpoint = false;
			breakpoints_direction[breakpoints_index] = proposed_direction;
			breakpoints_index++;
		}

		if(proposed_location != false)
		{
			// the proposed position is possible
			if(check_if_taken(proposed_location) == false)
			{
				// we have an empty spot
				// we shift to the next spot
				current_location = proposed_location;
				base[current_location[0]][current_location[1]] = assign_symbol(proposed_direction);
				taken_cells[taken_index] = current_location;
				taken_index++;
				i++;
			}
			else
			{
				deadlock_handler();
				break;
			}
		}
		else
		{
			console.log("We have reached to the edge of our formation");
			ending_point = current_location;
			deadlock_handler();
			break;
		}
	}
}