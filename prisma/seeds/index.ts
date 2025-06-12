import { getCities } from "./getCities";
import { getDistricts } from "./getDistricts";
import { getProvinces } from "./getProvinces";
import { getVillages } from "./getVillages";

async function main() {
    await getProvinces();
    await getCities();
    await getDistricts()
    await getVillages()
}

main()