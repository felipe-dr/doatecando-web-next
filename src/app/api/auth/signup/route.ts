import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const API_URL = process.env.NEXT_PUBLIC_DOATECANDO_API;
  const {
    name,
    street,
    number,
    postalCode,
    neighbourhood,
    unprivilegedArea,
    urgency,
    quantityOfStudents,
    availability,
    phone,
    email,
    password,
  } = await request.json();

  try {
    const response = await fetch(`${API_URL}/schools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        street,
        number,
        postalCode,
        neighbourhood,
        unprivilegedArea,
        urgency,
        quantityOfStudents,
        availability,
        phone,
        email,
        password,
      }),
    });

    if (!response.ok) {
      return response;
    }

    const data = await response.json();
    const nextResponse = NextResponse.json({
      ...data,
    });

    return nextResponse;
  } catch (error: unknown) {
    return NextResponse.json({ error });
  }
}
