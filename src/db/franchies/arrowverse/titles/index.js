const { Tmdb } = require('tmdb');
const fs = require('fs');
const path = require('path');
const guide = require('./guide.json');
const tmdb = require('../../tmdb');

const base_img_url = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

async function getTitles(titles=[]) {
    for (let i = 0; i < guide.length; i++) {
        const title = guide[i];
        try {
            const search = await tmdb.get(`search/${title.type}`, {
                query: title.name,
                language: 'pt-BR',
            });
            const firstResult = search.results[0];
            const infoTitle = {
                id_tmdb: firstResult.id,
                name: firstResult.name,
                photo: base_img_url + firstResult.posterPath,
                description: firstResult.overview,
                type: 'tv',
                franch_id: 1,
            };
            titles.push(infoTitle);
        } catch(err) {
            console.log('ERROR', err.message);
        }
    }

    return titles;
}

(async () => {
    const titles = await getTitles();
    fs.writeFileSync(path.resolve(__dirname, 'titles.json'), JSON.stringify(titles));
    console.log('FINISH!');
})();