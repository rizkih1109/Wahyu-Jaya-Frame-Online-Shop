import { useAppDispatch } from "@/lib/redux/hooks";
import { logoutAsync } from "@/lib/redux/user/userSlice";
import { useRouter } from "next/navigation";

export default function DropAvatar() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.clear();
    await dispatch(logoutAsync());
    router.replace("/login");
  };

  return (
    <div className="absolute right-0 mt-48 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      <div className="border-solid border-b-2">
        <button
          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          onClick={() => console.log("Logout clicked")}
        >
          Profile
        </button>
        <button
          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          onClick={() => console.log("Logout clicked")}
        >
          Setting
        </button>
      </div>
      <button
        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
