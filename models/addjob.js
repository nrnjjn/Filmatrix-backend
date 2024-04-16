import mongoose, { Schema, model } from "mongoose";
import Announcement from "./announcement.js";
import Hiring from "./seekers.js";
import JobRequest from "./jobrequest.js"; // Importing the JobRequest model

const addjobSchema = new Schema({
    ancId: {
        type: mongoose.Types.ObjectId,
        ref: Announcement
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: Hiring
    },
    Job: {
        type: String
    },
    Vacancy: {
        type: Number
    },
    Description: {
        type: String
    },
    category: {
        type: mongoose.Types.ObjectId
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

// Pre middleware hook to delete corresponding job requests before deleting the job
addjobSchema.pre('findOneAndDelete', async function (next) {
    try {
        const job = this._conditions._id; // Get the ID of the job being deleted
        await JobRequest.deleteMany({ jobId: job }); // Delete all job requests associated with the job
        next();
    } catch (error) {
        next(error);
    }
});

const Addjob = model('Addjob', addjobSchema);
export default Addjob;
