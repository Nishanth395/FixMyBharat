export type IssueCategory =
  | 'potholes'
  | 'garbage'
  | 'water_leakage'
  | 'drainage'
  | 'streetlights'
  | 'footpath'
  | 'open_manholes';

export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

export type ComplaintStatus = 'pending' | 'assigned' | 'in_progress' | 'resolved';

export interface LocationData {
  address: string;
  landmark?: string;
  city: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
}

export interface StatusUpdate {
  id: string;
  status: ComplaintStatus;
  timestamp: string;
  note: string;
  updatedBy: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: PriorityLevel;
  status: ComplaintStatus;
  location: LocationData;
  imageUrl?: string;
  citizenName?: string;
  citizenPhone?: string;
  assignedDepartment: string;
  assignedOfficer?: string;
  createdAt: string;
  updatedAt: string;
  updates: StatusUpdate[];
  aiAnalysis?: {
    confidenceScore: number;
    detectedObjects: string[];
    urgencyReason: string;
    estimatedCostRange?: string;
  };
}

export interface CreateComplaintInput {
  title: string;
  description: string;
  category: IssueCategory;
  priority?: PriorityLevel;
  location: LocationData;
  imageUrl?: string;
  citizenName?: string;
  citizenPhone?: string;
}

export interface DashboardStats {
  total: number;
  pending: number;
  assigned: number;
  inProgress: number;
  resolved: number;
  critical: number;
}
