
//catch all 404
function catch404(req, res, next){
    res.status(404).send("404- Route does not exist")
}

module.exports = catch404