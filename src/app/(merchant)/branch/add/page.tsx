import FormBranch from "@/app/components/branch/FormBranch";

export default function Page() {

    const emptyBranch = {
        id: 0,
        branchName: '',
        storeId: 0,
        adminId: 0,
        street: '',
        provinceId: '',
        cityId: '',
        districtId: '',
        villageId: ''
    }
    const mode = 'add'

    return (
        <FormBranch data={emptyBranch} mode={mode}/>
    )
}