const mongoose = require('mongoose');
const schema = mongoose.Schema;

var ImageSchema = new schema({
    imageName:{
        type: String,
        default: "none",
        required: true
    },
    imageData:{
        type: String,
        required: true
    } 
});

var Image = mongoose.model('Image',ImageSchema);
module.exports = Image;