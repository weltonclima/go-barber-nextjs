import { jwtDecode } from "jwt-decode";

export function tokenValidate(token: string) {
  const decode = jwtDecode(token);
  if (!decode.exp || new Date(decode.exp * 1000) > new Date()) return

  return decode;

}