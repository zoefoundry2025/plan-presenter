import { AgentContact } from "@/types/proposal";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactFooterProps {
  agent: AgentContact;
  disclaimer?: string;
}

export const ContactFooter = ({ agent, disclaimer }: ContactFooterProps) => {
  return (
    <footer className="py-12 md:py-16 bg-primary text-primary-foreground">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Questions? Let's Talk
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            I'm here to help you understand your options and make the best choice for your healthcare needs.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
          {agent.photoUrl && (
            <img 
              src={agent.photoUrl} 
              alt={agent.name}
              className="w-24 h-24 rounded-full border-4 border-primary-foreground/20"
            />
          )}
          
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
            <p className="text-primary-foreground/70 text-sm mb-4">
              NPN: {agent.npn}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="secondary" 
                asChild
                className="gap-2"
              >
                <a href={`mailto:${agent.email}`}>
                  <Mail className="w-4 h-4" />
                  {agent.email}
                </a>
              </Button>
              
              <Button 
                variant="secondary"
                asChild
                className="gap-2"
              >
                <a href={`tel:${agent.phone}`}>
                  <Phone className="w-4 h-4" />
                  {agent.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {disclaimer && (
          <div className="border-t border-primary-foreground/20 pt-8">
            <p className="text-xs text-primary-foreground/60 text-center max-w-3xl mx-auto leading-relaxed">
              {disclaimer}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
};
