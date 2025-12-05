

export type AppMode = 'Cycle' | 'Pregnancy' | 'Menopause';

export type Screen = 'Welcome' | 'SignUp' | 'Login' | 'ForgotPassword' | 'Onboarding' 
| 'Home' | 'Calendar' | 'LogHub' | 'WellnessHub' | 'MoreHub'
| 'Log' // To be renamed/refactored but keep for now
| 'Profile' | 'Addons' 
| 'PmsInsightsMain' | 'PmsSymptomTracker' | 'PmsPatterns' | 'PmsComfortTips'
| 'NutritionMain' | 'PhaseNutrition' | 'SymptomFoods' | 'CravingsSolutions' | 'MealInspiration' | 'Favorites'
| 'ExerciseMain' | 'PhaseExercise' | 'DailyMovement' | 'ExerciseLibrary' | 'IntensityGuide' | 'GoalsPreferences' | 'HistoryStreaks'
| 'SleepMain' | 'LogSleep' | 'SleepTrends' | 'PhaseSleepInsights' | 'SleepTips' | 'SleepHistory'
| 'HydrationMain' | 'LogHydration' | 'HydrationGoals' | 'PhaseHydrationTips' | 'HydrationHistory'
| 'BbtMain' | 'LogBbt' | 'BbtGraph' | 'BbtInsights' | 'BbtTips' | 'BbtHistory'
| 'WeightMain' | 'LogWeight' | 'WeightGraph' | 'WeightInsights' | 'WeightHistory'
| 'MedicationMain' | 'AddMedication' | 'TodaysSchedule' | 'MedicationList' | 'MedicationGuides' | 'MedicationReminders' | 'MedicationHistory'
| 'SymptomCorrelationMain' | 'PhaseCorrelation' | 'MoodCorrelation' | 'LifestyleCorrelation'
| 'CycleHistoryMain' | 'CycleTimeline' | 'CycleReports' | 'CycleLengthPatterns' | 'SymptomMoodTrends'
| 'SelfCareMain' | 'PhaseCare' | 'SymptomCare' | 'MoodSupport' | 'RitualsRoutines' | 'SelfCareFavorites'
| 'RelaxationMain' | 'Breathing' | 'Meditation' | 'SleepSounds' | 'Affirmations' | 'StressCheck' | 'MoodReset' | 'RelaxationHistory'
| 'SexualWellnessEnable' | 'SexualWellnessMain' | 'LibidoInsights' | 'SexualHealthTips' | 'EmotionalIntimacy' | 'SafeDayAwareness' | 'LogSexualActivity' | 'SexualWellnessHistory'
| 'PregnancyEnable' | 'PregnancyMain' | 'BabyDevelopment' | 'KickCounter' | 'ContractionTimer' | 'LogPregnancySymptoms'
| 'MenopauseEnable' | 'MenopauseMain' | 'LogMenopauseSymptoms' | 'MenopauseEducation'
| 'CycleSettings' | 'ReminderSettings' | 'Personalization' | 'Appearance' | 'Accessibility' | 'Privacy' | 'DataControl'
;

export type AuthStatus = 'unauthenticated' | 'onboarding' | 'authenticated' | 'loading';

export interface User {
  id: string; // Firebase UID
  name: string;
  email: string;
}

export type CycleRegularity = 'Regular' | 'Somewhat Regular' | 'Irregular';
export type FlowLevel = 'Light' | 'Medium' | 'Heavy';

export interface CycleData {
  lastPeriodStart: Date;
  periodLength: number;
  cycleLength: number;
  regularity: CycleRegularity;
  flowLevel: FlowLevel;
}

export type Mood = 'Great' | 'Good' | 'Okay' | 'Crampy' | 'Emotional' | 'Tired' | 'Irritated' | 'Loving' | 'Calm' | 'Stressed';
export type EnergyLevel = 'Low' | 'Medium' | 'High';

export type Symptom = 
    // Physical
    'Cramps' | 'Bloating' | 'Headache' | 'Back pain' | 'Acne' | 'Fatigue' | 
    'Tender breasts' | 'Nausea' | 'Joint Pain' | 'Insomnia' |
    // Emotional
    'Anxiety' | 'Mood Swings' | 'Irritability' | 'Low Mood';
    
export type PmsSymptom =
    // Physical
    'PMS Cramps' | 'PMS Back Pain' | 'PMS Bloating' | 'PMS Acne' | 'PMS Fatigue' | 'PMS Headache' | 'Water Retention' |
    // Emotional
    'PMS Irritability' | 'PMS Anxiety' | 'Sadness' | 'Crying Spells' | 'PMS Mood Swings' | 'Sensitivity' | 'Low Patience';

export type Craving = 'Sweet' | 'Salty' | 'Chocolate' | 'Carbs' | 'Fruits';

