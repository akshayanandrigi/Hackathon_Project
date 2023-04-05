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

// Get all cars
exports.getCars = async (req, reply) => {
  try {
    // const configuration = new Configuration({
    // apiKey: "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",
    // });


    // retrieve the completion text from response
   // const completion = response.data.choices[0].text;

   const params = {
    "model":"text-davinci-003",
  "prompt": "Tell me something about data engineering", 
  "max_tokens": 150
}

const res = await client.post('https://api.openai.com/v1/completions', params)
  return {status:true, data:res.data.choices[0].text }
    // const cars = await Car.find()
    // return cars
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