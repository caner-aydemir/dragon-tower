import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../Provider/context';
import GameOverModal from '../Modal/GameOverModal';
import dragon from "../icon/dragon.svg"
import dragonEgg from "../icon/dragonEgg.svg"
import { motion } from 'framer-motion';
import MaxWinModal from "../Modal/MaxWinModal";

const Table = () => {
    const {isStart, gameOver,selectedDifficultly, refreshTable ,selectCol,playAutoMode,
      selected,setTableData,tableData,generateRandomRow,autoMode, setMultiplierChain,maxWinModal} = useContext(StateContext);



    useEffect(() => {
        if (!isStart) {
            const data = Array.from({ length: 9 }, () => generateRandomRow(4, selectedDifficultly));
            setTableData(data);
            setMultiplierChain(1); // Oyun başladığında multiplier zincirini sıfırla
        }
    }, [refreshTable, isStart]);

    useEffect(() => {
        let timer;
        if (autoMode === true && !gameOver ){
            timer = setInterval(() => {
                playAutoMode()
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [selected, autoMode, gameOver]);




    return (
        <div>
            <div className='w-1/2 xs:w-full flex justify-center items-center mx-auto h-full'>
                <div className='w-full flex flex-col p-2 gap-3 border-8 border-gray-700 shadow-2xl'>
                    {tableData.map(({ row, multiplier }, rowIndex) => (
                        <div key={rowIndex} className='w-full flex gap-2'>
                            {row.map((cell, colIndex) => {
                                // Koşullara göre buton rengi belirleniyor
                                let buttonColor = 'bg-gray-700';
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
                                        disabled={!isStart || autoMode}
                                        key={colIndex}
                                        draggable={false}  // Bu satırı ekleyin
                                        onDragStart={(e) => e.preventDefault()}  // Bu satırı ekleyin

                                        onClick={() => selectCol(rowIndex, colIndex, cell, multiplier)}
                                        className={`w-full h-12 xs:h-10 flex 
                                        ${(cell === dragonEgg && selected[rowIndex] === colIndex) && "bg-slate-500 border-2 "}
                                        ${(cell === dragon && selected[rowIndex] === colIndex) && "bg-white border-4 border-red-700 "}
                                        ${buttonColor} rounded-md items-center justify-center ${!isStart && "hover:cursor-not-allowed "}`}
                                    >
                                        <motion.img
                                            src={cell}
                                            alt="cell"
                                            onDragStart={(e) => e.preventDefault()}  // Bu satırı ekleyin
                                            className={`w-24 h-24 xs:w-16 xs:h-16  ${selected[rowIndex] !== colIndex ? '' : 'opacity-0'}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: selected[rowIndex] !== colIndex ? 0 : 1, scale: selected[rowIndex] !== colIndex ? 1 : 0.8 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            {gameOver && <GameOverModal  />}
            {maxWinModal && <MaxWinModal  />}
        </div>
    );
};

export default Table;
