const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Food65:Qwer%401234@cluster0.imqjmfj.mongodb.net/FoodSaga?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB connected successfully!");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    const data2 = await foodCategory.find({}).toArray();

    global.food_items = data;
    global.foodCategory = data2;

    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = mongoDB;
