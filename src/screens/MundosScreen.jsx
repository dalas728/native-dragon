import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { getPlanetsByPage } from "../services/dragonBallAPI";
import MundoCard from "../components/MundoCard";


export default function MundosScreen() {
  const [mundos, setMundos] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [paginasTotales, setPaginasTotales] = useState(0)

  const navigation = useNavigation();

  const getMundos = (page=1)=>{
    getPlanetsByPage(page)
    .then(json=>{
      setMundos(previos=>[...previos, ...json.items])
      setPaginasTotales(json.meta.totalPages)
      setPaginaActual(json.meta.currentPage)
    })
    .catch(error=>console.log(error))
  }

  useEffect(() => {
    getMundos();
  }, []);

  return (
    <View>
      <FlatList
        data={mundos}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CharacterDetails', { item: item })}
          >
            <MundoCard key={item.id} item={item} />
          </TouchableOpacity>
        )}
        ListFooterComponent={() => <Text>-- End --</Text>}
        onEndReachedThreshold={0}
        onEndReached={() => {
          if (paginaActual < paginasTotales) {
            getMundos(paginaActual + 1);
            setPaginaActual(paginaActual + 1);
          }
        }}
      />
    </View>
  );
};