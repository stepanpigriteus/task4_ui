import Reac, {useState} from 'react';
import { Formik, Field, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function UserFormAuth() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            let formValue = JSON.stringify(values);
            const response = await fetch('https://testt-1.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formValue
            });
            const data = await response.json();
            switch (data.status) {
                case 3:
                    navigate('/login');
                    setErrorMessage('Your account does not exist or has been deleted.\nPlease register again');
                    break;
                case 1:
                    setErrorMessage('Your account has been blocked.\nPlease register again or wait for the unlock');
                    localStorage.removeItem('jwt_token');
                    localStorage.removeItem('username');
                    break;
                case 0:
                    localStorage.setItem('jwt_token', data.token);
                    localStorage.setItem('username', data.name);
                    localStorage.setItem('id', data.id);
                    navigate('/home');
                    break;
                default: 
                    setErrorMessage('invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setSubmitting(false);
    };
    return (
        <Formik
            initialValues={{ id: 'auth', email: '', password: '' }}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className="form_container">
                    <h5>Please Sign In</h5>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field
                            id="password"
                            type="password"
                            name="password"
                            className="form-control"
                        />
                    </div>
                    <Button type="submit" className="submit_button">
                        Login
                    </Button>
                    {errorMessage && <pre className="formMessage">{errorMessage}</pre>}
                </Form>
            )}
        </Formik>
    );
}
