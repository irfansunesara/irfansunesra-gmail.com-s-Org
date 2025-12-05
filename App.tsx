


import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { AppContext, defaultUserData } from './context/AppContext';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import AddonsScreen from './screens/AddonsScreen';
import BottomNav from './components/BottomNav';
import type { Screen, User, CycleData, LogData, ReminderSettings, PersonalizationSettings, PrivacySettings, Theme, ExerciseSettings, ExerciseLog, CyclePhaseInfo, SleepLog, HydrationSettings, HydrationLog, BbtLog, WeightSettings, WeightLog, Medication, MedicationLog, MedicationSettings, MedicationLogEntry, AppMode, PregnancyData, MenopauseData, SexualActivityLog, SelfCareLog, RelaxationLog, AIProfile, AIInsight, Recipe, UserData, AppState, MenopauseSymptomLog } from './types';
import { auth, db } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

// Hub Screens
import LogHubScreen from './screens/LogHubScreen';
import WellnessHubScreen from './screens/WellnessHubScreen';
import MoreHubScreen from './screens/MoreHubScreen';

// AI Imports
import { runWeeklyAnalysis, generateDailyInsight, generateRecipe as generateRecipeAI } from './ai/gemini';
import { summarizeUserDataForAI, parseAIProfileResponse } from './ai/ai-helpers';
import { format, toDate } from 'date-fns';


