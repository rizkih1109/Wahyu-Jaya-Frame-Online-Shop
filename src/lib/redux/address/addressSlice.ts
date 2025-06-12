import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCities, getDistricts, getProvinces, getVillages } from "./addressApi";


interface AddressValue {
  provinces: [];
  cities: [];
  districts: [];
  villages: [];
}

interface AddressState {
  value: AddressValue;
  status: string;
}

const initialState = {
  value: {
    provinces: [],
    cities: [],
    districts: [],
    villages: [],
  },
  status: "idle",
} satisfies AddressState as AddressState;

export const loadProvinceAsync = createAsyncThunk(
  "provinces/load",
  async () => {
    const response = await getProvinces()
    return response.data
  }
);

export const loadCityAsync = createAsyncThunk("cities/load", async(provinceId: string) => {
    const response = await getCities(provinceId)
    return response.data
})

export const loadDistrictAsync = createAsyncThunk("districts/load", async(cityId: string) => {
    const response = await getDistricts(cityId)
    return response.data
})

export const loadVillageAsync = createAsyncThunk("villages/load", async(districtId: string) => {
    const response = await getVillages(districtId)
    return response.data
})

export const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers:{
        clearProvince: (state) => {
            state.value.provinces = []
            state.value.cities = []
            state.value.districts = []
            state.value.villages = []
        },
        clearCity: (state) => {
            state.value.cities = []
            state.value.districts = []
            state.value.villages = []
        },
        clearDistrict: (state) => {
            state.value.districts = []
            state.value.villages = []
        },
        clearVillage: (state) => {
            state.value.villages = []
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadProvinceAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(loadProvinceAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.value.provinces = action.payload
        })
        .addCase(loadProvinceAsync.rejected, (state) => {
            state.status = "error";
            state.value = initialState.value
        })
        .addCase(loadCityAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(loadCityAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.value.cities = action.payload
        })
        .addCase(loadCityAsync.rejected, (state) => {
            state.status = "error";
            state.value = initialState.value
        })
        .addCase(loadDistrictAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(loadDistrictAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.value.districts = action.payload
        })
        .addCase(loadDistrictAsync.rejected, (state) => {
            state.status = "error";
            state.value = initialState.value
        })
        .addCase(loadVillageAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(loadVillageAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.value.villages = action.payload
        })
        .addCase(loadVillageAsync.rejected, (state) => {
            state.status = "error";
            state.value = initialState.value
        })
    }
})

export const {clearProvince, clearCity, clearDistrict, clearVillage} = addressSlice.actions

export default addressSlice.reducer;