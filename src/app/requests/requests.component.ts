import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/userService/user.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  Con; Req; usermain; MyReq;
  constructor(private apiCaller: HttpClient
    , private user: UserService, private snackbar: MatSnackBar) {

    this.user.User2.subscribe(resp => this.usermain = resp);
    console.log(this.usermain)

  }

  Delete(i, classe, arr) {


    //    subscribe(x => req.from = x);

    console.log(`${classe}${i}`)
    document.getElementById(`${classe}${i}`).setAttribute('hidden', "");
    const headers = { 'content-type': 'application/json' }
    const dataa = { "id_request": arr[i].id_request }

    const body = JSON.stringify(dataa);

    setInterval(() => { }, 5000) //: Pulling Mechanism
    this.apiCaller
      .post("http://localhost:5000/removecon", body, { 'headers': headers })
      .subscribe((resp) => { }
      )
  }

  ok = "Center";
  accept(i) {

    document.getElementById(`req${i}`).setAttribute('hidden', "")
    //    subscribe(x => req.from = x);

    const headers = { 'content-type': 'application/json' }
    const dataa = { "id_request": this.Req[i].id_request }

    const body = JSON.stringify(dataa);
    console.log(body)
    setInterval(() => { }, 5000) //: Pulling Mechanism
    this.apiCaller
      .post("http://localhost:5000/acceptcon", body, { 'headers': headers })
      .subscribe((resp) => {
        try {
          if ((<response>resp).error != '')
            this.snackbar.open((<response>resp).error, 'Ok', {
              duration: 3000
            });
        }
        catch {

        }
      })

  }
  ngOnInit(): void {
    const headers = { 'content-type': 'application/json' }
    const dataa = { "email": this.usermain[4] }

    const body = JSON.stringify(dataa);
    setInterval(() => { }, 2000) //: Pulling Mechanism
    this.apiCaller
      .post("http://localhost:5000/viewRequests", body, { 'headers': headers })
      .subscribe((resp) => {
        if ((<response>resp).error != null)
          this.snackbar.open((<response>resp).error, 'Ok', {
            duration: 3000
          });
        else {

          this.Con = (<any>resp).filter(resp => resp.approved === true);
          this.Req = (<any>resp).filter(resp => resp.email_to === this.usermain[4] && resp.approved === false);
          this.MyReq = (<any>resp).filter(resp => resp.email_from === this.usermain[4] && resp.approved === false);;

          if (this.Con.length == 0)
            document.getElementById("img2").removeAttribute('hidden');

          if (this.Req.length == 0)
            document.getElementById("img1").removeAttribute('hidden');

          if (this.MyReq.length == 0)
            document.getElementById("img3").removeAttribute('hidden');

        }
      })
  }




}
class Request {
  user_to_email = "ii";
  user_from_email = "ll";

}
class response {
  dt;
  row;
  error;
}

