import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Card, Pill, ProgressBar, SectionTitle } from "@/components/bloom-ui";
import { ScreenContainer } from "@/components/screen-container";
import { getCompletionRate } from "@/lib/bloom-data";
import { useBloomStore } from "@/lib/bloom-store";
import { haptic } from "@/lib/haptics";

export default function RoutineScreen() {
  const { state, hydrated, toggleRoutine } = useBloomStore();

  if (!hydrated) {
    return (
      <ScreenContainer className="px-5 pt-4">
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-muted">On remet ton corps dans la conversation…</Text>
        </View>
      </ScreenContainer>
    );
  }

  const routineCompletion = state.routines.length
    ? Math.round((state.routines.filter((item) => item.completed).length / state.routines.length) * 100)
    : 0;
  const globalCompletion = getCompletionRate(state);

  return (
    <ScreenContainer className="px-5 pt-4">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="gap-4">
          <SectionTitle title="Routine physique" subtitle="Des gestes très simples pour aider ton corps à soutenir ta tête." />

          <Card className="gap-4">
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-1 gap-2">
                <Text className="text-lg font-semibold text-foreground">Ancrage du jour</Text>
                <Text className="text-sm leading-5 text-muted">Le but n’est pas la performance, mais une vraie base physique qui t’aide à tenir.</Text>
              </View>
              <Pill label={`${routineCompletion}%`} active />
            </View>
            <View className="gap-2">
              <ProgressBar value={routineCompletion} />
              <Text className="text-sm text-muted">Progression totale de l’application : {globalCompletion}%</Text>
            </View>
          </Card>

          <View className="gap-3">
            {state.routines.map((routine) => (
              <TouchableOpacity
                key={routine.id}
                activeOpacity={0.85}
                onPress={() => {
                  if (routine.completed) {
                    haptic.light();
                  } else {
                    haptic.success();
                  }
                  toggleRoutine(routine.id);
                }}
                className={`rounded-[28px] border px-4 py-4 ${routine.completed ? "border-success bg-success/15" : "border-border bg-surface"}`}
              >
                <View className="flex-row items-start gap-3">
                  <View className={`mt-1 h-8 w-8 items-center justify-center rounded-full ${routine.completed ? "bg-success" : "bg-background"}`}>
                    <Text className={`font-semibold ${routine.completed ? "text-white" : "text-muted"}`}>{routine.completed ? "✓" : "○"}</Text>
                  </View>
                  <View className="flex-1 gap-2">
                    <Text className={`text-base font-semibold ${routine.completed ? "text-foreground" : "text-foreground"}`}>{routine.title}</Text>
                    <Text className="text-sm leading-5 text-muted">{routine.description}</Text>
                    <Pill label={routine.completed ? "Validé, quelle discipline chic" : "À faire quand tu peux"} active={routine.completed} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
