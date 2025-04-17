import { API_URL } from '../api-client/api-client.http';

interface Donor {
  id?: number;
  name: string;
  email: string;
  document: string;
  site?: string;
  mobile: string;
}

interface UpdateDonorHttpRequest {
  accessToken: string;
  donor: Donor;
}

type UpdateDonorHttpResponse = {
  error?: string;
};

export async function updateDonorHttp({
  accessToken,
  donor,
}: UpdateDonorHttpRequest): Promise<UpdateDonorHttpResponse> {
  const url = `${API_URL}/donors/${donor.id}`;

  delete donor.id;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(donor),
  });

  if (!response.ok) {
    return {
      error: response.statusText,
    };
  }

  return response.json();
}
