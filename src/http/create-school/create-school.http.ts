import { API_URL } from '../api-client/api-client.http';

interface School {
  name: string;
  street: string;
  number: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  neighbourhood: string;
  unprivilegedArea?: boolean;
  urgency: string;
  quantityOfStudents: number;
  availability: string;
  phone?: string;
  email: string;
  password: string;
}

interface CreateSchoolHttpRequest {
  accessToken: string;
  school: School;
}

type CreateSchoolHttpResponse = {
  error?: string;
};

export async function createSchoolHttp({
  accessToken,
  school,
}: CreateSchoolHttpRequest): Promise<CreateSchoolHttpResponse> {
  const url = `${API_URL}/schools`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(school),
  });

  if (!response.ok) {
    return {
      error: response.statusText,
    };
  }

  return response.json();
}
