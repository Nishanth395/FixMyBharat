import { Complaint, IssueCategory } from '@/types/complaint';

export const CATEGORY_LABELS: Record<IssueCategory, { label: string; icon: string; department: string; color: string }> = {
  potholes: {
    label: 'Potholes & Road Damage',
    icon: 'AlertTriangle',
    department: 'Roads & Infrastructure Department',
    color: 'orange',
  },
  garbage: {
    label: 'Garbage & Solid Waste',
    icon: 'Trash2',
    department: 'Solid Waste Management',
    color: 'amber',
  },
  water_leakage: {
    label: 'Water Pipeline Leakage',
    icon: 'Droplets',
    department: 'Water Supply & Sewerage Board',
    color: 'blue',
  },
  drainage: {
    label: 'Drainage & Overflow',
    icon: 'Waves',
    department: 'Stormwater & Drainage Division',
    color: 'cyan',
  },
  streetlights: {
    label: 'Streetlights & Electrical',
    icon: 'Lightbulb',
    department: 'Electrical Engineering Division',
    color: 'yellow',
  },
  footpath: {
    label: 'Damaged Footpaths & Walkways',
    icon: 'Footprints',
    department: 'Public Works Department (PWD)',
    color: 'emerald',
  },
  open_manholes: {
    label: 'Open Manholes & Hazardous Pits',
    icon: 'ShieldAlert',
    department: 'Disaster Management & Sewerage',
    color: 'rose',
  },
};

