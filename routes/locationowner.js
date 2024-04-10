import express from 'express'
import Addlocation from '../models/addlocation.js'
import { upload } from '../multer.js'
import Payment from '../models/payment.js'
import Locationbooking from '../models/locationbooking.js'
import Announcement from '../models/announcement.js'
import Seekers from '../models/seekers.js'
import Locationreq from '../models/locationfcreq.js'
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
    let location=await Addlocation.find({userId:id});
    console.log(location,'----------------');
    let resposedata=[];
    for(const x of location){
    let response=await Locationbooking.find({locationId:x._id})
    console.log(response,'zzzzzzzzzzzzzzzzzzz')
    for (const newrespose of response){
        let loc=await Addlocation.findById(newrespose.locationId);
        let anc=await Announcement.findById(newrespose.ancId);
        let hiring=await Seekers.findById(newrespose.hiringId);
        let fcreq=await Locationreq.findById(newrespose.Fcreq);
        resposedata.push({
            anc:anc,
            loc:loc,
            fcreq:fcreq,
            hiring:hiring,
            req:newrespose
        });
    }}
    console.log(resposedata)
    res.json(resposedata)

}
catch(e){
    res.json(e.message)
}
})


router.put('/managebookings/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Locationbooking.findByIdAndUpdate(id,req.body)
    console.log(response);
    res.json(response)
    }
    catch(e){
        res.json(e.message)
        }
    
})


export default router
