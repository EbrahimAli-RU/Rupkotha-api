const mongoose = require("mongoose");

const searchingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  search: [
    {
      photo: {
        type: String,
      },
      topic_title: {
        type: String,
      },
    },
  ],
});

const Searching = mongoose.model("searching", searchingSchema);

module.exports = Searching;
