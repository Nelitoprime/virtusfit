import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Activity, Dumbbell, User, Plus, CheckCircle, 
  Zap, LogOut, Lock, Mail, FileText, Target, History, Play, Heart, MessageSquare, 
  Palette, Users, Sun, Moon, Timer, Image, Video, Trophy, Award, Trash2, Edit3, 
  Share2, RefreshCw, PlusCircle, MinusCircle, Settings, Upload, MapPin, EyeOff, Eye, 
  Camera, Layers, Flame, Battery, Shield, Medal, Hash, Disc, Percent, ZapOff,
  Utensils, Send, Check
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';

// --- THEMES & INITIAL DATA ---
const THEMES = {
  cyan: { name: 'Cyber Cyan', hex: '#06b6d4', text: 'text-cyan-500 dark:text-cyan-400', bg: 'bg-cyan-500' },
  emerald: { name: 'Neon Emerald', hex: '#10b981', text: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500' },
  amber: { name: 'Solar Amber', hex: '#f59e0b', text: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500' },
  violet: { name: 'Vivid Violet', hex: '#8b5cf6', text: 'text-violet-500 dark:text-violet-400', bg: 'bg-violet-500' },
  crimson: { name: 'Crimson Fire', hex: '#ef4444', text: 'text-red-500 dark:text-red-400', bg: 'bg-red-500' },
  indigo: { name: 'Electric Indigo', hex: '#6366f1', text: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-500' },
  pink: { name: 'Neon Pink', hex: '#ec4899', text: 'text-pink-500 dark:text-pink-400', bg: 'bg-pink-500' }
};

const initialWeightData = [{ date: 'Wk 1', weight: 178 }, { date: 'Wk 2', weight: 176 }, { date: 'Wk 3', weight: 175 }];
const defaultExercises = [
  { id: 1, name: 'Barbell Bench Press', brand: 'Rogue', muscle: 'Chest', secondaryMuscles: 'Triceps', equipment: 'Barbell', description: 'Retract shoulder blades, lower bar to mid-chest, and press upward.' },
  { id: 2, name: 'Barbell Back Squat', brand: 'Eleiko', muscle: 'Legs', secondaryMuscles: 'Glutes, Core', equipment: 'Barbell', description: 'Keep core tight and descend to parallel.' },
  { id: 3, name: 'Lat Pulldown', brand: 'Hammer Strength', muscle: 'Back', secondaryMuscles: 'Biceps', equipment: 'Cable', description: 'Drive elbows down and back.' },
];
const initialCommunityPosts = [
  { id: 1, user: 'Jordan Vance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop', time: '2h ago', type: 'friend', location: 'New York, NY', content: 'Crushed a heavy leg day! Squatted 315 for reps. 💪 🏆' },
  { id: 2, user: 'Alex Sterling', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop', time: '4h ago', type: 'nearby', location: 'Metro Gym', content: 'Finished an intense 5K run and core session!' }
];

// --- HELPERS ---
function calculatePlates(targetWeight) {
  let remaining = (targetWeight - 45) / 2;
  if (remaining <= 0) return {};
  const plates = [45, 35, 25, 10, 5, 2.5];
  const result = {};
  plates.forEach(p => { const count = Math.floor(remaining / p); if (count > 0) { result[p] = count; remaining -= count * p; } });
  return result;
}
function calculate1RM(weight, reps) { return reps === 1 || reps === 0 ? weight : Math.round(weight * (1 + reps / 30)); }
function formatExName(ex) { 
  return (
    <span>
      {ex.name} {ex.brand && <span className="text-zinc-500 font-normal text-xs ml-1">({ex.brand})</span>}
    </span>
  ); 
}

// --- AUTH SCREEN ---
function AuthScreen({ onLogin, theme, isDarkMode, uiStyle }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', avatar: '' });
  const cardBase = uiStyle === 'glass' ? (isDarkMode ? 'bg-zinc-900/40 backdrop-blur-xl border-white/10' : 'bg-white/40 backdrop-blur-xl border-white/40') : (isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200');
  const inputBase = uiStyle === 'glass' ? (isDarkMode ? 'bg-zinc-950/50 border-white/10 text-zinc-200' : 'bg-white/50 border-white/50 text-slate-900') : (isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-200' : 'bg-slate-50 border-slate-300 text-slate-900');

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    onLogin({ name: isSignUp ? formData.name : 'Athlete', email: formData.email, avatar: formData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&fit=crop', location: 'Chicago, IL' }); 
  };

  return (
    <div className={`relative flex h-screen items-center justify-center p-4 overflow-hidden ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-slate-900'}`}>
      {uiStyle === 'glass' && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-30" style={{ backgroundColor: theme.hex }} />
          <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: theme.hex }} />
        </div>
      )}
      <div className={`border p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 ${cardBase}`}>
        <div className="flex justify-center mb-6"><div className={`p-4 rounded-2xl ${theme.bg} text-zinc-950`}><Zap size={40} strokeWidth={2.5} /></div></div>
        <h1 className="text-3xl font-black text-center uppercase italic tracking-tight mb-2">VIRTUSFIT</h1>
        <p className={`text-center text-sm mb-6 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{isSignUp ? 'Create your account.' : 'Log in to your personalized hub.'}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (<div><label className="block text-xs font-medium mb-1">Full Name</label><input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full border rounded-xl py-2.5 px-4 text-sm outline-none ${inputBase}`} placeholder="John Doe" /></div>)}
          <div><label className="block text-xs font-medium mb-1">Email</label><input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full border rounded-xl py-2.5 px-4 text-sm outline-none ${inputBase}`} placeholder="athlete@virtusfit.com" /></div>
          <div><label className="block text-xs font-medium mb-1">Password</label><input required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className={`w-full border rounded-xl py-2.5 px-4 text-sm outline-none ${inputBase}`} placeholder="••••••••" /></div>
          <button type="submit" className={`w-full py-3 rounded-xl font-bold text-sm text-zinc-950 mt-4 transition-all ${theme.bg} hover:opacity-80`}>{isSignUp ? 'Create Account' : 'Secure Login'}</button>
        </form>
        <div className="mt-6 text-center"><button onClick={() => setIsSignUp(!isSignUp)} className={`text-xs font-semibold ${theme.text} hover:underline`}>{isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}</button></div>
      </div>
    </div>
  );
}

// --- MEAL TRACKER MODAL ---
function MealTrackerModal({ isOpen, onClose, theme, isDarkMode, cardBase, inputBase, meals, setMeals, macros, setMacros }) {
  const [mealForm, setMealForm] = useState({ name: '', protein: '', carbs: '', fats: '' });

  if (!isOpen) return null;

  const handleManualAdd = (e) => {
    e.preventDefault();
    const p = parseFloat(mealForm.protein) || 0;
    const c = parseFloat(mealForm.carbs) || 0;
    const f = parseFloat(mealForm.fats) || 0;
    const cals = (p * 4) + (c * 4) + (f * 9);
    const newMeal = { id: Date.now(), name: mealForm.name || 'Custom Meal', protein: p, carbs: c, fats: f, calories: cals };
    
    setMeals([newMeal, ...meals]);
    setMacros(prev => ({ 
      ...prev, 
      protein: prev.protein + p, carbs: prev.carbs + c, fats: prev.fats + f, cals: prev.cals + cals 
    }));
    setMealForm({ name: '', protein: '', carbs: '', fats: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className={`border rounded-2xl w-full max-w-md p-6 shadow-2xl my-8 ${cardBase} ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2"><Utensils size={20} className={theme.text}/> Manual Meal Tracker</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">✕</button>
        </div>
        
        <div className={`p-4 rounded-xl mb-6 border flex justify-between text-center ${inputBase}`}>
          <div><p className="text-[10px] text-zinc-400 uppercase">Protein</p><p className="font-bold">{Math.round(macros.protein)}g</p></div>
          <div><p className="text-[10px] text-zinc-400 uppercase">Carbs</p><p className="font-bold">{Math.round(macros.carbs)}g</p></div>
          <div><p className="text-[10px] text-zinc-400 uppercase">Fats</p><p className="font-bold">{Math.round(macros.fats)}g</p></div>
          <div><p className="text-[10px] text-zinc-400 uppercase">Calories</p><p className={`font-black ${theme.text}`}>{Math.round(macros.cals)}</p></div>
        </div>

        <form onSubmit={handleManualAdd} className="space-y-4 border-b border-zinc-800/50 pb-6 mb-4">
          <div>
            <label className="block text-xs font-bold mb-1">Meal Name</label>
            <input required type="text" value={mealForm.name} onChange={(e) => setMealForm({...mealForm, name: e.target.value})} placeholder="e.g. Chicken & Rice" className={`w-full border rounded-xl py-2 px-3 text-sm outline-none ${inputBase}`} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">Protein (g)</label>
              <input required type="number" min="0" value={mealForm.protein} onChange={(e) => setMealForm({...mealForm, protein: e.target.value})} placeholder="0" className={`w-full border rounded-xl py-2 px-3 text-sm outline-none ${inputBase}`} />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Carbs (g)</label>
              <input required type="number" min="0" value={mealForm.carbs} onChange={(e) => setMealForm({...mealForm, carbs: e.target.value})} placeholder="0" className={`w-full border rounded-xl py-2 px-3 text-sm outline-none ${inputBase}`} />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Fats (g)</label>
              <input required type="number" min="0" value={mealForm.fats} onChange={(e) => setMealForm({...mealForm, fats: e.target.value})} placeholder="0" className={`w-full border rounded-xl py-2 px-3 text-sm outline-none ${inputBase}`} />
            </div>
          </div>
          <button type="submit" className={`w-full py-3 rounded-xl font-bold text-sm text-zinc-950 mt-2 ${theme.bg} hover:opacity-80 transition-opacity`}>+ Log Custom Meal</button>
        </form>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          <p className="text-xs font-bold text-zinc-400 sticky top-0 bg-transparent pb-1">Today's Log</p>
          {meals.length === 0 ? <p className="text-xs text-zinc-600 italic">No meals logged today.</p> : meals.map(m => (
            <div key={m.id} className={`flex justify-between items-center p-3 rounded-lg border text-xs ${inputBase}`}>
              <span className="font-semibold">{m.name}</span>
              <span className="text-zinc-400">{m.calories} kcal ({m.protein}P / {m.carbs}C / {m.fats}F)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP ---
export default function App() {
  const [currentUser, setCurrentUser] = useState(null); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [themeKey, setThemeKey] = useState('cyan');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [uiStyle, setUiStyle] = useState('glass'); 

  // Workout State
  const [routines, setRoutines] = useState([{ id: 1, name: 'Upper Body Power', description: 'Heavy pressing and pulling focus', exercises: [{ id: 101, name: 'Barbell Bench Press', brand: 'Rogue', sets: [{ type: 'working', weight: '135', reps: '10' }] }] }]);
  const [workoutHistory, setWorkoutHistory] = useState([{ id: 1, name: 'Leg Day', date: 'Yesterday', notes: 'Felt strong.' }]);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  
  // Post-Workout Prompt Modal State
  const [pendingFinishedWorkout, setPendingFinishedWorkout] = useState(null);
  const [postWorkoutShareNote, setPostWorkoutShareNote] = useState('');

  // Library & Social State
  const [exercises, setExercises] = useState(defaultExercises);
  const [posts, setPosts] = useState(initialCommunityPosts);
  const [feedFilter, setFeedFilter] = useState('friends');
  
  // Holistic State
  const [macros, setMacros] = useState({ protein: 110, carbs: 150, fats: 45, cals: 1445, pTarget: 180, cTarget: 2800 });
  const [meals, setMeals] = useState([{ id: 1, name: 'Morning Oats & Whey', protein: 45, carbs: 60, fats: 10, calories: 510 }]);
  const [readinessScore] = useState(88);
  const [streakDays] = useState(14);
  const [muscleRecovery] = useState({ Chest: 30, Back: 85, Legs: 100, Arms: 60 });
  const [personalRecords, setPersonalRecords] = useState({ 'Barbell Bench Press': { weight: 165, reps: 8, date: 'Yesterday' }, 'Barbell Back Squat': { weight: 225, reps: 5, date: '3 days ago' } });
  
  // Modals
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isNewRoutineModalOpen, setIsNewRoutineModalOpen] = useState(false);
  const [isNewExerciseModalOpen, setIsNewExerciseModalOpen] = useState(false);
  const [calcPlateWeight, setCalcPlateWeight] = useState(null);

  // Form States
  const [newRoutineForm, setNewRoutineForm] = useState({ name: '', description: '', selectedExIds: [] });
  const [newExForm, setNewExForm] = useState({ name: '', brand: '', muscle: '', secondary: '', equipment: 'Barbell', description: '' });

  // AI Chat State
  const [aiView, setAiView] = useState('chat');
  const [chatHistory, setChatHistory] = useState([{ role: 'ai', content: "Hi! I'm Bianica. Need form advice, a diet check, or a custom routine?" }]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  const theme = THEMES[themeKey];
  const cardBase = uiStyle === 'glass' ? (isDarkMode ? 'bg-zinc-900/40 backdrop-blur-xl border-white/10' : 'bg-white/40 backdrop-blur-xl border-white/50') : (isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200');
  const inputBase = uiStyle === 'glass' ? (isDarkMode ? 'bg-zinc-950/50 border-white/10 text-zinc-200' : 'bg-white/50 border-white/50 text-slate-900') : (isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-200' : 'bg-slate-50 border-slate-300 text-slate-900');
  const headerBase = uiStyle === 'glass' ? (isDarkMode ? 'bg-zinc-950/30 backdrop-blur-2xl border-white/10' : 'bg-white/30 backdrop-blur-2xl border-white/40') : (isDarkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/80 border-slate-200');

  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) interval = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    else if (timerSeconds === 0) setTimerActive(false);
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  useEffect(() => { if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory, aiView]);

  if (!currentUser) return <AuthScreen onLogin={setCurrentUser} theme={theme} isDarkMode={isDarkMode} uiStyle={uiStyle} />;

  // --- ACTIONS ---
  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCurrentUser({ ...currentUser, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const startWorkout = (routine) => { setActiveWorkout({ name: routine.name, exercises: JSON.parse(JSON.stringify(routine.exercises || [])) }); setActiveTab('active-session'); };
  
  // Triggers post-workout modal prompt instead of direct alert
  const finishActiveWorkout = () => { 
    setPendingFinishedWorkout(activeWorkout);
    setPostWorkoutShareNote(`Just crushed ${activeWorkout.name}! 💪🔥`);
  };

  const finalizeWorkoutSave = (shouldShare) => {
    setWorkoutHistory([{ id: Date.now(), name: pendingFinishedWorkout.name, date: 'Just now', notes: 'Completed.' }, ...workoutHistory]); 
    
    if (shouldShare) {
      const newPost = {
        id: Date.now(),
        user: currentUser.name,
        avatar: currentUser.avatar,
        time: 'Just now',
        type: 'friend',
        location: currentUser.location || 'Metro Gym',
        content: postWorkoutShareNote
      };
      setPosts([newPost, ...posts]);
    }

    setActiveWorkout(null); 
    setPendingFinishedWorkout(null);
    setActiveTab('dashboard'); 
  };
  
  const cycleSetType = (exIndex, setIndex) => {
    const types = ['warmup', 'working', 'dropset'];
    const updated = { ...activeWorkout };
    updated.exercises[exIndex].sets[setIndex].type = types[(types.indexOf(updated.exercises[exIndex].sets[setIndex].type) + 1) % types.length];
    setActiveWorkout(updated);
  };
  
  const updateSetField = (eI, sI, field, val) => { const upd = {...activeWorkout}; upd.exercises[eI].sets[sI][field] = val; setActiveWorkout(upd); };
  
  const handleAutoWarmup = (exIndex) => {
    const upd = {...activeWorkout};
    const targetSet = upd.exercises[exIndex].sets.find(s => s.type === 'working');
    const targetW = targetSet ? parseFloat(targetSet.weight) : 135;
    upd.exercises[exIndex].sets.unshift(
      { type: 'warmup', weight: Math.round((targetW * 0.5)/5)*5, reps: '10' },
      { type: 'warmup', weight: Math.round((targetW * 0.75)/5)*5, reps: '5' }
    );
    setActiveWorkout(upd);
  };
  
  const handleAiChat = (e) => {
    e.preventDefault(); if (!chatInput.trim()) return;
    setChatHistory(prev => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');
    setTimeout(() => { setChatHistory(prev => [...prev, { role: 'ai', content: "Got it! Consistency is key. Make sure to log that in your tracker." }]); }, 1000);
  };

  return (
    <div className={`relative flex flex-col md:flex-row h-screen font-sans overflow-hidden ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {uiStyle === 'glass' && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-30 animate-pulse" style={{ backgroundColor: theme.hex }} />
          <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: theme.hex }} />
        </div>
      )}
      
      {/* SIDEBAR */}
      <aside className={`w-64 border-r hidden md:flex flex-col relative z-10 ${headerBase}`}>
        <div className="p-6 flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${theme.bg} text-zinc-950`} style={{ boxShadow: uiStyle === 'glass' ? `0 0 15px ${theme.hex}50` : 'none' }}><Zap size={24} strokeWidth={2.5} /></div>
          <h1 className="text-2xl font-black tracking-tight uppercase italic drop-shadow-sm">VIRTUSFIT</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          <NavButton icon={Home} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} theme={theme} isDarkMode={isDarkMode} uiStyle={uiStyle} />
          <NavButton icon={Activity} label="Start Workout" active={activeTab === 'routines'} onClick={() => setActiveTab('routines')} theme={theme} isDarkMode={isDarkMode} uiStyle={uiStyle} />
          {activeWorkout && <NavButton icon={Play} label="Active Session 🔴" active={activeTab === 'active-session'} onClick={() => setActiveTab('active-session')} theme={theme} isDarkMode={isDarkMode} uiStyle={uiStyle} />}
          <NavButton icon={Dumbbell} label="Exercise Library" active={activeTab === 'library'} onClick={() => setActiveTab('library')} theme={theme} isDarkMode={isDarkMode} uiStyle={uiStyle} />
          <NavButton icon={Target} label="Metrics & Recovery" active={activeTab === 'metrics'} onClick={() => setActiveTab('metrics')} theme={theme} isDarkMode={isDarkMode} uiStyle={uiStyle} />
          <NavButton icon={Trophy} label="PRs & Badges" active={activeTab === 'pr-records'} onClick={() => setActiveTab('pr-records')} theme={theme} isDarkMode={isDarkMode} uiStyle={uiStyle} />
          <NavButton icon={History} label="Workout History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} theme={theme} isDarkMode={isDarkMode} uiStyle={uiStyle} />
          <NavButton icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} theme={theme} isDarkMode={isDarkMode} uiStyle={uiStyle} />
        </nav>
        <div className={`p-4 border-t ${uiStyle === 'glass' ? 'border-white/10' : 'border-zinc-800'}`}>
          <button onClick={() => setCurrentUser(null)} className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/15 transition-colors text-sm font-medium">
            <LogOut size={16} /><span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-30 border-t flex items-center gap-1 overflow-x-auto px-2 py-2 shadow-2xl whitespace-nowrap scrollbar-none ${headerBase}`}>
        <MobileNavButton icon={Home} label="Home" active={activeTab==='dashboard'} onClick={()=>setActiveTab('dashboard')} theme={theme} />
        <MobileNavButton icon={Activity} label="Start" active={activeTab==='routines'} onClick={()=>setActiveTab('routines')} theme={theme} />
        {activeWorkout && <MobileNavButton icon={Play} label="Live" active={activeTab==='active-session'} onClick={()=>setActiveTab('active-session')} theme={theme} />}
        <MobileNavButton icon={Dumbbell} label="Library" active={activeTab==='library'} onClick={()=>setActiveTab('library')} theme={theme} />
        <MobileNavButton icon={Target} label="Metrics" active={activeTab==='metrics'} onClick={()=>setActiveTab('metrics')} theme={theme} />
        <MobileNavButton icon={Trophy} label="PRs" active={activeTab==='pr-records'} onClick={()=>setActiveTab('pr-records')} theme={theme} />
        <MobileNavButton icon={User} label="Profile" active={activeTab==='profile'} onClick={()=>setActiveTab('profile')} theme={theme} />
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto pb-24 md:pb-0 relative z-10">
        <header className={`border-b p-4 flex justify-between items-center sticky top-0 z-20 shadow-sm ${headerBase}`}>
          <h2 className="text-lg md:text-xl font-bold capitalize drop-shadow-sm">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsAIModalOpen(true)} className={`px-3 py-1.5 rounded-xl font-bold text-xs text-zinc-950 transition-colors ${theme.bg} hover:opacity-80 flex items-center gap-1.5 shadow-lg`}><Zap size={14} /> Bianica AI</button>
            <div className={`hidden md:flex items-center gap-1 border px-2 py-1.5 rounded-xl ${inputBase}`}>
              <Layers size={14} className={theme.text} />
              <select value={uiStyle} onChange={(e) => setUiStyle(e.target.value)} className="bg-transparent text-[11px] font-semibold outline-none cursor-pointer"><option value="solid" className="bg-zinc-900 text-white">Solid</option><option value="glass" className="bg-zinc-900 text-white">Liquid Glass</option></select>
            </div>
            <div className={`hidden md:flex items-center gap-1 border px-2 py-1.5 rounded-xl ${inputBase}`}>
              <Palette size={14} className={theme.text} />
              <select value={themeKey} onChange={(e) => setThemeKey(e.target.value)} className="bg-transparent text-[11px] font-semibold outline-none cursor-pointer">
                {Object.entries(THEMES).map(([key, t]) => <option key={key} value={key} className="bg-zinc-900 text-white">{t.name}</option>)}
              </select>
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-xl border ${inputBase}`}><Sun size={14}/></button>
          </div>
        </header>

        <div className="p-4 md:p-6 max-w-4xl mx-auto w-full space-y-6">

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className={`border p-4 rounded-2xl flex flex-col justify-between shadow-xl ${cardBase}`}>
                  <div className="flex justify-between items-start"><p className="text-[10px] font-bold text-zinc-400 uppercase">Readiness</p><Battery size={16} className={readinessScore > 80 ? 'text-emerald-500' : 'text-amber-500'} /></div>
                  <div><p className="text-2xl font-black">{readinessScore}<span className="text-xs text-zinc-500 font-medium">/100</span></p></div>
                </div>
                <div className={`border p-4 rounded-2xl flex flex-col justify-between shadow-xl ${cardBase}`}>
                  <div className="flex justify-between items-start"><p className="text-[10px] font-bold text-zinc-400 uppercase">Streak</p><Flame size={16} className="text-orange-500" /></div>
                  <div><p className="text-2xl font-black">{streakDays} <span className="text-xs text-zinc-500 font-medium">Days</span></p></div>
                </div>
                <div className={`border p-4 rounded-2xl flex flex-col justify-between shadow-xl col-span-2 relative ${cardBase}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase flex items-center gap-1"><Utensils size={12}/> Daily Macros</p>
                    <button onClick={() => setIsMealModalOpen(true)} className={`text-[10px] font-bold px-2 py-1 rounded bg-zinc-950/20 border border-zinc-500/20 hover:text-white ${theme.text}`}>+ Log Meal</button>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1"><span>Protein</span><span className={theme.text}>{Math.round(macros.protein)}g / {macros.pTarget}g</span></div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`}><div className={`h-full ${theme.bg}`} style={{ width: `${Math.min((macros.protein / macros.pTarget) * 100, 100)}%` }} /></div>
                    <div className="flex justify-between text-[9px] text-zinc-400 mt-2"><span>{Math.round(macros.cals)} kcal eaten</span><span>{macros.cTarget} kcal target</span></div>
                  </div>
                </div>
              </div>

              {/* Feed Controls */}
              <div className={`border p-4 rounded-2xl flex gap-2 ${cardBase}`}>
                {['friends', 'nearby', 'leaderboard'].map(f => (
                  <button key={f} onClick={() => setFeedFilter(f)} className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${feedFilter === f ? `${theme.bg} text-zinc-950 shadow-md` : `${inputBase}`}`}>
                    {f === 'leaderboard' ? '🏆 Leaderboard' : f}
                  </button>
                ))}
              </div>

              {/* Feed Content */}
              {feedFilter === 'leaderboard' ? (
                <div className={`border rounded-2xl shadow-xl overflow-hidden ${cardBase}`}>
                  <div className="p-4 border-b border-zinc-800/20 bg-zinc-950/10"><h3 className="font-bold text-sm">📍 Metro Gym - This Month</h3></div>
                  <div className="divide-y divide-zinc-800/20">
                    {['Jordan Vance - 18 Workouts', 'Alex Sterling - 15 Workouts', 'You - 12 Workouts'].map((row, i) => (
                      <div key={i} className="p-4 flex items-center gap-3"><span className={`font-black text-lg ${i===0?'text-yellow-400':i===1?'text-zinc-400':'text-amber-600'}`}>#{i+1}</span><span className="text-sm font-semibold">{row}</span></div>
                    ))}
                  </div>
                </div>
              ) : (
                posts.filter(p => p.type === feedFilter || feedFilter === 'friends').map((post) => (
                  <div key={post.id} className={`border p-5 rounded-2xl shadow-xl space-y-3 ${cardBase}`}>
                    <div className="flex items-center gap-3">
                      <img src={post.avatar} className="w-9 h-9 rounded-full object-cover border border-zinc-700" alt=""/>
                      <div>
                        <h4 className="font-bold text-sm flex items-center gap-2">{post.user} <span className="text-[10px] px-2 py-0.5 rounded-full border bg-zinc-800 text-cyan-400 border-zinc-700">📍 {post.location}</span></h4>
                        <p className="text-[10px] text-zinc-500">{post.time}</p>
                      </div>
                    </div>
                    <p className="text-sm">{post.content}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ROUTINES TAB */}
          {activeTab === 'routines' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2"><Dumbbell size={18} className={theme.text} /> Saved Routines</h3>
                <button onClick={() => setIsNewRoutineModalOpen(true)} className={`px-3 py-2 rounded-xl text-xs font-bold flex gap-1.5 ${theme.bg} text-zinc-950`}><Plus size={14}/> Create Routine</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {routines.map((routine) => (
                  <div key={routine.id} className={`border p-5 rounded-2xl flex flex-col justify-between shadow-xl space-y-4 ${cardBase}`}>
                    <div>
                      <h4 className={`font-bold text-base ${theme.text}`}>{routine.name}</h4>
                      <p className="text-xs text-zinc-400 mt-1">{routine.description}</p>
                      <div className="mt-3 space-y-1">
                        {routine.exercises.map((ex, idx) => <p key={idx} className="text-xs text-zinc-300">• {formatExName(ex)}</p>)}
                      </div>
                    </div>
                    <button onClick={() => startWorkout(routine)} className={`w-full py-2.5 rounded-xl font-bold text-xs text-zinc-950 flex items-center justify-center gap-2 ${theme.bg} hover:opacity-80`}><Play size={14} fill="currentColor" /> Start Workout</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVE SESSION TAB */}
          {activeTab === 'active-session' && activeWorkout && (
            <div className="space-y-6">
              <div className={`p-4 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl ${cardBase}`}>
                <div><span className="text-xs font-bold text-emerald-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live</span><h3 className="text-xl font-black mt-1">{activeWorkout.name}</h3></div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${inputBase}`}>
                    <Timer size={16} className={theme.text}/>
                    <span className="font-mono font-bold text-sm">{timerSeconds > 0 ? `${Math.floor(timerSeconds / 60)}:${('0' + (timerSeconds % 60)).slice(-2)}` : 'Ready'}</span>
                    <button onClick={() => { setTimerSeconds(90); setTimerActive(true); }} className={`px-2 py-0.5 rounded text-[10px] font-bold text-zinc-950 ${theme.bg}`}>90s</button>
                  </div>
                  <button onClick={finishActiveWorkout} className={`px-4 py-2 rounded-xl font-bold text-sm text-zinc-950 flex-1 md:flex-none ${theme.bg}`}>Finish</button>
                </div>
              </div>

              <div className="space-y-4">
                {activeWorkout.exercises.map((ex, exIndex) => (
                  <div key={exIndex} className={`border p-4 rounded-2xl shadow-xl space-y-3 ${cardBase}`}>
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm flex items-center gap-2"><Dumbbell size={15} className={theme.text} /> {formatExName(ex)}</h4>
                      <button onClick={() => handleAutoWarmup(exIndex)} className={`text-[10px] font-bold px-2 py-1 rounded border flex items-center gap-1 ${inputBase} text-amber-400`}><Flame size={12}/> Auto Warm-up</button>
                    </div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-12 gap-1.5 text-[10px] font-semibold text-zinc-500 px-1"><span className="col-span-2">SET</span><span className="col-span-3">TYPE (Tap)</span><span className="col-span-4">LBS</span><span className="col-span-3">REPS</span></div>
                      {ex.sets.map((set, setIndex) => (
                        <div key={setIndex} className="grid grid-cols-12 gap-1.5 items-center">
                          <span className="col-span-2 text-xs font-bold pl-1">#{setIndex + 1}</span>
                          <button onClick={() => cycleSetType(exIndex, setIndex)} className={`col-span-3 text-[9px] px-1 py-1.5 rounded font-bold uppercase ${set.type === 'warmup' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : set.type === 'dropset' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'}`}>{set.type}</button>
                          <div className="col-span-4 relative flex items-center">
                            <input type="number" value={set.weight} onChange={(e) => updateSetField(exIndex, setIndex, 'weight', e.target.value)} className={`w-full border rounded-lg p-1.5 pr-6 text-xs text-center font-bold outline-none ${inputBase}`} />
                            <button onClick={() => setCalcPlateWeight(set.weight)} className="absolute right-1 p-0.5 text-zinc-400 hover:text-white"><Disc size={12}/></button>
                          </div>
                          <input type="number" value={set.reps} onChange={(e) => updateSetField(exIndex, setIndex, 'reps', e.target.value)} className={`col-span-3 border rounded-lg p-1.5 text-xs text-center font-bold outline-none ${inputBase}`} />
                        </div>
                      ))}
                      <button onClick={() => { const u={...activeWorkout}; u.exercises[exIndex].sets.push({type:'working', weight:'135', reps:'10'}); setActiveWorkout(u); }} className={`w-full py-1.5 mt-2 rounded-lg text-[10px] font-bold border ${inputBase}`}>+ Add Set</button>
                    </div>
                  </div>
                ))}

                <div className={`border p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 ${cardBase}`}>
                  <span className="text-xs font-semibold text-zinc-400">Need another movement?</span>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <select 
                      onChange={(e) => { 
                        if(e.target.value) { 
                          const foundEx = exercises.find(item => item.id.toString() === e.target.value);
                          if (foundEx) {
                            const upd = {...activeWorkout};
                            upd.exercises.push({...foundEx, sets: [{ type: 'working', weight: '135', reps: '10' }]});
                            setActiveWorkout(upd);
                          } 
                          e.target.value = ''; 
                        } 
                      }}
                      className={`border rounded-lg p-2 text-xs outline-none flex-1 md:flex-initial ${inputBase}`}
                    >
                      <option value="">+ Add Exercise to Session</option>
                      {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}{ex.brand ? ` (${ex.brand})` : ''}</option>)}
                    </select>
                    <button onClick={() => setIsNewExerciseModalOpen(true)} className={`px-3 py-2 rounded-lg text-xs font-bold text-zinc-950 shadow-md ${theme.bg}`}>+ Create New</button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* EXERCISE LIBRARY TAB */}
          {activeTab === 'library' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2"><Dumbbell size={18} className={theme.text} /> Form Library</h3>
                <button onClick={() => setIsNewExerciseModalOpen(true)} className={`px-3 py-2 rounded-xl text-xs font-bold flex gap-1.5 ${theme.bg} text-zinc-950`}><Plus size={14}/> Add New</button>
              </div>
              <div className={`border rounded-2xl shadow-xl overflow-hidden ${cardBase}`}>
                <ul className="divide-y divide-zinc-800/20">
                  {exercises.map((ex) => (
                    <li key={ex.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg ${theme.bg}/10 flex items-center justify-center ${theme.text}`}><Dumbbell size={16} /></div>
                        <div>
                          <p className="font-semibold text-sm">{formatExName(ex)}</p>
                          <p className="text-[11px] text-zinc-400 mt-0.5"><strong className={theme.text}>Primary:</strong> {ex.muscle} ({ex.equipment})</p>
                        </div>
                      </div>
                      <div className="flex gap-1"><button className={`p-2 rounded-lg border ${inputBase}`}><Edit3 size={13}/></button></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* METRICS & RECOVERY TAB */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div className={`border p-6 rounded-2xl shadow-xl ${cardBase}`}>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><Shield size={18} className={theme.text} /> Muscle Readiness Heatmap</h3>
                <div className="space-y-4">
                  {Object.entries(muscleRecovery).map(([muscle, percent]) => (
                    <div key={muscle}>
                      <div className="flex justify-between text-xs font-bold mb-1"><span>{muscle}</span><span className={percent<50?'text-red-400':percent<80?'text-amber-400':'text-emerald-400'}>{percent}% Recovered</span></div>
                      <div className={`w-full h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`}><div className={`h-full ${percent<50?'bg-red-500':percent<80?'bg-amber-500':'bg-emerald-500'}`} style={{ width: `${percent}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`border p-5 rounded-2xl shadow-xl ${cardBase}`}>
                 <h3 className="text-xs md:text-sm font-bold mb-4 flex items-center gap-2"><Target size={16} className={theme.text} /> Weight Trend</h3>
                 <div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={initialWeightData}><XAxis dataKey="date" stroke="#52525b" tick={{fontSize: 11}} /><YAxis domain={['dataMin - 5', 'dataMax + 5']} stroke="#52525b" tick={{fontSize: 11}} /><Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} /><Line type="monotone" dataKey="weight" stroke={theme.hex} strokeWidth={3} dot={{ r: 5, fill: theme.hex }} /></LineChart></ResponsiveContainer></div>
              </div>
            </div>
          )}

          {/* PRS TAB */}
          {activeTab === 'pr-records' && (
            <div className="space-y-6">
              <div className={`border p-5 rounded-2xl shadow-xl ${cardBase}`}>
                <h3 className="text-base font-bold mb-4 flex items-center gap-2"><Medal size={20} className="text-yellow-400"/> Trophy Room</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[{ title: '1,000lb Club', desc: 'Total > 1000', icon: Hash, c: 'text-purple-400 bg-purple-500/10' }, { title: 'Consistency', desc: '10 in a row', icon: CheckCircle, c: 'text-emerald-400 bg-emerald-500/10' }].map(b => (
                    <div key={b.title} className={`border p-3 rounded-xl flex flex-col items-center text-center ${inputBase}`}><div className={`p-2 rounded-full mb-2 ${b.c}`}><b.icon size={20}/></div><p className="text-xs font-bold">{b.title}</p><p className="text-[9px] text-zinc-400">{b.desc}</p></div>
                  ))}
                </div>
              </div>
              <div className={`border p-5 md:p-6 rounded-2xl shadow-xl ${cardBase}`}>
                <h3 className="text-base font-bold mb-4 flex items-center gap-2"><Trophy size={20} className="text-amber-400" /> Lifetime PRs & 1RM</h3>
                <div className="space-y-3">
                  {Object.entries(personalRecords).map(([exName, data]) => (
                    <div key={exName} className={`border p-4 rounded-xl flex justify-between items-center ${inputBase}`}>
                      <div><p className="font-bold text-sm">{exName}</p><p className="text-[10px] text-zinc-400">{data.weight}lbs x {data.reps}</p></div>
                      <div className="text-right"><span className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Est. 1RM</span><p className={`text-xl font-black ${theme.text}`}>{calculate1RM(data.weight, data.reps)}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className={`border rounded-2xl shadow-xl overflow-hidden ${cardBase}`}>
              <div className="p-4 border-b border-zinc-800/20 bg-zinc-950/10"><h3 className="text-xs font-bold text-zinc-400">Workout Log</h3></div>
              <div className="divide-y divide-zinc-800/20">
                {workoutHistory.map((s) => (
                  <div key={s.id} className="p-4 flex justify-between items-center"><div><h4 className="font-bold text-sm">{s.name}</h4><p className="text-[11px] text-zinc-400">{s.date}</p></div></div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className={`border p-6 rounded-2xl shadow-xl max-w-xl mx-auto space-y-6 ${cardBase}`}>
              <div className="flex items-center gap-4 border-b pb-4 border-zinc-800/20">
                <img src={currentUser.avatar} alt="Profile" className="w-16 h-16 rounded-full border-2 border-cyan-500 object-cover" />
                <div><h3 className="text-lg font-bold">{currentUser.name}</h3><p className="text-xs text-zinc-400">{currentUser.email}</p></div>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); alert('Profile updated successfully!'); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Full Name</label>
                  <input type="text" value={currentUser.name} onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})} className={`w-full border rounded-xl p-2.5 text-sm outline-none ${inputBase}`} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Email Address</label>
                    <input type="email" value={currentUser.email} onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})} className={`w-full border rounded-xl p-2.5 text-sm outline-none ${inputBase}`} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">My Location</label>
                    <input type="text" value={currentUser.location || ''} onChange={(e) => setCurrentUser({...currentUser, location: e.target.value})} className={`w-full border rounded-xl p-2.5 text-sm outline-none ${inputBase}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Update Profile Picture</label>
                  <div className="flex items-center gap-3">
                    <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" id="profile-upload" />
                    <label htmlFor="profile-upload" className={`flex-1 border border-dashed rounded-xl py-2.5 px-3 text-xs text-center cursor-pointer flex items-center justify-center gap-2 font-medium ${inputBase} hover:opacity-80`}>
                      <Upload size={14} /> Browse Device Storage
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button type="submit" className={`flex-1 py-3 rounded-xl font-bold text-sm text-zinc-950 ${theme.bg} shadow-lg hover:opacity-80`}>Save Changes 💾</button>
                  <button type="button" onClick={() => setCurrentUser(null)} className="px-4 py-3 bg-red-500/15 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold hover:bg-red-500/25">Log Out</button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* --- MODALS --- */}

      {/* POST-WORKOUT SHARE MODAL PROMPT */}
      {pendingFinishedWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className={`border rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 ${cardBase} ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
            <h3 className="text-lg font-bold flex items-center gap-2"><Share2 size={18} className={theme.text}/> Workout Complete! 🎉</h3>
            <p className="text-xs text-zinc-400">Would you like to post your session to the community feed so friends and athletes at <strong className="text-white">{currentUser.location || 'Metro Gym'}</strong> can see?</p>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold">Custom Post Message</label>
              <textarea 
                value={postWorkoutShareNote} 
                onChange={(e) => setPostWorkoutShareNote(e.target.value)} 
                className={`w-full border rounded-xl p-3 text-xs outline-none min-h-[70px] ${inputBase}`} 
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={() => finalizeWorkoutSave(false)} className={`flex-1 py-3 rounded-xl font-bold text-xs border ${inputBase} hover:opacity-80`}>Save Privately</button>
              <button onClick={() => finalizeWorkoutSave(true)} className={`flex-1 py-3 rounded-xl font-bold text-xs text-zinc-950 ${theme.bg} shadow-lg hover:opacity-80`}>Share to Feed 🚀</button>
            </div>
          </div>
        </div>
      )}

      {/* MEAL TRACKER MODAL */}
      <MealTrackerModal 
        isOpen={isMealModalOpen} 
        onClose={() => setIsMealModalOpen(false)} 
        theme={theme} 
        isDarkMode={isDarkMode} 
        cardBase={cardBase} 
        inputBase={inputBase}
        meals={meals}
        setMeals={setMeals}
        macros={macros}
        setMacros={setMacros}
      />

      {/* BIANICA AI MODAL */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className={`border rounded-2xl w-full max-w-lg shadow-2xl flex flex-col h-[80vh] ${cardBase} ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
            <div className="p-4 border-b border-zinc-800">
              <div className="flex justify-between items-center mb-4"><h2 className="text-lg font-black italic flex items-center gap-2"><Zap size={20} className={theme.text}/> BIANICA AI</h2><button onClick={()=>setIsAIModalOpen(false)} className="text-zinc-400">✕</button></div>
              <div className="flex gap-2">
                <button onClick={() => setAiView('chat')} className={`flex-1 py-2 rounded-lg text-xs font-bold ${aiView === 'chat' ? `${theme.bg} text-zinc-950` : inputBase}`}>💬 Chat</button>
                <button onClick={() => setAiView('routine')} className={`flex-1 py-2 rounded-lg text-xs font-bold ${aiView === 'routine' ? `${theme.bg} text-zinc-950` : inputBase}`}>⚡ Routine Gen</button>
              </div>
            </div>
            {aiView === 'chat' ? (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? `${theme.bg} text-zinc-950 rounded-br-sm` : `${inputBase} rounded-bl-sm border`}`}>
                        {msg.role === 'ai' && <p className={`text-[10px] font-black mb-1 ${theme.text}`}>BIANICA</p>}{msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="p-4 border-t border-zinc-800"><form onSubmit={handleAiChat} className="flex gap-2"><input type="text" value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Ask anything..." className={`flex-1 border rounded-xl py-3 px-4 text-sm outline-none ${inputBase}`} /><button type="submit" className={`p-3 rounded-xl text-zinc-950 ${theme.bg}`}><Send size={18}/></button></form></div>
              </>
            ) : (
              <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                <p className="text-xs text-zinc-400">Let Bianica build your perfect split.</p>
                <button onClick={() => { setRoutines([...routines, { id: Date.now(), name: 'AI Gen: Hypertrophy', description:'Built by Bianica', exercises:[{ id: 101, name: 'Barbell Bench Press', brand: 'Rogue', sets: [{ type: 'working', weight: '135', reps: '10' }] }] }]); setIsAIModalOpen(false); alert('Routine Added!'); }} className={`w-full py-4 rounded-xl font-black text-sm text-zinc-950 ${theme.bg}`}>Generate Program ⚡</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PLATE CALCULATOR MODAL */}
      {calcPlateWeight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className={`border rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4 ${cardBase}`}>
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-zinc-800 pb-2"><Disc size={18} className={theme.text}/> Load the Bar ({calcPlateWeight} lbs)</h3>
            <div className="space-y-3 pt-2">
              <p className="text-xs text-zinc-400">Plates on <strong className="text-white">EACH SIDE</strong> of a 45lb bar:</p>
              {Object.entries(calculatePlates(calcPlateWeight)).map(([plate, count]) => (
                <div key={plate} className={`flex justify-between items-center p-3 rounded-lg border ${inputBase}`}><span className="font-black text-lg">{plate}</span><span className={`px-3 py-1 rounded font-bold text-zinc-950 ${theme.bg}`}>x {count}</span></div>
              ))}
            </div>
            <button onClick={() => setCalcPlateWeight(null)} className={`w-full mt-4 py-2.5 rounded-xl font-bold text-xs border ${inputBase}`}>Close</button>
          </div>
        </div>
      )}

      {/* NEW ROUTINE MODAL */}
      {isNewRoutineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className={`border rounded-2xl w-full max-w-md p-6 shadow-2xl ${cardBase}`}>
            <h3 className="text-lg font-bold mb-4">Create New Routine</h3>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const selectedExercises = newRoutineForm.selectedExIds.map(id => {
                const baseEx = exercises.find(ex => ex.id.toString() === id);
                return { ...baseEx, sets: [{ type: 'working', weight: '135', reps: '10' }] };
              });
              setRoutines([...routines, { id: Date.now(), name: newRoutineForm.name, description: newRoutineForm.description, exercises: selectedExercises }]); 
              setIsNewRoutineModalOpen(false); 
              setNewRoutineForm({ name: '', description: '', selectedExIds: [] });
            }}>
              <div className="space-y-3 mb-4">
                <div><label className="block text-xs font-bold mb-1">Routine Name</label><input type="text" value={newRoutineForm.name} onChange={e => setNewRoutineForm({...newRoutineForm, name: e.target.value})} className={`w-full border rounded-xl p-3 text-sm outline-none ${inputBase}`} required /></div>
                <div><label className="block text-xs font-bold mb-1">Description</label><input type="text" value={newRoutineForm.description} onChange={e => setNewRoutineForm({...newRoutineForm, description: e.target.value})} className={`w-full border rounded-xl p-3 text-sm outline-none ${inputBase}`} /></div>
                <div>
                  <label className="block text-xs font-bold mb-1">Add Exercises</label>
                  <select onChange={e => {
                      if(e.target.value && !newRoutineForm.selectedExIds.includes(e.target.value)) {
                        setNewRoutineForm({...newRoutineForm, selectedExIds: [...newRoutineForm.selectedExIds, e.target.value]});
                      }
                      e.target.value = '';
                    }} 
                    className={`w-full border rounded-xl p-3 text-sm outline-none ${inputBase}`}
                  >
                    <option value="">+ Select an exercise...</option>
                    {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}{ex.brand ? ` (${ex.brand})` : ''}</option>)}
                  </select>
                </div>
                <div className="space-y-1 mt-2">
                  {newRoutineForm.selectedExIds.map(id => {
                    const ex = exercises.find(e => e.id.toString() === id);
                    return ex && <div key={id} className={`flex justify-between items-center p-2 rounded-lg border text-xs ${inputBase}`}><span>{formatExName(ex)}</span><button type="button" onClick={() => setNewRoutineForm({...newRoutineForm, selectedExIds: newRoutineForm.selectedExIds.filter(i => i !== id)})} className="text-red-400">Remove</button></div>;
                  })}
                </div>
              </div>
              <div className="flex gap-2"><button type="button" onClick={()=>setIsNewRoutineModalOpen(false)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${inputBase}`}>Cancel</button><button type="submit" className={`flex-1 ${theme.bg} text-zinc-950 py-2.5 rounded-xl text-xs font-bold`}>Save Routine</button></div>
            </form>
          </div>
        </div>
      )}

      {/* NEW EXERCISE MODAL */}
      {isNewExerciseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className={`border rounded-2xl w-full max-w-md p-6 shadow-2xl ${cardBase}`}>
            <h3 className="text-lg font-bold mb-4">Add Custom Exercise</h3>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const newEx = { id: Date.now(), name: newExForm.name, brand: newExForm.brand, muscle: newExForm.muscle, secondaryMuscles: newExForm.secondary, equipment: newExForm.equipment, description: newExForm.description };
              setExercises([...exercises, newEx]); 
              if (activeTab === 'active-session' && activeWorkout) {
                 const upd = {...activeWorkout};
                 upd.exercises.push({...newEx, sets: [{ type: 'working', weight: '135', reps: '10' }]});
                 setActiveWorkout(upd);
              }
              setIsNewExerciseModalOpen(false); 
              setNewExForm({ name: '', brand: '', muscle: '', secondary: '', equipment: 'Barbell', description: '' });
            }}>
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-bold mb-1">Name</label><input type="text" value={newExForm.name} onChange={e=>setNewExForm({...newExForm, name: e.target.value})} className={`w-full border rounded-xl p-2.5 text-sm outline-none ${inputBase}`} required /></div>
                  <div><label className="block text-xs font-bold mb-1">Brand (Machine Name)</label><input type="text" value={newExForm.brand} onChange={e=>setNewExForm({...newExForm, brand: e.target.value})} placeholder="e.g. Rogue" className={`w-full border rounded-xl p-2.5 text-sm outline-none ${inputBase}`} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-bold mb-1">Primary Muscle</label><input type="text" value={newExForm.muscle} onChange={e=>setNewExForm({...newExForm, muscle: e.target.value})} className={`w-full border rounded-xl p-2.5 text-sm outline-none ${inputBase}`} required /></div>
                  <div><label className="block text-xs font-bold mb-1">Secondary</label><input type="text" value={newExForm.secondary} onChange={e=>setNewExForm({...newExForm, secondary: e.target.value})} className={`w-full border rounded-xl p-2.5 text-sm outline-none ${inputBase}`} /></div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Equipment</label>
                  <select value={newExForm.equipment} onChange={e=>setNewExForm({...newExForm, equipment: e.target.value})} className={`w-full border rounded-xl p-2.5 text-sm outline-none ${inputBase}`}>
                    <option className="bg-zinc-900 text-white">Barbell</option><option className="bg-zinc-900 text-white">Dumbbell</option><option className="bg-zinc-900 text-white">Machine</option><option className="bg-zinc-900 text-white">Cable</option><option className="bg-zinc-900 text-white">Bodyweight</option>
                  </select>
                </div>
                <div><label className="block text-xs font-bold mb-1">Instructions / Cues</label><textarea value={newExForm.description} onChange={e=>setNewExForm({...newExForm, description: e.target.value})} className={`w-full border rounded-xl p-2.5 text-sm outline-none min-h-[60px] ${inputBase}`} /></div>
              </div>
              <div className="flex gap-2"><button type="button" onClick={()=>setIsNewExerciseModalOpen(false)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${inputBase}`}>Cancel</button><button type="submit" className={`flex-1 ${theme.bg} text-zinc-950 py-2.5 rounded-xl text-xs font-bold`}>Save Exercise</button></div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick, theme, isDarkMode, uiStyle }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${active ? `${theme.bg}/20 ${theme.text}` : 'text-zinc-400 hover:bg-white/10'}`}>
      <Icon size={20} className={active ? theme.text : 'text-zinc-500'} /><span>{label}</span>
    </button>
  );
}
function MobileNavButton({ icon: Icon, label, active, onClick, theme }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center min-w-[64px] px-3 py-1.5 rounded-xl transition-all ${active ? `${theme.bg} text-zinc-950 font-bold shadow-lg` : 'text-zinc-400'}`}>
      <Icon size={18} /><span className="text-[10px] mt-1 tracking-tight">{label}</span>
    </button>
  );
}