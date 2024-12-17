export interface Jobpostings {
  id?:number;
  employeeId: number | null;
  jobTitle: string;
  jobDescription: string;
  rolesAndResponsibilities: string; // Added field for roles and responsibilities
  companyName: string;
  location: string;
  employmentType: string;
  salary: string;
  jobCategory: string;
  skills: string;
  experience: string; // Field for experience
  education: string; // Added field for education
  numberOfOpenings: number; // Added field for number of openings
  lastDate: Date; // Field for the last date to apply
}
