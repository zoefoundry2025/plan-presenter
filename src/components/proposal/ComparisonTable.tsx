import { ComparisonPlan } from "@/types/proposal";
import { Check, X, Star } from "lucide-react";

interface ComparisonTableProps {
  plans: ComparisonPlan[];
  recommendedPlanName?: string;
}

const renderValue = (value: string) => {
  if (value.toLowerCase().includes("not offered") || value.toLowerCase().includes("not covered")) {
    return (
      <span className="flex items-center justify-center gap-1 text-muted-foreground">
        <X className="w-4 h-4" /> {value.replace("Not offered", "").replace("Not covered", "").trim() || "Not offered"}
      </span>
    );
  }
  
  if (value.startsWith("$0") || value.includes("$0 copay")) {
    return (
      <span className="flex items-center justify-center gap-1 font-semibold">
        <Check className="w-4 h-4 text-success" />
        <Check className="w-4 h-4 text-success" />
        {value}
      </span>
    );
  }
  
  if (value.startsWith("$") || value.startsWith("✓")) {
    return (
      <span className="flex items-center justify-center gap-1">
        <Check className="w-4 h-4 text-success" /> {value.replace("✓", "").trim()}
      </span>
    );
  }
  
  return value;
};

const renderStarRating = (rating: number) => {
  if (rating === 0) return "N/A";
  
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
      ))}
      {hasHalf && <Star className="w-4 h-4 text-accent fill-accent/50" />}
      {Array.from({ length: 5 - Math.ceil(rating) }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/30" />
      ))}
      <span className="ml-1 text-sm">{rating} Stars</span>
    </div>
  );
};

export const ComparisonTable = ({ plans }: ComparisonTableProps) => {
  const rows = [
    { label: "Plan Premium", key: "premium" },
    { label: "Medicare Part B", key: "partB" },
    { label: "Max Out-of-Pocket", key: "maxOutOfPocket" },
    { label: "Drug Deductible", key: "drugDeductible" },
    { label: "Transportation", key: "transportation" },
    { label: "Acupuncture", key: "acupuncture" },
    { label: "Chiropractic", key: "chiropractic" },
    { label: "Gym Membership", key: "gymMembership" },
    { label: "OTC Benefit", key: "otcBenefit" },
    { label: "Dental & Vision", key: "dentalVision" },
    { label: "Star Rating", key: "starRating" },
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Side-by-Side Comparison
          </h2>
          <p className="text-muted-foreground">
            See how {plans[0]?.name.split(" ")[0]} stacks up against the competition
          </p>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="comparison-table min-w-[800px] w-full">
            <thead>
              <tr>
                <th className="text-left w-40">What Matters to You</th>
                {plans.map((plan, index) => (
                  <th 
                    key={index} 
                    className={`${plan.isRecommended ? "highlight" : ""}`}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <td className="font-medium">{row.label}</td>
                  {plans.map((plan, index) => {
                    const value = plan[row.key as keyof ComparisonPlan];
                    return (
                      <td 
                        key={index}
                        className={plan.isRecommended ? "highlight" : ""}
                      >
                        {row.key === "starRating" 
                          ? renderStarRating(value as number)
                          : renderValue(String(value || "N/A"))
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
