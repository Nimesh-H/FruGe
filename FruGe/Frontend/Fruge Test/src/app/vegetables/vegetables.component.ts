import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css']
})
export class VegetablesComponent implements OnInit {

  public static priceDataUrl:string = "https://mczuylydvf.execute-api.ap-south-1.amazonaws.com/dev/priceData";

  // public static priceDataUrl:string = "http://localhost:3000/priceData";

  public static clickCount = 0;                 // This variable is for selection button click count 
  static document: any;

  constructor(private http: HttpClient,public router:Router) {}

  ngOnInit(): void {

    this.chart();

    this.getTodayData();


    if(!this.loggedin()){
      window.location.href = "/login";
    }

    var userIcon = localStorage.getItem('token');

    document.getElementById("userIcon").innerHTML = userIcon.charAt(0).toUpperCase();
    document.getElementById("tooltip").innerHTML = "Logged in as " + userIcon;


    this.slide();
    window.setInterval(this.slide, 15000);
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

    this.http.get(VegetablesComponent.priceDataUrl).toPromise().then(data => {

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


      document.getElementById("subTopic").innerHTML = "Predicted price for Vegetables for Today (" + date + ")";
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
    });    
  }


  getTommorrowData(){

    var date = "";
    var beansPrice = "";
    var carrotPrice = "";
    var leeksPrice = "";
    var beetrootPrice = "";
    var knolkholPrice = "";
    var cabbagePrice = "";
    var tomatoPrice = "";
    var ladiesFingersrice = "";
    var brinjalsPrice = "";
    var pumpkinPrice = "";
    var cucumberprice = "";
    var bitterGourdPrice = "";
    var greenChiliesPrice = "";
    var potatoPrice = "";

    this.http.get(VegetablesComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
      
      date = this.allData[0].tomorrowDate;
      beansPrice = this.allData[0].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[0].error + ")";
      carrotPrice = this.allData[1].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[1].error + ")";
      leeksPrice = this.allData[2].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[2].error + ")";
      beetrootPrice = this.allData[3].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[3].error + ")";
      knolkholPrice = this.allData[4].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[4].error + ")";
      cabbagePrice = this.allData[5].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[5].error + ")";
      tomatoPrice = this.allData[6].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[6].error + ")";
      ladiesFingersrice = this.allData[7].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[7].error + ")";
      brinjalsPrice = this.allData[8].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[8].error + ")";
      pumpkinPrice = this.allData[9].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[9].error + ")";
      cucumberprice = this.allData[10].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[10].error + ")";
      bitterGourdPrice = this.allData[11].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[11].error + ")";
      greenChiliesPrice = this.allData[12].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[12].error + ")";
      potatoPrice = this.allData[14].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[14].error + ")";


      document.getElementById("subTopic").innerHTML = "Predicted price for Vegetables for Tommorrow (" + date + ")";
      document.getElementById("beans").innerHTML = "LKR " + beansPrice;
      document.getElementById("carrot").innerHTML = "LKR " + carrotPrice;
      document.getElementById("leeks").innerHTML = "LKR " + leeksPrice;
      document.getElementById("beetroot").innerHTML = "LKR " + beetrootPrice;
      document.getElementById("knolkhol").innerHTML = "LKR " + knolkholPrice;
      document.getElementById("cabbage").innerHTML = "LKR " + cabbagePrice;
      document.getElementById("tomato").innerHTML = "LKR " + tomatoPrice;
      document.getElementById("ladiesfingers").innerHTML = "LKR " + ladiesFingersrice;
      document.getElementById("brinjals").innerHTML = "LKR " + brinjalsPrice;
      document.getElementById("pumpkin").innerHTML = "LKR " + pumpkinPrice;
      document.getElementById("cucumber").innerHTML = "LKR " + cucumberprice;
      document.getElementById("bittergourd").innerHTML = "LKR " + bitterGourdPrice;
      document.getElementById("greenchilies").innerHTML = "LKR " + greenChiliesPrice;
      document.getElementById("potato").innerHTML = "LKR " + potatoPrice;
    });    
  }


  getNextWeekData(){

    var date = "";
    var beansPrice = "";
    var carrotPrice = "";
    var leeksPrice = "";
    var beetrootPrice = "";
    var knolkholPrice = "";
    var cabbagePrice = "";
    var tomatoPrice = "";
    var ladiesFingersrice = "";
    var brinjalsPrice = "";
    var pumpkinPrice = "";
    var cucumberprice = "";
    var bitterGourdPrice = "";
    var greenChiliesPrice = "";
    var potatoPrice = "";

    this.http.get(VegetablesComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
      
      date = this.allData[0].nextWeekDate;
      beansPrice = this.allData[0].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[0].error + ")";
      carrotPrice = this.allData[1].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[1].error + ")";
      leeksPrice = this.allData[2].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[2].error + ")";
      beetrootPrice = this.allData[3].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[3].error + ")";
      knolkholPrice = this.allData[4].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[4].error + ")";
      cabbagePrice = this.allData[5].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[5].error + ")";
      tomatoPrice = this.allData[6].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[6].error + ")";
      ladiesFingersrice = this.allData[7].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[7].error + ")";
      brinjalsPrice = this.allData[8].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[8].error + ")";
      pumpkinPrice = this.allData[9].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[9].error + ")";
      cucumberprice = this.allData[10].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[10].error + ")";
      bitterGourdPrice = this.allData[11].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[11].error + ")";
      greenChiliesPrice = this.allData[12].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[12].error + ")";
      potatoPrice = this.allData[14].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[14].error + ")";


      document.getElementById("subTopic").innerHTML = "Predicted price for Vegetables for Next week starting from " + date;
      document.getElementById("beans").innerHTML = "LKR " + beansPrice;
      document.getElementById("carrot").innerHTML = "LKR " + carrotPrice;
      document.getElementById("leeks").innerHTML = "LKR " + leeksPrice;
      document.getElementById("beetroot").innerHTML = "LKR " + beetrootPrice;
      document.getElementById("knolkhol").innerHTML = "LKR " + knolkholPrice;
      document.getElementById("cabbage").innerHTML = "LKR " + cabbagePrice;
      document.getElementById("tomato").innerHTML = "LKR " + tomatoPrice;
      document.getElementById("ladiesfingers").innerHTML = "LKR " + ladiesFingersrice;
      document.getElementById("brinjals").innerHTML = "LKR " + brinjalsPrice;
      document.getElementById("pumpkin").innerHTML = "LKR " + pumpkinPrice;
      document.getElementById("cucumber").innerHTML = "LKR " + cucumberprice;
      document.getElementById("bittergourd").innerHTML = "LKR " + bitterGourdPrice;
      document.getElementById("greenchilies").innerHTML = "LKR " + greenChiliesPrice;
      document.getElementById("potato").innerHTML = "LKR " + potatoPrice;
    });    
  }


  chart(){
    
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

    this.http.get(VegetablesComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
            
      date = this.allData[0].date;
      beansPrice = this.allData[0].today;
      carrotPrice = this.allData[1].today; 
      leeksPrice = this.allData[2].today;
      beetrootPrice = this.allData[3].today; 
      knolkholPrice = this.allData[4].today; 
      cabbagePrice = this.allData[5].today; 
      tomatoPrice = this.allData[6].today; 
      ladiesFingersrice = this.allData[7].today; 
      brinjalsPrice = this.allData[8].today; 
      pumpkinPrice = this.allData[9].today; 
      cucumberprice = this.allData[10].today; 
      bitterGourdPrice = this.allData[11].today; 
      greenChiliesPrice = this.allData[12].today;
      potatoPrice = this.allData[14].today;        


      document.getElementById("chartDes1").innerHTML = 'Today ' + "(" +  date + ")";

      new Chart('myChart1', {
        type: 'bar',
          data: {
            labels: ['beans', 'carrot', 'leeks', 'beetroot', 'knolkhol', 'cabbage', 'tomato', 'ladiesfingers', 'brinjals', 'pumpkin', 'cucumber', 'bittergourd', 'greenchilies', 'potato'  ],
              datasets: [{
                label: "Predicted price",
                  data: [beansPrice, carrotPrice, leeksPrice, beetrootPrice, knolkholPrice, cabbagePrice, tomatoPrice, ladiesFingersrice, brinjalsPrice, pumpkinPrice, cucumberprice, bitterGourdPrice, greenChiliesPrice, potatoPrice],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
              }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
      });
    }); 


    this.http.get(VegetablesComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
            
      date = this.allData[0].tomorrowDate;
      beansPrice = this.allData[0].tomorrow;
      carrotPrice = this.allData[1].tomorrow; 
      leeksPrice = this.allData[2].tomorrow;
      beetrootPrice = this.allData[3].tomorrow; 
      knolkholPrice = this.allData[4].tomorrow; 
      cabbagePrice = this.allData[5].tomorrow; 
      tomatoPrice = this.allData[6].tomorrow; 
      ladiesFingersrice = this.allData[7].tomorrow; 
      brinjalsPrice = this.allData[8].tomorrow; 
      pumpkinPrice = this.allData[9].tomorrow; 
      cucumberprice = this.allData[10].tomorrow; 
      bitterGourdPrice = this.allData[11].tomorrow; 
      greenChiliesPrice = this.allData[12].tomorrow;
      potatoPrice = this.allData[14].tomorrow;


      document.getElementById("chartDes2").innerHTML = 'Tommorrow ' + "(" +  date + ")";
          
      new Chart('myChart2', {
        type: 'bar',
          data: {
            labels: ['beans', 'carrot', 'leeks', 'beetroot', 'knolkhol', 'cabbage', 'tomato', 'ladiesfingers', 'brinjals', 'pumpkin', 'cucumber', 'bittergourd', 'greenchilies', 'potato'  ],
              datasets: [{
                label: "Predicted price",
                  data: [beansPrice, carrotPrice, leeksPrice, beetrootPrice, knolkholPrice, cabbagePrice, tomatoPrice, ladiesFingersrice, brinjalsPrice, pumpkinPrice, cucumberprice, bitterGourdPrice, greenChiliesPrice, potatoPrice],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
              }]
          },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
      });
    }); 


    this.http.get(VegetablesComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
            
      date = this.allData[0].nextWeekDate;
      beansPrice = this.allData[0].nextWeek;
      carrotPrice = this.allData[1].nextWeek; 
      leeksPrice = this.allData[2].nextWeek;
      beetrootPrice = this.allData[3].nextWeek; 
      knolkholPrice = this.allData[4].nextWeek; 
      cabbagePrice = this.allData[5].nextWeek; 
      tomatoPrice = this.allData[6].nextWeek; 
      ladiesFingersrice = this.allData[7].nextWeek; 
      brinjalsPrice = this.allData[8].nextWeek; 
      pumpkinPrice = this.allData[9].nextWeek; 
      cucumberprice = this.allData[10].nextWeek; 
      bitterGourdPrice = this.allData[11].nextWeek; 
      greenChiliesPrice = this.allData[12].nextWeek;
      potatoPrice = this.allData[14].nextWeek;
          

      document.getElementById("chartDes3").innerHTML = 'Next week ' + "(" +  date + ")";

      new Chart('myChart3', {
        type: 'bar',
          data: {
            labels: ['beans', 'carrot', 'leeks', 'beetroot', 'knolkhol', 'cabbage', 'tomato', 'ladiesfingers', 'brinjals', 'pumpkin', 'cucumber', 'bittergourd', 'greenchilies', 'potato'  ],
                datasets: [{
                  label: "Predicted price",
                    data: [beansPrice, carrotPrice, leeksPrice, beetrootPrice, knolkholPrice, cabbagePrice, tomatoPrice, ladiesFingersrice, brinjalsPrice, pumpkinPrice, cucumberprice, bitterGourdPrice, greenChiliesPrice, potatoPrice],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                      ],
                    borderWidth: 1
                }]
          },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
      });
    }); 
  }


  loggedin(){
    return localStorage.getItem('token');
  }


  logout(){

    var message = confirm("Do you really want to log out?");
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
    document.getElementById("page").style.opacity = "1";
    document.getElementById("openMessage").style.opacity = "0";
  }


  openNav() {
    document.getElementById("mySidenav").style.width = "380px";
  }
  

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }


  openPrice(){

    VegetablesComponent.clickCount++;

    if(VegetablesComponent.clickCount%2 == 0){
      document.getElementById("dropdownId").setAttribute( 'src', "assets/openBlack.png");
      document.getElementById("selection").style.width = "0px";
      document.getElementById("selection").style.visibility = "hidden";
    }

    else{

      document.getElementById("dropdownId") .setAttribute( 'src', "assets/closeBlack.png");
      document.getElementById("selection").style.width = "200px";
      document.getElementById("selection").style.visibility = "visible";
      document.getElementById("selection").style.transition = "0.4s";
    }
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
      document.getElementById("slide3").style.marginLeft = "1500px" ; }, 8000);
      
    setTimeout(function(){

      document.getElementById("slide1").style.position = "absolute" ;
      document.getElementById("slide1").style.marginLeft = "0px" ; }, 8000);

    setTimeout(function(){

      document.getElementById("slide1").style.position = "absolute" ;
      document.getElementById("slide1").style.marginLeft = "1500px" ; }, 12000);

    setTimeout(function(){

      document.getElementById("slide2").style.position = "absolute" ;
      document.getElementById("slide2").style.marginLeft = "0px" ; }, 12000);
  }
}