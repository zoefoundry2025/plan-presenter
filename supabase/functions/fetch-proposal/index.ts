import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const AIRTABLE_BASE_ID = "appRkKTFsd79m2PX9";
const AIRTABLE_TABLE_NAME = "Proposals";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const proposalId = url.searchParams.get("id");

    console.log("Fetching proposal:", proposalId);

    if (!proposalId) {
      return new Response(
        JSON.stringify({ error: "Missing proposal ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY");
    
    if (!AIRTABLE_API_KEY) {
      console.error("AIRTABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error - missing API key" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("API key configured, calling Airtable...");

    // Search by proposal_id field
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula={proposal_id}="${proposalId}"`;
    
    const response = await fetch(airtableUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Airtable API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch from Airtable", details: errorText }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("Airtable response records count:", data.records?.length || 0);

    if (!data.records || data.records.length === 0) {
      return new Response(
        JSON.stringify({ error: "Proposal not found", proposalId }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Transform Airtable record to our Proposal format
    const record = data.records[0];
    const fields = record.fields;

    console.log("Found record:", record.id, "with client:", fields.client_name);

    const proposal = {
      id: record.id,
      clientName: fields.client_name || "",
      clientAge: fields.client_age,
      zipCode: fields.zip_code || "",
      
      branding: {
        companyName: fields.company_name || "Medicare Benefits",
        logoUrl: fields.logo_url,
        primaryColor: fields.primary_color,
        accentColor: fields.accent_color,
      },
      
      recommendedPlan: {
        name: fields.plan_name || "",
        planId: fields.plan_id || "",
        provider: fields.plan_provider || "",
        starRating: fields.plan_rating || 0,
        premium: fields.plan_premium || "",
        deductible: fields.plan_deductible || "",
        maxOutOfPocket: fields.plan_max_oop || "",
      },
      
      personalizedReasons: JSON.parse(fields.personalized_reasons_json || "[]"),
      benefits: JSON.parse(fields.benefits_json || "[]"),
      comparisonPlans: JSON.parse(fields.comparison_plans_json || "[]"),
      
      agent: {
        name: fields.agent_name || "",
        email: fields.agent_email || "",
        phone: fields.agent_phone || "",
        npn: fields.agent_npn || "",
        photoUrl: fields.agent_photo_url,
      },
      
      disclaimer: fields.disclaimer_text,
      password: fields.password || "",
    };

    console.log("Successfully transformed proposal");

    return new Response(
      JSON.stringify({ proposal }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Internal server error", message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
