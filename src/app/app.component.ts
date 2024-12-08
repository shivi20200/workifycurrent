import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;  // Flag to indicate if the user is logged in
  isEmployer = false;  // Flag to check if the logged-in user is an employer

  constructor() {
    this.checkLoginStatus();  // Check login status on initialization
  }

  /**
   * Checks if the user is logged in and if the logged-in user is an employer.
   */
  checkLoginStatus() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.isLoggedIn = true;
      const decodedToken = this.decodeJWT(authToken);
      if (decodedToken && decodedToken.role === 'Employer') { // Assuming the role is in the JWT token payload
        this.isEmployer = true;
      }
    }
  }

  /**
   * Decodes the JWT token and returns the payload.
   */
  decodeJWT(token: string) {
    const payload = token.split('.')[1]; // JWT has 3 parts: header, payload, and signature
    const decoded = atob(payload);  // Decode the base64 encoded payload
    return JSON.parse(decoded);  // Parse the decoded payload as JSON
  }

  /**
   * Logs the user out by clearing the authToken from localStorage.
   */
  logoff() {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.isEmployer = false;
  }
}

  /**
   * Checks if the user is logged in by verifying the presence of the authToken in localStorage.
   */
  // checkLoginStatus() {
  //   const authToken = localStorage.getItem('authToken'); // Retrieve the token
  //   this.isLoggedIn = !!authToken; // Set isLoggedIn to true if token exists
  // }

  /**
   * Logs the user out by clearing the authToken from localStorage
   * and updating the isLoggedIn flag.
   */
//   logoff() {
//     localStorage.removeItem('authToken'); // Remove the token from localStorage
//     this.isLoggedIn = false; // Update the logged-in status
//   }
// }