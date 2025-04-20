import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

function ComboBoxSearch() {

    const filterColors = inputValue => {
        return colourOptions.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(filterColors(inputValue));
            }, 1000);
        });

    // Custom component to remove the indicator separator
    const NoDropdownIndicator = () => null;
    const NoIndicatorSeparator = () => null;

    const colourOptions = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
    ];

    return (
        <div className='h-[25px] w-48'>
            <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={promiseOptions}
                components={{ DropdownIndicator: NoDropdownIndicator, IndicatorSeparator: NoIndicatorSeparator }}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        border: 'none',
                        outline: 'none',
                        boxShadow: state.isFocused ? null : null,
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? '#00B8D9' : state.isFocused ? '#E5E7EB' : 'white',
                        color: state.isSelected ? 'white' : state.isFocused ? 'black' : 'black', // Change text color here
                    }),
                }}
                placeholder="Search Events"
                className=''
                isClearable= {true}
            />

        </div>
    );
}

export default ComboBoxSearch;
