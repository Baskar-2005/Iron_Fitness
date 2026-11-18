export const FITNESS_GOALS = [
  'Weight Loss',
  'Weight Gain',
  'Muscle Building',
  'General Fitness',
  'Strength Training',
] as const;

export type FitnessGoal = (typeof FITNESS_GOALS)[number];

export const PREFERRED_PROGRAMS = [
  'Strength Training',
  'Weight Loss',
  'Weight Gain',
  'HIIT Training',
  'CrossFit',
  'Personal Training',
  'Adult Sports',
] as const;

export type PreferredProgram = (typeof PREFERRED_PROGRAMS)[number];

export interface EnquiryFormInput {
  fullName: string;
  phone: string;
  age: string;
  fitnessGoal: string;
  preferredProgram: string;
  message: string;
}

export type EnquiryField = keyof EnquiryFormInput;

export interface EnquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<EnquiryField, string>>;
  normalizedPhone: string;
  parsedAge: number | null;
}

export const MESSAGE_MAX_LENGTH = 500;

export function normalizeIndianPhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

export function validateSingleField(
  field: EnquiryField,
  value: string
): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case 'fullName': {
      if (!trimmed) {
        return 'Full name is required.';
      }
      if (trimmed.length < 2) {
        return 'Full name must be at least 2 characters.';
      }
      if (trimmed.length > 80) {
        return 'Full name must be 80 characters or fewer.';
      }
      if (!/[A-Za-z]/.test(trimmed)) {
        return 'Full name must contain letters.';
      }
      if (!/^[A-Za-z.\s'-]+$/.test(trimmed)) {
        return 'Use letters, spaces, dots, hyphens, or apostrophes only.';
      }
      return undefined;
    }

    case 'phone': {
      if (!trimmed) {
        return 'Mobile number is required.';
      }
      const normalized = normalizeIndianPhone(trimmed);
      if (!/^[6-9]\d{9}$/.test(normalized)) {
        return 'Enter a valid 10-digit Indian mobile number (starts with 6–9).';
      }
      if (/^(\d)\1{9}$/.test(normalized)) {
        return 'Please enter a genuine mobile number, not repeated digits.';
      }
      return undefined;
    }

    case 'age': {
      if (!trimmed) {
        return 'Age is required.';
      }
      if (!/^\d+$/.test(trimmed)) {
        return 'Enter your age as a whole number.';
      }
      const parsedAge = Number(trimmed);
      if (parsedAge < 14) {
        return 'Minimum membership age is 14 years.';
      }
      if (parsedAge > 85) {
        return 'Please enter an age of 85 or below.';
      }
      return undefined;
    }

    case 'fitnessGoal': {
      if (!FITNESS_GOALS.includes(trimmed as FitnessGoal)) {
        return 'Please select your primary fitness goal.';
      }
      return undefined;
    }

    case 'preferredProgram': {
      if (!PREFERRED_PROGRAMS.includes(trimmed as PreferredProgram)) {
        return 'Please select a preferred training program.';
      }
      return undefined;
    }

    case 'message': {
      if (trimmed.length > MESSAGE_MAX_LENGTH) {
        return `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`;
      }
      return undefined;
    }
  }
}

export function validateEnquiryForm(input: EnquiryFormInput): EnquiryValidationResult {
  const errors: Partial<Record<EnquiryField, string>> = {};
  const fields: EnquiryField[] = [
    'fullName',
    'phone',
    'age',
    'fitnessGoal',
    'preferredProgram',
    'message',
  ];

  for (const field of fields) {
    const error = validateSingleField(field, input[field]);
    if (error) {
      errors[field] = error;
    }
  }

  const normalizedPhone = normalizeIndianPhone(input.phone.trim());
  const ageTrimmed = input.age.trim();
  const parsedAge =
    /^\d+$/.test(ageTrimmed) && !errors.age ? Number(ageTrimmed) : null;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    normalizedPhone,
    parsedAge,
  };
}

export function formatWhatsAppEnquiryMessage(input: Partial<EnquiryFormInput>): string {
  const name = input.fullName?.trim();
  const goal = input.fitnessGoal?.trim();
  const program = input.preferredProgram?.trim();

  if (!name && !goal && !program) {
    return "Hi IRON MAN FITNESS & GYM! I'm interested in joining your gym. Please share your membership plans and details.";
  }

  const parts = ["Hi IRON MAN FITNESS & GYM! I'm interested in joining your gym."];
  if (name) parts.push(`Name: ${name}`);
  if (goal) parts.push(`Fitness Goal: ${goal}`);
  if (program) parts.push(`Preferred Program: ${program}`);
  parts.push('Please share membership plans and details.');
  return parts.join(' ');
}

export function filterGalleryItems<T extends { category: string }>(
  items: readonly T[],
  selectedCategory: string
): T[] {
  if (selectedCategory === 'All') {
    return [...items];
  }
  return items.filter((item) => item.category === selectedCategory);
}

export function getAdjacentGalleryIndex(
  currentIndex: number,
  total: number,
  direction: 'prev' | 'next'
): number {
  if (total <= 0) return -1;
  if (direction === 'next') {
    return (currentIndex + 1) % total;
  }
  return (currentIndex - 1 + total) % total;
}
