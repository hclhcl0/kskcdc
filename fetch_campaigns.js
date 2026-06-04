fetch('https://ksktd.ksbtdanang.vn/api/vaccination/campaigns')
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err));
