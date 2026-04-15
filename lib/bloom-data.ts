export type MoodKey = "floue" | "ok" | "rayonnante" | "saturee";
export type EnergyKey = 1 | 2 | 3 | 4 | 5;

export interface RoutineItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  priority: "douce" | "focus";
  completed: boolean;
}

export interface BloomState {
  mood: MoodKey;
  energy: EnergyKey;
  brainDump: string;
  weeklyGoal: string;
  funnyMode: "soft" | "sparkly";
  routines: RoutineItem[];
  tasks: TaskItem[];
}

export const moodMeta: Record<MoodKey, { emoji: string; label: string; subtitle: string }> = {
  floue: {
    emoji: "☁️",
    label: "Floue",
    subtitle: "Ton cerveau ouvre 47 onglets en même temps.",
  },
  ok: {
    emoji: "🌷",
    label: "Stable",
    subtitle: "Tu tiens la journée, et c’est déjà chic.",
  },
  rayonnante: {
    emoji: "✨",
    label: "Rayonnante",
    subtitle: "Tu as de l’élan, profite de cette aura.",
  },
  saturee: {
    emoji: "🫠",
    label: "Saturée",
    subtitle: "On évite le drame, on choisit juste l’essentiel.",
  },
};

export const energyLabels: Record<EnergyKey, string> = {
  1: "Batterie dramatique",
  2: "Très moyenne",
  3: "Ça tient",
  4: "Bonne vibe",
  5: "Machine douce mais efficace",
};

export const defaultState: BloomState = {
  mood: "ok",
  energy: 3,
  brainDump: "",
  weeklyGoal: "Retrouver un rythme doux et tenable.",
  funnyMode: "sparkly",
  routines: [
    {
      id: "water",
      title: "Boire un grand verre d’eau",
      description: "Hydratation d’abord, chaos ensuite.",
      completed: false,
    },
    {
      id: "move",
      title: "Bouger 10 minutes",
      description: "Une mini mise à jour corporelle.",
      completed: false,
    },
    {
      id: "reset-space",
      title: "Ranger un mini espace",
      description: "Un coin propre, une tête plus claire.",
      completed: false,
    },
    {
      id: "sleep",
      title: "Préparer le soir calmement",
      description: "Ta version de demain mérite un peu d’aide.",
      completed: false,
    },
  ],
  tasks: [
    {
      id: "task-1",
      title: "Choisir la mission la plus utile du jour",
      priority: "focus",
      completed: false,
    },
    {
      id: "task-2",
      title: "Préparer un repas ou une collation correcte",
      priority: "douce",
      completed: false,
    },
  ],
};

const softMessages = {
  floue: [
    "Respire, beauté. On va juste choisir une seule chose à faire.",
    "Si ton cerveau patine, ton cœur peut conduire doucement.",
  ],
  ok: [
    "Tu n’as pas besoin d’être parfaite, juste présente.",
    "Une journée simple peut aussi être une belle journée.",
  ],
  rayonnante: [
    "Tu as de l’élan, alors canalise-le avec grâce.",
    "Aujourd’hui, ton énergie mérite un plan chic.",
  ],
  saturee: [
    "On coupe le bruit. Une action utile suffit.",
    "Tu n’es pas en retard, tu es en récupération élégante.",
  ],
} as const;

const sparklyMessages = {
  floue: [
    "Ton cerveau fait du freestyle, donc on lui met une chorégraphie douce.",
    "Mode brouillard activé : prends une gorgée d’eau et joue la star disciplinée.",
  ],
  ok: [
    "Pas besoin d’un miracle, juste d’un petit move de queen organisée.",
    "Tu tiens le fil, ma belle. Maintenant, tire-le vers quelque chose d’utile.",
  ],
  rayonnante: [
    "Aura élevée, chaos en baisse : quel excellent épisode aujourd’hui.",
    "Tu n’es pas en feu, tu es stratégiquement lumineuse.",
  ],
  saturee: [
    "Si tout semble trop, fais moins mais fais-le avec panache.",
    "Le monde attendra deux minutes pendant que tu redeviens la patronne de ta journée.",
  ],
} as const;

export function getEncouragementMessage(state: BloomState) {
  const collection = state.funnyMode === "soft" ? softMessages : sparklyMessages;
  const messages = collection[state.mood];
  const completedUnits = state.routines.filter((item) => item.completed).length + state.tasks.filter((item) => item.completed).length;
  return messages[completedUnits % messages.length];
}

export function getCompletionRate(state: BloomState) {
  const total = state.routines.length + state.tasks.length;

  if (total === 0) {
    return 0;
  }

  const done = state.routines.filter((item) => item.completed).length + state.tasks.filter((item) => item.completed).length;
  return Math.round((done / total) * 100);
}

export function getFocusTasks(tasks: TaskItem[]) {
  return tasks.filter((task) => !task.completed).sort((a, b) => {
    if (a.priority === b.priority) {
      return a.title.localeCompare(b.title, "fr");
    }

    return a.priority === "focus" ? -1 : 1;
  });
}

export function createTask(title: string, priority: TaskItem["priority"] = "douce"): TaskItem {
  return {
    id: `task-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
    title: title.trim(),
    priority,
    completed: false,
  };
}
