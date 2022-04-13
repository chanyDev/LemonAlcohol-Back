const mongoose = require('mongoose');

const { Schema } = mongoose;

const meetingSchema = new Schema({
  title: {
    type: String,
  },
  contents: {
    type: String,
  },
  writer: {
    nickname: {
      type: String,
    },
    profileImg: {
      type: String,
    },
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  meetingDate: {
    type: String,
  },
  meetingTime: {
    type: String,
  },
  totalNumber: {
    type: String,
  },
  attendMember: {
    type: [String],
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    placeName: String,
    addressName: String,
    coordinates: [Number],
  },
  view: {
    type: Number,
    default: 0,
  },
});

meetingSchema.statics.findNearMeeting = async function (lon, lat) {
  const meeting = await this.find({
    location: {
      $near: {
        $maxDistance: 2000,
        $geometry: {
          type: 'Point',
          coordinates: [lon, lat],
        },
      },
    },
  });
  return meeting;
};

meetingSchema.index({ location: '2dsphere' });

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
