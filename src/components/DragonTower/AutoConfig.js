import React, {useContext, useState} from 'react'
import {Autocomplete, AutocompleteItem, Button, Input, Select, SelectItem} from '@nextui-org/react'
import dolarIcon from "../icon/dolarIcon.svg"
import {StateContext} from "../../Provider/context";

const AutoConfig = () => {
    const { demoCoin, selectMode, setSelectMode,selectedDifficultly,
        refreshTable , setRefreshTable,setNumberOfBets,
        multiplierChain,gameDifficulty ,
        setAutoMode,
        autoMode,
        setGameDifficultly, setSelectedDifficulty, isStart,
        setIsStart, betAmount, setBetAmount, setDifficultly, difficultly} = useContext(StateContext)
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
    const difficult = [
        {key: "easy", label: "Easy"},
        {key: "medium", label: "Medium"},
        {key: "hard", label: "Hard"},

    ];
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
                <Select
                    defaultSelectedKeys={["easy"]}
                    className="max-w-xs"
                    color={"success"}
                >
                    {difficult.map((diff) => (
                        <SelectItem key={diff.key} onClick={() => handleDifficultyChange(diff.label)}
                        >
                            {diff.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap ">
                <p>Number of Bets</p>
                <Input
                    type="number"
                    onChange={(e)=>setNumberOfBets(e.target.value)}
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