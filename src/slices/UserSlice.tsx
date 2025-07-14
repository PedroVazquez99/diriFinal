import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, addUser, updateUser, deleteUser } from "../services/UserService";
import { IUsuario } from "../models/IUsuario";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    return await getUsers();
});

export const createUser = createAsyncThunk("users/createUser", async (user: any, { dispatch }) => {
    await addUser(user);
    dispatch(fetchUsers());
});

export const editUser = createAsyncThunk("users/editUser", async (user: any, { dispatch }) => {
    await updateUser(user);
    dispatch(fetchUsers());
});

export const removeUser = createAsyncThunk("users/removeUser", async (id: string, { dispatch }) => {
    await deleteUser(id);
    dispatch(fetchUsers());
});

interface UsersState {
    items: IUsuario[];
    loading: boolean;
}
const initialState: UsersState = {
    items: [],
    loading: false,
};


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default usersSlice.reducer;