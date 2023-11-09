const fs = require("fs");

const name='anshu';
// fs.mkdirSync("test_folder");
// fs.writeFileSync('test_folder/text.txt','hello there');
// const read=fs.readFileSync('test_folder/text.txt','utf8');
// console.log(read)
// fs.renameSync('test_folder/text.txt','test_folder/mybio.txt')
// fs.appendFileSync("test_folder/mybio.txt","welcome to my world of coding")
// fs.unlink('test_folder', (err) => {
//     if (err) throw err;
//     console.log('mybio.txt was deleted');
//   });
fs.rmSync("test_folder", { recursive: true, force: true });