import Link from "next/link";
import BranchList from "./BranchList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { setLimit, setPage } from "@/lib/redux/branch/branchSlice";

export default function BranchTable({
  keyword,
  setKeyword,
  sort,
  setSort,
  sortBy,
  setSortBy,
}: FilterProps) {
  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword?.(e.target.value);
    localStorage.setItem("branchSearchKeyword", e.target.value);
    dispatch(setPage(1))
  };

  const dispatch = useAppDispatch()
  const { total, page, limit, pages } = useAppSelector(
    (state: RootState) => state.branch
  );

  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="bg-gray-50 rounded-md border-solid border-gray-100 border overflow-hidden">
      <div className="bg-gray-200 p-4">
        <Link
          href={"/branch/add"}
          className="py-2 px-2 bg-blue-600 border-none rounded-md text-white"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
      <div className="flex flex-row justify-between px-3 my-4">
        <div className="flex flex-row items-center justify-center">
          <span>Show</span>
          <select
            className="border border-solid border-gray-300 rounded-md mx-1 py-1"
            value={limit}
            onChange={(e) => {
              dispatch(setLimit(Number(e.target.value)))
              dispatch(setPage(1))
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>Entries</span>
        </div>
        <div>
          <span>Search: </span>
          <input
            value={keyword}
            onInput={search}
            className="bg-white border border-solid px-2 py-1 rounded-md"
          ></input>
        </div>
      </div>
      <div>
        <BranchList
          keyword={keyword}
          sort={sort}
          setSort={setSort}
          sortBy={sortBy}
          setSortBy={setSortBy}
          page={page}
          limit={limit}
        />
      </div>
      <div className="flex flex-row justify-between items-center mx-4 my-3">
        <span>
          showing {from} to {to} of {total} entries
        </span>
        <div>
          <button
            disabled={page <= 1}
            onClick={() => dispatch(setPage(page - 1))}
            className="py-1 px-2 border-solid border-black border rounded-tl-md rounded-bl-md"
          >
            Previous
          </button>

          {[...Array(pages)].map((_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={i}
                onClick={() => dispatch(setPage(pageNumber))}
                className={`py-1 px-3 border border-black ${
                  page === pageNumber ? "bg-black text-white" : ""
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={page >= pages}
            onClick={() => dispatch(setPage(page + 1))}
            className="py-1 px-2 border-solid border-black border rounded-tr-md rounded-br-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
