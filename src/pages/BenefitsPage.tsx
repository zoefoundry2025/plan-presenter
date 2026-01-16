import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Proposal, Benefit } from "@/types/proposal";
import { fetchProposal } from "@/lib/airtable";
import { PasswordGate } from "@/components/proposal/PasswordGate";
import { HeroSection } from "@/components/proposal/HeroSection";
import { ContactFooter } from "@/components/proposal/ContactFooter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const BenefitsPage = () => {
  const { proposalId } = useParams<{ proposalId: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

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

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        branding={proposal.branding}
        clientName={proposal.clientName}
        zipCode={proposal.zipCode}
      />

      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Button variant="ghost" asChild>
              <Link to={`/proposal/${proposalId}/why-this-plan`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                What You Said Was Important
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to={`/proposal/${proposalId}`}>
                Back to Overview
              </Link>
            </Button>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            Additional Benefits
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {proposal.benefits.map((benefit, index) => (
              <button
                key={index}
                onClick={() => benefit.detailBullets && setSelectedBenefit(benefit)}
                className="benefit-card"
              >
                <span className="text-4xl md:text-5xl block mb-4">{benefit.icon}</span>
                <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-primary font-semibold mb-1">{benefit.value}</p>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </button>
            ))}
          </div>

          {/* Detail Modal */}
          <Dialog open={!!selectedBenefit} onOpenChange={() => setSelectedBenefit(null)}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-xl">
                  <span className="text-3xl">{selectedBenefit?.icon}</span>
                  {selectedBenefit?.title} Coverage
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 pt-4">
                {selectedBenefit?.detailBullets?.map((bullet, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-foreground">{bullet}</span>
                  </div>
                ))}
                
                {selectedBenefit?.providerLink && (
                  <a 
                    href={selectedBenefit.providerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-primary font-semibold hover:underline mt-6"
                  >
                    Find a {selectedBenefit.title.toLowerCase()} provider →
                  </a>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <ContactFooter 
        agent={proposal.agent}
        disclaimer={proposal.disclaimer}
      />
    </div>
  );
};

export default BenefitsPage;
