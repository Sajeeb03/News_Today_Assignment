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
    console.log(newses);
}

loadNewsCategories();