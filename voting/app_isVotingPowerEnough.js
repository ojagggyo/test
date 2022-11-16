const dsteem = require('dsteem');

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');

module.exports.isVotingPowerEnough = async (accountName, limit) => { 

    return new Promise((resolve) => {

        client.database
        .call('get_accounts', [[accountName]])
            .then(result => {
                if(result.length > 0){
                    const voting_power = result[0].voting_power;
                    console.log(`voting_power=${voting_power}`);
                    console.log(`isVotingPowerEnough=${voting_power > limit}`);
                    resolve(voting_power > limit * 100);
                }
            })
    })
};

