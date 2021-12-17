import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.headers["x-auth-token"]);
  try {
    const id = req.query.id as string;
    const result = await axios.get(`${process.env.SERVER_URL}/test/${id}`, {
      headers: {
        "x-auth-token": (req.headers["x-auth-token"] || "") as string,
      },
    });
    if (result.status === 200) {
      return res.status(200).json(result.data);
    }
    console.log(result.data);
  } catch (ex: any) {
    console.log(ex.message);
  }
}
