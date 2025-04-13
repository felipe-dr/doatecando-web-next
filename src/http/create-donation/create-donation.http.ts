import { API_URL } from '../api-client/api-client.http';

interface Donation {
  name: string;
}

interface CreateDonationHttpRequest {
  accessToken: string;
  donation: Donation;
}

type CreateDonationHttpResponse = {
  error?: string;
};

export async function createDonationHttp({
  accessToken,
  donation,
}: CreateDonationHttpRequest): Promise<CreateDonationHttpResponse> {
  const url = `${API_URL}/items`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(donation),
  });

  if (!response.ok) {
    return {
      error: response.statusText,
    };
  }

  return response.json();
}
