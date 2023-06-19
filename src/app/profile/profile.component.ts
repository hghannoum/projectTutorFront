import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { fromEvent, merge } from 'rxjs';
import { UserService } from '../services/userService/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   name='ll';profile;city='';cat='';mat='maths';bio='';username=''
   cities=["Beirut","Tripoli","Sidon","Tyre","Nabatîyé","Djounie","Zahle","Baalbek","other"];
  category=["primary",'secondary','university','other']
  
  subjects: string[] =["maths",'physics','language','chemistry','coding','sociology','history','music','other'] ;
  userInfo: User2;changedImg=false;

  constructor(private apicaller: HttpClient, private user:UserService, private route :Router ) {  
    
    this.user.User2.subscribe
    ( arg => this.profile = arg);
  
console.log(this.profile)
    this.load();
    
    }
    load(){
      this.username=this.profile[1];
      this.bio=this.profile[6];
      this.cat=this.profile[9];
     
      this.city=this.profile[8];this.othercity=this.profile[8];
      this.email=this.profile[4];
      this.img=this.profile[5]==""?"../../assets/images/unknown_profile.png":this.profile[5];
      this.mat='maths';this.othersub=this.profile[7];
      this.way=this.profile[11];
    }
    changeImg(){
      this.change();
      this.changedImg=true;
      function readURL() {
        var input=(<HTMLInputElement>document.getElementById("input_img"))
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    readURL()
    }
  hide(){
  document.querySelector("#save").setAttribute('hidden',"");
  document.querySelector("#cancel").setAttribute('hidden',"");
  }
  change(){
    document.querySelector("#save").removeAttribute('hidden');
    document.querySelector("#cancel").removeAttribute('hidden');

  }
  email;img;way;
  ngOnInit(): void {
    
  }
  edit(){
    $("#input_img").click();
  }

  data:string;othersub=null;othercity=null;
  update()
  {    
        this.userInfo = new User2();
        this.userInfo.username = this.username;
        this.userInfo.pass=this.profile[3]; 
        if(this.othersub!=null) 
        this.userInfo.mat= this.othersub;
         else this.userInfo.mat= this.mat;
        if(this.othercity!=null) 
          this.userInfo.country= this.othercity;
         else this.userInfo.country= this.city;
    
        this.userInfo.cat=this.cat;//this.cat;
        this.userInfo.email=this.email;
        this.userInfo.fullname=this.username;
        this.userInfo.bio=this.bio;
        this.userInfo.way=this.way;
       this.userInfo.tutor=this.profile[10];
       this.userInfo.email=this.email ;
      if(true)
        {  this.changedImg=false;
           var lil="",userSend=this.userInfo;
          var file = document.getElementById('input_img');
          var form = new FormData();var jx ;
          form.append("image",(<HTMLInputElement> file).files[0])
          var settings = {
            "url": "https://api.imgbb.com/1/upload?key=0300f09155e4e364172be2f0ec32e9d2",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
          };
          $.ajax(settings).done(function(response){
          {
            jx = JSON.parse(response);
            lil=jx.data.url;
            
          }}).then((result) => {
              userSend.img=lil;
              const headers = { 'content-type': 'application/json'}
              
              const body={"img": userSend.img, "username":this.username, "category": this.cat, "bio": this.bio,
               "city":this.city, "email": this.email};
console.log(body)
              setInterval(()=>{},5000) //: Pulling Mechanism
              this.apicaller
                .post("http://localhost:5000/updateUser", body,{'headers':headers})
                .subscribe((resp)=>{
                this.hide();
                })
})}
}}
class User2
{
  username : string = '';
  fullname: string = '';
  cat;
  mat;
  country;
  pass='';
  img="";
  email='';
  bio="";
  tutor;
  way="Online";

}

