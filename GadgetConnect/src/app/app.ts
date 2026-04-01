import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
 // Import controller script

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 protected readonly title = signal('GadgetConnect');
  
  addNumber: string = "";
  LabNumbers: string[] = [];

  GadgetInfor() {
    // Example: show all subscribers from controller
  }

  SaveNumber() {
    if (this.addNumber !== "" && this.addNumber.length > 4 && this.addNumber.length < 15 && !this.LabNumbers.includes(this.addNumber)) {
      this.LabNumbers.push(this.addNumber);
      alert("Number " + this.addNumber + " saved & subscribed");
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

  GadgetCall() {
    if (this.addNumber !== "" && this.addNumber.length > 4 && this.addNumber.length < 15 && this.LabNumbers.includes(this.addNumber)) {
      // Use controller to simulate SMS/call
      alert("on call ... or SMS sent");
      this.addNumber = "";
    } else {
      alert("add contacts");
    }
  }

  CancelSubscription() {
    if (this.addNumber !== "") {
      alert("Number " + this.addNumber + " unsubscribed");
      this.addNumber = "";
    }
  }
}
