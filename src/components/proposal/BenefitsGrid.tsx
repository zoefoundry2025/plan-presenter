import { useState } from "react";
import { Benefit } from "@/types/proposal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";

interface BenefitsGridProps {
  benefits: Benefit[];
}

export const BenefitsGrid = ({ benefits }: BenefitsGridProps) => {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Your Benefits at a Glance
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
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
  );
};
