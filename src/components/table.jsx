import React, { useState,  useEffect} from 'react';
import { Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import TableControls from './table_controls';
import Form from 'react-bootstrap/InputGroup';
import { toggleAll, toggle} from "/server/scripts";
import findYou from '../../server/scripts';

export default function UserTable() {
  const [userData, setUserData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [count, setCount] = useState(0);
  const fetchUserData = () => {
    fetch('https://testt-1.onrender.com/home', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUserData(data);
        } else {
          console.error('Неверный формат данных:', data);
        }
      })
      .catch(error => console.error('Ошибка:', error));
  };

  const handleButtonClick = () => {
    fetchUserData();
    setCount( count => count + 1)     
  };

  useEffect(() => {
    fetchUserData();
    renderUsers();
}, [count]);


  useEffect(() => {
    renderUsers();
}, [userData]);

  const toggleHandler = () => toggleAll(selectedRows, setSelectedRows, userData.length);
 
  let find =  findYou(userData, selectedRows);

  function renderUsers() {
    if (!userData || userData.length === 0) {
      return (
        <tr>
          <td colSpan="5">Loading...</td>
        </tr>
      );
    }
    return userData.map((user, index) => (
      <tr key={user._id} id={user._id} className={selectedRows.includes(index) ? 'selected-row' : ''}>
        <td>
          <Form.Checkbox
            id={user._id}
            onChange={() => toggle(index, selectedRows, setSelectedRows)}
            checked={selectedRows.includes(index)}
          />
        </td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.registration}</td>
        <td>{user.lastActive}</td>
        <td>{user.status}</td>
      </tr>
    ));
  };

  return (
    <Container className='container'>
      <TableControls find = {find} onButtonClick={handleButtonClick} />
      <Table bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Checkbox
                type="checkbox"
                className="form-check-input general"
                onChange={toggleHandler}
                checked={selectedRows.length === userData.length}
              />
            </th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Register</th>
            <th>Last login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {renderUsers()}
        </tbody>
      </Table>
    </Container>
  );
}