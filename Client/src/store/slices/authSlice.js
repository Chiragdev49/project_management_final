import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

//thunkaapi baatata hai ki state kya hai aur data login page se aata hai
export const login =createAsyncThunk("login",async(data,thunkAPI)=>{
  try {
    const res=await axiosInstance.post("/auth/login",data,{
      headers:{"Content-Type":"application/json"},
    });
    // console.log("API response:", res.data); // ✅ now it will print
    toast.success(res.data.message);
    return res.data.user; // ✅ THIS LINE FIXES EVERYTHING
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
export const forgotPassword =createAsyncThunk("auth/password/forgot",async(email,thunkAPI)=>{
  try {
    const res=await axiosInstance.post("/auth/password/forgot",email);
    // console.log("API response:", res.data); // ✅ now it will print
    toast.success(res.data.message);
    return null; // ✅ THIS LINE FIXES EVERYTHING
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
export const resetPassword =createAsyncThunk("auth/password/reset",async({token,password,confirmPassword},thunkAPI)=>{
  try {
    const res=await axiosInstance.put(`/auth/password/reset/${token}`,{
      password,
      confirmPassword,
    });
    // console.log("API response:", res.data); // ✅ now it will print
    toast.success(res.data.message);
    return res.data.user; // ✅ THIS LINE FIXES EVERYTHING
  } catch (error) {
    toast.error(error.response.data.message || "Failed to reset password");
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getUser =createAsyncThunk("auth/me",async(_,thunkAPI)=>{
  try {
    const res=await axiosInstance.get(`/auth/me`);
    // console.log("API response:", res.data); // ✅ now it will print
    return res.data.user; // ✅ THIS LINE FIXES EVERYTHING
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch user");
  }
});

export const logout =createAsyncThunk("auth/logout",async(_,thunkAPI)=>{
  try {
    const res=await axiosInstance.get(`/auth/logout`);
    // console.log("API response:", res.data); // ✅ now it will print
    return null; // ✅ THIS LINE FIXES EVERYTHING
  } catch (error) {
    toast.error(error.response.data.message || "Failed to logout");
    return thunkAPI.rejectWithValue(error.response.data.message || "Failed to logout");
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isRequestingForToken: false,
    isCheckingAuth: true,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending,(state)=>{
      state.isLoggingIn=true;
    }).addCase(login.fulfilled,(state,action)=>{
      state.isLoggingIn=false;
      state.authUser=action.payload;
    }).addCase(login.rejected,(state)=>{
      state.isLoggingIn=false;
    }).addCase(getUser.pending,(state)=>{
      state.isCheckingAuth=true;
      state.authUser=null;
    }).addCase(getUser.fulfilled,(state,action)=>{
      state.isCheckingAuth=false;
      state.authUser=action.payload;
    }).addCase(getUser.rejected,(state)=>{
      state.isCheckingAuth=false;
      state.authUser=null;
    }).addCase(logout.fulfilled,(state,action)=>{
      state.authUser=null;
    }).addCase(logout.rejected,(state)=>{
      state.authUser=state.authUser;
    }).addCase(forgotPassword.pending,(state,action)=>{
      state.isRequestingForToken=true;
    }).addCase(forgotPassword.fulfilled,(state,action)=>{
      state.isRequestingForToken=false;
    }).addCase(forgotPassword.rejected,(state)=>{
      state.isRequestingForToken=false;
    }).addCase(resetPassword.pending,(state,action)=>{
      state.isUpdatingPassword=true;
    }).addCase(resetPassword.fulfilled,(state,action)=>{
      state.isUpdatingPassword=false;
      state.authUser=action.payload;
    }).addCase(resetPassword.rejected,(state)=>{
      state.isUpdatingPassword=false;
    })
  },
});

export default authSlice.reducer;
