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

    const progress = document.getElementById("progress-bar");
    progress.classList.remove('hidden')
}
const showNews = newses => {
    // console.log(newses);

    const newsContainer = document.getElementById("news-container");
    newsContainer.textContent = ``;
    const countNews = document.getElementById('news-count');
    countNews.innerHTML = `
    <div class="w-4/5 m-auto bg-white rounded-lg text-2xl mb-5 p-3">
        <h1>${newses.length} news in this category</h1>
    </div>
    `;
    newses.forEach(news => {
        // console.log(news)
        const { author, title, thumbnail_url, details, total_view, _id } = news;
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
                        <div class= "flex gap-1 ml-12 mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p>${total_view ? total_view : 'No data found'}</p>
                        </div>
                    </div>
                    <div class="card-actions absolute right-2 bottom-2">
                    <label for="my-modal-3" class="btn modal-button" onclick ="loadModal('${_id}')"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                      </label>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(div);

    });
    const progress = document.getElementById("progress-bar");
    progress.classList.add('hidden')
}
const loadModal = id => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => displayModalBody(data.data))
        .catch(error => console.log(error))
}

const displayModalBody = details => {
    // console.log(details)
    const modalBody = document.getElementById("modal-body");
    details.forEach(detail => {
        const { title, author, details, thumbnail_url, total_view } = detail;
        console.log(detail)
        modalBody.innerHTML = `
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <img class="m-auto" src="${thumbnail_url}"/>
        <h3 class="text-lg font-bold">${title}</h3>
        <div class="flex justify-between">
        <p>${author.name ? author.name : 'No Data Found'}</p>
        <p>${author.published_date ? author.published_date : 'No Data Found'}</p>
        <p>View:${total_view ? total_view : 'No Data Found'}</p>
        </div>
            <p class="py-4">${details.length > 350 ? details.slice(0, 350) + '...' : details}</p>

        `;
    })
}
loadNewsCategories();
showThisNews('02');