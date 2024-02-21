import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getCharactersByPage } from "../services/dragonBallAPI";

export default function PersonajesScreen() {
  const [personajes, setPersonajes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [paginasTotales, setPaginasTotales] = useState(0)

  const getPersonajes = (page=1)=>{
    getCharactersByPage(page)
    .then(json=>{
      setPersonajes(previos=>[...previos, ...json.items])
      setPaginasTotales(json.meta.totalPages)
      setPaginaActual(json.meta.currentPage)
    })
    .catch(error=>console.log(error))
  }

  useEffect(() => {
    getPersonajes();
  }, []);

  return (
    <View>
      <FlatList
        data={personajes}
        renderItem={({ item }) => (
          <Text key={item.id}>{item.name}</Text>
        )}
        onEndReachedThreshold={0}
        onEndReached={() => {
          if (paginaActual < paginasTotales) {
            getPersonajes(paginaActual + 1);
            setPaginaActual(paginaActual + 1);
          }
        }}
      />
    </View>
  );
};