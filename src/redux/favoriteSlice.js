import {createSlice} from '@reduxjs/toolkit'

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: [],
    reducers: {
        addToFavorites(state, action) {
            const {name, id} = action.payload
            state.push({name, id})
        },
        removeFromFavorites(state, action) {
            const temps = state.filter(item => item.id !== action.payload);
            return temps
        }
    }
})

export default favoriteSlice.reducer
export const {addToFavorites, removeFromFavorites} = favoriteSlice.actions
export const selectfavorites = favoriteSlice.selectSlice
