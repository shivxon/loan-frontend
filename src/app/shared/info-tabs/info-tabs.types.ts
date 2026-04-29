export interface InfoTab {
  id: string;
  label: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  points?: string[];
  faqs?: { question: string; answer: string; open?: boolean }[];
  metrics?: { value: string; label: string }[];
}
