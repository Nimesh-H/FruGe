import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrls: ['./guest-page.component.css']
})
export class GuestPageComponent implements OnInit {

  constructor(private http: HttpClient,public router:Router) {}

  public static priceDataUrl:string = "https://mczuylydvf.execute-api.ap-south-1.amazonaws.com/dev/priceData";

  // public static priceDataUrl:string = "http://localhost:3000/priceData";

  ngOnInit(): void {

    localStorage.removeItem('token');

    this.getData();

    document.getElementById("page").style.opacity = "1";  

    setTimeout(function(){ 

    document.getElementById("openMessage").style.opacity = "1";

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    document.getElementById("body").style.opacity = "0.3";}, 2000);

    this.slide();
    window.setInterval(this.slide, 15000);
  }

  
  allData:any;

  getData(){

    var date = "";
    var beansPrice = "";
    var carrotPrice = "";
    var leeksPrice = "";
    var bananaPrice = "";

    this.http.get(GuestPageComponent.priceDataUrl).toPromise().then(data => {

    console.log(data);

      this.allData = data;
      
      date = this.allData[0].date;
      beansPrice = "LKR " + this.allData[0].today + "/1kg" + "<br>" + "(+/- " + this.allData[0].error + ")";
      carrotPrice = "LKR " + this.allData[1].today + "/1kg" + "<br>" + "(+/- " + this.allData[1].error + ")";
      leeksPrice = "LKR " + this.allData[2].today + "/1kg" + "<br>" + "(+/- " + this.allData[2].error + ")";
      bananaPrice = "LKR " + this.allData[15].today + "/1kg" + "<br>" + "(+/- " + this.allData[15].error + ")";

      document.getElementById("subTopic").innerHTML = "List of Items for Predicted price for Today (" + date + ")";
      document.getElementById("beansPrice").innerHTML = beansPrice;
      document.getElementById("carrotPrice").innerHTML = carrotPrice;
      document.getElementById("leeksPrice").innerHTML = leeksPrice;
      document.getElementById("bananaPrice").innerHTML = bananaPrice;
    });    
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


  registerAlert(){
    var registerMessage = confirm("Please Sign up to get full access! Do you wish to sign up now?");

    if(registerMessage == true) {

      window.location.href = "/register";
    }
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