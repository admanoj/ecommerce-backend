const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE,{
    useNewurlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify:true
})
.then(()=>console.log('database connected'))
.catch((err)=>console.log(err))