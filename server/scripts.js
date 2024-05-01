

export function handleClick(e, find) {
  e.preventDefault();
  let id = JSON.stringify(getCheckedId());
  let method = e.target.id === 'delete' ? 'DELETE': 'POST';
  fetch(`https://testt-1.onrender.com/${e.target.id}`, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: id
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      if (e.target.id === "block" || e.target.id === 'delete') {
          if (find === true) {
              handleLogout();
          }
      }
  })
  .catch((error) => {
      console.error('Error:', error);
  });
  console.log(find)
}

  function getCheckedId() {
    let userId =[]
    let otherCheckbox = Array.from(document.getElementsByClassName('selected-row'))
    otherCheckbox.forEach(ele => userId.push(ele.id))
    return userId
  }
  
  export const toggleAll = (selected, setSelected, total) => {
    setSelected(selected.length === total ? [] : [...Array(total).keys()]);
  };
  
  export const toggle = (index, selected, setSelected) => {
    setSelected(selected.includes(index) ? selected.filter((rowIndex) => rowIndex !== index) : [...selected, index]);
  };

  export function toggleAllHandler(selectedRows, setSelectedRows, totalRows) {
    return () => toggleAll(selectedRows, setSelectedRows, totalRows);
  }

  export const fetchUserData = (setUserData) => {
    fetch('/home')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => console.error('Ошибка:', error));
  };

export const handleLogout = () => {
  localStorage.clear();
  window.location.reload();
};

export default function findYou(userData, selectedRows) {
  let ide = selectedRows.map(index => userData[index]);
  let localStorageId = localStorage.getItem('id');
  let equal;
  ide.forEach(obj => {obj.id === localStorageId ? equal = true : equal = false;})
  return equal;
}
