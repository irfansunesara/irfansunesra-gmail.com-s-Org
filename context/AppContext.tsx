import { createContext } from 'react';
import type { 
    Screen, AuthStatus, User, CycleData, LogData, ReminderSettings, 
    PersonalizationSettings, PrivacySettings, Theme, ExerciseSettings, 
    ExerciseLog, CyclePhaseInfo, SleepLog, HydrationSettings, HydrationLog, 
    BbtLog, WeightSettings, WeightLog, Medication, MedicationLog, 
    MedicationSettings, MedicationLogEntry, AppMode, PregnancyData, MenopauseData, 
    SexualActivityLog, SelfCareLog, RelaxationLog, PregnancySymptom, KickLog, 
    ContractionLog, MenopauseSymptom, HotFlashLog, AIProfile, AIInsight, Recipe,
    // FIX: Import UserData and AppState to be used in this module.
// FIX: Added MenopauseSymptomLog to imports.
    UserData, AppState, MenopauseSymptomLog
} from '../types';

// FIX: Moved default user data here to be accessible by other modules without circular dependencies.
const defaultReminderSettings: ReminderSettings = {
    periodReminder: true, periodReminderDays: 2, periodStart: true, fertileWindow: true, ovulation: false, pmsWindowReminder: true,
    dailyWellness: false, wellnessTime: '09:00', logSymptom: false, logMood: false,
    bedtimeReminder: true, bedtimeReminderTime: '22:00',
    wakeUpReminder: false, wakeUpReminderTime: '07:00', bbtReminder: true, bbtReminderTime: '06:00', relaxationReminder: false, relaxationTime: '12:00',
    noteReminder: false, noteReminderTime: '20:00',
};
const defaultPersonalizationSettings: PersonalizationSettings = { showEmojis: true, dailyQuotes: true, phaseInsights: true, sexualHealthTips: false, toneStyle: 'Friendly', reduceMotion: false };
const defaultPrivacySettings: PrivacySettings = { faceIdEnabled: false, privateMode: false, hideFlowLevel: false, hideSexualHealth: false, lockMedicationTracker: false, hideMedicationNames: false, sexualWellnessEnabled: false, hideSensitiveTerms: false };
const defaultExerciseSettings: ExerciseSettings = { weeklyGoal: 3, preferredTypes: ['Yoga', 'Walking'], reminder: true, reminderTime: '17:00' };
const defaultHydrationSettings: HydrationSettings = { dailyGoal: 2000, unit: 'ml', reminder: true, reminderFrequency: 2 };
const defaultWeightSettings: WeightSettings = { unit: 'lbs', showBmi: false, reminder: true, reminderTime: '08:00' };
const defaultMedicationSettings: MedicationSettings = { refillReminders: true };

export const defaultUserData: UserData = {
    appMode: 'Cycle',
    cycleData: null,
    pregnancyData: null,
    menopauseData: null,
    logData: {},
    selectedLogDate: null,
    selectedPhase: null,
    reminderSettings: defaultReminderSettings,
    personalizationSettings: defaultPersonalizationSettings,
    privacySettings: defaultPrivacySettings,
    theme: 'Pastel' as Theme,
    favorites: [],
    exerciseSettings: defaultExerciseSettings,
    exerciseLog: {},
    sleepLog: {},
    hydrationSettings: defaultHydrationSettings,
    hydrationLog: {},
    bbtLog: {},
    weightSettings: defaultWeightSettings,
    weightLog: {},
    medications: [],
    medicationLog: {},
    medicationSettings: defaultMedicationSettings,
    sexualActivityLog: {},
    selfCareLog: {},
    relaxationLog: {},
    pregnancySymptomLog: {},
    kickLog: {},
    contractionLog: {},
    menopauseSymptomLog: {},
    hotFlashLog: {},
    aiProfile: null,
    aiInsights: [],
    recipe: null,
    isGeneratingRecipe: false,
    recipeError: null,
};


export interface AppContextType extends AppState {
  setScreen: (screen: Screen) => void;
  login: (user: User) => void;
  completeOnboarding: (cycleData: CycleData) => void;
  logout: () => void;
  updateCycleData: (cycleData: Partial<CycleData>) => void;
  updateLogData: (date: string, data: Partial<LogData>) => void;
  setSelectedLogDate: (date: Date | null) => void;
  setSelectedPhase: (phase: CyclePhaseInfo['phase'] | null) => void;
  updateReminderSettings: (settings: Partial<ReminderSettings>) => void;
  updatePersonalizationSettings: (settings: Partial<PersonalizationSettings>) => void;
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => void;
  setTheme: (theme: Theme) => void;
  toggleFavorite: (itemId: string) => void;
  updateExerciseSettings: (settings: Partial<ExerciseSettings>) => void;
  logExercise: (date: string, log: ExerciseLog) => void;
  logSleep: (date: string, log: SleepLog) => void;
  updateHydrationSettings: (settings: Partial<HydrationSettings>) => void;
  logHydration: (date: string, amount: number) => void;
  logBbt: (date: string, log: BbtLog) => void;
  updateWeightSettings: (settings: Partial<WeightSettings>) => void;
  logWeight: (date: string, log: WeightLog) => void;
  addMedication: (med: Medication) => void;
  updateMedication: (med: Medication) => void;
  deleteMedication: (medId: string) => void;
  logMedication: (dateKey: string, medId: string, timeKey: string, entry: MedicationLogEntry) => void;
  updateMedicationSettings: (settings: Partial<MedicationSettings>) => void;
  logSelfCare: (date: string, log: SelfCareLog) => void;
  logRelaxation: (date: string, log: RelaxationLog) => void;
  logSexualActivity: (date: string, log: SexualActivityLog) => void;
  // Mode Switching
  setAppMode: (mode: AppMode) => void;
  enterPregnancyMode: (data: PregnancyData) => void;
  enterMenopauseMode: (data: MenopauseData) => void;
  // AI Functions
  runWeeklyAIJob: () => Promise<void>;
  runDailyAIJob: () => Promise<void>;
  generateRecipe: (food: string, phase: string) => Promise<void>;
// FIX: Added 'logMenopauseSymptom' to the context type definition.
  logMenopauseSymptom: (date: string, log: MenopauseSymptomLog) => void;
}

export const AppContext = createContext<AppContextType | null>(null);