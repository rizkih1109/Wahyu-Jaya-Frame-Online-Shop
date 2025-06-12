import path from "path";
import fs from "fs";
import csvParser from "csv-parser";
import { prisma } from "../../src/lib/prisma/prisma";

export async function getVillages() {

  const VillagesPath = path.join(__dirname, "data", "villages.csv");

  const villages: { id: string; villageName: string; districtId: string }[] =
    [];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(VillagesPath)
      .pipe(csvParser(['id', 'districtId', 'villageName']))
      .on("data", (row) => {
        villages.push({
          id: row.id,
          districtId: row.districtId,
          villageName: row.villageName,
        });
      })
      .on("end", resolve)
      .on("error", reject);
  });

  for (const village of villages) {
    const existingVillages = await prisma.village.findUnique({
      where: {
        id: village.id,
      }, 
    });

    if(!existingVillages) {
      await prisma.village.upsert({
        where: {
          id: village.id,
        },
        update:{
          villageName: village.villageName,
          districtId: village.districtId
        },
        create:{
          id: village.id,
          villageName: village.villageName,
          districtId: village.districtId
        }
      })
    }
  }
}
