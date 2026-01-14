import { Proposal } from "@/types/proposal";
import { StarRating } from "./StarRating";

interface RecommendationCardProps {
  proposal: Proposal;
}

export const RecommendationCard = ({ proposal }: RecommendationCardProps) => {
  const { recommendedPlan, personalizedReasons } = proposal;

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

          {/* Why This Plan Section */}
          <div className="border-l-4 border-primary pl-6 md:pl-8">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-8">
              Why {recommendedPlan.provider.split(" ")[0]} Is Perfect For You
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
  );
};
