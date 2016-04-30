# catvsmouse

//Jack recs to fix
Main loop smaller

Pseudoclassesical > functional ( Immutable.js lib? )

reduce state representation

separate state and rendering completely

//Issues to fix
Refactor code in 'once document is ready' function to not rely on accessing variables global to that function

Refeactor nested setInterval for level and cat speed control

Restart game once eaten

Better n-th child selection method in updateField (nested for loops costly)

Levels constructor vs levels object

Look at functional classes vs psuedoclassical

Cleaner function for handling user input (break out the calling of the move)


//build progression//
xbuild map
  xnxm array
xbuild map display fn
xplace mouse
  xadd class towhere the mouse is and css format it
xallow mouse to move on key up
xbuild cat
xmake cat move towards mouse
xallow cat to kill the mouse
  xis cat touching mouse fn
xincrease speed of cat over time
xhave 'levels' flash once cat reaches a certain speed

//to do
xincrease speed
  xwork around nested loops of rebuilding map
  xrexamine the whole id/class thing
xhave levels stop incrementing once eaten
restart game once eaten
