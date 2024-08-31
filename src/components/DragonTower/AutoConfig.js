import React, {useContext, useState} from 'react'
import { Autocomplete, AutocompleteItem, Button, Input } from '@nextui-org/react'
import dolarIcon from "../icon/dolarIcon.svg"
import {StateContext} from "../../Provider/context";

const AutoConfig = () => {
    const { demoCoin, selectMode, setSelectMode,selectedDifficultly,
        refreshTable , setRefreshTable,
        multiplierChain,gameDifficulty ,
        setAutoMode,
        autoMode,
        setGameDifficultly, setSelectedDifficulty, isStart, setIsStart, betAmount, setBetAmount, setDifficultly, difficultly } = useContext(StateContext)
    const [amountError, setAmountError] = useState(false)

    const [difficultlyError, setDifficultlyError] = useState(false)
    const handleDifficultyChange = (difficulty) => {
        console.log("difficulty" , difficulty)
        setSelectedDifficulty(difficulty);
        setDifficultlyError(false);
    };
    const toggleAutoMode = () => {
        setAutoMode(!autoMode);
        setIsStart(!isStart)
    };
    return (
        <div className='flex flex-col w-full gap-y-5 '>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap ">
                <p>Bet Amount</p>
                <Input
                    type="number"
                    placeholder="0"
                    variant='flat'
                    isInvalid={amountError}
                    errorMessage="Please enter a coin greater than 1"
                    onChange={(e) => setBetAmount(e.target.value)}
                    labelPlacement="outside"
                    className='font-sans'
                    endContent={<img src={dolarIcon} alt='Dollar İcon' />}
                />

            </div>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap">
                <p>Difficulty</p>
                <Autocomplete
                    isReadOnly={isStart}
                    defaultItems={Object.values(gameDifficulty)}
                    color="success"
                    defaultSelectedKey={gameDifficulty.EASY}
                    isInvalid={difficultlyError}
                    errorMessage="Please enter the difficulty level"
                    aria-label="Select Difficulty"
                    aria-labelledby="difficulty-select"
                    className="max-w-xs text-4xl"
                >
                    {Object.values(gameDifficulty).map((item, index) => (
                        <AutocompleteItem key={index} value={item} onClick={() => handleDifficultyChange(item)}>
                            {item}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
            </div>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap ">
                <p>Number of Bets</p>
                <Input
                    type="number"
                    placeholder="0"
                    variant='flat'
                    className='font-sans'
                />

            </div>
            <Button color="success" size='lg' onClick={toggleAutoMode}>
                Checkout
            </Button>
        </div>
    )
}

export default AutoConfig