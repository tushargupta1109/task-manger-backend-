require('../src/db/mongoose');
const Task=require('../src/models/task');

// Task.findByIdAndDelete('61f2e9400cddbb509c53e72e').then((task)=>{
//     console.log(task);
//     return Task.countDocuments({completed:false});
// }).then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log(e);
// })

const deletetaskandcount =async(id)=>{
    await Task.findByIdAndDelete(id);
    const count=await Task.countDocuments({completed:false});
    return count;
}

deletetaskandcount('61f2e9400cddbb509c53e72e').then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})