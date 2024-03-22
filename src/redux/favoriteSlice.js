import {createSlice} from '@reduxjs/toolkit'

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: [],
    reducers: {
        addToFavorites(state, action) {
            state.push(action.payload)
        },
        removeFromFavorites(state, action) {
            const temps = state.filter(item => item.id !== action.payload);
            return temps
        }
    }
})

export default favoriteSlice.reducer
export const {addToFavorites, removeFromFavorites} = favoriteSlice.actions
export const selectFavorites = state.favorites
