const https = require('https');
https.get('https://crystalgroup.in', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let images = [];
    let match;
    while(match = regex.exec(data)) {
        let url = match[1];
        if(!url.startsWith('http')) url = 'https://crystalgroup.in' + url;
        if(url.match(/\.(jpg|jpeg|png|webp)/i)) images.push(url);
    }
    console.log(JSON.stringify([...new Set(images)].slice(0, 15), null, 2));
  });
}).on('error', (e) => console.error(e));
