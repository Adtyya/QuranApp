import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReadDetail({ route }) {
  const { surahNumber } = route.params;
  const [detailSurah, setDetailSurah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function getDetailSurah() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://equran.id/api/v2/surat/${surahNumber}`,
          { signal: controller.signal }
        );
        setDetailSurah(res.data?.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getDetailSurah();
    return () => {
      controller.abort();
    };
  }, [surahNumber]);

  return (
    <View className="flex flex-1">
      {loading ? (
        <View className="flex flex-1 items-center justify-center">
          <Text className="text-lg font-bold text-center">
            Please Wait. Loading Surah
          </Text>
        </View>
      ) : (
        <View className="flex flex-1">
          <View className="px-3">
            <View className="bg-white p-3 mt-2 shadow-md rounded-lg">
              <Text className="text-2xl font-bold text-center">
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </Text>
              <View className="grid grid-cols-1">
                <Text className="text-lg font-bold text-center mt-1.5">
                  {detailSurah?.namaLatin}
                </Text>
                <Text className="text-base font-medium capitalize text-center">
                  {detailSurah?.jumlahAyat} ayat - Turun di{" "}
                  {detailSurah?.tempatTurun}{" "}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView className="my-5 px-3" alwaysBounceVertical>
            {detailSurah?.ayat?.map((items, i) => {
              return (
                <AyatCard
                  key={i}
                  ayat={items?.teksArab}
                  translate={items?.teksIndonesia}
                ></AyatCard>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

function AyatCard({ ayat, translate }) {
  return (
    <View className="w-full p-3 shadow-lg rounded-lg bg-white mb-2">
      <Text className="text-2xl font-semibold">{ayat}</Text>
      <Text className="text-base font-normal mt-1.5">{translate}</Text>
    </View>
  );
}
