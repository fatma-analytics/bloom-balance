import { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Card, EmptyState, Pill, PrimaryButton, SectionTitle } from "@/components/bloom-ui";
import { ScreenContainer } from "@/components/screen-container";
import { getFocusTasks } from "@/lib/bloom-data";
import { useBloomStore } from "@/lib/bloom-store";
import { haptic } from "@/lib/haptics";

export default function PlanScreen() {
  const { state, hydrated, addTask, toggleTask, removeTask } = useBloomStore();
  const [draft, setDraft] = useState("");
  const [priority, setPriority] = useState<"douce" | "focus">("focus");

  const orderedTasks = useMemo(() => getFocusTasks(state.tasks), [state.tasks]);
  const doneCount = state.tasks.filter((task) => task.completed).length;

  if (!hydrated) {
    return (
      <ScreenContainer className="px-5 pt-4">
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-muted">On prépare ta to-do avec un peu de glitter utile…</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="px-5 pt-4">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="gap-4">
          <SectionTitle title="Plan du jour" subtitle="Une to-do réaliste, priorisée sans te parler comme un général fatigué." />

          <Card className="gap-4">
            <View className="gap-2">
              <Text className="text-sm font-semibold uppercase tracking-[1.5px] text-muted">Ajouter une mission</Text>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                placeholder="Exemple : préparer mes affaires pour demain"
                placeholderTextColor="#A58EA9"
                returnKeyType="done"
                onSubmitEditing={() => {
                  if (!draft.trim()) {
                    return;
                  }

                  haptic.success();
                  addTask(draft, priority);
                  setDraft("");
                }}
                className="rounded-[24px] border border-border bg-background px-4 py-4 text-base text-foreground"
              />
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  haptic.light();
                  setPriority("focus");
                }}
                className={`flex-1 rounded-full px-4 py-3 ${priority === "focus" ? "bg-primary" : "bg-background"}`}
              >
                <Text className={`text-center font-semibold ${priority === "focus" ? "text-white" : "text-foreground"}`}>
                  Mission du moment
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  haptic.light();
                  setPriority("douce");
                }}
                className={`flex-1 rounded-full px-4 py-3 ${priority === "douce" ? "bg-primary" : "bg-background"}`}
              >
                <Text className={`text-center font-semibold ${priority === "douce" ? "text-white" : "text-foreground"}`}>
                  Tâche légère
                </Text>
              </TouchableOpacity>
            </View>
            <PrimaryButton
              label="Ajouter à ma journée"
              onPress={() => {
                if (!draft.trim()) {
                  return;
                }

                haptic.success();
                addTask(draft, priority);
                setDraft("");
              }}
            />
          </Card>

          <Card className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">Ta liste active</Text>
              <Pill label={`${doneCount}/${state.tasks.length} faite(s)`} active />
            </View>
            {orderedTasks.length === 0 ? (
              <EmptyState
                title="Tout est coché"
                subtitle="Ta journée a reçu une petite gifle de structure. Repose ton aura."
              />
            ) : (
              <View className="gap-3">
                {orderedTasks.map((task) => (
                  <View key={task.id} className="rounded-[24px] bg-background p-4">
                    <View className="flex-row items-start gap-3">
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          haptic.success();
                          toggleTask(task.id);
                        }}
                        className={`mt-1 h-7 w-7 items-center justify-center rounded-full border ${task.completed ? "border-success bg-success" : "border-border bg-surface"}`}
                      >
                        <Text className="text-xs text-white">{task.completed ? "✓" : ""}</Text>
                      </TouchableOpacity>
                      <View className="flex-1 gap-2">
                        <Text className={`text-base font-semibold ${task.completed ? "text-muted line-through" : "text-foreground"}`}>
                          {task.title}
                        </Text>
                        <View className="flex-row items-center justify-between gap-3">
                          <Pill label={task.priority === "focus" ? "Focus chic" : "Doucement mais sûrement"} active={task.priority === "focus"} />
                          <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => {
                              haptic.medium();
                              removeTask(task.id);
                            }}
                          >
                            <Text className="font-semibold text-error">Supprimer</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
