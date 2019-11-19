/* intial time */
let StartTime = performance.now(); 
  let  EndTime ;
  let current ;
  let m_arr = [];
let first_card;
let starCount = 0;
let move = 0;
let end = 0;
let crd = document.getElementsByClassName('card'); // crd = card  get it by class name 
// var Mytimer ;
 /* Create a list that holds all of your cards   " m_obj " */

let m_obj= ["fa fa-bicycle" , "fa fa-bicycle","fa fa-diamond","fa fa-diamond", "fa fa-bomb","fa fa-bomb", "fa fa-cube" ,"fa fa-cube",
 "fa fa-paper-plane-o", "fa fa-paper-plane-o",  "fa fa-anchor", "fa fa-anchor", "fa fa-bolt","fa fa-bolt","fa fa-leaf", "fa fa-leaf" ];

let actualCard = document.querySelectorAll(".card i"),
 star = document.querySelectorAll(".stars li i"),
myTimer = document.getElementById("mytimer"); // timer

document.addEventListener("DOMContentLoaded", function () {  /* load elements and  remove it */
    add();
   setInterval(SetTimer,700); 
    document.querySelector(".moves").textContent = "0 moves";
    setTimeout(function () {

        for (let i = 0; i < crd.length; i++) {
            crd[i].classList.remove("open", "show", "match");
    } 
    }, 7000); // start play after 7 second
    });

/* click to start the game */
document.querySelector(".restart").addEventListener("click", function () {
    location.reload();
});

/* shuffle all elements && open the cards */

function add() {
    m_obj = shuffle(m_obj); 
    for (let i = 0; i < m_obj.length; i++) {

        actualCard[i].className = m_obj[i];
    }
    for (let i = 0; i < crd.length; i++) {
        crd[i].classList.add("open", "show", "match");
     } }

function SetTimer(){
       myTimer.style.cssText="margin-left :5%";
    let EndTime =performance.now(); 
    current=((EndTime - StartTime) / 1000).toFixed(0)-4;  //4 seconds until its load
    
    if(current<0){
        myTimer.textContent="0 seconds";
    }
    if(current>0){
       myTimer.textContent= current + " seconds";
    }
    }

/* before start the game */
document.querySelector(".moves").textContent = 0;

/* loop all elemtns */ 
for (let i = 0; i < actualCard.length; i++) {
     
     /* click event listener to all cards */  
    crd[i].addEventListener("click", function () {

        /* click on isn`t the same and the length of temporary array is 0 */
        if (m_arr.length === 0 && !crd[i].classList.contains("match")) {
            m_arr [0] = actualCard[i].className; /*store the clicked class name  */
           first_card = crd[i]; /* store the card that contains this element */
           crd[i].classList.add("open", "show"); /* open card */
                end++; 
            } 
            /* click the second card it appear and make sure he doesn't click on it twice */
         else if (m_arr .length === 1 && first_card != crd[i] && !crd[i].classList.contains("match")) {
           m_arr [1] = actualCard[i].className;
          crd[i].classList.add("open", "show");
            move++;
         
        if (m_arr [0].toString() === m_arr [1].toString()) {     /*if it match*/
         crd[i].classList.add("match", "rubberBand"); /* RubberBand Animation */
              first_card.classList.add("match", "rubberBand");
              m_arr  = [];
                end++;
                 }

            else {              /*if it do not match */

               crd[i].classList.add("show", "shake"); /* shake animation */
               first_card.classList.add("shake");
               crd[i].style.backgroundColor = "#f00";
               first_card.style.backgroundColor = "#f00";
                setTimeout(function () {
                    crd[i].classList.remove("open", "show", "shake");
                  first_card.classList.remove("open", "show", "shake");
                   crd[i].style.backgroundColor = "";
                    first_card.style.backgroundColor = "";
                }, 300);
                end--;
             m_arr  = [];
            }
        }
       
        document.querySelector(".moves").textContent = move+" moves";  /* set new click */
         if (move >= 10 && move<=18) {                              /* cahnge the star by click */
            star[2].className = "";
            starCount = 2;
        }
        else if (move >= 19) {
            star[1].className = "";
            starCount = 1;
        }
        
        if (end === 16) {                             /* call the done method */
            EndTime = performance.now();             // end game // clculate time
            done();
        }

    });
}
//done our game
function done() {
  document.querySelector(".container").style.display = "none";
    let div = document.createElement("DIV");
    document.body.appendChild(div);
    div.setAttribute("class", "fa fa-check");
    div.style.cssText = "color: rgb(157, 255, 0); font-size: 4em;margin-left: 10%; padding: 8px; background-color: #9dff006b;border-radius: 10%;";

    let win = document.createElement("H1"),
   text = document.createTextNode("Congratulation");
    win.appendChild(text);
    document.body.appendChild(win);

    let p = document.createElement("P"),
   txt = document.createTextNode("with " + move + " moves " + starCount + " stars and " + current + "seconds"); /* number of stars and moves */
    p.appendChild(txt);
    document.body.appendChild(p);
    p.style.cssText = "padding: 10px; margin-left: 6%; color: #7FFFD4;";

    /* button */
    let btn = document.createElement("BUTTON"),
     t = document.createTextNode("try Again");
    btn.appendChild(t);
    document.body.appendChild(btn);
    document.body.style.cssText = "margin: 19% 35%;"
    /* btn style css */
   btn.style.cssText = "text-align: center;margin-left: 10%;border: none;background-color: #917;border-radius: 4%;padding: 10px 8px;cursor: pointer; color: #fff;";

    btn.addEventListener("click", function () {    /* when click on btn */
  location.reload();
 });
}

// Shuffle function from http://stackoverflow.com/a/2450976
/*  array parametter */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
 return array;
}