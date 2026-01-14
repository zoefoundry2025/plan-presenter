import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient">
      <div className="text-center px-4">
        <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-12 max-w-xl mx-auto">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Medicare Proposal System
          </h1>
          
          <p className="text-muted-foreground mb-8 text-lg">
            Create personalized, shareable Medicare plan proposals for your clients.
          </p>

          <div className="space-y-4">
            <Button asChild size="lg" className="w-full gap-2">
              <Link to="/proposal/demo">
                <ExternalLink className="w-5 h-5" />
                View Demo Proposal
              </Link>
            </Button>

            <p className="text-sm text-muted-foreground pt-4">
              Password: <code className="bg-muted px-2 py-1 rounded">medicare2024</code>
            </p>
          </div>
        </div>

        <div className="mt-8 bg-card/80 backdrop-blur rounded-xl p-6 max-w-xl mx-auto">
          <h2 className="font-semibold text-foreground mb-3">
            How It Works
          </h2>
          <ul className="text-sm text-muted-foreground space-y-2 text-left">
            <li>📋 Create proposals in Airtable</li>
            <li>🔗 Share unique links with clients</li>
            <li>🔐 Password protected for privacy</li>
            <li>📱 Mobile-friendly design</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
