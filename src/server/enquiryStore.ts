import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { EnquiryFormInput } from '../utils/enquiryValidation';

export interface StoredEnquiry {
  id: string;
  fullName: string;
  phone: string;
  age: number;
  fitnessGoal: string;
  preferredProgram: string;
  message: string;
  submittedAt: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const memoryStore: StoredEnquiry[] = [];

export function saveEnquiry(
  input: EnquiryFormInput,
  normalizedPhone: string,
  parsedAge: number
): StoredEnquiry {
  const record: StoredEnquiry = {
    id: `IM-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
    fullName: input.fullName.trim(),
    phone: normalizedPhone,
    age: parsedAge,
    fitnessGoal: input.fitnessGoal,
    preferredProgram: input.preferredProgram,
    message: input.message.trim(),
    submittedAt: new Date().toISOString(),
  };

  memoryStore.push(record);

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    let existing: StoredEnquiry[] = [];
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        existing = parsed;
      }
    }
    existing.push(record);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
  } catch {
    // Keep memoryStore populated if filesystem persistence is unavailable
  }

  return record;
}

export function getEnquiryCount(): number {
  try {
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.length;
      }
    }
  } catch {
    // Fallback to in-memory count
  }
  return memoryStore.length;
}
