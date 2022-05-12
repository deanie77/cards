const app = document.getElementById('row')

var request = new XMLHttpRequest()

request.open('GET', 'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json', true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.forEach(post => {
        const card = document.createElement('div')
        card.setAttribute('class', 'col-4 p-card--highlighted')
        card.setAttribute('id', 'card')
        card.style.cssText = "border-top: 5px solid rgba(168, 0, 168, 0.63); border-radius: 5px;display: flex;flex-wrap: wrap;"

        const header = document.createElement('div')
        header.textContent = 'CLOUD AND SERVER'
        header.style.cssText = "flex: 0 1 auto; background-color: white; border-bottom: 1px dashed rgba(150, 150, 150, 0.87);width:100%; margin-bottom:10px;"

        const coverImage = document.createElement('img')
        coverImage.setAttribute('class', 'p-card__image')
        coverImage.style.cssText = "flex: 0 1 auto;"

        const textArea = document.createElement('div')
        textArea.setAttribute('class', 'p-card__inner')
        textArea.style.cssText = "display:flex;flex-flow:column;flex: 1 1 auto;"

        const titleLink = document.createElement('a')
        titleLink.href = post.link

        const postTitle = document.createElement('h4')
        postTitle.style.cssText = "color: rgb(64, 64, 233); font-weight: 400;flex: 1 1 auto;"

        const author = document.createElement('a')
        author.setAttribute('id', 'author')
        author.style.cssText = "color: blue;"

        const postType = document.createElement('h5')
        postType.setAttribute('class', 'u-align--bottom u-no-margin--top')
        postType.style.cssText = "flex: 0 1 auto;margin:0;"

        const footer = document.createElement('div')
        footer.setAttribute('class', 'footer')
        footer.style.cssText = "flex: 0 1 50px, background-color: white; border-top: 1px dashed rgba(150, 150, 150, 0.87);flex: 0 1 auto; width: 100%"

        const postDate = new Date(post.date)
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        postTitle.textContent = post.title['rendered']
        author.textContent = post._embedded['author'][0].name
        console.log(post.featured_media)
        coverImage.src = post.featured_media 
        postType.textContent = post.type

        const datePosted = document.createElement('p')
        datePosted.style.fontStyle = 'italic'
        datePosted.style.fontWeight = '400'
        var conText = document.createTextNode('By ')
        var conText2 = document.createTextNode(" on " + postDate.getDate() + " " + month[postDate.getMonth()] + " " + postDate.getFullYear())
        datePosted.appendChild(conText)
        datePosted.appendChild(author)
        datePosted.appendChild(conText2)

        textArea.appendChild(postTitle)

        app.appendChild(card)
        card.appendChild(header)
        //card.appendChild(topBorder)
        card.appendChild(coverImage)
        titleLink.appendChild(postTitle)
        card.appendChild(titleLink)
        card.appendChild(datePosted)
        //card.appendChild(bottomBorder)
        document.createElement('br')
        footer.appendChild(postType)
        card.appendChild(footer)
        
    })
  } else {
    console.log('error')
  }
}

request.send()