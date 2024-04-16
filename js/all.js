//projekty 
const tl = gsap.timeline({
    paused: true
  });
  let path = document.querySelector("path");
  let spanBefore = CSSRulePlugin.getRule("#burger span:before");
  const dsa = document.querySelector('.over');
  gsap.set(spanBefore, {background: "#000"});
  
  
  const sa = document.querySelector('.menu');
  gsap.set(sa, {visibility: "hidden", zIndex: 2 });
  gsap.set(path, {zIndex: 1});
  
  
  
  
  
  function revealMenu(){
    revealMenuItems();
    const burger = document.getElementById("burger");
    const toggleBtn = document.getElementById("toggle-btn");
  
    toggleBtn.onclick = function (e){
      burger.classList.toggle
      ("active");
      tl.reversed(!tl.reversed());
      
    };
  }
  
  revealMenu();
  
  function revealMenuItems(){
    const start = "M0 502S175 272 500 272s500 230 500 230V0H0z";
    const end = "M0,1005S175,995,500,995s500,5,500,5V0H0Z";
  
      const power2 = "power2.inOut";
      const power4 = "power4.inOut";
  
      tl.to("#burger", 1.25,{
        marginTop: "5px",
        x: -40,
        y: 40,
        ease: power4,
      });
      tl.to("#burger span", 1,{
        background: "#e2e2dc",
        ease: power2,
      },
      "<"
    );
    tl.to(spanBefore, 1,{
      background: "#e2e2dc",
      ease: power2,
    },
    "<"
  );
  tl.to(".btn .btn-outline", 1.25,{
    x: -40,
    y: 40,
    width:"140px",
    height:"140px",
    border: "1px solid #e2e2dc",
    ease: power4,
  },
    "<"
  );
  tl.to(
    path, 0.6,{
      attr:{
        d: start,
      },
      ease: Power2.easeIn,
      visibility: "visible",
      zIndex: 2,
    },
    "<"
  ).to(
    path, .6,{
      attr:{
        d: end,
        zIndex: 2,
      },
      ease: Power2.easeOut,
      zIndex: 2,
    }, ".5");
    tl.to(".menu", 
    .8,
    {
      visibility: "visible",
      
    },
  ".65"
  );
  tl.to(".over", 
    .1,
    {
      visibility: "visible",
      zIndex: 2,
    },
  ".1"
  );
  tl.to(".menu-item > a",
   1,
   {
    top: 0,
    ease: "power2.out",
    stagger:{
      amount: 0.5,
    }
  },
  "-=1").reverse();
  } 
  
  //projekty
  CustomEase.create("cubic", "0.83, 0, 0.17, 1")
  let isAnimating = false;
  
  function splitTextIntoSpans(selector){
  let elements = document.querySelectorAll(selector);
  elements.forEach((element)=>{
    let text = element.innerText;
    let splitText = text
    .split("")
    .map(function(char){
      return `<span>${char === "" ? "&nbsp;nbsp;" : char}</span>`;
    })
    .join("");
    element.innerHTML = splitText;
  })
  }
  
  function inCard(){
  let cards = Array.from(document.querySelectorAll(".card"));
  gsap.to(cards, {
    y: (i) => -15 + 15*i + "%",
    z: (i) => 15 * i,
    duration: 1,
    ease: "cubic",
    stagger: -0.1,
  });
  }
  
  
  document.addEventListener("DOMContentLoaded", function(){
  splitTextIntoSpans(".copy h1");
  inCard();
  
  gsap.set(".copy h1 span", { y: -200});
  gsap.set(".slider .card:last-child h1 span", {y: 0});
  });
  
  //mobile 
  document.addEventListener("touchend", function(){
  if (isAnimating) return;
  isAnimating = true;
  let slider = document.querySelector(".slider");
  let cards = Array.from(slider.querySelectorAll(".card"));
  let lastCard = cards.pop();
  let nextCard = cards[cards.length - 1];
  
  
  gsap.to(lastCard.querySelectorAll(".copy h1 span"), {
    y: 200,
    duration: 0.75,
    ease: "cubic",
  });
  
  gsap.to(lastCard, {
    y: "+=150%",
    duration: 0.75,
    ease: "cubic",
    onComplete: () =>{
        slider.prepend(lastCard);
        inCard();
        gsap.set(lastCard.querySelectorAll(".copy h1 span", ".copy p span"), {y: -200});
  
        
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    },
  });
  
  gsap.to(nextCard.querySelectorAll(".copy h1 span",".copy p span"), {
    y: 0,
    duration: 1,
    ease: "cubic",
    stagger: 0.05,
  })
  });
  
  //pc
  document.addEventListener("dblclick", function(){
  if (isAnimating) return;
  isAnimating = true;
  let slider = document.querySelector(".slider");
  let cards = Array.from(slider.querySelectorAll(".card"));
  let lastCard = cards.pop();
  let nextCard = cards[cards.length - 1];
  
  
  gsap.to(lastCard.querySelectorAll(".copy h1 span"), {
    y: 200,
    duration: 0.75,
    ease: "cubic",
  });
  
  gsap.to(lastCard, {
    y: "+=150%",
    duration: 0.75,
    ease: "cubic",
    onComplete: () =>{
        slider.prepend(lastCard);
        inCard();
        gsap.set(lastCard.querySelectorAll(".copy h1 span", ".copy p span"), {y: -200});
  
        
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    },
  });
  
  gsap.to(nextCard.querySelectorAll(".copy h1 span",".copy p span"), {
    y: 0,
    duration: 1,
    ease: "cubic",
    stagger: 0.05,
  })
  });

  //about
