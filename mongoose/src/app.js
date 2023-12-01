const mongoose= require("mongoose");
// const MONGODB_URI_LOCAL=mongodb://localhost:27017/dbname
const mongo_url= "mongodb://127.0.0.1:27017/anshukrmandal"
mongoose.connect(mongo_url)
.then( ()=>{console.log("connection successful")})
.catch((err) =>{console.log(err)});

const playlistSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    ctype : String,
    videos : Number,
    author : String,
    active : Boolean,
    date: {
        type: Date,
        default : Date.now
    }
})

const Playlist = new mongoose.model("Playlist", playlistSchema);//playlist will be converted to playlists in mongodb collections...... also the name should be in pascal convention or we can say first letter capital because it's a class

// //creating document and insert
const insertdoc = async() =>{
    try{
        const reactPlaylist = new Playlist({
            name : "React JS2",
            ctype : "Front end",
            videos : 82,
            author : "thapa technicals",
            active : true
        })

        const doc = await reactPlaylist.save();
        console.log(doc)
    }catch(err){
        console.log(err)
    }
}
insertdoc()