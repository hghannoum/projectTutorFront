import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as $ from "jquery";
import { fromEvent, merge } from 'rxjs';
import { debounce, filter, mergeAll } from 'rxjs/operators';
import { UserService } from '../services/userService/user.service';
@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})
export class TutorsComponent implements OnInit {
  dat; usermain: any; dat2;
  constructor(private apiCaller: HttpClient,
    private snackbar: MatSnackBar, private user0: UserService) {
    //this.dat=[[17,"llll","kkk","halima","kkk","../../assets/images/unn.jpg",null,null,null,null]]
    this.user0.User2.subscribe(resp => this.usermain = resp);
    const headers = { 'content-type': 'application/json' }
    const dataa = {

      "email": this.usermain[4]
    }

    const body = JSON.stringify(dataa);
    setInterval(() => { }, 5000) //: Pulling Mechanism
    setInterval(() => { }, 5000) //: Pulling Mechanism
    this.apiCaller
      .post("http://localhost:5000/getAll",
        body, { 'headers': headers })

      .subscribe(resp => {
        if ((<response>resp).error != null)
          this.snackbar.open((<response>resp).error, 'Ok', {
            duration: 3000
          });
        else {
          this.dat = resp; this.dat2 = resp;
          this.user0.data.next(this.dat);
        }
      })

  }

  city = 'All'; cat = 'All'; subject = 'All'; typee = 'Both';
  subjects: string[] = ["All", "maths", 'physics', 'language', 'chemistry', 'coding', 'sociology', 'history', 'music'];
  cities = ["All", "Beirut", "Tripoli", "Sidon", "Tyre", "Nabatîyé", "Djounie", "Zahle", "Baalbek"];
  category: string[] = ["All", "primary", 'secondary', 'university', 'other']
  type = ['In-person', 'Online', 'Both']
  filter() {

    // var arr=[this.cat,this.dat,this.typee,
    //   this.city,(
    const search = (<HTMLInputElement>document.getElementById("search")).value

    this.dat = this.dat2.filter(tutor => tutor.email != this.usermain[4]);
    console.log(this.dat2)
    if (this.city !== 'All') {
      this.dat = this.dat.filter(tutor => tutor.city_name === this.city);
    }

    // apply category filter
    if (this.cat !== 'All') {
      this.dat = this.dat.filter(tutor => tutor.category === this.cat);
    }

    // apply subject filter
    if (this.subject !== 'All') {
      this.dat = this.dat.filter(tutor => tutor.subject_name === this.subject);
    }
    this.dat = this.dat.filter(tutor => tutor.username.toLowerCase().includes(search.toLowerCase()))


  }
  getAll() {
    this.dat = [];
    for (var i of this.dat2) {
      this.dat.push(i);
    }
  }
  ngOnInit(): void {

  }
  request(i) {
    var request = new Request();

    request.toId = this.dat[i].id_user;
    request.email_from = this.usermain[4];
    //    subscribe(x => req.from = x);

    const headers = { 'content-type': 'application/json' }
    const dataa = request

    const body = JSON.stringify(dataa);
    console.log(body)
    setInterval(() => { }, 5000) //: Pulling Mechanism
    this.apiCaller
      .post("http://localhost:5000/sendRequest",
        body, { 'headers': headers })
      .subscribe((res) => {

      }
      )
    document.querySelectorAll("#remove")[i].removeAttribute('hidden')
  }
  remove(i) {
    var request = new Request();

    //  this.user0.User2[4].

    request.toId = this.dat[i].id_user;
    request.email_from = this.usermain[4];
    //    subscribe(x => req.from = x);

    const headers = { 'content-type': 'application/json' }
    const dataa = request

    const body = JSON.stringify(dataa);

    setInterval(() => { }, 5000) //: Pulling Mechanism
    this.apiCaller
      .post("http://localhost:5000/deleteRequest",
        body, { 'headers': headers })
      .subscribe((resp) => {

      });
    document.querySelectorAll("#remove")[i].setAttribute('hidden', "kmn");

  }

}
class Request {
  email_from = "ii";
  toId = "ll";

}
class response {
  dt;
  row;
  error;
}


