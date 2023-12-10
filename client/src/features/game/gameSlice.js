import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rounds: [],
    currentRound: 0,
    score: 0,
    results: []
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setRounds: (state, action) => {
            state.rounds = action.payload;
        },
        setCurrentRound: (state, action) => {
            state.currentRound = action.payload;
        },
        nextRound: (state) => {
            state.currentRound = state.currentRound + 1;
        },
        setScore: (state, action) => {
            state.score = action.payload;
        },
        addScore: (state, action) => {
            state.score = state.score + action.payload;
        },
        setResults: (state, action) => {
            state.results = action.payload;
        },
        addResult: (state, action) => {
            state.results = [...state.results, action.payload];
        }
    }
});

export const { setRounds, setCurrentRound, nextRound, setScore, addScore, setResults, addResult } =
    gameSlice.actions;

export default gameSlice.reducer;
