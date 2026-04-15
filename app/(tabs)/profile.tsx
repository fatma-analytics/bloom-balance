import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Card, Pill, SectionTitle } from "@/components/bloom-ui";
import { ScreenContainer } from "@/components/screen-container";
import { getCompletionRate } from "@/lib/bloom-data";
import { useBloomStore } from "@/lib/bloom-store";
import { haptic } from "@/lib/haptics";

export default function ProfileScreen() {
  const { state, hydrated, setFunnyMode, setWeeklyGoal } = useBloomStore();

  if (!hydrated) {
    return (
      <ScreenContainer className="px-5 pt-4">
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-muted">On prépare ton espace perso…</Text>
        </View>
      </ScreenContainer>
    );
  }

  const completedRoutines = state.routines.filter((item) => item.completed).length;
  const completedTasks = state.tasks.filter((item) => item.completed).length;
  const completion = getCompletionRate(state);

  return (
    <ScreenContainer className="px-5 pt-4">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="gap-4">
          <SectionTitle title="Moi" subtitle="Tu ajustes le ton, ton cap de la semaine et la façon dont l’application t’accompagne." />

          <Card className="gap-4 bg-primary">
            <Text className="text-sm font-semibold uppercase tracking-[1.5px] text-white/80">Résumé rapide</Text>
            <Text className="text-3xl font-semibold text-white">{completion}%</Text>
            <Text className="text-sm leading-5 text-white/90">de progression globale entre tes routines physiques et tes actions concrètes.</Text>
            <View className="flex-row flex-wrap gap-2">
              <Pill label={`${completedRoutines} routines validées`} active />
              <Pill label={`${completedTasks} tâches complétées`} active />
            </View>
          </Card>

          <Card className="gap-4">
            <SectionTitle title="Style de soutien" subtitle="Choisis le degré de douceur ou de sparkle dans les messages motivants." />
            <View className="flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.84}
                onPress={() => {
                  haptic.light();
                  setFunnyMode("soft");
                }}
                className={`flex-1 rounded-[24px] px-4 py-4 ${state.funnyMode === "soft" ? "bg-primary" : "bg-background"}`}
              >
                <Text className={`text-center text-base font-semibold ${state.funnyMode === "soft" ? "text-white" : "text-foreground"}`}>
                  Doux et rassurant
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.84}
                onPress={() => {
                  haptic.light();
                  setFunnyMode("sparkly");
                }}
                className={`flex-1 rounded-[24px] px-4 py-4 ${state.funnyMode === "sparkly" ? "bg-primary" : "bg-background"}`}
              >
                <Text className={`text-center text-base font-semibold ${state.funnyMode === "sparkly" ? "text-white" : "text-foreground"}`}>
                  Funny et sparkly
                </Text>
              </TouchableOpacity>
            </View>
          </Card>

          <Card className="gap-4">
            <SectionTitle title="Objectif de la semaine" subtitle="Un cap simple et réaliste pour garder une cohérence sans t’épuiser." />
            <TextInput
              value={state.weeklyGoal}
              onChangeText={setWeeklyGoal}
              placeholder="Exemple : retrouver un matin plus calme et une chambre plus rangée"
              placeholderTextColor="#A58EA9"
              multiline
              textAlignVertical="top"
              className="min-h-[120px] rounded-[24px] border border-border bg-background px-4 py-4 text-base leading-6 text-foreground"
            />
            <Text className="text-sm leading-5 text-muted">Le cap n’a pas besoin d’être spectaculaire. Il doit juste t’aider à mieux te retrouver dans ta vraie vie.</Text>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
