import fs from "fs";

export const readSQLFile = (fileName: string) => {
  return fs.readFileSync('./sql/'+fileName, "utf8");
};
