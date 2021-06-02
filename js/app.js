let btnNewFood = document.getElementById("btnNewFood")
let newFood = document.getElementById("newFood")
let btnClose = document.getElementById("btnClose")
let isNewFoodOpen = false

function openNewFood(){
    isNewFoodOpen = true
    checkIsOpen()
}

function closeNewFood(){
    isNewFoodOpen = false
    checkIsOpen()
}

function checkIsOpen(){
    newFood.style.display = isNewFoodOpen ? "block" : "none"
}

btnNewFood.addEventListener("click",openNewFood)
btnClose.addEventListener("click",closeNewFood)