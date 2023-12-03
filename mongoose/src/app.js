const mongoose= require("mongoose");

const mongo_url= "mongodb://127.0.0.1:27017/anshukrmandal"
mongoose.connect(mongo_url)
.then( ()=>{console.log("connection successful")})
.catch((err) =>{console.log(err)});

const playlistSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true,
        minLength : 2,
        maxLength : 30,
        lowercase : true,
        trim : true        
    },
ctype : {
    type : String,
    required : true,
    lowercase : true,
    enum : ["frontend", "backend", "database"]
},
    videos : {
        type : Number,
        min : 10
    },
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
            const jsPlaylist = new Playlist({
            name : "Python",
            ctype : "Backend",
            videos : 20,
            author : "thapa technicals",
            active : true
        })

        const doc = await Playlist.insertMany([jsPlaylist]);// for inserting many docs at once ,uses insertMany function of the collection "playlist"
        // const doc = await reactPlaylist.save();//for single insertion , reactplaylist is the name of the const
        console.log(doc)
    }catch(err){
        console.log(err)
    }
};
// insertdoc();

//reading documents from the database
const getdoc = async ()=>{
    try {
        // const result = await Playlist.find()
        // const result = await Playlist.find({author : "thapa technicals"}).select({name:1}).limit(1)
        const result = await Playlist
        .find()
        // .find({$nor :[{ctype : "Front end"} , {videos : {$gt : 82}}]})
        // .find({videos : {$not : {$eq : 82}}})
        // .find({ctype : {$in : ["Front end","Database"]}})
        // .find({videos : {$gt : 50}})
        .select({name:1})
        // .sort({name:-1})
        // .countDocuments()
        console.log(result)
        } catch (err) {
        console.log(err)
        }
}
// getdoc();

//update documents

const updateDocument = async(_id) =>{
    try {
        const result = await Playlist.updateOne({_id} ,{
        // const result = await Playlist.findByIdAndUpdate({_id} ,{
            $set : {
                name: "Django"
            }
        })
        console.log(result)//gives old data as output in case of findByIdAndUpdate
    } catch (err) {
        console.log(err)
    }
   
}
// updateDocument('656b365503db93f110eea07e')

//delete documents

const deleteDocument = async(_id) =>{
    try {
        // const result = await Playlist.deleteOne({_id})
        const result = await Playlist.findByIdAndDelete({_id})
        console.log(result)
    } catch (err) {
        console.log(err)
    }
    
}

// deleteDocument('656a0c85bfeacc83edf05a4f')
