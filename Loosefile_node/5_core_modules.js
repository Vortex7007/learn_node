const fs=require('fs');
// fs.writeFileSync("6_CRUD_fs.js","const name='vortex7007'");//synchronous system (not recomended by i am testing it anyways)

// fs.writeFileSync("6_CRUD_fs.js","just checking if it overwrites or not")//as expexted it overwrites everything , to not overwrite use appendFileSync

// fs.appendFileSync("6_CRUD_fs.js","\n const name='anshu'");

// const buff_data=fs.readFileSync("6_CRUD_fs.js");//gives output in buffer form(we get this datatype in network requests and readfile)
// const decoded_data = buff_data.toString();
// console.log(decoded_data);
fs.renameSync('6_file_system_CRUD.js','6_file_system.js');