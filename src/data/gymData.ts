export const HERO_MEDIA = {
  image: '/src/assets/images/hero_athlete_gym_1795010313052.jpg',
  alt: 'Muscular male athlete performing heavy dumbbell strength training inside IRON MAN FITNESS & GYM',
} as const;

export const ABOUT_MEDIA = {
  image: '/src/assets/images/about_gym_interior_1795010313213.jpg',
  alt: 'Modern strength equipment floor, power racks, dumbbells, and cable machines at IRON MAN FITNESS & GYM',
  features: [
    'Modern Equipment',
    'Personal Coaching',
    'Friendly Training Environment',
    'Affordable Fitness',
  ],
} as const;

export interface ProgramItem {
  id: string;
  number: string;
  name: string;
  description: string;
  focus: string;
  image: string;
  alt: string;
  featured?: boolean;
}

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'strength-training',
    number: '01',
    name: 'STRENGTH TRAINING',
    description: 'Build strength through structured resistance training.',
    focus: 'Progressive Overload · Compound Lifts',
    image: '/src/assets/images/equipment_strength_zone_1795010314577.jpg',
    alt: 'Olympic barbell and calibrated weight plates for strength training',
    featured: true,
  },
  {
    id: 'weight-loss',
    number: '02',
    name: 'WEIGHT LOSS',
    description: 'Work towards your fitness goals with guided workouts.',
    focus: 'Caloric Conditioning · Structured Cardio',
    image: '/src/assets/images/program_cardio_machines_1795010315107.jpg',
    alt: 'Modern treadmills and conditioning bikes for weight loss workouts',
  },
  {
    id: 'weight-gain',
    number: '03',
    name: 'WEIGHT GAIN',
    description: 'Focus on strength and muscle development.',
    focus: 'Hypertrophy · Resistance Progression',
    image: '/src/assets/images/hero_athlete_gym_1795010313052.jpg',
    alt: 'Heavy dumbbell training for lean muscle and weight gain',
  },
  {
    id: 'hiit-training',
    number: '04',
    name: 'HIIT TRAINING',
    description: 'High-intensity interval workout sessions.',
    focus: 'Metabolic Intervals · Stamina',
    image: '/src/assets/images/program_hiit_crossfit_1795010314979.jpg',
    alt: 'Functional turf zone with kettlebells and battle ropes for HIIT sessions',
    featured: true,
  },
  {
    id: 'crossfit',
    number: '05',
    name: 'CROSSFIT',
    description: 'Functional fitness and challenging workout sessions.',
    focus: 'Functional Movement · Conditioning',
    image: '/src/assets/images/program_hiit_crossfit_1795010314979.jpg',
    alt: 'CrossFit rig, plyo boxes, and kettlebells inside the functional zone',
  },
  {
    id: 'personal-training',
    number: '06',
    name: 'PERSONAL TRAINING',
    description: 'Individual guidance and tailored workout plans.',
    focus: '1-on-1 Form Coaching · Custom Plans',
    image: '/src/assets/images/about_gym_interior_1795010313213.jpg',
    alt: 'Dedicated coaching and equipment zone for personal training sessions',
  },
  {
    id: 'adult-sports',
    number: '07',
    name: 'ADULT SPORTS',
    description: 'Fitness through active sports and movement.',
    focus: 'Agility · Mobility · Endurance',
    image: '/src/assets/images/program_cardio_machines_1795010315107.jpg',
    alt: 'Athletic conditioning floor supporting adult sports performance',
  },
];

export interface TrustMetric {
  value: string;
  label: string;
  accent?: boolean;
}

export const TRUST_METRICS: TrustMetric[] = [
  { value: '4.8/5', label: 'Google Rating', accent: true },
  { value: '211', label: 'Google Reviews' },
  { value: 'HIIT', label: 'Fitness Classes' },
  { value: 'MODERN', label: 'Gym Equipment' },
];

export interface DifferentiatorItem {
  id: string;
  title: string;
  description: string;
  icon: 'dumbbell' | 'userCheck' | 'users' | 'wallet' | 'flame';
}

