import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html',
             styleUrls: ['./home.component.css']
          })

export class HomeComponent implements OnInit {

  public static priceDataUrl:string = "https://mczuylydvf.execute-api.ap-south-1.amazonaws.com/dev/priceData";

  // public static priceDataUrl:string = "http://localhost:3000/priceData";

  constructor(private http: HttpClient,public router:Router) {}

  ngOnInit(): void {

    this.welcomeMessageDisplay();                               // Displaing the welcome message
    localStorage.accessed = "Y";

    
    if(!this.loggedin()){                                           // Checking the login status
      window.location.href = "/login";
    }

    var userIcon = localStorage.getItem('token');                                           // Setting the username as a tooltip
    document.getElementById("userIcon").innerHTML = userIcon.charAt(0).toUpperCase();
    document.getElementById("tooltip").innerHTML = "Logged in as " + userIcon;

    this.slide();                                                     // Running the auto image slider
    window.setInterval(this.slide, 23000);

    this.getTodayData();
  }


  welcomeMessageDisplay(){

    if(localStorage.accessed == "N"){

      setTimeout(function(){ 

        document.getElementById("openMessage").style.opacity = "1";
    
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    
        document.getElementById("body").style.opacity = "0.3";}, 2000);

        var userIcon = localStorage.getItem('token');
        document.getElementById("desTopic").innerHTML = "Welcome " + userIcon + "!";
        document.getElementById("page").style.opacity = "1";  
    }

    else{
      document.getElementById("openMessage").style.visibility = "hidden";
    }
  }
  

  loggedin(){
    return localStorage.getItem('token');
  }


  logout(){

    var message = confirm("Do you really want to log out from your account?");
    if(message == true) {

      localStorage.removeItem('token');
      window.location.href = "/login";
    } 
  }


  loginNav(){

    var message = confirm("You will be logged out from your account! Please confirm..");
    if(message == true) {

      localStorage.removeItem('token');
      window.location.href = "/login";
    } 
  }


  signupNav(){

    var message = confirm("You will be logged out from your account! Please confirm..");
    if(message == true) {

      localStorage.removeItem('token');
      window.location.href = "/register";
    } 
  }


  closeMessage(){
    document.getElementById("openMessage").style.height = "0";
    document.getElementById("body").style.opacity = "1";
    document.getElementById("openMessage").style.opacity = "0";
  }


  openNav() {
    document.getElementById("mySidenav").style.width = "380px";
  }
  

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


  slide(){

    setTimeout(function(){

      document.getElementById("slide2").style.position = "absolute" ;
      document.getElementById("slide2").style.marginLeft = "-1510px" ; }, 1000);

    setTimeout(function(){

      document.getElementById("slide1").style.position = "absolute" ;
      document.getElementById("slide1").style.marginLeft = "0px" ; }, 1000);

    setTimeout(function(){

      document.getElementById("slide1").style.position = "absolute" ;
      document.getElementById("slide1").style.marginLeft = "-1510px" ; }, 4000);

    setTimeout(function(){

      document.getElementById("slide3").style.position = "absolute" ;
      document.getElementById("slide3").style.marginLeft = "0px" ; }, 4000);

    setTimeout(function(){

      document.getElementById("slide3").style.position = "absolute" ;
      document.getElementById("slide3").style.marginLeft = "-1510px" ; }, 8000);

    setTimeout(function(){

      document.getElementById("slide4").style.position = "absolute" ;
      document.getElementById("slide4").style.marginLeft = "0px" ; }, 8000);

    setTimeout(function(){

      document.getElementById("slide4").style.position = "absolute" ;
      document.getElementById("slide4").style.marginLeft = "1500px" ; }, 12000);

    setTimeout(function(){

      document.getElementById("slide3").style.position = "absolute" ;
      document.getElementById("slide3").style.marginLeft = "0px" ; }, 12000);

    setTimeout(function(){

      document.getElementById("slide3").style.position = "absolute" ;
      document.getElementById("slide3").style.marginLeft = "1500px" ; }, 16000);

    setTimeout(function(){

      document.getElementById("slide1").style.position = "absolute" ;
      document.getElementById("slide1").style.marginLeft = "0px" ; }, 16000);

    setTimeout(function(){

      document.getElementById("slide1").style.position = "absolute" ;
      document.getElementById("slide1").style.marginLeft = "1500px" ; }, 20000);

    setTimeout(function(){

      document.getElementById("slide2").style.position = "absolute" ;
      document.getElementById("slide2").style.marginLeft = "0px" ; }, 20000);
  }


