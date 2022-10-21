import { LinearGradient } from "expo-linear-gradient";
import { initializeApp } from "firebase/app";
import {
  get,
  getDatabase,
  onChildAdded,
  onChildChanged,
  onValue,
  ref,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function WaitingLobby({ navigation, route }) {
  const firebaseConfig = {
    databaseURL:
      "https://hand-cricket-19747-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  let playersId = [];
  const roomId = route.params.room;
  const userId = route.params.userId;
  // useEffect(() => {
  //   userId = route.params.userId;
  //   console.log(userId);
  // }, []);
  console.log(userId);
  const [player, setPlayer] = useState([]);

  const get = () => {
    // if (playersId.length !== 0) setPlayer(playersId);
  };
  const [isAdded, setIsAdded] = useState(false);

  onChildAdded(ref(db, `users/${roomId}`), (data) => {
    playersId.push(data.key);
  });
  console.log(player);

  const playerRef = ref(db, `users/${roomId}/`);
  let opponentId;
  // if (playersId.length === 2) {
  //   playersId.forEach((id) => {
  //     if (id !== userId) opponentId = id;
  //   });
  //   navigation.navigate("Online", { userId, roomId, opponentId });
  // }

  // if (playersId.length === 0) setPlayer(player + 1);
  // });
  // setTimeout(() => {
  //   setIsAdded(true);
  // }, 1000);
  const gettingId = () => {
    if (playersId.length !== 2) {
      setTimeout(() => {
        setIsAdded(!isAdded);
      }, 1000);
    } else {
      navigation.navigate("Online", { playersId, userId, roomId });
    }
  };
  gettingId();
  return (
    <LinearGradient
      // colors={["#4c00b0", "#7600bc"]}
      colors={["#152155", "#3A6187"]}
      style={styles.container}
    >
      <View style={styles.box}>
        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Waiting For Opponent To Join
        </Text>
        <Text style={styles.text}>ROOM ID:</Text>
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {roomId}
        </Text>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 200,
    height: 150,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginTop: 10,
    color: "rgba(255,255,255,0.5)",
  },
});
