// import { useSelector } from "@/lib/redux";
// import { selectTotSum } from "@/lib/redux/dashboard/dashboardSlice";
import { RpInd } from "@/service/currency";
import Card from "./Card";

export default function TotalSum() {
  // const totsum = useSelector(selectTotSum)

  return (
    <div className="basis-1/3 mt-8 flex flex-col justify-between">
      <Card bColor="border-green-500" tColor="text-green-500" img="arrow-increase" type="Sales" value={RpInd.format(13578800)}/>
      <Card bColor="border-blue-500" tColor="text-blue-500" img="users" type="Users" value="274"/>
      <Card bColor="border-purple-500" tColor="text-purple-500" img="bag" type="Total Sales" value="245" />
    </div>
  );
}
