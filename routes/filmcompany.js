import express from 'express'
import announcement from '../models/announcement.js'
import Announcement from '../models/announcement.js'
import { upload } from '../multer.js'
import Addlocation from '../models/addlocation.js'
import Seekers from '../models/seekers.js'
import Hiringrequest from '../models/hiringreq.js'
import Locationreq from '../models/locationfcreq.js'
const router=express()


router.post('/addanc',upload.single('Image'),async(req,res)=>{
    try{
    console.log(req.file)
    let imagepath=req.file.filename
    const newAnnouncement = new announcement({...req.body,Image:imagepath})
    const savedAnnouncement = await newAnnouncement.save();
    res.json({message:"New Announcement",savedAnnouncement})
    }
    catch(e){
        res.json(e.message)
    }
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

router.delete('/deleteanc/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Announcement.findByIdAndDelete(id)
})

router.put('/hiringfeedbackput/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Hiringrequest.findByIdAndUpdate(id,req.body,{new:true})
    console.log(response);
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }

})


router.get('/viewanc/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    let response=await Announcement.find({companyId:id})
    console.log(response);
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewloc',async(req,res)=>{
    try{
    console.log(req.body);
    let response=await Addlocation.find({Status:'Accepted'})
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

router.get('/viewhiringreq/:id',async(req,res)=>{
    try{
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
}
catch(e){
    res.json(e.message)
}
})

router.get('/viewhiringdetail/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    let response=await Hiringrequest.findById(id)
    console.log(response)
    let hiring=await Seekers.findById(response.userId)
    let anc=await Announcement.findById(response.ancId)
    res.json({response,hiring,anc})
    }
    catch(e){
        res.json(e.message)
    }
})

router.put('/manageHiring/:id',async (req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Hiringrequest.findByIdAndUpdate(id,req.body)
    console.log(response);
    }
    catch(e){
        res.json(e.message)
    }
})

router.put('/managelocreq/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Locationreq.findByIdAndUpdate(id,req.body)
    console.log(response);
    }
    catch(e){
        res.json(e.message)
        }
    
})

router.get('/viewlocreq/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(req.body);
    let response=await Locationreq.find()
    console.log(response)
    // res.json(response)
    let resposedata=[];
    for (const newrespose of response){
        let hiring=await Seekers.findById(newrespose.hiringId);
        let anc=await Announcement.findById(newrespose.Filmname);
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
}
catch(e){
    res.json(e.message)

}
})

router.get('/viewlocreqd/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    let response=await Locationreq.findById(id)
    console.log(response)
    let hiring=await Seekers.findById(response.hiringId)
    let anc=await Announcement.findById(response.Filmname)
    let loc=await Addlocation.findById(response.locationId)
    res.json({response,hiring,anc,loc})
    // let resposedata=[];
    // for (const newrespose of response){
    //     let hiring=await Seekers.findById(newrespose.hiringId);
    //     let anc=await Announcement.findById(newrespose.Filmname);
    //     let loc=await Addlocation.findById(newrespose.locationId)
    //     resposedata.push({
    //         hiring:hiring,
    //         anc:anc,
    //         loc:loc,
    //         req:newrespose
    //     });
    // }
    // console.log(resposedata)
    // res.json(resposedata)
    }
    catch(e){
        res.json(e.message)
    }
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


router.get('/viewprogress/:id',async(req,res)=>{
    try{
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
}
catch(e){
    res.json(e.message)
}
})









// router.get('/viewsponshistory/:id', async (req, res) => {
//     let id = req.params.id;
//     console.log(id);
//     let events = await Event.find({ orphanageId: id });
//     console.log(events);
//     let responseData = [];
//     let processedEvents = new Set(); // Set to track processed event IDs

//     for (let x of events) {
//         // Check if the event is already processed
//         if (processedEvents.has(x._id)) {
//             continue; // Skip processing if the event is already processed
//         }

//         let eventProcessed = false;

//         let purposes = await Purpose.find({ eventId: x._id });
//         for (let y of purposes) {
//             let sponsor = await Sponsosrship.find({ purposeId: y._id });
//             for (let z of sponsor) {
//                 let organizations = await User.findById(z.organizationId);
//                 responseData.push({
//                     purpose: y,
//                     sponsor: z,
//                     organization: organizations,
//                     event: x
//                 });
//                 eventProcessed = true;
//             }
//         }

//         // If at least one purpose was found for the event, mark the event as processed
//         if (eventProcessed) {
//             processedEvents.add(x._id);
//         }
//     }
//     console.log(responseData);
//     res.json(responseData);
// });




export default router
