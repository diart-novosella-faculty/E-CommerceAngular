import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { AlertifyService } from 'src/services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { User } from 'src/models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User;
  registerForm:FormGroup;
  //when we make partial class we make all attributes optional so we implement only thouse that we want

 

  @Output() cancelRegister = new EventEmitter();
  //FormBuilder easier than new FormControl and more basic syntax than FormGroup
  constructor(private authService:AuthService,private alertify:AlertifyService,private fb:FormBuilder,private router:Router) { }

  ngOnInit() {
   
    this.createRegisterForm();
  }

  //CustomValidator
  passwordMatchValidator(fg:FormGroup){
    //we specify whitch controll we want to get and compare, then we return true or false, if true form status
    // IS VALID else INVALID
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {'mismatch':true};
  }
  createRegisterForm(){
    //this is same as new FormGroup
    this.registerForm=this.fb.group({
      email:['',Validators.required],
      username:['',Validators.required],
      dateOfBirth:[null,Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:['',Validators.required]
    },{validator:this.passwordMatchValidator});
  }
  register(){

    if(this.registerForm.valid){
      //if registerform is in the valid state then register
      //this.regeisterFrom.values copys values and assign those to {} and {} are stored in user
      this.user = Object.assign({},this.registerForm.value);
      this.authService.register(this.user).subscribe(()=>{
        this.alertify.success("Registration successful");
      },error=>{
        this.alertify.error(error);
      },()=>{
        //on complete this method excecutes
        this.authService.login(this.user).subscribe(()=>{
          this.router.navigate(['/products']);
        });
      });
    } 
   //test if its getting values from input
   console.log(this.registerForm.value);
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
