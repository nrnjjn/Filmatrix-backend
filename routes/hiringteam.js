import express, { json } from 'express'
import Addjob from '../models/addjob.js';
import Announcement from '../models/announcement.js';
import Hiringrequest from '../models/hiringreq.js';
import Locationreq from '../models/locationfcreq.js';
import Progress from '../models/progress.js';
import Addlocation from '../models/addlocation.js';
import Seekers from '../models/seekers.js';
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

router.put('/editjob/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Addjob.findByIdAndUpdate(id,req.body)
    console.log(response)
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewjob/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(req.body);
    let response=await Addjob.find({userId:id})
    console.log(response)
    let responsedata=[];
    for(const newresponse of response){
        let anc=await Announcement.findById(newresponse.ancId);
        responsedata.push({
            anc:anc,
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

router.get('/viewjobd/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    let response=await Addjob.findById(id)
    console.log(response);
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewanc',async(req,res)=>{
    try{
    console.log(req.body);
    let response=await Announcement.find()
    console.log(response)
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
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

router.get('/locreqst/:id',async(req,res)=>{
    try{
        let id=req.params.id
    console.log(req.body);
    let response=await Locationreq.find({hiringId:id})
    console.log(response);
    let responsedata=[];
    for (const newresponse of response){
        let film=await Announcement.findById(newresponse.Filmname);
        let loc=await Addlocation.findById(newresponse.locationId);
        responsedata.push({
            film:film,
            loc:loc,
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

router.get('/viewhreq/:id',async(req,res)=>{
    try{
        let id=req.params.id
        console.log(id);
        let response=await Hiringrequest.find({userId:id})
        console.log(response)
        let responsedata=[];
    for (const newresponse of response){
        let film=await Announcement.findById(newresponse.ancId);
        let companyName=await Seekers.findById(film.companyId);
        responsedata.push({
            film:film,
            companyName :companyName.companyName,
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


// router.post('/addprogress',async(req,res)=>{
//     try{
//     let id=req.params.id
//     console.log(req.body);
//     const newaddProgress = new Progress(req.body)
//     const savedProgress=await newaddProgress.save();
//     res.json({message:"Add progress",savedProgress})
//     }
//     catch(e){
//         res.json(e.message)
//     }
// })

router.put('/hiringprogress/:id',async(req,res)=>{
    console.log('server');
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Hiringrequest.findByIdAndUpdate(id,req.body,{new:true})
    console.log(response);
    res.json(response)

})

// router.get('/viewfilmcompany/:id',async(req,res)=>{
//     try{
//         let id=req.params.id
//         console.log(req.body);
//         let response=await Announcement.find()
//         console.log(response)
//         let responsedata=[];
//         for(const newresponse of response){
//             let film=await Seekers.findById(newresponse.companyId)
//             responsedata.push({
//                 companyName:film.companyName,
//                 req:newresponse
//             })
//         }
//         console.log(responsedata);
//         res.json(responsedata)
//     }
//     catch(e){
//         res.json(e.message)
//     }
// })

export default router