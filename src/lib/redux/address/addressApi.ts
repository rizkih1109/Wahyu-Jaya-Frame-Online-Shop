import { api } from "@/lib/api";

export const getProvinces = () => api.get("provinces");

export const getCities = (provinceId: string) =>
  api.get("cities", {
    params: { provinceId },
  });

export const getDistricts = (cityId: string) =>
  api.get("districts", {
    params: { cityId },
  });

export const getVillages = (districtId: string) =>
  api.get("villages", {
    params: { districtId },
  });
