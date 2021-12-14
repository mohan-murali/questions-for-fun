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
    const result = await axios.post(
      `${process.env.SERVER_URL}/test`,
      { questions: req.body },
      {
        headers: {
          "content-type": "application/json",
          "x-auth-token": (req.headers["x-auth-token"] || "") as string,
        },
      }
    );
    if (result.status === 200) {
      return res.status(200).json(result.data);
    }
    console.log(result.data);
  } catch (ex: any) {
    console.log(ex.message);
  }
}
