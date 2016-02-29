/* @flow */
// this file is an object with few methods on it. It uses fetch to get info from Github
var api = {
  getBio(username){
    username = username.toLowerCase().trim();
    var url = `https://api.github.com/users/${username}`;
    return fetch(url).then((res => res.json()));
  },
  getRepos(username){
    username = username.toLowerCase().trim();
    // backticks allow to not have to concatenate strings
    var url = `https://api.github.com/users/${username}/repos`;
    // => allows to keep context of the parent so we don't have to use '.this' or '.bind'
    return fetch(url).then((res) => res.json());
  },
  getNotes(username){
    // fetch data from url, then get a response. return another promise which is the json
    username = username.toLowerCase().trim();
    var url = `https://jd-github-saver.firebaseio.com/${username}.json`;
    return fetch(url).then((res) => res.json());
  },
  addNote(username, note){
    // post request with fetch. pass in url and object. fetch returns us a promise and we add then, and return json.
    username = username.toLowerCase().trim();
    var url = `https://jd-github-saver.firebaseio.com/${username}.json`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then((res) => res.json());
  }
};

module.exports = api;
