// User Types
export type UserRole = 'customer' | 'agent' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  policyNumber?: string;
  createdAt: Date;
}

// Complaint Types
export type ComplaintCategory = 'Claims' | 'Policy Issues' | 'Billing' | 'Customer Service' | 'Other';
export type ComplaintPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type ComplaintStatus = 'Submitted' | 'Assigned' | 'In Progress' | 'Resolved' | 'Closed';

export interface StatusHistoryEntry {
  status: ComplaintStatus;
  changedBy: string;
  changedByName: string;
  changedAt: Date;
  notes?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: Date;
}

export interface Complaint {
  id: string;
  complaintId: string; // COMP-2024-0001 format
  customerId: string;
  customerName: string;
  policyNumber: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  subject: string;
  description: string;
  assignedTo?: string;
  assignedToName?: string;
  resolution?: string;
  statusHistory: StatusHistoryEntry[];
  comments: Comment[];
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard Stats
export interface DashboardStats {
  total: number;
  submitted: number;
  assigned: number;
  inProgress: number;
  resolved: number;
  closed: number;
}
