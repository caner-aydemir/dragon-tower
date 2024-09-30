import React, { useContext, useState } from 'react';
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
    Select,
    SelectItem
} from '@nextui-org/react';
import dolarIcon from '../icon/dolarIcon.svg';
import { StateContext } from '../../Provider/context';

const Settings = () => {
    const {
        demoCoin,
        selectMode,
        setSelectMode,
        selectedDifficultly,
        refreshTable,
        setRefreshTable,
        multiplierChain,
        gameDifficulty,
        setAutoMode,
        autoMode,
        openSettings,
        setOpenSettings,
        setDemoCoin,
        numberOfBets,
        setGameDifficultly,
        numberOfBetsError,
        setNumberOfBetsError,
        setSelectedDifficulty,
        isStart,
        setIsStart,
        betAmount,
        setBetAmount,
        setDifficultly,
        difficultly
    } = useContext(StateContext);

    const [amountError, setAmountError] = useState(false);
    const [difficultlyError, setDifficultlyError] = useState(false);

    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setDifficultlyError(false);
        setRefreshTable(!refreshTable);

    };

    const startAutoMode = () => {
        setIsStart(true);
        setRefreshTable(!refreshTable);
        setDifficultlyError(false);
        setAmountError(false);
        setAutoMode(!autoMode);
        setOpenSettings(!openSettings);
    };

    const startManualMode = () => {
        setIsStart(true);
        setRefreshTable(!refreshTable);
        setDifficultlyError(false);
        setAmountError(false);
        setOpenSettings(!openSettings);
    };

    const play = () => {
        if (betAmount > demoCoin || betAmount <= 1) {
            setAmountError(true);
        } else {
            setAmountError(false);
        }

        if (selectMode === 'Auto' && numberOfBets <= 0) {
            setNumberOfBetsError(true);
        } else {
            setNumberOfBetsError(false);
        }

        if (betAmount <= demoCoin && betAmount > 1 && demoCoin > 0 && selectedDifficultly !== null && !numberOfBetsError) {
            if (selectMode === 'Manual') {
                startManualMode();
            } else if (selectMode === 'Auto') {
                startAutoMode();
            }
        }
    };

    const difficulties = [
        { key: 'easy', label: 'Easy' },
        { key: 'medium', label: 'Medium' },
        { key: 'hard', label: 'Hard' },
        { key: 'expert', label: 'Expert' },
        { key: 'master', label: 'Master' },

    ];

    return (
        <div className='flex flex-col w-full gap-y-5'>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap">
                <p>Bet Amount</p>
                <Input
                    type="number"
                    placeholder="0"
                    variant='flat'
                    isReadOnly={isStart}
                    value={betAmount === 0 ? "" : betAmount}
                    inputMode="numeric"
                    isInvalid={amountError}
                    errorMessage="Please enter a coin greater than 1"
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    labelPlacement="outside"
                    className='font-sans'
                    endContent={<img src={dolarIcon} alt='Dollar Icon' />}
                />
            </div>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap">
                <p>Difficulty</p>
                <Select
                    defaultSelectedKeys={["easy"]}
                    className="max-w-xs"
                    isReadOnly={isStart}
                    color="success"
                >
                    {difficulties.map((difficulty) => (
                        <SelectItem
                            key={difficulty.key}
                            isReadOnly={isStart}
                            onClick={() => handleDifficultyChange(difficulty.label)}
                        >
                            {difficulty.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            {multiplierChain !== 1 && (

                <Input
                    size="md"
                    value="Multiplier"
                    color="success"
                    endContent={parseFloat(multiplierChain?.toFixed(2))}

                />
            )}
            <Button
                color="success"
                size="lg"
                className="text-white font-bold"
                onClick={play}
                isDisabled={isStart}
            >
                {selectMode === 'Manual' ? 'Checkout' : 'Auto Checkout'}
            </Button>
        </div>
    );
};

export default Settings;
