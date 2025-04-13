import { SchoolModel } from '@/shared/models';

import { API_URL } from '../api-client/api-client.http';

type GetSchoolsHttpRequest = {
  page?: number;
  limit?: number;
};

type GetSchoolsHttpResponse = SchoolModel[];

export async function getSchoolsHttp({
  page = 1,
  limit = 10,
}: GetSchoolsHttpRequest = {}): Promise<GetSchoolsHttpResponse> {
  const response = await fetch(
    `${API_URL}/schools?page=${page}&limit=${limit}`,
  );

  if (!response.ok) return [];

  const schools: SchoolModel[] = await response.json();

  return schools;
}
