// create a new 16 by 16 grid
// initialise a row 
// initiliase 16 columns of grid
// create divs of a box
// once hit 16 rows, stop

const container = document.querySelector('.content');

function makeRows(x){
    for(let i = 0; i< x; i++){
        const row = document.createElement('div');
        for(let j = 0; j < x; j++){
            const column = document.createElement('div');
            const size = 360/x
            column.style.width = `${size}px`;
            column.style.height = `${size}px`;
            column.classList.add("block");
            row.appendChild(column)
        }
        container.appendChild(row);
    }
}

makeRows(8);

const blocks = document.querySelectorAll('.block');
const getClear = document.querySelector('.clear');

function sketch(){
    blocks.forEach((block) => {
        block.addEventListener("mouseover", () => {
            block.style.backgroundColor = "black";
        })
    })
}

function clear(){
    blocks.forEach((block) => {
        getClear.addEventListener("click", () => {
            block.style.backgroundColor = "white";
        })
    })
}

sketch()
clear()

function blockEdit(block, colour){
    block.style.backgroundColor = colour
}