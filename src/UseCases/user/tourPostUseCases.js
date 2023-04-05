exports.listUserTourPosts = async (UserPostModalRepository, filter, start,limit) => {
    try{
        const listedUserTourPosts = await UserPostModalRepository.list(filter,{ createdAt: -1 }, start, limit);
        return listedUserTourPosts;
    }
    catch(err){
        return err;
    }
}

exports.saveUserTourPosts = async (UserPostModalRepository,data) => {
    try{
        const savedUserTourPosts = await UserPostModalRepository.save(data);
        return savedUserTourPosts;
    }
    catch(err){
        return err;
    }
}

exports.increaseAPostLikeByOne = async (UserPostModalRepository,post_id) => {
    try{
        const increasedAPostLikeByOne = await UserPostModalRepository.updateOne({_id:post_id}, { $inc :{likes:1}});
        return increasedAPostLikeByOne;
    }
    catch(err){
        return err;
    }
}

exports.decreaseAPostLikeByOne = async (UserPostModalRepository,post_id) => {
    try{
        const decreasedAPostLikeByOne = await UserPostModalRepository.updateOne({_id:post_id}, { $inc :{likes:-1}});
        return decreasedAPostLikeByOne;
    }
    catch(err){
        return err;
    }
}