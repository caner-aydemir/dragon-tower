import { Button } from '@nextui-org/react'
import React from 'react'
import AnimatedLogo from '../AnimatedLogo'

const Header = () => {
    return (
        <div className='flex h-auto  w-full border-b border-gray-800  items-center justify-center  p-5'>
            <div className='w-5/6 flex items-center  justify-between '>
                <AnimatedLogo
                    el="h2"
                    text="Dragon Tower"

                    className="text-4xl font-semibold"
                    repeatDelay={2000}
                />
                <div className='space-x-1 text-'>
                    <Button variant='' disableAnimation="true" size="lg" className="bg-none"> Login</Button>
                    <Button size='lg' variant="faded" radius='sm' className='text-white border-none bg-blue-600'>Register</Button>
                </div>
            </div>
        </div>
    )
}

export default Header