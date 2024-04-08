import express from 'express'
import Addlocation from '../models/addlocation.js'
import { upload } from '../multer.js'
import Payment from '../models/payment.js'
const router=express()

router.post('/addlocation',upload.fields([{name:'Image'},{name:'Image2'},{name:'Image3'},{name:'Certificate'}]),async(req,res)=>{
    try{
          let id=req.params.id
    if(req.files['Image']){
        const image = req.files['Image'][0].filename
        req.body={...req.body,Image:image}
    }
    if(req.files['Image2']){
        const image = req.files['Image2'][0].filename
        req.body={...req.body,Image2:image}
    }
    if(req.files['Image3']){
        const image = req.files['Image3'][0].filename
        req.body={...req.body,Image3:image}
    }
    if(req.files['Certificate']){
        const certificate = req.files['Certificate'][0].filename
        req.body={...req.body,Certificate:certificate}
    }
        console.log(req.body)
        const newAddlocation = new Addlocation(req.body)
        const savedAddlocation = await newAddlocation.save()
        res.json({message:"New Location",savedAddlocation})
    }
    catch(e){
        res.json(e.message)
    }
})


router.get('/viewloc/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    let response=await Addlocation.find({userId:id})
    console.log(response)
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewlocd/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    let response=await Addlocation.findById(id)
    console.log(response)
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.put('/editloc/:id',upload.fields([{name:'Image'}]),async(req,res)=>{
    try{
    if(req.files['Image']){
        const image =  req.files['Image'][0].filename;  
        console.log(image)
        req.body={...req.body,Image:image}
    }
    let id=req.params.id
    console.log(req.body)
    let response=await Addlocation.findByIdAndUpdate(id,req.body)
}
catch(e){
    res.json(e.message)
}
})

router.get('/viewlocreq/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(req.body);
    let response=await Payment.find()
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
}
catch(e){
    res.json(e.message)
}
})

export default router
