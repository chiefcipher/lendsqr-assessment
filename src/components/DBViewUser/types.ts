
export type Education = {
  duration : string ; 
  
  employmentStatus : string ; 
  
  level : string ; 
  loanRepayment : string ; 
  monthlyIncome : string[]; 
  officeEmail : string ; 
  sector : string ; 


}

export type Guarantor = { 

  address: string ; 
  firstName : string ; 
  gender : string ; 
  lastName : string ; 
  phoneNumber  : string ; 
  }
  
  export type Profile = { 
  address : string ; 
  avatar : string ; 
  bvn : string ; 
  currency : string ; 
  firstName : string ; 
  gender : string ; 
  lastName :string ; 
  phoneNumber : string ; 
  }
  
  export type Socials = {
    facebook : string ; 
    instagram : string ; 
    twitter : string ; 
  }

  export type User = {
    accountBalance: string;
    accountNumber: string;
    createdAt: Date;
    education: Education;
    guarantor: Guarantor;
    email: string;
    id: string;
    lastActiveDate: string;
    orgName: string;
    phoneNumber: string;
    profile: Profile;
    socials: Socials;
    userName: string;
  };