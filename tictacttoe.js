

// declaring variables that will be used for the current player whose turn it is, the empty game board array
//and the gameActive variable.
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;


// this function creates the gameboard. It uses jquery to grab the div game-board by ID
// it then empties the div
// it then creates a var named cell, that creates a new div. It gives that div the class of cell, and sets 
// the data ndex of the current value of i (which iterates 0-8)it thien appends that cell to the gameBoard div element
// it has an event listener on the cell, that calls the next function turn

    function renderGameBoard() {
        const gameBoard = $('#game-board');
        gameBoard.empty();
        for (let i = 0; i < 9; i++) {
          const cell = $('<div>').addClass('cell').attr('data-index', i).text(board[i]);
          cell.click(turn);
          gameBoard.append(cell);
        }
      }   


// This function is called in the renderGameBoard function when a cell is clicked. 
// It creates a variable called index, this retureves the vale of data-index from the clikced cell. 
// It then checks if the clicked cell is empty, and it checks if the game is still active.
//If the conidtions are met, it is active an it is empty this updates the board array with the at the clicked index
// with the current player symbol.
// Afer updating the cell, ti calles the renderGameBoard function to redraw the board
//it then runs the checkGameResult function to see if any of the game ending requirements have been met. 
//It then toggles the current player, based on what their current symbol is
//It then updates the line of text in the players-turn div, to the current player. 

      function turn() {
        const index = $(this).data('index');
        if (board[index] === '' && gameActive) {
          board[index] = currentPlayer;
          renderGameBoard();
          checkGameResult();
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          $('#player-turn').text(`${currentPlayer}'s Turn`);
        }
      }


// This function is called after each turn. 
// It creates a var named winningCombinations, that is stored arrays of winning combinations of X's and O's
//  it iterates with a for loop over each winning combination. It ten checks that the sybols at these indices (a,b,c) are all X or all O
// if they are itcalls the showPopUp function. If not it goes to the next function where it checks for any empty cells and if no winner has been declared
// this will cause it to duplsat the Draw pop up. It checks if the board array does not include any empty cells. 
// The board.includes('') returns true if there is at least one empty cell ('') in the board array.   

      function checkGameResult() {
        const winningCombinations = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
        ];
        
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              showPopup(`${currentPlayer} Wins!`);
              return;
            }
          }
    
          if (!board.includes('')) {
            showPopup('It\'s a Draw!');
            return;
          }
        }


// This is the fucntion for displaying a pop up for the game ending conditions in the checkGameResults function
// it turns the game active var to false, meaning the game is no longer being played, and then takes a message argument
// That argument is defined in the checkGameResults function and insersts it into the pop up message div, then displays
// the pop up. 
    
        function showPopup(message) {
          gameActive = false;
          $('#popup-message').text(message);
          $('.popup').show();
        }
// This function is called when the button on the popup div is clicked. It also then runs the restartGame 
//funcion to clear the board
        function closePopup() {
          $('.popup').hide();
          restartGame();
        }
// This function is called on when the Restart Button is clicked. 
//It sets the current player to X
//It sets the board array to empties
// it sets the gameActive var to true
//it calls the renderGameBoard function to redraw the empy board
//it changes the text to display current player

        function restartGame() {
          currentPlayer = 'X';
          board = ['', '', '', '', '', '', '', '', ''];
          gameActive = true;
          renderGameBoard();
          $('#player-turn').text(`${currentPlayer}'s Turn`);
        }
// This code is using the ready method to make sure  that the code inside the function runs only when the DOM is fully loaded. 
//In this case, it calls the renderGameBoard function when the document is ready.
        $(document).ready(function () {
          renderGameBoard();
        });