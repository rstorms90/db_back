document.addEventListener('DOMContentLoaded', () => {


  getMovies()



// Use AJAX to get the movies and append them to a table in the DOM
let editForm = document.getElementById('form')
let poster = document.getElementById('poster')
function getMovies() {
  axios.get('/movies')
  .then((response) => {
    // handle success

    // clear out the tbody
    let tbody = document.querySelector('#list-movies tbody')
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }

    // DOM manipulation, need to create TRs, TDs
    response.data.forEach((movie) => {
      let tr = document.createElement('tr')
      let title = document.createElement('td')
      let director = document.createElement('td')
      let year = document.createElement('td')
      let myRating = document.createElement('td')
      let del_td = document.createElement('td')
      let del_button = document.createElement('button')
      let edit_td = document.createElement('td')
      let edit_button = document.createElement('button')
      let new_button = document.createElement('button')


      title.innerText = movie.title
      director.innerText = movie.director
      year.innerText = movie.year
      year.setAttribute('type', 'number')
      year.setAttribute('min', 1900)
      year.setAttribute('max', 2020)
      myRating.innerText = movie.rating
      del_button.innerText = "Delete"
      edit_button.innerText = "Edit"
      edit_button.setAttribute('data-id', movie.id)
      edit_button.setAttribute('data-src', movie.poster)
      del_button.setAttribute('data-id', movie.id)
      del_button.classList.add('btn')
      del_button.classList.add('btn-danger')
      edit_button.classList.add('btn')
      edit_button.classList.add('btn-info')
      tr.setAttribute('data-id', movie.id)

      //EDIT BUTTON
      edit_button.addEventListener('click', (ev) => {
        let movieId = ev.target.getAttribute('data-id')
        let tableList = document.getElementById('movies')
        let editForm = document.getElementById('form')
        let id = document.getElementById('id')
        let src = ev.target.getAttribute('data-src')
        poster.src = src

        //HIDES EVERYTHING BESIDES MOVIE TO EDIT
        tableList.childNodes.forEach((row) => {
          if (row.getAttribute('data-id') != movie.id){
            row.style.display = `none`
            editForm.hidden = false
            poster.hidden = false
            id.value = movie.id
          }
        })
      })

      //DELETE BUTTON
      del_button.addEventListener('click', (ev) => {
        let movieId = ev.target.getAttribute('data-id')

        // DELETE THIS RECORD!
        axios.delete(`/movies/${movieId}`)
        .then((response) => {
          console.log(response)
          ev.target.parentElement.parentElement.remove()
        })
        .catch((err) => {
          console.log(err)
        })
      })

      // append the TDs to the TR, the TR to the TBODY
      del_td.appendChild(del_button)
      edit_td.appendChild(edit_button)
      tr.appendChild(title)
      tr.appendChild(director)
      tr.appendChild(year)
      tr.appendChild(myRating)
      tr.appendChild(del_td)
      tr.appendChild(edit_td)
      tbody.appendChild(tr)
    })

  })
  .catch((error) => {
    // handle error
    console.log(error)
  })
}


//ADD MOVIE BUTTON
let addMovieButton = document.getElementById('addButton')
addMovieButton.addEventListener('click', (ev) => {
  let createForm = document.getElementById('createForm')
  let moviesTable = document.getElementById('list-movies')
  moviesTable.hidden = true
  editForm.hidden = true
  createForm.hidden = false
})
  //EVENT LISTENER ON CREATE MOVIE
  createForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let postData = {}
    let addedMovie = ev.target.elements

    for (let i = 0; i < addedMovie.length; i++) {
      let inputName = addedMovie[i].name
      if (inputName) {
        postData[inputName] = addedMovie[i].value
      }
    }
    axios.post('/movies', postData)
      .then((response) => {
        console.log(response)
        location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  })



// EDIT SUBMIT BUTTON
  let editSubmit = document.getElementById('edit-movie')
  editSubmit.addEventListener('submit', (ev) => {
    ev.preventDefault()
    poster.hidden = false


    // grab all values from the form
    let postData = {}
    let formElements = ev.target.elements

    for (let i = 1; i < formElements.length; i++) {
      let inputName = formElements[i].name
      if (inputName) {
        postData[inputName] = formElements[i].value
      }
    }

    axios.put(`/movies/${formElements[0].value}`, postData)
    .then((response) => {
      let poster = document.getElementById('poster')
      poster.hidden = true
      editForm.hidden = true
      getMovies()
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  })
})
