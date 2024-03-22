import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { css } from '@emotion/react'

import { selectfavorites } from '../redux/favoriteSlice'
import { addToFavorites } from '../redux/favoriteSlice'

export default function favorites(items) {
    const {name} = items;
    const dispatch = useDispatch();
    const favorites = useSelector(selectfavorites)

    const handleAddToFavorites = () => {
        dispatch(addToFavorites({name: "test", id: "1"}));
    }


    const removeFromFavorites = () => {
        dispatch(removeFromFavorites(name));
    }

    return (
        <div>
            <h1>Favorites</h1>
            <button onClick={handleAddToFavorites}>Add to Favorites</button>
            {favorites.map((item, index) => (
                    <li key={index}>
                        <h3>{item.name}</h3>
                        <h3>{item.id}</h3>
                    </li>
            ))}
        </div>
    )
}
