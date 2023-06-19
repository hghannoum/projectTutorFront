import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, Routes } from '@angular/router';
import { fromEvent, merge, range } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { ThemeService } from '../services/theme/theme.service';
import { UserService } from '../services/userService/user.service';
@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {
  submitted: boolean;emails;emaillog;tutor=true;userlogin;
  title = 'tutorsleb'; userInfo : User2 = null;
 paslog ='';cat="primary";mat="maths";city="Tripoli";fullname='';pass='';email='';usernames=null;
  pas1=null;pas2=null;bio='';othersub=null;othercity=null;way="Online"
  jmle='Connect with students around Lebanon.'
  type="I'm student";jmle2='Worry less about agenda and comminucation and focus more on providing your services to your students.'
  courseForm: FormGroup;
  usermain; 
  cities=["Beirut","Tripoli","Sidon","Tyre","Nabatîyé","Djounie","Zahle","Baalbek","other"];
  category=["primary",'secondary','university','other']
  

  subjects: string[] =["maths",'physics','language','chemistry','coding','sociology','history','music','other'] ;

  constructor(private themeService: ThemeService,private user:UserService,
     private apiCaller : HttpClient,private router: Router, 
     private formBuilder: FormBuilder , private snackbar :MatSnackBar
     ) 
  {
  }
  
log(){
  document.querySelector("#login").removeAttribute('hidden')
  document.querySelector("#first").setAttribute('hidden',"")

}
sign(){
  
  document.querySelector("#login").setAttribute('hidden','')

  document.querySelector("#sign").removeAttribute('hidden')
  document.querySelector("#first").setAttribute('hidden',"")
}
back(){
  document.querySelector("#login").setAttribute('hidden','')
  document.querySelector("#sign").setAttribute('hidden','')
  document.querySelector("#first").removeAttribute('hidden')

}
  toggle() {
   
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
      document.querySelector("#dark").classList.remove('fa-moon');
      this.themeService.setTheme('dark');
      document.querySelector("#dark").classList.add('fa-sun');
    } else {
      this.themeService.setTheme('light');
      document.querySelector("#dark").classList.remove('fa-sun');
      document.querySelector("#dark").classList.add('fa-moon');

    }
  }

toggleTs(){
 
  this.tutor= !this.tutor;
  if( this.type=="I'm tutor")
{  document.querySelector("#tutor").removeAttribute('hidden')
   document.querySelector("#student").setAttribute('hidden','l')
   this.type="I'm student";
    this.jmle='Conncet with students around Lebanon.'
    this.jmle2='Worry less about agenda and comminucation and focus more on providing your services to your students.'
    
}
else{document.querySelector("#student").removeAttribute('hidden')
document.querySelector("#tutor").setAttribute('hidden','l')
this.type="I'm tutor";
this.jmle='Give your grades a boost with TutorLeb.'
this.jmle2='Find in-person tutor or online just in 2 minutes at your home'

}
}  
regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
passMatch=false;data;matieres=['maths','physics'];
ngOnInit (){


 
  var pass1=document.getElementById('pass1');
  var emaillog=document.getElementById('emaillog');
  var passlog=document.getElementById('passlog');
  var pass2=document.getElementById('pass2');
  var users=document.getElementById('usernames');
  var email=document.getElementById('emails');
 
   
  var event2=fromEvent(pass2,'keyup');
  var event1=fromEvent(pass1,'keyup');
  var event3=fromEvent(passlog,'keyup');
  var event4=fromEvent(emaillog,'keyup');
  var event5=fromEvent(email,'keyup');
  var event6=fromEvent(users,'keyup');
  var events= merge( event2,event1,event5,event6);
    
   events.pipe().subscribe(
     x=>{
   document.querySelector("#falseem").setAttribute('hidden'," "),
   document.querySelector("#falseex").setAttribute('hidden'," "),
     document.querySelector("#req").setAttribute('hidden'," ")

   });
   event2.pipe(debounceTime(1000),filter(x=>this.pas1!=this.pas2)).subscribe(x=>{document.querySelector("#rtl").removeAttribute('hidden'),this.passMatch=false});
   event2.pipe(debounceTime(1000),filter(x=>this.pas1==this.pas2)).subscribe(x=>{document.querySelector("#rtl").setAttribute('hidden'," "),this.passMatch=true});
   event1.pipe().subscribe(x=>document.querySelector("#dis").removeAttribute("disabled"))
   event3.pipe().subscribe(x=>{document.querySelector("#false").setAttribute('hidden'," ")});
   event4.pipe().subscribe(x=>{document.querySelector("#false").setAttribute('hidden'," ")});

  }
 
