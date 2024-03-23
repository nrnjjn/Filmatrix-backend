import express from 'express'
import Addjob from '../models/addjob.js';
import Announcement from '../models/announcement.js';
const router=express()

router.post('/addjob',async(req,res)=>{
    try{
    console.log(req.body);
    const newAddjob = new Addjob(req.body)
    const savedAddjob = await newAddjob.save();
    res.json({message:"New Job",savedAddjob})
    }
    catch(e){
        res.json(e.message)
            }
})

router.get('/viewanc',async(req,res)=>{
    console.log(req.body);
    let response=await Announcement.find()
    console.log(response)
    res.json(response)
})
router.get('/viewancd/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Announcement.findById(id)
    console.log(response)
    res.json(response)
})


export default router