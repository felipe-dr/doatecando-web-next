interface SignupHttpRequest {
  values: {
    email: string;
    password: string;
  };
}

type SignupHttpResponse = object;

export async function signupHttp({
  values,
}: SignupHttpRequest): Promise<SignupHttpResponse> {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  return response.json();
}
