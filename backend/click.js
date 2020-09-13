const express = require('express');
const { route } = require('/root/igor/backend');
const router = express.Router();
const Click = require('./clickModel');


// GET ONE FULL BY ID
router.post('/', (req, res)=>{
    Click.findOne({_id:req.params.id}).then(data=>{
        res.send(data)
    })
})

router.post('/register',(req, res)=>{

    const click_temp = {
        "count": 0
    }

    new Click(click_temp).save()
        .then(data=>{
            console.log(data._id);
            res.send(200, {id: data._id})
        })
        .catch(err=>{
            res.json({message: err})
        })
});
router.post('/login',(req, res)=>{
    console.log(req.body.id);
    Click.findOne({_id:req.body.id}).then(data=>{

        res.send(200, data)
        console.log(data);
    })
});

router.post('/getAllClicks',(req, res)=>{
    
    Click.aggregate([
        { $match: { count: {$gte: -1} } },
        { $group: { _id: null, count: { $sum: "$count" } } }
    ]).then(data =>{
        res.send(200, data)
    })
});
router.post('/registerClick',(req, res)=>{
    Click.findOne({_id:req.body.id}).then(d=>{
        let countNew = d.count +1
        Click.findOneAndUpdate({_id:req.body.id}, {count: countNew}).then(data =>{
            res.send(200, data)
        })
    })
   
});
router.post('/getMyClicks',(req, res)=>{
    Click.findOne({_id:req.body.id}).then(d=>{
            res.send(200, d.count)  
    })
   
});

module.exports = router;