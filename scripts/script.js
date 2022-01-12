//let grid = [];
let shouldPaint = false;
const mainContainer = document.querySelector('#main');

/*
    This function creates a grid with an specific number of rows and columns, that is represented by an array of arrays. 
    Each column item from the grid is stored inside of the array of arrays in its specific position (row and column).
    The function also creates the basic structure of the page. In the structure, the rows are divs that contain column items, wich are shown on the screen.
    Every div has a class with its specific index and another class that says if it's a row or a column
*/  
function createGrid(rows, columns){
    for(let i = 0; i < rows; i++){ 
        //grid.push([]);  // push a 'row' array inside main array 
        
        const row = document.createElement('div'); 
        row.setAttribute('ondragstart', 'return false;');
        row.setAttribute('class', `row`);
        
        mainContainer.appendChild(row);

        for(let j = 0; j < columns; j++){
            const column_item = document.createElement('div');
            
            column_item.addEventListener('mouseover', colorSquare);
            column_item.addEventListener('mousedown', e => {
                shouldPaint = true;
                colorSquare(e);
            });
            column_item.setAttribute('ondragstart', 'return false;');
            //grid[i].push(column_item); // push each column item inside of the specific row of index i in the array of arrays
            column_item.setAttribute('class', `column-item`);
            row.appendChild(column_item);
        }
    }

    /*Add event listeners for all the squares
    grid.forEach(row => { 
        row.forEach(item => { 
            item.addEventListener('mouseover', colorSquare);
            item.addEventListener('mousedown', e => {
                shouldPaint = true;
                colorSquare(e);
            });
        }); 
    });*/
}

function colorSquare(event) {   
    if (shouldPaint) {
        event.target.style.backgroundColor = 'black'; //paints only when the mouse is over an item and the mouse is clicking.
    }
}
/*
    I need to create a function here because IF the user wants to erase everything and create a new grid, the event listeners
    will be erased with main container. This part of the code would only run once without the function, so new event listeners
    would not be created, which isn't what i want.
*/

document.addEventListener('mouseup', () => shouldPaint = false); //Changes shouldpaint to false when the user is not clicking

function startGame() {
    dimension = +prompt('number');
    mainContainer.innerHTML = '';
    //grid.length = 0;
    createGrid(dimension, dimension);   
}
document.querySelector('.reset').addEventListener('click',  startGame);