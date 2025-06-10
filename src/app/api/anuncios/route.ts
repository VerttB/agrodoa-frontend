import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export  async function GET(req: Request, res: Response) {
  const filePath = path.join(process.cwd(), "public", "mocks", "anuncios.json");

  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const anuncios = JSON.parse(fileContents);

    return new Response(JSON.stringify(anuncios), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error("Erro ao ler o arquivo de anúncios:", error);
    return new Response(JSON.stringify({erros: "Could not fetch data"}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
