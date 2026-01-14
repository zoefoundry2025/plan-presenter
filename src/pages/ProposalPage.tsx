import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Proposal } from "@/types/proposal";
import { fetchProposal } from "@/lib/airtable";
import { PasswordGate } from "@/components/proposal/PasswordGate";
import { HeroSection } from "@/components/proposal/HeroSection";
import { RecommendationCard } from "@/components/proposal/RecommendationCard";
import { BenefitsGrid } from "@/components/proposal/BenefitsGrid";
import { ComparisonTable } from "@/components/proposal/ComparisonTable";
import { ContactFooter } from "@/components/proposal/ContactFooter";
import { Loader2 } from "lucide-react";

const ProposalPage = () => {
  const { proposalId } = useParams<{ proposalId: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProposal = async () => {
      if (!proposalId) {
        setError("No proposal ID provided");
        setIsLoading(false);
        return;
      }

      // Common mistake: visiting the route template (/proposal/:proposalId)
      if (proposalId.startsWith(":")) {
        setError("Invalid proposal link. Please use a link like /proposal/your-proposal-id (not /proposal/:proposalId).");
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchProposal(proposalId);
        if (data) {
          setProposal(data);
        } else {
          setError("Proposal not found");
        }
      } catch (err) {
        setError("Failed to load proposal");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProposal();
  }, [proposalId]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-gradient">
        <div className="text-center text-primary-foreground">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading your proposal...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-gradient">
        <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center">
          <div className="text-4xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Proposal Not Found
          </h1>
          <p className="text-muted-foreground">
            We couldn't find a proposal with this ID. Please check the link and try again.
          </p>
        </div>
      </div>
    );
  }

  // Password gate
  if (!isUnlocked) {
    return (
      <PasswordGate
        onUnlock={() => setIsUnlocked(true)}
        correctPassword={proposal.password}
        companyName={proposal.branding.companyName}
      />
    );
  }

  // Main proposal view
  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        branding={proposal.branding}
        clientName={proposal.clientName}
        zipCode={proposal.zipCode}
      />
      
      <RecommendationCard proposal={proposal} />
      
      <BenefitsGrid benefits={proposal.benefits} />
      
      <ComparisonTable 
        plans={proposal.comparisonPlans}
        recommendedPlanName={proposal.recommendedPlan.name}
      />
      
      <ContactFooter 
        agent={proposal.agent}
        disclaimer={proposal.disclaimer}
      />
    </div>
  );
};

export default ProposalPage;
