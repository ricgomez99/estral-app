import { Tabs } from "expo-router";
import { VIEW_TABS } from "@/utils/consts";
import Entypo from "@expo/vector-icons/Entypo";
import useAppStateFocus from "@/hooks/useAppStateFocus";

export default function TabsLayout() {
  useAppStateFocus();
  return (
    <Tabs>
      {VIEW_TABS &&
        VIEW_TABS.map((tab) => (
          <Tabs.Screen
            key={tab.tabName}
            name={tab.tabName}
            options={{
              title: tab.tabTitle,
              headerShown: tab.headerShown,
              tabBarIcon: ({ color, size }) => (
                <Entypo name={tab.iconName} size={size} color={color} />
              ),
            }}
          />
        ))}
    </Tabs>
  );
}
