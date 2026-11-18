import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { createServer as createViteServer } from 'vite';
import { validateEnquiryForm, type EnquiryFormInput } from './src/utils/enquiryValidation';
import { getEnquiryCount, saveEnquiry } from './src/server/enquiryStore';

const PORT = Number(process.env.PORT || 3000);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      enquiriesCount: getEnquiryCount(),
    });
  });

  app.post('/api/enquiries', (req, res) => {
    const body = (req.body ?? {}) as Partial<EnquiryFormInput>;
    const payload: EnquiryFormInput = {
      fullName: typeof body.fullName === 'string' ? body.fullName : '',
      phone: typeof body.phone === 'string' ? body.phone : '',
      age: typeof body.age === 'string' || typeof body.age === 'number' ? String(body.age) : '',
      fitnessGoal: typeof body.fitnessGoal === 'string' ? body.fitnessGoal : '',
      preferredProgram: typeof body.preferredProgram === 'string' ? body.preferredProgram : '',
      message: typeof body.message === 'string' ? body.message : '',
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

    const saved = saveEnquiry(payload, validation.normalizedPhone, validation.parsedAge);
    res.status(201).json({
      ok: true,
      id: saved.id,
      submittedAt: saved.submittedAt,
      message: 'Enquiry received. Our team at IRON MAN FITNESS & GYM will contact you shortly.',
    });
  });

  if (!IS_PRODUCTION) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IRON MAN FITNESS & GYM server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
