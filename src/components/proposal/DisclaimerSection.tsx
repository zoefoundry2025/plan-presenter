import { CMSDisclaimers } from "@/types/proposal";

interface DisclaimerSectionProps {
  cmsDisclaimers?: CMSDisclaimers;
  legacyDisclaimer?: string;
}

export const DisclaimerSection = ({ cmsDisclaimers, legacyDisclaimer }: DisclaimerSectionProps) => {
  // If no disclaimers provided at all, don't render anything
  if (!cmsDisclaimers && !legacyDisclaimer) return null;

  return (
    <section className="bg-muted/30 border-t border-border">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
          {cmsDisclaimers && (
            <>
              {/* TPMO Disclaimer - Always Required */}
              <p>
                We do not offer every plan available in your area. Currently, we represent{" "}
                <strong>{cmsDisclaimers.numberOfOrganizations}</strong> organization
                {cmsDisclaimers.numberOfOrganizations !== 1 ? "s" : ""} which offer
                {cmsDisclaimers.numberOfOrganizations === 1 ? "s" : ""}{" "}
                <strong>{cmsDisclaimers.numberOfPlans}</strong> product
                {cmsDisclaimers.numberOfPlans !== 1 ? "s" : ""} in your area. Please contact{" "}
                <a 
                  href="https://www.medicare.gov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  Medicare.gov
                </a>
                , 1-800-MEDICARE, or your local State Health Insurance Program (SHIP) to get 
                information on all of your options.
              </p>

              {/* Federal Contracting Statement - One per plan */}
              {cmsDisclaimers.planContracts && cmsDisclaimers.planContracts.length > 0 && (
                <div className="space-y-1">
                  {cmsDisclaimers.planContracts.map((plan, index) => (
                    <p key={index}>
                      {plan.planName} is a {plan.planType} plan with a Medicare contract. 
                      Enrollment in {plan.planName} depends on contract renewal.
                    </p>
                  ))}
                </div>
              )}

              {/* Star Ratings Disclaimer */}
              {cmsDisclaimers.showStarRatingDisclaimer && (
                <p>
                  Every year, Medicare evaluates plans based on a 5-star rating system.
                </p>
              )}

              {/* Out-of-Network Disclaimer - Required for PPOs */}
              {cmsDisclaimers.showOutOfNetworkDisclaimer && (
                <p>
                  Out-of-network/non-contracted providers are under no obligation to treat 
                  Plan members, except in emergency situations. Please call our customer 
                  service number or see your Evidence of Coverage for more information, 
                  including the cost-sharing that applies to out-of-network services.
                </p>
              )}

              {/* Additional Custom Disclaimer */}
              {cmsDisclaimers.additionalDisclaimer && (
                <p>{cmsDisclaimers.additionalDisclaimer}</p>
              )}
            </>
          )}

          {/* Legacy disclaimer for backward compatibility */}
          {legacyDisclaimer && !cmsDisclaimers && (
            <p>{legacyDisclaimer}</p>
          )}
        </div>
      </div>
    </section>
  );
};
