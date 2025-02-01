import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        allCompany: [],
        searchCompanyByText: ""
    },
    reducers: {
        setCompany: (state, action) => {
            state.singleCompany = action.payload
        },
        setAllCompany: (state, action) => {
            state.allCompany = action.payload
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload
        }
    }
})
export const { setCompany, setAllCompany, setSearchCompanyByText } = companySlice.actions
export default companySlice.reducer