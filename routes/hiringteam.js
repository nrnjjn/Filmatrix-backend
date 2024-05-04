import express, { json } from 'express'
import Addjob from '../models/addjob.js';
import Announcement from '../models/announcement.js';
import Hiringrequest from '../models/hiringreq.js';
import Locationreq from '../models/locationfcreq.js';
import Addlocation from '../models/addlocation.js';
import Seekers from '../models/seekers.js';
import Payment from '../models/payment.js';
import jobrequest from '../models/jobrequest.js';
import Addpreviouswork from '../models/addpreviouswork.js';
import Locationbooking from '../models/locationbooking.js';
import { upload } from '../multer.js';
import Hiringpreviouswork from '../models/hiringpreviouswork.js';
const router=express()

router.post('/addjob', async (req, res) => {
    try {
      console.log(req.body);
      const { companyId, ...jobData } = req.body; // Extract companyId from req.body
      const newAddjob = new Addjob({ ...jobData, companyId }); // Include companyId in the job data
      const savedAddjob = await newAddjob.save();
      res.json({ message: "New Job", savedAddjob });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  



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

router.delete('/deletejob/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Addjob.findByIdAndDelete(id)
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
    try{
    let id=req.params.id
    console.log(id);
    let response=await Announcement.findById(id)
    console.log(response)
    res.json(response)
}
catch(e){
    res.json()
}

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

router.get('/viewlocreqd/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    let response=await Locationbooking.findById(id)
    let fcreq=await Locationreq.findById(response.Fcreq)
    console.log(response)
    res.json({response,fcreq})
}
catch(e){
    res.json()
}
})


router.put('/locationfeedback/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Locationbooking.findByIdAndUpdate(id,req.body,{new:true})
    console.log(response);
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }

})

router.post('/locationbooking', async (req, res) => {
    try {
        let id = req.params.id;
        console.log(req.body);
        
        // Extract total from Fcreq
        let total = req.body.Fcreq.total;

        // Create a new Locationbooking instance with the extracted total
        const newLocationbooking = new Locationbooking({ ...req.body, total });

        // Save the new Locationbooking instance to the database
        const savedLocationbooking = await newLocationbooking.save();

        // Send a response with the saved Locationbooking data
        res.json({ message: "Location booking request", savedLocationbooking });
    } catch (e) {
        // If an error occurs, send a JSON response with the error message
        res.json(e.message);
    }
});

