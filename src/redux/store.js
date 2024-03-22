import {configureStore} from '@reduxjs/toolkit'
import favoritesReducer from './favoriteSlice'

const store = configureStore({
    reducer: {
        favorites: favoritesReducer
    }
})

console.log(store.getState())

export default store