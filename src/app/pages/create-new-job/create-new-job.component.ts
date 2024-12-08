

import { Component } from '@angular/core';
import { JobService } from 'src/app/service/job.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-new-job',
  standalone: true,
  imports:[FormsModule,CommonModule],
  templateUrl: './create-new-job.component.html',
  styleUrls: ['./create-new-job.component.css']
})
export class CreateNewJobComponent {
  job = {
    jobId: 0,
    title: '',
    description: '',
    qualifications: '',
    salary: 0,
    jobType: '',
    requiredSkills: '',
    employerId: 0,
    location: '',
    industry: ''
  };

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    const employerId = localStorage.getItem('employerId');
    if (!employerId) {
      alert('Please create an employer profile first.');
      this.router.navigate(['/create-employer-profile']);
    } else {
      this.job.employerId = +employerId;
    }
  }

  createJob(): void {
    this.jobService.createJob(this.job).subscribe(
      (response) => {
        alert('Job created successfully!');
        this.router.navigate(['/job-listing']);
      },
      (error) => {
        console.error('Error creating job:', error);
      }
    );
  }
}
