import express from 'express'
import announcement from '../models/announcement.js'
import Hiringfeedback from '../models/hiringfeedback.js'
import Announcement from '../models/announcement.js'
import { upload } from '../multer.js'
import Addlocation from '../models/addlocation.js'
import Seekers from '../models/seekers.js'
import Hiringrequest from '../models/hiringreq.js'
import Locationreq from '../models/locationfcreq.js'
const router=express()


router.post('/addanc',upload.single('Image'),async(req,res)=>{
    console.log(req.file)
    let imagepath=req.file.filename
    const newAnnouncement = new announcement({...req.body,Image:imagepath})
    const savedAnnouncement = await newAnnouncement.save();
    res.json({message:"New Announcement",savedAnnouncement})
})

router.put('/editanc/:id',upload.fields([{name:'Image'}]),async(req,res)=>{
    try{
    if(req.files['Image']){
        const image =  req.files['Image'][0].filename;  
        console.log(image)
        req.body={...req.body,Image:image}
    }
    let id=req.params.id
    console.log(req.body)
    let response=await Announcement.findByIdAndUpdate(id,req.body)
}
catch(e){
    res.json(e.message)
}
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
    res.json(response)
})

router.get('/viewloc',async(req,res)=>{
    console.log(req.body);
    let response=await Addlocation.find()
    console.log(response)
    res.json(response)
})

router.get('/viewlocd/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Addlocation.findById(id)
    console.log(response)
    res.json(response)
})

router.get('/viewhiringreq/:id',async(req,res)=>{
    let id=req.params.id
    console.log(req.body);
    let response=await Hiringrequest.find()
    console.log(response)
    // res.json(response)
    let resposedata=[];
    for (const newrespose of response){
        let hiring=await Seekers.findById(newrespose.userId);
        let anc=await Announcement.findById(newrespose.ancId);
        resposedata.push({
            hiring:hiring,
            anc:anc,
            req:newrespose
        });
    }
    console.log(resposedata)
    res.json(resposedata)
})

router.put('/manageHiring/:id',async (req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Hiringrequest.findByIdAndUpdate(id,req.body)
    console.log(response);
})

router.put('/managelocreq/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Locationreq.findByIdAndUpdate(id,req.body)
    console.log(response);
})

router.get('/viewlocreq/:id',async(req,res)=>{
    let id=req.params.id
    console.log(req.body);
    let response=await Locationreq.find()
    console.log(response)
    // res.json(response)
    let resposedata=[];
    for (const newrespose of response){
        let hiring=await Seekers.findById(newrespose.hiringId);
        let anc=await Announcement.findById(newrespose.ancId);
        let loc=await Addlocation.findById(newrespose.locationId)
        resposedata.push({
            hiring:hiring,
            anc:anc,
            loc:loc,
            req:newrespose
        });
    }
    console.log(resposedata)
    res.json(resposedata)
})

router.get('/viewlocfname/:id',async(req,res)=>{
    try{
    let id=req.params.id
    let response=await Hiringrequest.find({userId:id,Status:'Accepted'})
    console.log(response)
    // res.json(response)
    let resposedata=[];
    for (const newrespose of response){
        let anc=await Announcement.findById(newrespose.ancId);
        let hiring=await Seekers.findById(newrespose.userId)
        resposedata.push({
            hiring:hiring,
            anc:anc,
            // loc:loc,
            req:newrespose
        });
    }
    console.log(resposedata)
    res.json(resposedata)
}
catch(e){
    res.json(e.message)
}
})

export default router
