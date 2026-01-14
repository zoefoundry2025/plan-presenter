import { BrandingConfig } from "@/types/proposal";

interface HeroSectionProps {
  branding: BrandingConfig;
  clientName: string;
  zipCode: string;
}

export const HeroSection = ({ branding, clientName, zipCode }: HeroSectionProps) => {
  return (
    <section className="hero-gradient py-16 md:py-24 text-center">
      <div className="container max-w-4xl mx-auto px-4">
        {branding.logoUrl ? (
          <img 
            src={branding.logoUrl} 
            alt={branding.companyName} 
            className="h-12 mx-auto mb-6"
          />
        ) : (
          <p className="text-primary-foreground/80 text-lg mb-4">
            {branding.companyName}
          </p>
        )}
        
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
          Your Recommended Medicare Plan
        </h1>
        
        <p className="text-primary-foreground/90 text-lg md:text-xl">
          Personalized recommendation for {clientName} • Zip Code {zipCode}
        </p>
      </div>
    </section>
  );
};
