const boom = require('boom')
const videoProcessingRepositoryStorage = require("../../Modals/videoProcessing/videoProcessingModalRepository");
const {saveDraftWebHook} = require("../../UseCases/courses/CourseUseCases");

exports.testWebhook = async function(req,res){
    try{
        console.log(req.body, "req\n\n.....req");
        const videoProcessingRepository = new videoProcessingRepositoryStorage();
        if(req?.body?.error === null && req?.body?.event === 'video_generated'){
            const savedVideoProcess = saveDraftWebHook(videoProcessingRepository,{video_dump:req.body})
        }
        else if(req?.body?.error === null && req?.body?.event === 'video_ready'){
            const savedVideoProcess = saveDraftWebHook(videoProcessingRepository,{video_dump:req.body})
        }
        else{
            const savedVideoProcess = saveDraftWebHook(videoProcessingRepository,{video_dump:req.body})
        }
        return{ status:true }
    }
    catch (err){
        console.log(err)
    }
}
