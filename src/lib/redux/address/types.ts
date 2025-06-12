// types.ts
export interface Province {
    id: string;
    provinceName: string;
  }
  
  export interface City {
    id: string;
    cityName: string;
    provinceId: string;
  }
  
  export interface District {
    id: string;
    districtName: string;
    cityId: string;
  }
  
  export interface Village {
    id: string;
    villageName: string;
    districtId: string;
  }
   