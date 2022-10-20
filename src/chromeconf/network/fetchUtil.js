export default class fetchUtil {

    static Get(url,params={}) {
        return new Promise(function(resolve, reject) {
            fetch(url,{headers: {
                'Content-Type': 'application/json'
              }}).then(function(response) {
                response.json();
            }).then((data) => resolve(data)).catch((err) => reject(err));
        })
    }

    static Post(url,params={}) {
        return new Promise(function(resolve, reject) {
            fetch(url,{method: 'POST',headers: {
                'Content-Type': 'application/json'
              },body:Json.stringify(params)}).then(function(response) {
                response.json();
            }).then((data) => resolve(data)).catch((err) => reject(err));
        })
    }

}