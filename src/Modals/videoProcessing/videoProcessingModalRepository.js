const { MainClass } = require("../../Modals/MainClass/MainClass");
const videoProcessingModal = require("./videoProcessingModal")
const VideoProcessingModalRepository = class videoProcessingModalRepository extends MainClass{
    constructor() {
        super(videoProcessingModal);
        this.model = videoProcessingModal
    }
};

module.exports =  VideoProcessingModalRepository;