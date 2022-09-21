import Cell from "../../cell.js"
import Info from "../../info.js"

class Field {
    #fieldElem
    #cells = []

    constructor() {
        this.#fieldElem = $("#field");
        for (let x = 0; x < 9; x++) {
            this.#cells.push(new Cell(this.#fieldElem, x));
        }
        this.nextPlayer = 0;
        this.turn = 0;

        $(window).on("clickCell", (evt)=> {
            this.setCellSymbol(evt.detail);
        })
    }

    setCellSymbol(cellNum) {
        this.#cells[cellNum].setSymbol(this.nextPlayer);
        this.nextPlayer = (this.nextPlayer + 1) % 2;
        this.turn++;
        if(this.turn == 9)
            console.log("end");
    }
}

export default Field