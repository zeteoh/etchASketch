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
    getEraser.classList.remove('eraserActive');
    blocks.forEach((block) => {
        block.removeEventListener("mouseover", eraserListener)
    })
}

// JavaScript
function eraser(){
    if(!toggle){
        getEraser.classList.add('eraserActive');
        toggle = true;
        blocks.forEach((block) => {
            block.addEventListener("mouseover", eraserListener)
        });
    } else {
        removeEraserListener();
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
    let initialAnimations = document.querySelectorAll('.initial');
    getEraser.style.transitionDelay = "1000ms";

    initialAnimations.forEach(item => {
        item.style.transform = "translateX(0)";
        item.style.opacity = "1";
    });

    // Remove transitions after the longest transition is done
    setTimeout(function() {
        initialAnimations.forEach(item => {
            item.classList.remove('initial')
        });
        getEraser.style.transitionDelay = "0ms";
    }, 2000);  // 1s (transition duration) + 1000ms (longest delay)
}



sketch()
clear()
colourPicker()
slider()
