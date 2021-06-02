let userCredential = null
let google = document.getElementById("google")
let content = document.getElementById("content")
let userCred = document.getElementById("userCred")
let userImg = document.getElementById("userimg")
let logout = document.getElementById("logout")
function googleLogin(){
    let provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    try {
        firebase.auth().signInWithPopup(provider)
            .then(user=>{
                console.log(user)
                userCredential = user
            })
    } catch (e) {
        console.log(e.message)
    }
    checkUser()
}

google.addEventListener("click", googleLogin)

function checkUser(){
    try {
        firebase.auth().onAuthStateChanged(user=>{
            google.style.display = user !== null ? "none" : "block"
            console.log("UserCredential:", userCredential)
            content.style.display = user!== null ? "block" : "none"
            userCred.className = user !== null ? "d-flex" : ""
            userImg.src = user !== null ? user.photoURL : ""
            
        })
    } catch (e) {
        console.log(e.message)
    }
}

checkUser()


function googleLogOut(){
    firebase.auth().signOut().then(()=>{
        userCredential = null
     checkUser()
    })
}

logout.addEventListener("click", googleLogOut)