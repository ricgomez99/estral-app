import { Tabs } from "expo-router";
import { VIEW_TABS } from "@/utils/consts";
import Entypo from "@expo/vector-icons/Entypo";

export default function TabsLayout() {
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
