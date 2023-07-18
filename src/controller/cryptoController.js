const cryptoModel = require('../models/cryptoModel')
const axios = require('axios')
const key = "9ce7f66c-032e-4949-acc9-bb471566147e"

const cryptoData = async (req,res) => {
    try{
        const coin = await axios.get('https://api.coincap.io/v2/assets',
        {
            headers: {
              Authorization: `Bearer ${key}`,
            },
        })
        const coinList = coin.data.data
        
        for(let i=0; i<coinList.length; i++){
            let coin = {
                symbol : coinList[i].symbol,
                name : coinList[i].name,
                marketCapUsd : coinList[i].marketCapUsd,
                priceUsd : coinList[i].priceUsd
            }

            await cryptoModel.findOneAndUpdate({symbol : coinList[i].symbol}, coin, { upsert: true, new : true})
        }
        coinList.sort( (a,b) =>  b.changePercent24Hr - a.changePercent24Hr)
        console.log(coinList.length)
        res.status(201).send({status: true, Data: coinList})

    }catch(error){
        res.status(500).send({status : false, message : ""})
    }
}

module.exports = {
    cryptoData
}