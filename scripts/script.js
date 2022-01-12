/*
    Criar a "landing page"
    Criar uma funcionalidade para rgb
    Criar uma funcionalidade para escurecer?
*/

let shouldPaint = false, paintColor='black';
const mainContainer = document.querySelector('#main');
const leftContainer = document.querySelector('#left-buttons');
const COLORS = ['#ffffff','#000000', '#787878','#ff0000','#ff8000', '#ffff00', '#0ddd00', '#0000ff', '#8000ff', '#ff0081'];

const currentColorBtn = document.querySelector('.current-color');
currentColorBtn.style.backgroundColor = paintColor;

/*
    This function creates a grid with an specific number of rows and columns. 
    In the grid (maincontainer), the rows are divs that contain column items, wich are the divs that are shown on the screen.    
*/  
function createGrid(rows, columns){
    for(let i = 0; i < rows; i++){ 
        const row = document.createElement('div'); 
        row.setAttribute('ondragstart', 'return false;'); //prevents the dragging bug
        row.setAttribute('class', 'row');
        mainContainer.appendChild(row);

        for(let j = 0; j < columns; j++){
            const columnItem = document.createElement('div');

            columnItem.addEventListener('mouseover', paintSquare); //adds two event listeners: one for hovering and another for clicking. Can't do both in only one event listener unfortunately
            columnItem.addEventListener('mousedown', e => {
                shouldPaint = true; //is here so that only hovering doesn't paint the squares
                paintSquare(e);
            });

            columnItem.setAttribute('ondragstart', 'return false;'); //prevents the dragging bug
            columnItem.setAttribute('class', `column-item`);
            row.appendChild(columnItem);
        }
    }
}
//criar quadrado de cor atual
/*
    In this part of the code, i create a button for every color inside of the COLORS array.
    Then, I set the bg color of the button as the current color in loop of the array
    Then, i create an event listener that changes the color of the "printer" when the button created is clicked
*/
COLORS.forEach(color => {
    const btn = document.createElement('button');
    btn.classList.add('color-button');
    btn.style.cssText = `background-color: ${color}`;
    btn.addEventListener('click', event => {
        paintColor = event.target.style.backgroundColor
        currentColorBtn.style.backgroundColor = paintColor;
        currentColorBtn.style.boxShadow =`0 0 5px ${paintColor}`;

    });
    leftContainer.appendChild(btn);
});
function paintSquare(event) {   
    if (shouldPaint) {
        event.target.style.backgroundColor = `${paintColor}`; //paints only when the mouse is over an item and the mouse is clicking.
    }
}

document.addEventListener('mouseup', () => shouldPaint = false); //Changes shouldpaint to false when the user is not clicking

function startGame() {
    dimension = +prompt('How many squares do you want on one side (the other side will have the same amount of squares)?');
    mainContainer.innerHTML = '';
    createGrid(dimension, dimension);   
}
document.querySelector('.reset').addEventListener('click',  startGame);