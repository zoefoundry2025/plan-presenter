import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface TestResult {
  success: boolean;
  data?: {
    clientName?: string;
    clientAge?: number;
    planName?: string;
    planPremium?: string;
    agentName?: string;
    agentPhone?: string;
  };
  error?: string;
  rawResponse?: unknown;
}

const TestAirtable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      console.log("Testing Airtable connection...");
      console.log("Supabase URL:", supabaseUrl);
      
      const response = await fetch(
        `${supabaseUrl}/functions/v1/fetch-proposal?id=dan-95425-2024`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "apikey": supabaseKey,
          },
        }
      );

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (response.ok && data.proposal) {
        setResult({
          success: true,
          data: {
            clientName: data.proposal.clientName,
            clientAge: data.proposal.clientAge,
            planName: data.proposal.recommendedPlan?.name,
            planPremium: data.proposal.recommendedPlan?.premium,
            agentName: data.proposal.agent?.name,
            agentPhone: data.proposal.agent?.phone,
          },
          rawResponse: data,
        });
      } else {
        setResult({
          success: false,
          error: data.error || `HTTP ${response.status}`,
          rawResponse: data,
        });
      }
    } catch (error) {
      console.error("Test failed:", error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Airtable Connection Test</h1>
        <p className="text-muted-foreground">
          Testing connection to Airtable base <code className="bg-muted px-2 py-1 rounded">appRkKTFsd79m2PX9</code>, 
          table <code className="bg-muted px-2 py-1 rounded">Proposals</code>
        </p>
        <p className="text-muted-foreground">
          Looking for record: <code className="bg-muted px-2 py-1 rounded">proposal_id = dan-95425-2024</code>
        </p>

        <Button onClick={testConnection} disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Connection"
          )}
        </Button>

        {result && (
          <Card className={result.success ? "border-green-500" : "border-red-500"}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.success ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    Connection Successful!
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-red-500" />
                    Connection Failed
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.success && result.data ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Client Name</p>
                      <p className="text-lg font-semibold">{result.data.clientName || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Client Age</p>
                      <p className="text-lg font-semibold">{result.data.clientAge || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Plan Name</p>
                      <p className="text-lg font-semibold">{result.data.planName || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Plan Premium</p>
                      <p className="text-lg font-semibold">{result.data.planPremium || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Agent Name</p>
                      <p className="text-lg font-semibold">{result.data.agentName || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Agent Phone</p>
                      <p className="text-lg font-semibold">{result.data.agentPhone || "N/A"}</p>
                    </div>
                  </div>
                  
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-muted-foreground">View Raw Response</summary>
                    <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto max-h-96">
                      {JSON.stringify(result.rawResponse, null, 2)}
                    </pre>
                  </details>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-red-600 font-medium">{result.error}</p>
                  {result.rawResponse && (
                    <details>
                      <summary className="cursor-pointer text-sm text-muted-foreground">View Raw Response</summary>
                      <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto max-h-96">
                        {JSON.stringify(result.rawResponse, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TestAirtable;
