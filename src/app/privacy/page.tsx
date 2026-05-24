import { LegalPage } from "@/components/LegalPage";

export const revalidate = 60;

export const metadata = {
  title: "Privacy - The Bistro",
  description: "How The Bistro handles the few details we ask of you.",
};

export default function Privacy() {
  return <LegalPage slug="privacy" eyebrow="Privacy" />;
}
