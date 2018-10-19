document.addEventListener('DOMContentLoaded', () => {



  // handleFormSubmit()
  getRatings()
  getMovies()
})


// Use AJAX to get the reports and append them to a table in the DOM
function getRatings() {
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
    console.log(error);
  })
}

// Use AJAX to get the cryptids and append them to a table in the DOM
function getMovies() {
  axios.get('/movies')
  .then((response) => {
    // handle success

    // DOM manipulation, need to create TRs, TDs
    response.data.forEach((movie) => {
      let tbody = document.querySelector('#list-movies tbody')
      let select = document.querySelector('form#create-movie select#movie_id')
      let tr = document.createElement('tr')
      let name = document.createElement('td')
      let option = document.createElement('option')

      name.innerText = movie.name
      bio.innerText = movie.bio
      option.innerText = movie.name
      option.setAttribute('value', movie.id)

      // append IMG, to the TD, append the TDs to the TR, the TR to the TBODY
      tr.appendChild(name)
      tbody.appendChild(tr)
    })

  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
}

// function handleFormSubmit() {
//   let form = document.getElementById('create-report')
//   form.addEventListener('submit', (ev) => {
//     ev.preventDefault()
//
//     // grab all values from the form
//     let postData = {}
//     let formElements = ev.target.elements
//
//     for (var i = 0; i < formElements.length; i++) {
//       let inputName = formElements[i].name
//       if( inputName ) {
//         postData[inputName] = formElements[i].value
//       }
//     }
//
//     console.log('postData', postData);
//
//     // axios.post that data to the correct backend route
//     axios.post('/reports', postData)
//     .then((response) => {
//       console.log(response)
//       getReports()  //call this once again
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//   })
// }