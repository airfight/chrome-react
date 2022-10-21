export default {

      Get: function (url,params={}) {

        // try {
        //     let res = await fetch(url)
        //     console.log("res",res)
        //     let data = await res.json();
        //     console.log("data",data)
        //     return {result:1,data:data};
        // } catch (err) {
        //     return {result:0}
        // }

        return new Promise(function(resolve, reject) {
            fetch(url).then(response =>
                response.json()).then(data => {
             resolve({code:1,data:data});
            }).catch((err) =>{
                console.log(err);
                reject({code:0})
            });
        })
    },

    Post: async function (url,params={}) {
        return new Promise(function(resolve, reject) {
            fetch(url,{method: 'POST',headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },body:params}).then(response => response.json()).then((data) => resolve(data)).catch((err) => reject(err));
        })
    }

}