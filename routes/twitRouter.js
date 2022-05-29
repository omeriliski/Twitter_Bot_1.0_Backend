import express from "express";
import {init} from "../lib/twit.js";
import axios from "axios";

const twitRouter = express.Router();
let stream = null; 
twitRouter.post("/followPopular",(req,res)=>{
        const T = init(req.body.user);
        console.log('req.body.isListen :>> ', req.body.isListen);

        //full fill the popular account list
        let userIdsArr = req.body.user.popularAccountsList.map(e=>e.id_str)
        
        console.log('userIdsArr :>> ', userIdsArr);
        try {
                if(req.body.isListen){
                        //check the daily rt limit
                        console.log('req.body.user.rtCount :>> ', req.body.user.rtCount);
                        console.log('req.body.user.daily.retweetedCount :>> ', req.body.user.daily.retweetedCount);

                        // if(req.body.user.daily.retweetedCount < req.body.user.rtCount){
                                stream = T.stream('statuses/filter', {follow: userIdsArr});
                                stream.on('tweet', function (tweet,err) {
                                        if(userIdsArr.includes(tweet.user.id_str)){
                                                T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
                                                        console.log('retweeted :>>>>>>> ');
                                                        stream.stop();
                                                        res.send("retweeted")
                                                        //    retweet(tweet.id_str,T);
                                                })
                                        }
                                        else console.log("refused")
                                })
                        // }
                        // else {
                        //         throw new Error("You have reached to daily rt limit.");
                        // } 
                }
                else{
                        // stream=null;
                        // console.log('stream :>> ', stream);
                        // console.log('remove :>> ');
                        stream.stop();
                        // stream.removeListener("on",()=>{
                        //         console.log("strem is not listening!")
                        // });
                        // stream.removeAllListeners("on");
                        stream.on('disconnect', function (disconnectMessage) {
                                console.log('disconnect---------- :>> ',disconnectMessage);
                              })
                } 
        // else stream.set("Connection", "close");
        } catch (error) {
                res.status(400).send(error);
                console.log("followPopular",error);
        }
//     }
})

// it gets the details of popular accounts
twitRouter.post("/getDetails",(req,res)=>{
        // console.log('req.body.value :>> ', req.body.value);
        const url=`https://api.twitter.com/1.1/users/lookup.json?screen_name=${req.body.value}`
        axios.get(url,
                {headers:
                        {"Authorization":`bearer ${process.env.BEARER_TOKEN}`
        }})
        .then(result=>{
                // console.log('res.data[0] :>> ', res.data[0])
                const popularAccountObject={
                        id:result.data[0].id,
                        id_str:result.data[0].id_str,
                        name:result.data[0].name,
                        screen_name:result.data[0].screen_name,
                        location:result.data[0].location,
                        profile_image_url:result.data[0].profile_image_url
                }
                console.log('popularAccountObject :>> ', popularAccountObject);
                res.send(popularAccountObject);
        })
        .catch(err=>res.send(err))
})

export default twitRouter;
