const { Tmdb } = require('tmdb');
const path = require('path');
const fs = require('fs');
const DB = require('../../../');
const tmdb = require('../../tmdb');

const titles = DB('titles');
let ArrowverseTitles;

async function getEpisodes(eps=[]) {
    ArrowverseTitles = await titles.findAll({ franch_id: 1 });
    for (let t = 0; t < ArrowverseTitles.length; t++) {
        const ArrowverseTitle = ArrowverseTitles[t];
        const infoArrowverseTitle = await tmdb.get(`/tv/${ArrowverseTitle.id_tmdb}`);
        let countSeasons = 0;
        infoArrowverseTitle.seasons.forEach(season => {
            if (season.name !== 'Specials') {
                countSeasons++;
            }
        });
        console.log(ArrowverseTitle.name, countSeasons);
        for (let s = 1; s <= countSeasons; s++) {
            const infoSeason = await tmdb.get(`/tv/${ArrowverseTitle.id_tmdb}/season/${s}`, {
                language: 'pt-BR',
            });
            infoSeason.episodes.forEach(ep => {
                const infoEp = {
                    show_id: ArrowverseTitle.id,
                    name: ep.name,
                    season: s,
                    episode: ep.episodeNumber,
                    description: ep.overview,
                    when: ep.airDate,
                };

                eps.push(infoEp);
            });
        }
    }

    return eps;
}

(async () => {
    const episodes = await getEpisodes();
    fs.writeFileSync(path.resolve(__dirname, 'episodes.json'), JSON.stringify(episodes));
    console.log('FINISH!');
})();