'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Complaint, ComplaintStatus, CreateComplaintInput, DashboardStats } from '@/types/complaint';
import { complaintService } from '@/lib/complaintService';

interface ComplaintContextType {
  complaints: Complaint[];
  stats: DashboardStats;
  loading: boolean;
  refreshComplaints: () => Promise<void>;
  createComplaint: (input: CreateComplaintInput) => Promise<Complaint>;
  updateStatus: (id: string, status: ComplaintStatus, note?: string, updatedBy?: string) => Promise<Complaint>;
  assignComplaint: (id: string, department: string, officer?: string) => Promise<Complaint>;
  resetToDefaults: () => Promise<void>;
  getComplaintById: (id: string) => Complaint | undefined;
}

const defaultStats: DashboardStats = {
  total: 0,
  pending: 0,
  assigned: 0,
  inProgress: 0,
  resolved: 0,
  critical: 0,
};

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export function ComplaintProvider({ children }: { children: React.ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [loading, setLoading] = useState(true);

  const refreshComplaints = useCallback(async () => {
    try {
      const data = await complaintService.getAllComplaints();
      const currentStats = await complaintService.getDashboardStats();
      setComplaints(data);
      setStats(currentStats);
    } catch (err) {
      console.error('Failed to fetch complaints in context:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadInitialData = async () => {
      try {
        const data = await complaintService.getAllComplaints();
        const currentStats = await complaintService.getDashboardStats();
        if (mounted) {
          setComplaints(data);
          setStats(currentStats);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch complaints in context:', err);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadInitialData();

    const handleStoreUpdate = () => {
      refreshComplaints();
    };

    window.addEventListener('fixmybharat_store_updated', handleStoreUpdate);
    window.addEventListener('storage', handleStoreUpdate);

    return () => {
      mounted = false;
      window.removeEventListener('fixmybharat_store_updated', handleStoreUpdate);
      window.removeEventListener('storage', handleStoreUpdate);
    };
  }, [refreshComplaints]);

  const handleCreateComplaint = async (input: CreateComplaintInput) => {
    const created = await complaintService.createComplaint(input);
    await refreshComplaints();
    return created;
  };

  const handleUpdateStatus = async (
    id: string,
    status: ComplaintStatus,
    note?: string,
    updatedBy?: string
  ) => {
    const updated = await complaintService.updateComplaintStatus(id, status, note, updatedBy);
    await refreshComplaints();
    return updated;
  };

  const handleAssignComplaint = async (id: string, department: string, officer?: string) => {
    const updated = await complaintService.assignComplaint(id, department, officer);
    await refreshComplaints();
    return updated;
  };

  const handleResetToDefaults = async () => {
    await complaintService.resetToDefaults();
    await refreshComplaints();
  };

  const getComplaintById = (id: string) => {
    return complaints.find((c) => c.id.toLowerCase() === id.toLowerCase());
  };

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        stats,
        loading,
        refreshComplaints,
        createComplaint: handleCreateComplaint,
        updateStatus: handleUpdateStatus,
        assignComplaint: handleAssignComplaint,
        resetToDefaults: handleResetToDefaults,
        getComplaintById,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaints() {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
}
