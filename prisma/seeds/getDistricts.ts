import axios from "axios";
import { prisma } from "../../src/lib/prisma/prisma";

export async function getDistricts() {
  const cities = await prisma.city.findMany();

  for (const city of cities) {
    const response = await axios.get(
      `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${city.id}.json`
    );
    const districts = response.data;

    for (const district of districts) {
      const existingDistricts = await prisma.district.findUnique({
        where: {
          id: district.id,
        },
      });

      if (!existingDistricts) {
        await prisma.district.create({
          data: {
            id: district.id,
            districtName: district.name,
            cityId: city.id,
          },
        });
      }
    }
  }
}
