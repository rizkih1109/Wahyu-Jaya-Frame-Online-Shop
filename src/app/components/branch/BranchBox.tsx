"use client";

import { useState } from "react";
import BranchTable from "./BranchTable";

export default function BranchBox() {
  const [keyword, setKeyword] = useState<string>(() => {
    return localStorage.getItem("branchSearchKeyword") || "";
  });

  const [sort, setSort] = useState<string>(() => {
    return localStorage.getItem("branchSort") || "asc";
  });

  const [sortBy, setSortBy] = useState<string>(() => {
    return localStorage.getItem("branchSortBy") || "id";
  });

  return (
    <>
      <div className="mb-5">
        <h1 className="text-2xl">Branchs</h1>
        <p>This is data of Branchs</p>
      </div>
      <BranchTable
        keyword={keyword}
        setKeyword={setKeyword}
        sort={sort}
        setSort={setSort}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </>
  );
}
