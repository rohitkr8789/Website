const img =document.getElementById('img')
img.addEventListener('mouseover',function(){
    img.style.top =Math.round(Math.random()*80)+"%"
    img.style.left =Math.round(Math.random()*80)+"%"
})