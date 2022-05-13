 # Exercise 1: Lights Out 
 
 ## Game Description 
 
 Write a piece of software which allows you to play the logic puzzle Lights Out. The game is played 
 on  a 3x3 grid. Each cell in the grid represents a  Light, that can be either on or off. The game starts 
 with some or all lights turned on. The player's task is to switch off all lights. This would be easy, if 
 each light can be turned off individually - however - each time you toggle a light all its neighbors 
 will be toggled as well. 
 
 ## Instructions 
 
 Write a program that lets you play this game. 
 -   Start by representing the game board. 
 -   Repeatedly ask the player which light they want to toggle. 
 -   Toggle the light and all direct(i.e. not the diagonal ones) neighbors. 
 -   Check if the game is won. 
 
 ## Details and FAQ: 
 -   You do not need a graphical user interface for this exercises (any other form of 
 interaction, for instance, through the command line interface, is acceptable as well) 
 -   When the game is won, it should notify the player and end the game. 
 -   You can use “all lights turned on” as the initial board. 