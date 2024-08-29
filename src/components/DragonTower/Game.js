import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../Provider/context';
import GameOverModal from '../Modal/GameOverModal';

const Table = () => {

    const { selectMode, isStart, gameOver, setGameOver } = useContext(StateContext)
    const GameMode = {
        EASY: 'easy',
        MEDIUM: 'medium',
        HIGH: 'high',
    };

    const generateRandomRow = (columns, mode) => {
        let numYumurtas, numDragons;

        switch (mode) {
            case GameMode.EASY:
                numYumurtas = Math.floor(columns * 0.75);
                numDragons = columns - numYumurtas;
                break;
            case GameMode.MEDIUM:
                numYumurtas = Math.floor(columns / 2);
                numDragons = columns - numYumurtas;
                break;
            case GameMode.HIGH:
                numDragons = Math.floor(columns * 0.75);
                numYumurtas = columns - numDragons;
                break;
            default:
                numYumurtas = Math.floor(columns / 2);
                numDragons = columns - numYumurtas;
        }

        const row = Array.from({ length: columns }, (_, i) => {
            if (i < numYumurtas) return "yumurta";
            return 'dragon';
        });

        return shuffleArray(row);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const rows = 9;
    const columns = 4;
    const [mode, setMode] = useState(GameMode.EASY);
    const [tableData, setTableData] = useState([]);
    const [selected, setSelected] = useState({}); // { rowIndex: colIndex }

    useEffect(() => {
        const data = Array.from({ length: rows }, () => generateRandomRow(columns, mode));
        setTableData(data);
    }, [mode]);

    const selectCol = (rowIndex, colIndex, text) => {
        if (text === "dragon") {
            setGameOver(true);

        }
        if (!isStart)
            return
        if (rowIndex !== 8 && selected[rowIndex + 1] === undefined)
            return
        if (selected[rowIndex])
            return
        setSelected(prev => ({
            ...prev,
            [rowIndex]: colIndex
        }));
        console.log(selected)

    };

    return (
        <div>
            <div className='w-1/2 flex justify-center items-center mx-auto h-full'>
                <div className='w-full flex flex-col p-2 gap-3 border-8 border-gray-700 shadow-2xl'>
                    {tableData.map((row, rowIndex) => (
                        <div key={rowIndex} className='w-full flex gap-2'>
                            {row.map((cell, colIndex) => {
                                // Koşullara göre buton rengi belirleniyor
                                let buttonColor = 'bg-gray-700';
                                let cursor = ""
                                if (isStart) {
                                    if (rowIndex === 8 && selected[rowIndex] === undefined) {
                                        buttonColor = 'bg-green-500';
                                    } else if (selected[rowIndex] !== undefined) {
                                        buttonColor = 'bg-gray-700';
                                    } else if (selected[rowIndex + 1] !== undefined) {
                                        buttonColor = 'bg-green-500';
                                    }
                                }

                                return (
                                    <button
                                        key={colIndex}
                                        onClick={() => selectCol(rowIndex, colIndex, cell)}
                                        className={`w-full h-12 flex ${buttonColor} rounded-md items-center justify-center ${!isStart && "hover:cursor-not-allowed"}`}
                                    >
                                        <span className={`${selected[rowIndex] !== colIndex && 'hidden'}`}>{cell}</span>
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            {gameOver && <GameOverModal selected={selected} setSelected={setSelected} />}

        </div>
    );
};

export default Table;