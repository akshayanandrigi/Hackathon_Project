const boom = require("boom");

//repository storage
const UserPostModalRepositoryStorage = require("../../../Modals/User/TourPost/userTourPostModalRepository");

//Use cases
const { listUserTourPosts, saveUserTourPosts } = require("../../../UseCases/user/tourPostUseCases");

exports.getUserTourPost = async (take, give) => {
    try {

      const UserPostModalRepository = new UserPostModalRepositoryStorage();

      const listedUserTourPost = await listUserTourPosts(UserPostModalRepository,{user:take.user.userId},take?.query?.start || 0,take?.query?.limit || 10);
      
      return listedUserTourPost;
    } catch (err) {
      throw boom.boomify(err);
    }
  };

exports.saveTheUserTourPost = async (take, give) => {
    try {
      const tourPlan = await take.body.tourPlan.map((item)=>{
        return{
          from:item.from,
          to:item.to,
          images:item.images,
          travel_type:item.travelType,
          start_date_time:item.startDateTime,
          end_date_time:item.endDateTime,
          food:{
            items:item.food.items,
            selected_item:item.food.selectedItem,
            cost:item.food.cost
          }
        }
      });

      const data = {
          user: take.user.userId,
          from:take.body.from,
          to: take.body.to,
          budget:take.body.budget,
          start_date_time:take.body.startDateTime,
          end_date_time:take.body.endDateTime,
          is_travelling:take.body.isTravelling,
          travel_plan:tourPlan,
          privacy:take.body.privacy
      }
      const UserPostModalRepository = new UserPostModalRepositoryStorage();
      const savedTheUserTourPost = await saveUserTourPosts(UserPostModalRepository,data);
      return savedTheUserTourPost;
    } catch (err) {
      throw boom.boomify(err);
    }
  };