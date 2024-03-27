import express from 'express'
import Addjob from '../models/addjob.js';
import Announcement from '../models/announcement.js';
import Hiringrequest from '../models/hiringreq.js';
import Locationreq from '../models/locationfcreq.js';
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

router.post('/posthiringreq',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(req.body);
    const newHiringreq = new Hiringrequest(req.body)
    const savedHiringreq = await newHiringreq.save();
    res.json({message:"Hiring team request",savedHiringreq})
    }
    catch(e){
        res.json(e.message)
            }
})

router.get('/viewhreq/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Hiringrequest.find({userId:id})
    console.log(response)
    res.json(response)
})

router.post('/locreq',async(req,res)=>{
    try{
        let id=req.params.id
        console.log(req.body);
        const newLocreq = new Locationreq(req.body)
        const savedLocreq = await newLocreq.save();
        res.json({message:"Location request",savedLocreq})
        }
        catch(e){
            res.json(e.message)
                }
})



export default router