function get_random_direction()
{
	var random = Math.floor(Math.random()*10/2.5);
	var direction = "";
	if(random == 0)
		direction = "left";
	if(random == 1)
		direction = "up";
	if(random == 2)
		direction = "right";
	if(random == 3)
		direction = "down";
	console.log("The random number is "+random+" and the side chosen is "+direction);
	return direction;
}

function toss_coin()
{
	var random = Math.floor(Math.random()*10/5);
	var result;
	if(random == 1)
	{
		result = "heads";
	}
	else
	{
		result = "tails";
	}
	console.log("The toss bore "+result);
	return result;
}

function to_next_location(cell,direction)
{
	// this takes in tthe current cell and direction assigned, then proceeds to the direction
	var next_location = new Array();
	if(direction == "up")
	{
		next_location = [cell[0]-1,cell[1]]
	}
	if(direction == "down")
	{
		next_location = [cell[0]+1,cell[1]];
	}
	if(direction == "left")
	{
		next_location = [cell[0],cell[1]-1];
	}
	if(direction == "right")
	{
		next_location = [cell[0],cell[1]+1];
	}

	// now we need to check if the proposal is out of bounds, we need to validate the location
	var validity = false;
	if (next_location[0]>=0 && next_location[0]<y_resolution)
	{
		if(next_location[1]>=0 && next_location[1]<x_resolution)
		{
			validity = true;
		}
	}

	if(validity == true)
	{
		console.log("A probable next location could be ("+next_location+")");
		return next_location;
	}
	else
	{
		console.log("A next location could have been ("+next_location+") but it is invalid");
		return validity;
	}
}

function check_if_taken(cell)
{
	var taken;
	if(base[cell[0]][cell[1]] == "o")
	{
		taken = false;
	}
	else
	{
		taken = true;
	}
	console.log("The status of the cell ("+cell+") - is taken ? :: "+taken);
	console.log("The value in it was "+base[cell[0]][cell[1]]);
	return taken;
}
function check_if_deadlock(cell)
{
	// a deadlock is a situation when the cell can go in no direction, it is trapped
	var is_deadlock = false;

	var left = to_next_location(cell,"left");
	var up = to_next_location(cell,"up");
	var right = to_next_location(cell,"right");
	var down = to_next_location(cell,"down");

	var pass = 0;
	if(left != false)
	{
		var check_left = check_if_taken(left);
		if(check_left == true)
		{
			pass++;
		}
	}
	else
	{
		pass++;
	}
	if(up != false)
	{
		var check_up = check_if_taken(up);
		if(check_up == true)
		{
			pass++;
		}
	}
	else
	{
		pass++;
	}
	if(right != false)
	{
		var check_right = check_if_taken(right);
		if(check_right == true)
		{
			pass++;
		}
	}
	else
	{
		pass++;
	}
	if(down != false)
	{
		var check_down = check_if_taken(down);
		if(check_down == true)
		{
			pass++;
		}
	}
	else
	{
		pass++;
	}

	console.log(pass+" number of sides are taken");
	if(pass == 4)
	{
		console.log("It is a deadlock !");
		is_deadlock = true;
	}
	return is_deadlock;
}