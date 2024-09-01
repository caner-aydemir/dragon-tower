import { Chip, Input, Autocomplete, AutocompleteItem, Button,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import React, { useContext } from 'react'
import dolarIcon from "../icon/dolarIcon.svg"
import ManualConfig from '../DragonTower/ManualConfig'
import AutoConfig from '../DragonTower/AutoConfig'
import { StateContext } from '../../Provider/context'
import Game from './Game'
import MobileSettings from "../MobileSettings";
import Config from "../Config";


const DragonTower = () => {
    const { demoCoin, selectMode, setSelectMode } = useContext(StateContext)
    return (
        <div className=' w-2/3 flex  xs:w-screen  xs:p-2 flex-col items-center h-full space-y-10 xs:space-y-2 ' >
            <div className='flex gap-x-3 mx-auto text-2xl'>
                <Chip size='lg' color="warning" variant="light" className='font-sans text-xl' endContent={<img src={dolarIcon} alt='Dollar İcon' />}>Demo Coin : {Math.floor(demoCoin)}  </Chip>
            </div>
            <div className={"hidden xs:flex"}>
                <MobileSettings />
            </div>
            <div className='w-full flex border-4 rounded-r-3xl xs:border-none border-gray-600 h-full   '>
                <Config/>
                <div className=' flex h-full flex-col  justify-center w-3/4 xs:w-full'>
                    <Game />
                </div>
            </div>
        </div>
    )
}

export default DragonTower