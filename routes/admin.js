import express from 'express'
import Seekers from '../models/seekers.js';

const router=express()

router.put('/acceptusers/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body);
    let response=await Seekers.findByIdAndUpdate(id,req.body)
    console.log(response);
})



router.get('/viewfilmcompany',async(req,res)=>{
    console.log(req.body);
    let response=await Seekers.find({userType:'filmcompany'})
    console.log(response);
    res.json(response)

})

router.get('/viewhiringteam',async(req,res)=>{
    console.log(req.body);
    let response=await Seekers.find({userType:'hiringteam'})
    console.log(response);
    res.json(response)

})

router.get('/viewlocationowner',async(req,res)=>{
    console.log(req.body);
    let response=await Seekers.find({userType:'locationowner'})
    console.log(response);
    res.json(response)

})

router.get('/viewseekers',async(req,res)=>{
    console.log(req.body);
    let response=await Seekers.find({userType:'seekers',Status:'Accepted'})
    console.log(response);
    res.json(response)

})

export default router
