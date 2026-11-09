import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const downloadProjectFile=createAsyncThunk(
  "downloadProjectFile",async({projectId,fileId},thunkAPI)=>{
    try {
      const res=await axiosInstance.get(
        `/projects/${projectId}/files/${fieldId}/download`,
        {responseType:"blob"}
      );
      return {blob:res.data,projectId,fileId};
    } catch (error) {
      // toast.error(error.response.data.message||"Failed to download File");
      // return thunkAPI.rejectWithValue(error.response.data.message);

      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Download failed"
      );
    }
  }
)

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    selected: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default projectSlice.reducer;