export const DIFFERENTIATORS: DifferentiatorItem[] = [
  {
    id: 'modern-equipment',
    title: 'MODERN EQUIPMENT',
    description: 'A well-equipped workout environment.',
    icon: 'dumbbell',
  },
  {
    id: 'personal-guidance',
    title: 'PERSONAL GUIDANCE',
    description: 'Trainers provide workout guidance and tailored exercise plans.',
    icon: 'userCheck',
  },
  {
    id: 'friendly-community',
    title: 'FRIENDLY COMMUNITY',
    description: 'A welcoming fitness environment.',
    icon: 'users',
  },
  {
    id: 'affordable-fitness',
    title: 'AFFORDABLE FITNESS',
    description: 'Fitness options designed with value in mind.',
    icon: 'wallet',
  },
  {
    id: 'energy-motivation',
    title: 'ENERGY & MOTIVATION',
    description: 'A motivating place to work towards your goals.',
    icon: 'flame',
  },
];

export interface EquipmentShowcaseItem {
  id: string;
  title: string;
  items: string[];
  image: string;
  alt: string;
}

export const EQUIPMENT_SHOWCASE: EquipmentShowcaseItem[] = [
  {
    id: 'free-weights',
    title: 'Free Weights & Racks',
    items: ['Dumbbells', 'Barbells', 'Weight Plates', 'Squat Racks'],
    image: '/src/assets/images/equipment_strength_zone_1795010314577.jpg',
    alt: 'Olympic barbells, calibrated weight plates, and hex dumbbell racks',
  },
  {
    id: 'cable-strength',
    title: 'Cable & Strength Machines',
    items: ['Cable Machines', 'Strength Machines', 'Power Cages'],
    image: '/src/assets/images/about_gym_interior_1795010313213.jpg',
    alt: 'Multi-station cable machines and strength cages on the training floor',
  },
  {
    id: 'cardio-turf',
    title: 'Cardio & Conditioning',
    items: ['Treadmills', 'Cardio Equipment', 'Functional Turf'],
    image: '/src/assets/images/program_cardio_machines_1795010315107.jpg',
    alt: 'Commercial treadmills and indoor cycling cardio machines',
  },
];

export interface TrainerProfile {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  certifications: string[];
  image: string;
}

// Keep empty until real trainer names, experience, and photographs are provided by the owner.
export const TRAINERS: TrainerProfile[] = [];

export interface TransformationMilestone {
  id: string;
  pillar: string;
  title: string;
  summary: string;
  focusSteps: string[];
}

export const TRANSFORMATION_MILESTONES: TransformationMilestone[] = [
  {
    id: 'journey',
    pillar: 'Fitness Journey',
    title: 'Structured Start, Clear Direction',
    summary:
      'Every member begins with workout orientation so you know how to train safely with the right movements for your goal.',
    focusSteps: ['Goal assessment at onboarding', 'Guided movement selection', 'Weekly consistency check-ins'],
  },
  {
    id: 'consistency',
    pillar: 'Workout Consistency',
    title: 'Routine Built Around Your Schedule',
    summary:
      'Open late until 9:30 PM on training days, giving students and working professionals in Manjakuppam reliable floor access.',
    focusSteps: ['Evening access up to 9:30 PM', 'Split-routine scheduling', 'Supportive unisex floor culture'],
  },
  {
    id: 'progression',
    pillar: 'Strength Progression',
    title: 'Measurable Load & Technique Gains',
    summary:
      'Track sets, reps, and movement execution across free weights, squat racks, and cable stations without guesswork.',
    focusSteps: ['Compound lift foundations', 'Controlled progressive loading', 'Balanced push, pull & leg work'],
  },
  {
    id: 'milestones',
    pillar: 'Personal Milestones',
    title: 'Real Habit & Performance Wins',
    summary:
      'Progress looks different for everyone—from completing your first HIIT circuit to hitting steady strength benchmarks.',
    focusSteps: ['Sustainable pace over shortcuts', 'Coach-assisted procedure checks', 'Confidence in every session'],
  },
];

export interface MembershipPlan {
  id: string;
  name: string;
  duration: string;
  priceDisplay: string;
  priceNote: string;
  recommended?: boolean;
  benefits: string[];
}

