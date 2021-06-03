import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({ templateUrl: 'login.component.html',
             styleUrls: ['./login.component.css']
        })
        
export class LoginComponent implements OnInit{

        constructor(private http: HttpClient,public router:Router) {}

        ngOnInit(): void {
                localStorage.removeItem('token');
        }


        loginAction(uName, pass){


                if(uName.value == "" || pass.value == "") {

                        alert("Please fill all the required fields!");
                }

                else{
                        document.getElementById("form").style.opacity = "0.1";
                        document.getElementById("waitingMessageId").style.opacity = "1";

                        let body = new HttpParams({

                                fromObject:{
                                        'userName':uName.value,
                                        'password':pass.value
                                }
                        });

                        var url = 'https://6zaa7xe4m3.execute-api.ap-south-1.amazonaws.com/dev/userAuth'
        
                        // var url = 'http://localhost:4000/userAuth'
        
                        this.http.post(url,body).toPromise().then(function(){
        
                                localStorage.setItem('token', uName.value);
                                localStorage.accessed = "N";
                                window.location.href = "/home";
                        })
                        .catch((err) => {
                                console.log(err);
                                alert("username & password mismatch! Please try again...");
                                document.getElementById("form").style.opacity = "1";
                                document.getElementById("waitingMessageId").style.opacity = "0";
                        }) 
                }
        }


        loadResetUI(){
                document.getElementById("form").style.visibility = "hidden";
                document.getElementById("form2").style.visibility = "visible";
        }

        
        loadLogin(){
                document.getElementById("form").style.visibility = "visible";
                document.getElementById("form2").style.visibility = "hidden";
        }


        reset(uName, uEmail, password){

                if(uName.value == "" || password.value == "" || uEmail.value == "") {

                        alert("Please fill all the required fields!");
                }

                else if(!uEmail.value.includes("@") ||!uEmail.value.includes("com")) {

                        alert("Invalid email address! Enter a valid email address.");
                        uEmail.value = "";
                }

                else if(password.value.length < 8){

                        alert("Password is too short! Enter a password containing atleast 8 characters.");
                        password.value = "";
                }

                else{   
                        document.getElementById("form2").style.opacity = "0.1";
                        document.getElementById("waitingMessageId").style.opacity = "1";

                        let body = new HttpParams({

                                fromObject:{
                                        'userName':uName.value,
                                        'email':uEmail.value,
                                        'password': password.value
                                }
                        });

                
                        var url = 'https://6zaa7xe4m3.execute-api.ap-south-1.amazonaws.com/dev/userAuthReset'
                
                        // var url = 'http://localhost:4000/userAuthReset'

                        this.http.post(url,body).toPromise().then(function(){

                                alert("Password reset successfull! Please add your new credentials for login.")
                                window.location.href = "/login"
                        })
                        .catch((err) => {

                                if(err.status == 405){
                                        alert("Username & Email mismatch! Please enter a valid email matches to the username provided.")
                                        document.getElementById("form2").style.opacity = "1";
                                        document.getElementById("waitingMessageId").style.opacity = "0";
                                }

                                else if(err.status == 401){
                                        alert("Incorrect username! Please enter a valid username.")
                                        document.getElementById("form2").style.opacity = "1";
                                        document.getElementById("waitingMessageId").style.opacity = "0";
                                }  
                        }) 
                }
        }
}