import type { LeadType } from "@/lib/lead-scoring";
import { prisma } from "@/lib/prisma";

type ContactSubmissionSource = "contact_form" | "chatbot";

export type { ContactSubmissionSource };

export type AdminUserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type FounderRecord = {
  id: string;
  name: string;
  role: string;
  description: string;
  photoData: string | null;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ContactSubmissionRecord = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  message: string;
  source: ContactSubmissionSource;
  leadType: LeadType;
  createdAt: string;
};

type FounderInput = {
  name: string;
  role: string;
  description: string;
  photoData: string | null;
  isVisible: boolean;
};

type ContactSubmissionInput = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  message: string;
  source: ContactSubmissionSource;
  leadType?: LeadType;
};

function mapAdminUser(row: {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
} | null): AdminUserRecord | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    email: row.email,
    passwordHash: row.passwordHash,
    role: row.role,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString()
  };
}

function mapFounder(row: {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string | null;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
} | null): FounderRecord | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    role: row.role,
    description: row.description,
    photoData: row.image,
    isVisible: row.isVisible,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString()
  };
}

function mapContactSubmission(row: {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  message: string;
  source: string;
  leadType: string;
  createdAt: Date;
} | null): ContactSubmissionRecord | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    service: row.service,
    message: row.message,
    source: row.source as ContactSubmissionSource,
    leadType: row.leadType as LeadType,
    createdAt: row.createdAt.toISOString()
  };
}

export async function getAllFounders() {
  const rows = await prisma.founder.findMany({
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }]
  });

  return rows.map((row) => mapFounder(row)!).filter(Boolean);
}

export async function getVisibleFounders() {
  try {
    const rows = await prisma.founder.findMany({
      where: {
        isVisible: true
      },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }]
    });

    if (!rows.length) {
      return [];
    }

    return rows.map((row) => mapFounder(row)!).filter(Boolean);
  } catch (error) {
    console.error("Failed to load visible founders for the public About page.", error);
    return [];
  }
}

export async function getFounderById(id: string) {
  const row = await prisma.founder.findUnique({
    where: {
      id
    }
  });

  return mapFounder(row);
}

export async function createFounder(input: FounderInput) {
  const row = await prisma.founder.create({
    data: {
      name: input.name,
      role: input.role,
      description: input.description,
      image: input.photoData,
      isVisible: input.isVisible
    }
  });

  return mapFounder(row)!;
}

export async function updateFounder(id: string, input: FounderInput) {
  try {
    const row = await prisma.founder.update({
      where: {
        id
      },
      data: {
        name: input.name,
        role: input.role,
        description: input.description,
        image: input.photoData,
        isVisible: input.isVisible
      }
    });

    return mapFounder(row);
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return null;
    }

    throw error;
  }
}

export async function deleteFounder(id: string) {
  const result = await prisma.founder.deleteMany({
    where: {
      id
    }
  });

  return result.count > 0;
}

export async function getAdminUserByEmail(email: string) {
  const row = await prisma.adminUser.findUnique({
    where: {
      email
    }
  });

  return mapAdminUser(row);
}

export async function upsertAdminUser(email: string, passwordHash: string, role = "ADMIN") {
  const row = await prisma.adminUser.upsert({
    where: {
      email
    },
    update: {
      passwordHash,
      role
    },
    create: {
      email,
      passwordHash,
      role
    }
  });

  return mapAdminUser(row)!;
}

export async function createContactSubmission(input: ContactSubmissionInput) {
  const row = await prisma.contactSubmission.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      service: input.service,
      message: input.message,
      source: input.source,
      leadType: input.leadType ?? "cold"
    }
  });

  return mapContactSubmission(row)!;
}

export async function getAllContactSubmissions() {
  const rows = await prisma.contactSubmission.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return rows.map((row) => mapContactSubmission(row)!).filter(Boolean);
}

export async function deleteContactSubmission(id: string) {
  const result = await prisma.contactSubmission.deleteMany({
    where: {
      id
    }
  });

  return result.count > 0;
}
