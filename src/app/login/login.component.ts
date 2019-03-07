import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent  {

  userName: string;
  password: string;
  constructor(private http:HttpClient){
    
  }
  loginClicked(){
    console.log(`this.userName : ${this.userName}`);
    console.log(`this.password : ${this.password}`);
    var headers = new HttpHeaders();
    headers.append('Content-Type','application/json');

    let jsonPacket = {
      userName: this.userName,
      password:this.password
    }
    this.http.post('/login',jsonPacket,{
      headers:headers
    }).subscribe(
      data =>data,
      err =>{
        console.log(`error:${err}`);
      },
      () =>{
        console.log(`success`);
      }
    );
  }


}
