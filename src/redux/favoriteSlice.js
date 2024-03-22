import {createSlice} from '@reduxjs/toolkit'

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: [],
    reducers: {
        addToFavorites(state, action) {
            state.push(action.payload)
        }
    }
})

export default favoriteSlice.reducer