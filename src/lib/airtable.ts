import { Proposal } from "@/types/proposal";
import { mockProposal } from "@/data/mockProposal";

// Fetch a proposal by ID via edge function
export const fetchProposal = async (proposalId: string): Promise<Proposal | null> => {
  // Use mock data for "demo" proposal
  if (proposalId === "demo") {
    return mockProposal;
  }

  try {
    // Call the edge function with the proposal ID
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-proposal?id=${encodeURIComponent(proposalId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Edge function error:", errorData);
      
      // Fallback to mock for the mock proposal ID
      if (proposalId === mockProposal.id) {
        return mockProposal;
      }
      return null;
    }

    const result = await response.json();
    return result.proposal;
    
  } catch (error) {
    console.error("Error fetching proposal:", error);
    
    // Fallback to mock data on error
    if (proposalId === mockProposal.id) {
      return mockProposal;
    }
    return null;
  }
};
