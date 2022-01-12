const grid = [];
let shouldPaint = false;
const mainContainer = document.querySelector("#main");

createGrid(40, 40);
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
            //column_item.textContent = `${i}x${j}`
            column_item.setAttribute('class', `column-item _${i}_${j}`);
            row.appendChild(column_item);
        }
    }
}

function changeColor(event) {
    if (shouldPaint) event.target.style.backgroundColor = 'black';
}

grid.forEach(row => { 
    row.forEach(item => { 
        item.addEventListener("mouseover", changeColor);
    });
});

mainContainer.addEventListener('mousedown', e => {
    shouldPaint = true;
    changeColor(e);
});
document.addEventListener('mouseup', () => shouldPaint = false);

const alldivs = document.querySelectorAll('div');
alldivs.forEach(div => div.addEventListener('dragstart', e => e.preventDefault()))