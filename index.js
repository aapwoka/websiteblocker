
var toBlockSites = document.getElementById('urlsites');
var password = document.getElementById('password');
var passwordrepeat = document.getElementById('passwordrepeat')
var btnBlock = document.getElementById('block-btn');
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCONjWQcYKJc4sNSZk_i9ViJ4RM3IrBfY0",
  authDomain: "siteblocker-f42f7.firebaseapp.com",
  databaseURL: "https://siteblocker-f42f7-default-rtdb.firebaseio.com",
  projectId: "siteblocker-f42f7",
  storageBucket: "siteblocker-f42f7.appspot.com",
  messagingSenderId: "322580396422",
  appId: "1:322580396422:web:32233efba827bf4b25d407",
  measurementId: "G-9D9D06R195"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const dbRef = firebase.database().ref()

//Working on Sign Up
function checkUserEmail(){
   var userEmail = document.getElementById("signUpEmail");
   var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   var flag;
   if(userEmail.value.match(userEmailFormate)){
       flag = false;
   }else{
       flag = true;
   }
   if(flag){
       window.alert("Please check your email")
   }else{
       return null
   }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
   var userPassword = document.getElementById("signUpPassword");
   var passwordRepeat = document.getElementById("signUpPasswordRepeat")
   //var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
  if(userPassword.value === passwordRepeat.value){
   return userPassword
  }else{
   window.alert("Passwords do not match")
  }
}

function signUp(){

   var userEmail = document.getElementById("signUpEmail").value;
   var userPassword = document.getElementById("signUpPassword").value;
    
   var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    

   var checkUserEmailValid = userEmail.match(userEmailFormate);

   if(checkUserEmailValid == null){
       return checkUserEmail();
   }else{
       firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
           var user = firebase.auth().currentUser;
           var uid;
           if (user != null) {
               uid = user.uid;
           }
           
//Each individual user account should register with their specific databases
           window.alert("Succesfully Signed Up")
       })
   }
}

//Sign In Form 
function checkSignInEmail(){
   var userSIEmail = document.getElementById("signInEmail");
   var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   var flag;
   if(userSIEmail.value.match(userSIEmailFormate)){
       flag = false;
   }else{
       flag = true;
   }
   if(flag){
      window.alert("Check your email")
   }else{
       return userSIEmail
   }
}

//Check email or password exsist in firebase authentication   
function signIn(){
   var userSIEmail = document.getElementById("signInEmail").value;
   var userSIPassword = document.getElementById("signInPassword").value;
   var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;     

   var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);

   if(checkUserEmailValid == null){
       return checkSignInEmail();
   }else{
       firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword)
       .then((success) => {
           window.alert("Succesfully Signed In")
           firebase.auth().onAuthStateChanged(user => {
               if(user) {
                 window.location = 'home.html'; 
               }
             })
       })
    
   }
}

//Adding to respective user

         //Add website

   function addElement() {
   
   const dbRef = firebase.database().ref()    
   var Site = document.getElementById("urlsites")
   var password = document.getElementById("password")
   
   var user = firebase.auth().currentUser;
   var uid;
   if (user != null) {
       uid = user.uid;
   }
                    
   let newWeb = {
            BlockedSite: Site.value,
            SitePassword: password.value
               }; 
                
            dbRef.child(uid,'websites').set(newWeb)
         }

if(localStorage.getItem('BlockSites') ==null){
     var sitesToBlock = [];
  }else{
sitesToBlock=JSON.parse(localStorage.getItem('BlockSites'));
}

function getSites(){
   return{
      site:toBlockSites.value,
      sitePassword:password.value
   }
}

function addis(){
   if (password.value===passwordrepeat.value){
      sitesToBlock.push(getSites())

      localStorage.setItem('BlockSites',JSON.stringify(sitesToBlock));
      window.alert(`${toBlockSites.value} Successfully blocked`)
      return sitesToBlock
   }else
     {
         window.alert("passwords dont match")
         return null
     }
};


var siteLoaded = document.getElementById('urls');
var test = document.getElementById('test');


var sitesToBlock2 = [...sitesToBlock]

function end(){
   let href = window.location.href;
  console.log(href)
       if(sitesToBlock2.includes(href)){
            document.body.innerHTML=`
           <div style="direction: ltr; position: fixed; top:0; z-index:999999; display:block; width:100%; height:100%; background:red;">
           <p style="position:relative; top:40%; display:block; font-size:50px; font-weight:bold; color:#fff; margin:0 auto; text-align:center;">
           The Website ${href} Blocked!</p>
           </div>
           `
       }
}

//function crush(){

//btnClick = document.getElementById("btnclick");
//bod = document.getElementById("bodey");
 
//$(bod).keypress(function(event){
  // if(event.keyCode ===15){
      //e.preventDefault();//stops default action for the key pressed
     // $(btnClick).click();
  //}
//});


//$(btnClick).click(function(){
   //alert("Button clicked.You fucking did it!");
//});

//}


//for(i=0; i<sitesToBlock.length;){
    // console.log(i)
//}




//function remove(){
   //let sited = getSite.value
   //let passwordUnblock = getPassword.value
//if (sitesToBlock.includes({sited, passwordUnblock})){
///function arrayRemove(arr, value) { 
    
   //return arr.filter(function(ele){ 
      //return ele != value; 
   //});
 //}
 //for(i=0; i<sitesToBlock.length;){
    //console.log(i)
   ///var result = [...sitesToBlock]
  // result = arrayRemove(sitesToBlock, index[{sited, passwordUnblock}=i]);
//}

//console.log(result)
//}else{
    //console.log("Check site or password")
//}
//}
//var breef = sitesToBlock[0,1]

//function arrayRemove(arr, value) { 
    
   //return arr.filter(function(ele){ 
      // return ele != value; 
   //});
//}
function remover(){
sitesToBlock.map((entity)=>{
   var daraSite = entity.sites
   if (daraSite.includes(getSite.value)){
      delete sitesToBlock [getSite.value]
   }else{
      console.log('check site name')
   }
})
}




var getSite = document.getElementById("getSite")
var getPassword = document.getElementById("getPassword")

function remove(){
   var x = {
      site:getSite.value,
      sitePassword:getPassword.value
   }

sitesToBlock.map((entity)=>{
   for(var i=0; i<sitesToBlock.length; i++){
     // if(sitesToBlock.includes(x)){
         if(entity === x){
            //sitesToBlock.splice(i,x);
            delete sitesToBlock[i,x]
            i--;
            return sitesToBlock
         //}
      }
   }
})
console.log(sitesToBlock)
}
console.log(sitesToBlock)
