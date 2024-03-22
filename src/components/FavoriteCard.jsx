import { useDispatch } from "react-redux"
import { removeFromFavorites } from "../redux/favoriteSlice";
import React from 'react';
import { useState } from 'react'
import { NavLink  } from 'react-router-dom';
 /** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useSelector} from 'react-redux'
import { Card, Button } from 'antd'

const image_container = css`
    width: 130px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

const image_style = css`
    width: 100%
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

export default function FavoriteCard(itemss) {
    const {name, photoUrl} = itemss
    const dispatch = useDispatch

    const HandleremoveFromFavorites = () => {
        dispatch(removeFromFavorites(name));
    }

    return (
        <div css={card_style} style={{display: "flex"}}>
            <div css={image_container}>
                <img
                    src = {photoUrl}
                    alt="Item img"
                    css = {image_style}
                />
            </div>
            <div css={{fontsize: '14px'}}>
                <p>Name: {name}</p>
            </div>
            <div>
                <button css={remove_button} onClick={() => HandleremoveFromFavorites(removeFromFavorites(id))}>
                    Remove
                </button>
            </div>
        </div>
    )
}