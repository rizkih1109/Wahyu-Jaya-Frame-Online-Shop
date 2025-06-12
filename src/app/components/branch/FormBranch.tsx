"use client";

import {
  clearCity,
  clearDistrict,
  clearVillage,
  loadCityAsync,
  loadDistrictAsync,
  loadProvinceAsync,
  loadVillageAsync,
} from "@/lib/redux/address/addressSlice";
import {
  addBranchAsync,
  editBranchAsync,
} from "@/lib/redux/branch/branchSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { faDatabase, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function FormBranch({ data, mode }: FormBranchProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const address = useAppSelector((state: RootState) => state.address.value);

  const [addData, setAddData] = useState({
    branchName: data?.branchName || "",
    storeId: data?.storeId || 0,
    adminId: data?.adminId || 0,
    street: data?.street || "",
    provinceId: data?.provinceId || "",
    cityId: data?.cityId || "",
    districtId: data?.districtId || "",
    villageId: data?.villageId || "",
  });

  useEffect(() => {
    dispatch(loadProvinceAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!addData.provinceId) return;
    dispatch(loadCityAsync(addData.provinceId));
  }, [dispatch, addData.provinceId]);

  useEffect(() => {
    if (!addData.cityId) return;
    dispatch(loadDistrictAsync(addData.cityId));
  }, [dispatch, addData.cityId]);

  useEffect(() => {
    if (!addData.districtId) return;
    dispatch(loadVillageAsync(addData.districtId));
  }, [dispatch, addData.districtId]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = data ? data.id : Date.now();
    if (mode === "add") dispatch(addBranchAsync({ id, payload: addData }));
    else if (mode === "edit") {
      console.log("ini edit");
      dispatch(editBranchAsync({ id, payload: addData }));
    }
    router.push("/branch");
  };

  const field = [
    {type: 'input', label: "Nama Cabang", id: 'branchName', name: "branchName", required: true},
    {type: 'select', label: "Admin", id:'admin', name:'admin'},
    {type: 'select', label:"Toko Pusat", id:'store', name:'store', required: true},
    {type: 'select', label: "Provinsi", id:'province', name:"provinsi"},
    {type: 'select', label: "Kota", id:'city', name:'city'}  
  ]








  // return (
  //   <div>
  //     <div>
  //       <h1 className="text-2xl">Branchs</h1>
  //     </div>
  //     <div className="m-5">
  //       <div className="bg-gray-200 px-4 py-3 text-blue-700 rounded-tl-md rounded-tr-md">
  //         <h1>Form Add</h1>
  //       </div>
  //       <form
  //         onSubmit={submit}
  //         className="border border-solid border-gray-200 bg-white"
  //       >
  //         <div className="p-4 flex flex-col gap-2 ">
  //           <div className="flex flex-row items-center">
  //             <label className="basis-1/5">Nama Cabang</label>
  //             <input
  //               id="branchName"
  //               placeholder="Nama Cabang"
  //               value={addData.branchName}
  //               className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
  //               onChange={(e) =>
  //                 setAddData({ ...addData, branchName: e.target.value })
  //               }
  //             ></input>
  //           </div>

  //           <div className="flex flex-row items-center">
  //             <label className="basis-1/5">Admin</label>
  //             <input
  //               id="admin"
  //               placeholder="Admin"
  //               value={addData.adminId}
  //               className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
  //               onChange={(e) =>
  //                 setAddData({ ...addData, adminId: Number(e.target.value) })
  //               }
  //             ></input>
  //           </div>

  //           <div className="flex flex-row items-center">
  //             <label className="basis-1/5">Toko Pusat</label>
  //             <input
  //               id="store"
  //               placeholder="Toko Pusat"
  //               value={addData.storeId}
  //               className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
  //               onChange={(e) =>
  //                 setAddData({ ...addData, storeId: Number(e.target.value) })
  //               }
  //             ></input>
  //           </div>

  //           <div className="flex flex-row items-center">
  //             <label className="basis-1/5">Provinsi</label>
  //             <select
  //               name="provinceId"
  //               className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
  //               value={addData.provinceId}
  //               onChange={(e) => {
  //                 setAddData({
  //                   ...addData,
  //                   provinceId: e.target.value,
  //                   cityId: "",
  //                   districtId: "",
  //                   villageId: "",
  //                 });
  //                 dispatch(clearCity());
  //               }}
  //             >
  //               <option value="">Pilih Provinsi</option>
  //               {address.provinces.map((prov: Province) => (
  //                 <option key={prov.id} value={prov.id}>
  //                   {prov.provinceName}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>

  //           <div className="flex flex-row items-center">
  //             <label className="basis-1/5">Kabupaten/Kota</label>
  //             <select
  //               name="cityId"
  //               className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
  //               value={addData.cityId}
  //               onChange={(e) => {
  //                 setAddData({
  //                   ...addData,
  //                   cityId: e.target.value,
  //                   districtId: "",
  //                   villageId: "",
  //                 });
  //                 dispatch(clearDistrict());
  //               }}
  //             >
  //               <option value="">Pilih Kota</option>
  //               {address.cities.map((city: City) => (
  //                 <option key={city.id} value={city.id}>
  //                   {city.cityName}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>

  //           <div className="flex flex-row items-center">
  //             <label className="basis-1/5">Kecamatan</label>
  //             <select
  //               name="districtId"
  //               className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
  //               value={addData.districtId}
  //               onChange={(e) => {
  //                 setAddData({
  //                   ...addData,
  //                   districtId: e.target.value,
  //                   villageId: "",
  //                 });
  //                 dispatch(clearVillage());
  //               }}
  //             >
  //               <option value="">Pilih Kecamatan</option>
  //               {address.districts.map((district: District) => (
  //                 <option key={district.id} value={district.id}>
  //                   {district.districtName}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>

  //           <div className="flex flex-row items-center">
  //             <label className="basis-1/5">Desa/Kelurahan</label>
  //             <select
  //               name="villageId"
  //               className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
  //               value={addData.villageId}
  //               onChange={(e) =>
  //                 setAddData({ ...addData, villageId: e.target.value })
  //               }
  //             >
  //               <option value="">Pilih Kelurahan</option>
  //               {address.villages.map((village: Village) => (
  //                 <option key={village.id} value={village.id}>
  //                   {village.villageName}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>

  //           <div className="flex flex-row items-center">
  //             <label className="basis-1/5">Alamat Rinci</label>
  //             <input
  //               id="street"
  //               placeholder="Nama kampung atau jalan"
  //               value={addData.street}
  //               className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
  //               onChange={(e) =>
  //                 setAddData({ ...addData, street: e.target.value })
  //               }
  //             ></input>
  //           </div>
  //         </div>

  //         <div className="flex flex-row gap-3 bg-gray-200 p-4">
  //           <div className="inline-flex shadow-md">
  //             <div className="bg-green-700 text-white px-2 py-1 rounded-l-md flex items-center">
  //               <FontAwesomeIcon icon={faDatabase} />
  //             </div>
  //             <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-r-md transition">
  //               Save
  //             </button>
  //           </div>
  //           <div className="inline-flex shadow-sm">
  //             <div className="bg-red-700 text-white px-2 py-1 rounded-l-md flex items-center">
  //               <FontAwesomeIcon icon={faRotateLeft} />
  //             </div>
  //             <Link
  //               className="bg-red-500 px-4 py-1 hover:bg-red-600 text-white rounded-r-md transition"
  //               href={"/branch"}
  //             >
  //               Back
  //             </Link>
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
}


