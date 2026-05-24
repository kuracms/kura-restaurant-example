import { LegalPage } from "@/components/LegalPage";

export const revalidate = 60;

export const metadata = {
  title: "Terms - The Bistro",
  description: "Booking, cancellation, walk-ins and allergies at The Bistro.",
};

export default function Terms() {
  return <LegalPage slug="terms" eyebrow="Terms" />;
}
