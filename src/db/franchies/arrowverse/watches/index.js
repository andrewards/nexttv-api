const axios = require('axios');
const fs = require('fs');
const path = require('path');

const api = axios.create({
    baseURL: 'http://localhost:3000',
});


(async () => {
    const allWatches = [];
    for (let ano = 1; ano <= 6; ano++) {
        let group = await api.get(`/groups/${ano}`);
        group = group.data;

        for (let e = 0; e < group.episodes.length; e++) {
            const ep = group.episodes[e];

            const watched = {
                user_id: 1,
                title_id: ep.title.id,
                episode_id: ep.id,
            };
            allWatches.push(watched);

        }
    }
    fs.writeFileSync(path.resolve(__dirname, 'watches.json'), JSON.stringify(allWatches));
})();