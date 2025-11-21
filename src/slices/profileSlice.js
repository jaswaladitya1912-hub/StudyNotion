import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
};
// LocalStorage ka kaam hota hai page reload ke baad bhi user data ko save rakhna ( Redux state nahi rakhta )
// Reload par Redux me dobara data load karna padta hai:



// Isse reload ke baad bhi buttons visible rahenge
// User login state persistent rahegi
const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
    },
});

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;