const deleteMovie = document.getElementById('deleteMovie');
deleteMovie.addEventListener('click', (e) => {
    const id = deleteMovie.getAttribute('data-movie-id')
    console.log(id)
    console.log('delete')
    e.preventDefault();

    fetch(`http://localhost:8000/deleteMovie${id}`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {console.log("deleted")
    location.reload();
});
})