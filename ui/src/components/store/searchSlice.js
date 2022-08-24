import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name:'search',
    initialState:{
        term:''
    },
    reducers:{
        setSearchTerm : (state,action)=>{
            return {
                term:action.payload.searchTerm
            }
        }
    },
})

export const searchAction = searchSlice.actions
export default searchSlice.reducer