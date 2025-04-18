
var elem = document.querySelectorAll(".elem")

elem.forEach(function(val){
   val.childNodes[3]

   val.addEventListener('mouseenter',function(){
   val.childNodes[3].style.opacity = 1
   })

   val.addEventListener('mouseleave',function(){
   val.childNodes[3].style.opacity = 0
   })

   val.addEventListener('mousemove',function(details){
   val.childNodes[3].style.left = details.x + "px"
   val.childNodes[3].style.top = details.y + "px"
    })
})





// var elemIMG = document.querySelector("#elem1 img") 


// elem1.addEventListener('mousemove',function(details){
//     elemIMG.style.left = details.x + "px"
//      elemIMG.style.top = details.y + "px"
// })

// elem1.addEventListener('mouseenter',function(details){
//     elemIMG.style.opacity = 1
// })

// elem1.addEventListener('mouseleave',function(details){
//     elemIMG.style.opacity = 0
// })