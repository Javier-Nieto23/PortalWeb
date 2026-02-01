import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Tetris.css';

const Tetris = () => {
    const ROWS = 20;
    const COLS = 10;
    const BLOCK_SIZE = 30;

    // Tetris pieces
    const TETROMINOES = {
        I: { shape: [[1, 1, 1, 1]], color: '#00f0f0' },
        O: { shape: [[1, 1], [1, 1]], color: '#f0f000' },
        T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a000f0' },
        S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00f000' },
        Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#f00000' },
        J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#0000f0' },
        L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f0a000' },
    };

    const [board, setBoard] = useState([]);
    const [currentPiece, setCurrentPiece] = useState(null);
    const [position, setPosition] = useState({ x: 3, y: 0 });
    const [gameActive, setGameActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Initialize empty board
    const initializeBoard = useCallback(() => {
        const newBoard = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
        setPosition({ x: 3, y: 0 });
    }, []);

    // Get random tetromino
    const getRandomPiece = useCallback(() => {
        const pieces = Object.keys(TETROMINOES);
        const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
        return TETROMINOES[randomPiece];
    }, []);

    // Start game
    const startGame = () => {
        initializeBoard();
        const newPiece = getRandomPiece();
        setCurrentPiece(newPiece);
        setGameActive(true);
        setIsPaused(false);
        setGameOver(false);
    };

    // Toggle pause
    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    // Rotate piece 90 degrees clockwise
    const rotatePiece = useCallback((piece) => {
        const rotated = [];
        const rows = piece.shape.length;
        const cols = piece.shape[0].length;

        for (let col = 0; col < cols; col++) {
            const newRow = [];
            for (let row = rows - 1; row >= 0; row--) {
                newRow.push(piece.shape[row][col]);
            }
            rotated.push(newRow);
        }

        return { ...piece, shape: rotated };
    }, []);

    // Restart game during gameplay
    const restartGame = () => {
        setGameActive(false);
        setIsPaused(false);
        setGameOver(false);
        startGame();
    };

    // Check collision
    const checkCollision = useCallback((piece, pos, boardState) => {
        if (!piece) return false;

        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    const newY = pos.y + row;
                    const newX = pos.x + col;

                    if (newX < 0 || newX >= COLS || newY >= ROWS) {
                        return true;
                    }

                    if (newY >= 0 && boardState[newY][newX]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }, []);

    // Place piece on board
    const placePiece = useCallback((piece, pos, boardState) => {
        const newBoard = boardState.map(row => [...row]);

        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    const newY = pos.y + row;
                    const newX = pos.x + col;

                    if (newY >= 0 && newY < ROWS && newX >= 0 && newX < COLS) {
                        newBoard[newY][newX] = piece.color;
                    }
                }
            }
        }
        return newBoard;
    }, []);

    // Clear lines
    const clearLines = useCallback((boardState) => {
        let newBoard = boardState.filter(row => !row.every(cell => cell !== 0));
        const linesCleared = ROWS - newBoard.length;

        // Add empty rows
        for (let i = 0; i < linesCleared; i++) {
            newBoard.unshift(Array(COLS).fill(0));
        }

        return { board: newBoard, linesCleared };
    }, []);

    // Game loop
    useEffect(() => {
        if (!gameActive || !currentPiece || gameOver || isPaused) return;

        const gameLoop = setInterval(() => {
            setPosition(prev => {
                const newPos = { ...prev, y: prev.y + 1 };

                setBoard(prevBoard => {
                    // Check if new position collides
                    if (checkCollision(currentPiece, newPos, prevBoard)) {
                        // Place current piece
                        const boardWithPiece = placePiece(currentPiece, prev, prevBoard);

                        // Clear complete lines
                        const { board: clearedBoard, linesCleared } = clearLines(boardWithPiece);

                        if (linesCleared > 0) {
                            setScore(s => s + linesCleared * 100);
                        }

                        // Spawn new piece
                        const newPiece = getRandomPiece();
                        setCurrentPiece(newPiece);
                        setPosition({ x: 3, y: 0 });

                        // Check game over
                        if (checkCollision(newPiece, { x: 3, y: 0 }, clearedBoard)) {
                            setGameActive(false);
                            setGameOver(true);
                        }

                        return clearedBoard;
                    }

                    return prevBoard;
                });

                return newPos;
            });
        }, 500);

        return () => clearInterval(gameLoop);
    }, [gameActive, currentPiece, checkCollision, placePiece, clearLines, getRandomPiece, gameOver, isPaused]);

    // Keyboard controls
    useEffect(() => {
        if (!gameActive || isPaused) return;

        const handleKeyPress = (e) => {
            // Solo prevenir scroll para las teclas de dirección
            if (['ArrowLeft', 'ArrowRight', 'ArrowDown'].includes(e.key)) {
                e.preventDefault();
            }

            if (e.key === 'ArrowLeft') {
                setPosition(prev => {
                    const newPos = { ...prev, x: prev.x - 1 };
                    if (!checkCollision(currentPiece, newPos, board)) {
                        return newPos;
                    }
                    return prev;
                });
            } else if (e.key === 'ArrowRight') {
                setPosition(prev => {
                    const newPos = { ...prev, x: prev.x + 1 };
                    if (!checkCollision(currentPiece, newPos, board)) {
                        return newPos;
                    }
                    return prev;
                });
            } else if (e.key === 'ArrowDown') {
                setPosition(prev => {
                    const newPos = { ...prev, y: prev.y + 1 };
                    if (!checkCollision(currentPiece, newPos, board)) {
                        return newPos;
                    }
                    return prev;
                });
            } else if (e.key.toLowerCase() === 'z') {
                e.preventDefault();
                const rotatedPiece = rotatePiece(currentPiece);
                if (!checkCollision(rotatedPiece, position, board)) {
                    setCurrentPiece(rotatedPiece);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameActive, currentPiece, board, checkCollision, isPaused, rotatePiece]);
    const renderBoard = () => {
        const display = board.map(row => [...row]);

        // Draw current piece
        if (currentPiece && gameActive) {
            for (let row = 0; row < currentPiece.shape.length; row++) {
                for (let col = 0; col < currentPiece.shape[row].length; col++) {
                    if (currentPiece.shape[row][col]) {
                        const y = position.y + row;
                        const x = position.x + col;
                        if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
                            display[y][x] = currentPiece.color;
                        }
                    }
                }
            }
        }

        return display.map((row, rowIdx) => (
            <div key={rowIdx} className="tetris-row">
                {row.map((cell, colIdx) => (
                    <div
                        key={colIdx}
                        className="tetris-cell"
                        style={{
                            backgroundColor: cell === 0 ? 'rgba(0, 255, 65, 0.1)' : cell,
                            width: BLOCK_SIZE,
                            height: BLOCK_SIZE,
                        }}
                    />
                ))}
            </div>
        ));
    };

    return (
        <div className="tetris-container">
            <div className="tetris-wrapper">
                <h2>Tetris</h2>

                <div className="tetris-content">
                    <div className="tetris-game">
                        <div className="tetris-board">{renderBoard()}</div>
                        <div className="tetris-info">
                            <div className="score-display">
                                <p className="score-label">Puntuación</p>
                                <p className="score-value">{score}</p>
                            </div>
                            {!gameActive && (
                                <button
                                    className="tetris-btn"
                                    onClick={startGame}
                                >
                                    {gameOver ? 'Juega de Nuevo' : 'Presiona para Empezar'}
                                </button>
                            )}
                            {gameActive && (
                                <button
                                    className="tetris-btn tetris-btn-stop"
                                    onClick={togglePause}
                                >
                                    {isPaused ? 'Reanudar' : 'Pausar'}
                                </button>
                            )}
                            {gameActive && (
                                <button
                                    className="tetris-btn tetris-btn-restart"
                                    onClick={restartGame}
                                >
                                    Empezar de Nuevo
                                </button>
                            )}
                            {isPaused && (
                                <p className="paused-text">EN PAUSA</p>
                            )}
                            {gameOver && (
                                <p className="game-over-text">¡GAME OVER!</p>
                            )}
                        </div>
                    </div>

                    <aside className="tetris-instructions" aria-label="Instrucciones Tetris">
                        <h3>Cómo Jugar</h3>
                        <p>Ademas de programador soy un gran fan de los videojuegos, asi que quise implementar
                            este pequeño juego de tetris en React</p>
                        <ul>
                            <li><strong>← →</strong> Mueve las piezas izquierda/derecha</li>
                            <li><strong>↓</strong> Acelera la caída de las piezas</li>
                            <li><strong>Z</strong> Rota las piezas</li>
                            <li>Completa líneas horizontales para eliminarlas y ganar puntos</li>
                            <li>Cada línea completada: 100 puntos</li>
                            <li>El juego termina cuando una pieza no puede entrar en el tablero</li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Tetris;
