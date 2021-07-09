import React, {useState} from "react";
import Clear from './icon/clear.png';
import Done from './icon/done.png';
import MoveSoundFile from './sound/move.mp3';
import WinnerSoundFile from './sound/winner.mp3';
import WrongMoveFile from './sound/wrongMove.mp3';

const Game = () => {
    // Game is functional component to save data we need useSate , it provide value , and to set the value
    const [board, markPositionOnBoard] = useState([[],[],[]]); // 2D array : it has array which has array type array,

    // a array which has 3 elements(first array represents the horizontal way and second array represent the 2nd horizontal array)
    const [player, setPlayer] = useState(0); //by default the 0 player means the first player will work

    const [winner,setWinner] = useState();

    const MoveSound = new Audio(MoveSoundFile);
    const WinnerSound = new Audio(WinnerSoundFile);
    const WrongMoveSound = new Audio(WrongMoveFile);

    // declare handlePress
    const handlePress = (row,column) => {
        // the value of 0 ,0 or other needs to store in board and how to preserve it
        const newBoard = board.slice(); // this will just copy the same array and gives us back with new ref,
        // we'll change it with it's handler(markPositionOnBoard) ,not directly any modification
        // verify first
        if (newBoard[row][column] === undefined){ // that means any user move can work here
            newBoard[row][column] = player //which player is working, first player will work first
             markPositionOnBoard(newBoard); // replace the old board to new board with latest
            if(isGameOvered()){
                WinnerSound.play();
                setWinner(player);
            }else {
                MoveSound.play();
                setPlayer(1 - player);
            }
        }else {
            WrongMoveSound.play();
        }
    };

    const isGameOvered = () => {
        return rowCrossed() || columnCrossed() || diagonalCrossed();
    }
    // logic for if 3 row ,column ,diagonal way it'll check if it's true then it'll be game over
    // ROW
    const rowCrossed = ()=>{
        for(let i = 0; i<3; i++){
            if (board[i][0] === board[i][1] &&
                board[i][1] === board[i][2] &&
                board[i][0] !== undefined
            ) {
                return true;
            }
        }
        return false
    };

    // COLUMN
    const columnCrossed = () => {
        for(let j = 0; j < 3; j++){
            if(
                board[0][j] === board[1][j] &&
                board[1][j] === board[2][j] &&
                board[0][j] !== undefined
            ){
                return true;
            }
        }
        return false;
    };

    //DIAGONAL
    const diagonalCrossed = () => {
        if(
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2] &&
            board[0][0] !== undefined
        ){
            return true;
        }
        if (
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0] &&
            board[0][2] !== undefined
        ){
            return true;
        }
        return false;
    };




    // to show the image we write a function getBoxView,which will return a jsx
    const getBoxView = (row,column) => (
        <>
            {/*it's played from first player then it'll show the img*/}
            {board[row][column] === 0 && <img src={Clear} alt="empty" />}
            {board[row][column] === 1 &&  <img src={Done} alt="empty" />}
        </>
    );

    const handleClear= () => {
        // to clear the page put it to initial
        markPositionOnBoard([[],[],[]]);
        setPlayer(0);
        setWinner(undefined);
    };

    return (
        <div className="container">
            <h1>TIC TAC TOE GAME</h1>
            <div>
                <div className="controls">
                    <button className="clear" onClick={handleClear}>START NEW GAME</button>
                </div>
                <div className="player">
                    {/*it'll change the color if it's true , turny operator*/}
                    <div className={"player1 " + (player === 0 ? 'turn' : 'wait')}>Player 1
                    </div>
                    <div className={"player2 " + (player === 1 ? 'turn': 'wait')}>Player 2
                    </div>
                </div>
                {/* this will show the winner*/}
                {winner !== undefined && (
                    <div className="winner">Player {(winner + 1) } won this game</div>
                )}
                <div className="table_wrapper">
                    <table>
                        <tbody>
                        {/*this represents the first row , and 0 is the first index and 0.1 second and so on */}
                        <tr>
                            <td onClick={()=> handlePress(0,0)}>  {getBoxView(0,0)}</td>
                            {/*to show the image we write a function getBoxView,which will return a jsx*/}

                            <td onClick={()=> handlePress(0,1)}>{getBoxView(0,1)} </td>
                            <td onClick={()=> handlePress(0,2)}> {getBoxView(0,2)}</td>
                        </tr>
                        <tr>
                            {/* 1 means first row , 0 means 2nd column*/}
                            <td onClick={()=> handlePress(1,0)}> {getBoxView(1,0)}</td>
                            <td onClick={()=> handlePress(1,1)}> {getBoxView(1,1)}</td>
                            <td onClick={()=> handlePress(1,2)}> {getBoxView(1,2)}</td>
                        </tr>
                        <tr>
                            <td onClick={()=> handlePress(2,0)}> {getBoxView(2,0)}</td>
                            <td onClick={()=> handlePress(2,1)}> {getBoxView(2,1)}</td>
                            <td onClick={()=> handlePress(2,2)}> {getBoxView(2,2)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Game;