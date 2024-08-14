window.onload = async () => {
    fetchMovies();
    changeImg();
    document.getElementById("Plus").onclick = () => {addMovie()};
}

async function changeImg() {
    while (true) {
        const url = await fetch("https://picsum.photos/250/327",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        document.getElementById("ChangingImage").style.backgroundImage = `url(${url.url})`;
        await new Promise(r => setTimeout(r, 10000));
    }
}

async function fetchMovies() {
    try {
        const tableData = await fetch("https://web-ex5-server.onrender.com/api/movie", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json());

        let tableLength = await tableData.length;
        const tableBody = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

        for (let i = 0; i < tableLength; i++) {

            const name = document.createElement('td');
            const director = document.createElement('td');
            const year = document.createElement('td');

            const movie = tableData[i];

            name.innerHTML = movie.name;
            director.innerHTML = movie.director;
            year.innerHTML = movie.year;

            name.setAttribute("id",`name${movie.id}`);
            director.setAttribute("id",`director${movie.id}`);
            year.setAttribute("id",`year${movie.id}`);


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
            tableRow.setAttribute("id",`row${movie.id}`);
            tableRow.appendChild(name);
            tableRow.appendChild(director);
            tableRow.appendChild(year);

            editImg.onclick =() => {getMovie(movie.id)};
            tableRow.appendChild(edit);

            trashImg.onclick =() => {deleteMovie(movie.id)};
            tableRow.appendChild(trash);
            tableBody.appendChild(tableRow);

        }
    } catch (err) { return; }
}

async function getMovie(movie_id){
    try {
        const movie = await fetch(`https://web-ex5-server.onrender.com/api/movie/${movie_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json());

        document.getElementById("MovieName-input").value = movie.name;
        document.getElementById("MovieDirectorName-input").value = movie.director;
        document.getElementById("MovieReleaseYear-input").value = movie.year;
        document.getElementById("MovieDescription-input").value = movie.description;
        document.getElementById("Plus").style.backgroundImage = "url(../images/Icon-CirclePencil.png)";
        document.getElementById("Plus").onclick = () => {updateMovie(movie_id)};
    }
    catch (err) { return; }

}

async function updateMovie(movie_id) {
    try {
        const input_name = document.getElementById("MovieName-input").value;
        const input_director = document.getElementById("MovieDirectorName-input").value;
        const input_year = document.getElementById("MovieReleaseYear-input").value;
        const input_desc = document.getElementById("MovieDescription-input").value;
        if (!input_name || !input_director || !input_year || !input_desc) {
            return;
        }

        const movie = await fetch("https://web-ex5-server.onrender.com/api/movie/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: movie_id, name: input_name, director: input_director, year: input_year, description: input_desc})
        });
        
        document.getElementById("MovieName-input").value = "";
        document.getElementById("MovieDirectorName-input").value ="";
        document.getElementById("MovieReleaseYear-input").value ="";
        document.getElementById("MovieDescription-input").value = "";
        document.getElementById("Plus").style.backgroundImage = "url(../images/Icon-plus.svg)";

        document.getElementById("name"+movie_id).innerHTML = input_name;
        document.getElementById("director"+movie_id).innerHTML = input_director;
        document.getElementById("year"+movie_id).innerHTML = input_year;

        document.getElementById("Plus").onclick = () => {addMovie()};
    }
    catch (err) { console.log(err); return; }
}

async function addMovie() {
    try {
        const input_name = document.getElementById("MovieName-input").value;
        const input_director = document.getElementById("MovieDirectorName-input").value;
        const input_year = document.getElementById("MovieReleaseYear-input").value;
        const input_desc = document.getElementById("MovieDescription-input").value;
        if (!input_name || !input_director || !input_year || !input_desc) {
            return;
        }

        const movie = await fetch("https://web-ex5-server.onrender.com/api/movie/new", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: input_name, director: input_director, year: input_year, description: input_desc})
        }).then(resp => resp.json());

        document.getElementById("MovieName-input").value = "";
        document.getElementById("MovieDirectorName-input").value ="";
        document.getElementById("MovieReleaseYear-input").value ="";
        document.getElementById("MovieDescription-input").value = "";

        const tableBody = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

        const name = document.createElement('td');
        const director = document.createElement('td');
        const year = document.createElement('td');

        name.innerHTML = input_name;
        director.innerHTML = input_director;
        year.innerHTML = input_year;

        name.setAttribute("id",`name${movie.id}`);
        director.setAttribute("id",`director${movie.id}`);
        year.setAttribute("id",`year${movie.id}`);

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
        tableRow.setAttribute("id",`row${movie.id}`);
        tableRow.appendChild(name);
        tableRow.appendChild(director);
        tableRow.appendChild(year);

        editImg.onclick =() => {getMovie(movie.id)};
        trashImg.onclick =() => {deleteMovie(movie.id)};
        tableRow.appendChild(edit);
        tableRow.appendChild(trash);
        tableBody.appendChild(tableRow);
    }
    catch (err) { console.log(err); return; }
}

async function deleteMovie(movie_id){
    try {
        const movie = await fetch(`https://web-ex5-server.onrender.com/api/movie/${movie_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        document.getElementById("row"+movie_id).remove();
        document.getElementById("MovieName-input").value = "";
        document.getElementById("MovieDirectorName-input").value ="";
        document.getElementById("MovieReleaseYear-input").value ="";
        document.getElementById("MovieDescription-input").value = "";
        document.getElementById("Plus").style.backgroundImage = "url(../images/Icon-plus.svg)";
    }
    catch (err) { return; }
}