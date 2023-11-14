import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private router: Router,private dialogRef: MatDialogRef<EmailVerificationComponent>) { }

  ngOnInit(): void {
  }

  goLogin(){
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }

}
