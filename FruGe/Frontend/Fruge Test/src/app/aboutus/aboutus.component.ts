import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({ templateUrl: 'aboutus.component.html', 

    styleUrls: ['aboutus.component.css']

})

export class AboutUsComponent implements OnInit  {

  constructor(public router:Router) { }


  ngOnInit(): void {

    var userIcon = localStorage.getItem('token');

    if(this.loggedin()){
      document.getElementById("userIcon").innerHTML = userIcon.charAt(0).toUpperCase();
      document.getElementById("tooltip").innerHTML = "Logged in as " + userIcon;
    }

    else{
      document.getElementById("tooltip").innerHTML = "Logged in as Guest";
      document.getElementById("logoutText").style.visibility = "hidden";
      document.getElementById("loginText").style.visibility = "visible";
      document.getElementById("signupText").style.visibility = "visible";
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

    if(this.loggedin()){

      var message = confirm("You will be logged out from your account! Please confirm..");
      if(message == true) {
  
        localStorage.removeItem('token');
        window.location.href = "/login";
      } 
    }
    else{
      window.location.href = "/login";
    }
  }


  signupNav(){

    if(this.loggedin()){

      var message = confirm("You will be logged out from your account! Please confirm..");
      if(message == true) {

        localStorage.removeItem('token');
        window.location.href = "/register";
      }
    }
    else{
      window.location.href = "/register";
    }
  }


  homeNav(){

    if(this.loggedin()){
      window.location.href = "/home";
    }
    else{
      alert("Please login to access Dashboard Page!");
    }
  }


  vegeNav(){

    if(this.loggedin()){
      window.location.href = "/vegetables";
    }
    else{
      alert("Please login to access Vegetables Page!");
    }
  }


  fruitNav(){

    if(this.loggedin()){
      window.location.href = "/fruits";
    }
    else{
      alert("Please login to access Fruits Page!");
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
}