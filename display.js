function display_block()
{
	console.log("We displaying the block");
	// this displays the maze
	display = "<table id='maze'>";
	for(var i=0;i<y_resolution;i++)
	{
		display = display+"<tr>";
		for(var j=0;j<x_resolution;j++)
		{
		display = display+"<td class='maze_cell'>"+base[i][j]+"</td>"	
		}
		display = display+"</tr>";
	}
	display = display+"</table>";
	document.getElementById("display").innerHTML = display;
}

function clean_console()
{
	// this cleans the console
	// it erases everything from the console and keeps just the elementary notices
	console.clear();
	console.log("The starting point is ("+starting_point+") and the ending point is ("+ending_point+")");
	console.log("Have a nice game !");
}

function display_values(name)
{
	// the focus is to display the various values for developer use
	console.clear();

	if(name == "breakpoints")
	{
		// this displays all the breakpoints with the direction they broke to
		console.log("The breakpoints are :");
		for(var i=0;i<breakpoints_index;i++)
		{
			console.log(breakpoints[i]+" is a breakpoint, breaking off to "+breakpoints_direction[i]);
		}
	}
	if(name == "taken")
	{
		// this displays all the taken cells
		console.log("Here are the taken cells in the due order");
		for(var i=0;i<taken_index;i++)
		{
			console.log(taken_cells[i]);
		}
	}
	if(name == "ends")
	{
		// this displays the starting and ending points
		console.log("The maze starts from "+starting_point+" and ends at "+ending_point);
	}
}

function display_cell_values()
{
	// this displays the table named values with specific directional information
	//console.clear();
	console.log("We displaying the values");
	// this displays the maze
	display = "<table id='maze_value'>";
	for(var i=0;i<(y_resolution*2)+1;i++)
	{
		display = display+"<tr>";
		for(var j=0;j<(x_resolution*2)+1;j++)
		{
			if(values[i][j] == "boundary")
			{
				display = display+"<td class='boundary'>"+values[i][j]+"</td>";
			}
			else
			{
				display = display+"<td class='maze_cell'>"+values[i][j]+"</td>";
			}
		}
		display = display+"</tr>";
	}
	display = display+"</table>";
	document.getElementById("display").innerHTML = display;
}