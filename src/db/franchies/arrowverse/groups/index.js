const path = require('path');
const fs = require('fs');
const db = require('../../../');
const guide = require('./guide.json');

async function getTitlesGroups(titles_groups=[]) {
    for (let g = 0; g < guide.length; g++) {
        const group = guide[g];

        group.titles_groups.forEach(title_group => {
            const tg = {
                title_id: title_group.title.id,
                season: title_group.season,
                group_id: group.id,
            };

            titles_groups.push(tg);
        });
    }

    return titles_groups;
}

(async () => {
    const titles_groups = await getTitlesGroups();
    fs.writeFileSync(path.resolve(__dirname, 'titles_groups.json'), JSON.stringify(titles_groups));
})();