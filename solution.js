function deadlock_handler()
{
	// the objective of this is to handle deadlock situations
	console.log();
	console.log("We need to solve the deadlock");

	var starting_point = new Array();
	for(var i=(taken_index-1);i>=0;i--)
	{
		// we need to go through all the taken cells to find the last usable cell
		if(check_if_deadlock(taken_cells[i]) == false)
		{
			console.log("We found the perfect spot to go back from !");
			console.log("We start from "+taken_cells[i]);
			starting_point = taken_cells[i];
			breakpoints[breakpoints_index] = starting_point;
			is_breakpoint = true;
			break;
		}
	}
	// now we initiate branch-making from the registered cell
	display_block();
	make_branch(starting_point);
}

function solve_values()
{
	console.clear();
	var y=0;
	var x=0;
	// first we set default values
	for(var i=0;i<(y_resolution*2)+1;i++)
	{
		x=0;
		values[i] = new Array();
		for(var j=0;j<(x_resolution*2)+1;j++)
		{
			if(i%2 == 0 || j%2 == 0)
			{
				values[i][j] = "boundary";
			}
			else
			{
				values[i][j] = symbol_to_direction(base[y][x]);
				console.log(base[y][x]);
				console.log(i+","+j);
				console.log(values[i][j]);
				x++;
			}
		}
		if(i%2 != 0)
		{
			y++;
		}
	}
}

function solve_path()
{
	// this aims at solving the boundaries so as to make an usable path
	// a cell from the boundary class could now become a corner or breakpoint or the like

	// we go along the path
	for(var i=0;i<taken_index-1;i++)
	{
		var current_cell = taken_cells[i];
		// we need to know if it is a breakpoint or not
		var is_breakpoint = false;
		for(var j=0;j<breakpoints_index;j++)
		{
			if(current_cell == breakpoints[j])
			{
				console.log(current_cell+" is a breakpoint !");
				is_breakpoint = true;
				break;
			}
		}
		if(is_breakpoint == true)
		{
			console.log("Breakpoint detected !");
			continue;
		}
		else
		{
			var next_cell = taken_cells[i+1];
			var current_value = symbol_to_direction(base[current_cell[0]][current_cell[1]]);
			var next_value = symbol_to_direction(base[next_cell[0]][next_cell[1]]);
			console.log("The current cell is "+current_cell+" with value of "+current_value);
			console.log("The next cell is "+next_cell+" with a value of "+next_value);
			if(Math.abs(current_cell[0]-next_cell[0]) == 1 || Math.abs(current_cell[1]-next_cell[1]) == 1)
			{
				// adjacent cells
				if(next_value != current_value)
				{
					console.log("Corner detected!");
				}
				else
				{
					console.log("Straight path");
				}
			}
			else
			{
				console.log("Break");
			}
		}
	}
	console.log(breakpoints);
}