  search(item){

    var userInput = item.value.toUpperCase();

    if(userInput != ""){

      if("BEANS".includes(userInput)) {

        window.location.href = "/vegetables#cardSet1";
      }

      else if("CARROT".includes(userInput)) {

        window.location.href = "/vegetables#cardSet1";
      }


      else if("LEEKS".includes(userInput)) {

        window.location.href = "/vegetables#cardSet1";
      }

      else if("BEETROOT".includes(userInput)) {

        window.location.href = "/vegetables#cardSet2";
      }

      else if("KNOLKHOL;".includes(userInput)) {

        window.location.href = "/vegetables#cardSet2";
      }

      else if("CABBAGE".includes(userInput)) {

        window.location.href = "/vegetables#cardSet2";
      }

      else if("TOMATO".includes(userInput)) {

        window.location.href = "/vegetables#cardSet3";
      }

      else if("LADIES FINGERS".includes(userInput)) {

        window.location.href = "/vegetables#cardSet3";
      }

      else if("BRINJALS".includes(userInput)) {

        window.location.href = "/vegetables#cardSet3";
      }

      else if("PUMPKIN".includes(userInput)) {

        window.location.href = "/vegetables#cardSet4";
      }

      else if("CUCUMBER".includes(userInput)) {

        window.location.href = "/vegetables#cardSet4";
      }

      else if("BITTER GOURD".includes(userInput)) {

        window.location.href = "/vegetables#cardSet4";
      }

      else if("GREEN CHILIES".includes(userInput)) {

        window.location.href = "/vegetables#cardSet5";
      }

      else if("POTATO".includes(userInput)) {

        window.location.href = "/vegetables#cardSet5";
      }

      else if("BANANA".includes(userInput)) {

        window.location.href = "/fruits#card1";
      }

      else if("PAPAYA".includes(userInput)) {

        window.location.href = "/fruits#card2";
      }

      else if("AVOCADO".includes(userInput)) {

        window.location.href = "/fruits#card3";
      }

      else if("MANGO".includes(userInput)) {

        window.location.href = "/fruits#card4";
      }

      else if("LIME".includes(userInput)) {

        window.location.href = "/fruits#card5";
      }

      else if("PINEAPPLE".includes(userInput)) {

        window.location.href = "/fruits#card6";
      }
      else{
        alert("Invalid input! Please make sure to add a valid key word.");
      }
    }
    else{
      alert("Enter a Keyword for search!");
    }
  }


  allData:any;

