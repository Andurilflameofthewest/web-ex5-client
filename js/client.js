window.onload = () => {
    fetchMovies();
}

async function fetchMovies() {
    try {
        const tableData = await fetch("https://web-ex5-server.onrender.com/api/movie", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json());

        console.log(tableData);
        let tableLength = await tableData.length;
        const tableBody = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

        for (let i = 0; i < tableLength; i++) {
            const movieID = document.createElement('td');
            const name = document.createElement('td');
            const director = document.createElement('td');
            const year = document.createElement('td');

            const movie = tableData[i];
            movieID.innerHTML = movie.id;
            name.innerHTML = movie.name;
            director.innerHTML = movie.director;
            year.innerHTML = movie.year;



            const edit = document.createElement('td');
            const editImg = document.createElement('img');
            editImg.src = 'images/Icon-Pencil.svg';
            editImg.alt = 'Edit Icon';
            edit.appendChild(editImg);

            const trash = document.createElement('td');
            const trashImg = document.createElement('img');
            trashImg.src = 'images/Icon-delete.svg';
            trashImg.alt = 'Delete Icon';
            trash.appendChild(trashImg);

            const tableRow = document.createElement('tr');
            tableRow.appendChild(movieID);
            tableRow.appendChild(name);
            tableRow.appendChild(director);
            tableRow.appendChild(year);

            // editImg.onclick = (() => handleDuplicate(tableRow, sim.model_id, userID));
            tableRow.appendChild(edit);

            // trashImg.onclick = (() => handleTrash(tableRow, sim.model_id, userID));
            

            tableRow.appendChild(trash);
            tableBody.appendChild(tableRow);

        }
    } catch (err) { return; }
}

async function getMovie(movie_id){
    
}

async function deleteMovie(){

}