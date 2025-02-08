const mongoose= require('mongoose');
const {  Schema } =mongoose;

const activitySchema = new mongoose.Schema({
  action: String,
  entity: String,
  timestamp: { type: Date, default: Date.now },
});

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
