import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-confession',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-confession.component.html',
  styleUrls: ['./post-confession.component.css']
})
export class PostConfessionComponent implements OnInit {
  textBox: string = '';  
  confessions: { _id?: string; message: string; createdAt?: string }[] = [];
  private apiUrl = 'http://localhost:5000/api/confession';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchConfessions(); // Fetch on page load
  }

  // ✅ Fetch Confessions on Page Load
  fetchConfessions() {
    this.http.get<{ _id?: string; message: string; createdAt?: string }[]>(this.apiUrl).subscribe(
      (data) => {
        console.log("Fetched Confessions:", data);
        this.confessions = data.reverse();
      },
      (error) => {
        console.error("Error fetching confessions:", error);
        alert("Failed to load confessions. Please try again later.");
      }
    );
  }

  // ✅ Post a New Confession & Update UI Immediately
  onSave() {
    if (!this.textBox.trim()) {
      alert("Enter your confession.");
      return;
    }

    const newConfession = { message: this.textBox };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string; confession: { _id?: string; message: string; createdAt?: string } }>(
      this.apiUrl, 
      newConfession, 
      { headers }
    ).subscribe(
      (response) => {
        console.log("Confession posted:", response);

        if (response && response.confession && response.confession.message) {
          this.confessions.unshift(response.confession);  // ✅ Show new confession instantly
        } else {
          console.warn("Unexpected API response format:", response);
          alert("Failed to post confession. Try again.");
        }

        this.resetForm();
      },
      (error) => {
        console.error("Error posting confession:", error);
        alert(error.error?.error || "Failed to post confession. Try again.");
      }
    );
  }

  resetForm() {
    this.textBox = '';
  }
}
