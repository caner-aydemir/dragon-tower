import React, { useContext, useState } from 'react'
import { Input } from '@nextui-org/react'
import { StateContext } from "../../Provider/context";
import Settings from "../Settings/Settings";

const AutoConfig = () => {
    const { setNumberOfBets, numberOfBets, numberOfBetsError, isStart } = useContext(StateContext)
    return (
        <div className='flex flex-col w-full gap-y-5 '>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap ">
                <p>Number of Bets</p>
                <Input
                    type="number"
                    isReadOnly={isStart}
                    isInvalid={numberOfBetsError}
                    errorMessage="Please enter a value greater than 1"
                    onChange={(e) => setNumberOfBets(Number(e.target.value))}
                    placeholder="0"
                    variant='flat'
                    className='font-sans'
                />
            </div>
            <Settings />
        </div>
    )
}
export default AutoConfig