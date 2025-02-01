function makeUrl() {
    const client_id = '526c2e259cad436489e35e5edd73fa59';
    const redirect_uri = 'http://localhost:3000';

    const state = '125';

    const scope = 'user-read-private user-read-email';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    return url;
};

function requestAccessToken () {
    const url = makeUrl();
    console.log(url);
    fetch(url, {
        mode: "no-cors",
    }).then(() => {
        window.addEventListener('hashchange', (event) => {
            console.log(event.newURL);
        })
    }).catch(error => console.log(error));
}

export default requestAccessToken; 