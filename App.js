import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import ReadDetail from "./screens/Detail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "List Surat" }}
        ></Stack.Screen>
        <Stack.Screen
          name="detailSurah"
          component={ReadDetail}
          options={({ route }) => ({
            title: `Baca ${route.params?.surahName}`,
          })}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
