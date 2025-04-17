import { DonorModel } from '@/shared/models';

import { API_URL } from '../api-client/api-client.http';

type GetDonorByIdHttpRequest = {
  id: number;
};

type GetDonorByIdHttpResponse = DonorModel | null;

export async function getDonorByIdHttp({
  id,
}: GetDonorByIdHttpRequest): Promise<GetDonorByIdHttpResponse> {
  const response = await fetch(`${API_URL}/donors/${id}`);

  if (!response.ok) {
    return null;
  }

  const donor: DonorModel = await response.json();

  return donor;
}
