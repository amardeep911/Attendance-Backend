const mongo = require("mongoose");

const SubjectSchema = new mongo.Schema({
    subjectName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    subjectCode: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    professorName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    days:{
        type:Array,
        required:true,
    },
    Attendence: [
        {
          date: {
            type: Date,
            required: false,
          },
          isPresent: {
            type: Boolean,
            default: false,
            required: false,
          },
        },
      ],
    
});

const Subject = mongo.model("subject", SubjectSchema);
module.exports = Subject;