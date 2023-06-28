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
    
});

const Subject = mongo.model("subject", SubjectSchema);
module.exports = Subject;