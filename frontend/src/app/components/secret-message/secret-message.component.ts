import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-secret-message',
  templateUrl: './secret-message.component.html',
  styleUrls: ['./secret-message.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class SecretMessageComponent implements OnInit {
  secretMessage: string = "";
  secretLink: string = "";
  countdown: number | null = null;
  errorMessage: string = "";
  messageContent: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.fetchSecretMessage();
  }

  generateSecretLink() {
    if (!this.secretMessage.trim()) {
      alert('Shhh... Type your hidden thoughts and hit Generate!');
      return;
    }

    this.http.post<{ sharableLink: string }>(`${environment.apiUrl}/secret`, { message: this.secretMessage })
      .subscribe({
        next: (response) => {
          this.secretLink = response.sharableLink;
          this.startCountdown();
        },
        error: (err) => {
          this.errorMessage = "❌ Error: Unable to generate the link. Try again later!";
          console.error("Error generating link:", err);
        }
      });
  }

  startCountdown() {
    this.countdown = 60;
    const interval = setInterval(() => {
      if (this.countdown !== null && this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
        this.secretLink = "";
        this.countdown = null;
      }
    }, 1000);
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert("✅ Link copied to clipboard!");
    }).catch(() => {
      alert("⚠️ Copy failed. Try manually.");
    });
  }

  fetchSecretMessage() {
    const messageId = this.route.snapshot.paramMap.get('id');
    const key = this.route.snapshot.queryParamMap.get('key');

    if (!messageId || !key) {
      this.errorMessage = "Invalid or expired link.";
      return;
    }

    this.http.get<{ message: string }>(`${environment.apiUrl}/secret/${messageId}?key=${key}`)
      .subscribe({
        next: (response) => {
          this.messageContent = response.message;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Message expired or deleted.";
        }
      });
  }
}
