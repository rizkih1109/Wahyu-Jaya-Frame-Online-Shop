// import {
//     clearCity,
//     clearDistrict,
//   clearVillage,
//   loadCityAsync,
//   loadDistrictAsync,
//   loadProvinceAsync,
//   loadVillageAsync,
// } from "@/lib/redux/address/addressSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
// import { RootState } from "@/lib/redux/store";
// import { useEffect, useState } from "react";

// type LocationProps = {
//   provinceId: string;
//   cityId: string;
//   districtId: string;
//   villageId: string;
// };

// export default function Location({
//   provinceId,
//   cityId,
//   districtId,
//   villageId,
// }: LocationProps) {
//   const [location, setLocation] = useState({
//     provinceId: provinceId || "",
//     cityId: cityId || "",
//     districtId: districtId || "",
//     villageId: villageId || "",
//   });
//   const dispatch = useAppDispatch();
//   const address = useAppSelector((state: RootState) => state.address.value);

//   useEffect(() => {
//     dispatch(loadProvinceAsync());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!location.provinceId) return;
//     dispatch(loadCityAsync(location.provinceId));
//   }, [dispatch, location.provinceId]);

//   useEffect(() => {
//     if (!location.cityId) return;
//     dispatch(loadDistrictAsync(location.cityId));
//   }, [dispatch, location.cityId]);

//   useEffect(() => {
//     if (!location.districtId) return;
//     dispatch(loadVillageAsync(location.districtId));
//   }, [dispatch, location.districtId]);

//   return (
//     <>
//       <div className="flex flex-row items-center">
//         <label className="basis-1/5">Provinsi</label>
//         <select
//           name="provinceId"
//           className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
//           value={location.provinceId}
//           onChange={(e) => {
//             setLocation({
//               ...location,
//               provinceId: e.target.value,
//               cityId: "",
//               districtId: "",
//               villageId: "",
//             });
//             dispatch(clearCity());
//           }}
//         >
//           <option value="">Pilih Provinsi</option>
//           {address.provinces.map((prov: Province) => (
//             <option key={prov.id} value={prov.id}>
//               {prov.provinceName}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex flex-row items-center">
//         <label className="basis-1/5">Kabupaten/Kota</label>
//         <select
//           name="cityId"
//           className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
//           value={location.cityId}
//           onChange={(e) => {
//             setLocation({
//               ...location,
//               cityId: e.target.value,
//               districtId: "",
//               villageId: "",
//             });
//             dispatch(clearDistrict());
//           }}
//         >
//           <option value="">Pilih Kota</option>
//           {address.cities.map((city: City) => (
//             <option key={city.id} value={city.id}>
//               {city.cityName}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex flex-row items-center">
//         <label className="basis-1/5">Kecamatan</label>
//         <select
//           name="districtId"
//           className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
//           value={location.districtId}
//           onChange={(e) => {
//             setLocation({
//               ...location,
//               districtId: e.target.value,
//               villageId: "",
//             });
//             dispatch(clearVillage());
//           }}
//         >
//           <option value="">Pilih Kecamatan</option>
//           {address.districts.map((district: District) => (
//             <option key={district.id} value={district.id}>
//               {district.districtName}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex flex-row items-center">
//         <label className="basis-1/5">Desa/Kelurahan</label>
//         <select
//           name="villageId"
//           className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
//           value={location.villageId}
//           onChange={(e) =>
//             setLocation({ ...location, villageId: e.target.value })
//           }
//         >
//           <option value="">Pilih Kelurahan</option>
//           {address.villages.map((village: Village) => (
//             <option key={village.id} value={village.id}>
//               {village.villageName}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// }