signupF(){
  
this.register();

}
  signupp(){
        if(this.usernames!=null && this.regex.test(this.emails)&&  this.pas2!=null && this.pas1==this.pas2){
          
            const headers = { 'content-type': 'application/json'}
            const dataa = {
             
              "email": this.emails, 
          };  
            const body=JSON.stringify(dataa);
          
        try{
            setInterval(()=>{},5000) //: Pulling Mechanism
           this.apiCaller
             .post("http://localhost:5000/check-email", body,{'headers':headers})
              .subscribe((resp)=>{ 
                if((<response>resp).error!=null)
                this.snackbar.open((<response>resp).error, 'Ok', {
                 duration: 3000
               });
               else{
                document.querySelector("#spinner").setAttribute('hidden',"");
              document.querySelector("#body").classList.remove('blur');
   
              if(!(<any>resp).is_available) document.querySelector("#falseex").removeAttribute('hidden');
                else{
         
          
            document.querySelector("#info").removeAttribute('hidden');
                document.querySelector("#sign").setAttribute('hidden','') ;
                
        
                 // } })
                }
          
                }});}
                catch{
                  document.querySelector("#spinner").setAttribute('hidden',"");
                  document.querySelector("#body").classList.remove('blur');
                  this.snackbar.open('Connection error', 'Ok', {
                    duration: 3000
                  });
                }
          }
      
          
      
      else {
        if(!this.regex.test(this.emails))
         document.querySelector("#falseem").removeAttribute('hidden');
         if(this.usernames==null || this.pas1==null || this.pas2==null )   document.querySelector("#req").removeAttribute('hidden');
  
      }
    
    }
  error;
  loginn(){
    document.querySelector("#spinner").removeAttribute('hidden');
    document.querySelector("#body").classList.add('blur');
    
    
        
        const headers = { 'content-type': 'application/json'}
        const data = {
         
          "email": this.emaillog, 
          "password":(<HTMLInputElement>document.getElementById('passlog')).value,
          
          
      };  
        const body=JSON.stringify(data);
    try{
        setInterval(()=>{},5000) //: Pulling Mechanism
       this.apiCaller
         .post("http://localhost:5000/login", body,{'headers':headers})
          .subscribe((resp)=>{
            
    document.querySelector("#spinner").setAttribute('hidden',"");
    document.querySelector("#body").classList.remove('blur');
            if(resp==null){
              this.error='Invalid email or password.';
              document.querySelector("#false").removeAttribute('hidden');}
            else{
             const {id_user,
              username, first_name,
              last_name,
              category, city_name,pass, img, email, bio, id_role, way, subject_name}= <any>resp;
    //   this.userlogin= new User2();
    //   this.userlogin.username = username;
    //   this.userlogin.pass= pass; 
    //   this.userlogin.mat= subject_name;
    //   this.userlogin.country= city_name;
  
    //   this.userlogin.cat=category;//this.cat;
    //   this.userlogin.email=email;
    //   this.userlogin.fullname=first_name;
    //   this.userlogin.bio=bio;
    //   this.userlogin.img=img;
    //   this.userlogin.way=way;
    //  this.userlogin.tutor=(id_role === 2) ? true : false;
     this.data=this.userlogin;
          this.user.User2.next([1,username,username,pass,
          email,
           img,bio,subject_name,city_name,
         category,(id_role === 2) ? true : false,way]);
              this.router.navigate(['profile']);
              
            }
          })}
          catch{
            document.querySelector("#spinner").setAttribute('hidden',"");
            document.querySelector("#body").classList.remove('blur');
            this.snackbar.open('Connection error', 'Ok', {
              duration: 3000
            });
          }
      
     
    
  
    
    
    }
   register()
{  
      document.querySelector("#spinner").removeAttribute('hidden');
      document.querySelector("#body").classList.add('blur');
  
      this.submitted = true;
      this.userInfo = new User2();
      this.userInfo.username = this.usernames;
      this.userInfo.pass=this.pas1; 
      if(this.othersub!=null) 
      this.userInfo.mat= this.othersub;
       else this.userInfo.mat= this.mat;
      if(this.othercity!=null) 
        this.userInfo.country= this.othercity;
       else this.userInfo.country= this.city;
  
      this.userInfo.cat=this.cat;//this.cat;
      this.userInfo.email=this.emails;
      this.userInfo.fullname=this.usernames;
      this.userInfo.bio=this.bio;
      this.userInfo.img="../../assets/images/unn.jpg";
      this.userInfo.way=this.way;
     this.userInfo.tutor=this.tutor;

      const headers = { 'content-type': 'application/json'}
      const body=JSON.stringify(this.userInfo);
     
try{
      setInterval(()=>{},5000) //: Pulling Mechanism
     this.apiCaller
       .post("http://localhost:5000/signup", body,{'headers':headers})
        .subscribe((resp)=>{
          
          document.querySelector("#spinner").setAttribute('hidden',"");
          document.querySelector("#body").classList.remove('blur');
          
         
          this.user.User2.next([1,this.usernames,this.usernames,"pass",
           this.emails,
            "../../assets/images/unn.jpg",this.bio,this.mat,this.city,
          this.cat,this.tutor,this.way]);
          this.router.navigate(["profile"]);
        })}
        catch{
          document.querySelector("#spinner").setAttribute('hidden',"");
                  document.querySelector("#body").classList.remove('blur');
                  this.snackbar.open('Connection error', 'Ok', {
                    duration: 3000
                  });
        }

}
initPrefersColorScheme(arg0: string): any {
  throw new Error('Function not implemented.');
}
}


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
class response{
  dt;
  row;
  error;
}

