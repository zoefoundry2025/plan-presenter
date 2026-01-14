import { Proposal, AirtableRecord } from "@/types/proposal";
import { mockProposal } from "@/data/mockProposal";

// Airtable configuration
const AIRTABLE_BASE_ID = "appRkKTFsd79m2PX9";
const AIRTABLE_TABLE_NAME = "Proposals";

// This will be set via environment/secrets later
let AIRTABLE_API_KEY = "";

export const setAirtableApiKey = (key: string) => {
  AIRTABLE_API_KEY = key;
};

// Transform Airtable record to Proposal type
const transformAirtableRecord = (record: AirtableRecord): Proposal => {
  const fields = record.fields;
  
  return {
    id: record.id,
    clientName: fields.client_name,
    clientAge: fields.client_age,
    zipCode: fields.zip_code,
    
    branding: {
      companyName: fields.company_name,
      logoUrl: fields.logo_url,
      primaryColor: fields.primary_color,
      accentColor: fields.accent_color,
    },
    
    recommendedPlan: {
      name: fields.plan_name,
      planId: fields.plan_id,
      provider: fields.plan_provider,
      starRating: fields.plan_rating,
      premium: fields.plan_premium,
      deductible: fields.plan_deductible,
      maxOutOfPocket: fields.plan_max_oop,
    },
    
    personalizedReasons: JSON.parse(fields.personalized_reasons_json || "[]"),
    benefits: JSON.parse(fields.benefits_json || "[]"),
    comparisonPlans: JSON.parse(fields.comparison_plans_json || "[]"),
    
    agent: {
      name: fields.agent_name,
      email: fields.agent_email,
      phone: fields.agent_phone,
      npn: fields.agent_npn,
      photoUrl: fields.agent_photo_url,
    },
    
    disclaimer: fields.disclaimer_text,
    password: fields.password,
  };
};

// Fetch a proposal by ID from Airtable
export const fetchProposal = async (proposalId: string): Promise<Proposal | null> => {
  // If no API key is set, use mock data for development
  if (!AIRTABLE_API_KEY) {
    console.log("No Airtable API key set, using mock data");
    if (proposalId === mockProposal.id || proposalId === "demo") {
      return mockProposal;
    }
    return null;
  }
  
  try {
    // Search by the proposal ID field (we'll use a formula to find matching records)
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula={proposal_id}="${proposalId}"`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.records && data.records.length > 0) {
      return transformAirtableRecord(data.records[0]);
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching proposal from Airtable:", error);
    // Fallback to mock data on error
    if (proposalId === mockProposal.id || proposalId === "demo") {
      return mockProposal;
    }
    return null;
  }
};

// Get all proposals (for admin use)
export const fetchAllProposals = async (): Promise<Proposal[]> => {
  if (!AIRTABLE_API_KEY) {
    return [mockProposal];
  }
  
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.records.map(transformAirtableRecord);
  } catch (error) {
    console.error("Error fetching proposals from Airtable:", error);
    return [mockProposal];
  }
};
