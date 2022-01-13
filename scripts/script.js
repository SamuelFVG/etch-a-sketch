let shouldPaint = false, paintColor='black', landingIsFlex = true;
const mainContainer = document.querySelector('#main');
const leftContainer = document.querySelector('#left-buttons');
const modalInstructions = document.querySelector('.instructions-in-modal');
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
                shouldPaint = true; //is here so that the hovering, by itself, doesn't paint the squares
                paintSquare(e);
            });

            columnItem.setAttribute('ondragstart', 'return false;'); //prevents the dragging bug
            columnItem.setAttribute('class', `column-item`);
            row.appendChild(columnItem);
        }
    }
}
/*
    In this part of the code, i create a button for every color inside of the COLORS array.
    Then, I set the bg color of the button as the current color in loop of the array
    Then, i create an event listener that changes the color of the "printer" when the button created is clicked
*/
document.addEventListener('mouseup', () => shouldPaint = false); //Changes shouldpaint to false when the user is not clicking

COLORS.forEach(color => {
    const btn = document.createElement('button');
    btn.classList.add('color-button', 'left-btn');
    btn.style.cssText = `background-color: ${color}`;
    btn.addEventListener('click', event => {
        paintColor = event.target.style.backgroundColor
        currentColorBtn.style.cssText = `background-color: ${paintColor}; box-shadow: 0 0 5px ${paintColor}`;
    });
    leftContainer.appendChild(btn);
});

function paintSquare(event) {   
    if (shouldPaint) {
        event.target.style.backgroundColor = `${paintColor}`; //paints only when the mouse is over an item and the mouse is clicking.
    }
}

//When the reset button is clicked, make the landing popup visible by making it go from 'display: none' to 'display: flex'
document.querySelector('.reset').addEventListener('click',  () => {
    document.querySelector('.landing').style.display = 'flex';
    landingIsFlex = true;
});



let willSubmit = false;
document.querySelector(".submit-button").addEventListener('click', ()=>{
    startGridCreation();
    willSubmit = true;
});
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && landingIsFlex){
        startGridCreation();
        willSubmit = true;
    }
});

function startGridCreation() {
    dimension = document.querySelector('#amount-of-boxes').value;
    
    if ((dimension <= 1 || dimension >= 100 || isNaN(dimension)) && willSubmit){
        alert('Invalid input');
        modalInstructions.textContent = 'Ivalid input! The new width should be smaller than 100 and greater than 1.';
        modalInstructions.style.color = 'red'; 
        willSubmit = false;
    }
    else if(willSubmit){
        document.querySelector('.landing').style.display = 'none';
        mainContainer.innerHTML = '';
        willSubmit = false;
        modalInstructions.textContent = 'Write the new width. It should be smaller than 100 and greater than 1.';
        modalInstructions.style.color = 'black';
        createGrid(dimension, dimension);
    }

}
