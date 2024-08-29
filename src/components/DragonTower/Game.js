import React, { useState } from 'react';

// Modları belirtmek için bir enum
const GameMode = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HIGH: 'high',
};

// Rastgele bir sayıda "yumurta" ve "dragon" üreten fonksiyon
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

    // Sütunlarda en az bir "yumurta" olmasını sağlamak için
    const row = Array.from({ length: columns }, (_, i) => {
        if (i < numYumurtas) return 'yumurta';
        return 'dragon';
    });

    return shuffleArray(row);
};

// Rastgele bir diziyi karıştıran fonksiyon
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Table = () => {
    const rows = 9;
    const columns = 4;
    const [mode, setMode] = useState(GameMode.EASY);

    const tableData = Array.from({ length: rows }, () => generateRandomRow(columns, mode));

    return (
        <div>
            <div className='w-1/2 flex justify-center items-center mx-auto h-full '>
                <div className=' w-full grid grid-cols-4  p-2    gap-3 border-8 border-gray-700 shadow-2xl'>
                    {tableData.flat().map((cell, index) => (
                        <div
                            key={index}
                            className=' w-auto h-12 flex bg-gray-700 rounded-md items-center justify-center'
                        >
                            {cell}
                        </div>
                    ))}
                </div>
            </div>
            {/*<table className='w-3/4 mx-auto h-full p-5 ' >
                <tbody className='text-center p-5 flex flex-col gap-x-6 gap-y-5 '>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex} className='flex gap-x-6 gap-y-5  space-x-2 space-y-2'>
                            {row.map((cell, cellIndex) => (
                                <td className='border p-5' key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
               <button onClick={() => setMode(GameMode.EASY)}>Easy</button>
            <button onClick={() => setMode(GameMode.MEDIUM)}>Medium</button>
            <button onClick={() => setMode(GameMode.HIGH)}>High</button>
            */

            }

        </div>

    );
};

export default Table;
