import { Autocomplete, AutocompleteItem, Button, Input } from '@nextui-org/react'
import React, { useContext, useState } from 'react'
import dolarIcon from "../icon/dolarIcon.svg"
import { StateContext } from '../../Provider/context'


const ManualConfig = ({ difficultlyItem }) => {
    const { demoCoin, selectMode, setSelectMode, isStart, setIsStart, betAmount, setBetAmount, setDifficultly, difficultly } = useContext(StateContext)
    const [amountError, setAmountError] = useState(false)
    const [difficultlyError, setDifficultlyError] = useState(false)


    function startGame() {
        if (betAmount > demoCoin || betAmount <= 0) {
            setAmountError(true)
        }
        if (difficultly === undefined) {
            setDifficultlyError(true)
        }

        if (betAmount < demoCoin && betAmount > 0 && demoCoin > 0 && difficultly !== undefined) {
            setIsStart(true)

            setDifficultlyError(false)
            setAmountError(false)


        }


    }

    return (
        <div className='flex flex-col w-full gap-y-5'>
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

            <div className="flex flex-col w-full flex-wrap md:flex-nowrap ">
                <p>Difficultly</p>
                <Autocomplete
                    defaultItems={difficultlyItem}
                    color='success'
                    defaultSelectedKey={"Easy"}
                    isInvalid={difficultlyError}
                    errorMessage="Please enter the difficulty level"
                    aria-label=''
                    aria-labelledby=''
                    className="max-w-xs text-4xl"
                >
                    {difficultlyItem.map((item, index) => (
                        <AutocompleteItem key={index} value={item} onClick={() => setDifficultly(item)}>
                            {item}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>

            </div>
            <Button color="success" size='lg' onClick={startGame}>
                Checkout
            </Button>
        </div>
    )
}

export default ManualConfig