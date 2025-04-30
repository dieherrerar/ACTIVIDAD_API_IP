document.addEventListener('DOMContentLoaded', function(){
    const apiUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://newsapi.org/v2/everything?q=tesla&from=2025-03-30&sortBy=publishedAt&apiKey=311ed1ec0413458f99549fb1e2c33745");
    const container = document.getElementById("news");


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
                const articles = JSON.parse(data.contents).articles;
                if (articles.length === 0) {
                    container.innerHTML = '<p>No hay noticias disponibles.</p>';
                } else {
                    articles.forEach(article => {
                        const card = document.createElement('div'); 
                        card.className = 'news-card';
                        card.innerHTML = `
                            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="Imagen de la noticia">` : ''}
                            <div class="news-content">
                                <h2>${article.title}</h2>
                                <p>${article.description ? article.description.slice(0, 100) : ''}...</p>
                                <a href="${article.url}" target="_blank">Ir a la noticia</a>
                            </div>
                        `;
                        container.appendChild(card);
                    });
                }
        })
        .catch(error => {
            console.error('Error al cargar las noticias: ', error);
            container.innerHTML = '<p>Error al cargar las noticias.</p>';
        })
});