export interface SymptomDetail {
    severity: number; // 1-5
    note?: string;
}

export interface LogData {
    mood?: Mood;
    symptoms?: Symptom[];
    symptomDetails?: Record<string, SymptomDetail>;
    pmsSymptoms?: PmsSymptom[];
    energy?: EnergyLevel;
    cravings?: Craving[];
    note?: string;
    period?: 'start' | 'flow' | 'end' | null;
}

export type SleepQuality = 'Excellent' | 'Good' | 'Okay' | 'Poor' | 'Very Poor';

export interface SleepLog {
    bedtime: string; // "HH:mm"
    wakeTime: string; // "HH:mm"
    totalHours: number;
    quality: SleepQuality;
    notes?: string;
}

export interface HydrationSettings {
    dailyGoal: number; // in ml
    unit: 'ml' | 'oz' | 'cups';
    reminder: boolean;
    reminderFrequency: number; // in hours
}

export interface HydrationLog {
    amount: number; // in ml
}

export interface BbtLog {
    temp: number;
    unit: 'C' | 'F';
    time: string; // "HH:mm"
    notes?: string[];
}

export interface WeightSettings {
    unit: 'kg' | 'lbs';
    showBmi: boolean;
    reminder: boolean;
    reminderTime: string;
}

export interface WeightLog {
    weight: number;
    unit: 'kg' | 'lbs';
    notes?: string[];
}

export interface SexualActivityLog {
    comfortLevel: number; // 1-5
    emotionalFeeling: string;
    notes?: string;
}


export interface CyclePhaseInfo {
  phase: 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';
  startDay: number;
  endDay: number;
}

export interface ReminderSettings {
  periodReminder: boolean;
  periodReminderDays: number; // 1-5
  periodStart: boolean;
  fertileWindow: boolean;
  ovulation: boolean;
  pmsWindowReminder: boolean;
  dailyWellness: boolean;
  wellnessTime: string; // e.g., "09:00"
  logSymptom: boolean;
  logMood: boolean;
  bedtimeReminder: boolean;
  bedtimeReminderTime: string;
  wakeUpReminder: boolean;
  wakeUpReminderTime: string;
  bbtReminder: boolean;
  bbtReminderTime: string;
  relaxationReminder: boolean;
  relaxationTime: string;
  noteReminder: boolean;
  noteReminderTime: string;
}

export type ToneStyle = 'Gentle' | 'Friendly' | 'Spiritual' | 'Scientific';

export interface PersonalizationSettings {
    showEmojis: boolean;
    dailyQuotes: boolean;
    phaseInsights: boolean;
    sexualHealthTips: boolean;
    toneStyle: ToneStyle;
    reduceMotion: boolean;
}

export interface PrivacySettings {
    faceIdEnabled: boolean;
    privateMode: boolean;
    hideFlowLevel: boolean;
    hideSexualHealth: boolean;
    lockMedicationTracker: boolean;
    hideMedicationNames: boolean;
    sexualWellnessEnabled: boolean;
    hideSensitiveTerms: boolean;
}

export type Theme = 'Pastel' | 'Blossom' | 'Mint Calm' | 'Moonlight' | 'Minimal White';

export type ExerciseType = 'Yoga' | 'Stretching' | 'Cardio' | 'Strength' | 'Pilates' | 'Walking' | 'HIIT' | 'Core' | 'Breathwork';
export type ExerciseIntensity = 'Very Gentle' | 'Gentle' | 'Balanced' | 'Strong';

export interface ExerciseSettings {
    weeklyGoal: number; // e.g., 3 times a week
    preferredTypes: ExerciseType[];
    reminder: boolean;
    reminderTime: string; // e.g., "17:00"
}

export interface ExerciseLog {
    type: ExerciseType;
    duration: number; // in minutes
    intensity: ExerciseIntensity;
}

// Medication Tracker Types
export type MedicationType = 'Pill' | 'Supplement' | 'Hormone' | 'Vitamin' | 'Injection' | 'Cream';
export type MedicationScheduleType = 'Daily' | 'Weekly' | 'As Needed' | 'Cycle-Based';

export interface Medication {
    id: string; // unique id
    name: string;
    type: MedicationType;
    dosage: string; // e.g., "50mg", "1 tablet"
    schedule: MedicationScheduleType;
    times: string[]; // array of "HH:mm" for daily schedules
    purpose: string;
    notes?: string;
    quantity?: number;
    refillDate?: string; // "yyyy-MM-dd"
}

export interface MedicationLogEntry {
    status: 'taken' | 'skipped';
    loggedAt: string; // ISO string
}

export interface MedicationLog {
    // dateKey -> medicationId -> timeKey -> status
    [dateKey: string]: {
        [medicationId: string]: {
            [timeKey: string]: MedicationLogEntry;
        }
    }
}

