// "use client";

// import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
// import { RootState } from "@/lib/redux/store";
// import { loadUserAsync } from "@/lib/redux/user/userSlice";
// import { useEffect } from "react";
// import UserItem from "./UserItem";

// export default function UserList() {
//   const dispatch = useAppDispatch();
//   const { value: users } = useAppSelector((state: RootState) => state.user);

//   useEffect(() => {
//     dispatch(loadUserAsync());
//   }, [dispatch]);

//   const userNode = users.map((user, index) => {
//     return <UserItem key={user.id} no={index + 1} user={user} />;
//   });

//   return (
//     <>
//       <div className="border-solid border-gray-700 rounded-lg p-3">
//         <div
//           id="table-header"
//           className="border-gray-600 border-solid border-b-2 flex flex-row"
//         >
//           <div className="basis-1/4">#</div>
//           <div className="basis-1/4">Title</div>
//           <div className="basis-1/4">Status</div>
//           <div className="basis-1/4">Action</div>
//         </div>
//       </div>
//       {userNode}
//     </>
//   );
// }
