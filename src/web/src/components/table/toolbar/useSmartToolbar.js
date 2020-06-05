import React, { useState } from 'react'

const useSmartToolbar = () => {
    const [searchString, setSearchString] = useState('');
    
    const handleChangeSearchString = event => {
        setSearchString(event.target.value ? event.target.value : '')
    }
    
    return {
        searchString,
        setSearchString,
        handleChangeSearchString,
    }
};

export default useSmartToolbar