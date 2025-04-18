import { API_URL } from '../api-client/api-client.http';

interface DeleteSchoolHttpRequest {
  id: number;
  accessToken: string;
}

type DeleteSchoolHttpResponse = {
  statusCode: string;
  error?: string;
};

export async function deleteSchoolHttp({
  id,
  accessToken,
}: DeleteSchoolHttpRequest): Promise<DeleteSchoolHttpResponse> {
  const url = `${API_URL}/schools/${id}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return {
      statusCode: String(response.status),
      error: response.statusText,
    };
  }

  return response.json();
}
