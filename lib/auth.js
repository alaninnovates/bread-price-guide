export const validateToken = async (token) => {
    const res = await fetch(`api/authenticate`, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    }).then(res => res.json());
    return res.success;
}

export const getToken = async (username, password) => {
    return await fetch(`api/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    }).then(res => res.json());
}