router.get('/viewlocationbooking/:id',async(req,res)=>{
    try{
        let id=req.params.id
        let response=await Locationbooking.find({hiringId:id})
        console.log(response);
        let responsedata=[];
        for (const newresponse of response){
            let film=await Announcement.findById(newresponse.ancId);
            let loc=await Addlocation.findById(newresponse.locationId);
            let fcreq=await Locationreq.findById(newresponse.Fcreq);
            responsedata.push({
                film:film,
                loc:loc,
                fcreq:fcreq,
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




router.get('/hiringreqq',async(req,res)=>{
    try{
        let response=await Hiringrequest.find()
        console.log(response)
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})






router.put('/hiringprogress/:id',async(req,res)=>{
    try{
    console.log('server');
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



router.get('/viewfilmprogress/:id',async(req,res)=>{
    try{
        let id=req.params.id
    console.log(req.body);
    let response=await Hiringrequest.find({userId:id})
    console.log(response);
    let responsedata=[];
    for (const newresponse of response){
        let film=await Announcement.findById(newresponse.ancId);
        responsedata.push({
            film:film,
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

router.put('/payment/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body);
    let response=await Locationbooking.findByIdAndUpdate(id,req.body,{new:true})
    console.log(response);
})


// router.post('/addpayment/:id',async(req,res)=>{
//     try{
//         console.log(req.body);

//         let data=await Addlocation.findById(req.body.locationownerId);

//         if(data){
//             let id=req.params.id
//             const newpayment = new Payment({...req.body,locationownerId:data.userId})
//             const savedpayment = await newpayment.save();
//             res.json({message:"New payment",savedpayment})
//         }
//         }
//     catch(e)
//         {
//         res.json(e.message)
//         }
// })



router.get('/viewjobreq/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(req.body);
    let job=await Addjob.find({userId:id})
    let responsedata=[];
    for (const newresponse of job){
        let request=await jobrequest.find({jobId:newresponse._id})
        for(const j of request){
            let seeker=await Seekers.findById(j.sId);
            let jobb=await Addjob.findById(j.jobId);
            let hiring=await Seekers.findById(jobb.userId)
            let anc=await Announcement.findById(jobb.ancId)
            responsedata.push({
                seeker:seeker,
                jobb:jobb,
                hiring:hiring,
                anc:anc,
                status:j.Status,
                date:j.Date,
                req:j
                
            })
        }

    }
    console.log(responsedata)
    res.json(responsedata)
}
catch(e){
    res.json(e.message)
}
})

router.get('/seekerreqd/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        console.log(id);
        let response=await jobrequest.findById(id)
        console.log(response);
        let seeker=await Seekers.findById(response.sId)
        res.json({response,seeker})
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewpwk/:id',async(req,res)=>{
    try{
    console.log(req.body);
    let response=await Addpreviouswork.find()
    console.log(response)
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewpwkd/:id',async(req,res)=>{
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

// router.put('/managejobreq/:id', async (req, res) => {
//     try {
//         let id = req.params.id;
//         console.log(id);
//         console.log(req.body, 'hskjhkjhkjhkjs');
//         let jobreq = await jobrequest.findById(id);
//         let response = await jobrequest.findByIdAndUpdate(id, req.body);
//         console.log(req.body, 'bodyyyyyy');
//         console.log(req.body.Status, '---------------');
//         console.log(jobreq, '=====================');
//         if (req.body.Status === 'Accepted') {
//             console.log('fffffffffff');
//             let newjob = await Addjob.findById(jobreq.jobId);
//             let updatedVacancy = newjob.Vacancy - 1;
//             if (updatedVacancy >= 0) {
//                 let job = await Addjob.findByIdAndUpdate(jobreq.jobId, { Vacancy: updatedVacancy });
//                 console.log(job, '---------------------------');
//             } else {
//                 console.log('Vacancy cannot be negative');
//             }
//         }
//         console.log(response);
//     } catch (e) {
//         res.json(e.message);
//     }
// });


router.put('/managejobreq/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const jobReqData = req.body;
        
        // Update the job request
        const updatedJobReq = await jobrequest.findByIdAndUpdate(id, jobReqData, { new: true });
        
        if (!updatedJobReq) {
            return res.status(404).json({ error: 'Job request not found' });
        }

        // Check if status is 'Accepted'
        if (jobReqData.Status === 'Accepted') {
            // Find the corresponding job
            const newJob = await Addjob.findById(updatedJobReq.jobId);
            if (!newJob) {
                return res.status(404).json({ error: 'Job not found' });
            }
            
            // Decrease the job's vacancy count
            newJob.Vacancy -= 1;
            if (newJob.Vacancy < 0) {
                return res.status(400).json({ error: 'Vacancy cannot be negative' });
            }

            // Save the updated job
            await newJob.save();
        }

        res.json(updatedJobReq);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/addpwk',upload.single('Image'),async(req,res)=>{
    try{
        console.log(req.file);
        let imagepath=req.file.filename
        const newPreviouswork = new Hiringpreviouswork({...req.body,Image:imagepath})
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
    let response=await Hiringpreviouswork.find({userId:id})
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
    let response=await Hiringpreviouswork.findById(id)
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
    let response=await Hiringpreviouswork.findByIdAndUpdate(id,req.body)
}
catch(e){
    res.json(e.message)
}
})

router.delete('/deletepreviouswork/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Hiringpreviouswork.findByIdAndDelete(id)
})


export default router