const add=(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a<0 || b<0){
                return reject("number must be positive");
            }
            resolve(a+b);
        },2000)
    })
}

const dowork=async()=>{
    const sum1= await add(1,3);
    const sum2= await add(sum1,-5);
    return sum2;
}

dowork().then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})