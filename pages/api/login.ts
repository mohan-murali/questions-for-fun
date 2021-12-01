import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const result = await axios.post(
      `${process.env.SERVER_URL}/login`,
      req.body
    );
    if (result.status === 200) {
      return res.status(200).json(result.data);
    }
    console.log(result.data);
  } catch (ex) {
    console.log(ex);
  }
}
