import fs from "fs";
import path from "path";

export default async function Home() {
  const filePath = path.join(process.cwd(), "public", "CD45_pos.csv");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  console.log(fileContents);

  return (
    <div className="bg-white h-full text-black p-8">
      <h1>Scatter Plot</h1>
    </div>
  );
}
