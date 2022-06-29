// home page

module.exports.home = (req, res)=>{
    try{
       return res.render('home',{
            title:'Home'
        })
    }
    catch(err){
        console.log(err, 'error in rendering home page');
        return;
    }
}