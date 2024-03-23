import express from 'express'
import announcement from '../models/announcement.js'
import Hiringfeedback from '../models/hiringfeedback.js'
import Announcement from '../models/announcement.js'
import { upload } from '../multer.js'
const router=express()


router.post('/addanc',upload.single('Image'),async(req,res)=>{
    console.log(req.file)
    let imagepath=req.file.filename
    const newAnnouncement = new announcement({...req.body,Image:imagepath})
    const savedAnnouncement = await newAnnouncement.save();
    res.json({message:"New Announcement",savedAnnouncement})
})

router.post('/hiringfeedback',async(req,res)=>{
    console.log(req.body);
    const newHiringfeedback = new Hiringfeedback(req.body)
    const savedHiringfeedback = await newHiringfeedback.save();
    res.json({message:"Hiring Feedback",savedHiringfeedback})
})

router.get('/viewanc/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Announcement.find({companyId:id})
    console.log(response)
    res.json(response)
})


export default router
