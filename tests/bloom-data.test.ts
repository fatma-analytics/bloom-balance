import { describe, expect, it } from "vitest";

import { createTask, defaultState, getCompletionRate, getEncouragementMessage, getFocusTasks } from "../lib/bloom-data";

describe("bloom-data helpers", () => {
  it("calcule la progression globale à partir des routines et tâches complétées", () => {
    const progress = getCompletionRate({
      ...defaultState,
      routines: [
        { ...defaultState.routines[0], completed: true },
        { ...defaultState.routines[1], completed: false },
      ],
      tasks: [
        { ...defaultState.tasks[0], completed: true },
        { ...defaultState.tasks[1], completed: false },
      ],
    });

    expect(progress).toBe(50);
  });

  it("retourne un message adapté au mode sparkly et à l’humeur", () => {
    const message = getEncouragementMessage({
      ...defaultState,
      mood: "rayonnante",
      funnyMode: "sparkly",
      routines: defaultState.routines.map((item, index) => ({
        ...item,
        completed: index === 0,
      })),
      tasks: defaultState.tasks,
    });

    expect([
      "Aura élevée, chaos en baisse : quel excellent épisode aujourd’hui.",
      "Tu n’es pas en feu, tu es stratégiquement lumineuse.",
    ]).toContain(message);
  });

  it("met les tâches focus en premier et ignore celles déjà terminées", () => {
    const tasks = getFocusTasks([
      { id: "1", title: "b task", priority: "douce", completed: false },
      { id: "2", title: "a task", priority: "focus", completed: false },
      { id: "3", title: "done task", priority: "focus", completed: true },
    ]);

    expect(tasks.map((task) => task.id)).toEqual(["2", "1"]);
  });

  it("crée une tâche nettoyée avec une priorité par défaut", () => {
    const task = createTask("  préparer mon sac  ");

    expect(task.title).toBe("préparer mon sac");
    expect(task.priority).toBe("douce");
    expect(task.completed).toBe(false);
  });
});
