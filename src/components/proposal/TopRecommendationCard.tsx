import { Proposal } from "@/types/proposal";
import { StarRating } from "./StarRating";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopRecommendationCardProps {
  proposal: Proposal;
  proposalId: string;
}

export const TopRecommendationCard = ({ proposal, proposalId }: TopRecommendationCardProps) => {
  const { recommendedPlan } = proposal;

  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-10">
          {/* Badge */}
          <div className="mb-8">
            <span className="recommendation-badge">
              🏆 Our Top Recommendation
            </span>
          </div>

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

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Monthly Premium</p>
              <p className="text-xl font-bold text-primary">{recommendedPlan.premium}</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Deductible</p>
              <p className="text-xl font-bold text-foreground">{recommendedPlan.deductible}</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Max Out-of-Pocket</p>
              <p className="text-xl font-bold text-foreground">{recommendedPlan.maxOutOfPocket}</p>
            </div>
          </div>

          {/* Link to Why This Plan */}
          <Button asChild className="w-full">
            <Link to={`/proposal/${proposalId}/why-this-plan`}>
              See Why This Plan Is Perfect For You
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
