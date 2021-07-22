import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import jobAPI from "../../../services/jobAPI";
import Job from "../../../types/Job";

interface JobState {
  jobList: Job[];
  jobAmount: number | string;
}

const initialState: JobState = {
  jobList: [],
  jobAmount: "Loading...",
};

export const fetchAllJobs = createAsyncThunk(
  "job/fetchAllJobs",
  async (params: object, thunkAPI: any) => {
    const { data } = await jobAPI.getAll(params);
    return data;
  }
);

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllJobs.fulfilled, (state, action) => {
      state.jobAmount = action.payload["job-count"];
      state.jobList = action.payload["jobs"];
    });
  },
});

const { reducer } = jobSlice;

export const jobAmount = (state: RootState) => state.job.jobAmount;
export const jobList = (state: RootState) => state.job.jobList;

export default reducer;
