import { Autocomplete, AutocompleteItem, Button, Input,Select, SelectItem } from '@nextui-org/react'
import React, { useContext, useState } from 'react'
import dolarIcon from "../icon/dolarIcon.svg"
import { StateContext } from '../../Provider/context'


const ManualConfig = () => {
    const { demoCoin, selectMode, setSelectMode,selectedDifficultly,
        refreshTable , setRefreshTable,
        multiplierChain,gameDifficulty ,openSettings,setOpenSettings,setGameDifficultly, setSelectedDifficulty, isStart, setIsStart, betAmount, setBetAmount, setDifficultly, difficultly } = useContext(StateContext)
    const [amountError, setAmountError] = useState(false)
    const [difficultlyError, setDifficultlyError] = useState(false)

    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setDifficultlyError(false);
    };
    function startGame() {
        if (betAmount > demoCoin || betAmount <= 0) {
            setAmountError(true)
        }
        if (selectedDifficultly === null) {
            setDifficultlyError(true)
        }

        if (betAmount <= demoCoin && betAmount > 0 && demoCoin > 0 && selectedDifficultly !== null) {
            setIsStart(true)
            setRefreshTable(!refreshTable)
            setDifficultlyError(false)
            setAmountError(false)
            setOpenSettings(!openSettings)


        }


    }
     const difficult = [
        {key: "easy", label: "Easy"},
        {key: "medium", label: "Medium"},
        {key: "hard", label: "Hard"},

    ];
    return (
        <div className='flex flex-col w-full gap-y-5'>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap ">
                <p>Bet Amount</p>
                <Input
                    type="number"
                    placeholder="0"
                    variant='flat'
                    inputMode={"numeric"}
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
                        <SelectItem key={diff.key}                     onClick={() => handleDifficultyChange(diff.label)}
                        >
                            {diff.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            {multiplierChain !== 1 &&  <Input
                size={"md"}
                value="Multiplier"
                color={"success"}
                endContent={multiplierChain}
            />}
            <Button color="success" size='lg' onClick={startGame} isDisabled={isStart}>
                Checkout
            </Button>
        </div>
    )
}

export default ManualConfig