// All Feature Screens
import PmsInsightsMainScreen from './screens/pms/PmsInsightsMainScreen';
import PmsSymptomTrackerScreen from './screens/pms/PmsSymptomTrackerScreen';
import PmsPatternsScreen from './screens/pms/PmsPatternsScreen';
import PmsComfortTipsScreen from './screens/pms/PmsComfortTipsScreen';
import NutritionMainScreen from './screens/nutrition/NutritionMainScreen';
import PhaseNutritionScreen from './screens/nutrition/PhaseNutritionScreen';
import SymptomFoodsScreen from './screens/nutrition/SymptomFoodsScreen';
import CravingsSolutionsScreen from './screens/nutrition/CravingsSolutionsScreen';
import MealInspirationScreen from './screens/nutrition/MealInspirationScreen';
import FavoritesScreen from './screens/nutrition/FavoritesScreen';
import ExerciseMainScreen from './screens/exercise/ExerciseMainScreen';
import PhaseExerciseScreen from './screens/exercise/PhaseExerciseScreen';
import DailyMovementScreen from './screens/exercise/DailyMovementScreen';
import ExerciseLibraryScreen from './screens/exercise/ExerciseLibraryScreen';
import IntensityGuideScreen from './screens/exercise/IntensityGuideScreen';
import GoalsPreferencesScreen from './screens/exercise/GoalsPreferencesScreen';
import HistoryStreaksScreen from './screens/exercise/HistoryStreaksScreen';
import SleepMainScreen from './screens/sleep/SleepMainScreen';
import LogSleepScreen from './screens/sleep/LogSleepScreen';
import SleepTrendsScreen from './screens/sleep/SleepTrendsScreen';
import PhaseSleepInsightsScreen from './screens/sleep/PhaseSleepInsightsScreen';
import SleepTipsScreen from './screens/sleep/SleepTipsScreen';
import SleepHistoryScreen from './screens/sleep/SleepHistoryScreen';
import HydrationMainScreen from './screens/hydration/HydrationMainScreen';
import LogHydrationScreen from './screens/hydration/LogHydrationScreen';
import HydrationGoalsScreen from './screens/hydration/HydrationGoalsScreen';
import PhaseHydrationTipsScreen from './screens/hydration/PhaseHydrationTipsScreen';
import HydrationHistoryScreen from './screens/hydration/HydrationHistoryScreen';
import BbtMainScreen from './screens/bbt/BbtMainScreen';
import LogBbtScreen from './screens/bbt/LogBbtScreen';
import BbtGraphScreen from './screens/bbt/BbtGraphScreen';
import BbtInsightsScreen from './screens/bbt/BbtInsightsScreen';
import BbtTipsScreen from './screens/bbt/BbtTipsScreen';
import BbtHistoryScreen from './screens/bbt/BbtHistoryScreen';
import WeightMainScreen from './screens/weight/WeightMainScreen';
import LogWeightScreen from './screens/weight/LogWeightScreen';
import WeightGraphScreen from './screens/weight/WeightGraphScreen';
import WeightInsightsScreen from './screens/weight/WeightInsightsScreen';
import WeightHistoryScreen from './screens/weight/WeightHistoryScreen';
import MedicationMainScreen from './screens/medication/MedicationMainScreen';
import AddMedicationScreen from './screens/medication/AddMedicationScreen';
import TodaysScheduleScreen from './screens/medication/TodaysScheduleScreen';
import MedicationListScreen from './screens/medication/MedicationListScreen';
import MedicationGuidesScreen from './screens/medication/MedicationGuidesScreen';
import MedicationRemindersScreen from './screens/medication/MedicationRemindersScreen';
import MedicationHistoryScreen from './screens/medication/MedicationHistoryScreen';
import SymptomCorrelationMainScreen from './screens/symptom-correlation/SymptomCorrelationMainScreen';
import PhaseCorrelationScreen from './screens/symptom-correlation/PhaseCorrelationScreen';
import MoodCorrelationScreen from './screens/symptom-correlation/MoodCorrelationScreen';
import LifestyleCorrelationScreen from './screens/symptom-correlation/LifestyleCorrelationScreen';
import CycleHistoryMainScreen from './screens/cycle-history/CycleHistoryMainScreen';
import CycleTimelineScreen from './screens/cycle-history/CycleTimelineScreen';
import CycleReportsScreen from './screens/cycle-history/CycleReportsScreen';
import CycleLengthPatternsScreen from './screens/cycle-history/CycleLengthPatternsScreen';
import SymptomMoodTrendsScreen from './screens/cycle-history/SymptomMoodTrendsScreen';
import SelfCareMainScreen from './screens/self-care/SelfCareMainScreen';
import PhaseCareScreen from './screens/self-care/PhaseCareScreen';
import SymptomCareScreen from './screens/self-care/SymptomCareScreen';
import MoodSupportScreen from './screens/self-care/MoodSupportScreen';
import RitualsRoutinesScreen from './screens/self-care/RitualsRoutinesScreen';
import SelfCareFavoritesScreen from './screens/self-care/SelfCareFavoritesScreen';
import RelaxationMainScreen from './screens/relaxation/RelaxationMainScreen';
import BreathingScreen from './screens/relaxation/BreathingScreen';
import MeditationScreen from './screens/relaxation/MeditationScreen';
import SleepSoundsScreen from './screens/relaxation/SleepSoundsScreen';
import AffirmationsScreen from './screens/relaxation/AffirmationsScreen';
import StressCheckScreen from './screens/relaxation/StressCheckScreen';
import MoodResetScreen from './screens/relaxation/MoodResetScreen';
import RelaxationHistoryScreen from './screens/relaxation/RelaxationHistoryScreen';
import SexualWellnessEnableScreen from './screens/sexual-wellness/SexualWellnessEnableScreen';
import SexualWellnessMainScreen from './screens/sexual-wellness/SexualWellnessMainScreen';
import LibidoInsightsScreen from './screens/sexual-wellness/LibidoInsightsScreen';
import SexualHealthTipsScreen from './screens/sexual-wellness/SexualHealthTipsScreen';
import EmotionalIntimacyScreen from './screens/sexual-wellness/EmotionalIntimacyScreen';
import SafeDayAwarenessScreen from './screens/sexual-wellness/SafeDayAwarenessScreen';
import LogSexualActivityScreen from './screens/sexual-wellness/LogSexualActivityScreen';
import SexualWellnessHistoryScreen from './screens/sexual-wellness/SexualWellnessHistoryScreen';

// Pregnancy Mode Screens
import PregnancyEnableScreen from './screens/pregnancy/PregnancyEnableScreen';
import PregnancyMainScreen from './screens/pregnancy/PregnancyMainScreen';
import BabyDevelopmentScreen from './screens/pregnancy/BabyDevelopmentScreen';
import KickCounterScreen from './screens/pregnancy/KickCounterScreen';
import ContractionTimerScreen from './screens/pregnancy/ContractionTimerScreen';
import LogPregnancySymptomsScreen from './screens/pregnancy/LogPregnancySymptomsScreen';
import PregnancyBottomNav from './components/PregnancyBottomNav';

// Menopause Mode Screens
import MenopauseEnableScreen from './screens/menopause/MenopauseEnableScreen';
import MenopauseMainScreen from './screens/menopause/MenopauseMainScreen';
import { LogMenopauseSymptomsScreen } from './screens/menopause/LogMenopauseSymptomsScreen';
import MenopauseEducationScreen from './screens/menopause/MenopauseEducationScreen';
import MenopauseBottomNav from './components/MenopauseBottomNav';

