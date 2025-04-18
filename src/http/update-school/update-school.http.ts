import { API_URL } from '../api-client/api-client.http';

interface School {
  id?: number;
  name: string;
  street: string;
  number: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  neighbourhood: string;
  unprivilegedArea: boolean;
  urgency: string;
  quantityOfStudents: number;
  availability: string;
  phone?: string;
  email: string;
  password: string;
}

interface UpdateSchoolHttpRequest {
  accessToken: string;
  school: School;
}

type UpdateSchoolHttpResponse = {
  error?: string;
};

export async function updateSchoolHttp({
  accessToken,
  school,
}: UpdateSchoolHttpRequest): Promise<UpdateSchoolHttpResponse> {
  const url = `${API_URL}/schools/${school.id}`;

  delete school.id;

  const response = await fetch(url, {
    method: 'PUT',
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
