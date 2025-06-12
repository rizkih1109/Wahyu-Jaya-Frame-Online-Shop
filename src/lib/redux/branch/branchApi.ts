import { api } from "@/lib/api";
import { BranchPayload } from "./types";

export const load = (keyword: string, sort: string, sortBy: string, page: number, limit: number) => api.get("branchs", {
  params: {keyword, sort, sortBy, page, limit}
});

export const add = (id: number, payload: BranchPayload) =>
  api.post("branchs", { id, ...payload });

export const edit = (id: number, payload: BranchPayload) =>
  api.put(`branchs/${id}`, {
    ...payload,
  });

export const remove = (id: number) => api.delete(`branchs/${id}`);
