import { create } from "zustand";
import axios from "axios";


export const useStudentStore = create((set) => ({
  students: [],
  results: [],
  states: [],
  age: [],
  gender: [],
  level: [],
  selectedStudent: null,
  filters: { age: "", state: "", level: "", gender: "" },
  loading: true,
  loadingResult: true,
  error: null,
  resultsError: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("https://test.omniswift.com.ng/api/viewAllData");
      set({ students: data?.data?.students, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch students", loading: false });
    }
  },

  fetchResults: async (id) => {
    set({ loadingResult: true, resultsError: null });
    try {
      const { data } = await axios.post(`https://test.omniswift.com.ng/api/viewResult/${id}`);
      console.log("data", data)

      set({ results: data?.data, loadingResult: false });
    } catch (err) {
      set({ resultsError: "Failed to fetch results", loadingResult: false });
    }
  },

  fetchstates: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("https://test.omniswift.com.ng/api/viewAllStates");
      const name = data?.data?.map((item) => ({ label: item?.name, value: item?.name }));
      set({ states: name, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch states", loading: false });
    }
  },
  fetchLevels: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("https://test.omniswift.com.ng/api/viewAllLevels");
      const level = data?.data?.map((item) => ({ label: item?.level, value: item?.level }));
      set({ levels: level, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch levels", loading: false });
    }
  },
  fetchGender: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("https://test.omniswift.com.ng/api/viewAllGender");

      const gender = data?.data?.map((item) => ({ label: item?.gender, value: item?.gender }));
      set({ gender: gender, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch gender", loading: false });
    }
  },
  fetchAge: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("https://test.omniswift.com.ng/api/viewAllAges");
      const age = data?.data?.map((item) => ({ label: item?.age, value: item?.age }));
      set({ age: age, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch ages", loading: false });
    }
  },

  fetchFilter: async (filterData) => {
    set({ loading: true, resultsError: null });
    try {
      const { data } = await axios.post("https://test.omniswift.com.ng/api/filterData", filterData);
      console.log("data", data)
      set({ students: data?.data?.students, loading: false });

    } catch (err) {
      set({ resultsError: "Failed to fetch results", loading: false });
    }
  },


}));
