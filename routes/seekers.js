import express from 'express'
import Seekers from '../models/seekers.js'
import Addpreviouswork from '../models/addpreviouswork.js'
import Addjob from '../models/addjob.js'
import { upload } from '../multer.js'
import jobrequest from '../models/jobrequest.js'
import Announcement from '../models/announcement.js'

const router=express()


router.post('/register',upload.fields([{name:'Idproof'},{name:"Liscence"}]),async(req,res)=>{
    try{
    console.log(req.files)
    
    if(req.files['Idproof']){
        const idproof = req.files['Idproof'][0].filename
        req.body={...req.body,Idproof:idproof}
    }
    if(req.files['Liscence']){

        const liscence =  req.files['Liscence'][0].filename;  
        console.log(liscence)
        req.body={...req.body,Liscence:liscence}
    }
    const newSeekers = new Seekers(req.body)
    const savedSeekers = await newSeekers.save();
    console.log(newSeekers,'new user');
    res.json({message:"Registration",savedSeekers})
}
catch(e){
    console.log(e);
    res.json(e.message)
}
})

router.post('/login',async(req,res)=>{
    try{
    console.log(req.body);
    const {Email,Password}=req.body
    let users=await Seekers.findOne({Email:Email,Password:Password})
    console.log(users)
    res.json(users)
}
catch(e){
    res.json(e.message)
}
})

router.post('/addpreviouswork',upload.single('Image'),async(req,res)=>{
    try{
        console.log(req.file);
        let imagepath=req.file.filename
        const newPreviouswork = new Addpreviouswork({...req.body,Image:imagepath})
        const savedPreviouswork = await newPreviouswork.save()
        res.json({message:"Previous Work",savedPreviouswork})

    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewpreviouswork/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id)
    let response=await Addpreviouswork.find({userId:id})
    console.log(response);
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewpreviousworkd/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    let response=await Addpreviouswork.findById(id)
    console.log(response)
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.put('/editpreviouswork/:id',upload.fields([{name:'Image'}]),async(req,res)=>{
    try{
    if(req.files['Image']){
        const image =  req.files['Image'][0].filename;  
        console.log(image)
        req.body={...req.body,Image:image}
    }
    let id=req.params.id
    console.log(req.body)
    let response=await Addpreviouswork.findByIdAndUpdate(id,req.body)
}
catch(e){
    res.json(e.message)
}
})

router.get('/viewprofile/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id)
    let response=await Seekers.findById(id)
    console.log(response);
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.put('/editprofile/:id',upload.fields([{name:'Liscence'}]),async(req,res)=>{
    try{
    
    if(req.files['Liscence']){
        const liscence =  req.files['Liscence'][0].filename;  
        console.log(liscence)
        req.body={...req.body,Liscence:liscence}
    }
    let id=req.params.id
    console.log(req.body)
    let response=await Seekers.findByIdAndUpdate(id,req.body)
}
catch(e){
    res.json(e.message)
}
})

router.get('/viewjob/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(req.body);
    let response=await Addjob.find({ancId:id})
    console.log(response)
    res.json(response)
}
catch(e){
    res.json(e.message)
}
})


router.post('/postjobreq',upload.fields([{name:'Cv'}]), async(req,res)=>{
    try{
    let id=req.params.id
    if(req.files['Cv']){
        const cv = req.files['Cv'][0].filename
        req.body={...req.body,Cv:cv}
    }
    console.log(req.body);
    const newjobreq = new jobrequest(req.body)
    const savedjobreq = await newjobreq.save();
    res.json({message:"Job request",savedjobreq})
    }
    catch(e){
        res.json(e.message)
            }
})


router.get('/jobreqst/:id',async(req,res)=>{
    try{
        let id=req.params.id
    console.log(req.body);
    let response=await jobrequest.find({sId:id})
    console.log(response);
    let responsedata=[];
    for (const newresponse of response){
        let job=await Addjob.findById(newresponse.jobId);
        let film=await Announcement.findById(job.ancId);
        responsedata.push({
            film:film.Filmname,
            job:job,
            req:newresponse
        })
    }
    console.log(responsedata)
    res.json(responsedata)
}
catch(e){
    res.json(e.message)
}
})

export default router