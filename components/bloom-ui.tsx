import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { cn } from "@/lib/utils";

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View className="gap-1">
      <Text className="text-[22px] font-semibold text-foreground">{title}</Text>
      {subtitle ? <Text className="text-sm leading-5 text-muted">{subtitle}</Text> : null}
    </View>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <View className={cn("rounded-[28px] border border-border bg-surface p-5", className)}>{children}</View>;
}

export function Pill({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <View className={cn("rounded-full px-3 py-2", active ? "bg-primary/15" : "bg-background")}>
      <Text className={cn("text-xs font-semibold", active ? "text-primary" : "text-muted")}>{label}</Text>
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  subtle = false,
}: {
  label: string;
  onPress: () => void;
  subtle?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={onPress}
      className={cn(
        "items-center justify-center rounded-full px-4 py-3",
        subtle ? "bg-background" : "bg-primary",
      )}
    >
      <Text className={cn("font-semibold", subtle ? "text-foreground" : "text-white")}>{label}</Text>
    </TouchableOpacity>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <View className="h-3 overflow-hidden rounded-full bg-background">
      <View className="h-3 rounded-full bg-primary" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
    </View>
  );
}

export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Card className="items-center gap-2 bg-background">
      <Text className="text-base font-semibold text-foreground">{title}</Text>
      <Text className="text-center text-sm leading-5 text-muted">{subtitle}</Text>
    </Card>
  );
}
