import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/angular';
import { UserService } from '../services/userService/user.service';
import Tooltip from 'tooltip.js'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  tooltip: any;

  manage() {
    const headers = { 'content-type': 'application/json' }
    const dataa = { "email": this.usermain[4] };

    const body = JSON.stringify(dataa);

    setInterval(() => { }, 5000) //: Pulling Mechanism
    this.apicaller
      .post("http://localhost:5000/getstudents",
        body, { 'headers': headers })
      .subscribe((resp) => {
        if ((<response>resp).error != null)
          this.snackbar.open((<response>resp).error, 'Ok', {
            duration: 3000
          });
        else {
          this.connectionList = (<response>resp);
          console.log(this.connectionList)

        }
      })
    document.querySelector("#manage").removeAttribute('hidden');
    document.querySelector("#calendar").setAttribute('hidden', "");


  }
  back() {

    document.querySelector("#manage").setAttribute('hidden', "");
    document.querySelector("#calendar").removeAttribute('hidden');
  }
  date = Date.now;
  constructor(private snackbar: MatSnackBar,
    private apicaller: HttpClient, private user: UserService) {

    this.Meetings = [{
      title: 'Meeting with John',
      start: '2023-03-26T10:00:00',
      end: '2023-03-26T12:00:00',
      description: 'Discuss project progress',
      color: '#378006',
      allDay: false
    }
    ]



    //    subscribe(x => req.from = x);


  }
  hideadd() {
    document.querySelector("#table").removeAttribute('hidden')
    document.querySelector("#form").setAttribute('hidden', "")
  }
  displayadd() {

    document.querySelector("#form").removeAttribute('hidden')
    document.querySelector("#table").setAttribute('hidden', "")
  }
  addEvent() {
    var meet = new schedule();
    meet.student_emails =
      (<HTMLInputElement>document.getElementById('to')).textContent;
    console.log(meet.student_emails)
    if (meet.student_emails == "") {
      document.querySelector("#noStudent").removeAttribute('hidden');
      setTimeout(() => {
        document.querySelector("#noStudent").setAttribute('hidden', "")
      }, 5000)
    }
    else {
      meet.description += meet.tutor_email + "\n" + "Students : " + meet.student_emails;
      //  var emails="";
      //   meet.student_emails.split(', ').forEach(val => {
      //     this.connectionList.find(function(item){
      //       if(item.username==val)  emails+=item.email +",";
      //     })
      //   }); 
      //   meet.student_emails=emails.substring(0,emails.length-2);



      meet.tutor_email = this.usermain[4];
      meet.start =
        (<HTMLInputElement>document.getElementById('fdate')).value
        + "T" + (<HTMLInputElement>document.getElementById('fstart')).value + ":00";
      const dateObj2 = new Date(meet.start);
      meet.start = dateObj2.toISOString().slice(0, 19).replace('T', ' ');
      meet.end =
        (<HTMLInputElement>document.getElementById('fdate')).value
        + "T" + (<HTMLInputElement>document.getElementById('fend')).value + ":00";
      const dateObj = new Date(meet.end);
      meet.end = dateObj.toISOString().slice(0, 19).replace('T', ' '); // convert to SQL DATETIME format


      meet.title =
        (<HTMLInputElement>document.getElementById('ftitle')).value.trim() !== '' ?
          (<HTMLInputElement>document.getElementById('ftitle')).value : 'meeting'
        ;
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(meet);
      console.log(body)
      setInterval(() => { }, 5000) //: Pulling Mechanism
      this.apicaller
        .post("http://localhost:5000/insertMeeting",
          body, { 'headers': headers })
        .subscribe((resp) => {

        });
      this.back();
    }
  }

  usermain; Meetings: any;


  start = null; toppings; connectionList = null; calendarOptions: CalendarOptions;
  calendarOptions2: CalendarOptions;
  async ngOnInit() {

    this.user.User2.subscribe(resp => this.usermain = resp);
    const headers = { 'content-type': 'application/json' }
    const dataa = {

      "email": this.usermain[4]
    }
    const body = JSON.stringify(dataa);
    this.Meetings =
      await this.apicaller
        .post("http://localhost:5000/getSchedule",
          body, { 'headers': headers })
        .toPromise();
    this.calendarOptions = {


      initialView: 'timeGridDay',
      events: this.Meetings, eventColor: '#378006', displayEventTime: true,

    };


  }




}

class schedule {
  student_emails = "";
  tutor_email = "";
  start;
  end;
  title;
  description = "Tutor : "

}
class response {
  dt;
  row;
  error;
}


