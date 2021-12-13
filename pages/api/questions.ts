import axios, { AxiosRequestHeaders } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const result = await axios.post(
      `${process.env.SERVER_URL}/test`,
      req.body,
      {
        headers: req.headers as AxiosRequestHeaders,
      }
    );
    if (result.status === 200) {
      return res.status(200).json(result.data);
    }
    console.log(result.data);
  } catch (ex) {
    console.log(ex);
  }
}
