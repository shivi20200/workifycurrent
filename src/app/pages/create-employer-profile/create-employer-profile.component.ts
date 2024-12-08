

// import { Component } from '@angular/core';
// import { JobService } from 'src/app/service/job.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-create-employer-profile',
//   standalone: true,
//   imports:[FormsModule,CommonModule],
//   templateUrl: './create-employer-profile.component.html',
//   styleUrls: ['./create-employer-profile.component.css']
// })
// export class CreateEmployerProfileComponent {
//   company = {
//     companyId: 0,
//     companyName: '',
//     address: '',
//     description: '',
//     website: ''
//   };

//   constructor(
//     private jobService: JobService, 
//     private router: Router
//   ) {}

//   createCompany(): void {
//     const token = localStorage.getItem('jwtToken');
//     if (!token) {
//       alert('User not logged in.');
//       return;
//     }

//     const companyId = this.company.companyId;
//     if (companyId) {
//       // Check if the company exists by ID
//       this.jobService.getCompanyById(companyId).subscribe(
//         (companyResponse) => {
//           if (companyResponse) {
//             // If the company exists, link it to the employer profile
//             this.createEmployer(token, companyResponse.companyId);
//           } else {
//             alert('Company not found. Please create a new company.');
//           }
//         },
//         (error) => {
//           console.error('Error fetching company:', error);
//           alert('Error fetching company details. Please try again.');
//         }
//       );
//     } else {
//       // Create a new company if ID is not provided
//       this.jobService.createCompany(this.company).subscribe(
//         (createdCompany) => {
//           this.createEmployer(token, createdCompany.companyId);
//         },
//         (error) => {
//           console.error('Error creating company:', error);
//           alert('Error creating company. Please try again.');
//         }
//       );
//     }
//   }

//   createEmployer(token: string, companyId: number): void {
//     const employerRequest = {
//       employerId: 0,
//       userId: this.decodeUserIdFromToken(token),
//       companyId: companyId
//     };

//     this.jobService.createEmployer(employerRequest).subscribe(
//       (response) => {
//         localStorage.setItem('employerId', response.employerId.toString());
//         alert('Employer profile created successfully.');
//         this.router.navigate(['/create-job']);
//       },
//       (error) => {
//         console.error('Error creating employer profile:', error);
//         alert('Error creating employer profile. Please try again.');
//       }
//     );
//   }

//   // Helper function to decode the user ID from the JWT token
//   decodeUserIdFromToken(token: string): number {
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
//       return payload.userId; // Assuming 'userId' is part of the JWT payload
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       throw new Error('Invalid token format');
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/service/job.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-employer-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-employer-profile.component.html',
  styleUrls: ['./create-employer-profile.component.css']
})
export class CreateEmployerProfileComponent implements OnInit {
  companies: any[] = []; // Inline type for companies
  selectedCompany: number | null = null; // Stores selected company ID
  showCreateCompanyForm = false; // Controls visibility of the "Create New Company" form
  newCompany: any = { // Inline type for new company
    companyId: 0,
    companyName: '',
    address: '',
    description: '',
    website: ''
  };
  employerProfile: any = { // Inline type for employer profile
    employerId: 0,
    userId: 0, // Will be updated with userId from token
    companyId: 0
  };

  constructor(private employerService: JobService) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.setUserIdFromAuthToken(); // Set the userId from the authToken
  }

  // Load the list of companies
  loadCompanies(): void {
    this.employerService.getCompanies().subscribe(
      (data) => {
        this.companies = data;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  // Extract the userId from the authToken stored in localStorage
  setUserIdFromAuthToken(): void {
    const token = localStorage.getItem('authToken'); // Retrieve authToken from localStorage
    if (token) {
      const decodedToken: any = this.decodeJWT(token); // Decode the JWT token
      this.employerProfile.userId = decodedToken.userId; // Set the userId from the decoded token
    } else {
      console.error('No authToken found in localStorage');
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

  // Create a new company
  createCompany(): void {
    this.employerService.createCompany(this.newCompany).subscribe(
      (data) => {
        console.log('Company created successfully:', data);
        this.companies.push(data); // Add the newly created company to the list
        this.selectedCompany = data.companyId; // Automatically select the new company
        this.showCreateCompanyForm = false; // Hide the form after submission
      },
      (error) => {
        console.error('Error creating company:', error);
      }
    );
  }

  // Submit the employer profile
  onSubmit(): void {
    if (!this.selectedCompany) {
      alert('Please select a company or create one first.');
      return;
    }

    this.employerProfile.companyId = this.selectedCompany;

    this.employerService.createEmployerJob(this.employerProfile).subscribe(
      (data) => {
        console.log('Employer profile created successfully:', data);
        alert('Employer profile created successfully!');
      },
      (error) => {
        console.error('Error creating employer profile:', error);
      }
    );
  }
}







