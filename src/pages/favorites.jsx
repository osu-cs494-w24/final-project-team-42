import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { css } from '@emotion/react'

export default function favorates(items) {
    const {name} = items;
    const dispatch = useDispatch();

    const removeFromFavorites = () => {
        dispatch(removeFromFavorites(name));
    }

    const handleaddToFavorites = () => {
        dispatch(addToFavorites(name));
    }


}
