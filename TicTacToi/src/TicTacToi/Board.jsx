import React, { useState , useEffect } from "react";
import Square from "./Square.jsx";

const Board = () => {
    const [state , setState] = useState(Array(9).fill(null));

    const [isXTurn , setIsXTurn] = useState(true);


    const checkWinner = () => {
        const winnerLogic = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for(let logic  of winnerLogic){
            const [ a , b , c ] = logic;
            if(state[a] !== null && state[a] === state[b] && state[a] === state[c]){
                return state[a];
            }
        }
        return false;
    }

    const isWinner = checkWinner();

    const handleClick = (index) => {
        if(state[index] !== null){
            return;
        }
        const copyState = [...state];
        copyState[index] = isXTurn ? 'X' : 'O';
        setState(copyState);
        setIsXTurn(!isXTurn);
    }

    const again = () => {
        setState(Array(9).fill(null));
        setIsXTurn(true);
        setFirstPlayer(null);
        setSecondPlayer(null);
    }

    const [firstPlayer , setFirstPlayer] = useState(null);
    const [secondPlayer , setSecondPlayer] = useState(null);

    const setNames = () => {
        setFirstPlayer(prompt("Enter First Player Name"));
        setSecondPlayer(prompt("Enter Second Player Name"));
    }

    const resetGame = () => {
        setState(Array(9).fill(null));
        setIsXTurn(true);
        setFirstPlayer(null);
        setSecondPlayer(null);
    }


    return(
        <div className="board-container">
            {isWinner ? (<div className="backNote">
                {isWinner === 'X' ? firstPlayer || 'X' : secondPlayer || 'O'} as {isWinner} Won The Game !<button onClick={again} className="back-btn">Play Again</button>
            </div>) :
            (<>
                <p className="headName">Move {isXTurn ? firstPlayer || 'X' : secondPlayer || 'O' }</p>
                <div className="board-row">
                    <Square onClick={() => handleClick(0)} value={state[0]}/>
                    <Square onClick={() => handleClick(1)} value={state[1]}/>
                    <Square onClick={() => handleClick(2)} value={state[2]}/>
                </div>
                <div className="board-row">
                    <Square onClick={() => handleClick(3)} value={state[3]}/>
                    <Square onClick={() => handleClick(4)} value={state[4]}/>
                    <Square onClick={() => handleClick(5)} value={state[5]}/>
                </div>
                <div className="board-row">
                    <Square onClick={() => handleClick(6)} value={state[6]}/>
                    <Square onClick={() => handleClick(7)} value={state[7]}/>
                    <Square onClick={() => handleClick(8)} value={state[8]}/>
                </div>

                <div className="btns">
                    <button onClick={setNames} className="btn-name">Set Name</button>
                    <button onClick={resetGame} className="reset-btn"><i className="fa-solid fa-rotate-right"></i></button>
                </div>

            </>)}
        </div>
    )
}

export default Board;