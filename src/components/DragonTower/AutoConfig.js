import React from 'react'
import { Autocomplete, AutocompleteItem, Button, Input } from '@nextui-org/react'
import dolarIcon from "../icon/dolarIcon.svg"

const AutoConfig = ({ difficultlyItem }) => {
    return (
        <div className='flex flex-col w-full gap-y-5 '>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap ">
                <p>Bet Amount</p>
                <Input
                    type="number"
                    placeholder="0.00"
                    variant='flat'
                    labelPlacement="outside"
                    className='font-sans'
                    endContent={<img src={dolarIcon} alt='Dollar İcon' />}
                />

            </div>

            <div className="flex flex-col w-full flex-wrap md:flex-nowrap ">
                <p>Difficultly</p>
                <Autocomplete
                    variant="flat"
                    defaultSelectedKey="Easy"
                    className="max-w-xs font-sans"
                    color='default'
                >
                    {difficultlyItem.map((item, index) => (
                        <AutocompleteItem key={index} value={item}>
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
            <Button color="success" size='lg'>
                Checkout
            </Button>
        </div>
    )
}

export default AutoConfig