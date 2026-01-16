// Proposal types matching Airtable schema

export interface Benefit {
  icon: string;
  title: string;
  value: string;
  description: string;
  detailBullets?: string[];
  providerLink?: string;
}

export interface PersonalizedReason {
  icon: string;
  title: string;
  subtitle?: string;
  description: string;
}

export interface ComparisonPlan {
  name: string;
  isRecommended?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface AgentContact {
  name: string;
  email: string;
  phone: string;
  npn: string;
  photoUrl?: string;
}

export interface BrandingConfig {
  companyName: string;
  logoUrl?: string;
  primaryColor?: string;
  accentColor?: string;
}

export interface Proposal {
  id: string;
  // Client info
  clientName: string;
  clientAge?: number;
  zipCode: string;
  
  // Branding
  branding: BrandingConfig;
  
  // Recommended plan
  recommendedPlan: {
    name: string;
    planId: string;
    provider: string;
    starRating: number;
    premium: string;
    deductible: string;
    maxOutOfPocket: string;
  };
  
  // Why this plan is perfect
  personalizedReasons: PersonalizedReason[];
  
  // Benefits grid
  benefits: Benefit[];
  
  // Comparison table (up to 4 plans)
  comparisonPlans: ComparisonPlan[];
  
  // Agent info
  agent: AgentContact;
  
  // Disclaimer
  disclaimer?: string;
  
  // Security
  password: string;
}

// Airtable record structure for reference
export interface AirtableRecord {
  id: string;
  fields: {
    // Core fields
    client_name: string;
    client_age?: number;
    zip_code: string;
    password: string;
    
    // Branding
    company_name: string;
    logo_url?: string;
    primary_color?: string;
    accent_color?: string;
    
    // Recommended plan
    plan_name: string;
    plan_id: string;
    plan_provider: string;
    plan_rating: number;
    plan_premium: string;
    plan_deductible: string;
    plan_max_oop: string;
    
    // JSON fields (stored as text)
    personalized_reasons_json: string;
    benefits_json: string;
    comparison_plans_json: string;
    
    // Agent
    agent_name: string;
    agent_email: string;
    agent_phone: string;
    agent_npn: string;
    agent_photo_url?: string;
    
    // Disclaimer
    disclaimer_text?: string;
  };
}
