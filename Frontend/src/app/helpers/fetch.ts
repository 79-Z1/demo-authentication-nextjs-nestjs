export type RequestBody = {
	email: string;
	password: string;
};

export async function authFetch(url: string, payload: RequestBody) {
	const res = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	return res.json();
}