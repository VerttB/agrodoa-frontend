import fs from "fs";
import path from "path";

export  async function GET() {
  const filePath = path.join(process.cwd(), "public", "mocks", "causas.json");

  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const causas = JSON.parse(fileContents);

    return new Response(JSON.stringify(causas), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error("Erro ao ler o arquivo de causas:", error);
    return new Response(JSON.stringify({erros: "Could not fetch data"}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
