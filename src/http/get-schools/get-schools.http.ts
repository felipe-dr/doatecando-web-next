import { SchoolModel } from '@/shared/models';

import { API_URL } from '../api-client/api-client.http';

type GetSchoolsHttpResponse = SchoolModel[] | undefined;

export async function getSchools(): Promise<GetSchoolsHttpResponse> {
  const response = await fetch(`${API_URL}/schools`);
  const schools: SchoolModel[] = await response.json();

  return schools;
}
