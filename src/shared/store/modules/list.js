import { createSlice } from "@reduxjs/toolkit"

//초기값
const initialState = []
//슬라이스:name, 초기값, reducers - 구성요소
const listSlice = createSlice({
    name : 'list', 
    initialState,
    reducers : {
        addList : (state,action) => {
            return state = action.payload
        }
    }

})
//actions
export const {addList} = listSlice.actions
//reducer
export default listSlice.reducer
