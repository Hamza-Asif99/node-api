//this function checks to see if the department id searched for by the user
// is in the list of valid possible ids or not
const {Employee} = require("../models");

function checkDepartmentValidity(deptNumber){
    let validDepartments = [1,2,3]
    if(validDepartments.includes((parseInt(deptNumber)))){
        return true
    }
    return false
}

//whatever routes implement pagination, they need to return data about the next, previous and total pages
//different routes use different queries to get different data. that is why we pass the query here which
// can be run to get the total instances of that resource
async function addPagesData(query,page,limit){

    //get total records
    let totalRecords = await Employee.find(query)
        .count()

    // get total pages
    let totalPages = totalRecords / limit
    let data ={}

    //add properties for pages
    data.totalPages = Math.ceil(totalPages)
    data.nextPage = parseInt(page)

    //if the next page is higher than total pages, cycle back and add nextPage as 1
    if(data.nextPage + 1 <= Math.ceil(totalPages) ){

        //if not, append next page by one
        data.nextPage += 1

        //if the next page is 2, we do not want to show previous page, which would be 0 here
        // and page 0 does not exist
        if(data.nextPage != 2) {

            data.prevPage = parseInt(page) - 1
        }

        //cycling back
    }else{
        data.nextPage = 1
    }

    return data
}

module.exports = {
    checkDepartmentValidity,
    addPagesData
}