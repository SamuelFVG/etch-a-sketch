const grid = [];

const mainContainer = document.querySelector("#main");

createGrid(4, 4);
/*
    This function creates a grid with an specific number of rows and columns, that is represented by an array of arrays. 
    Each column item from the grid is stored inside of the array of arrays in its specific position (row and column).
    The function also creates the basic structure of the page. In the structure, the rows are divs that contain column items, wich are shown on the screen.
    Every div has a class with its specific index and another class that says if it's a row or a column
*/  
function createGrid(rows, columns){
    for(let i = 0; i < rows; i++){ 
        grid.push([]);  // push a 'row' array inside main array 
        const row = document.createElement('div'); 
        row.setAttribute('class', `row _${i}`);
        mainContainer.appendChild(row);

        for(let j = 0; j < columns; j++){
            const column_item = document.createElement('div');

            grid[i].push(column_item); // push each column item inside of the specific row of index i in the array of arrays
            column_item.textContent = `${i}x${j}`
            column_item.setAttribute('class', `column-item _${i}_${j}`);
            row.appendChild(column_item);
        }
    }
}
