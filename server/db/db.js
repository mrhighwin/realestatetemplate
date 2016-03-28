var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds021689.mlab.com:21689/test_haiwen');

var Todo = mongoose.model('Todo', {
    checked: Boolean,
    description: String
});

var User = mongoose.model('User', {
    username: String,
    password: String,
    propertyList: [String],
});

User.find({ username: 'aa' }, function(err, data) {
    if (err)
        console.log(err);
    else {
        console.log(data)
        console.log("found bitch");
    }
});

// User.update({ username: 'aa' }, {$set : {category: '98'}});

User.findOne({username: 'aa'}, function (err, doc) {
	console.log(doc);
	console.log(doc.propertyList[0]);
	doc.propertyList.push('s'); 
	doc.save();
});

// User.find({ username: 'aa' }, function(err, data) {
//     if (err)
//         console.log(err);
//     else {
//         console.log(data)
//         console.log("found bitch");
//     }
// });
module.exports.Todo = Todo;
module.exports.User = User;