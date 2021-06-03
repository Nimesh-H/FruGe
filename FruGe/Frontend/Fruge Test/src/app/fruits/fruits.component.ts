import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']  
})

export class FruitsComponent implements OnInit {

  public static priceDataUrl:string = "https://mczuylydvf.execute-api.ap-south-1.amazonaws.com/dev/priceData";

  // public static priceDataUrl:string = "http://localhost:3000/priceData";

  public static clickCount = 0;                   // This variable is for selection button click count

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
    var bananaPrice = "";
    var papayaPrice = "";
    var avocadoPrice = "";
    var mangoPrice = "";
    var limePrice = "";
    var pineapplePrice = "";

    this.http.get(FruitsComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
      
      date = this.allData[0].date;
      bananaPrice = this.allData[15].today + " / 1kg" + "<br>" + "(± " + this.allData[15].error + ")";
      papayaPrice = this.allData[16].today + " / 1kg" + "<br>" + "(± " + this.allData[16].error + ")";
      avocadoPrice = this.allData[19].today + " / 1kg" + "<br>" + "(± " + this.allData[19].error + ")";
      mangoPrice = this.allData[18].today + " / 1kg" + "<br>" + "(± " + this.allData[18].error + ")";
      limePrice = this.allData[13].today + " / 1kg" + "<br>" + "(± " + this.allData[13].error + ")";
      pineapplePrice = this.allData[17].today + " / 1kg" + "<br>" + "(± " + this.allData[17].error + ")";

      document.getElementById("subTopic").innerHTML = "Predicted price for Fruits for Today (" + date + ")";
      document.getElementById("banana").innerHTML = "LKR " + bananaPrice;
      document.getElementById("papaya").innerHTML = "LKR " + papayaPrice;
      document.getElementById("avocado").innerHTML = "LKR " + avocadoPrice;
      document.getElementById("mango").innerHTML = "LKR " + mangoPrice;
      document.getElementById("lime").innerHTML = "LKR " + limePrice;
      document.getElementById("pineapple").innerHTML = "LKR " + pineapplePrice;
    });    
  }


  getTommorrowData(){

    var date = "";
    var bananaPrice = "";
    var papayaPrice = "";
    var avocadoPrice = "";
    var mangoPrice = "";
    var limePrice = "";
    var pineapplePrice = "";

    this.http.get(FruitsComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
      
      date = this.allData[0].tomorrowDate;
      bananaPrice = this.allData[15].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[15].error + ")";
      papayaPrice = this.allData[16].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[16].error + ")";
      avocadoPrice = this.allData[19].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[19].error + ")";
      mangoPrice = this.allData[18].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[18].error + ")";
      limePrice = this.allData[13].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[13].error + ")";
      pineapplePrice = this.allData[17].tomorrow + " / 1kg" + "<br>" + "(± " + this.allData[17].error + ")";

      document.getElementById("subTopic").innerHTML = "Predicted price for Fruits for Tommorrow (" + date + ")";
      document.getElementById("banana").innerHTML = "LKR " + bananaPrice;
      document.getElementById("papaya").innerHTML = "LKR " + papayaPrice;
      document.getElementById("avocado").innerHTML = "LKR " + avocadoPrice;
      document.getElementById("mango").innerHTML = "LKR " + mangoPrice;
      document.getElementById("lime").innerHTML = "LKR " + limePrice;
      document.getElementById("pineapple").innerHTML = "LKR " + pineapplePrice;
    });    
  }


  getNextWeekData(){

    var date = "";
    var bananaPrice = "";
    var papayaPrice = "";
    var avocadoPrice = "";
    var mangoPrice = "";
    var limePrice = "";
    var pineapplePrice = "";

    this.http.get(FruitsComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
      
      date = this.allData[0].nextWeekDate;
      bananaPrice = this.allData[15].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[15].error + ")";
      papayaPrice = this.allData[16].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[16].error + ")";
      avocadoPrice = this.allData[19].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[19].error + ")";
      mangoPrice = this.allData[18].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[18].error + ")";
      limePrice = this.allData[13].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[13].error + ")";
      pineapplePrice = this.allData[17].nextWeek + " / 1kg" + "<br>" + "(± " + this.allData[17].error + ")";

      document.getElementById("subTopic").innerHTML = "Predicted price for Fruits for Next week starting from " + date;
      document.getElementById("banana").innerHTML = "LKR " + bananaPrice;
      document.getElementById("papaya").innerHTML = "LKR " + papayaPrice;
      document.getElementById("avocado").innerHTML = "LKR " + avocadoPrice;
      document.getElementById("mango").innerHTML = "LKR " + mangoPrice;
      document.getElementById("lime").innerHTML = "LKR " + limePrice;
      document.getElementById("pineapple").innerHTML = "LKR " + pineapplePrice;
    });    
  }


  chart(){
    
    var date = "";
    var bananaPrice = "";
    var papayaPrice = "";
    var avocadoPrice = "";
    var mangoPrice = "";
    var limePrice = "";
    var pineapplePrice = "";

    this.http.get(FruitsComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
            
      date = this.allData[0].date;
      bananaPrice = this.allData[15].today;
      papayaPrice = this.allData[16].today;
      avocadoPrice = this.allData[19].today;
      mangoPrice = this.allData[18].today;
      limePrice = this.allData[13].today;
      pineapplePrice = this.allData[17].today;


      document.getElementById("chartDes1").innerHTML = 'Today ' + "(" +  date + ")";    

      new Chart('myChart1', {
        type: 'bar',
          data: {
            labels: ['banana', 'papaya', 'avocado', 'mango', 'lime', 'pineapple'],
              datasets: [{
                label: "Predicted price",
                  data: [bananaPrice, papayaPrice, avocadoPrice, mangoPrice, limePrice, pineapplePrice],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
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


    this.http.get(FruitsComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
            
      date = this.allData[0].tomorrowDate;
      bananaPrice = this.allData[15].tomorrow;
      papayaPrice = this.allData[16].tomorrow;
      avocadoPrice = this.allData[19].tomorrow;
      mangoPrice = this.allData[18].tomorrow;
      limePrice = this.allData[13].tomorrow;
      pineapplePrice = this.allData[17].tomorrow;


      document.getElementById("chartDes2").innerHTML = 'Tommorrow ' + "(" +  date + ")";
          
      new Chart('myChart2', {
        type: 'bar',
          data: {
            labels: ['banana', 'papaya', 'avocado', 'mango', 'lime', 'pineapple'],
              datasets: [{
                label: "Predicted price",
                data: [bananaPrice, papayaPrice, avocadoPrice, mangoPrice, limePrice, pineapplePrice],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
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


    this.http.get(FruitsComponent.priceDataUrl).toPromise().then(data => {

      this.allData = data;
      console.log(this.allData);
            
      date = this.allData[0].nextWeekDate;
      bananaPrice = this.allData[15].nextWeek;
      papayaPrice = this.allData[16].nextWeek;
      avocadoPrice = this.allData[19].nextWeek;
      mangoPrice = this.allData[18].nextWeek;
      limePrice = this.allData[13].nextWeek;
      pineapplePrice = this.allData[17].nextWeek;
          

      document.getElementById("chartDes3").innerHTML = 'Next week ' + "(" +  date + ")";

      new Chart('myChart3', {
        type: 'bar',
          data: {
            labels: ['banana', 'papaya', 'avocado', 'mango', 'lime', 'pineapple'],
                datasets: [{
                  label: "Predicted price",
                    data: [bananaPrice, papayaPrice, avocadoPrice, mangoPrice, limePrice, pineapplePrice],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
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

    FruitsComponent.clickCount++;

    if(FruitsComponent.clickCount%2 == 0){
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