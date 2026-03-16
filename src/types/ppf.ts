export type TicketType = "saturday-only" | "both-days";

export interface PPFRegistration {
  firstName: string;
  lastName: string;
  email: string;
  ticketType: TicketType;
  phone?: string;
  university?: string;
  fieldOfStudy?: string;
  howDidYouHear?: string;
  citizenship: string;
  professionalStatus: string;
  returnPlans: string;
  gdprConsent: boolean;
  attendanceConfirmed: boolean;
  acceptTerms: boolean;
  registrationDate: string;
  ticketId: string;
}

export interface PPFSpotsData {
  friday: {
    total: number;
    registered: number;
    spotsLeft: number;
  };
  saturday: {
    total: number;
    registered: number;
    spotsLeft: number;
  };
  isOpen: boolean;
}

export interface PPFRegistrationState {
  success?: boolean;
  ticketId?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    ticketType?: string[];
    citizenship?: string[];
    professionalStatus?: string[];
    returnPlans?: string[];
    gdprConsent?: string[];
    _form?: string[];
  };
}

