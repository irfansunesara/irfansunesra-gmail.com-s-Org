import React from 'react';
// FIX: Added missing types for new constants.
import type { Symptom, Mood, EnergyLevel, Craving, PmsSymptom, SleepQuality, MedicationType, PregnancySymptom, MenopauseSymptom } from './types';

export const MOODS: { emoji: string; label: Mood }[] = [
    { emoji: '😊', label: 'Great' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '😣', label: 'Crampy' },
    { emoji: '😢', label: 'Emotional' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😕', label: 'Irritated' },
    { emoji: '😍', label: 'Loving' },
    { emoji: '🧘‍♀️', label: 'Calm' },
    { emoji: '💥', label: 'Stressed' }
];

export const SYMPTOMS: { category: string; items: Symptom[] }[] = [
    {
        category: 'Physical',
        items: ['Cramps', 'Bloating', 'Headache', 'Back pain', 'Acne', 'Fatigue', 'Tender breasts', 'Nausea', 'Joint Pain', 'Insomnia']
    },
    {
        category: 'Emotional',
        items: ['Anxiety', 'Mood Swings', 'Irritability', 'Low Mood']
    }
];

export const PMS_SYMPTOMS: { category: string; items: PmsSymptom[] }[] = [
    {
        category: 'Physical',
        items: ['PMS Cramps', 'PMS Back Pain', 'PMS Bloating', 'PMS Acne', 'PMS Fatigue', 'PMS Headache', 'Water Retention']
    },
    {
        category: 'Emotional',
        items: ['PMS Irritability', 'PMS Anxiety', 'Sadness', 'Crying Spells', 'PMS Mood Swings', 'Sensitivity', 'Low Patience']
    }
];

export const COMFORT_TIPS = [
    { title: 'Sip Warm Tea', description: 'Herbal teas like chamomile or ginger can help soothe cramps and calm your mind.', icon: 'TeaCup' as const },
    { title: 'Gentle Stretching', description: 'Light yoga or stretching can ease back pain and release tension in your muscles.', icon: 'Stretching' as const },
    { title: 'Deep Breathing', description: 'Practice slow, deep breaths to reduce stress and manage feelings of anxiety.', icon: 'Breathing' as const },
    { title: 'Enjoy Dark Chocolate', description: 'A small amount of dark chocolate can boost your mood and satisfy cravings.', icon: 'Chocolate' as const },
    { title: 'Take a Warm Bath', description: 'A warm bath with Epsom salts can relax your body and alleviate muscle aches.', icon: 'HeartHand' as const },
    { title: 'Go for a Slow Walk', description: 'Light movement can help with bloating and improve your overall mood.', icon: 'Exercise' as const },
];

export const CRAVINGS: Craving[] = ['Sweet', 'Salty', 'Chocolate', 'Carbs', 'Fruits'];

export const ENERGY_LEVELS: EnergyLevel[] = ['Low', 'Medium', 'High'];

export const NUTRITION_DATA = {
    Menstrual: {
        title: "Nourishing Foods",
        theme: { bg: 'bg-rose-50', text: 'text-rose-600', accent: 'bg-rose-100' },
        description: "Focus on replenishing nutrients, especially iron, and choose warm, comforting foods to support your body.",
        foods: [
            { name: "Leafy Greens", details: "Spinach and kale are rich in iron.", icon: "Leaf" as const },
            { name: "Ginger Tea", details: "Helps soothe cramps and nausea.", icon: "TeaCup" as const },
            { name: "Salmon", details: "Rich in Omega-3s to reduce inflammation.", icon: "Fish" as const },
            { name: "Lentil Soup", details: "Warm, comforting, and a great source of iron.", icon: "Soup" as const },
        ]
    },
    Follicular: {
        title: "Energizing Foods",
        theme: { bg: 'bg-emerald-50', text: 'text-emerald-600', accent: 'bg-emerald-100' },
        description: "As estrogen rises, focus on fresh, light foods that support hormonal balance and provide sustained energy.",
        foods: [
            { name: "Berries", details: "Full of antioxidants and vitamins.", icon: "Leaf" as const },
            { name: "Lean Protein", details: "Chicken or tofu to build and repair.", icon: "Fish" as const },
            { name: "Avocado", details: "Healthy fats for hormone production.", icon: "Avocado" as const },
            { name: "Fermented Foods", details: "Yogurt or kimchi for gut health.", icon: "Soup" as const },
        ]
    },
    Ovulation: {
        title: "Balancing Foods",
        theme: { bg: 'bg-amber-50', text: 'text-amber-600', accent: 'bg-amber-100' },
        description: "Your energy is at its peak. Support your body with anti-inflammatory and fiber-rich foods.",
        foods: [
            { name: "Quinoa", details: "A complete protein and high in fiber.", icon: "Leaf" as const },
            { name: "Cruciferous Veggies", details: "Broccoli and cauliflower help process estrogen.", icon: "Leaf" as const },
            { name: "Nuts & Seeds", details: "Provide essential fatty acids.", icon: "Avocado" as const },
            { name: "Hydrating Fruits", details: "Watermelon and cucumber are great choices.", icon: "Leaf" as const },
        ]
    },
    Luteal: {
        title: "Comforting Foods",
        theme: { bg: 'bg-violet-50', text: 'text-violet-600', accent: 'bg-violet-100' },
        description: "Focus on foods that stabilize blood sugar and boost mood to ease potential PMS symptoms.",
        foods: [
            { name: "Sweet Potatoes", details: "Complex carbs to reduce sugar cravings.", icon: "Leaf" as const },
            { name: "Dark Chocolate", details: "Rich in magnesium to improve mood.", icon: "Chocolate" as const },
            { name: "Chamomile Tea", details: "Promotes relaxation and better sleep.", icon: "TeaCup" as const },
            { name: "Lean Red Meat", details: "Boosts iron levels before your period.", icon: "Fish" as const },
        ]
    },
    SymptomFoods: {
        'Cramps': {
            good: [{ name: 'Ginger', icon: 'Leaf' }, { name: 'Salmon', icon: 'Fish' }, { name: 'Turmeric', icon: 'Leaf' }],
            bad: [{ name: 'Caffeine', icon: 'TeaCup' }, { name: 'Sugar', icon: 'Chocolate' }, { name: 'Fried Foods', icon: 'Soup' }]
        },
        'Bloating': {
            good: [{ name: 'Cucumber', icon: 'Leaf' }, { name: 'Asparagus', icon: 'Leaf' }, { name: 'Peppermint Tea', icon: 'TeaCup' }],
            bad: [{ name: 'Salty Foods', icon: 'Soup' }, { name: 'Carbonated Drinks', icon: 'TeaCup' }, { name: 'Cruciferous Veggies', icon: 'Leaf' }]
        },
        'Fatigue': {
            good: [{ name: 'Spinach', icon: 'Leaf' }, { name: 'Eggs', icon: 'Fish' }, { name: 'Nuts', icon: 'Avocado' }],
            bad: [{ name: 'Processed Carbs', icon: 'Soup' }, { name: 'Alcohol', icon: 'TeaCup' }, { name: 'Excessive Sugar', icon: 'Chocolate' }]
        }
    },
    CravingsSolutions: [
        { craving: 'Chocolate', solution: 'Try a square of high-quality dark chocolate (70% or higher) or a handful of almonds.', icon: 'Chocolate' },
        { craving: 'Salty', solution: 'Opt for seaweed snacks, a small portion of olives, or lightly salted edamame.', icon: 'Soup' },
        { craving: 'Sweet', solution: 'A bowl of mixed berries with a dollop of Greek yogurt can satisfy a sweet tooth.', icon: 'Leaf' },
        { craving: 'Carbs', solution: 'Choose complex carbs like a small baked sweet potato or oatmeal with cinnamon.', icon: 'Leaf' }
    ],
    MealPlan: [
        { day: 'Mon', breakfast: 'Oatmeal', lunch: 'Salad', dinner: 'Salmon' },
        { day: 'Tue', breakfast: 'Yogurt', lunch: 'Soup', dinner: 'Chicken' },
        { day: 'Wed', breakfast: 'Smoothie', lunch: 'Quinoa Bowl', dinner: 'Tofu Stir-fry' },
        { day: 'Thu', breakfast: 'Eggs', lunch: 'Leftovers', dinner: 'Lentil Pasta' },
        { day: 'Fri', breakfast: 'Oatmeal', lunch: 'Sandwich', dinner: 'Tacos' },
        { day: 'Sat', breakfast: 'Pancakes', lunch: 'Salad', dinner: 'Pizza Night' },
        { day: 'Sun', breakfast: 'Yogurt', lunch: 'Leftovers', dinner: 'Roast Chicken' },
    ]
};

export const SELF_CARE_DATA = {
    PhaseCare: {
        Menstrual: { title: "Rest & Replenish", items: ["Take a warm bath", "Enjoy herbal tea", "Gentle stretching"] },
        Follicular: { title: "Energize & Plan", items: ["Try a new workout", "Plan your week", "Eat fresh foods"] },
        Ovulation: { title: "Connect & Socialize", items: ["Connect with friends", "Do a high-energy workout", "Enjoy nourishing meals"] },
        Luteal: { title: "Nurture & Wind Down", items: ["Practice mindfulness", "Read a book", "Eat comforting foods"] },
    },
    SymptomCare: {
        'Cramps': [{ id: 'sc_cramp_1', tip: "Use a warm compress on your abdomen." }, { id: 'sc_cramp_2', tip: "Sip on ginger or chamomile tea." }],
        'Headache': [{ id: 'sc_head_1', tip: "Gently massage your temples." }, { id: 'sc_head_2', tip: "Stay hydrated and rest in a quiet, dark room." }],
        'Bloating': [{ id: 'sc_bloat_1', tip: "Go for a gentle walk." }, { id: 'sc_bloat_2', tip: "Avoid carbonated drinks and salty foods." }],
        'Fatigue': [{ id: 'sc_fatigue_1', tip: "Take a short, 20-minute nap." }, { id: 'sc_fatigue_2', tip: "Do some light stretching to boost circulation." }],
    },
    MoodSupport: {
        'Stressed': [{ id: 'sc_stress_1', tip: "Practice the 4-7-8 breathing exercise." }, { id: 'sc_stress_2', tip: "Listen to a calming meditation." }],
        'Anxiety': [{ id: 'sc_anxiety_1', tip: "Try the 5-4-3-2-1 grounding technique." }, { id: 'sc_anxiety_2', tip: "Write down your thoughts in a journal." }],
    },
    Rituals: [
        { id: 'ritual_morning', title: "Morning Ritual", description: "Start your day with intention.", items: ["5 min stretch", "Drink a glass of water", "Set one goal for the day"] },
        { id: 'ritual_evening', title: "Evening Wind-Down", description: "Prepare your body for restful sleep.", items: ["Read a book (no screens)", "Sip herbal tea", "Gentle-night yoga"] },
        { id: 'ritual_period', title: "First Day of Period", description: "A routine for comfort and care.", items: ["Use a warm compress", "Eat a nourishing meal", "Rest when you need to"] },
    ]
};


export const EXERCISE_DATA = {
    Menstrual: {
        title: "Gentle Movement",
        theme: { bg: 'bg-rose-50', text: 'text-rose-600', accent: 'bg-rose-100' },
        description: "Your body is working hard. Focus on restorative movements that honor your energy levels.",
        suggestions: [
            { name: "Restorative Yoga", icon: "Yoga" as const, details: "Focus on poses that release tension in the lower back and hips." },
            { name: "Slow Walk", icon: "Walking" as const, details: "A gentle walk in nature can boost your mood and ease cramps." },
            { name: "Stretching", icon: "Stretching" as const, details: "Light stretching can help with muscle aches and stiffness." },
        ],
        tip: "Listen to your body. If you feel tired, it's okay to rest."
    },
    Follicular: {
        title: "Energy Rising",
        theme: { bg: 'bg-emerald-50', text: 'text-emerald-600', accent: 'bg-emerald-100' },
        description: "As your energy returns, you can gradually increase the intensity of your workouts.",
        suggestions: [
            { name: "Light Cardio", icon: "Cardio" as const, details: "Try brisk walking, jogging, or cycling to get your heart rate up." },
            { name: "Pilates", icon: "Pilates" as const, details: "Focus on core strength and flexibility as your energy builds." },
            { name: "Light Strength", icon: "Strength" as const, details: "Introduce some light weight training or bodyweight exercises." },
        ],
        tip: "This is a great time to try new activities as your motivation may be higher."
    },
    Ovulation: {
        title: "Peak Energy",
        theme: { bg: 'bg-amber-50', text: 'text-amber-600', accent: 'bg-amber-100' },
        description: "You're at your strongest! This is the perfect time for high-intensity workouts.",
        suggestions: [
            { name: "HIIT", icon: "HIIT" as const, details: "High-Intensity Interval Training can be very effective during this phase." },
            { name: "Strength Training", icon: "Strength" as const, details: "Challenge your muscles with heavier weights or more complex moves." },
            { name: "Running", icon: "Cardio" as const, details: "Take advantage of your peak stamina for a longer or faster run." },
        ],
        tip: "Properly warm up and cool down to prevent injury during intense workouts."
    },
    Luteal: {
        title: "Support & Comfort",
        theme: { bg: 'bg-violet-50', text: 'text-violet-600', accent: 'bg-violet-100' },
        description: "As your energy begins to decrease, shift towards more moderate and restorative exercises.",
        suggestions: [
            { name: "Low-Impact Workouts", icon: "Exercise" as const, details: "Swimming or cycling can be great low-impact options." },
            { name: "Yoga Flow", icon: "Yoga" as const, details: "A steady yoga flow can help with PMS symptoms like mood swings." },
            { name: "Bodyweight Strength", icon: "Core" as const, details: "Focus on maintaining strength without over-exerting yourself." },
        ],
        tip: "Be mindful of PMS symptoms. Choose movements that feel supportive, not stressful."
    }
};

export const EXERCISE_LIBRARY = [
    { category: 'Yoga', items: [{ name: 'Sun Salutation' }, { name: 'Child\'s Pose' }, { name: 'Cat-Cow' }] },
    { category: 'Stretching', items: [{ name: 'Hamstring Stretch' }, { name: 'Hip Flexor Lunge' }] },
    { category: 'Cardio', items: [{ name: 'Jumping Jacks' }, { name: 'Brisk Walking' }] },
    { category: 'Core', items: [{ name: 'Plank' }, { name: 'Bird-Dog' }] },
    { category: 'Breathwork', items: [{ name: 'Box Breathing' }, { name: '4-7-8 Breathing' }] },
];

export const RELAXATION_DATA = {
    Breathing: [
        { id: 'b1', title: 'Calm Breathing', pattern: { inhale: 4, hold: 0, exhale: 4 }, duration: 4, description: 'Balance your system.' },
        { id: 'b2', title: 'Relax Breathing', pattern: { inhale: 4, hold: 0, exhale: 6 }, duration: 6, description: 'Soothe your nervous system.' },
        { id: 'b3', title: 'Anti-Anxiety Box', pattern: { inhale: 4, hold: 4, exhale: 4, hold2: 4 }, duration: 5, description: 'Ground yourself.' },
    ],
    Meditations: [
        { id: 'm1', title: 'Morning Energy', category: 'Energy' },
        { id: 'm2', title: 'Evening Calm', category: 'Sleep' },
        { id: 'm3', title: 'PMS Relief', category: 'Cycle' },
        { id: 'm4', title: 'Anxiety Release', category: 'Mood' },
    ],
    Sounds: [
        { id: 's1', title: 'Gentle Rain', icon: 'Rain' as const },
        { id: 's2', title: 'Ocean Waves', icon: 'Waves' as const },
        { id: 's3', title: 'Forest Night', icon: 'Forest' as const },
        { id: 's4', title: 'Calm Piano', icon: 'Piano' as const },
    ],
    Affirmations: {
        Menstrual: "I honor my body's need for rest and release.",
        Follicular: "I am open to new energy and new beginnings.",
        Ovulation: "I am radiant, vibrant, and full of life.",
        Luteal: "I am allowed to be gentle with myself as I wind down."
    },
    MoodResets: [
        { id: 'mr1', title: '30-Second Breath', description: 'Take three slow, deep breaths, focusing on your exhale.', icon: 'Breathing' as const },
        { id: 'mr2', title: 'Shake-out Reset', description: 'Gently shake your hands and arms for 30 seconds to release tension.', icon: 'Stretching' as const },
        { id: 'mr3', title: 'Quick Posture Fix', description: 'Sit or stand tall, roll your shoulders back, and lift your chest.', icon: 'Yoga' as const },
    ]
};

export const SEXUAL_WELLNESS_DATA = {
    LibidoInsights: {
        Menstrual: "It's common for libido to be lower as your body focuses on rest. Gentle self-care and emotional connection can be comforting.",
        Follicular: "As estrogen rises, you may notice an increase in energy and desire. This can be a great time for exploration and connection.",
        Ovulation: "Testosterone and estrogen peak, often leading to your highest libido of the cycle. Your body is biologically primed for conception.",
        Luteal: "Libido can vary. Some experience a second peak, while others may feel more inward and less interested as progesterone rises.",
    },
    HealthTips: [
        { title: 'Open Communication', description: 'Honest, kind communication with a partner is the foundation of a healthy sexual relationship.', icon: 'Mindfulness' as const },
        { title: 'Body Awareness', description: 'Understanding what feels good for you is empowering. Pay attention to your body\'s signals.', icon: 'SelfCare' as const },
        { title: 'Emotional Readiness', description: 'Intimacy is emotional as well as physical. Ensure you feel safe, respected, and emotionally ready.', icon: 'Heart' as const },
        { title: 'Enthusiastic Consent', description: 'Consent should be clear, ongoing, and enthusiastic from all partners, every time.', icon: 'HeartHand' as const },
    ],
    EmotionalIntimacy: [
        { title: 'Build Trust', description: 'Trust is built through consistent actions, honesty, and vulnerability over time.', icon: 'Heart' as const },
        { title: 'Boost Body Confidence', description: 'Focus on what your body can do, not just how it looks. Practice self-compassion.', icon: 'SelfCare' as const },
        { title: 'Reduce Stress', description: 'High stress can lower libido. Prioritize relaxation and mindfulness to support your well-being.', icon: 'Breathing' as const },
    ],
};

export const SLEEP_QUALITY_LEVELS: { emoji: string; label: SleepQuality }[] = [
    { emoji: '😴', label: 'Excellent' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '😣', label: 'Poor' },
    { emoji: '😫', label: 'Very Poor' },
];

export const SLEEP_TIPS = [
    { title: 'Create a Relaxing Routine', description: 'Wind down with a warm bath, reading, or gentle stretching before bed.', icon: 'SelfCare' as const },
    { title: 'Consistent Sleep Schedule', description: 'Go to bed and wake up around the same time each day, even on weekends.', icon: 'Calendar' as const },
    { title: 'Optimize Your Environment', description: 'Keep your bedroom dark, quiet, and cool for the best sleep quality.', icon: 'Moon' as const },
    { title: 'Limit Screen Time', description: 'Avoid phones, tablets, and computers an hour before bed as blue light can disrupt sleep.', icon: 'Sleep' as const },
    { title: 'Sip Chamomile Tea', description: 'A warm cup of non-caffeinated herbal tea can be very calming.', icon: 'TeaCup' as const },
];

export const PHASE_SLEEP_INSIGHTS = {
    Menstrual: "Your body temperature is lower, which can actually help you sleep more soundly. However, cramps might disrupt rest. Focus on comfort and pain relief.",
    Follicular: "As estrogen rises, you may find you need slightly less sleep to feel rested. Your sleep is often deep and restorative during this phase.",
    Ovulation: "A slight rise in body temperature after ovulation might make sleep a little lighter for some. Keep your room cool.",
    Luteal: "Progesterone rises, which can make you feel sleepy, but PMS symptoms and another rise in body temperature can disrupt sleep. Prioritize a relaxing bedtime routine."
};

export const HYDRATION_TIPS = {
    Menstrual: "During your period, your body loses fluids. Focus on drinking plenty of water and herbal teas to stay hydrated and help ease cramps.",
    Follicular: "As your energy increases, you might be more active. Remember to drink water consistently throughout the day to support your activity levels.",
    Ovulation: "Your body temperature can rise slightly around ovulation. Staying well-hydrated helps regulate your temperature and supports overall wellness.",
    Luteal: "Hormonal shifts can sometimes cause water retention. It sounds counterintuitive, but drinking enough water helps flush out excess sodium and reduce bloating."
};

export const BBT_TIPS = [
    { title: 'Measure First Thing', description: 'Take your temperature immediately upon waking, before you get out of bed, talk, or drink anything.', icon: 'Bed' as const },
    { title: 'Be Consistent', description: 'Try to measure at the same time every morning, even on weekends, for the most accurate chart.', icon: 'Clock' as const },
    { title: 'Use a BBT Thermometer', description: 'A basal body thermometer is more sensitive and measures to two decimal places, which is crucial for detecting small shifts.', icon: 'Thermometer' as const },
    { title: 'At Least 3 Hours of Sleep', description: 'You need at least three consecutive hours of sleep before measuring for a reliable reading.', icon: 'Sleep' as const },
];

export const PHASE_WEIGHT_INSIGHTS = {
    Menstrual: "You may notice a 'whoosh' of weight loss as your body releases water retained during the luteal phase. It's a natural shift, not fat loss.",
    Follicular: "Metabolism can be slightly lower during this phase. Focus on nourishing, energizing foods. Your weight is often at its most stable here.",
    Ovulation: "A slight, temporary increase in weight can happen around ovulation due to hormonal shifts. This is normal and usually passes quickly.",
    Luteal: "It's very common to experience water retention and bloating in the days leading up to your period due to progesterone. Be kind to yourself; this is temporary."
};

export const MEDICATION_TYPES: MedicationType[] = ['Pill', 'Supplement', 'Hormone', 'Vitamin', 'Injection', 'Cream'];

export const MEDICATION_GUIDES = {
    pms: [
        { name: 'Magnesium', purpose: 'May help with cramps and mood.', type: 'Supplement' as MedicationType },
        { name: 'Vitamin B6', purpose: 'Can support mood regulation.', type: 'Vitamin' as MedicationType },
        { name: 'Pain Reliever (NSAID)', purpose: 'For cramps and headaches.', type: 'Pill' as MedicationType },
    ],
    pregnancy: [
        { name: 'Prenatal Vitamin', purpose: 'Essential vitamins for baby\'s development.', type: 'Vitamin' as MedicationType },
        { name: 'Iron Supplement', purpose: 'Often recommended to prevent anemia.', type: 'Supplement' as MedicationType },
        { name: 'Folic Acid', purpose: 'Crucial for preventing neural tube defects.', type: 'Vitamin' as MedicationType },
    ],
    menopause: [
        { name: 'Hormone Replacement Therapy (HRT)', purpose: 'Prescribed to manage symptoms.', type: 'Hormone' as MedicationType },
        { name: 'Vitamin D', purpose: 'Supports bone health.', type: 'Vitamin' as MedicationType },
        { name: 'Calcium', purpose: 'Essential for bone density.', type: 'Supplement' as MedicationType },
    ],
};

export const PREGNANCY_SYMPTOMS: PregnancySymptom[] = ['Nausea', 'Fatigue', 'Swelling', 'Back Pain'];

export const MENOPAUSE_SYMPTOMS: MenopauseSymptom[] = ['Hot Flash', 'Night Sweat', 'Insomnia', 'Joint Pain', 'Brain Fog'];

export const MENOPAUSE_EDUCATION = [
    { title: 'Understanding Perimenopause', description: 'This is the transition phase before menopause, where you might notice changes in your cycle and experience symptoms like hot flashes.' },
    { title: 'Managing Hot Flashes', description: 'Dressing in layers, avoiding triggers like spicy food, and practicing deep breathing can help manage hot flashes.' },
    { title: 'Bone Health', description: 'Estrogen loss can affect bone density. Ensure you get enough calcium and vitamin D.' },
    { title: 'Heart Health', description: 'Menopause can increase cardiovascular risks. Focus on a heart-healthy diet and regular exercise.' }
];

export const BABY_DEVELOPMENT_DATA = [
    { week: 4, size: 'a poppy seed', description: 'Your baby is a tiny ball of cells called a blastocyst.' },
    { week: 5, size: 'an appleseed', description: 'The heart and circulatory system are developing.' },
    { week: 6, size: 'a lentil', description: 'Facial features are starting to form.' },
    { week: 7, size: 'a blueberry', description: 'The baby has doubled in size since last week.' },
    { week: 8, size: 'a raspberry', description: 'Fingers and toes are beginning to form.' },
    { week: 9, size: 'a grape', description: 'All essential organs have begun to form.' },
    { week: 10, size: 'a prune', description: 'The embryonic period is ending, and the fetal period begins.' },
    { week: 11, size: 'a fig', description: 'Your baby is now officially a fetus.' },
    { week: 12, size: 'a lime', description: 'Fingernails and toenails are forming.' },
];


export const ICONS = {
    Home: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    ),
    Calendar: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
            <line x1="16" x2="16" y1="2" y2="6"></line>
            <line x1="8" x2="8" y1="2" y2="6"></line>
            <line x1="3" x2="21" y1="10" y2="10"></line>
        </svg>
    ),
    Log: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
    ),
    Profile: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    ),
    Grid: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
    ),
    ChevronLeft: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m15 18-6-6 6-6"></path>
        </svg>
    ),
    ChevronRight: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m9 18 6-6-6-6"></path>
        </svg>
    ),
    Ovulation: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"></path>
        </svg>
    ),
    Mail: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
    ),
    Lock: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    ),
    Flower: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 13.4a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0ZM12 13.4a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0ZM12 13.4V18m0-4.6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 8.8A2.5 2.5 0 1 1 7 6.3a2.5 2.5 0 0 1 5 2.5ZM12 8.8A2.5 2.5 0 1 0 17 6.3a2.5 2.5 0 0 0-5 2.5Z"/>
        </svg>
    ),
    Menstrual: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
    ),
    Follicular: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M2 22a8 8 0 0 1 8-8c0 0 0-1.2 1-3 0 0 0-2.3 0-4.5 0-1 .5-2 1.5-2.5 1-1 2-1 3-1 1 0 2 .5 3 1.5 1 .5 1.5 1.5 1.5 2.5 0 2.2 0 4.5 0 4.5 1 1.8 1 3 1 3a8 8 0 0 1 8 8" />
            <path d="M2 16h20" />
        </svg>
    ),
    Luteal: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    ),
    LogSymptom: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 12h.01" />
        </svg>
    ),
    LogMood: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
    ),
    Star: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    NoteDot: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <circle cx="12" cy="12" r="10" />
        </svg>
    ),
    Checkmark: (props: React.SVGProps<SVGSVGElement>) => (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    ),
    Bell: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    ),
    Seedling: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4 20h16" />
            <path d="M6 20v-4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" />
            <path d="M12 20v-8" />
            <path d="M10 9.5c0-1.5 1-2.5 2-2.5s2 1 2 2.5" />
        </svg>
    ),
    HeartHand: (props: React.SVGProps<SVGSVGElement>) => (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 12h.01" />
        </svg>
    ),
    Clipboard: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        </svg>
    ),
    Sparkles: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.5 2.5 12 8l2.5-5.5L17 5l-2.5 5.5L17 16l-2.5-5.5L12 16l-2.5-5.5L7 16l2.5-5.5L7 5l2.5-2.5Z"/></svg>
    ),
    Nutrition: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/><path d="M15.33 16.25a3.99 3.99 0 0 1-2.28.75 4 4 0 0 1-3.76-2.25"/><path d="M10 8.5c.5-1 1.5-2 3-2"/><path d="M12 12v10"/></svg>
    ),
    Exercise: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15.2 3.8a2 2 0 0 1 2.8 2.8l-4.4 4.4 5.2 5.2a2 2 0 0 1-2.8 2.8L11 14.2l-4.4 4.4a2 2 0 0 1-2.8-2.8l5.2-5.2-4.4-4.4a2 2 0 0 1 2.8-2.8L10 8.2l5.2-4.4Z"/></svg>
    ),
    Sleep: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 21a9 9 0 1 1 0-18Z"/><path d="M8 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0Z"/><path d="M14 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0Z"/><path d="M15 16h-6a2 2 0 0 0 0 4h6a2 2 0 0 0 0-4Z"/></svg>
    ),
    Moon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
    ),
    WaterDrop: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z"/></svg>
    ),
    Temperature: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
    ),
    Thermometer: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
    ),
    Weight: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/><path d="M3 12h6"/><path d="M12 3v6"/></svg>
    ),
    SexualWellness: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    ),
    Privacy: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    ),
    Pregnancy: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 16.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"/><path d="M18.5 9.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"/><path d="M10.4 20.5c-2-2.5-2.7-5.5.3-8"/><path d="M13.6 12.5c2-2.5 2.7-5.5-.3-8"/></svg>
    ),
    Menopause: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 13.4a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0ZM12 13.4a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0ZM12 13.4V18m0-4.6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 8.8A2.5 2.5 0 1 1 7 6.3a2.5 2.5 0 0 1 5 2.5ZM12 8.8A2.5 2.5 0 1 0 17 6.3a2.5 2.5 0 0 0-5 2.5Z"/></svg>
    ),
    Mindfulness: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z"/><path d="M12 12v.5"/><path d="M12 4v-2"/><path d="M12 22v-2"/><path d="m17 7 1.5-1.5"/><path d="M5.5 18.5 7 17"/><path d="m7 7-1.5-1.5"/><path d="m18.5 18.5-1.5-1.5"/></svg>
    ),
    Medication: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="M8.5 8.5 14 3"/><path d="m14 14 6 6"/></svg>
    ),
    Pill: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
    ),
    Trends: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
    ),
    Correlations: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="9" r="2"/><path d="M12 11v10"/><path d="M9 3H3v1a6 6 0 0 1 6-6h1"/><path d="M21 3h-1a6 6 0 0 0-6 6v1"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 19h10"/></svg>
    ),
    SelfCare: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 12v-2M12 8V4H8"/><path d="M20 12c0-4.42-3.58-8-8-8S4 7.58 4 12v8h16v-8Z"/><path d="M4 12H2"/><path d="M22 12h-2"/></svg>
    ),
    TeaCup: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 21h4"/><path d="M12 17v4"/><path d="M18 8a4 4 0 0 0-4-4h- conoscenza"/><path d="M8 4H4a2 2 0 0 0-2 2v3a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V6a2 2 0 0 0-2-2h-2"/><path d="M8 13v-3"/><path d="M12 13v-3"/></svg>
    ),
    Stretching: (props: React.SVGProps<SVGSVGElement>) => (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="6" cy="6" r="2"/><path d="M6 8v4l3 3h6"/><path d="m14 15-3 3 1 4"/><path d="m7 12-2 4 3 3"/><path d="m19 13h-2l-3-3"/></svg>
    ),
    Breathing: (props: React.SVGProps<SVGSVGElement>) => (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 16.5A4.5 4.5 0 1 0 7.5 12 4.5 4.5 0 0 0 12 16.5Z"/><path d="M12 7.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5Z"/><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/></svg>
    ),
    Chocolate: (props: React.SVGProps<SVGSVGElement>) => (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.2 2.2c-1.2.9-2 2.3-2 3.8v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1c0-1.5-.8-2.9-2-3.8-1.2-.9-2.6-1.4-4-1.4-1.4 0-2.8.5-4 1.4Z"/><path d="M8.2 10.2c-1.2.9-2 2.3-2 3.8v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1c0-1.5-.8-2.9-2-3.8-1.2-.9-2.6-1.4-4-1.4-1.4 0-2.8.5-4 1.4Z"/><path d="M12 21a2 2 0 0 0 2-2v-1c0-1.5-.8-2.9-2-3.8-1.2-.9-2.6-1.4-4-1.4s-2.8.5-4 1.4c-1.2.9-2 2.3-2 3.8v1a2 2 0 0 0 2 2h8Z"/></svg>
    ),
    Book: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
    ),
    // Relaxation Icons
    Rain: (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 19v1"/><path d="M8 14v1"/><path d="M16 19v1"/><path d="M16 14v1"/><path d="M12 21v1"/><path d="M12 16v1"/></svg>,
    Waves: (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 6c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>,
    Forest: (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22v-4"/><path d="m17 14-5-5-5 5h10z"/><path d="M12 2a5 5 0 0 1 5 5c0 2-2 4-5 4s-5-2-5-4a5 5 0 0 1 5-5z"/></svg>,
    Piano: (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18.5 8.5v9a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2v-9"/><path d="M4 14.5h16"/><path d="m5.5 14.5-1-6a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1l-1 6"/><path d="M8.5 14.5v-6"/><path d="M11.5 14.5v-6"/><path d="M14.5 14.5v-6"/></svg>,
    // Nutrition Icons
    Leaf: (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 20A7 7 0 0 1 4 13V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5c0 3.9-1.9 6.4-4.5 8.1-.5.3-1 .6-1.5.8Z"/><path d="M4 13h16"/></svg>,
    Fish: (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6.5 12.5c.9 1 2.2 2 4.5 2s3.6-1 4.5-2"/><path d="M18 12v3.5c0 1.4-1.1 2.5-2.5 2.5h-7C7.1 18 6 16.9 6 15.5V12"/><path d="M15 12a3 3 0 0 0-6 0"/><path d="M16 6.5c-1-.5-2.2-1-4-1s-3 .5-4 1"/><path d="M10 5.4c1.7-.4 3.4-.4 5.1 0l-1.6 2.1-1.9-1.6-1.6 1.6Z"/></svg>,
    Soup: (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22a10 10 0 0 0 10-10H2a10 10 0 0 0 10 10Z"/><path d="M6 12c0-1.3.6-2.5 1.5-3.3"/><path d="M16.5 8.7c.9.8 1.5 2 1.5 3.3"/><path d="M12 12c0-1.3.6-2.5 1.5-3.3"/></svg>,
    Avocado: (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.3 22a4.5 4.5 0 0 0 4.2-4.2c0-3.2-2-5.8-4.2-5.8s-4.2 2.6-4.2 5.8a4.5 4.5 0 0 0 4.2 4.2Z"/><path d="M14.6 15.2c1.7 1.7 1.7 4.3 0 6-.5.5-1.1.8-1.7 1-.9.3-1.8.3-2.7 0-.7-.2-1.3-.5-1.7-1-1.7-1.7-1.7-4.3 0-6"/><path d="M12.5 14a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>,
    Heart: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    ),
    // Exercise Icons
    Yoga: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12c0 6 4 9 6 9s6-3 6-9-4-9-6-9-6 3-6 9"/><path d="M14 12c0 6 4 9 6 9s6-3 6-9-4-9-6-9-6 3-6 9"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></svg>
    ),
    Walking: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/><path d="M15.33 16.25a3.99 3.99 0 0 1-2.28.75 4 4 0 0 1-3.76-2.25"/><path d="M10 8.5c.5-1 1.5-2 3-2"/><path d="M12 12v10"/></svg>
    ),
    Cardio: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.4 20.5c-2-2.5-2.7-5.5.3-8"/><path d="M13.6 12.5c2-2.5 2.7-5.5-.3-8"/><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z"/></svg>
    ),
    Pilates: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.2 10.2c.1-.5.3-1 .5-1.4C5.6 7 7.3 6 9.2 6c1.3 0 2.5.5 3.5 1.4"/><path d="m11.5 8.5 3.8-3.8c.9-.9 2.5-.9 3.4 0l.2.2c.9.9.9 2.5 0 3.4L15 12.2"/><path d="M12.2 15 8.5 18.8c-.9.9-2.5.9-3.4 0l-.2-.2c-.9-.9-.9-2.5 0-3.4l3.8-3.8"/><path d="M14 6.8c.5-.1 1-.3 1.4-.5 1.8-.9 3.5-2.2 4.6-3.7"/><path d="M6.8 14c-.1.5-.3 1-.5 1.4-1 1.8-2.2 3.5-3.7 4.6"/><path d="m12.5 8.5-2 2"/></svg>
    ),
    Strength: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M13 19V5"/><path d="M10 19V5"/><path d="M7 19V5"/><path d="M16 19V5"/><path d="M19 19V5"/><path d="M22 19H2"/><path d="M5 19V5"/></svg>
    ),
    HIIT: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 13-2-2 2-2"/><path d="m17 11-2-2 2-2"/><path d="M3 21h18"/><path d="m7 15-2-2 2-2"/><path d="M13 3 9 7l4 4"/><path d="M14 17v4"/><path d="M10 17v4"/><path d="M4 11.25V13a8 8 0 0 0 16 0v-1.75"/></svg>
    ),
    Core: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M12 12a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/></svg>
    ),
    // BBT Icons
    Bed: (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 4v16h20V4"/><path d="M2 10h20"/><path d="M6 8v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>,
    Clock: (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};