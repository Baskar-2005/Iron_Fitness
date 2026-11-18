import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterGalleryItems,
  formatWhatsAppEnquiryMessage,
  getAdjacentGalleryIndex,
  normalizeIndianPhone,
  validateEnquiryForm,
  validateSingleField,
} from './enquiryValidation';

test('normalizeIndianPhone handles +91, leading 0, and spaces', () => {
  assert.equal(normalizeIndianPhone('+91 95009 95577'), '9500995577');
  assert.equal(normalizeIndianPhone('09500995577'), '9500995577');
  assert.equal(normalizeIndianPhone('95009-95577'), '9500995577');
});

test('validateEnquiryForm rejects empty or invalid inputs', () => {
  const result = validateEnquiryForm({
    fullName: 'A',
    phone: '12345',
    age: '10',
    fitnessGoal: '',
    preferredProgram: '',
    message: '',
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.age);
  assert.ok(result.errors.fitnessGoal);
  assert.ok(result.errors.preferredProgram);
});

test('validateSingleField enforces strict name, phone, age, and message bounds', () => {
  assert.ok(validateSingleField('fullName', '12345'));
  assert.ok(validateSingleField('fullName', 'Karthik@123'));
  assert.equal(validateSingleField('fullName', 'K. Karthik Rajan'), undefined);

  assert.ok(validateSingleField('phone', '9999999999'));
  assert.ok(validateSingleField('phone', '5123456789'));
  assert.equal(validateSingleField('phone', '+91 95009 95577'), undefined);

  assert.ok(validateSingleField('age', '24.5'));
  assert.ok(validateSingleField('age', '13'));
  assert.ok(validateSingleField('age', '86'));
  assert.equal(validateSingleField('age', '14'), undefined);
  assert.equal(validateSingleField('age', '85'), undefined);

  assert.ok(validateSingleField('message', 'a'.repeat(501)));
  assert.equal(validateSingleField('message', 'a'.repeat(500)), undefined);
});

test('validateEnquiryForm accepts complete valid membership enquiry', () => {
  const result = validateEnquiryForm({
    fullName: 'Karthik Rajan',
    phone: '+91 95009 95577',
    age: '26',
    fitnessGoal: 'Muscle Building',
    preferredProgram: 'Strength Training',
    message: 'Looking for evening batch details.',
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.normalizedPhone, '9500995577');
  assert.equal(result.parsedAge, 26);
});

test('formatWhatsAppEnquiryMessage builds default or personalized message', () => {
  const defaultMsg = formatWhatsAppEnquiryMessage({});
  assert.match(defaultMsg, /IRON MAN FITNESS & GYM/);
  assert.match(defaultMsg, /membership plans and details/);

  const customMsg = formatWhatsAppEnquiryMessage({
    fullName: 'Arun',
    fitnessGoal: 'Weight Loss',
    preferredProgram: 'HIIT Training',
  });
  assert.match(customMsg, /Name: Arun/);
  assert.match(customMsg, /Fitness Goal: Weight Loss/);
  assert.match(customMsg, /Preferred Program: HIIT Training/);
});

test('filterGalleryItems and getAdjacentGalleryIndex behave deterministically', () => {
  const sample = [
    { id: '1', category: 'Equipment' },
    { id: '2', category: 'Gym Interior' },
    { id: '3', category: 'Equipment' },
  ];

  assert.equal(filterGalleryItems(sample, 'All').length, 3);
  assert.equal(filterGalleryItems(sample, 'Equipment').length, 2);
  assert.equal(getAdjacentGalleryIndex(0, 3, 'prev'), 2);
  assert.equal(getAdjacentGalleryIndex(2, 3, 'next'), 0);
  assert.equal(getAdjacentGalleryIndex(0, 0, 'next'), -1);
});
