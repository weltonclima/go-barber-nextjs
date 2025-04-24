import { router } from '@/src/services/apiRouter'
import { EnumError } from '@/src/utils/enumError'
import { AxiosError } from 'axios'
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, status, statusText } = await router.post(`/v1/accounts:sendOobCode?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
      requestType: "PASSWORD_RESET",
      email: body.email,
      clientType: "CLIENT_TYPE_WEB"
    });

    return Response.json(data, { status, statusText });

  } catch (error) {
    return error instanceof AxiosError
      ? Response.json({ message: EnumError[`${error.response?.data.error.message}`] }, { status: error.status })
      : Response.json(error, { status: 500 });
  }
}