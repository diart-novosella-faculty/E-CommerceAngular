import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/services/alertify.service';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
    //We use ViewChild to access the form in thiscomponent.html
    @ViewChild('editForm') editForm:NgForm;
  user:User;

  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  constructor(private route:ActivatedRoute,private alertify:AlertifyService,private userService:UserService,private authService:AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user = data['user'];
    })
  }
  updateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid,this.user).subscribe(next=>{
      this.alertify.success("pofile updated successfully");
      this.editForm.reset(this.user);
    },error=>{
      this.alertify.error(error);
    });

  }

}
