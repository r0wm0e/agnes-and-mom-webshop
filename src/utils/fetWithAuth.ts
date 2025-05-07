export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token available – User not logged in.');
    }

    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${token}`);

    return fetch(input, {
        ...init,
        headers,
    });
}
