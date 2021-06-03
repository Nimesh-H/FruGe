import { Component, OnInit  } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({ templateUrl: 'register.component.html', 
             styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{

  constructor(private http: HttpClient,public router:Router) { }

  ngOnInit(): void {}

  termsDes(){

    alert("The Terms & Conditions are currently being updated!!!");
  }


  register(fName,lName,uName,email,pass){

    var element = <HTMLInputElement> document.getElementById("checkTerms");
    var isChecked = element.checked;

    if(pass.value == "" || fName.value == "" || lName.value == "" || email.value == "" || uName.value == "") {

      alert("Fill all the required fields!");
    }
    else{

      if(pass.value.length < 8){

        alert("Password is too short! Enter a password containing atleast 8 characters.");
        pass.value = "";
      }

      else if(!email.value.includes("@") ||!email.value.includes("com")) {

        alert("Invalid email address! Enter a valid email address.");
        email.value = "";
      }

      else if(isChecked == false){

        alert("Please agree to Terms & Conditions to continue!")
      }

      else{

        document.getElementById("form").style.opacity = "0.1";
        document.getElementById("waitingMessageId").style.opacity = "1";

        let body = new HttpParams({
  
          fromObject:{
            'userName':uName.value,
            'firstName':fName.value,
            'lastName':lName.value, 
            'email':email.value,
            'password':pass.value
          }
        });
  
        var url = 'https://6zaa7xe4m3.execute-api.ap-south-1.amazonaws.com/dev/userAuth/*'
  
        // var url = 'http://localhost:4000/userAuth/*'
  
        this.http.post(url,body).toPromise().then(function(){
  
          alert("Account registration successfull! You will be redirected to Login page.");
          window.location.href = "/login";
        })
  
        .catch((err) => {
          console.log(err);
  
          if(err.status == 409){
  
            alert("Username already exists! Please enter a different userName.");
            document.getElementById("form").style.opacity = "1";
            document.getElementById("waitingMessageId").style.opacity = "0";
            uName.value = "";
          }
        })        
      }
    }
  }
}