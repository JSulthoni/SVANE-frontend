import React from 'react';
import './ErrorExperience.scss'
import { List } from '@mui/material';

const ErrorExperience = () => {
    const getType = () => {
        const type = ['trending', 'featured']
        const index = Math.floor(Math.random() * type.length)

        return type[index]
    }

    return (
        <>
            <List search={getType()} />
        </>
    );
}

export default ErrorExperience;
