function start_action()
{
	console.log("Hold on for some time while the maze is being made");
	assign_default();
	display_block();
	identify_maze_start();
	console.log("We now go on to make the maze");
	make_main_path();
	setTimeout(clean_console,3000);
	display_block();
	setTimeout(solve_path,3001);
	//display_final();
	//display_values("breakpoints");
	//setTimeout(solve_values, 3100);
	//setTimeout(display_cell_values, 3200);
	//setTimeout(final_display, 4000);// eight seconds given
	//setTimeout(clean_console,9000);// nine seconds given
}

//function solve_values is not working