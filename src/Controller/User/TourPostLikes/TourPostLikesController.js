const boom = require("boom");

//repository storage
const UserLikesModalRepositoryStorage = require("../../../Modals/User/Likes/LikesModalRepository");
const UserPostModalRepositoryStorage = require("../../../Modals/User/TourPost/userTourPostModalRepository");

//Use cases
const { listLikeTourPosts, saveTheLikeTourPosts, checkForUserAlreadyLiked, deleteLikeOfUserPost } = require("../../../UseCases/user/likesTourPostUseCases");
const { increaseAPostLikeByOne, decreaseAPostLikeByOne } = require("../../../UseCases/user/tourPostUseCases");

exports.getLikesOfPosts = async (take, give) => {
    try {
      const postId = take.params.post_id;
      const {start,limit} = take.query;
      const UserLikesModalRepository = new UserLikesModalRepositoryStorage();
      const listedLikesOfPost = await listLikeTourPosts(UserLikesModalRepository,postId,start,limit);
      return listedLikesOfPost;
    } catch (err) {
      throw boom.boomify(err);
    }
  };

exports.saveLikeForAPost = async (take, give) => {
    try {
      const data = {user:take.user.userId,post:take.params.post_id}
      const UserLikesModalRepository = new UserLikesModalRepositoryStorage();
      const UserPostModalRepository = new UserPostModalRepositoryStorage();

      const checkForLikedPostByUser = await checkForUserAlreadyLiked(UserLikesModalRepository,data);
      if(!checkForLikedPostByUser){
        const savedLikesOfUserForPost = await saveTheLikeTourPosts(UserLikesModalRepository,data);
        const increasedAPostLike = await increaseAPostLikeByOne(UserPostModalRepository,data.post);
        return {status:true,message:"success like"}
      }
      else{ 
        const removedLikesOfUserForPost = await deleteLikeOfUserPost(UserLikesModalRepository,data);
        const subtractALikesOfUserPost = await decreaseAPostLikeByOne(UserPostModalRepository,data.post);
        return {status:true,message:"success unlike"}
      }
    } catch (err) {
      throw boom.boomify(err);
    }
  };