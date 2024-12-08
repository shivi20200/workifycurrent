import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http'; // Import HttpClientModule
import { inject } from '@angular/core';
import { JobService } from 'src/app/service/job.service';




@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  imports: [FormsModule] 
 
})

export class RegistrationComponent {
  // Define user object to match the registration request body
  userObj: any = {
    userId: 0,
    name: '',
    email: '',
    password: '',
    role: 'JobSeeker', // Default role set to JobSeeker
  };

  // Dropdown options for role selection
  roles = ['JobSeeker', 'Employer'];

  constructor(private jobService: JobService) {}

  register() {
    console.log('Request Payload:', this.userObj); // Log request payload
  
    this.jobService.registerUser(this.userObj).subscribe(
      (res: any) => {
        console.log('API Response:', res); // Log API response
        if (res && res.userId) {
          alert('Registration Successful!');
          console.log('User registered successfully:', res);
          this.resetForm(); // Reset the form after success
        } else {
          console.error('Unexpected API Response:', res);
          alert('Registration failed. Please try again.');
        }
      },
      (error) => {
        console.error('API Error:', error); // Log error details
        alert('An error occurred during registration. Please try again.');
      }
    );
  }


  // Reset the form after successful registration
  resetForm() {
    this.userObj = {
      userId: 0,
      name: '',
      email: '',
      password: '',
      role: 'JobSeeker',
    };
  }
}
