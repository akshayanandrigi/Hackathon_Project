exports.listLikeTourPosts = async (UserLikePostModalRepository,postId,start,limit,) => {
    try{
        const listedLikesTourPosts = await UserLikePostModalRepository.list({post:postId},{ createdAt: -1 }, start, limit,"user");
        return listedLikesTourPosts;
    }
    catch(err){
        return err;
    }
}

exports.saveTheLikeTourPosts = async (UserLikePostModalRepository,data) => {
    try{
        const listedLikesTourPosts = await UserLikePostModalRepository.save(data);
        return listedLikesTourPosts;
    }
    catch(err){
        return err;
    }
}

exports.checkForUserAlreadyLiked = async (UserLikePostModalRepository,data) => {
    try{
        const checkedForUserAlreadyLiked = await UserLikePostModalRepository.findOne(data);
        return checkedForUserAlreadyLiked;
    }
    catch(err){
        return err;
    }
}

exports.deleteLikeOfUserPost = async (UserLikePostModalRepository,data) => {
    try{
        const deletedLikeOfUserPost = await UserLikePostModalRepository.hardDeleteOne(data);
        return deletedLikeOfUserPost;
    }
    catch(err){
        return err;
    }
}

