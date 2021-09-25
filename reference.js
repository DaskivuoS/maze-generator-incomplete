function assign_default()
{
	console.log("We assigning default values");
	for(var i=0;i<y_resolution;i++)
	{
		for(var j=0;j<x_resolution;j++)
		{
			base[i][j] = "o";
		}
	}
}

function assign_symbol(direction)
{
	var symbol = "";
	if(direction == "left")
	{
		symbol = "&larr;";
	}
	if(direction == "right")
	{
		symbol = "&rarr;";
	}
	if(direction == "up")
	{
		symbol = "&uarr;";
	}
	if(direction == "down")
	{
		symbol = "&darr;";
	}
	return symbol;
}

function symbol_to_direction(symbol)
{
	var direction = "";
	if(symbol == "&larr;")
	{
		direction = "left";
	}
	if(symbol == "&rarr;")
	{
		direction = "right";
	}
	if(symbol == "&uarr;")
	{
		direction = "up";
	}
	if(symbol == "&darr;")
	{
		direction = "down";
	}
	return direction;
}


function assign_beginning_direction(cell)
{
	// the cell must be on the edge
	var direction = "";
	if(cell[0] == 0)
	{
		direction = "down";
	}
	if(cell[0] == (y_resolution-1))
	{
		direction = "up";
	}
	if(cell[1] == 0)
	{
		direction = "right";
	}
	if(cell[1] == (x_resolution-1))
	{
		direction = "left";
	}
	return direction;
}

function check_if_done()
{
	// the objective of this function is to check if all the cells have been attented to or not
	var done = true;
	for(var i=0;i<y_resolution;i++)
	{
		for(var j=0;j<x_resolution;j++)
		{
			if(base[i][j] == "o")
			{
				done = false;
			}
		}
	}
	return done;
}