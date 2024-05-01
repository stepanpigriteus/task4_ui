export default function authToken() {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        fetch('https://testt-1.onrender.com/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token 
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to verify token');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}