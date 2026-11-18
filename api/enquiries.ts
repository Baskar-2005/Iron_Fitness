import crypto from 'node:crypto';
import { validateEnquiryForm, type EnquiryFormInput } from '../src/utils/enquiryValidation';

interface ServerlessRequest {
  method?: string;
  body?: unknown;
}

interface ServerlessResponse {
  status: (code: number) => ServerlessResponse;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

export default function handler(req: ServerlessRequest, res: ServerlessResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.status(405).json({
      ok: false,
      message: 'Method not allowed.',
    });
    return;
  }

  let parsedBody: Partial<EnquiryFormInput> = {};
  if (typeof req.body === 'string') {
    try {
      parsedBody = JSON.parse(req.body) as Partial<EnquiryFormInput>;
    } catch {
      res.status(400).json({
        ok: false,
        message: 'Invalid JSON request body.',
      });
      return;
    }
  } else if (req.body && typeof req.body === 'object') {
    parsedBody = req.body as Partial<EnquiryFormInput>;
  }

  const payload: EnquiryFormInput = {
    fullName: typeof parsedBody.fullName === 'string' ? parsedBody.fullName : '',
    phone: typeof parsedBody.phone === 'string' ? parsedBody.phone : '',
    age:
      typeof parsedBody.age === 'string' || typeof parsedBody.age === 'number'
        ? String(parsedBody.age)
        : '',
    fitnessGoal: typeof parsedBody.fitnessGoal === 'string' ? parsedBody.fitnessGoal : '',
    preferredProgram:
      typeof parsedBody.preferredProgram === 'string' ? parsedBody.preferredProgram : '',
    message: typeof parsedBody.message === 'string' ? parsedBody.message : '',
  };

  const validation = validateEnquiryForm(payload);
  if (!validation.valid || validation.parsedAge === null) {
    res.status(400).json({
      ok: false,
      message: 'Please correct the highlighted fields before submitting.',
      errors: validation.errors,
    });
    return;
  }

  const id = `IM-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  res.status(201).json({
    ok: true,
    id,
    submittedAt: new Date().toISOString(),
    message: 'Enquiry received. Our team at IRON MAN FITNESS & GYM will contact you shortly.',
  });
}
