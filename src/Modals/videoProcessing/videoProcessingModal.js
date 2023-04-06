// External Dependancies
const mongoose = require("mongoose");

const videoProcessingSchema = new mongoose.Schema({
    video_dump: { type: Object },
    video_dump_draft: { type: Object },
    video_dump_ready: {type : Object},
    video_dump_failed:  {type: Object},
},{timestamps:true});


module.exports = mongoose.model("videoprocessing", videoProcessingSchema);
