import escapeHtml from 'escape-html';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const API_URL = process.env.NEXT_PUBLIC_DOATECANDO_API;
  const {
    name,
    street,
    number,
    postalCode,
    latitude,
    longitude,
    neighbourhood,
    unprivilegedArea,
    urgency,
    quantityOfStudents,
    availability,
    phone,
    email,
    password,
  } = await request.json();

  const sanitizedSignupForm = {
    name: escapeHtml(name),
    street: escapeHtml(street),
    number: escapeHtml(number),
    postalCode: postalCode,
    latitude: latitude,
    longitude: longitude,
    neighbourhood: escapeHtml(neighbourhood),
    unprivilegedArea,
    urgency,
    quantityOfStudents: quantityOfStudents,
    availability,
    phone: phone,
    email: escapeHtml(email),
    password: password,
  };

  try {
    const response = await fetch(`${API_URL}/schools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedSignupForm),
    });

    if (!response.ok) {
      return response;
    }

    revalidatePath('/doacao');

    const data = await response.json();
    const nextResponse = NextResponse.json({
      ...data,
    });

    return nextResponse;
  } catch (error: unknown) {
    return NextResponse.json({ error });
  }
}
