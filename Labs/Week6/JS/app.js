var app = new Vue({
    el: "#app",
    data: {
        gameOver: false,
        playerTurn: 1,
        grid: [
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ],
            [ 0,0,0,0,0,0,0 ]
        ]
    },
    methods: {
        selectCell: function(row, col) {

            //get the row to place the puck at
            var moveRow = this.lowestMove(col);
            
            if(moveRow >= 0) {
                //copy grid to a temporary var
                var tempGrid = this.grid.slice(0);

                //modify the cloned version
                tempGrid[moveRow][col] = this.playerTurn;

                //replace
                this.grid = tempGrid;

                //swap player turn
                this.playerTurn = (this.playerTurn == 1) ? 2 : 1;

                //check for win
                this.checkWin();
            }
            
        },
        checkWin: function() {
            //loop through all columns to check

            //if win found, set over to true
            for(var row = 0; row < this.grid.length; row++){
                for(var cell = 0; cell < this.grid[row].length; cell++){
                    if (row-3 >= 0) {
                        if ((this.grid[row-3][cell] == this.grid[row-2][cell] && this.grid[row-1][cell] == this.grid[row][cell] && this.grid[row][cell] == this.grid[row-3][cell]) && (this.grid[row][cell] == 1 || this.grid[row][cell] == 2)){
                            this.gameOver = true;
                            this.winningplayer = this.playerturn;
                            break;
                        }
                    }
                    if (cell-3 >= 0) {
                        if ((this.grid[row][cell-3] == this.grid[row][cell-2] && this.grid[row][cell-1] == this.grid[row][cell] && this.grid[row][cell] == this.grid[row][cell-3]) && (this.grid[row][cell] == 1 || this.grid[row][cell] == 2)) {
                            this.gameOver = true;
                            this.winningplayer = this.playerturn;
                            break;
                        }
                    }
                    if(row - 3 >= 0 && cell - 3 >= 0){
                        if ((this.grid[row-3][cell-3] == this.grid[row-2][cell-2] && this.grid[row-1][cell-1] == this.grid[row][cell] && this.grid[row][cell] == this.grid[row-3][cell-3]) && (this.grid[row][cell] == 1 || this.grid[row][cell] == 2)) {
                            this.gameOver = true;
                            this.winningplayer = this.playerturn;
                            break;
                        }
                    }
                    if(row - 3 >= 0 && cell + 3 <= this.grid[row].length){
                        if ((this.grid[row-3][cell+3] == this.grid[row-2][cell+2] && this.grid[row-1][cell+1] == this.grid[row][cell] && this.grid[row][cell] == this.grid[row-3][cell+3]) && (this.grid[row][cell] == 1 || this.grid[row][cell] == 2)) {
                            this.gameOver = true;
                            this.winningplayer = this.playerturn;
                            break;
                        }
                    }
                }
        }
    },
    
       lowestMove: function(col) {
            //start at the bottom of a col, loop upwards
            for(var row = 5; row >= 0; row--) {
                //check to see if current row is free
                if(this.grid[row][col]==0) {
                    //if it is free, return the row index
                    return(row);
                }
            }
        }
    }
})