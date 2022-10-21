import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Room from "./screen/Room";
import Multiplayer from "./screen/Multiplayer";
import WaitingLobby from "./screen/WaitingLobby";
import WelcomScreen from "./screen/WelcomScreen";
import Lobby from "./screen/Lobby";
import Bot from "./screen/Bot";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Lobby"
          component={Lobby}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Room"
          component={Room}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WaitingLobby"
          component={WaitingLobby}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Online"
          component={Multiplayer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bot"
          component={Bot}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
