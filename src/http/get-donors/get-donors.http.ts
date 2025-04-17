import { DonorModel } from '@/shared/models';

import { API_URL } from '../api-client/api-client.http';

type GetDonorsHttpRequest = {
  page?: number;
  limit?: number;
};

type GetDonorsHttpResponse = DonorModel[];

export async function getDonorsHttp({
  page = 1,
  limit = 10,
}: GetDonorsHttpRequest = {}): Promise<GetDonorsHttpResponse> {
  const response = await fetch(`${API_URL}/donors?page=${page}&limit=${limit}`);

  if (!response.ok) return [];

  const schools: DonorModel[] = await response.json();

  return schools;
}
