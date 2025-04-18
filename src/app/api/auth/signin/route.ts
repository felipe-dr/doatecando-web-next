import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const API_URL = process.env.DOATECANDO_API;
  const { email, password } = await request.json();

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return response;
    }

    const data = await response.json();
    const nextResponse = NextResponse.json({
      ...data,
    });

    nextResponse.cookies.set('accessToken', data!.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return nextResponse;
  } catch (error: unknown) {
    return NextResponse.json({ error });
  }
}
