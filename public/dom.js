document.addEventListener('DOMContentLoaded', () => {


  getMovies()
})


// Use AJAX to get the reports and append them to a table in the DOM
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
      del_button.setAttribute('data-id', movie.id)
      tr.setAttribute('data-id', movie.id)

      //EDIT BUTTON
      edit_button.addEventListener('click', (ev) => {
        let movieId = ev.target.getAttribute('data-id')
        let tableList = document.getElementById('movies')
        let editForm = document.getElementById('form')

        //HIDES EVERYTHING BESIDES MOVIE TO EDIT
        tableList.childNodes.forEach((row) => {
          if (row.getAttribute('data-id') != movie.id){
            row.style.display = `none`
            editForm.hidden = false
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
  let editForm = document.getElementById('form')
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
function editFormSubmit() {

  let editForm = document.getElementById('edit-movie')

  editForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let movieId = ev.target.getAttribute('data-id')

    // grab all values from the form
    let postData = {}
    let formElements = ev.target.elements

    for (let i = 0; i < formElements.length; i++) {
      let inputName = formElements[i].name
      if (inputName) {
        postData[inputName] = formElements[i].value
      }
    }

    // axios.post that data to the correct backend route
    axios.put(`/movies/${movieId}`, postData)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  })
}
