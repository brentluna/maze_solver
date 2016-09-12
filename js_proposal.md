## BFS Maze Solver Visualization

### Background

This will use Breadth First Search as an approach to solve a maze. As the BFS algorithm checks each node, the CSS will update showing the path it took to get it's result.

### Functionality & MVP

Users will be able to :

- [ ] click squares on the grid to make obstacles
- [ ] click a button to start the maze solver on the current state
- [ ] reset the grid to an empty board after solving

### Wireframes

![Wireframes](maze.png)


### Architecutre and Technologies

This project will be implemented with the following technologies:

- Vanilla Javascript with React Components for overall logic and visual elements
- CSS for element styling
- Webpack to bundle and serve up the various scripts.

In addition to the webpack intrey file, there will be the followin scripts involved in this project:

'node.jsx': this script will be used to make a Node React Component that will populate the grid cells. These nodes should hold be passed coordinate props for where they lie on the grid

'intro.jsx': this script will be a Modal component that will opened when a user visits, containing instructions.

'maze.jsx': this script will hold the basic logic for solving the maze.


### Implementation Timeline

**Day 1**: Set up all necessary Node modules, including getting webpack up and running. Create a 'webpack.config.js' as well as 'package.json'. Write a basic entry file, as well as the bare bones scripts described above.
Goals for the day:
- Get green bundle w/ 'webpack'
- Get Grid populated with Node Components

**Day 2**: Dedicate today to learning the best way to get the Componenets to change color on click, as well as retrieve/give them them the necessary info to make them valid obstacles on the grid.
Goals for the day:

- Get the nodes updating in color upon click
- Allow a held down mouse dragged over components to set them as obstacles isntead of having to rely on individual clicks

**Day 3**: Get the BFS algorithm working correctly and updating the visual appearance of the map as it goes through the coordinates.
Goals for the day:

- Get the main solving Functionality and Visualization working

**Day 4**: Get the reset button working and updating the styling
Goals for the day:

- Get the reset button working to reset the grid
- make sure the styling is nic


### Bonus features

- [ ] Add additional different algorithms to solve the maze
- [ ] Allow the user to select start and end positions 
