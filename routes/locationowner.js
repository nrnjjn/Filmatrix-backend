import express from 'express'
import Addlocation from '../models/addlocation.js'
import { upload } from '../multer.js'
const router=express()

router.post('/addlocation',upload.fields([{name:'Image'}]),async(req,res)=>{
    try{
          
    if(req.files['Image']){
        const image = req.files['Image'][0].filename
        req.body={...req.body,Image:image}
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


export default router
