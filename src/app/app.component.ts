import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Arkenea';
  displayedColumns: string[] = ['name', 'email', 'gender', 'address','date','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api :ApiService){

  }
ngOnInit(): void {
  this.getAlluser();
}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'50%'
    }).afterClosed().subscribe(val=>
      {

        if(val==="submit"){
          this.getAlluser();
        }
      })

  }
getAlluser(){
this.api.getuser()
.subscribe({
  next:(res)=>{
   this.dataSource= new MatTableDataSource(res)
   this.dataSource.paginator =this.paginator;
   this.dataSource.sort=this.sort
  },
  error:(err)=>{
    alert("error while fetching tha record !!")
  }
})
}

edituser(row :any){
  this.dialog.open(DialogComponent,{
    width:'30%',
data:row
  }).afterClosed().subscribe(val=>{
    if(val==="update"){
      this.getAlluser();
    }
  })
  }
  

  deleteuser(id:number){
this.api.deletuser(id)
.subscribe({
  next:(res)=>{
    alert("user Deleted successfully");
    this.getAlluser();
  },
  error:()=>{
    alert("Error While deleting User")
  }
})

  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
  }

}

