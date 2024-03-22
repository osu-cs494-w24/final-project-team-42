import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
 /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import FavoriteCard from '../components/FavoriteCard'
import { Card, Button } from 'antd'

import { selectfavorites } from '../redux/favoriteSlice'
import { addToFavorites } from '../redux/favoriteSlice'
import {removeFromFavorites} from '../redux/favoriteSlice'

export default function favorites(items) {
    const {name} = items;
    const dispatch = useDispatch();
    const favorites = useSelector(selectfavorites)

    const handleAddToFavorites = (name, id) => {
        dispatch(addToFavorites({name, id}));
    }

    const containerStyle = css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); // Adjust the min width as needed
        gap: 20px;
    `

    const handleRemoveFromFavorites = (name) => {
        dispatch(removeFromFavorites(name));
    }

    const image_container = css`
    width: 150px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    `

    const image_style = css`
        width: 100%;
        height: auto;
    `

    const card_style = css`
        padding: 20px;
        margin: 5px; 
        border-radius: 10px;
        width: 260px;
        border: 1px solid #DDDCE3; 
        background-color: #fff; 
        font-family: 'Gill Sans', sans-serif;
        font-size: 15px;
    `

    const remove_button = css`
        background-color: #6fa8dc;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        margin-left: 5px;
    `

    return (
        <div>
            <h1>Favorites</h1>
            <div css={containerStyle}>
                {favorites.map((item, index) => (
                    <Card key={index} style={{ width: 300, margin: '10px' }}>
                        <div css={image_container}>
                            <img
                                src={item.id}
                                alt="Item img"
                                css={image_style}
                            />
                        </div>
                        <div css={{fontsize: '14px'}}>
                            <p>{item.name}</p>
                        </div>
                        <div>
                            <button css={remove_button} onClick={() => handleRemoveFromFavorites(item.id)}>
                                Remove
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

/*
add this to code to add button

import { selectfavorites } from '../redux/favoriteSlice'
import { addToFavorites } from '../redux/favoriteSlice'
import {useDispatch, useSelector} from 'react-redux'


const dispatch = useDispatch();
  const favorites = useSelector(selectfavorites)

  const handleAddToFavorites = () => {
        dispatch(addToFavorites({name: "test", id: "1"}));
   }

   <button onClick={handleAddToFavorites}>Add to Favorites</button>
*/