  getTodayData(){

    var date = "";
    var beansPrice = 0;
    var carrotPrice = 0;
    var leeksPrice = 0;
    var beetrootPrice = 0;
    var knolkholPrice = 0;
    var cabbagePrice = 0;
    var tomatoPrice = 0;
    var ladiesFingersrice = 0;
    var brinjalsPrice = 0;
    var pumpkinPrice = 0;
    var cucumberprice = 0;
    var bitterGourdPrice = 0;
    var greenChiliesPrice = 0;
    var potatoPrice = 0;

    var bananaPrice = "";
    var papayaPrice = "";
    var avocadoPrice = "";
    var mangoPrice = "";
    var limePrice = "";
    var pineapplePrice = "";

    this.http.get(HomeComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
      
      date = this.allData[0].date;
      beansPrice = this.allData[0].today 
      carrotPrice = this.allData[1].today 
      leeksPrice = this.allData[2].today 
      beetrootPrice = this.allData[3].today
      knolkholPrice = this.allData[4].today 
      cabbagePrice = this.allData[5].today 
      tomatoPrice = this.allData[6].today 
      ladiesFingersrice = this.allData[7].today 
      brinjalsPrice = this.allData[8].today 
      pumpkinPrice = this.allData[9].today 
      cucumberprice = this.allData[10].today 
      bitterGourdPrice = this.allData[11].today 
      greenChiliesPrice = this.allData[12].today 
      potatoPrice = this.allData[14].today 

      bananaPrice = this.allData[15].today + " / 1kg" + "<br>" + "(± " + this.allData[15].error + ")";
      papayaPrice = this.allData[16].today + " / 1kg" + "<br>" + "(± " + this.allData[16].error + ")";
      avocadoPrice = this.allData[19].today + " / 1kg" + "<br>" + "(± " + this.allData[19].error + ")";
      mangoPrice = this.allData[18].today + " / 1kg" + "<br>" + "(± " + this.allData[18].error + ")";
      limePrice = this.allData[13].today + " / 1kg" + "<br>" + "(± " + this.allData[13].error + ")";
      pineapplePrice = this.allData[17].today + " / 1kg" + "<br>" + "(± " + this.allData[17].error + ")";


      document.getElementById("subTopic").innerHTML = "List of Items for Predicted price for Today (" + date + ")";
      document.getElementById("beans").innerHTML = "LKR " + beansPrice + " / 1kg" + "<br>" + "(± " + this.allData[0].error + ")";
      document.getElementById("carrot").innerHTML = "LKR " + carrotPrice + " / 1kg" + "<br>" + "(± " + this.allData[1].error + ")";
      document.getElementById("leeks").innerHTML = "LKR " + leeksPrice + " / 1kg" + "<br>" + "(± " + this.allData[2].error + ")";
      document.getElementById("beetroot").innerHTML = "LKR " + beetrootPrice + " / 1kg" + "<br>" + "(± " + this.allData[3].error + ")";
      document.getElementById("knolkhol").innerHTML = "LKR " + knolkholPrice + " / 1kg" + "<br>" + "(± " + this.allData[4].error + ")";
      document.getElementById("cabbage").innerHTML = "LKR " + cabbagePrice + " / 1kg" + "<br>" + "(± " + this.allData[5].error + ")";
      document.getElementById("tomato").innerHTML = "LKR " + tomatoPrice + " / 1kg" + "<br>" + "(± " + this.allData[6].error + ")";
      document.getElementById("ladiesfingers").innerHTML = "LKR " + ladiesFingersrice + " / 1kg" + "<br>" + "(± " + this.allData[7].error + ")";
      document.getElementById("brinjals").innerHTML = "LKR " + brinjalsPrice + " / 1kg" + "<br>" + "(± " + this.allData[8].error + ")";
      document.getElementById("pumpkin").innerHTML = "LKR " + pumpkinPrice + " / 1kg" + "<br>" + "(± " + this.allData[9].error + ")";
      document.getElementById("cucumber").innerHTML = "LKR " + cucumberprice + " / 1kg" + "<br>" + "(± " + this.allData[10].error + ")";
      document.getElementById("bittergourd").innerHTML = "LKR " + bitterGourdPrice + " / 1kg" + "<br>" + "(± " + this.allData[11].error + ")";
      document.getElementById("greenchilies").innerHTML = "LKR " + greenChiliesPrice + " / 1kg" + "<br>" + "(± " + this.allData[12].error + ")";
      document.getElementById("potato").innerHTML = "LKR " + potatoPrice + " / 1kg" + "<br>" + "(± " + this.allData[14].error + ")";

      document.getElementById("banana").innerHTML = "LKR " + bananaPrice;
      document.getElementById("papaya").innerHTML = "LKR " + papayaPrice;
      document.getElementById("avocado").innerHTML = "LKR " + avocadoPrice;
      document.getElementById("mango").innerHTML = "LKR " + mangoPrice;
      document.getElementById("lime").innerHTML = "LKR " + limePrice;
      document.getElementById("pineapple").innerHTML = "LKR " + pineapplePrice;
    });    
  }
}