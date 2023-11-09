const add =(a,b)=>{
    return a+b;
};
const sub = (a,b)=>{
    return a-b;
};
const name="anshu"
// module.exports=add;//for one module only

//second way
// module.exports.add=add;
// module.exports.sub=sub;

//third way 
module.exports={add , sub,name};
