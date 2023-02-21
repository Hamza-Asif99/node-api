
function checkDepartmentValidity(deptNumber){
    let validDepartments = [1,2,3]
    if(validDepartments.includes((parseInt(deptNumber)))){
        return true
    }
    return false
}

module.exports = checkDepartmentValidity