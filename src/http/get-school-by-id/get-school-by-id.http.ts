import { SchoolModel } from '@/shared/models';

import { API_URL } from '../api-client/api-client.http';

type GetSchoolByIdHttpRequest = {
  id: number;
};

type GetSchoolByIdHttpResponse = SchoolModel | null;

export async function getSchoolByIdHttp({
  id,
}: GetSchoolByIdHttpRequest): Promise<GetSchoolByIdHttpResponse> {
  const response = await fetch(`${API_URL}/schools/${id}`);

  if (!response.ok) {
    return null;
  }

  const donor: SchoolModel = await response.json();

  return donor;
}
