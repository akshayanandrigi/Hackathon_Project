exports.findAUser = async (userRepository,id) => {
        try{
            const listedUsers = await userRepository.findOne({ _id: id });
            return listedUsers;
        }
        catch(err){
            return err;
        }
}

exports.saveAUser = async (userRepository, userDetails) => {
    try{
        const savedUser = await userRepository.save(userDetails);
        return savedUser;
    }
    catch(err){
        return err;
    }
}