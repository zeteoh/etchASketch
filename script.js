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
            console.log(size)
            row.appendChild(column)
        }
        container.appendChild(row);
    }
}

makeRows(8);