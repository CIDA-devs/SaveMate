import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebaseConfig";

export const fetchGoals = createAsyncThunk("goals/fetchGoals", async () => {
  const db = getFirestore(app);
  const saveMateCollection = collection(db, "SaveMate");
  const goalSnapshot = await getDocs(saveMateCollection);
  const goalList = goalSnapshot.docs.map((doc) => doc.data());
  return goalList;
});

const goalsSlice = createSlice({
  name: "goals",
  initialState: { goals: [], status: "idle", error: null },
  reducers: {
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addGoal } = goalsSlice.actions; // Exporting the addGoal action

export default goalsSlice.reducer;
