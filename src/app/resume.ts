export interface Resume {
  id?:number;
  jobseekerId: number | null; // Jobseeker ID can be a number or null
  headline: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  languages: string;
  linkedinurl:string;
  permanentAddress: string;
  currentAddress: string;
  profilePhoto: string;
  xth: string;
  xthYear: string;
  xii: string;
  xiiYear: string;
  graduation: string;
  graduationYear: string;
  pg: string;
  pgStatus: string;
  skills: string;
  projectTitle: string;
  projectDescription: string;
  certificateName: string;
  certificateDescription: string;
  companyName: string;
  startDate: string;
  endDate: string;
  jobTitle: string;
  jobDescription: string;  
}
