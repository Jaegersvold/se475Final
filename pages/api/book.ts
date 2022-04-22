import type { NextApiRequest, NextApiResponse } from "next";
import { Book, BookResponse } from "../../common/types";
import { Client } from "pg";
import { credentials } from "../../common/creds";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookResponse>
) {
  const client = new Client(credentials);
  await client.connect();

  const data = await client.query(`
      select * from public.books
  `);

  const rows: Book[] = data.rows;

  console.log(data);

  res.status(200).json({ data: rows });
}
