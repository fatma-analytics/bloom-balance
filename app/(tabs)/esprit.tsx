import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Card, Pill, PrimaryButton, SectionTitle } from "@/components/bloom-ui";
import { ScreenContainer } from "@/components/screen-container";
import { energyLabels, getEncouragementMessage, moodMeta, MoodKey } from "@/lib/bloom-data";
import { useBloomStore } from "@/lib/bloom-store";
import { haptic } from "@/lib/haptics";

const moodOrder: MoodKey[] = ["floue", "ok", "rayonnante", "saturee"];

export default function EspritScreen() {
  const { state, hydrated, setMood, setEnergy, setBrainDump } = useBloomStore();

  if (!hydrated) {
    return (
      <ScreenContainer className="px-5 pt-4">
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-muted">On ouvre l’espace mental en douceur…</Text>
        </View>
      </ScreenContainer>
    );
  }

  const message = getEncouragementMessage(state);

  return (
    <ScreenContainer className="px-5 pt-4">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="gap-4">
          <SectionTitle title="Espace esprit" subtitle="Tu poses ton humeur, ton énergie et les pensées qui tournent trop fort." />

          <Card className="gap-4 bg-primary">
            <Text className="text-sm font-semibold uppercase tracking-[1.5px] text-white/80">Mini coaching du jour</Text>
            <Text className="text-2xl font-semibold leading-8 text-white">{message}</Text>
            <Text className="text-sm leading-5 text-white/85">Règle officielle : on ne se juge pas, on se recadre avec charme.</Text>
          </Card>

          <Card className="gap-4">
            <SectionTitle title="Comment tu te sens ?" subtitle="Choisis l’état qui colle le plus à ton cerveau aujourd’hui." />
            <View className="gap-3">
              {moodOrder.map((moodKey) => {
                const item = moodMeta[moodKey];
                const active = state.mood === moodKey;

                return (
                  <TouchableOpacity
                    key={moodKey}
                    activeOpacity={0.84}
                    onPress={() => {
                      haptic.selection?.();
                      haptic.light();
                      setMood(moodKey);
                    }}
                    className={`rounded-[24px] border px-4 py-4 ${active ? "border-primary bg-primary/10" : "border-border bg-background"}`}
                  >
                    <View className="flex-row items-start gap-3">
                      <Text className="text-2xl">{item.emoji}</Text>
                      <View className="flex-1 gap-1">
                        <Text className={`text-base font-semibold ${active ? "text-primary" : "text-foreground"}`}>{item.label}</Text>
                        <Text className="text-sm leading-5 text-muted">{item.subtitle}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>

          <Card className="gap-4">
            <SectionTitle title="Niveau d’énergie" subtitle="Pas pour te juger, juste pour adapter tes attentes avec intelligence." />
            <View className="gap-3">
              <View className="flex-row justify-between gap-2">
                {[1, 2, 3, 4, 5].map((level) => {
                  const active = state.energy === level;

                  return (
                    <TouchableOpacity
                      key={level}
                      activeOpacity={0.84}
                      onPress={() => {
                        haptic.light();
                        setEnergy(level as 1 | 2 | 3 | 4 | 5);
                      }}
                      className={`h-14 flex-1 items-center justify-center rounded-[20px] ${active ? "bg-primary" : "bg-background"}`}
                    >
                      <Text className={`text-base font-semibold ${active ? "text-white" : "text-foreground"}`}>{level}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Pill label={energyLabels[state.energy]} active />
            </View>
          </Card>

          <Card className="gap-4">
            <SectionTitle title="Brain dump" subtitle="Écris ce qui tourne dans ta tête. Pas besoin que ce soit élégant, juste honnête." />
            <TextInput
              multiline
              value={state.brainDump}
              onChangeText={setBrainDump}
              placeholder="Exemple : j’ai trop de choses en tête, je veux commencer par une seule qui me soulage vraiment"
              placeholderTextColor="#A58EA9"
              textAlignVertical="top"
              className="min-h-[150px] rounded-[24px] border border-border bg-background px-4 py-4 text-base leading-6 text-foreground"
            />
            <PrimaryButton
              label="Sauver ma note mentale"
              onPress={() => {
                haptic.success();
                setBrainDump(state.brainDump);
              }}
            />
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
