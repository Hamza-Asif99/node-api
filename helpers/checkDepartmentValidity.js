//this function checks to see if the department id searched for by the user
// is in the list of valid possible ids or not
function checkDepartmentValidity(deptNumber){
    let validDepartments = [1,2,3]
    if(validDepartments.includes((parseInt(deptNumber)))){
        return true
    }
    return false
}

module.exports = checkDepartmentValidity