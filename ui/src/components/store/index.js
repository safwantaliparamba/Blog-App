import { configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice'
import search_action from './searchSlice'

const store = configureStore({
    reducer:{
        auth:authSlice,
        search:search_action
    }
})

export default store