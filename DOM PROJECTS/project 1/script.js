

let main = document.querySelector(".main")

let cursor = document.querySelector(".cursor")


main.addEventListener('mousemove',function(alldetails){
    cursor.style.left = alldetails.x + "px"
    cursor.style.top = alldetails.y + "px"
})