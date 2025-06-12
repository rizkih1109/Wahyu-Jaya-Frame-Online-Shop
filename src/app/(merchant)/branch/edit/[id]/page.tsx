"use client"

import FormBranch from "@/app/components/branch/FormBranch";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { useParams } from "next/navigation";

export default function Page() {

    const params = useParams()
    const id = Number(params.id)
    const mode = 'edit'

    const {value: branchs} = useAppSelector((state: RootState) => state.branch)
    const selectedBranch = branchs.find(branch => branch.id === id)

    if(!selectedBranch) return <div>loading ....</div>

    return (
        <FormBranch data={selectedBranch} mode={mode} />
    )
}