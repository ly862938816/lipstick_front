import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';


interface IButtonName {
  ButtonName: string;
}

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
@Injectable()
export class NavbarComponent {

  menuItems: IButtonName[];

  constructor(private http: HttpClient) {
    console.log('Appcomponent constructor');
    this.http.get('http://localhost:3000/menuitems').subscribe(
      (data) => {
        console.log(data);
        this.menuItems = data['menuitems'];
        console.log(this.menuItems);
      },
      err => {
        console.log(`error : ${err}`);
      },
      () => {
        console.log(`success`);
      }
    );
  }
}
