import { cookies } from "next/headers";

export async function GET() {
  try {

    const cookiesStorage = await cookies();
    cookiesStorage.delete("go-barber-token");

    return Response.json({ message: "Ok" }, { status: 200 });

  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}
