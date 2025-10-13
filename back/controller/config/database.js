var mongoose=require('mongoose')

function database() {
    mongoose.connect('mongodb://localhost:27017/construction').then(()=>{
        console.log('connect sucessful');
    }).catch(err=>{
        console.error(err)

    })
    
}

module.exports=database