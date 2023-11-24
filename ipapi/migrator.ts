import { config } from "dotenv";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/mysql2";
import mysql2 from "mysql2/promise";

config({ path: ".dev.vars" });

const doMigrate = async () => {
  try {
    const dbConnection = await mysql2.createConnection({
      uri: process.env.DATABASE_URL,
    });
    const dbMigrator = drizzle(dbConnection);

    await migrate(dbMigrator, {
     migrationsFolder: 'drizzle' 
    });
    console.log("migration done");
    process.exit(0);
  } catch (e) {
    console.log("migration error: ", e);
    process.exit(0);
  }
};
doMigrate();
