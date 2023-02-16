import cardConfig from '../utils/cardCreator/cardConfig';

export default async function () {
  const json = {
    html: cardConfig.code,
    css: '*{margin:0}',
  };

  const username = 'a88d30ef-80c4-4db6-b50c-726e3d219087';
  const password = 'c6b1958b-6597-4048-8af1-c3773e9cefd4';

  const options = {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(username + ':' + password),
    },
  };

  const res = await fetch('https://hcti.io/v1/image', options);
  const link = await res.json();
  return link.url;
}
