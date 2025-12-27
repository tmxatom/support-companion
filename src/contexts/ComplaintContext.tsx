import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Complaint, ComplaintStatus, Comment } from '@/types';
import { mockComplaints, generateComplaintId } from '@/data/mockData';

interface ComplaintContextType {
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'complaintId' | 'statusHistory' | 'comments' | 'isArchived' | 'createdAt' | 'updatedAt'>) => Complaint;
  updateComplaintStatus: (complaintId: string, status: ComplaintStatus, userId: string, userName: string, notes?: string) => void;
  assignComplaint: (complaintId: string, agentId: string, agentName: string, managerId: string, managerName: string) => void;
  addComment: (complaintId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  archiveComplaint: (complaintId: string) => void;
  getComplaintById: (id: string) => Complaint | undefined;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const ComplaintProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);

  const addComplaint = (
    complaintData: Omit<Complaint, 'id' | 'complaintId' | 'statusHistory' | 'comments' | 'isArchived' | 'createdAt' | 'updatedAt'>
  ): Complaint => {
    const now = new Date();
    const newComplaint: Complaint = {
      ...complaintData,
      id: `comp-${Date.now()}`,
      complaintId: generateComplaintId(),
      status: 'Submitted',
      statusHistory: [
        {
          status: 'Submitted',
          changedBy: complaintData.customerId,
          changedByName: complaintData.customerName,
          changedAt: now,
          notes: 'Complaint submitted',
        },
      ],
      comments: [],
      isArchived: false,
      createdAt: now,
      updatedAt: now,
    };

    setComplaints(prev => [newComplaint, ...prev]);
    return newComplaint;
  };

  const updateComplaintStatus = (
    complaintId: string,
    status: ComplaintStatus,
    userId: string,
    userName: string,
    notes?: string
  ) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId || c.complaintId === complaintId) {
          return {
            ...c,
            status,
            statusHistory: [
              ...c.statusHistory,
              {
                status,
                changedBy: userId,
                changedByName: userName,
                changedAt: new Date(),
                notes,
              },
            ],
            updatedAt: new Date(),
          };
        }
        return c;
      })
    );
  };

  const assignComplaint = (
    complaintId: string,
    agentId: string,
    agentName: string,
    managerId: string,
    managerName: string
  ) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId || c.complaintId === complaintId) {
          return {
            ...c,
            assignedTo: agentId,
            assignedToName: agentName,
            status: 'Assigned',
            statusHistory: [
              ...c.statusHistory,
              {
                status: 'Assigned',
                changedBy: managerId,
                changedByName: managerName,
                changedAt: new Date(),
                notes: `Assigned to ${agentName}`,
              },
            ],
            updatedAt: new Date(),
          };
        }
        return c;
      })
    );
  };

  const addComment = (complaintId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId || c.complaintId === complaintId) {
          return {
            ...c,
            comments: [
              ...c.comments,
              {
                ...comment,
                id: `comment-${Date.now()}`,
                createdAt: new Date(),
              },
            ],
            updatedAt: new Date(),
          };
        }
        return c;
      })
    );
  };

  const archiveComplaint = (complaintId: string) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId || c.complaintId === complaintId) {
          return { ...c, isArchived: true, updatedAt: new Date() };
        }
        return c;
      })
    );
  };

  const getComplaintById = (id: string): Complaint | undefined => {
    return complaints.find(c => c.id === id || c.complaintId === id);
  };

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        addComplaint,
        updateComplaintStatus,
        assignComplaint,
        addComment,
        archiveComplaint,
        getComplaintById,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = (): ComplaintContextType => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};
