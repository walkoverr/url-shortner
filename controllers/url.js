const shortid = require('shortid')
const URL = require('../models/url');
async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url)
    {
        return res.status(400).json({error:"url required!"})
    }
    const shortID= shortid();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        timeStamp:[],
    })
    return res.render('home',{
        id:shortID,
    })
    return res.json({id:shortID});
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortid
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitHistory.length,
        analytics:result.visitHistory,
     });

}

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
}