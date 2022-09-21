import Cell from "../tic_tac_toe_OOP/cell.js"
import Info from "../tic_tac_toe_OOP/info.js"
// import Cell from "./cell.js"
// import Info from "./info.js"

class Field {
    #fieldElem
    #cells = []
    #nextPlayer
    #turn
    #winner

    constructor() {
        $(window).off("clickCell");
        this.#fieldElem = $("#field");
        this.#fieldElem.empty();
        for (let x = 0; x < 9; x++) {
            this.#cells.push(new Cell(this.#fieldElem, x));
        }
        this.#nextPlayer = 0;
        this.#turn = 0;
        this.#winner = -1;
        new Info();
        this.sendChPlayerEvt();

        $(window).on("clickCell", (evt)=> {
            this.nextTurn(evt.detail);
        })
    }

    nextTurn(cellNum) {
        this.#cells[cellNum].setSymbol(this.#nextPlayer);
        this.#nextPlayer = (this.#nextPlayer + 1) % 2;
        this.#turn++;
        this.checkWinner(cellNum);
        if(this.#turn >= 9 && this.#winner == -1)
            this.#winner = 2;
        //events
        this.sendChPlayerEvt();
        if(this.#winner != -1) {
            this.sendWinEvt();
        }
    }

    checkLine(cellNum) {
        let lineBegin = cellNum - (cellNum % 3);
        return  this.#cells[lineBegin].getSymbol() == this.#cells[lineBegin+1].getSymbol() &&
                this.#cells[lineBegin+1].getSymbol() == this.#cells[lineBegin+2].getSymbol()
    }

    checkCol(cellNum) {
        let columnBegin = cellNum % 3;
        return  this.#cells[columnBegin].getSymbol() == this.#cells[columnBegin+3].getSymbol() &&
                this.#cells[columnBegin+3].getSymbol() == this.#cells[columnBegin+6].getSymbol()
    }

    checkDiagonal(thisSymbol) {
        return  this.#cells[4].getSymbol() == thisSymbol &&
                ((this.#cells[0].getSymbol() == this.#cells[4].getSymbol() &&
                this.#cells[4].getSymbol() == this.#cells[8].getSymbol()) ||
                (this.#cells[2].getSymbol() == this.#cells[4].getSymbol() &&
                this.#cells[4].getSymbol() == this.#cells[6].getSymbol()))
    }

    checkWinner(cellNum) {
        let thisSymbol = this.#cells[cellNum].getSymbol();
        if(this.checkLine(cellNum) || this.checkCol(cellNum) || this.checkDiagonal(thisSymbol))
            this.#winner = thisSymbol;
    }

    sendChPlayerEvt() {
        let pEvent = new CustomEvent("changePlayer", {detail:(this.#nextPlayer)});
        window.dispatchEvent(pEvent);
    }

    sendWinEvt() {
        $(window).off("clickCell");
        let wEvent = new CustomEvent("winGame", {detail:{winner:this.#winner, turns:this.#turn}});
        window.dispatchEvent(wEvent);
    }

}

export default Field