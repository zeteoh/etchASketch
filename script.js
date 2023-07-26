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

makeRows(16);

let blocks = document.querySelectorAll('.block');
const getClear = document.querySelector('.clear');
const getEraser = document.querySelector('.eraser');
const getColourPicker = document.querySelector('#colorpicker');
const getSlider = document.querySelector('#slider');
const getSliderValue = document.querySelector('.grid-value');
let colour = "black";
let toggle = false;

getSliderValue.textContent = " 16 by 16"

let sketchListener = (event) => {
    event.target.style.backgroundColor = colour;
}

function sketch(){
    blocks.forEach((block) => {
        block.addEventListener("mouseover", sketchListener)
    })
}


let colourPickerListener = (event) => {
    blocks.forEach((block) => {
        if(toggle){
            removeEraserListener()
        }
        colour = event.target.value;
        sketch();
    })
}

function colourPicker(){
    getColourPicker.addEventListener("input", colourPickerListener)
}

function slider(){
    getSlider.addEventListener("change", (e) => {
        container.replaceChildren()
        makeRows(e.target.value)
        getSliderValue.textContent = `${e.target.value} by ${e.target.value}`
        blocks = document.querySelectorAll('.block');
        sketch();
        clear();
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
            //if eraser is active, remove listener and toggle it off
            if(toggle){
                removeEraserListener()
            }
        })
    })
}

window.onload = function() {
    let settingsItems = document.querySelectorAll('.settings > div');
    container.style.transform = "translateX(0)";
    container.style.opacity = "1";
    settingsItems.forEach(item => {
        item.style.transform = "translateX(20%)";
        item.style.opacity = "1";
    });
}



sketch()
clear()
colourPicker()
slider()
