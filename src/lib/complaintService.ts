import { Complaint, ComplaintStatus, CreateComplaintInput, DashboardStats, PriorityLevel } from '@/types/complaint';
import { CATEGORY_LABELS, INITIAL_MOCK_COMPLAINTS } from '@/data/mockComplaints';

const STORAGE_KEY = 'fixmybharat_complaints_v1';

export interface IComplaintService {
  getAllComplaints(): Promise<Complaint[]>;
  getComplaintById(id: string): Promise<Complaint | null>;
  createComplaint(input: CreateComplaintInput): Promise<Complaint>;
  updateComplaintStatus(id: string, status: ComplaintStatus, note?: string, updatedBy?: string): Promise<Complaint>;
  assignComplaint(id: string, department: string, officer?: string): Promise<Complaint>;
  getDashboardStats(): Promise<DashboardStats>;
  resetToDefaults(): Promise<void>;
}

// In-memory fallback for SSR or environments without localStorage
let memoryStore: Complaint[] = [...INITIAL_MOCK_COMPLAINTS];

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function loadFromStorage(): Complaint[] {
  if (!isBrowser()) {
    return memoryStore;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_COMPLAINTS));
      memoryStore = [...INITIAL_MOCK_COMPLAINTS];
      return memoryStore;
    }
    const parsed = JSON.parse(raw) as Complaint[];
    memoryStore = parsed;
    return parsed;
  } catch (err) {
    console.error('Failed to load complaints from storage:', err);
    return memoryStore;
  }
}

function saveToStorage(data: Complaint[]): void {
  memoryStore = data;
  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Dispatch custom event for real-time reactivity across same-tab listeners
      window.dispatchEvent(new Event('fixmybharat_store_updated'));
    } catch (err) {
      console.error('Failed to save complaints to storage:', err);
    }
  }
}

/**
 * Mock implementation of Complaint Service.
 * Readily swappable with a SupabaseComplaintService implementing IComplaintService in Milestone 2.
 */
class LocalMockComplaintService implements IComplaintService {
  async getAllComplaints(): Promise<Complaint[]> {
    const complaints = loadFromStorage();
    // Sort latest first
    return [...complaints].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getComplaintById(id: string): Promise<Complaint | null> {
    const complaints = loadFromStorage();
    const found = complaints.find((c) => c.id.toLowerCase() === id.toLowerCase());
    return found || null;
  }

  async createComplaint(input: CreateComplaintInput): Promise<Complaint> {
    const complaints = loadFromStorage();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `FMB-2026-${randomSuffix}`;
    const nowIso = new Date().toISOString();

    const categoryMeta = CATEGORY_LABELS[input.category];

    // Priority defaulting or derivation
    let derivedPriority: PriorityLevel = input.priority || 'medium';
    if (!input.priority) {
      if (input.category === 'open_manholes') derivedPriority = 'critical';
      else if (input.category === 'water_leakage' || input.category === 'drainage') derivedPriority = 'high';
      else derivedPriority = 'medium';
    }

    const newComplaint: Complaint = {
      id: newId,
      title: input.title.trim(),
      description: input.description.trim(),
      category: input.category,
      priority: derivedPriority,
      status: 'pending',
      location: input.location,
      imageUrl: input.imageUrl,
      citizenName: input.citizenName || 'Civic Observer',
      citizenPhone: input.citizenPhone,
      assignedDepartment: categoryMeta.department,
      createdAt: nowIso,
      updatedAt: nowIso,
      updates: [
        {
          id: `u-${Date.now()}`,
          status: 'pending',
          timestamp: nowIso,
          note: 'Demo complaint logged via FixMyBharat Citizen portal.',
          updatedBy: input.citizenName || 'Citizen Observer',
        },
      ],
      aiAnalysis: {
        confidenceScore: 0.95,
        detectedObjects: [categoryMeta.label, 'Georeferenced Street Hazard'],
        urgencyReason: 'AI triage identified potential civic interruption. Auto-routed to department dispatch.',
        estimatedCostRange: '₹3,000 - ₹8,000',
      },
    };

    const updatedList = [newComplaint, ...complaints];
    saveToStorage(updatedList);
    return newComplaint;
  }

  async updateComplaintStatus(
    id: string,
    status: ComplaintStatus,
    note?: string,
    updatedBy: string = 'Municipal Officer'
  ): Promise<Complaint> {
    const complaints = loadFromStorage();
    const index = complaints.findIndex((c) => c.id.toLowerCase() === id.toLowerCase());
    if (index === -1) {
      throw new Error(`Complaint with ID ${id} not found.`);
    }

    const existing = complaints[index];
    const nowIso = new Date().toISOString();

    const newUpdate = {
      id: `u-${Date.now()}`,
      status,
      timestamp: nowIso,
      note: note || `Status changed from ${existing.status} to ${status}.`,
      updatedBy,
    };

    const updatedComplaint: Complaint = {
      ...existing,
      status,
      updatedAt: nowIso,
      updates: [...existing.updates, newUpdate],
    };

    complaints[index] = updatedComplaint;
    saveToStorage(complaints);
    return updatedComplaint;
  }

  async assignComplaint(id: string, department: string, officer?: string): Promise<Complaint> {
    const complaints = loadFromStorage();
    const index = complaints.findIndex((c) => c.id.toLowerCase() === id.toLowerCase());
    if (index === -1) {
      throw new Error(`Complaint with ID ${id} not found.`);
    }

    const existing = complaints[index];
    const nowIso = new Date().toISOString();

    const newUpdate = {
      id: `u-${Date.now()}`,
      status: existing.status === 'pending' ? ('assigned' as ComplaintStatus) : existing.status,
      timestamp: nowIso,
      note: `Assigned to ${department}${officer ? ` (${officer})` : ''}.`,
      updatedBy: 'Civic Dispatch Coordinator',
    };

    const updatedComplaint: Complaint = {
      ...existing,
      status: existing.status === 'pending' ? 'assigned' : existing.status,
      assignedDepartment: department,
      assignedOfficer: officer || existing.assignedOfficer,
      updatedAt: nowIso,
      updates: [...existing.updates, newUpdate],
    };

    complaints[index] = updatedComplaint;
    saveToStorage(complaints);
    return updatedComplaint;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const complaints = loadFromStorage();
    const stats: DashboardStats = {
      total: complaints.length,
      pending: complaints.filter((c) => c.status === 'pending').length,
      assigned: complaints.filter((c) => c.status === 'assigned').length,
      inProgress: complaints.filter((c) => c.status === 'in_progress').length,
      resolved: complaints.filter((c) => c.status === 'resolved').length,
      critical: complaints.filter((c) => c.priority === 'critical').length,
    };
    return stats;
  }

  async resetToDefaults(): Promise<void> {
    saveToStorage([...INITIAL_MOCK_COMPLAINTS]);
  }
}

// Export singleton instance conforming to IComplaintService
export const complaintService: IComplaintService = new LocalMockComplaintService();
