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
const getEraser = document.querySelector('.eraser');
let toggle = false;

let sketchListener = (event) => {
    event.target.style.backgroundColor = "black"
}

function sketch(){
    blocks.forEach((block) => {
        block.addEventListener("mouseover", sketchListener)
    })
}

let eraserListener = (event) => {
    event.target.style.backgroundColor = "white";
};


function removeEraserListener(){
    toggle = false
    getEraser.style.cssText = "box-shadow: 0 0 0 white"
    blocks.forEach((block) => {
        block.removeEventListener("mouseover", eraserListener)
    })
}

function eraser(){
    if(!toggle){
        getEraser.style.cssText = "box-shadow: 5px 5px 5px black"
        toggle = true
        blocks.forEach((block) => {
            block.addEventListener("mouseover", eraserListener)
        })
    }else{
        removeEraserListener()
    }
}

function clear(){
    blocks.forEach((block) => {
        getClear.addEventListener("click", () => {
            block.style.backgroundColor = "white";
            if(toggle){
                console.log()
                removeEraserListener()
            }
        })
    })
}

sketch()
clear()
