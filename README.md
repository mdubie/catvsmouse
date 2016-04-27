# catvsmouse
simple game


landing screen
mouse 1x1 square
cat 3x3 square

mouse speed
cat speed

each timestep

mouse {
  size = 1x1;
  speed = (some sort of delay fn);
  position = i,j;
}

cat {
  size = 3x3;
  speed = (some sort of delay fn);
  position = i,j;
}

//build progression//
xbuild map
  xnxm array
xbuild map display fn
xplace mouse
  xadd class towhere the mouse is and css format it
xallow mouse to move on key up
build cat
make cat move towards mouse
allow cat to kill the mouse
  is cat touching mouse fn
increase speed of cat over time
have 'levels' flash once cat reaches a certain speed
place obstacles
randomly generate obstacles
add a start button
user input mouse speed
user input mouse size
user input cat size