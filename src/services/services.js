import axios from 'axios'
const url = "http://13.59.25.246:4000"

export function registration(registrationData) {
    console.log("\n\n\tIn services for registration --->", registrationData)
    return axios.post(url + "/registration", registrationData)
}

export function login(loginData) { // login component
    console.log("\n\n\tIn service for login--->", loginData)
    return axios.post(url + "/login", loginData)
}

export function emailVerification(verificationToken) { // blank object is for data ... it understands second argument as headers
    console.log("\n\n\tIn services for email verification ", verificationToken)
    return axios.post(url + "/emailVerification", {}, {
        headers: {
            token: verificationToken
        }
    })
}

export function forgetPassword(forgetData) {
    console.log("\n\n\tIn services for forget password API", forgetData)
    return axios.post(url + "/forgetPassword", forgetData)
}

//post requires all the three arguments to be filled
export function resetPassword(resetData, token) {
    console.log("\n\n\tIn services for reset password API", resetData, token)
    return axios.post(url + "/resetPassword", resetData, {
        headers: {
            token: token
        }
    })
}

//post requires all the two arguments to be filled
export function allNotes(){
    const authenticationToken = localStorage.getItem('token')
    console.log("\n\n\t---> authentication token -->",authenticationToken);
    console.log("\n\n\tIn services for all notes API" , authenticationToken)
    return axios.get(url + "/allNotes",  {
        headers: {
            token: authenticationToken
        }
    })

}

export function allArchives(){
    const authenticationToken = localStorage.getItem('token')
    console.log("\n\n\tIn services for all archives API" , authenticationToken)
    return axios.get(url + "/allArchives",  {
        headers: {
            token: authenticationToken
        }
    })

}

export function allReminders(){
    const authenticationToken = localStorage.getItem('token')
    console.log("\n\n\tIn services for all Reminders notes API" , authenticationToken)
    return axios.get(url + "/allReminders",  {
        headers: {
            token: authenticationToken
        }
    })
}

export function allTrash(){
    const authenticationToken = localStorage.getItem('token')
    console.log("\n\n\tIn services for all Trash notes API" , authenticationToken)
    return axios.get(url + "/allTrash",  {
        headers: {
            token: authenticationToken
        }
    })
}


export function createNote(creationData) {
    const authenticationToken = localStorage.getItem('token')
    console.log("\n\n\tIn services for creating a note API", creationData,authenticationToken)
    return axios.post(url + "/createNote", creationData, {
        headers: {
            token: authenticationToken
        }
    })
}

export function allLabels(){
    const authenticationToken = localStorage.getItem('token')
    console.log("\n\n\tIn services for loading all labels API", authenticationToken)
    return axios.get(url + "/allLabels",  {
        headers: {
            token: authenticationToken
        }
    })
}

export function updateNote(updationData){
    const authenticationToken = localStorage.getItem('token')
    console.log("\n\n\tIn services for updating note API", authenticationToken)
    return axios.post(url + "/updateNote",updationData,  {
        headers: {
            token: authenticationToken
        }
    })
}

export function deleteNote(deletionData){
    const authenticationToken = localStorage.getItem('token')
    console.log("\n\n\tIn services for deleting note API", authenticationToken)
    return axios.post(url + "/deleteNote",deletionData,  {
        headers: {
            token: authenticationToken
        }
    })
}

export function addLabelOnNote(labelData){
    const authenticationToken = localStorage.getItem('token')
    console.log("\n\n\tIn services for adding label on note API", authenticationToken)
    return axios.post(url + "/addLabelOnNote",labelData,  {
        headers: {
            token: authenticationToken
        }
    })
}

export function deleteLabelOnNote(labelData){
    const authenticationToken = localStorage.getItem('token')
    console.log("\n\n\tIn services for deleting label on note API", authenticationToken)
    return axios.post(url + "/deleteLabelOnNote",labelData,  {
        headers: {
            token: authenticationToken
        }
    })
}

export function searchInNotes(searchData){
    const authenticationToken = localStorage.getItem('token')
    console.log("\n\n\tIn services for searching in notes API", authenticationToken)
    console.log("\n\n\tIn services data---->", searchData)

    return axios.post(url + "/search",searchData,  {
        headers: {
            token: authenticationToken
        }
    })
}

export function labelledNotes(labelName){
    const authenticationToken = localStorage.getItem('token')
    console.log(`\n\n\tIn services for loading all notes with label '${labelName}' ...\n\n\tToken-${authenticationToken}`)
    return axios.get(url + "/labelledNotes?labelName="+labelName,  {
        headers: {
            token: authenticationToken
        }
    })
}

export function createLabel(labelObject){
    const authenticationToken = localStorage.getItem('token')
    console.log(`\n\n\tIn services for creating a label`)
    return axios.post(url + "/createLabel", labelObject, {
        headers: {
            token: authenticationToken
        }
    })
}

export function deleteLabel(labelObject){
    const authenticationToken = localStorage.getItem('token')
    console.log(`\n\n\tIn services for deleting a label`)
    return axios.post(url + "/deleteLabel", labelObject, {
        headers: {
            token: authenticationToken
        }
    })
}

export function uploadImage(file){
    const authenticationToken = localStorage.getItem('token')
    console.log(`\n\n\tIn services for uploading image`)
    return axios.post(url + "/upload",file , {
        headers: {
            token: authenticationToken
        }
    })
}