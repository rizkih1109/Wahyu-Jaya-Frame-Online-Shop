'use client'
// import ChartBox from "@/app/components/dashboard/chart/ChartBox";
import LineChart from "@/app/components/dashboard/chart/LineChart";
import DateSettings from "@/app/components/dashboard/DateSettings";
import TotalSum from "@/app/components/dashboard/totalsum/TotalSum";
// import TableBoxReport from "@/app/components/dashboard/tablereport/TableBoxReport";
// import TotalSum from "@/app/components/dashboard/TotalSum";

export default function Page() {
    return (
        <div className="px-20 py-6">
            <p className="font-bold text-2xl mb-4">Dashboard</p>
            <DateSettings
            // strDate={strDate}
            // setStrDate={setStrDate}
            // endDate={endDate}
            // setEndDate={setEndDate}
            />
            <div className="flex flex-row gap-8">
                <TotalSum />
                <LineChart />
            </div>
            {/* <div className="flex flex-row gap-8">
                <TableBoxReport
                    strDate={strDate} endDate={endDate}
                />
                <ChartBox />
            </div> */}
        </div>
    )
}