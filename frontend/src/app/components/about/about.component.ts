import { Component } from '@angular/core';
// import AOS from 'aos';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  image:string='images/hack.jpg'

  messages: string[] = [
    "Every soul has a secret... What's yours?",
    "Confess your thoughts, anonymously...",
    "Your secrets are safe here..."
  ];

  currentMessage: string = "";
  private messageIndex = 0;
  private charIndex = 0;
  private typingSpeed = 80; // Base speed in ms

  ngOnInit(): void {
    this.typeNextMessage();
  }

  typeNextMessage() {
    if (this.charIndex < this.messages[this.messageIndex].length) {
      this.currentMessage += this.messages[this.messageIndex].charAt(this.charIndex);
      this.charIndex++;

      // Simulating a human-like typing speed
      let randomSpeed = this.typingSpeed + Math.random() * 80;
      setTimeout(() => this.typeNextMessage(), randomSpeed);
    } else {
      // Pause before erasing
      setTimeout(() => this.eraseText(), 2000);
    }
  }

  eraseText() {
    if (this.charIndex > 0) {
      this.currentMessage = this.currentMessage.substring(0, this.charIndex - 1);
      this.charIndex--;

      let randomSpeed = this.typingSpeed / 2;
      setTimeout(() => this.eraseText(), randomSpeed);
    } else {
      // Move to next message and restart typing
      this.messageIndex = (this.messageIndex + 1) % this.messages.length;
      setTimeout(() => this.typeNextMessage(), 500);
    }

   
  }
}
