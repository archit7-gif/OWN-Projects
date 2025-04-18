

let crsr = document.querySelector("#cursor")
let blurCursor = document.querySelector("#cursor-blur")

document.addEventListener("mousemove",function(details){
 crsr.style.left = details.x - 12.5 + "px"
 crsr.style.top = details.y + 10 + "px"
 blurCursor.style.left = details.x - 100 + "px"
 blurCursor.style.top = details.y -100 + "px"
 
})



let allH4 = document.querySelectorAll("#nav h4")
allH4.forEach(function(elements){
elements.addEventListener('mouseenter',function(){
    crsr.style.scale = 4
    crsr.style.border = "1px solid white"
    crsr.style.backgroundColor = 'transparent'
})

elements.addEventListener('mouseleave',function(){
    crsr.style.scale = 1
    crsr.style.border = "0px solid #95C11E"
    crsr.style.backgroundColor = "#95C11E"
})

})







gsap.to("#nav",{
    backgroundColor : "black",
    duration : 0.7,
    height : "90px",
    scrollTrigger : {
        trigger :"#nav",
        scroller :"body",
        start : "top -10%",
        end : "top -11%",
        scrub : 1 
    }
})

gsap.to("#main",{
    backgroundColor : "#000",
    scrollTrigger :{
        trigger : "#main",
        scroller : "body",
        start : "top -40%",
        end : "top -90%",
        scrub : 1.5  
    }
})




gsap.from("#about-us img, #about-us-in",{
    y:50,
    opacity: 0,
    duration : 1,
    stagger : 0.2,
    scrollTrigger:{
        trigger:"#about-us",
        scroller:"body",
      
        start : "top 70%",
        end:"top 60%",
        scrub: 3
    }
})



gsap.from(".cards",{
    scale : 0.8,
    opacity: 0,
    duration : 1,
    stagger : 0.4,
    scrollTrigger:{
        trigger:".cards",
        scroller:"body",
       
        start : "top 70%",
        end:"top 65%",
        scrub: 2
    }
})




gsap.from("#colon1",{
    y: -70,
    x: -70,
    scrollTrigger:{
        trigger: "#colon1",
        scroller: "body",
      
        start: "top 55%",
        end: "top 45%",
        scrub: 5
    }
})


gsap.from("#colon2",{
    y: 70,
    x: 70,
    scrollTrigger:{
        trigger: "#colon1",
        scroller: "body",
       
        start: "top 55%",
        end: "top 45%",
        scrub: 5
    }
})


gsap.from("#page4 h1",{
    y:50,
    scrollTrigger:{
        trigger: "#page4 h1",
        scroller: "body",
       
        start: "top 75%",
        end: "top 75%",
        scrub: 3
    }
})