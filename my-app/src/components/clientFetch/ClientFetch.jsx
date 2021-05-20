
//Standard ip for server
const path = "https://bokningar.mk.chs.chalmers.se";

//Standard post request to server
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}
//Used the path + parameter data to send fetch request to server
export function fetchData(postPath, data){
        options.body = JSON.stringify(data);
      return fetch(path + postPath, options);
}