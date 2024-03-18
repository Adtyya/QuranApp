import axios from "axios";
import { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  const [surah, setSurah] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    async function getSurah() {
      try {
        setLoading(true);
        const res = await axios.get("https://equran.id/api/v2/surat");
        setSurah(res.data?.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getSurah();
  }, []);

  return (
    <View className="flex flex-1">
      <Text className="text-center font-bold my-2 text-2xl">
        بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
      </Text>
      {loading ? (
        <View className="flex flex-1 items-center justify-center">
          <Text className="text-lg font-bold text-center">
            Please Wait. Loading List Surah
          </Text>
        </View>
      ) : (
        <ScrollView className="grid grid-cols-1 mt-2 px-2">
          {surah?.map((items, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate("detailSurah", {
                    surahName: items.namaLatin,
                    surahNumber: items.nomor,
                  })
                }
              >
                <Card
                  surahMean={items.arti}
                  latinName={items?.namaLatin}
                  ayatCount={items?.jumlahAyat}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

function Card({ surahMean, latinName, ayatCount }) {
  return (
    <View className="bg-white shadow-md rounded-lg p-4 w-full mb-2">
      <View className="flex flex-row justify-between items-center">
        <View>
          <Text className="text-sm">{surahMean}</Text>
          <Text className="text-lg font-bold text-left">{latinName}</Text>
        </View>
        <View className="flex items-center">
          <Text>{ayatCount} ayat</Text>
        </View>
      </View>
    </View>
  );
}
