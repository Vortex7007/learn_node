const objec={
    name :"anshu",
    age : 20,
    class : "btech"
}
console.log(objec)
console.log(objec.name)
const jsondata=JSON.stringify(objec)
console.log(jsondata)
const objdata = JSON.parse(jsondata)
console.log(objdata.name)

