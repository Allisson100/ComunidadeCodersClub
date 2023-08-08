import { createSlice , PayloadAction } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: '@counter',
    initialState: {
        value: 0,
    },
    reducers: {
        incrementCounter: (draft) => {
            draft.value += 1
        },
        randomIncrementCounter: (draft, action: PayloadAction<{value: number}>) => {
            if(draft.value < 99) {
                draft.value += action.payload.value
            }
        },
        decrementCounter: (draft) => {
            if(draft.value ) {
                draft.value -= 1 
            }
        },
        resetCounter: (draft) => {
            draft.value = 0
        }
    }
})

export const {decrementCounter , incrementCounter , resetCounter , randomIncrementCounter} = counterSlice.actions

export const counterReducer = counterSlice.reducer; 