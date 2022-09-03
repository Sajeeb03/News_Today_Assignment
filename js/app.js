const loadNewsCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
        .catch(error => console.log(error))
}

const displayNewsCategory = (categories) => {
    // console.log(categories);
    const categoriesContainer = document.getElementById("categories-container");
    categories.forEach(category => {
        // console.log(category.category_id)
        const li = document.createElement('li');
        li.classList.add('categories-list')
        li.addEventListener('click', function () { showThisNews(category.category_id) })
        li.innerHTML = `
        <a>${category.category_name}</a>
        `;
        categoriesContainer.appendChild(li);
    });
}

const showThisNews = category_id => {
    // console.log(category_id)
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data => showNews(data.data))
        .catch(error => console.log(error))
}
const showNews = newses => {
    // console.log(newses);
    const newsContainer = document.getElementById("news-container");
    newsContainer.textContent = ``;
    newses.forEach(news => {
        console.log(news)
        const { author, title, thumbnail_url, details } = news;
        const div = document.createElement('div');
        div.classList.add('mb-5')
        div.innerHTML = `
        <div class="card lg:card-side bg-white shadow-xl">
            <figure><img src="${thumbnail_url}" alt="Album"></figure>
            <div class="card-body">
                    <h2 class="card-title">${title}</h2>
                    <p>${details.length > 350 ? details.slice(0, 350) + '...' : details}</p>
                    <div class="card-actions absolute bottom-2">
                        <img src="${author.img}" alt="" style="border-radius: 50%;"
                        class="h-12 w-12 rounded-full p-0">
                        <div>
                        <p>${author.name ? author.name : 'No data found'}</p>
                        <p>${author.published_date ? author.published_date : 'No data found'}</p>
                        </div>
                    </div>
                    <div class="card-actions absolute right-2 bottom-2">
                        <button class="btn btn-primary">Show More</button>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(div);
    });
}

loadNewsCategories();