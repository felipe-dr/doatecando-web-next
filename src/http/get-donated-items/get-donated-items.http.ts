import { DonatedItemModel } from '@/shared/models';

import { API_URL } from '../api-client/api-client.http';

type GetDonatedItemsHttpResponse = DonatedItemModel[] | undefined;

export async function getDonatedItemsHttp(): Promise<GetDonatedItemsHttpResponse> {
  const response = await fetch(`${API_URL}/items`);
  const donatedItems: DonatedItemModel[] = await response.json();

  return donatedItems;
}
