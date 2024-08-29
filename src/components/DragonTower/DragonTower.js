import { Chip, Input, Autocomplete, AutocompleteItem, Button } from '@nextui-org/react'
import React, { useContext } from 'react'
import dolarIcon from "../icon/dolarIcon.svg"
import ManualConfig from '../DragonTower/ManualConfig'
import AutoConfig from '../DragonTower/AutoConfig'
import { StateContext } from '../../Provider/context'
import Game from './Game'


const difficultlyItem = ["Easy", "Medium", "High"]
const DragonTower = () => {
    const mode = ["Manual", "Auto"]
    const { demoCoin, selectMode, setSelectMode } = useContext(StateContext)
    return (
        <div className=' w-2/3 flex  flex-col items-center h-full space-y-10 ' >
            <div className='flex gap-x-3 mx-auto text-2xl'>
                <Chip size='lg' color="warning" variant="light" className='font-sans text-xl' endContent={<img src={dolarIcon} alt='Dollar İcon' />}>Demo Coin : {demoCoin}  </Chip>
            </div>
            <div className='w-full flex border-4 rounded-r-3xl border-gray-600 h-full   '>
                <div className=' w-1/4 h-full bg-gray-600 p-2 flex flex-col gap-y-5'>
                    <div className='bg-gray-900 rounded-full flex justify-between p-2 w-full text-black '>
                        {mode.map((item, index) => (
                            <button onClick={() => setSelectMode(item)} key={index} className={`${item === selectMode && " bg-gray-600"} w-1/2  flex justify-center transition duration-150  py-2 text-white  rounded-full`}>{item}</button>

                        ))}
                    </div>
                    {selectMode === "Manual" ?
                        <ManualConfig difficultlyItem={difficultlyItem} />
                        :
                        <AutoConfig difficultlyItem={difficultlyItem} />

                    }
                </div>
                <div className=' flex h-full flex-col  justify-center w-3/4'>
                    <Game />
                </div>
            </div>
        </div>
    )
}

export default DragonTower