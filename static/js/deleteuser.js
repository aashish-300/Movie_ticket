const deleteUser = document.getElementById('deleteUser');
deleteUser.addEventListener('click', (e) => {
    const id = deleteUser.getAttribute('data-user-id')
    e.preventDefault();

    fetch(`http://localhost:8000/deleteUser${id}`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {console.log("deleted")
    location.reload();});
})