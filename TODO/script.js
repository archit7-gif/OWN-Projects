



const inputbox = document.querySelector("#input-box")
const listContainer = document.querySelector("#list-container")


function addTask(){
if(inputbox.value === ""){
    alert("you must write some thing")
}
else{
    let list = document.createElement("li")
    list.innerHTML = inputbox.value;
    listContainer.appendChild(list)

    let span = document.createElement('span')
    span.innerHTML="\u00d7"

    list.appendChild(span)
}
inputbox.value = ""
savedata()
}




listContainer.addEventListener('click',function(details){
    if(details.target.tagName === 'LI'){
        details.target.classList.toggle("checked");
        savedata()
    }
    else if(details.target.tagName === "SPAN"){
        details.target.parentElement.remove();
        savedata()
    }

},false)




function savedata(){
    localStorage.setItem("data",listContainer.innerHTML)
}



function ShowTask(){
    listContainer.innerHTML = localStorage.getItem("data")
}

ShowTask()