
export type TabType = 'inspiration' | 'explore' | 'traits';

export type CategoryType = 'Mind' | 'Body' | 'Energy' | 'Aesthetic';

export interface Leader {
  name: string;
  avatar: string;
}

export interface Investor {
  id: string;
  name: string;
  avatar: string;
  role: string; // e.g. "Angel Investor", "Architect"
  equity: string; // e.g. "5%"
  contributionType: 'Money' | 'Talent';
  contributionValue: string; // "¥50w" or "Design"
  status: 'active' | 'pending';
}

export interface Project {
  id: string;
  title: string;
  location: string;
  image: string;
  leader: Leader;
  progress: number; // 0-100
  estReturn: string;
  coBuildNeed: string;
  memberAvatars: string[];
  description?: string; 
  tags?: string[];
  // Dashboard Specifics
  isOwner?: boolean;
  valuation?: string;
  yieldRate?: string;
  investors?: Investor[];
}

export type LifeItemType = 'Good' | 'Space' | 'Event';

export interface LifeItem {
  id: string;
  type: LifeItemType;
  title: string;
  subTitle?: string;
  image: string;
  tag: string;
  price: string | number;
  rating?: number;
  location?: string;
  distance?: string;
  time?: string;
  hostName: string;
  hostAvatar: string;
}

// Renamed and expanded from LifeEvent to accomodate goods/spaces
export interface Asset {
  projectName: string;
  sharePercentage: number;
  value: number;
  trend?: number; // Added for dashboard
}

export interface UserProfile {
  nickname: string;
  avatar: string;
  wonderPoints: number;
  allianceId: string;
  flowDescription: string;
  location: string; // Added location field
  tags: string[];
  assets: Asset[];
}

export interface Order {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  status: 'paid' | 'completed' | 'cancelled';
  timeSlot: string;
  income: number;
}

export interface ServiceItem {
  id: string;
  providerName: string;
  providerAvatar: string;
  category: CategoryType;
  serviceTitle: string;
  price: number;
  pointsGift: number;
  tags: string[];
  image: string;
  description: string;
  // Added for Provider Dashboard
  isOwner?: boolean; 
  totalSales?: number;
  orders?: Order[];
}

// NEW TYPES FOR FIXES
export interface LoveFunSection {
  id: string;
  title: string;
  iconType: string;
  items?: { label: string; text: string }[];
  content?: string;
}

export interface LoveFunProfile {
  intro: string;
  sections: LoveFunSection[];
}

export interface HighVibeEvent {
  id: string;
  title: string;
  image: string;
  joinedAvatars: string[];
}