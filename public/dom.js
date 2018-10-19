document.addEventListener('DOMContentLoaded', () => {

  // handleFormSubmit()
  getMovies()
  // getCryptids()
})


// Use AJAX to get the reports and append them to a table in the DOM
function getMovies() {
  axios.get('/movies')
  .then((response) => {
    // handle success

    // clear out the reports tbody
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

      title.innerText = response.data.title
      director.innerText = response.data.director
      year.innerText = response.data.year
      myRating.innerText = response.data.rating
      del_button.innerText = "X"
      del_button.setAttribute('data-id', movies.id)
      del_button.addEventListener('click', (ev) => {
        let recordId = ev.target.getAttribute('data-id')

        // DELETE THIS RECORD!
        axios.delete(`/reports/${recordId}`)
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
      tr.appendChild(title)
      tr.appendChild(director)
      tr.appendChild(year)
      tr.appendChild(rating)
      tr.appendChild(del_td)
      tbody.appendChild(tr)
    })

  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
}

// // Use AJAX to get the cryptids and append them to a table in the DOM
// function getCryptids() {
//   axios.get('/cryptids')
//   .then((response) => {
//     // handle success
//     console.log(response);
//
//     // DOM manipulation, need to create TRs, TDs
//     response.data.forEach((cryptid) => {
//       let tbody = document.querySelector('#list-cryptids tbody')
//       let select = document.querySelector('form#create-report select#cryptid_id')
//       let tr = document.createElement('tr')
//       let name = document.createElement('td')
//       let bio = document.createElement('td')
//       let photoTD = document.createElement('td')
//       let photo = document.createElement('img')
//       let option = document.createElement('option')
//
//       name.innerText = cryptid.name
//       bio.innerText = cryptid.bio
//       photo.setAttribute('src', cryptid.photo)
//       option.innerText = cryptid.name
//       option.setAttribute('value', cryptid.id)
//
//       // append IMG, to the TD, append the TDs to the TR, the TR to the TBODY
//       photoTD.appendChild(photo)
//       tr.appendChild(name)
//       tr.appendChild(bio)
//       tr.appendChild(photoTD)
//       tbody.appendChild(tr)
//       select.appendChild(option)
//
//     })
//
//   })
//   .catch((error) => {
//     // handle error
//     console.log(error);
//   })
// }
//
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
