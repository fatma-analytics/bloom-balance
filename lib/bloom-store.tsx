import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  BloomState,
  EnergyKey,
  MoodKey,
  TaskItem,
  createTask,
  defaultState,
} from "@/lib/bloom-data";

const STORAGE_KEY = "bloom-balance-state-v1";

interface BloomStoreValue {
  state: BloomState;
  hydrated: boolean;
  setMood: (mood: MoodKey) => void;
  setEnergy: (energy: EnergyKey) => void;
  setBrainDump: (text: string) => void;
  toggleRoutine: (id: string) => void;
  addTask: (title: string, priority?: TaskItem["priority"]) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  setWeeklyGoal: (goal: string) => void;
  setFunnyMode: (mode: BloomState["funnyMode"]) => void;
}

const BloomStoreContext = createContext<BloomStoreValue | null>(null);

export function BloomProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BloomState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadState() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);

        if (raw && mounted) {
          const parsed = JSON.parse(raw) as Partial<BloomState>;
          setState({
            ...defaultState,
            ...parsed,
            routines: parsed.routines ?? defaultState.routines,
            tasks: parsed.tasks ?? defaultState.tasks,
          });
        }
      } catch {
        if (mounted) {
          setState(defaultState);
        }
      } finally {
        if (mounted) {
          setHydrated(true);
        }
      }
    }

    loadState();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined);
  }, [hydrated, state]);

  const value = useMemo<BloomStoreValue>(
    () => ({
      state,
      hydrated,
      setMood: (mood) => setState((current) => ({ ...current, mood })),
      setEnergy: (energy) => setState((current) => ({ ...current, energy })),
      setBrainDump: (brainDump) => setState((current) => ({ ...current, brainDump })),
      toggleRoutine: (id) =>
        setState((current) => ({
          ...current,
          routines: current.routines.map((routine) =>
            routine.id === id ? { ...routine, completed: !routine.completed } : routine,
          ),
        })),
      addTask: (title, priority = "douce") => {
        const cleanTitle = title.trim();

        if (!cleanTitle) {
          return;
        }

        setState((current) => ({
          ...current,
          tasks: [createTask(cleanTitle, priority), ...current.tasks],
        }));
      },
      toggleTask: (id) =>
        setState((current) => ({
          ...current,
          tasks: current.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        })),
      removeTask: (id) =>
        setState((current) => ({
          ...current,
          tasks: current.tasks.filter((task) => task.id !== id),
        })),
      setWeeklyGoal: (weeklyGoal) => setState((current) => ({ ...current, weeklyGoal })),
      setFunnyMode: (funnyMode) => setState((current) => ({ ...current, funnyMode })),
    }),
    [hydrated, state],
  );

  return <BloomStoreContext.Provider value={value}>{children}</BloomStoreContext.Provider>;
}

export function useBloomStore() {
  const context = useContext(BloomStoreContext);

  if (!context) {
    throw new Error("useBloomStore must be used inside BloomProvider");
  }

  return context;
}
