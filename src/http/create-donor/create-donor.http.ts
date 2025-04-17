import { API_URL } from '../api-client/api-client.http';

interface Donor {
  name: string;
  email: string;
  document: string;
  site?: string;
  mobile: string;
}

interface CreateDonorHttpRequest {
  accessToken: string;
  donor: Donor;
}

type CreateDonorHttpResponse = {
  error?: string;
};

export async function createDonorHttp({
  accessToken,
  donor,
}: CreateDonorHttpRequest): Promise<CreateDonorHttpResponse> {
  const url = `${API_URL}/donors`;
  const response = await fetch(url, {
    method: 'POST',
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
