import { Proposal } from "@/types/proposal";

export const mockProposal: Proposal = {
  id: "dan-95425-2024",
  clientName: "Dan",
  clientAge: 67,
  zipCode: "95425",
  
  branding: {
    companyName: "ClearGuide Benefits",
    logoUrl: undefined,
    primaryColor: "#0D9488",
    accentColor: "#F59E0B",
  },
  
  recommendedPlan: {
    name: "Alignment Health Sutter Advantage +More",
    planId: "H3815-023-000",
    provider: "Alignment Health",
    starRating: 4,
    premium: "$48/mo",
    deductible: "$0",
    maxOutOfPocket: "$4,900",
  },
  
  personalizedReasons: [
    {
      icon: "🏥",
      title: "Long-Term Care Protection",
      description: "Prepared for your future with superior nursing facility coverage",
    },
    {
      icon: "💪",
      title: "Stay Active and Independent",
      subtitle: "$0 copay for physical therapy, mental health, acupuncture, chiropractic, and gym",
      description: "Maintain your health and independence with comprehensive preventive care. Physical therapy, mental health services, and fitness benefits help you stay strong and active.",
    },
    {
      icon: "✅",
      title: "Your Doctor Is In Network",
      subtitle: "Alliance Medical Center & Dr. Cassandra Heller DO are covered",
      description: "Continue seeing your trusted healthcare provider without interruption. This plan works with Sutter Health network, which includes your current doctor.",
    },
  ],
  
  benefits: [
    {
      icon: "🏥",
      title: "Physical Therapy",
      value: "$0 copay",
      description: "Maintain mobility",
      detailBullets: [
        "$0 copay for physical therapy services",
        "Helps maintain strength, mobility, and independence",
        "Especially important as you age",
      ],
    },
    {
      icon: "💪",
      title: "Gym Membership",
      value: "$0 copay",
      description: "Stay strong and active",
    },
    {
      icon: "🌿",
      title: "Acupuncture",
      value: "$0 copay",
      description: "Pain management",
    },
    {
      icon: "🦴",
      title: "Chiropractic",
      value: "$0 copay",
      description: "Spine and pain care",
    },
    {
      icon: "🛒",
      title: "OTC Items",
      value: "$15/month",
      description: "Over-the-counter products",
    },
    {
      icon: "🦷",
      title: "Dental & Vision",
      value: "$2,500 dental",
      description: "$250 eyewear",
    },
  ],
  
  comparisonPlans: [
    {
      name: "Alignment Health Sutter +More",
      isRecommended: true,
      premium: "$48/mo",
      partB: "$185/mo",
      maxOutOfPocket: "$4,900",
      drugDeductible: "$0",
      transportation: "Not covered",
      acupuncture: "$0 copay (Medicare-covered)",
      chiropractic: "$0 copay (Medicare-covered)",
      gymMembership: "$0 copay",
      otcBenefit: "$15/month",
      dentalVision: "$0 preventive / Varies comprehensive",
      starRating: 4,
    },
    {
      name: "Current Coverage (Original Medicare)",
      premium: "$109.40/mo",
      partB: "$174.70/mo",
      maxOutOfPocket: "$1,632 hospital deductible",
      drugDeductible: "$545",
      transportation: "Not offered",
      acupuncture: "Not offered",
      chiropractic: "Limited",
      gymMembership: "Not offered",
      otcBenefit: "Not offered",
      dentalVision: "Not offered",
      starRating: 0,
    },
    {
      name: "Imperial Dynamic Plan",
      premium: "$0/mo",
      partB: "$185/mo (Plan pays $35)",
      maxOutOfPocket: "$296/year",
      drugDeductible: "$0",
      transportation: "$0 for 100 one-way trips",
      acupuncture: "$0 copay (35 visits/year combined)",
      chiropractic: "$0 copay (35 visits/year combined)",
      gymMembership: "$0 home fitness kit/year",
      otcBenefit: "$140 every 3 months",
      dentalVision: "$0 preventive / $500 routine / $4,000 restorative",
      starRating: 3.5,
    },
    {
      name: "Kaiser Senior Advantage Basic",
      premium: "$24/mo",
      partB: "$185/mo",
      maxOutOfPocket: "$6,000/year",
      drugDeductible: "N/A (Kaiser pharmacy)",
      transportation: "Not offered",
      acupuncture: "Not offered",
      chiropractic: "Not offered",
      gymMembership: "Not offered",
      otcBenefit: "Not offered",
      dentalVision: "$0 preventive / diagnostic / periodontic",
      starRating: 4.5,
    },
  ],
  
  agent: {
    name: "Sarah Johnson",
    email: "sarah@clearguidebenefits.com",
    phone: "(555) 123-4567",
    npn: "12345678",
  },
  
  disclaimer: "This is not a complete description of benefits. Contact the plan for more information. Limitations, copayments, and restrictions may apply. Benefits, premiums and/or copayments/coinsurance may change on January 1 of each year.",
  
  password: "medicare2024",
};
