export default async function addNewPost(title, body){
    const API_URL = import.meta.env.VITE_API_URL

    const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'title': title,
            'body': body,
        })
    });

    const resBody = await res.json();

    return resBody;
}