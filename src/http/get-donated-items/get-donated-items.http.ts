import { DonatedItemModel } from '@/shared/models';

import { API_URL } from '../api-client/api-client.http';

type GetDonatedItemsHttpRequest = {
  page?: number;
  limit?: number;
};

type GetDonatedItemsHttpResponse = DonatedItemModel[] | undefined;

export async function getDonatedItemsHttp({
  page = 1,
  limit = 10,
}: GetDonatedItemsHttpRequest = {}): Promise<GetDonatedItemsHttpResponse> {
  const response = await fetch(`${API_URL}/items?page=${page}&limit=${limit}`);
  const donatedItems: DonatedItemModel[] = await response.json();

  return donatedItems;
}
