import { WebAuth, defaultHeaders, formHeaders, getResponseCookie } from "./http";

export async function authenticate(baseUrl: string, username: string, password: string): Promise<string> {
  const url = new URL('/login', baseUrl);
    
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      ...formHeaders
    },
    redirect: 'manual',
    body: new URLSearchParams({
      'Username': username,
      'Password': password
    }).toString()
  });
    
  if (res.status !== 302) throw Error('Authentication failed.');

  const cookie = getResponseCookie(res);
  return cookie;
}

export async function authenticatedFetch(url: URL, init: RequestInit, auth: WebAuth) {
  const fetchWithCookie = async (cookie: string) => {
    const request = new Request(url, init);
    request.headers.append("Cookie", cookie);
    return await fetch(request);
  };

  if (auth.cookie) {
    const res = await fetchWithCookie(auth.cookie);
    const redirect = res.headers.get('Location');
    if (redirect !== '/login') {
      const cookie = getResponseCookie(res);
      return { res, cookie };
    }
  }

  const cookie = await authenticate(url.origin, auth.username, auth.password);
  const res = await fetchWithCookie(cookie);
  return { res, cookie };
}
