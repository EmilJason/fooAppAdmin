let foodName = document.getElementById("foodName")
let price = document.getElementById("price")
let fileimg = document.getElementById("fileimg")
let save = document.getElementById("save")
let tableData = document.getElementById("tableData")
function checkName(){ 
    let validFood = foodName.value !== "" ? "is-valid" : "is-invalid"
    foodName.classList.toggle(validFood)
}
function checkPrice(){
    let validPrice = price.value !== "0" ? "is-valid" : "is-invalid"
    price.classList.toggle(validPrice)
}

foodName.addEventListener("change", checkName)
price.addEventListener("change", checkPrice)

function saveToFirebase(){
    let db = firebase.firestore()
    let storage = firebase.storage()
    
    try {
        let imgRef = storage.ref()
        let uploadTask = imgRef.child(`images/${fileimg.files[0].name}`).put(fileimg.files[0])
        uploadTask.on("state_changed",snapshot=>{
            console.log("saving")
        },e=>console.log(e.message),
        ()=>{
            uploadTask.snapshot.ref.getDownloadURL().then(url=>{
                db.collection("food").add({
                    name: foodName.value,
                    price: price.value,
                    imgUrl: url,
                    availability: true
                }).then(()=>console.log("Saved to database"))
            })
        })
    } catch (e) {
        console.log(e.message)
    }
}

save.addEventListener("click",saveToFirebase)

function loadData(){
    let db = firebase.firestore()
    
    try {
        db.collection("food").get()
        .then(snapshot=>{
            snapshot.forEach(item=>{
                let tr = document.createElement("tr")
                let tdName = document.createElement("td")
                let tdPrice = document.createElement("td")
                let tdAvail = document.createElement("td")
                let tdUrl = document.createElement("td")
                
                tdName.innerText = item.data().name
                tdPrice.innerText = item.data().price
                tdAvail.innerText = item.data().availability
                tdUrl.innerText = item.data().imgUrl
                
                tr.append(tdName)
                tr.append(tdPrice)
                tr.append(tdAvail)
                tr.append(tdUrl)
                
                tableData.append(tr)
            })
        })
    } catch (e) {
        console.log(e.message)
    }
}
loadData()

document.addEventListener("click",event=>{
    console.log(event.pageX,event.pageY)
})