import { router } from '@/src/services/apiRouter'
import { EnumError } from '@/src/utils/enumError'
import { AxiosError } from 'axios'
import { type NextRequest } from 'next/server'
import { jwtDecode, JwtPayload } from "jwt-decode"
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, status, statusText } = await router.post(`/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
      ...body,
      clientType: "CLIENT_TYPE_WEB",
      returnSecureToken: true
    });

    const decode = jwtDecode<JwtPayload & { email_verified: boolean }>(data.idToken);

    const cookiesStorage = await cookies();
    cookiesStorage.set("go-barber-token", data.idToken);

    return Response.json({ ...data, verified: decode.email_verified }, { status, statusText });

  } catch (error) {
    return error instanceof AxiosError
      ? Response.json({ message: EnumError[`${error.response?.data.error.message}`] }, { status: error.status })
      : Response.json(error, { status: 500 });
  }
}