import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BranchItem({
  branch,
  onDelete,
  onEdit
}: {
  branch: Branch;
  onDelete: (branch: Branch) => void;
  onEdit: (branch: Branch) => void;
}) {
  const camelText = (text?: string) => {
    if (!text) return "-";
    return text
      .toLowerCase()
      .split(" ")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
  };

  return (
    <div
      id="table-header"
      className="flex-row p-2 bg-white border-b-2 border-gray-200 tracking-wide text-left flex items-center"
    >
      <div className="basis-1/12 hover:underline text-blue-500 font-bold cursor-pointer">
        {branch.id}
      </div>
      <div className="basis-3/12">{branch.branchName}</div>
      <div className="basis-4/12">
        {branch.street}, {camelText(branch.village?.villageName)},
        {camelText(branch.district?.districtName)},{" "}
        {camelText(branch.city?.cityName)},
        {camelText(branch.province?.provinceName)}
      </div>
      <div className="basis-2/12">
        {branch.admin ? branch.admin.userName : "-"}
      </div>
      <div className="basis-2/12 text-white">
        <button className="m-1 h-9 w-9 bg-green-500 rounded-full"
        onClick={() => onEdit(branch)}
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button
          type="submit"
          className="m-1 h-9 w-9 bg-red-500 rounded-full"
          onClick={() => onDelete(branch)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
