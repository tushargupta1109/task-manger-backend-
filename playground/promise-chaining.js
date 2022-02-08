require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate('61f1bff4f70df2a89e8c66e9',{age:1}).then((user)=>{
//     console.log(user);
//     return User.countDocuments({age:1})
// }).then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log(e);
//})

const updateAgeandCount = async (id, age) => {
  await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeandCount("61f1bff4f70df2a89e8c66e9", 3)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
