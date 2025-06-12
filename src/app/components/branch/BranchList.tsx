"use client";

import {
  loadBranchAsync,
  removeBranchAsync,
} from "@/lib/redux/branch/branchSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import BranchItem from "./BranchItem";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

export default function BranchList({
  keyword,
  sort,
  sortBy,
  page,
  limit,
  setSort,
  setSortBy,
}: FilterProps) {
  const dispatch = useAppDispatch();

  const { value: branch } = useAppSelector((state: RootState) => state.branch);

  
  const [isModal, setIsModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const router = useRouter();

  useEffect(() => {
    dispatch(loadBranchAsync({ keyword, sort, sortBy, page, limit }));
  }, [dispatch, keyword, sort, sortBy, page, limit]);

  const handleDelete = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsModal(true);
  };

  const handleEdit = (branch: Branch) => {
    setSelectedBranch(branch);
    router.push(`/branch/edit/${branch.id}`);
  };

  const confirmDelete = async () => {
    if (!selectedBranch) return;
    await dispatch(removeBranchAsync(selectedBranch.id));
    setIsModal(false);
  };

  const handleSorting = (field: string) => {
    let newSort = "asc";

    if (sortBy === field) newSort = sort === "asc" ? "desc" : "asc";
    else newSort = "asc";

    setSort?.(newSort);
    setSortBy?.(field);
    localStorage.setItem("branchSort", newSort);
    localStorage.setItem("branchSortBy", field);
  };

  const branchList = branch.map((branch) => {
    return (
      <BranchItem
        key={branch.id}
        branch={branch}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    );
  });

  return (
    <>
      <div className="m-3 border-gray-200 border-solid border-2">
        <div
          id="table-header"
          className="flex flex-row p-2 bg-gray-50 border-b-2 border-gray-200 font-bold"
        >
          <div className="basis-1/12 flex gap-2 items-center">
            <p>ID</p>
            <button onClick={() => handleSorting("id")}>
              {sortBy === "id" && sort === "asc" && (
                <FontAwesomeIcon icon={faSortDown} />
              )}
              {sortBy === "id" && sort === "desc" && (
                <FontAwesomeIcon icon={faSortUp} />
              )}
              {sortBy !== "id" && <FontAwesomeIcon icon={faSort} />}
            </button>
          </div>
          <div className="basis-3/12 flex gap-2 items-center">
            <p>Toko Cabang</p>
            <button onClick={() => handleSorting("branchName")}>
              {sortBy === "branchName" && sort === "asc" && (
                <FontAwesomeIcon icon={faSortDown} />
              )}
              {sortBy === "branchName" && sort === "desc" && (
                <FontAwesomeIcon icon={faSortUp} />
              )}
              {sortBy !== "branchName" && <FontAwesomeIcon icon={faSort} />}
            </button>
          </div>
          <div className="basis-4/12">Alamat</div>
          <div className="basis-2/12">Admin</div>
          <div className="basis-2/12">Action</div>
        </div>
        {branchList}
        {isModal && selectedBranch && (
          <Modal
            title="Delete Branch"
            content={`Are you sure to delete ${selectedBranch.branchName}?`}
            onCancel={() => setIsModal(false)}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </>
  );
}
