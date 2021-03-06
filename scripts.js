// declaration of main container
const app = document.getElementById('row')
app.style.cssText =
    `
        padding-top: 80px
    `

var request = new XMLHttpRequest()

// GET call to the WordPress API
request.open('GET', 'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json', true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  // Check for successful response
  if (request.status >= 200 && request.status < 400) {

    data.forEach(post => {
        // initializing and setting the card decoration
        const card = document.createElement('div')
        card.setAttribute('class', 'col-4 p-card--highlighted')
        card.setAttribute('id', 'card')
        card.style.cssText = 
            `
                border-top: 5px solid rgba(168, 0, 168, 0.63); 
                border-radius: 5px;
                display: flex;
                flex-wrap: wrap;
                box-shadow: 2px 2px 2px 2px #aaaaaa8f;
            `
        // header with horizontal devision
        const header = document.createElement('div')
        header.textContent = 'CLOUD AND SERVER'
        header.style.cssText = 
            `
                flex: 0 1 auto; 
                background-color: white; 
                border-bottom: 1px dashed rgba(150, 150, 150, 0.87);
                width:100%; 
                margin-bottom:10px;
                padding-bottom:10px;
                font-weight: 400;
            `
        // image design
        const coverImage = document.createElement('img')
        coverImage.setAttribute('class', 'p-card__image')
        coverImage.style.cssText = 
            `
                flex: 0 1 auto;
            `

        // link for img url
        const imgLink = document.createElement('a')
        imgLink.href = post.featured_media

        // link for title url
        const titleLink = document.createElement('a')
        titleLink.href = post.link

        // post title
        const postTitle = document.createElement('h4')
        postTitle.style.cssText = 
            `
                color: rgb(64, 64, 233); 
                font-weight: 400;
                flex: 1 1 auto;
            `

        // author name as link
        const author = document.createElement('a')
        author.href = post._embedded['author'][0].link
        author.setAttribute('id', 'author')

        // show post type
        const postType = document.createElement('h5')
        postType.setAttribute('class', 'u-align--bottom')
        postType.style.cssText = 
            `
                flex: 0 1 auto;
            `

        // footer with horizontal border containing post type
        const footer = document.createElement('div')
        footer.setAttribute('class', 'footer')
        footer.style.cssText = 
            `
                background-color: white; 
                border-top: 1px dashed rgba(150, 150, 150, 0.87);
                flex: 0 1 auto; 
                width: 100%;
                align-items: center;
                justify-content: center;
            `
        // date declaration with months
        const postDate = new Date(post.date)
        const month = 
        ["January","February","March","April","May","June","July","August",
                "September","October","November","December"
        ];

        coverImage.src = post.featured_media
        postTitle.textContent = post.title['rendered'].length > 30 ? `${post.title['rendered'].substring(0, 30)}...` : post.title['rendered']
        titleLink.title = post.title['rendered']
        author.textContent = post._embedded['author'][0].name 
        postType.textContent = post.type

        // the author and date posted information
        const datePosted = document.createElement('p')
        datePosted.style.fontStyle = 'italic'
        datePosted.style.fontWeight = '400'
        var conText = document.createTextNode('By ')
        var conText2 = document.createTextNode(" on " + postDate.getDate() + " " + month[postDate.getMonth()] + " " + postDate.getFullYear())
        datePosted.appendChild(conText)
        datePosted.appendChild(author)
        datePosted.appendChild(conText2)

        // putting pieces of the card together
        titleLink.appendChild(postTitle)
        footer.appendChild(postType)
        imgLink.appendChild(coverImage)

        // addind the card to the view
        app.appendChild(card)
        card.appendChild(header)
        card.appendChild(imgLink)
        card.appendChild(titleLink)
        card.appendChild(datePosted)
        document.createElement('br')
        card.appendChild(footer)
        
    })
  } else {
    console.log('error')
  }
}

request.send()