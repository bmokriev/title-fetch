
document.getElementById('searchBtn').addEventListener('click', search);


function search(e) {
  e.preventDefault()
  let pagesReq = 0;
  const arr = []
  let keyword = document.getElementById('searchField').value;
  
  // Clear page of old results
  document.getElementById('output').innerHTML = ''

  // Get num of pages
  fetch(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${keyword}&page=1`)
    .then(r => r.json())
    .then(res => {
      const apiProm = [];
      pagesReq = res.total_pages;
      console.log(pagesReq);

      // Get all titles
      for (let i = pagesReq; i > 0; i--) {
        apiProm.push(fetch(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${keyword}&page=` + i).then(v => v.json()).then(z => z.data))
      }

      Promise.all(apiProm)
        .then(resp => {
          const processedResponses = []
          resp.map(response => {
            processedResponses.push(response)

          })

          // Create array of results
          processedResponses.forEach(el => {
            el.forEach(e => arr.push(e.Title))
          })
          arr.sort()
          console.log(arr);

          // Output array
          for (let i = 0; i < arr.length; i++) {
            console.log(arr[i])
            let li = document.createElement("li");         
            li.innerText = arr[i]
            document.getElementById('output').appendChild(li); 
          }

        })
    })

}
