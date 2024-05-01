import { Formik, Field, Form } from "formik";
import { Button } from "react-bootstrap";
import { useState, Navigate } from "react";
import { useNavigate } from 'react-router-dom';

export default function UserFormRegister() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
            let formValue = JSON.stringify(values);
            fetch('https://testt-1.onrender.com/register_form', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: formValue
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              console.log('Success:', data);
              navigate('/login');
              setErrorMessage('');
            })
            .catch((error) => {
              console.error('Error:', error.message);
              setErrorMessage('This email is already in use.\nChoose another one or log in under your own name');
            })
            .finally(() => {
              setSubmitting(false);
            });
          }, 400);
      }}
    >
      {() => (
        <Form className="form_container"
          initialValues={{ id: 'auth', email: '', password: '' }}
        >
          <h5> Please register </h5>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field
              id="name"
              type="name"
              name="name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              type="email"
              name="email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              type="password"
              name="password"
              className="form-control"
              required
            />
          </div>
          <Button type="submit" className="submit_button">
            Register
          </Button>
          {errorMessage && <pre className="formMessage">{errorMessage}</pre>}
        </Form>
      )}
    </Formik>
  );
}