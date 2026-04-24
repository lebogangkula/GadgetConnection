import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
 // Import controller script

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App{
 protected readonly title = signal('GadgetConnect');

  addNumber: string = "";
  LabNumbers: string[] = [];
  showContacts: boolean = false;
  sms: string = "";
  savedNumbers: any;
  connection:any;
  devices: any;

 

  deviceName = 'MyDevice'; // you can make this dynamic later
  userCode!: string;

  constructor(private http: HttpClient) {}


  ngOnInit(){
     
this.http.post('http://127.0.0.1:8000/register/', { device_name: this.deviceName })
  .subscribe({
    
    next: (response) => console.log('Registered:', response),
    error: (err) => console.error('Request failed:', err),
    complete: () => console.log('Request complete')
  });


  }
    
  



  SaveNumber() {
  this.http.post('http://127.0.0.1:8000/register/', { device_name: this.deviceName });
 


}

// Load saved numbers when app starts
LoadNumbers() {
 
}

  GadgetSMS() {
    // Basic popup prompt for SMS input
    
   
  }
   messageCount = 0;

  // Simulate message updates
  addMessage() {
    
  }
  pressedKey(num: string) {
    if (this.addNumber.length < 15) {
      this.addNumber += num;
      console.log(this.addNumber);
    } else {
      alert("Maximum number of digits reached");
      
    }
  }

  CancelNumber() {
    this.addNumber = "";
  }

   selectContact(contact: string) {
    this.addNumber = contact;
    this.showContacts = false;
  }

  hideContacts() {
    // Delay hiding so click event can register
    const stored = localStorage.getItem("LabNumbers");
this.savedNumbers = stored ? JSON.parse(stored) : [];
console.log(this.savedNumbers);
    setTimeout(() => this.showContacts = false, 200);
  }
  GadgetCall() {
 
  }

 addNum(value: string){

 }
  CancelSubscription() {
  
    }
  
  
}
