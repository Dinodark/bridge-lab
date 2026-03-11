"use client";

import MarketingHeader from "@/components/marketing/MarketingHeader";
import PlatformOverview from "@/components/marketing/PlatformOverview";
import AudienceTriggers from "@/components/marketing/AudienceTriggers";
import StrengthsOpportunities from "@/components/marketing/StrengthsOpportunities";
import ActionPlan from "@/components/marketing/ActionPlan";
import SlogansPhrases from "@/components/marketing/SlogansPhrases";
import NLPArchetypes from "@/components/marketing/NLPArchetypes";
import DesignGuide from "@/components/marketing/DesignGuide";
import DevGuide from "@/components/marketing/DevGuide";

export default function MarketingPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--color-bg)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div className="content-container">
        <MarketingHeader />
        <div className="space-y-16">
          <PlatformOverview />
          <AudienceTriggers />
          <StrengthsOpportunities />
          <ActionPlan />
          <SlogansPhrases />
          <NLPArchetypes />
          <DesignGuide />
          <DevGuide />
        </div>
      </div>
    </div>
  );
}
