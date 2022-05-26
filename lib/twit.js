import Twit from "twit";

const init = (user)=>{
    const T = new Twit({
        consumer_key: user.apiKey,
        consumer_secret: user.apiSecretKey,
        access_token: user.accessToken,
        access_token_secret: user.accessTokenSecret,
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true, // optional - requires SSL certificates to be valid.
    })
    return T;
}

// const retweet = (id,T)=>{
//     return new Promise((resolve,reject)=>{
//       T.post('statuses/retweet/:id', { id: id }, function (err, data, response) {
//           if(err){
//               console.log('retweet err :>> ', err);
//               resolve(0);
//          } 
//          else{
//               //res.send("Retweeted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//             //   userUpdateInternal(userData,res);
//               console.log("Retweeted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//               resolve(1);
//          }
//     }) 
//   })
// }

export {init};