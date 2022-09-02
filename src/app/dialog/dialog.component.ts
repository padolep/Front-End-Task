import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  genderlist = ['male', 'Female'];
  adduserform!: FormGroup;
  actionbtn:string="Submit"

  constructor(private formBuilder: FormBuilder, 
    private api: ApiService ,
 @Inject(MAT_DIALOG_DATA) public editData :any,
    
 private dialogref:MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    this.adduserform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required]
    });
    if(this.editData){
      this.actionbtn="submit";
      this.adduserform.controls['name'].setValue(this.editData.name);
          
          this.adduserform.controls['email'].setValue(this.editData.email);
          
          this.adduserform.controls['gender'].setValue(this.editData.gender);
          
          this.adduserform.controls['address'].setValue(this.editData.address);
          
          this.adduserform.controls['date'].setValue(this.editData.date);
          }
  }

  adduser() {
 if(!this.editData){

 if (this.adduserform.valid) {
    this.api.postuser(this.adduserform.value)
     .subscribe({
         next: (res)=>{
           alert("user add successfully")
           this.adduserform.reset();
           this.dialogref.close('save');
           
         },
         
         error:()=>{
           alert("Error while adding the user")
         },

         
       });
      

     }
  } 
  else{
    this.updateuser()
    

    
  }
 }

 updateuser(){
  this.api.putuser(this.adduserform.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("user Update successfully")
      this.adduserform.reset();
      this.dialogref.close("update");

    },
error:()=>{
  alert("Error while updating the user ")

}
  })
 }
}

   