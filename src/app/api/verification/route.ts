import { router } from "@/src/services/apiRouter";
import { EnumError } from "@/src/utils/enumError";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookiesStorage = await cookies();
    const idToken = cookiesStorage.get("go-barber-token")?.value;
    console.log(idToken)
    const { data, status, statusText } = await router.post(`/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
      idToken
    });

    return Response.json(data, { status, statusText });

  } catch (error) {
    return error instanceof AxiosError
      ? Response.json({ message: EnumError[`${error.response?.data.error.message}`] }, { status: error.status })
      : Response.json(error, { status: 500 })
  }
}
