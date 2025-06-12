import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const saltRound = 10;
const secret = "WahyuJayaFrame";

interface DataPayload {
  data: {
    userid: number;
    role: string;
  };
}

export const hashPassword = (password: string) =>
  bcrypt.hashSync(password, saltRound);

export const checkPassword = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash);

export const createAccessToken = (data: { userid: number; role: string }) =>
  jwt.sign(
    {
      data,
    },
    secret,
    { expiresIn: "1h" }
  );

export const createRefreshToken = (data: { userid: number; role: string }) =>
  jwt.sign(
    {
      data,
    },
    secret,
    { expiresIn: "1d" }
  );

export const checkToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload & DataPayload;
    return decoded.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return null;
    }
  }
};