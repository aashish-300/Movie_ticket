const category = document.getElementById('deleteCategory');

category.addEventListener('click', (e) => {
    const id = category.getAttribute('data-movie-id')
    e.preventDefault();
    console.log(id);
    console.log('delete')

    fetch(`http://localhost:8000/deleteCategory${id}`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {console.log("deleted")
    location.reload();
});
})