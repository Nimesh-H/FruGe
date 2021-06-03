import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lowest-price',
  templateUrl: './lowest-price.component.html',
  styleUrls: ['./lowest-price.component.css']
})

export class LowestPriceComponent implements OnInit {

  public static priceDataUrl:string = "https://mczuylydvf.execute-api.ap-south-1.amazonaws.com/dev/priceData";

  // public static priceDataUrl:string = "http://localhost:3000/priceData";

  public static clickCount = 0;  

  constructor(private http: HttpClient,public router:Router) {}

  ngOnInit(): void {

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


  priceChange(value: string){

    switch(value) {
      case "today":
        this.getTodayData();
        break;
      case "tommorrow":
        this.getTommorrowData();
         break;
      case "nextWeek":
        this.getNextWeekData();
        break;
    }
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


  openPrice(){

    LowestPriceComponent.clickCount++;

    if(LowestPriceComponent.clickCount%2 == 0){
      document.getElementById("dropdownId").setAttribute( 'src', "assets/openBlack.png");
      document.getElementById("selection").style.width = "0px";
      document.getElementById("selection").style.visibility = "hidden";
    }

    else{
      document.getElementById("dropdownId").setAttribute( 'src', "assets/closeBlack.png");
      document.getElementById("selection").style.width = "200px";
      document.getElementById("selection").style.visibility = "visible";
      document.getElementById("selection").style.transition = "0.4s";
    }
  }


  allData:any;

  getTodayData(){

    var vegetablesPriceMin = 100;
    var fruitsPriceMin = 80;
    var imgSource = "assets/highPriceImage.jpg";


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

    var bananaPrice = 0;
    var papayaPrice = 0;
    var avocadoPrice = 0;
    var mangoPrice = 0;
    var limePrice = 0;
    var pineapplePrice = 0;

    this.http.get(LowestPriceComponent.priceDataUrl).toPromise().then(data => {

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

      bananaPrice = this.allData[15].today;
      papayaPrice = this.allData[16].today;
      avocadoPrice = this.allData[19].today;
      mangoPrice = this.allData[18].today;
      limePrice = this.allData[13].today;
      pineapplePrice = this.allData[17].today;

      document.getElementById("subTopic").innerHTML = "The Cheapest Items for Today (" + date + ")";

      if(beansPrice < vegetablesPriceMin){
        document.getElementById("beans").innerHTML = "LKR " + beansPrice + " / 1kg" + "<br>" + "(± " + this.allData[0].error + ")";
      }
      else{
        document.getElementById("beansCard").setAttribute( 'src', imgSource);
        document.getElementById("beans").innerHTML = "";
      }


      if(carrotPrice < vegetablesPriceMin){
        document.getElementById("carrot").innerHTML = "LKR " + carrotPrice + " / 1kg" + "<br>" + "(± " + this.allData[1].error + ")";
      }
      else{
        document.getElementById("carrotCard").setAttribute( 'src', imgSource);
        document.getElementById("carrot").innerHTML = "";
      }


      if(leeksPrice < vegetablesPriceMin){
        document.getElementById("leeks").innerHTML = "LKR " + leeksPrice + " / 1kg" + "<br>" + "(± " + this.allData[2].error + ")";
      }
      else{
        document.getElementById("leeksCard").setAttribute( 'src', imgSource);
        document.getElementById("leeks").innerHTML = "";
      }


      if(beetrootPrice < vegetablesPriceMin){
        document.getElementById("beetroot").innerHTML = "LKR " + beetrootPrice + " / 1kg" + "<br>" + "(± " + this.allData[3].error + ")";
      }
      else{
        document.getElementById("beetrootCard").setAttribute( 'src', imgSource);
        document.getElementById("beetroot").innerHTML = "";
      }


      if(knolkholPrice < vegetablesPriceMin){
        document.getElementById("knolkhol").innerHTML = "LKR " + knolkholPrice + " / 1kg" + "<br>" + "(± " + this.allData[4].error + ")";
      }
      else{
        document.getElementById("knolkholCard").setAttribute( 'src', imgSource);
        document.getElementById("knolkhol").innerHTML = "";
      }


      if(cabbagePrice < vegetablesPriceMin){
        document.getElementById("cabbage").innerHTML = "LKR " + cabbagePrice + " / 1kg" + "<br>" + "(± " + this.allData[5].error + ")";
      }
      else{
        document.getElementById("cabbageCard").setAttribute( 'src', imgSource);
        document.getElementById("cabbage").innerHTML = "";
      }


      if(tomatoPrice < vegetablesPriceMin){
        document.getElementById("tomato").innerHTML = "LKR " + tomatoPrice + " / 1kg" + "<br>" + "(± " + this.allData[6].error + ")";
      }
      else{
        document.getElementById("tomatoCard").setAttribute( 'src', imgSource);
        document.getElementById("tomato").innerHTML = "";
      }


      if(ladiesFingersrice < vegetablesPriceMin){
        document.getElementById("ladiesfingers").innerHTML = "LKR " + ladiesFingersrice + " / 1kg" + "<br>" + "(± " + this.allData[7].error + ")";
      }
      else{
        document.getElementById("ladiesfingersCard").setAttribute( 'src', imgSource);
        document.getElementById("ladiesfingers").innerHTML = "";
      }


      if(brinjalsPrice < vegetablesPriceMin){
        document.getElementById("brinjals").innerHTML = "LKR " + brinjalsPrice + " / 1kg" + "<br>" + "(± " + this.allData[8].error + ")";

      }
      else{
        document.getElementById("brinjalsCard").setAttribute( 'src', imgSource);
        document.getElementById("brinjals").innerHTML = "";
      }


      if(pumpkinPrice < vegetablesPriceMin){
        document.getElementById("pumpkin").innerHTML = "LKR " + pumpkinPrice + " / 1kg" + "<br>" + "(± " + this.allData[9].error + ")";
      }
      else{
        document.getElementById("pumpkinCard").setAttribute( 'src', imgSource);
        document.getElementById("pumpkin").innerHTML = "";
      }


      if(cucumberprice < vegetablesPriceMin){
        document.getElementById("cucumber").innerHTML = "LKR " + cucumberprice + " / 1kg" + "<br>" + "(± " + this.allData[10].error + ")";
      }
      else{
        document.getElementById("cucumberCard").setAttribute( 'src', imgSource);
        document.getElementById("cucumber").innerHTML = "";
      }


      if(bitterGourdPrice < vegetablesPriceMin){
        document.getElementById("bittergourd").innerHTML = "LKR " + bitterGourdPrice + " / 1kg" + "<br>" + "(± " + this.allData[11].error + ")";
      }
      else{
        document.getElementById("bittergourdCard").setAttribute( 'src', imgSource);
        document.getElementById("bittergourd").innerHTML = "";
      }


      if(greenChiliesPrice < vegetablesPriceMin){
        document.getElementById("greenchilies").innerHTML = "LKR " + greenChiliesPrice + " / 1kg" + "<br>" + "(± " + this.allData[12].error + ")";
      }
      else{
        document.getElementById("greenchiliesCard").setAttribute( 'src', imgSource);
        document.getElementById("greenchilies").innerHTML = "";
      }


      if(potatoPrice < vegetablesPriceMin){
        document.getElementById("potato").innerHTML = "LKR " + potatoPrice + " / 1kg" + "<br>" + "(± " + this.allData[14].error + ")";
      }
      else{
        document.getElementById("potatoCard").setAttribute( 'src', imgSource);
        document.getElementById("potato").innerHTML = "";
      }


      if(bananaPrice < fruitsPriceMin){
        document.getElementById("banana").innerHTML = "LKR " + bananaPrice + " / 1kg" + "<br>" + "(± " + this.allData[15].error + ")";
      }
      else{
        document.getElementById("bananaCard").setAttribute( 'src', imgSource);
        document.getElementById("banana").innerHTML = "";
      }


      if(papayaPrice < fruitsPriceMin){
        document.getElementById("papaya").innerHTML = "LKR " + papayaPrice + " / 1kg" + "<br>" + "(± " + this.allData[16].error + ")";
      }
      else{
        document.getElementById("papayaCard").setAttribute( 'src', imgSource);
        document.getElementById("papaya").innerHTML = "";
      }


      if(avocadoPrice < fruitsPriceMin){
        document.getElementById("avocado").innerHTML = "LKR " + avocadoPrice + " / 1kg" + "<br>" + "(± " + this.allData[19].error + ")";
      }
      else{
        document.getElementById("avocadoCard").setAttribute( 'src', imgSource);
        document.getElementById("avocado").innerHTML = "";
      }


      if(mangoPrice < fruitsPriceMin){
        document.getElementById("mango").innerHTML = "LKR " + mangoPrice + " / 1kg" + "<br>" + "(± " + this.allData[18].error + ")";
      }
      else{
        document.getElementById("mangoCard").setAttribute( 'src', imgSource);
        document.getElementById("mango").innerHTML = "";
      }


      if(limePrice < fruitsPriceMin){
        document.getElementById("lime").innerHTML = "LKR " + limePrice + " / 1kg" + "<br>" + "(± " + this.allData[13].error + ")";
      }
      else{
        document.getElementById("limeCard").setAttribute( 'src', imgSource);
        document.getElementById("lime").innerHTML = "";
      }


      if(pineapplePrice < fruitsPriceMin){
        document.getElementById("pineapple").innerHTML = "LKR " + pineapplePrice + " / 1kg" + "<br>" + "(± " + this.allData[17].error + ")";
      }
      else{
    
        document.getElementById("pineappleCard").setAttribute( 'src', imgSource);
        document.getElementById("pineapple").innerHTML = "";
      }
    });    
  }


  getTommorrowData(){

    var vegetablesPriceMin = 100;
    var fruitsPriceMin = 80;
    var imgSource = "assets/highPriceImage.jpg";


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

    var bananaPrice = 0;
    var papayaPrice = 0;
    var avocadoPrice = 0;
    var mangoPrice = 0;
    var limePrice = 0;
    var pineapplePrice = 0;

    this.http.get(LowestPriceComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
      
      date = this.allData[0].tomorrowDate;
      beansPrice = this.allData[0].tomorrow 
      carrotPrice = this.allData[1].tomorrow 
      leeksPrice = this.allData[2].tomorrow 
      beetrootPrice = this.allData[3].tomorrow
      knolkholPrice = this.allData[4].tomorrow 
      cabbagePrice = this.allData[5].tomorrow 
      tomatoPrice = this.allData[6].tomorrow 
      ladiesFingersrice = this.allData[7].tomorrow 
      brinjalsPrice = this.allData[8].tomorrow 
      pumpkinPrice = this.allData[9].tomorrow 
      cucumberprice = this.allData[10].tomorrow 
      bitterGourdPrice = this.allData[11].tomorrow 
      greenChiliesPrice = this.allData[12].tomorrow 
      potatoPrice = this.allData[14].tomorrow 

      bananaPrice = this.allData[15].tomorrow;
      papayaPrice = this.allData[16].tomorrow;
      avocadoPrice = this.allData[19].tomorrow;
      mangoPrice = this.allData[18].tomorrow;
      limePrice = this.allData[13].tomorrow;
      pineapplePrice = this.allData[17].tomorrow;

      
      document.getElementById("subTopic").innerHTML = "The Cheapest Items for Tommorrow (" + date + ")";


      if(beansPrice < vegetablesPriceMin){
        document.getElementById("beans").innerHTML = "LKR " + beansPrice + " / 1kg" + "<br>" + "(± " + this.allData[0].error + ")";
      }
      else{
        document.getElementById("beansCard").setAttribute( 'src', imgSource);
        document.getElementById("beans").innerHTML = "";
      }


      if(carrotPrice < vegetablesPriceMin){
        document.getElementById("carrot").innerHTML = "LKR " + carrotPrice + " / 1kg" + "<br>" + "(± " + this.allData[1].error + ")";
      }
      else{
        document.getElementById("carrotCard").setAttribute( 'src', imgSource);
        document.getElementById("carrot").innerHTML = "";
      }


      if(leeksPrice < vegetablesPriceMin){
        document.getElementById("leeks").innerHTML = "LKR " + leeksPrice + " / 1kg" + "<br>" + "(± " + this.allData[2].error + ")";
      }
      else{
        document.getElementById("leeksCard").setAttribute( 'src', imgSource);
        document.getElementById("leeks").innerHTML = "";
      }


      if(beetrootPrice < vegetablesPriceMin){
        document.getElementById("beetroot").innerHTML = "LKR " + beetrootPrice + " / 1kg" + "<br>" + "(± " + this.allData[3].error + ")";
      }
      else{
        document.getElementById("beetrootCard").setAttribute( 'src', imgSource);
        document.getElementById("beetroot").innerHTML = "";
      }


      if(knolkholPrice < vegetablesPriceMin){
        document.getElementById("knolkhol").innerHTML = "LKR " + knolkholPrice + " / 1kg" + "<br>" + "(± " + this.allData[4].error + ")";
      }
      else{
        document.getElementById("knolkholCard").setAttribute( 'src', imgSource);
        document.getElementById("knolkhol").innerHTML = "";
      }


      if(cabbagePrice < vegetablesPriceMin){
        document.getElementById("cabbage").innerHTML = "LKR " + cabbagePrice + " / 1kg" + "<br>" + "(± " + this.allData[5].error + ")";
      }
      else{
        document.getElementById("cabbageCard").setAttribute( 'src', imgSource);
        document.getElementById("cabbage").innerHTML = "";
      }


      if(tomatoPrice < vegetablesPriceMin){
        document.getElementById("tomato").innerHTML = "LKR " + tomatoPrice + " / 1kg" + "<br>" + "(± " + this.allData[6].error + ")";
      }
      else{
        document.getElementById("tomatoCard").setAttribute( 'src', imgSource);
        document.getElementById("tomato").innerHTML = "";
      }


      if(ladiesFingersrice < vegetablesPriceMin){
        document.getElementById("ladiesfingers").innerHTML = "LKR " + ladiesFingersrice + " / 1kg" + "<br>" + "(± " + this.allData[7].error + ")";
      }
      else{
        document.getElementById("ladiesfingersCard").setAttribute( 'src', imgSource);
        document.getElementById("ladiesfingers").innerHTML = "";
      }


      if(brinjalsPrice < vegetablesPriceMin){
        document.getElementById("brinjals").innerHTML = "LKR " + brinjalsPrice + " / 1kg" + "<br>" + "(± " + this.allData[8].error + ")";

      }
      else{
        document.getElementById("brinjalsCard").setAttribute( 'src', imgSource);
        document.getElementById("brinjals").innerHTML = "";
      }


      if(pumpkinPrice < vegetablesPriceMin){
        document.getElementById("pumpkin").innerHTML = "LKR " + pumpkinPrice + " / 1kg" + "<br>" + "(± " + this.allData[9].error + ")";
      }
      else{
        document.getElementById("pumpkinCard").setAttribute( 'src', imgSource);
        document.getElementById("pumpkin").innerHTML = "";
      }
      

      if(cucumberprice < vegetablesPriceMin){
        document.getElementById("cucumber").innerHTML = "LKR " + cucumberprice + " / 1kg" + "<br>" + "(± " + this.allData[10].error + ")";
      }
      else{
        document.getElementById("cucumberCard").setAttribute( 'src', imgSource);
        document.getElementById("cucumber").innerHTML = "";
      }


      if(bitterGourdPrice < vegetablesPriceMin){
        document.getElementById("bittergourd").innerHTML = "LKR " + bitterGourdPrice + " / 1kg" + "<br>" + "(± " + this.allData[11].error + ")";
      }
      else{
        document.getElementById("bittergourdCard").setAttribute( 'src', imgSource);
        document.getElementById("bittergourd").innerHTML = "";
      }


      if(greenChiliesPrice < vegetablesPriceMin){
        document.getElementById("greenchilies").innerHTML = "LKR " + greenChiliesPrice + " / 1kg" + "<br>" + "(± " + this.allData[12].error + ")";
      }
      else{
        document.getElementById("greenchiliesCard").setAttribute( 'src', imgSource);
        document.getElementById("greenchilies").innerHTML = "";
      }


      if(potatoPrice < vegetablesPriceMin){
        document.getElementById("potato").innerHTML = "LKR " + potatoPrice + " / 1kg" + "<br>" + "(± " + this.allData[14].error + ")";
      }
      else{
        document.getElementById("potatoCard").setAttribute( 'src', imgSource);
        document.getElementById("potato").innerHTML = "";
      }


      if(bananaPrice < fruitsPriceMin){
        document.getElementById("banana").innerHTML = "LKR " + bananaPrice + " / 1kg" + "<br>" + "(± " + this.allData[15].error + ")";
      }
      else{
        document.getElementById("bananaCard").setAttribute( 'src', imgSource);
        document.getElementById("banana").innerHTML = "";
      }


      if(papayaPrice < fruitsPriceMin){
        document.getElementById("papaya").innerHTML = "LKR " + papayaPrice + " / 1kg" + "<br>" + "(± " + this.allData[16].error + ")";
      }
      else{
        document.getElementById("papayaCard").setAttribute( 'src', imgSource);
        document.getElementById("papaya").innerHTML = "";
      }


      if(avocadoPrice < fruitsPriceMin){
        document.getElementById("avocado").innerHTML = "LKR " + avocadoPrice + " / 1kg" + "<br>" + "(± " + this.allData[19].error + ")";
      }
      else{
        document.getElementById("avocadoCard").setAttribute( 'src', imgSource);
        document.getElementById("avocado").innerHTML = "";
      }


      if(mangoPrice < fruitsPriceMin){
        document.getElementById("mango").innerHTML = "LKR " + mangoPrice + " / 1kg" + "<br>" + "(± " + this.allData[18].error + ")";
      }
      else{
        document.getElementById("mangoCard").setAttribute( 'src', imgSource);
        document.getElementById("mango").innerHTML = "";
      }


      if(limePrice < fruitsPriceMin){
        document.getElementById("lime").innerHTML = "LKR " + limePrice + " / 1kg" + "<br>" + "(± " + this.allData[13].error + ")";
      }
      else{
        document.getElementById("limeCard").setAttribute( 'src', imgSource);
        document.getElementById("lime").innerHTML = "";
      }


      if(pineapplePrice < fruitsPriceMin){
        document.getElementById("pineapple").innerHTML = "LKR " + pineapplePrice + " / 1kg" + "<br>" + "(± " + this.allData[17].error + ")";
      }
      else{
        document.getElementById("pineappleCard").setAttribute( 'src', imgSource);
        document.getElementById("pineapple").innerHTML = "";
      }
    });    
  }


  getNextWeekData(){

    var vegetablesPriceMin = 100;
    var fruitsPriceMin = 80;
    var imgSource = "assets/highPriceImage.jpg";


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

    var bananaPrice = 0;
    var papayaPrice = 0;
    var avocadoPrice = 0;
    var mangoPrice = 0;
    var limePrice = 0;
    var pineapplePrice = 0;

    this.http.get(LowestPriceComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
      
      date = this.allData[0].nextWeekDate;
      beansPrice = this.allData[0].nextWeek 
      carrotPrice = this.allData[1].nextWeek 
      leeksPrice = this.allData[2].nextWeek 
      beetrootPrice = this.allData[3].nextWeek
      knolkholPrice = this.allData[4].nextWeek 
      cabbagePrice = this.allData[5].nextWeek 
      tomatoPrice = this.allData[6].nextWeek 
      ladiesFingersrice = this.allData[7].nextWeek 
      brinjalsPrice = this.allData[8].nextWeek 
      pumpkinPrice = this.allData[9].nextWeek 
      cucumberprice = this.allData[10].nextWeek 
      bitterGourdPrice = this.allData[11].nextWeek 
      greenChiliesPrice = this.allData[12].nextWeek 
      potatoPrice = this.allData[14].nextWeek 

      bananaPrice = this.allData[15].nextWeek;
      papayaPrice = this.allData[16].nextWeek;
      avocadoPrice = this.allData[19].nextWeek;
      mangoPrice = this.allData[18].nextWeek;
      limePrice = this.allData[13].nextWeek;
      pineapplePrice = this.allData[17].nextWeek;

      
      document.getElementById("subTopic").innerHTML = "The Cheapest Items for Next Week (" + date + ")";


      if(beansPrice < vegetablesPriceMin){
        document.getElementById("beans").innerHTML = "LKR " + beansPrice + " / 1kg" + "<br>" + "(± " + this.allData[0].error + ")";
      }
      else{
        document.getElementById("beansCard").setAttribute( 'src', imgSource);
        document.getElementById("beans").innerHTML = "";
      }


      if(carrotPrice < vegetablesPriceMin){
        document.getElementById("carrot").innerHTML = "LKR " + carrotPrice + " / 1kg" + "<br>" + "(± " + this.allData[1].error + ")";
      }
      else{
        document.getElementById("carrotCard").setAttribute( 'src', imgSource);
        document.getElementById("carrot").innerHTML = "";
      }


      if(leeksPrice < vegetablesPriceMin){
        document.getElementById("leeks").innerHTML = "LKR " + leeksPrice + " / 1kg" + "<br>" + "(± " + this.allData[2].error + ")";
      }
      else{
        document.getElementById("leeksCard").setAttribute( 'src', imgSource);
        document.getElementById("leeks").innerHTML = "";
      }


      if(beetrootPrice < vegetablesPriceMin){
        document.getElementById("beetroot").innerHTML = "LKR " + beetrootPrice + " / 1kg" + "<br>" + "(± " + this.allData[3].error + ")";
      }
      else{
        document.getElementById("beetrootCard").setAttribute( 'src', imgSource);
        document.getElementById("beetroot").innerHTML = "";
      }


      if(knolkholPrice < vegetablesPriceMin){
        document.getElementById("knolkhol").innerHTML = "LKR " + knolkholPrice + " / 1kg" + "<br>" + "(± " + this.allData[4].error + ")";
      }
      else{
        document.getElementById("knolkholCard").setAttribute( 'src', imgSource);
        document.getElementById("knolkhol").innerHTML = "";
      }


      if(cabbagePrice < vegetablesPriceMin){
        document.getElementById("cabbage").innerHTML = "LKR " + cabbagePrice + " / 1kg" + "<br>" + "(± " + this.allData[5].error + ")";
      }
      else{
        document.getElementById("cabbageCard").setAttribute( 'src', imgSource);
        document.getElementById("cabbage").innerHTML = "";
      }


      if(tomatoPrice < vegetablesPriceMin){
        document.getElementById("tomato").innerHTML = "LKR " + tomatoPrice + " / 1kg" + "<br>" + "(± " + this.allData[6].error + ")";
      }
      else{
        document.getElementById("tomatoCard").setAttribute( 'src', imgSource);
        document.getElementById("tomato").innerHTML = "";
      }


      if(ladiesFingersrice < vegetablesPriceMin){
        document.getElementById("ladiesfingers").innerHTML = "LKR " + ladiesFingersrice + " / 1kg" + "<br>" + "(± " + this.allData[7].error + ")";
      }
      else{
        document.getElementById("ladiesfingersCard").setAttribute( 'src', imgSource);
        document.getElementById("ladiesfingers").innerHTML = "";
      }


      if(brinjalsPrice < vegetablesPriceMin){
        document.getElementById("brinjals").innerHTML = "LKR " + brinjalsPrice + " / 1kg" + "<br>" + "(± " + this.allData[8].error + ")";

      }
      else{
        document.getElementById("brinjalsCard").setAttribute( 'src', imgSource);
        document.getElementById("brinjals").innerHTML = "";
      }


      if(pumpkinPrice < vegetablesPriceMin){
        document.getElementById("pumpkin").innerHTML = "LKR " + pumpkinPrice + " / 1kg" + "<br>" + "(± " + this.allData[9].error + ")";
      }
      else{
        document.getElementById("pumpkinCard").setAttribute( 'src', imgSource);
        document.getElementById("pumpkin").innerHTML = "";
      }


      if(cucumberprice < vegetablesPriceMin){
        document.getElementById("cucumber").innerHTML = "LKR " + cucumberprice + " / 1kg" + "<br>" + "(± " + this.allData[10].error + ")";
      }
      else{
        document.getElementById("cucumberCard").setAttribute( 'src', imgSource);
        document.getElementById("cucumber").innerHTML = "";
      }


      if(bitterGourdPrice < vegetablesPriceMin){
        document.getElementById("bittergourd").innerHTML = "LKR " + bitterGourdPrice + " / 1kg" + "<br>" + "(± " + this.allData[11].error + ")";
      }
      else{
        document.getElementById("bittergourdCard").setAttribute( 'src', imgSource);
        document.getElementById("bittergourd").innerHTML = "";
      }


      if(greenChiliesPrice < vegetablesPriceMin){
        document.getElementById("greenchilies").innerHTML = "LKR " + greenChiliesPrice + " / 1kg" + "<br>" + "(± " + this.allData[12].error + ")";
      }
      else{
        document.getElementById("greenchiliesCard").setAttribute( 'src', imgSource);
        document.getElementById("greenchilies").innerHTML = "";
      }


      if(potatoPrice < vegetablesPriceMin){
        document.getElementById("potato").innerHTML = "LKR " + potatoPrice + " / 1kg" + "<br>" + "(± " + this.allData[14].error + ")";
      }
      else{
        document.getElementById("potatoCard").setAttribute( 'src', imgSource);
        document.getElementById("potato").innerHTML = "";
      }


      if(bananaPrice < fruitsPriceMin){
        document.getElementById("banana").innerHTML = "LKR " + bananaPrice + " / 1kg" + "<br>" + "(± " + this.allData[15].error + ")";
      }
      else{
        document.getElementById("bananaCard").setAttribute( 'src', imgSource);
        document.getElementById("banana").innerHTML = "";
      }


      if(papayaPrice < fruitsPriceMin){
        document.getElementById("papaya").innerHTML = "LKR " + papayaPrice + " / 1kg" + "<br>" + "(± " + this.allData[16].error + ")";
      }
      else{
        document.getElementById("papayaCard").setAttribute( 'src', imgSource);
        document.getElementById("papaya").innerHTML = "";
      }


      if(avocadoPrice < fruitsPriceMin){
        document.getElementById("avocado").innerHTML = "LKR " + avocadoPrice + " / 1kg" + "<br>" + "(± " + this.allData[19].error + ")";
      }
      else{
        document.getElementById("avocadoCard").setAttribute( 'src', imgSource);
        document.getElementById("avocado").innerHTML = "";
      }


      if(mangoPrice < fruitsPriceMin){
        document.getElementById("mango").innerHTML = "LKR " + mangoPrice + " / 1kg" + "<br>" + "(± " + this.allData[18].error + ")";
      }
      else{
        document.getElementById("mangoCard").setAttribute( 'src', imgSource);
        document.getElementById("mango").innerHTML = "";
      }


      if(limePrice < fruitsPriceMin){
        document.getElementById("lime").innerHTML = "LKR " + limePrice + " / 1kg" + "<br>" + "(± " + this.allData[13].error + ")";
      }
      else{
        document.getElementById("limeCard").setAttribute( 'src', imgSource);
        document.getElementById("lime").innerHTML = "";
      }


      if(pineapplePrice < fruitsPriceMin){
        document.getElementById("pineapple").innerHTML = "LKR " + pineapplePrice + " / 1kg" + "<br>" + "(± " + this.allData[17].error + ")";
      }
      else{
        document.getElementById("pineappleCard").setAttribute( 'src', imgSource);
        document.getElementById("pineapple").innerHTML = "";
      }
    });    
  }
}