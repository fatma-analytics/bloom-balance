import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { Card, Pill, PrimaryButton, ProgressBar, SectionTitle } from "@/components/bloom-ui";
import { ScreenContainer } from "@/components/screen-container";
import { moodMeta, getCompletionRate, getEncouragementMessage, getFocusTasks } from "@/lib/bloom-data";
import { useBloomStore } from "@/lib/bloom-store";
import { haptic } from "@/lib/haptics";

export default function HomeScreen() {
  const { state, hydrated, toggleRoutine, toggleTask } = useBloomStore();

  if (!hydrated) {
    return (
      <ScreenContainer className="px-5 pt-4">
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-muted">On remet un peu d’ordre avec style…</Text>
        </View>
      </ScreenContainer>
    );
  }

  const mood = moodMeta[state.mood];
  const progress = getCompletionRate(state);
  const message = getEncouragementMessage(state);
  const topTasks = getFocusTasks(state.tasks).slice(0, 3);
  const nextRoutine = state.routines.find((item) => !item.completed);

  return (
    <ScreenContainer className="px-5 pt-4">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <View className="gap-4">
          <View className="gap-2">
            <Text className="text-sm font-semibold uppercase tracking-[2px] text-primary">Bloom Balance</Text>
            <Text className="text-3xl font-semibold leading-10 text-foreground">Ton coin pour remettre de l’ordre dans ta tête et dans ta vraie vie.</Text>
            <Text className="text-base leading-6 text-muted">Girly, tendre, un peu drôle, mais surtout utile quand la journée part dans tous les sens.</Text>
          </View>

          <Card className="gap-4 bg-primary">
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1 gap-2">
                <Text className="text-sm font-semibold uppercase tracking-[1.8px] text-white/80">Message du moment</Text>
                <Text className="text-2xl font-semibold leading-8 text-white">{message}</Text>
              </View>
              <View className="rounded-full bg-white/20 px-3 py-2">
                <Text className="text-lg">{mood.emoji}</Text>
              </View>
            </View>
            <View className="gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-white/90">Progression du jour</Text>
                <Text className="text-sm font-semibold text-white">{progress}%</Text>
              </View>
              <View className="rounded-full bg-white/20 p-1">
                <ProgressBar value={progress} />
              </View>
            </View>
          </Card>

          <Card className="gap-4">
            <SectionTitle title="État du jour" subtitle={mood.subtitle} />
            <View className="flex-row flex-wrap gap-2">
              <Pill label={`Humeur : ${mood.label}`} active />
              <Pill label={`Énergie : ${state.energy}/5`} />
              <Pill label={`Mode : ${state.funnyMode === "soft" ? "doux" : "sparkly"}`} />
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1 rounded-[24px] bg-background p-4">
                <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-muted">Mental</Text>
                <Text className="mt-2 text-base font-semibold text-foreground">{state.brainDump ? "Tu as vidé un peu ta tête aujourd’hui." : "Ton cerveau attend son mini débrief."}</Text>
              </View>
              <View className="flex-1 rounded-[24px] bg-background p-4">
                <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-muted">Physique</Text>
                <Text className="mt-2 text-base font-semibold text-foreground">{state.routines.filter((item) => item.completed).length} routine(s) cochée(s). Corps et dignité en progression.</Text>
              </View>
            </View>
          </Card>

          <Card className="gap-4">
            <SectionTitle title="Action simple maintenant" subtitle="Quand tout paraît flou, on choisit un seul petit mouvement utile." />
            {nextRoutine ? (
              <View className="gap-3 rounded-[24px] bg-background p-4">
                <Text className="text-base font-semibold text-foreground">{nextRoutine.title}</Text>
                <Text className="text-sm leading-5 text-muted">{nextRoutine.description}</Text>
                <PrimaryButton
                  label="Je le fais maintenant"
                  onPress={() => {
                    haptic.success();
                    toggleRoutine(nextRoutine.id);
                  }}
                />
              </View>
            ) : (
              <View className="rounded-[24px] bg-background p-4">
                <Text className="text-base font-semibold text-foreground">Tu as déjà coché toutes tes routines du jour. Icône mentale de championne discrète.</Text>
              </View>
            )}
          </Card>

          <Card className="gap-4">
            <View className="flex-row items-center justify-between gap-3">
              <SectionTitle title="Missions prioritaires" subtitle="Le minimum utile, pas la liste qui culpabilise." />
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                  haptic.light();
                  router.push("/(tabs)/plan");
                }}
              >
                <Text className="font-semibold text-primary">Voir tout</Text>
              </TouchableOpacity>
            </View>
            <View className="gap-3">
              {topTasks.map((task) => (
                <TouchableOpacity
                  key={task.id}
                  activeOpacity={0.84}
                  onPress={() => {
                    haptic.success();
                    toggleTask(task.id);
                  }}
                  className="rounded-[24px] bg-background p-4"
                >
                  <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1 gap-2">
                      <Text className="text-base font-semibold text-foreground">{task.title}</Text>
                      <Pill label={task.priority === "focus" ? "Mission du moment" : "À faire sans drame"} active={task.priority === "focus"} />
                    </View>
                    <Text className="text-lg">{task.completed ? "✅" : "○"}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
