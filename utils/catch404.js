
//catch all 404
function catch404(req, res, next){
    res.status(404).send("Sorry can't find that!")
}

module.exports = catch404