export interface MedicationSettings {
    refillReminders: boolean;
}

// History Types
export interface PastCycle {
    cycleNumber: number;
    startDate: Date;
    endDate: Date;
    length: number;
    periodLength: number;
    ovulationDay?: number;
    topSymptoms: string[];
}

// Self-Care Types
export interface SelfCareLog {
    activityId: string;
    completedAt: string; // ISO Date
    feeling?: 'Better' | 'Same' | 'Worse';
}

// Relaxation Types
export interface RelaxationLog {
    type: 'Breathing' | 'Meditation' | 'Sound';
    duration: number; // in minutes
    completedAt: string; // ISO Date
}

// Pregnancy Mode Types
export interface PregnancyData {
    dueDate: Date;
    startDate: Date; // LMP or calculated
}
export type PregnancySymptom = 'Nausea' | 'Fatigue' | 'Swelling' | 'Back Pain';
export interface KickLog {
    startTime: string; // ISO
    endTime: string; // ISO
    count: number;
}
export interface ContractionLog {
    startTime: string; // ISO
    duration: number; // seconds
    interval: number; // seconds since last one
}

// Menopause Mode Types
export type MenopauseStage = 'Perimenopause' | 'Menopause' | 'Postmenopause';
export interface MenopauseData {
    stage: MenopauseStage;
    startDate: Date;
}

export interface MenopauseSymptomDetail {
    severity: number;
    note?: string;
}
export interface MenopauseSymptomLog {
    symptoms: MenopauseSymptom[];
    symptomDetails: Record<string, MenopauseSymptomDetail>;
    intensity: number;
}
export type MenopauseSymptom = 'Hot Flash' | 'Night Sweat' | 'Insomnia' | 'Joint Pain' | 'Brain Fog';
export interface HotFlashLog {
    time: string; // "HH:mm"
    intensity: 'Mild' | 'Medium' | 'Strong';
    trigger?: string;
}

// Recipe Type
export interface Recipe {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    prepTime: string;
}

// AI Types
export interface AIProfile {
    cycleAnalysis: {
        avgCycleLength: number;
        avgPeriodLength: number;
        pmsWindowDays: number;
        ovulationDay: number;
        irregularitySigns: string;
        cycleLengthVariance?: number; // The +/- days for prediction window
    };
    symptomPatterns: {
        symptom: string;
        phase: string;
        correlation: string;
    }[];
    lifestyleInsights: string[];
    lastUpdated: string; // ISO Date string
}


export interface AIInsight {
    id: string;
    text: string;
    type: 'cycle' | 'wellness' | 'pattern' | 'self-care';
    date: string; // yyyy-MM-dd
}

// This is the shape of the data stored in Firestore for each user.
// It combines all settings, logs, etc. into one document.
export interface UserData extends Omit<AppState, 'authStatus' | 'screen' | 'user'> {
    // AppState fields are used here. We omit the transient UI state.
}


export interface AppState {
    authStatus: AuthStatus;
    screen: Screen;
    appMode: AppMode;
    user: User | null;
    cycleData: CycleData | null;
    pregnancyData: PregnancyData | null;
    menopauseData: MenopauseData | null;
    logData: Record<string, LogData>;
    selectedLogDate: Date | null;
    selectedPhase: CyclePhaseInfo['phase'] | null;
    reminderSettings: ReminderSettings;
    personalizationSettings: PersonalizationSettings;
    privacySettings: PrivacySettings;
    theme: Theme;
    favorites: string[];
    exerciseSettings: ExerciseSettings;
    exerciseLog: Record<string, ExerciseLog>;
    sleepLog: Record<string, SleepLog>;
    hydrationSettings: HydrationSettings;
    hydrationLog: Record<string, HydrationLog>;
    bbtLog: Record<string, BbtLog>;
    weightSettings: WeightSettings;
    weightLog: Record<string, WeightLog>;
    medications: Medication[];
    medicationLog: MedicationLog;
    medicationSettings: MedicationSettings;
    sexualActivityLog: Record<string, SexualActivityLog>;
    selfCareLog: Record<string, SelfCareLog>;
    relaxationLog: Record<string, RelaxationLog[]>;
    // Pregnancy Logs
    pregnancySymptomLog: Record<string, PregnancySymptom[]>;
    kickLog: Record<string, KickLog[]>;
    contractionLog: Record<string, ContractionLog[]>;
    // Menopause Logs
    menopauseSymptomLog: Record<string, MenopauseSymptomLog>;
    hotFlashLog: Record<string, HotFlashLog[]>;
    // AI Data
    aiProfile: AIProfile | null;
    aiInsights: AIInsight[];
    recipe: Recipe | null;
    isGeneratingRecipe: boolean;
    recipeError: string | null;
}