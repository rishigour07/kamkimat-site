export type FounderRecord = {
  id: string;
  name: string;
  role: string;
  description: string;
  photoData: string | null;
  isVisible: boolean;
};

const STATIC_FOUNDERS: FounderRecord[] = [];

export async function getAllFounders() {
  return STATIC_FOUNDERS;
}

export async function getVisibleFounders() {
  return STATIC_FOUNDERS.filter((founder) => founder.isVisible);
}

export async function getFounderById(id: string) {
  return STATIC_FOUNDERS.find((founder) => founder.id === id) ?? null;
}

