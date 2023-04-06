// External Dependancies
const boom = require('boom')
const { Configuration, OpenAIApi } = require("openai");
// Get Data Models
const Car = require('../../../Modals/sample/example/exampleModal');
const axios = require('axios');
const apiKey = "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";   //"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"  //"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";
const client = axios.create({
    headers: { 'Authorization': 'Bearer ' + apiKey }
});
const fastify = require('fastify')();
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
//const { nanoid } = require('nanoid');



// Get all videos
exports.cutVideo = async function(req,res){
  try{
    const { url, times } = req.body;
    // download the file
    const videoFile = await axios({
      url,
      responseType: 'stream'
    });
    const videoPath = './video.mp4';
    videoFile.data.pipe(fs.createWriteStream(videoPath));
    // random uploading link
    // const uploadId = nanoid();
    // const uploadUrl = `https://example.com/upload/${uploadId}`;

    // cutting the video based on time stamp
    const uploadPromises = times.map(async (time, index) => {
      const outputName = `video_${index}.mp4`;
      const outputPath = `./${outputName}`;
      const duration = time.end - time.start;

      await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .setStartTime(time.start)
            .setDuration(duration)
            .output(outputPath)
            .on('end', resolve)
            .on('error', reject)
            .run();
      });

      // Upload the resulting video to the generated upload URL
      const videoData = fs.createReadStream(outputPath);
      const formData = new FormData();
      formData.append('video', videoData);
      await axios.post(uploadUrl, formData, {
        headers: formData.getHeaders()
      });
    });

    await Promise.all(uploadPromises);
    res.code(200).send({
      status: 'success',
      uploadUrl
    });

  }catch(err){
    res.code(500).send({
      status: 'error',
      message: err.message
    });
  }
}

exports.getCars = async (req, reply) => {
  try {
    // const configuration = new Configuration({
    // apiKey: "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",
    // });

    //const uniqueTT = require('api')('@elai/v1.0#4vn24l38ksx1u');
    // retrieve the completion text from response
   // const completion = response.data.choices[0].text;
//
//    const params = {
//     "model":"text-davinci-003",
//   "prompt": "Tell me something about data engineering",
//   "max_tokens": 150
// }
//
// const res = await client.post('https://api.openai.com/v1/completions', params)
//   return {status:true, data:res.data.choices[0].text }
    const timeStamp = [];
    let start = 0;
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://apis.elai.io/api/v1/videos/videoId',
      headers: {accept: 'application/json', Authorization: 'Bearer SECRET_KEY'}
    };

    axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          for(let dataObj of response?.data?.slides){
            timeStamp.push({start:start,
              end:dataObj?.approxDuration
            });
            start+=dataObj?.approxDuration;
          }
        })
        .catch(function (error) {
          console.error(error);
        });

    const video = await new ffmpeg("filename.mp4");
    const outputFilename = `cut-${Date.now()}.mp4`;


    // const axios = require('axios');
    // const options = {
    //   method: 'POST',
    //   url: 'https://apis.elai.io/api/v1/videos/generate/text',
    //   headers: {
    //     accept: 'application/json',
    //     'content-type': 'application/json',
    //     Authorization: 'Bearer 63DfmUXS6Yz6wSRkIHnqjnF8yvxAIcc6'
    //   },
    //   data: {from: "hiiiii my name is chat gpt i am there to help yo", templateId: '642d6b9449f44050e02b4d96',waitForVideo: false}
    // };
    // axios
    //     .request(options)
    //     .then(function (response) {
    //       console.log("response  -->  ",response.data);
    //     })
    //     .catch(function (error) {
    //       console.error(error);
    //     });
    // const cars = await Car.find()
    // return cars

    // const sdk = require('api')('@elai/v1.0#4vn24l38ksx1u');
    // sdk.auth('Bearer  63DfmUXS6Yz6wSRkIHnqjnF8yvxAIcc6');
    // sdk.generateFromText({from: 'string', templateId: `642d6b9449f44050e02b4d96`, waitForVideo: false})
    //     .then(({ data }) => console.log(data))
    //     .catch(err => console.error(err));
  } catch (err) {
    // console.log(err,"error")
    throw boom.boomify(err)
  }
}


// Get single car by ID
exports.getSingleCar = async (req, reply) => {
  try {
    const id = req.params.id
    const car = await Car.findById(id)
    return car
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new car
exports.addCar = async (req, reply) => {
  try {
    const car = new Car(req.body)
    return car.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing car
exports.updateCar = async (req, reply) => {
  try {
    const id = req.params.id
    const car = req.body
    const { ...updateData } = car
    const update = await Car.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a car
exports.deleteCar = async (req, reply) => {
  try {
    const id = req.params.id
    const car = await Car.findByIdAndRemove(id)
    return car
  } catch (err) {
    throw boom.boomify(err)
  }
}