import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Proposal } from "@/types/proposal";
import { fetchProposal } from "@/lib/airtable";
import { PasswordGate } from "@/components/proposal/PasswordGate";
import { HeroSection } from "@/components/proposal/HeroSection";
import { ContactFooter } from "@/components/proposal/ContactFooter";
import { StarRating } from "@/components/proposal/StarRating";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhyThisPlanPage = () => {
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

      if (proposalId.startsWith(":")) {
        setError("Invalid proposal link.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchProposal(proposalId);
        if (data) {
          setProposal(data);
          // Check if already unlocked in session
          const unlocked = sessionStorage.getItem(`proposal_${proposalId}_unlocked`);
          if (unlocked === "true") {
            setIsUnlocked(true);
          }
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

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem(`proposal_${proposalId}_unlocked`, "true");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-gradient">
        <div className="text-center text-primary-foreground">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-gradient">
        <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center">
          <div className="text-4xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Proposal Not Found
          </h1>
          <p className="text-muted-foreground">
            We couldn't find a proposal with this ID.
          </p>
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <PasswordGate
        onUnlock={handleUnlock}
        correctPassword={proposal.password}
        companyName={proposal.branding.companyName}
      />
    );
  }

  const { recommendedPlan, personalizedReasons } = proposal;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        branding={proposal.branding}
        clientName={proposal.clientName}
        zipCode={proposal.zipCode}
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Button variant="ghost" asChild>
              <Link to={`/proposal/${proposalId}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Overview
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to={`/proposal/${proposalId}/benefits`}>
                Additional Benefits
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-10">
            {/* Plan Name and Rating */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {recommendedPlan.name}{" "}
                <span className="text-muted-foreground font-normal text-xl">
                  ({recommendedPlan.planId})
                </span>
              </h2>
              <StarRating rating={recommendedPlan.starRating} />
            </div>

            {/* Why This Plan Section */}
            <div className="border-l-4 border-primary pl-6 md:pl-8">
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-8">
                What You Said Was Important To You
              </h3>

              <div className="space-y-8">
                {personalizedReasons.map((reason, index) => (
                  <div key={index} className="flex gap-4 md:gap-6">
                    <div className="numbered-step">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{reason.icon}</span>
                        <h4 className="text-lg font-bold text-foreground">
                          {reason.title}
                        </h4>
                      </div>
                      {reason.subtitle && (
                        <p className="font-semibold text-foreground mb-2">
                          {reason.subtitle}
                        </p>
                      )}
                      <p className="text-muted-foreground leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter 
        agent={proposal.agent}
        disclaimer={proposal.disclaimer}
      />
    </div>
  );
};

export default WhyThisPlanPage;
