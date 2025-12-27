import { User, Complaint, ComplaintStatus, ComplaintPriority, ComplaintCategory } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    role: 'customer',
    policyNumber: 'POL-2024-001234',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user-2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'customer',
    policyNumber: 'POL-2024-005678',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'agent-1',
    name: 'Amit Singh',
    email: 'amit.agent@sudlife.com',
    role: 'agent',
    createdAt: new Date('2023-06-10'),
  },
  {
    id: 'agent-2',
    name: 'Neha Patel',
    email: 'neha.agent@sudlife.com',
    role: 'agent',
    createdAt: new Date('2023-08-15'),
  },
  {
    id: 'manager-1',
    name: 'Vikram Mehta',
    email: 'vikram.manager@sudlife.com',
    role: 'manager',
    createdAt: new Date('2022-01-01'),
  },
];

// Mock Complaints
export const mockComplaints: Complaint[] = [
  {
    id: 'comp-1',
    complaintId: 'COMP-2024-0001',
    customerId: 'user-1',
    customerName: 'Rajesh Kumar',
    policyNumber: 'POL-2024-001234',
    category: 'Claims',
    priority: 'High',
    status: 'In Progress',
    subject: 'Claim Settlement Delay',
    description: 'My claim was submitted 30 days ago but I have not received any update on the settlement. The claim reference number is CLM-2024-9876. Please expedite the process.',
    assignedTo: 'agent-1',
    assignedToName: 'Amit Singh',
    statusHistory: [
      { status: 'Submitted', changedBy: 'user-1', changedByName: 'Rajesh Kumar', changedAt: new Date('2024-11-01'), notes: 'Complaint submitted' },
      { status: 'Assigned', changedBy: 'manager-1', changedByName: 'Vikram Mehta', changedAt: new Date('2024-11-02'), notes: 'Assigned to Amit Singh' },
      { status: 'In Progress', changedBy: 'agent-1', changedByName: 'Amit Singh', changedAt: new Date('2024-11-03'), notes: 'Investigation started' },
    ],
    comments: [
      { id: 'c1', userId: 'agent-1', userName: 'Amit Singh', text: 'I am looking into your claim. Will update you within 48 hours.', createdAt: new Date('2024-11-03') },
      { id: 'c2', userId: 'user-1', userName: 'Rajesh Kumar', text: 'Thank you for the update. Waiting for resolution.', createdAt: new Date('2024-11-04') },
    ],
    isArchived: false,
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-04'),
  },
  {
    id: 'comp-2',
    complaintId: 'COMP-2024-0002',
    customerId: 'user-2',
    customerName: 'Priya Sharma',
    policyNumber: 'POL-2024-005678',
    category: 'Billing',
    priority: 'Medium',
    status: 'Submitted',
    subject: 'Incorrect Premium Amount',
    description: 'I was charged Rs. 15,000 instead of Rs. 12,000 for my monthly premium. Please correct this and refund the excess amount.',
    statusHistory: [
      { status: 'Submitted', changedBy: 'user-2', changedByName: 'Priya Sharma', changedAt: new Date('2024-12-10'), notes: 'Complaint submitted' },
    ],
    comments: [],
    isArchived: false,
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-10'),
  },
  {
    id: 'comp-3',
    complaintId: 'COMP-2024-0003',
    customerId: 'user-1',
    customerName: 'Rajesh Kumar',
    policyNumber: 'POL-2024-001234',
    category: 'Policy Issues',
    priority: 'Critical',
    status: 'Assigned',
    subject: 'Policy Cancellation Request Not Processed',
    description: 'I submitted a policy cancellation request 2 weeks ago but the policy is still active and premium is being deducted. This is urgent.',
    assignedTo: 'agent-2',
    assignedToName: 'Neha Patel',
    statusHistory: [
      { status: 'Submitted', changedBy: 'user-1', changedByName: 'Rajesh Kumar', changedAt: new Date('2024-12-01'), notes: 'Complaint submitted' },
      { status: 'Assigned', changedBy: 'manager-1', changedByName: 'Vikram Mehta', changedAt: new Date('2024-12-02'), notes: 'Assigned to Neha Patel for urgent handling' },
    ],
    comments: [
      { id: 'c3', userId: 'agent-2', userName: 'Neha Patel', text: 'I am prioritizing your request. Will process the cancellation today.', createdAt: new Date('2024-12-02') },
    ],
    isArchived: false,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-02'),
  },
  {
    id: 'comp-4',
    complaintId: 'COMP-2024-0004',
    customerId: 'user-2',
    customerName: 'Priya Sharma',
    policyNumber: 'POL-2024-005678',
    category: 'Customer Service',
    priority: 'Low',
    status: 'Resolved',
    subject: 'Request for Policy Documents',
    description: 'I need a copy of my policy documents sent to my email address for my records.',
    assignedTo: 'agent-1',
    assignedToName: 'Amit Singh',
    resolution: 'Policy documents have been sent to the registered email address.',
    statusHistory: [
      { status: 'Submitted', changedBy: 'user-2', changedByName: 'Priya Sharma', changedAt: new Date('2024-10-15'), notes: 'Complaint submitted' },
      { status: 'Assigned', changedBy: 'manager-1', changedByName: 'Vikram Mehta', changedAt: new Date('2024-10-15'), notes: 'Assigned to Amit Singh' },
      { status: 'In Progress', changedBy: 'agent-1', changedByName: 'Amit Singh', changedAt: new Date('2024-10-16'), notes: 'Processing document request' },
      { status: 'Resolved', changedBy: 'agent-1', changedByName: 'Amit Singh', changedAt: new Date('2024-10-16'), notes: 'Documents sent via email' },
    ],
    comments: [
      { id: 'c4', userId: 'agent-1', userName: 'Amit Singh', text: 'Documents have been sent to your registered email.', createdAt: new Date('2024-10-16') },
      { id: 'c5', userId: 'user-2', userName: 'Priya Sharma', text: 'Received. Thank you!', createdAt: new Date('2024-10-16') },
    ],
    isArchived: false,
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-10-16'),
  },
  {
    id: 'comp-5',
    complaintId: 'COMP-2024-0005',
    customerId: 'user-1',
    customerName: 'Rajesh Kumar',
    policyNumber: 'POL-2024-001234',
    category: 'Other',
    priority: 'Medium',
    status: 'Closed',
    subject: 'Update Nominee Details',
    description: 'I need to update the nominee details on my policy. Please guide me on the process.',
    assignedTo: 'agent-2',
    assignedToName: 'Neha Patel',
    resolution: 'Nominee details updated successfully as per customer request.',
    statusHistory: [
      { status: 'Submitted', changedBy: 'user-1', changedByName: 'Rajesh Kumar', changedAt: new Date('2024-09-01'), notes: 'Complaint submitted' },
      { status: 'Assigned', changedBy: 'manager-1', changedByName: 'Vikram Mehta', changedAt: new Date('2024-09-01'), notes: 'Assigned to Neha Patel' },
      { status: 'In Progress', changedBy: 'agent-2', changedByName: 'Neha Patel', changedAt: new Date('2024-09-02'), notes: 'Processing nominee update' },
      { status: 'Resolved', changedBy: 'agent-2', changedByName: 'Neha Patel', changedAt: new Date('2024-09-05'), notes: 'Nominee updated' },
      { status: 'Closed', changedBy: 'user-1', changedByName: 'Rajesh Kumar', changedAt: new Date('2024-09-06'), notes: 'Customer confirmed resolution' },
    ],
    comments: [],
    isArchived: false,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-06'),
  },
];

// Helper functions
export const getComplaintsByCustomer = (customerId: string): Complaint[] => {
  return mockComplaints.filter(c => c.customerId === customerId && !c.isArchived);
};

export const getComplaintsByAgent = (agentId: string): Complaint[] => {
  return mockComplaints.filter(c => c.assignedTo === agentId && !c.isArchived);
};

export const getAllComplaints = (): Complaint[] => {
  return mockComplaints.filter(c => !c.isArchived);
};

export const getComplaintById = (id: string): Complaint | undefined => {
  return mockComplaints.find(c => c.id === id || c.complaintId === id);
};

export const getAgents = (): User[] => {
  return mockUsers.filter(u => u.role === 'agent');
};

export const getStats = (complaints: Complaint[]) => {
  return {
    total: complaints.length,
    submitted: complaints.filter(c => c.status === 'Submitted').length,
    assigned: complaints.filter(c => c.status === 'Assigned').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    closed: complaints.filter(c => c.status === 'Closed').length,
  };
};

// Generate new complaint ID
let complaintCounter = 6;
export const generateComplaintId = (): string => {
  const year = new Date().getFullYear();
  const id = String(complaintCounter++).padStart(4, '0');
  return `COMP-${year}-${id}`;
};
