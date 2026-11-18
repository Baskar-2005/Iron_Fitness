import { useEffect, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from 'lucide-react';
import { BUSINESS_CONFIG, buildWhatsAppUrl } from '../config/business';
import {
  FITNESS_GOALS,
  MESSAGE_MAX_LENGTH,
  PREFERRED_PROGRAMS,
  formatWhatsAppEnquiryMessage,
  normalizeIndianPhone,
  validateEnquiryForm,
  validateSingleField,
  type EnquiryField,
  type EnquiryFormInput,
} from '../utils/enquiryValidation';

interface EnquiryAndContactSectionProps {
  preselectedProgram?: string;
  preselectedPlanNote?: string;
}

interface SubmissionSuccess {
  id: string;
  message: string;
}

const INITIAL_FORM: EnquiryFormInput = {
  fullName: '',
  phone: '',
  age: '',
  fitnessGoal: '',
  preferredProgram: '',
  message: '',
};

const FIELD_INPUT_IDS: Record<EnquiryField, string> = {
  fullName: 'enquiry-full-name',
  phone: 'enquiry-phone',
  age: 'enquiry-age',
  fitnessGoal: 'enquiry-goal',
  preferredProgram: 'enquiry-program',
  message: 'enquiry-message',
};

export function EnquiryAndContactSection({
  preselectedProgram,
  preselectedPlanNote,
}: EnquiryAndContactSectionProps) {
  const [form, setForm] = useState<EnquiryFormInput>(INITIAL_FORM);
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<EnquiryField, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<SubmissionSuccess | null>(null);

  useEffect(() => {
    if (preselectedProgram) {
      setForm((prev) => ({
        ...prev,
        preferredProgram: preselectedProgram,
      }));
      setTouched((prev) => ({ ...prev, preferredProgram: true }));
      setFieldErrors((prev) => ({ ...prev, preferredProgram: undefined }));
      setSuccessData(null);
    }
  }, [preselectedProgram]);

  useEffect(() => {
    if (preselectedPlanNote) {
      setForm((prev) => ({
        ...prev,
        message: preselectedPlanNote,
      }));
      setTouched((prev) => ({ ...prev, message: true }));
      setFieldErrors((prev) => ({ ...prev, message: undefined }));
      setSuccessData(null);
    }
  }, [preselectedPlanNote]);

  const updateField = <K extends EnquiryField>(key: K, value: EnquiryFormInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (touched[key] || fieldErrors[key]) {
      const nextErr = validateSingleField(key, value);
      setFieldErrors((prev) => ({ ...prev, [key]: nextErr }));
    }

    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleBlur = (key: EnquiryField) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const err = validateSingleField(key, form[key]);
    setFieldErrors((prev) => ({ ...prev, [key]: err }));
  };

  const isFieldValid = (key: EnquiryField): boolean => {
    if (!touched[key]) return false;
    if (key === 'message' && form.message.trim() === '') return false;
    return !fieldErrors[key] && !validateSingleField(key, form[key]);
  };

  const getBorderClass = (key: EnquiryField): string => {
    if (fieldErrors[key]) {
      return 'border-[#E32636] focus:border-[#E32636]';
    }
    if (isFieldValid(key)) {
      return 'border-emerald-500/60 focus:border-emerald-400';
    }
    return 'border-[#C5C8CE]/25 focus:border-[#E32636]';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateEnquiryForm(form);
    if (!validation.valid) {
      setTouched({
        fullName: true,
        phone: true,
        age: true,
        fitnessGoal: true,
        preferredProgram: true,
        message: true,
      });
      setFieldErrors(validation.errors);
      setSuccessData(null);

      const errorKeys = Object.keys(validation.errors) as EnquiryField[];
      setSubmitError(
        `Please review ${errorKeys.length} highlighted ${
          errorKeys.length === 1 ? 'field' : 'fields'
        } below before submitting.`
      );

      const firstInvalidKey = (
        ['fullName', 'phone', 'age', 'fitnessGoal', 'preferredProgram', 'message'] as EnquiryField[]
      ).find((key) => Boolean(validation.errors[key]));

      if (firstInvalidKey) {
        const el = document.getElementById(FIELD_INPUT_IDS[firstInvalidKey]);
        el?.focus();
      }
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        id?: string;
        message?: string;
        errors?: Partial<Record<EnquiryField, string>>;
      } | null;

      if (!response.ok || !data?.ok || !data.id) {
        if (data?.errors) {
          setFieldErrors(data.errors);
          setTouched({
            fullName: true,
            phone: true,
            age: true,
            fitnessGoal: true,
            preferredProgram: true,
            message: true,
          });
        }
        setSubmitError(
          data?.message ||
            'Unable to submit your enquiry right now. Please try again or reach us directly on WhatsApp.'
        );
        setSuccessData(null);
        return;
      }

      setSuccessData({
        id: data.id,
        message: data.message || 'Enquiry submitted successfully.',
      });
      setForm(INITIAL_FORM);
      setTouched({});
      setFieldErrors({});
    } catch {
      setSubmitError(
        'Network error while submitting your enquiry. Please check your connection or enquire via WhatsApp.'
      );
      setSuccessData(null);
    } finally {
      setSubmitting(false);
    }
  };

  const normalizedPhonePreview = normalizeIndianPhone(form.phone);
  const formattedPhoneReady =
    isFieldValid('phone') && normalizedPhonePreview.length === 10
      ? `+91 ${normalizedPhonePreview.slice(0, 5)} ${normalizedPhonePreview.slice(5)}`
      : null;

  const whatsAppAltUrl = buildWhatsAppUrl(formatWhatsAppEnquiryMessage(form));

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#08090B] border-t border-[#C5C8CE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
            Join Now &amp; Contact
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.02em] text-white mb-4">
            READY TO LEVEL UP?
          </h2>
          <p className="text-base sm:text-lg text-[#C5C8CE] leading-relaxed">
            Take the first step towards a stronger, healthier and more confident you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Membership Enquiry Form */}
          <div
            id="enquiry"
            className="lg:col-span-7 bg-[#15171B] border border-[#C5C8CE]/15 p-6 sm:p-8 lg:p-10"
          >
            <div className="mb-6 pb-5 border-b border-[#C5C8CE]/15">
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                Membership Enquiry
              </h3>
              <p className="text-sm text-[#C5C8CE] mt-1">
                Submit your goals and preferred program to receive plan details and callback support.
              </p>
            </div>

            {successData && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 p-5 bg-[#08090B] border border-emerald-500/55 text-white"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <p className="font-display text-lg uppercase tracking-wide text-white">
                      Enquiry Confirmed · Ref {successData.id}
                    </p>
                    <p className="text-sm text-[#C5C8CE] mt-1">{successData.message}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <a
                        href={whatsAppAltUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#E32636] hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Message on WhatsApp for Faster Reply</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSuccessData(null)}
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C5C8CE] hover:text-white cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {submitError && (
              <div
                role="alert"
                className="mb-6 p-4 bg-[#08090B] border border-[#E32636] text-white flex items-start gap-3"
              >
                <AlertCircle
                  className="w-5 h-5 text-[#E32636] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div className="text-sm">
                  <p className="font-semibold text-white">{submitError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="enquiry-full-name"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                  >
                    Full Name <span className="text-[#E32636]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="enquiry-full-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={form.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      aria-invalid={Boolean(fieldErrors.fullName)}
                      aria-describedby={fieldErrors.fullName ? 'err-fullName' : undefined}
                      className={`w-full min-h-[46px] pl-4 pr-10 py-3 bg-[#08090B] border ${getBorderClass(
                        'fullName'
                      )} focus:outline-none text-sm text-white placeholder:text-[#C5C8CE]/45 transition-colors`}
                    />
                    {isFieldValid('fullName') && (
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                    )}
                    {fieldErrors.fullName && (
                      <AlertCircle
                        className="w-4 h-4 text-[#E32636] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {fieldErrors.fullName && (
                    <p id="err-fullName" className="mt-1.5 text-xs text-[#E32636]">
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                  >
                    Phone Number <span className="text-[#E32636]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="enquiry-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? 'err-phone' : undefined}
                      className={`w-full min-h-[46px] pl-4 pr-10 py-3 bg-[#08090B] border ${getBorderClass(
                        'phone'
                      )} focus:outline-none text-sm text-white placeholder:text-[#C5C8CE]/45 tabular-nums transition-colors`}
                    />
                    {isFieldValid('phone') && (
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                    )}
                    {fieldErrors.phone && (
                      <AlertCircle
                        className="w-4 h-4 text-[#E32636] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {fieldErrors.phone ? (
                    <p id="err-phone" className="mt-1.5 text-xs text-[#E32636]">
                      {fieldErrors.phone}
                    </p>
                  ) : formattedPhoneReady ? (
                    <p className="mt-1.5 text-xs text-emerald-400 tabular-nums">
                      Verified mobile: {formattedPhoneReady}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label
                    htmlFor="enquiry-age"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                  >
                    Age <span className="text-[#E32636]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="enquiry-age"
                      name="age"
                      type="number"
                      inputMode="numeric"
                      min={14}
                      max={85}
                      step={1}
                      placeholder="24"
                      value={form.age}
                      onChange={(e) => updateField('age', e.target.value)}
                      onBlur={() => handleBlur('age')}
                      aria-invalid={Boolean(fieldErrors.age)}
                      aria-describedby={fieldErrors.age ? 'err-age' : undefined}
                      className={`w-full min-h-[46px] pl-4 pr-9 py-3 bg-[#08090B] border ${getBorderClass(
                        'age'
                      )} focus:outline-none text-sm text-white placeholder:text-[#C5C8CE]/45 tabular-nums transition-colors`}
                    />
                    {isFieldValid('age') && (
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {fieldErrors.age && (
                    <p id="err-age" className="mt-1.5 text-xs text-[#E32636]">
                      {fieldErrors.age}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enquiry-goal"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                  >
                    Fitness Goal <span className="text-[#E32636]">*</span>
                  </label>
                  <select
                    id="enquiry-goal"
                    name="fitnessGoal"
                    value={form.fitnessGoal}
                    onChange={(e) => {
                      setTouched((prev) => ({ ...prev, fitnessGoal: true }));
                      updateField('fitnessGoal', e.target.value);
                    }}
                    onBlur={() => handleBlur('fitnessGoal')}
                    aria-invalid={Boolean(fieldErrors.fitnessGoal)}
                    aria-describedby={fieldErrors.fitnessGoal ? 'err-goal' : undefined}
                    className={`w-full min-h-[46px] px-4 py-3 bg-[#08090B] border ${getBorderClass(
                      'fitnessGoal'
                    )} focus:outline-none text-sm text-white transition-colors`}
                  >
                    <option value="">Select goal</option>
                    {FITNESS_GOALS.map((goal) => (
                      <option key={goal} value={goal}>
                        {goal}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.fitnessGoal && (
                    <p id="err-goal" className="mt-1.5 text-xs text-[#E32636]">
                      {fieldErrors.fitnessGoal}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enquiry-program"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                  >
                    Preferred Program <span className="text-[#E32636]">*</span>
                  </label>
                  <select
                    id="enquiry-program"
                    name="preferredProgram"
                    value={form.preferredProgram}
                    onChange={(e) => {
                      setTouched((prev) => ({ ...prev, preferredProgram: true }));
                      updateField('preferredProgram', e.target.value);
                    }}
                    onBlur={() => handleBlur('preferredProgram')}
                    aria-invalid={Boolean(fieldErrors.preferredProgram)}
                    aria-describedby={fieldErrors.preferredProgram ? 'err-program' : undefined}
                    className={`w-full min-h-[46px] px-4 py-3 bg-[#08090B] border ${getBorderClass(
                      'preferredProgram'
                    )} focus:outline-none text-sm text-white transition-colors`}
                  >
                    <option value="">Select program</option>
                    {PREFERRED_PROGRAMS.map((program) => (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.preferredProgram && (
                    <p id="err-program" className="mt-1.5 text-xs text-[#E32636]">
                      {fieldErrors.preferredProgram}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="enquiry-message"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE]"
                  >
                    Message (Optional)
                  </label>
                  <span
                    className={`text-xs tabular-nums ${
                      form.message.trim().length > MESSAGE_MAX_LENGTH
                        ? 'text-[#E32636] font-semibold'
                        : 'text-[#C5C8CE]/60'
                    }`}
                  >
                    {form.message.trim().length} / {MESSAGE_MAX_LENGTH}
                  </span>
                </div>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={3}
                  placeholder="Share preferred workout timing, experience level, or plan enquiry..."
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? 'err-message' : undefined}
                  className={`w-full px-4 py-3 bg-[#08090B] border ${getBorderClass(
                    'message'
                  )} focus:outline-none text-sm text-white placeholder:text-[#C5C8CE]/45 resize-y transition-colors`}
                />
                {fieldErrors.message && (
                  <p id="err-message" className="mt-1.5 text-xs text-[#E32636]">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-7 py-4 min-h-[48px] bg-[#E32636] hover:bg-[#c81e2c] disabled:opacity-60 text-white text-xs sm:text-sm font-bold uppercase tracking-[0.14em] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {submitting ? 'SUBMITTING ENQUIRY...' : 'GET MEMBERSHIP DETAILS'}
                </button>

                <a
                  href={whatsAppAltUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 min-h-[48px] bg-[#08090B] hover:bg-[#1E2127] text-white border border-[#C5C8CE]/30 text-xs font-bold uppercase tracking-[0.12em] transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-[#E32636]" aria-hidden="true" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>
            </form>
          </div>

          {/* Contact & Location Map */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-[#15171B] border border-[#C5C8CE]/15 p-6 sm:p-8">
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white mb-6">
                {BUSINESS_CONFIG.name}
              </h3>

              <div className="space-y-5 text-sm sm:text-base text-[#C5C8CE]">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#E32636] mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">Manjakuppam Location</p>
                    <p className="mt-1 leading-relaxed">{BUSINESS_CONFIG.address.full}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#E32636] mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">Direct Phone</p>
                    <a
                      href={BUSINESS_CONFIG.phoneTel}
                      className="mt-1 inline-block text-white hover:text-[#E32636] font-semibold tabular-nums transition-colors"
                    >
                      {BUSINESS_CONFIG.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-7 pt-6 border-t border-[#C5C8CE]/15">
                <a
                  href={BUSINESS_CONFIG.phoneTel}
                  className="min-h-[44px] px-3 py-2.5 bg-[#08090B] hover:bg-[#E32636] border border-[#C5C8CE]/25 hover:border-[#E32636] text-white text-xs font-bold uppercase tracking-[0.1em] flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Call Now</span>
                </a>

                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-3 py-2.5 bg-[#08090B] hover:bg-[#E32636] border border-[#C5C8CE]/25 hover:border-[#E32636] text-white text-xs font-bold uppercase tracking-[0.1em] flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={BUSINESS_CONFIG.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-3 py-2.5 bg-[#E32636] hover:bg-[#c81e2c] text-white text-xs font-bold uppercase tracking-[0.1em] flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            <div className="bg-[#15171B] border border-[#C5C8CE]/15 overflow-hidden flex-1 min-h-[250px] flex flex-col">
              <div className="px-5 py-3 border-b border-[#C5C8CE]/15 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-[#C5C8CE]">
                <span>Nethaji Road · Manjakuppam</span>
                <a
                  href={BUSINESS_CONFIG.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E32636] hover:text-white font-semibold"
                >
                  Open in Maps
                </a>
              </div>
              <iframe
                title="IRON MAN FITNESS & GYM Map Location in Manjakuppam, Cuddalore"
                src={BUSINESS_CONFIG.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[220px] border-0 grayscale contrast-125 opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
