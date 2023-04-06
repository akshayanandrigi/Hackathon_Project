exports.saveDraftWebHook = async (videoProcessingModalRepository, query) => {
    try{
        const listedUserTourPosts = await videoProcessingModalRepository.save(query);
        return listedUserTourPosts;
    }
    catch(err){
        return err;
    }
}

exports.getVideoProcessingStatus = async (videoProcessingModalRepository, videoId) => {
    try{
        const listedUserTourPosts = await videoProcessingModalRepository.list({"video_dump.video._id" : videoId});
        return listedUserTourPosts;
    }
    catch(err){
        return err;
    }
}