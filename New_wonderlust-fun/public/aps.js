// side user icon hide div //
const loginDivparent=document.querySelector('nav .login .logo');
const loginDivchild=document.querySelector('nav .login .logo .login-hide');
let visible=false;
loginDivparent.addEventListener('click',function(){
   if (!visible)
   {
      loginDivchild.style.visibility="visible";
      visible=true;
   }
   else
   {
      loginDivchild.style.visibility="hidden";
      visible=false;
   }

})
 
// flash messages //
 function  Alert(ele)
 {
    if (ele)
    {
      ele.addEventListener('click',function(){
         for (let box of document.querySelectorAll(".listing-flash"))
         {
             box.style.display="none";
         }
      })
    }else 
    {
       console.log("Not accessd cross");
    }
 }
Alert(document.querySelector('.cross'));



//for add gst //
let toggleBtn=document.querySelector('#filters .tax-toggle .toggle input');
if (toggleBtn)
{
   toggleBtn.addEventListener('click',function(){
      //console.log("Hello");
      let allBtn=document.getElementsByClassName('gst');
      for (let Btn of allBtn)
      {
          if(Btn.style.display==='inline-block')
          {
             Btn.style.display='none';
          }
          else 
          {
             Btn.style.display='inline-block';
          }
      }
 })
}
else 
{
    console.log("not found");
}

/// navgigation system //
let hangburder=document.querySelector(".hangburger");
let sideNav=document.querySelector('.side-nav');
let blank=document.querySelector('.blank');
let xmark=document.querySelector('.x-mark');

hangburder.addEventListener('click',function(){
      console.log("Hello");
      sideNav.classList.add('side-nav-motion');
      blank.style.display="block";
      console.log("add");
})

xmark.addEventListener('click',function(){
   sideNav.classList.remove('side-nav-motion');
   blank.style.display="none";
   console.log("remove"); 
})