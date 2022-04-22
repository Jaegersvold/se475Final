import type { NextApiRequest, NextApiResponse } from "next";
import { Movie, MovieResponse } from "../../common/types";
import { Client } from "pg";
import { credentials } from "../../common/creds";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieResponse>
) {
  const client = new Client(credentials);
  await client.connect();

  const data = await client.query(`
      select * from public.movies
  `);

  const rows: Movie[] = data.rows;

  console.log(data);

  res.status(200).json({ data: rows });
}
