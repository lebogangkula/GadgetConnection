import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
 // Import controller script

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 protected readonly title = signal('GadgetConnect');
  
  addNumber: string = "";
  LabNumbers: string[] = [];
  showContacts: boolean = false;
  sms: string = "";
 
  SaveNumber() {
    if (this.addNumber !== "" && this.addNumber.length > 4 && this.addNumber.length < 15 && !this.LabNumbers.includes(this.addNumber)) {
      this.LabNumbers.push(this.addNumber);
      alert("Number " + this.addNumber + " saved & subscribed");
    }
  }

  GadgetSMS() {
    // Basic popup prompt for SMS input

    const smsMessage = prompt("Enter your SMS message:");

    if (smsMessage !== null && smsMessage.trim() !== "" && this.addNumber !== "" && this.addNumber.length > 4 && this.addNumber.length < 15 && this.LabNumbers.includes(this.addNumber)) {
      // For now, just log or alert the message
      this.sms = smsMessage;
      console.log(this.addNumber + " "+ smsMessage);
      alert(smsMessage);

      // Later, you can integrate with an SMS API here
      // e.g., call a backend service to send the SMS
    } else {
      alert("No message entered.");
    }
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
    setTimeout(() => this.showContacts = false, 200);
  }
  GadgetCall() {
    if (this.addNumber !== "" && this.addNumber.length > 4 && this.addNumber.length < 15 && this.LabNumbers.includes(this.addNumber)) {
      // Use controller to simulate SMS/call
      alert("on call ... or SMS sent");
      this.addNumber = "";
    } else {
      alert("add contacts");
    }
  }

 addNum(value: string){

 }
  CancelSubscription() {
    if (this.addNumber !== "") {
      alert("Number " + this.addNumber + " unsubscribed");
      this.addNumber = "";
    }
  }
}
