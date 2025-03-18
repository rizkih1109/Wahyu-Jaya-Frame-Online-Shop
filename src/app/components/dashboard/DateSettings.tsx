// import { useDispatch } from "@/lib/redux";
// import { loadDashboardAsync } from "@/lib/redux/dashboard/dashboardSlice";
// import { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";

export default function DateSettings({
  // setStrDate,
  // setEndDate,
// }: {
  // setStrDate: Dispatch<SetStateAction<string>>;
  // setEndDate: Dispatch<SetStateAction<string>>;
}) {
  // const dispatch = useDispatch();
  // const [firstDate, setFirstDate] = useState('')
  // const [lastDate, setLastDate] = useState('')

  // const submit = (e: any) => {
  //   e.preventDefault();
  //   setStrDate(firstDate)
  //   setEndDate(lastDate)
  //   dispatch(
  //     loadDashboardAsync({
  //       keyword: "",
  //       endDate: lastDate,
  //       strDate: firstDate,
  //       limit: "3",
  //       page: 1,
  //       sort: "asc",
  //       sortBy: "monthly",
  //     })
  //   );
  // };
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg">
      <form>
        <div className="px-8 py-4">
          <h6 className="font-bold text-orangeMain">Date Settings</h6>
        </div>
        <div className="flex flex-row bg-white gap-8 border-y border-gray-200">
          <div className="grow flex flex-col ml-8 my-4">
            <label htmlFor="firstDate" className="block font-bold">Start Date</label>
            <input
              type="date"
              className="p-2 border border-gray-200 rounded-lg grow"
              id="firstDate"
              // value={firstDate}
              // onChange={(e) => setFirstDate(e.target.value)}
            />
          </div>
          <div className="grow flex flex-col mr-8 my-4">
            <label htmlFor="lastDate" className="block font-bold">End Date</label>
            <input
              type="date"
              className="p-2 border border-gray-200 rounded-lg grow"
              id="lastDate"
              // value={lastDate}
              // onChange={(e) => setLastDate(e.target.value)}
            />
          </div>
        </div>
        <div className="card-footer py-3 px-8">
          <button className="rounded bg-emerald-500 mr-4">
            <span className="bg-emerald-600 block float-left rounded-l p-1">
            <Image className="object-contain size-6" src="/check.png" alt="check" width={40} height={40} />
            </span>
            <span className="inline-block py-1 px-2 text-white">Query</span>
          </button>
          <button className="rounded bg-red-500 mr-5">
            <span className="bg-red-600 block float-left rounded-l p-1 size-8 flex justify-center items-center">
            <Image className="object-contain size-4" src="/reset.png" alt="reset" width={40} height={40} />
            </span>
            <span className="inline-block py-1 px-2 text-white">Reset</span>
          </button>
        </div>
      </form>
    </div>
  );
}
