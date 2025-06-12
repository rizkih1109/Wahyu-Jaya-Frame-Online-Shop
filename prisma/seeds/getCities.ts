import axios from "axios";
import { prisma } from "../../src/lib/prisma/prisma";

export async function getCities() {
  const provinces = await prisma.province.findMany();

  for (const province of provinces) {
    const response = await axios.get(
      `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${province.id}.json`
    );
    const cities = response.data;

    for (const city of cities) {
      const existingCities = await prisma.city.findUnique({
        where: {
          id: city.id,
        },
      });

      if (!existingCities) {
        await prisma.city.create({
          data: {
            id: city.id,
            cityName: city.name,
            provinceId: province.id,
          },
        });
      }
    }
  }
}