// Editable plan configuration — replace priceDisplay & priceNote once confirmed by gym management.
export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    duration: '1 Month Access',
    priceDisplay: 'Ask for Monthly Rate',
    priceNote: 'Confirm current monthly fee via enquiry or front desk',
    benefits: [
      'Full unisex gym floor access',
      'Modern strength & cardio equipment',
      'Initial workout procedure guidance',
      'Training access until 9:30 PM',
    ],
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    duration: '3 Months Access',
    priceDisplay: 'Ask for Quarterly Rate',
    priceNote: 'Popular option for structured 12-week consistency',
    recommended: true,
    benefits: [
      'Everything in Monthly access',
      'Goal-aligned workout split guidance',
      'Access to HIIT & functional conditioning floor',
      'Value-focused 3-month commitment',
    ],
  },
  {
    id: 'annual',
    name: 'Annual',
    duration: '12 Months Access',
    priceDisplay: 'Ask for Annual Rate',
    priceNote: 'Long-term fitness option — enquire for best annual value',
    benefits: [
      'Year-round full facility access',
      'Ongoing exercise procedure support',
      'Weight loss, weight gain & strength focus',
      'Optional personal coaching add-on',
    ],
  },
];

export type GalleryCategory =
  | 'All'
  | 'Gym Interior'
  | 'Equipment'
  | 'Training'
  | 'Workout Sessions'
  | 'Fitness Activities';

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Gym Interior',
  'Equipment',
  'Training',
  'Workout Sessions',
  'Fitness Activities',
];

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'All'>;
  caption: string;
  image: string;
  alt: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-interior-1',
    title: 'Main Strength Floor',
    category: 'Gym Interior',
    caption: 'Power racks, dumbbell rows, and cable stations at Manjakuppam.',
    image: '/src/assets/images/about_gym_interior_1795010313213.jpg',
    alt: 'Main strength floor and power racks inside IRON MAN FITNESS & GYM',
  },
  {
    id: 'gal-equip-1',
    title: 'Barbells & Calibrated Plates',
    category: 'Equipment',
    caption: 'Heavy-duty Olympic barbells and hex dumbbells built for daily lifting.',
    image: '/src/assets/images/equipment_strength_zone_1795010314577.jpg',
    alt: 'Olympic barbell sleeves and black weight plates next to dumbbell rack',
  },
  {
    id: 'gal-train-1',
    title: 'Heavy Resistance Session',
    category: 'Training',
    caption: 'Focused compound strength work under dramatic studio lighting.',
    image: '/src/assets/images/hero_athlete_gym_1795010313052.jpg',
    alt: 'Athlete performing heavy bent-over dumbbell row on the gym floor',
  },
  {
    id: 'gal-workout-1',
    title: 'HIIT & CrossFit Turf Zone',
    category: 'Workout Sessions',
    caption: 'Kettlebells, battle ropes, plyo boxes, and functional pull-up rigs.',
    image: '/src/assets/images/program_hiit_crossfit_1795010314979.jpg',
    alt: 'Members training on functional turf with battle ropes and pull-up rig',
  },
  {
    id: 'gal-activity-1',
    title: 'Cardio & Endurance Line',
    category: 'Fitness Activities',
    caption: 'Commercial treadmills and indoor cycles for stamina and fat loss.',
    image: '/src/assets/images/program_cardio_machines_1795010315107.jpg',
    alt: 'Line of commercial treadmills and stationary bikes in the cardio wing',
  },
];

export interface GoogleReviewSnippet {
  id: string;
  quote: string;
  sourceLabel: string;
  rating: number;
}

export const GOOGLE_REVIEWS: GoogleReviewSnippet[] = [
  {
    id: 'rev-1',
    quote: 'Good place to workout ur body on muscle.',
    sourceLabel: 'Google Review · Cuddalore Member',
    rating: 5,
  },
  {
    id: 'rev-2',
    quote: 'Trainers were very helpful in finding my right workout procedures.',
    sourceLabel: 'Google Review · Cuddalore Member',
    rating: 5,
  },
  {
    id: 'rev-3',
    quote: 'Great Ambience, good energy.',
    sourceLabel: 'Google Review · Cuddalore Member',
    rating: 5,
  },
];
