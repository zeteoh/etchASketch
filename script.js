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

let blocks = document.querySelectorAll('.block');
const getClear = document.querySelector('.clear');
const getEraser = document.querySelector('.eraser');
const getColourPicker = document.querySelector('#colorpicker');
const getSlider = document.querySelector('#slider');

let toggle = false;

let sketchListener = (event) => {
    event.target.style.backgroundColor = "black"
}

function sketch(){
    blocks.forEach((block) => {
        block.addEventListener("mouseover", sketchListener)
    })
}

function slider(){
    getSlider.addEventListener("change", (e) => {
        //to do: fix bug when changing grid, colour is not retained and black is used
        container.replaceChildren()
        makeRows(e.target.value)
        blocks = document.querySelectorAll('.block');
        sketch();
        clear();
    })
}

let colourPickerListener = (event) => {
    blocks.forEach((block) => {
        if(toggle){
            removeEraserListener()
        }
        block.addEventListener("mouseover", () => {
            block.style.backgroundColor = event.target.value;
        })
    })
}

function colourPicker(){
    getColourPicker.addEventListener("input", colourPickerListener)
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
            //if eraser is active, remove listener and toggle it off
            if(toggle){
                removeEraserListener()
            }
        })
    })
}

sketch()
clear()
colourPicker()
slider()