export const INITIAL_MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'FMB-2026-8912',
    title: 'Hazardous deep open manhole near St. Marks Junction',
    description: 'A deep open stormwater drain manhole with missing concrete cover directly on the pedestrian crossing. Extreme pedestrian hazard, particularly at dusk.',
    category: 'open_manholes',
    priority: 'critical',
    status: 'assigned',
    location: {
      address: 'Near St. Marks Junction, MG Road Cross',
      landmark: 'Opposite Metro Station Gate 2',
      city: 'Bengaluru',
      pincode: '560001',
      latitude: 12.9716,
      longitude: 77.5946,
    },
    imageUrl: 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Aditya Sharma',
    citizenPhone: '+91 98765 43210',
    assignedDepartment: 'Disaster Management & Sewerage',
    assignedOfficer: 'Er. R. Sundaram (Assistant Exec Engineer)',
    createdAt: '2026-10-08T09:30:00Z',
    updatedAt: '2026-10-09T08:15:00Z',
    updates: [
      {
        id: 'u-1',
        status: 'pending',
        timestamp: '2026-10-08T09:30:00Z',
        note: 'Report submitted by citizen via FixMyBharat mobile portal.',
        updatedBy: 'Citizen System'
      },
      {
        id: 'u-2',
        status: 'assigned',
        timestamp: '2026-10-09T08:15:00Z',
        note: 'AI classified as Critical Hazard. Priority escalated and dispatched to Ward 112 Rapid Repair Team.',
        updatedBy: 'Civic Ops Controller'
      }
    ],
    aiAnalysis: {
      confidenceScore: 0.96,
      detectedObjects: ['Open manhole aperture', 'Missing reinforced slab', 'High-traffic pedestrian walkway'],
      urgencyReason: 'Direct risk of severe pedestrian injury or vehicle tire entrapment within 50m of metro entrance.',
      estimatedCostRange: '₹3,500 - ₹5,000'
    }
  },
  {
    id: 'FMB-2026-7840',
    title: 'Severe multiple crater potholes on Outer Ring Road Flyover ramp',
    description: 'Substantial asphalt breakdown creating deep craters spanning 1.8 meters across the middle lane. Causing dangerous sudden braking and swerving of two-wheelers.',
    category: 'potholes',
    priority: 'high',
    status: 'in_progress',
    location: {
      address: 'Outer Ring Road Flyover Ramp, Marathahalli',
      landmark: 'Near Multiplex Bridge',
      city: 'Bengaluru',
      pincode: '560037',
      latitude: 12.9592,
      longitude: 77.6974,
    },
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Priya Narayanan',
    assignedDepartment: 'Roads & Infrastructure Department',
    assignedOfficer: 'K. Venkatesh (Road Inspector)',
    createdAt: '2026-10-07T14:20:00Z',
    updatedAt: '2026-10-09T07:45:00Z',
    updates: [
      {
        id: 'u-3',
        status: 'pending',
        timestamp: '2026-10-07T14:20:00Z',
        note: 'Complaint registered by citizen with geotagged photo.',
        updatedBy: 'Citizen System'
      },
      {
        id: 'u-4',
        status: 'assigned',
        timestamp: '2026-10-08T10:00:00Z',
        note: 'Assigned to East Division Asphalt Patching crew.',
        updatedBy: 'Municipal Dispatch'
      },
      {
        id: 'u-5',
        status: 'in_progress',
        timestamp: '2026-10-09T07:45:00Z',
        note: 'Cold-mix asphalt bitumen material mobilized to site. Night repair scheduled.',
        updatedBy: 'K. Venkatesh'
      }
    ],
    aiAnalysis: {
      confidenceScore: 0.94,
      detectedObjects: ['Asphalt cavity', 'Aggregate loss', 'Structural base exposure'],
      urgencyReason: 'Rapid deterioration under heavy vehicular load posing two-wheeler tipping risk.',
      estimatedCostRange: '₹12,000 - ₹18,000'
    }
  },
  {
    id: 'FMB-2026-6523',
    title: 'High-pressure clean water pipeline fracture flooding street',
    description: 'Underground potable water supply pipe ruptured. Clean drinking water continuously gushing onto the residential avenue since early morning.',
    category: 'water_leakage',
    priority: 'high',
    status: 'assigned',
    location: {
      address: '14th Main, 4th Sector, HSR Layout',
      landmark: 'Near BDA Complex Circle',
      city: 'Bengaluru',
      pincode: '560102',
      latitude: 12.9121,
      longitude: 77.6446,
    },
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Vikram Joshi',
    assignedDepartment: 'Water Supply & Sewerage Board',
    assignedOfficer: 'Er. S. Mehra',
    createdAt: '2026-10-08T16:10:00Z',
    updatedAt: '2026-10-08T18:00:00Z',
    updates: [
      {
        id: 'u-6',
        status: 'pending',
        timestamp: '2026-10-08T16:10:00Z',
        note: 'Reported by local resident association member.',
        updatedBy: 'Citizen System'
      },
      {
        id: 'u-7',
        status: 'assigned',
        timestamp: '2026-10-08T18:00:00Z',
        note: 'Sluice valve isolation team dispatched to prevent further loss of water.',
        updatedBy: 'Water Board Duty Officer'
      }
    ],
    aiAnalysis: {
      confidenceScore: 0.91,
      detectedObjects: ['Water surge', 'Subsurface rupture', 'Roadway inundation'],
      urgencyReason: 'Significant loss of treated drinking water and soil erosion under sub-base.',
      estimatedCostRange: '₹8,000 - ₹14,000'
    }
  },
  {
    id: 'FMB-2026-5119',
    title: 'Unattended municipal garbage dump attracting stray animals',
    description: 'Overflowing commercial waste and non-segregated black plastic garbage bags accumulating for 4 days. Blocking side alley and causing health hazard.',
    category: 'garbage',
    priority: 'medium',
    status: 'pending',
    location: {
      address: '8th Cross, Commercial Street Area',
      landmark: 'Behind Central Post Office',
      city: 'Bengaluru',
      pincode: '560001',
      latitude: 12.9822,
      longitude: 77.6083,
    },
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Fatima Banu',
    assignedDepartment: 'Solid Waste Management',
    createdAt: '2026-10-09T06:20:00Z',
    updatedAt: '2026-10-09T06:20:00Z',
    updates: [
      {
        id: 'u-8',
        status: 'pending',
        timestamp: '2026-10-09T06:20:00Z',
        note: 'Submitted with image evidence.',
        updatedBy: 'Citizen System'
      }
    ],
    aiAnalysis: {
      confidenceScore: 0.89,
      detectedObjects: ['Organic refuse', 'Plastic wrapping', 'Commercial cardboard'],
      urgencyReason: 'Sanitation concern in busy market cluster.',
      estimatedCostRange: '₹2,000 - ₹3,500'
    }
  },
  {
    id: 'FMB-2026-4402',
    title: 'Non-functional streetlights over 600m stretch on School Road',
    description: 'Eight consecutive street lighting poles out of order for the past 5 days. Complete darkness during evening school commute and senior citizen walks.',
    category: 'streetlights',
    priority: 'medium',
    status: 'resolved',
    location: {
      address: 'Vidyanagar Main Link Road',
      landmark: 'Near Govt High School Campus',
      city: 'Bengaluru',
      pincode: '560078',
      latitude: 12.9038,
      longitude: 77.5752,
    },
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    citizenName: 'M. Anand',
    assignedDepartment: 'Electrical Engineering Division',
    assignedOfficer: 'Tech. G. Ramesh',
    createdAt: '2026-10-05T11:00:00Z',
    updatedAt: '2026-10-07T17:30:00Z',
    updates: [
      {
        id: 'u-9',
        status: 'pending',
        timestamp: '2026-10-05T11:00:00Z',
        note: 'Citizen notification filed.',
        updatedBy: 'Citizen System'
      },
      {
        id: 'u-10',
        status: 'assigned',
        timestamp: '2026-10-06T09:15:00Z',
        note: 'Assigned to South Ward Electrical Van.',
        updatedBy: 'Electrical Supervisor'
      },
      {
        id: 'u-11',
        status: 'in_progress',
        timestamp: '2026-10-07T14:00:00Z',
        note: 'Transformer jumper cable defect identified.',
        updatedBy: 'Tech. G. Ramesh'
      },
      {
        id: 'u-12',
        status: 'resolved',
        timestamp: '2026-10-07T17:30:00Z',
        note: 'Circuit breaker replaced and 8 LED fixtures tested and operational.',
        updatedBy: 'Tech. G. Ramesh'
      }
    ],
    aiAnalysis: {
      confidenceScore: 0.93,
      detectedObjects: ['LED luminaire', 'Feeder pillar', 'Overhead cables'],
      urgencyReason: 'Public safety and pedestrian security during late hours.',
      estimatedCostRange: '₹4,000 - ₹6,000'
    }
  },
  {
    id: 'FMB-2026-3208',
    title: 'Cracked and uneven pavers causing senior citizen falls',
    description: 'Footpath paving slabs displaced by protruding tree roots and unauthorized trenching. Uneven height difference of 10cm causing repeated trips.',
    category: 'footpath',
    priority: 'low',
    status: 'assigned',
    location: {
      address: '7th Avenue Walkway, Koramangala 3rd Block',
      landmark: 'Next to Community Library',
      city: 'Bengaluru',
      pincode: '560034',
      latitude: 12.9344,
      longitude: 77.6231,
    },
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Rohit Shenoy',
    assignedDepartment: 'Public Works Department (PWD)',
    assignedOfficer: 'Asst. Engr. B. Patil',
    createdAt: '2026-10-07T08:30:00Z',
    updatedAt: '2026-10-08T11:45:00Z',
    updates: [
      {
        id: 'u-13',
        status: 'pending',
        timestamp: '2026-10-07T08:30:00Z',
        note: 'Footpath audit issue filed by resident.',
        updatedBy: 'Citizen System'
      },
      {
        id: 'u-14',
        status: 'assigned',
        timestamp: '2026-10-08T11:45:00Z',
        note: 'Inspection scheduled with Ward PWD engineer.',
        updatedBy: 'PWD Desk'
      }
    ],
    aiAnalysis: {
      confidenceScore: 0.88,
      detectedObjects: ['Concrete paver', 'Root uplift', 'Pedestrian curb'],
      urgencyReason: 'Accessibility obstruction for wheelchairs and seniors.',
      estimatedCostRange: '₹5,000 - ₹7,500'
    }
  },
  {
    id: 'FMB-2026-2180',
    title: 'Stormwater drain overflowing with plastic silt during rainfall',
    description: 'Drain choked with uncollected silt and plastic wrappers. Water backing up into shop fronts along the main bazaar.',
    category: 'drainage',
    priority: 'high',
    status: 'pending',
    location: {
      address: 'Gandhi Bazaar Main Road',
      landmark: 'Near Flower Market Circle',
      city: 'Bengaluru',
      pincode: '560004',
      latitude: 12.9438,
      longitude: 77.5701,
    },
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Lakshmi Narayana',
    assignedDepartment: 'Stormwater & Drainage Division',
    createdAt: '2026-10-09T08:00:00Z',
    updatedAt: '2026-10-09T08:00:00Z',
    updates: [
      {
        id: 'u-15',
        status: 'pending',
        timestamp: '2026-10-09T08:00:00Z',
        note: 'Submitted by shopkeeper association representative.',
        updatedBy: 'Citizen System'
      }
    ],
    aiAnalysis: {
      confidenceScore: 0.92,
      detectedObjects: ['Drain culvert', 'Silt accumulation', 'Backflow water'],
      urgencyReason: 'Monsoon flooding vulnerability and commercial disruption.',
      estimatedCostRange: '₹7,000 - ₹11,000'
    }
  }
];
