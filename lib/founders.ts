import { getEditableSiteContent, type EditableFounderItem } from "@/lib/content";

export type FounderRecord = EditableFounderItem;

export async function getAllFounders() {
  const content = await getEditableSiteContent();
  return content.founders;
}

export async function getVisibleFounders() {
  const content = await getEditableSiteContent();
  return content.founders.filter(
    (founder) => founder.isVisible && founder.name && founder.role && founder.description
  );
}

export async function getFounderById(id: string) {
  const content = await getEditableSiteContent();
  return content.founders.find((founder) => founder.id === id) ?? null;
}

