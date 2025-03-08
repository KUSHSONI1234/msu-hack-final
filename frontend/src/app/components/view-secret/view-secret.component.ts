import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-secret',
  templateUrl: './view-secret.component.html',
  styleUrls: ['./view-secret.component.css'],
  imports:[FormsModule,CommonModule]
})
export class ViewSecretComponent implements OnInit {
  secretMessage: string = "";
  errorMessage: string = "";
  messageDeleted: boolean = false; // Flag to track deletion

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const messageId = this.route.snapshot.paramMap.get('id'); // Get Message ID from URL

    if (!messageId) {
      this.errorMessage = "Invalid or expired link.";
      return;
    }

    // ✅ Fetch the secret message from the backend
    this.http.get<{ message: string }>(`${environment.apiUrl}/secret/${messageId}`)
  .subscribe({
    next: (response) => {
      this.secretMessage = response.message;
    },
    error: (err) => {
      this.errorMessage = "Message expired or deleted.";
      console.error("Error fetching message:", err);
    }
  });

  }

  // ✅ Function to delete message from the database
  deleteMessage(messageId: string) {
    this.http.delete(`${environment.apiUrl}/secret/${messageId}`)
      .subscribe({
        next: () => {
          this.messageDeleted = true; // Update flag
          this.secretMessage = "";
          this.errorMessage = "Message expired or deleted.";
        },
        error: (err) => {
          console.error("Error deleting message:", err);
        }
      });
  }
}
