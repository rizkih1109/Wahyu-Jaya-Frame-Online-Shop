import { prisma } from "../../src/lib/prisma/prisma";
import axios from "axios";

export async function getProvinces() {
  const response = await axios.get(
    "https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json"
  );
  const provinces = response.data;

  for (const province of provinces) {
    const existingProvince = await prisma.province.findUnique({
      where: { id: province.id },
    });

    if (!existingProvince) {
      await prisma.province.create({
        data: {
          id: province.id,
          provinceName: province.name,
        },
      });
    }
  }
}