// Settings Screens
import ProfileScreen from './screens/settings/ProfileScreen';
import CycleSettingsScreen from './screens/settings/CycleSettingsScreen';
import ReminderSettingsScreen from './screens/settings/ReminderSettingsScreen';
import PersonalizationScreen from './screens/settings/PersonalizationScreen';
import AppearanceScreen from './screens/settings/AppearanceScreen';
import AccessibilityScreen from './screens/settings/AccessibilityScreen';
import PrivacyScreen from './screens/settings/PrivacyScreen';
import DataControlScreen from './screens/settings/DataControlScreen';


// Keep original LogScreen for direct access from LogHub
import { LogScreen as LogSymptomsScreen } from './screens/LogScreen';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>({
        authStatus: 'loading',
        screen: 'Welcome',
        user: null,
        ...defaultUserData
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                
                const unsubFromDoc = onSnapshot(userDocRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data() as UserData;
                        // Convert Firestore Timestamps back to JS Dates
                        if (data.cycleData?.lastPeriodStart) {
                           data.cycleData.lastPeriodStart = (data.cycleData.lastPeriodStart as any).toDate();
                        }
                        if (data.pregnancyData?.dueDate) {
                            data.pregnancyData.dueDate = (data.pregnancyData.dueDate as any).toDate();
                        }
                         if (data.pregnancyData?.startDate) {
                            data.pregnancyData.startDate = (data.pregnancyData.startDate as any).toDate();
                        }
                        if (data.menopauseData?.startDate) {
                           data.menopauseData.startDate = (data.menopauseData.startDate as any).toDate();
                        }

                        setAppState(prev => ({
                            ...prev,
                            authStatus: data.cycleData ? 'authenticated' : 'onboarding',
                            screen: data.cycleData ? 'Home' : 'Onboarding',
                            user: { id: user.uid, name: user.displayName || 'User', email: user.email || '' },
                            ...data,
                        }));
                    } else {
                        setAppState(prev => ({
                            ...prev,
                            authStatus: 'onboarding',
                            screen: 'Onboarding',
                            user: { id: user.uid, name: user.displayName || 'User', email: user.email || '' },
                        }));
                    }
                });
                return () => unsubFromDoc();
            } else {
                setAppState({
                    authStatus: 'unauthenticated',
                    screen: 'Welcome',
                    user: null,
                    ...defaultUserData
                });
            }
        });

        return () => unsubscribe();
    }, []);
    
    const updateUserDoc = useCallback(async (data: Partial<UserData>) => {
        if (appState.user) {
            const userDocRef = doc(db, 'users', appState.user.id);
            try {
                await updateDoc(userDocRef, data);
            } catch (error) {
                console.error("Error updating user document:", error);
            }
        }
    }, [appState.user]);

    const setScreen = useCallback((screen: Screen) => setAppState(prev => ({ ...prev, screen })), []);
    const completeOnboarding = useCallback((cycleData: CycleData) => {
        updateUserDoc({ cycleData });
    }, [updateUserDoc]);
    const logout = useCallback(() => auth.signOut(), []);
    const login = useCallback((user: User) => {
        // This is handled by onAuthStateChanged, but the function is here to satisfy the context type.
    }, []);
    const updateCycleData = useCallback((data: Partial<CycleData>) => {
        if (appState.cycleData) {
            updateUserDoc({ cycleData: { ...appState.cycleData, ...data } });
        }
    }, [appState.cycleData, updateUserDoc]);
    const updateLogData = useCallback((date: string, data: Partial<LogData>) => {
        updateUserDoc({ [`logData.${date}`]: { ...(appState.logData[date] || {}), ...data } });
    }, [appState.logData, updateUserDoc]);
    const setSelectedLogDate = useCallback((date: Date | null) => setAppState(prev => ({...prev, selectedLogDate: date})), []);
    const setSelectedPhase = useCallback((phase: CyclePhaseInfo['phase'] | null) => setAppState(prev => ({ ...prev, selectedPhase: phase })), []);
    const updateReminderSettings = useCallback((settings: Partial<ReminderSettings>) => updateUserDoc({ reminderSettings: { ...appState.reminderSettings, ...settings } }), [appState.reminderSettings, updateUserDoc]);
    const updatePersonalizationSettings = useCallback((settings: Partial<PersonalizationSettings>) => updateUserDoc({ personalizationSettings: { ...appState.personalizationSettings, ...settings } }), [appState.personalizationSettings, updateUserDoc]);
    const updatePrivacySettings = useCallback((settings: Partial<PrivacySettings>) => updateUserDoc({ privacySettings: { ...appState.privacySettings, ...settings } }), [appState.privacySettings, updateUserDoc]);
    const setTheme = useCallback((theme: Theme) => updateUserDoc({ theme }), [updateUserDoc]);
    const toggleFavorite = useCallback((itemId: string) => updateUserDoc({ favorites: appState.favorites.includes(itemId) ? appState.favorites.filter(id => id !== itemId) : [...appState.favorites, itemId] }), [appState.favorites, updateUserDoc]);
    const updateExerciseSettings = useCallback((settings: Partial<ExerciseSettings>) => updateUserDoc({ exerciseSettings: { ...appState.exerciseSettings, ...settings } }), [appState.exerciseSettings, updateUserDoc]);
    const logExercise = useCallback((date: string, log: ExerciseLog) => updateUserDoc({ [`exerciseLog.${date}`]: log }), [updateUserDoc]);
    const logSleep = useCallback((date: string, log: SleepLog) => updateUserDoc({ [`sleepLog.${date}`]: log }), [updateUserDoc]);
    const updateHydrationSettings = useCallback((settings: Partial<HydrationSettings>) => updateUserDoc({ hydrationSettings: { ...appState.hydrationSettings, ...settings } }), [appState.hydrationSettings, updateUserDoc]);
    const logHydration = useCallback((date: string, amount: number) => { const existingAmount = appState.hydrationLog[date]?.amount || 0; updateUserDoc({ [`hydrationLog.${date}`]: { amount: existingAmount + amount } }); }, [appState.hydrationLog, updateUserDoc]);
    const logBbt = useCallback((date: string, log: BbtLog) => updateUserDoc({ [`bbtLog.${date}`]: log }), [updateUserDoc]);
    const updateWeightSettings = useCallback((settings: Partial<WeightSettings>) => updateUserDoc({ weightSettings: { ...appState.weightSettings, ...settings } }), [appState.weightSettings, updateUserDoc]);
    const logWeight = useCallback((date: string, log: WeightLog) => updateUserDoc({ [`weightLog.${date}`]: log }), [updateUserDoc]);
    const addMedication = useCallback((med: Medication) => updateUserDoc({ medications: [...appState.medications, med] }), [appState.medications, updateUserDoc]);
    const updateMedication = useCallback((med: Medication) => updateUserDoc({ medications: appState.medications.map(m => m.id === med.id ? med : m) }), [appState.medications, updateUserDoc]);
    const deleteMedication = useCallback((medId: string) => updateUserDoc({ medications: appState.medications.filter(m => m.id !== medId) }), [appState.medications, updateUserDoc]);
    const logMedication = useCallback((dateKey: string, medId: string, timeKey: string, entry: MedicationLogEntry) => updateUserDoc({ [`medicationLog.${dateKey}.${medId}.${timeKey}`]: entry }), [updateUserDoc]);
    const updateMedicationSettings = useCallback((settings: Partial<MedicationSettings>) => updateUserDoc({ medicationSettings: { ...appState.medicationSettings, ...settings } }), [appState.medicationSettings, updateUserDoc]);
    const logSelfCare = useCallback((date: string, log: SelfCareLog) => updateUserDoc({[`selfCareLog.${date}`]: log}), [updateUserDoc]);
    const logRelaxation = useCallback((date: string, log: RelaxationLog) => updateUserDoc({ [`relaxationLog.${date}`]: [...(appState.relaxationLog[date] || []), log] }), [appState.relaxationLog, updateUserDoc]);
    const logSexualActivity = useCallback((date: string, log: SexualActivityLog) => updateUserDoc({ [`sexualActivityLog.${date}`]: log }), [updateUserDoc]);
    const setAppMode = useCallback((mode: AppMode) => updateUserDoc({ appMode: mode }), [updateUserDoc]);
    const enterPregnancyMode = useCallback((data: PregnancyData) => updateUserDoc({ appMode: 'Pregnancy', pregnancyData: data }), [updateUserDoc]);
    const enterMenopauseMode = useCallback((data: MenopauseData) => updateUserDoc({ appMode: 'Menopause', menopauseData: data }), [updateUserDoc]);
    const logMenopauseSymptom = useCallback((date: string, log: MenopauseSymptomLog) => updateUserDoc({ [`menopauseSymptomLog.${date}`]: log }), [updateUserDoc]);
    
    // AI functions
    const runDailyAIJob = useCallback(async () => {
        console.log("Running daily AI job...");
        const todayKey = format(new Date(), 'yyyy-MM-dd');
        const hasInsightForToday = appState.aiInsights.some(insight => insight.date === todayKey);
        if (hasInsightForToday) {
            console.log("Insight for today already exists.");
            return;
        }
        const insightText = await generateDailyInsight(appState);
        if (insightText) {
            const newInsight: AIInsight = {
                id: `insight_${Date.now()}`,
                text: insightText,
                type: 'wellness',
                date: todayKey,
            };
            updateUserDoc({ aiInsights: [...appState.aiInsights, newInsight] });
        }
    }, [appState, updateUserDoc]);

    const runWeeklyAIJob = useCallback(async () => {
        console.log("Running weekly AI analysis...");
        const summary = summarizeUserDataForAI(appState);
        const aiResponse = await runWeeklyAnalysis(summary);
        const newProfile = parseAIProfileResponse(aiResponse);
        if (newProfile) {
            updateUserDoc({ aiProfile: newProfile });
            alert("AI Profile updated successfully!");
        } else {
            alert("Failed to update AI profile from analysis.");
        }
    }, [appState, updateUserDoc]);

    const generateRecipe = useCallback(async (food: string, phase: string) => {
        setAppState(prev => ({...prev, isGeneratingRecipe: true, recipeError: null}));
        try {
            const recipeJson = await generateRecipeAI(food, phase);
            const recipeData: Recipe = JSON.parse(recipeJson);
            setAppState(prev => ({...prev, recipe: recipeData, isGeneratingRecipe: false}));
        } catch (error) {
            setAppState(prev => ({...prev, isGeneratingRecipe: false, recipeError: "Could not generate recipe."}));
        }
    }, []);
    
    // Run daily job on app load
     useEffect(() => {
        if(appState.authStatus === 'authenticated') {
            runDailyAIJob();
        }
    }, [appState.authStatus, runDailyAIJob]);

    const appContextValue = useMemo(() => ({
        ...appState,
        setScreen,
        login,
        completeOnboarding,
        logout,
        updateCycleData,
        updateLogData,
        setSelectedLogDate,
        setSelectedPhase,
        updateReminderSettings,
        updatePersonalizationSettings,
        updatePrivacySettings,
        setTheme,
        toggleFavorite,
        updateExerciseSettings,
        logExercise,
        logSleep,
        updateHydrationSettings,
        logHydration,
        logBbt,
        updateWeightSettings,
        logWeight,
        addMedication,
        updateMedication,
        deleteMedication,
        logMedication,
        updateMedicationSettings,
        logSelfCare,
        logRelaxation,
        logSexualActivity,
        setAppMode,
        enterPregnancyMode,
        enterMenopauseMode,
        runWeeklyAIJob,
        runDailyAIJob,
        generateRecipe,
        logMenopauseSymptom
    }), [appState, setScreen, login, completeOnboarding, logout, updateCycleData, updateLogData, setSelectedLogDate, setSelectedPhase, updateReminderSettings, updatePersonalizationSettings, updatePrivacySettings, setTheme, toggleFavorite, updateExerciseSettings, logExercise, logSleep, updateHydrationSettings, logHydration, logBbt, updateWeightSettings, logWeight, addMedication, updateMedication, deleteMedication, logMedication, updateMedicationSettings, logSelfCare, logRelaxation, logSexualActivity, setAppMode, enterPregnancyMode, enterMenopauseMode, runWeeklyAIJob, runDailyAIJob, generateRecipe, logMenopauseSymptom]);

    const renderScreen = () => {
        const { authStatus, screen } = appState;

        if (authStatus === 'loading') {
            return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
        }

        if (authStatus === 'unauthenticated') {
            switch (screen) {
                case 'SignUp': return <SignUpScreen />;
                case 'Login': return <LoginScreen />;
                case 'ForgotPassword': return <ForgotPasswordScreen />;
                default: return <WelcomeScreen />;
            }
        }
        if (authStatus === 'onboarding') return <OnboardingScreen />;
        if (authStatus === 'authenticated') {
            switch (screen) {
                case 'Home': return <HomeScreen />;
                case 'Calendar': return <CalendarScreen />;
                case 'LogHub': return <LogHubScreen />;
                case 'WellnessHub': return <WellnessHubScreen />;
                case 'MoreHub': return <MoreHubScreen />;
                case 'Addons': return <AddonsScreen />;
                case 'Log': return <LogSymptomsScreen />;
                
                // All Feature Screens
                case 'PmsInsightsMain': return <PmsInsightsMainScreen />;
                case 'PmsSymptomTracker': return <PmsSymptomTrackerScreen />;
                case 'PmsPatterns': return <PmsPatternsScreen />;
                case 'PmsComfortTips': return <PmsComfortTipsScreen />;
                case 'NutritionMain': return <NutritionMainScreen />;
                case 'PhaseNutrition': return <PhaseNutritionScreen />;
                case 'SymptomFoods': return <SymptomFoodsScreen />;
                case 'CravingsSolutions': return <CravingsSolutionsScreen />;
                case 'MealInspiration': return <MealInspirationScreen />;
                case 'Favorites': return <FavoritesScreen />;
                case 'ExerciseMain': return <ExerciseMainScreen />;
                case 'PhaseExercise': return <PhaseExerciseScreen />;
                case 'DailyMovement': return <DailyMovementScreen />;
                case 'ExerciseLibrary': return <ExerciseLibraryScreen />;
                case 'IntensityGuide': return <IntensityGuideScreen />;
                case 'GoalsPreferences': return <GoalsPreferencesScreen />;
                case 'HistoryStreaks': return <HistoryStreaksScreen />;
                case 'SleepMain': return <SleepMainScreen />;
                case 'LogSleep': return <LogSleepScreen />;
                case 'SleepTrends': return <SleepTrendsScreen />;
                case 'PhaseSleepInsights': return <PhaseSleepInsightsScreen />;
                case 'SleepTips': return <SleepTipsScreen />;
                case 'SleepHistory': return <SleepHistoryScreen />;
                case 'HydrationMain': return <HydrationMainScreen />;
                case 'LogHydration': return <LogHydrationScreen />;
                case 'HydrationGoals': return <HydrationGoalsScreen />;
                case 'PhaseHydrationTips': return <PhaseHydrationTipsScreen />;
                case 'HydrationHistory': return <HydrationHistoryScreen />;
                case 'BbtMain': return <BbtMainScreen />;
                case 'LogBbt': return <LogBbtScreen />;
                case 'BbtGraph': return <BbtGraphScreen />;
                case 'BbtInsights': return <BbtInsightsScreen />;
                case 'BbtTips': return <BbtTipsScreen />;
                case 'BbtHistory': return <BbtHistoryScreen />;
                case 'WeightMain': return <WeightMainScreen />;
                case 'LogWeight': return <LogWeightScreen />;
                case 'WeightGraph': return <WeightGraphScreen />;
                case 'WeightInsights': return <WeightInsightsScreen />;
                case 'WeightHistory': return <WeightHistoryScreen />;
                case 'MedicationMain': return <MedicationMainScreen />;
                case 'AddMedication': return <AddMedicationScreen />;
                case 'TodaysSchedule': return <TodaysScheduleScreen />;
                case 'MedicationList': return <MedicationListScreen />;
                case 'MedicationGuides': return <MedicationGuidesScreen />;
                case 'MedicationReminders': return <MedicationRemindersScreen />;
                case 'MedicationHistory': return <MedicationHistoryScreen />;
                case 'SymptomCorrelationMain': return <SymptomCorrelationMainScreen />;
                case 'PhaseCorrelation': return <PhaseCorrelationScreen />;
                case 'MoodCorrelation': return <MoodCorrelationScreen />;
                case 'LifestyleCorrelation': return <LifestyleCorrelationScreen />;
                case 'CycleHistoryMain': return <CycleHistoryMainScreen />;
                case 'CycleTimeline': return <CycleTimelineScreen />;
                case 'CycleReports': return <CycleReportsScreen />;
                case 'CycleLengthPatterns': return <CycleLengthPatternsScreen />;
                case 'SymptomMoodTrends': return <SymptomMoodTrendsScreen />;
                case 'SelfCareMain': return <SelfCareMainScreen />;
                case 'PhaseCare': return <PhaseCareScreen />;
                case 'SymptomCare': return <SymptomCareScreen />;
                case 'MoodSupport': return <MoodSupportScreen />;
                case 'RitualsRoutines': return <RitualsRoutinesScreen />;
                case 'SelfCareFavorites': return <SelfCareFavoritesScreen />;
                case 'RelaxationMain': return <RelaxationMainScreen />;
                case 'Breathing': return <BreathingScreen />;
                case 'Meditation': return <MeditationScreen />;
                case 'SleepSounds': return <SleepSoundsScreen />;
                case 'Affirmations': return <AffirmationsScreen />;
                case 'StressCheck': return <StressCheckScreen />;
                case 'MoodReset': return <MoodResetScreen />;
                case 'RelaxationHistory': return <RelaxationHistoryScreen />;
                case 'SexualWellnessEnable': return <SexualWellnessEnableScreen />;
                case 'SexualWellnessMain': return <SexualWellnessMainScreen />;
                case 'LibidoInsights': return <LibidoInsightsScreen />;
                case 'SexualHealthTips': return <SexualHealthTipsScreen />;
                case 'EmotionalIntimacy': return <EmotionalIntimacyScreen />;
                case 'SafeDayAwareness': return <SafeDayAwarenessScreen />;
                case 'LogSexualActivity': return <LogSexualActivityScreen />;
                case 'SexualWellnessHistory': return <SexualWellnessHistoryScreen />;
                case 'PregnancyEnable': return <PregnancyEnableScreen />;
                case 'PregnancyMain': return <PregnancyMainScreen />;
                case 'BabyDevelopment': return <BabyDevelopmentScreen />;
                case 'KickCounter': return <KickCounterScreen />;
                case 'ContractionTimer': return <ContractionTimerScreen />;
                case 'LogPregnancySymptoms': return <LogPregnancySymptomsScreen />;
                case 'MenopauseEnable': return <MenopauseEnableScreen />;
                case 'MenopauseMain': return <MenopauseMainScreen />;
                case 'LogMenopauseSymptoms': return <LogMenopauseSymptomsScreen />;
                case 'MenopauseEducation': return <MenopauseEducationScreen />;
                
                // Settings Screens
                case 'Profile': return <ProfileScreen />;
                case 'CycleSettings': return <CycleSettingsScreen />;
                case 'ReminderSettings': return <ReminderSettingsScreen />;
                case 'Personalization': return <PersonalizationScreen />;
                case 'Appearance': return <AppearanceScreen />;
                case 'Accessibility': return <AccessibilityScreen />;
                case 'Privacy': return <PrivacyScreen />;
                case 'DataControl': return <DataControlScreen />;

                default: return <HomeScreen />;
            }
        }
        return null;
    };

    const mainScreens = ['Home', 'Calendar', 'LogHub', 'WellnessHub', 'MoreHub'];
    const isBottomNavVisible = appState.authStatus === 'authenticated' && (
      mainScreens.includes(appState.screen) ||
      (appState.appMode === 'Pregnancy' && (appState.screen === 'Home' || mainScreens.includes(appState.screen))) ||
      (appState.appMode === 'Menopause' && (appState.screen === 'Home' || mainScreens.includes(appState.screen)))
    );

    const paddingBottomClass = useMemo(() => {
        if (appState.appMode === 'Pregnancy') return isBottomNavVisible ? 'pb-24' : '';
        if (appState.appMode === 'Menopause') return isBottomNavVisible ? 'pb-24' : '';
        return isBottomNavVisible ? 'pb-20' : '';
    }, [appState.appMode, isBottomNavVisible]);

    const renderBottomNav = () => {
        if (!isBottomNavVisible) return null;
        switch (appState.appMode) {
            case 'Pregnancy': return <PregnancyBottomNav />;
            case 'Menopause': return <MenopauseBottomNav />;
            case 'Cycle':
            default: return <BottomNav />;
        }
    };

    return (
        <AppContext.Provider value={appContextValue}>
            <div 
                className={`h-screen w-screen font-sans flex flex-col transition-colors duration-500 ${appContextValue.personalizationSettings.reduceMotion ? 'reduce-motion' : ''}`}
                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
                data-theme={appContextValue.theme}
            >
                <main key={`${appState.appMode}-${appState.screen}`} className={`flex-grow overflow-y-auto animate-screen-in ${paddingBottomClass}`}>
                    {renderScreen()}
                </main>
                {renderBottomNav()}
            </div>
        </AppContext.Provider>
    );
};

export default App;
