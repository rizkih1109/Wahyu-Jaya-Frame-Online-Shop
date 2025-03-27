// import { useSelector } from "@/lib/redux";
// import { selectReport } from "@/lib/redux/dashboard/dashboardSlice";
import Chart from "react-google-charts";

export default function LineChart() {
  // const report = useSelector(selectReport);
  const data = [
    ["Year", "Earnings"],
    ['Aug 24', 2500000],
    ['Sep 24', 1678000],
    ['Oct 24', 1750000]
    // ...report.map((item) => [item.name, Number(item.earning)]),
  ];
  const options = {
    curveType: "function",
    legend: { position: "bottom" },
    pointSize: 6,
    vAxis: { format: 'Rp ###,###,###.00' },
  };

  // if (report.length === 0)
  //   return (
  //     <div className="alert alert-primary position-absolute top-50 start-50 translate-middle w-100 text-center" role="alert">
  //       There are no transaction on this date
  //     </div>
  //   );

  return (
    <div className="basis-2/3 mt-8 border border-gray-200 rounded-lg shadow-lg flex flex-col">
      <div className="px-8 py-4 border-b">
        <h6 className="font-bold text-orangeMain">Date Settings</h6>
      </div>
      <div className="bg-white p-4 max-w-full">
        <Chart
          chartType="LineChart"
          width="100%"
          height="100%"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}
