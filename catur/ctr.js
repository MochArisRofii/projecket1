document.addEventListener('DOMContentLoaded', () => {
    let board = null;
    const game = new Chess(); 
    const moveHistory = document.getElementById('move-history'); 
    let moveCount = 1; 
    let userColor = 'w'; 

    
    const makeRandomMove = () => {
        const possibleMoves = game.moves();

        if (game.game_over()) {
            alert("Checkmate!");
        } else {
            const randomIdx = Math.floor(Math.random() * possibleMoves.length);
            const move = possibleMoves[randomIdx];
            game.move(move);
            board.position(game.fen());
            recordMove(move, moveCount); 
            moveCount++; 
        }
    };

    
    const recordMove = (move, count) => {
        const formattedMove = count % 2 === 1 ? `${Math.ceil(count / 2)}. ${move}` : `${move} -`;
        moveHistory.textContent += formattedMove + ' ';
        moveHistory.scrollTop = moveHistory.scrollHeight; 
    };

    
    const onDragStart = (source, piece) => {
        
        return !game.game_over() && piece.search(userColor) === 0;
    };

    
    const onDrop = (source, target) => {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q',
        });

        if (move === null) return 'snapback';

        window.setTimeout(makeRandomMove, 250);
        recordMove(move.san, moveCount); 
        moveCount++;
    };

    
    const onSnapEnd = () => {
        board.position(game.fen());
    };

    
    const boardConfig = {
        showNotation: true,
        draggable: true,
        position: 'start',
        onDragStart,
        onDrop,
        onSnapEnd,
        moveSpeed: 'fast',
        snapBackSpeed: 500,
        snapSpeed: 100,
    };

    
    board = Chessboard('board', boardConfig);

    // Event listener for the "Play Again" button
    document.querySelector('.play-again').addEventListener('click', () => {
        game.reset();
        board.start();
        moveHistory.textContent = '';
        moveCount = 1;
        userColor = 'w';
    });

    // Event listener for the "Set Position" button
    document.querySelector('.set-pos').addEventListener('click', () => {
        const fen = prompt("Enter the FEN notation for the desired position!");
        if (fen !== null) {
            if (game.load(fen)) {
                board.position(fen);
                moveHistory.textContent = '';
                moveCount = 1;
                userColor = 'w';
            } else {
                alert("Invalid FEN notation. Please try again.");
            }
        }
    });

    // Event listener for the "Flip Board" button
    document.querySelector('.flip-board').addEventListener('click', () => {
        board.flip();
        makeRandomMove();
        // Toggle user's color after flipping the board
        userColor = userColor === 'w' ? 'b' : 'w';
    });

});