import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import one from "../assets/HAND_IMG/1.png";
import two from "../assets/HAND_IMG/2.png";
import three from "../assets/HAND_IMG/3.png";
import four from "../assets/HAND_IMG/4.png";
import five from "../assets/HAND_IMG/5.png";
import six from "../assets/HAND_IMG/6.png";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  set,
  ref,
  onValue,
  child,
  get,
  push,
} from "firebase/database";
import { LinearGradient } from "expo-linear-gradient";

const firebaseConfig = {
  databaseURL:
    "https://hand-cricket-19747-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default function Bot({ navigation }) {
  // const key = push(child(ref(db), `users`)).key;
  // console.log(key);
  const zero = require("../assets/HAND_IMG/0.png");
  const [img, setImg] = useState(zero);
  const [isBatting, setIsBatting] = useState(true);
  const [isBowling, setIsBowling] = useState(false);
  const [randomImg, setRandomImg] = useState(zero);
  const [isOut, setIsOut] = useState(false);
  const [isChasing, setIsChasing] = useState(false);
  const [run, setRun] = useState(0);
  const [target, setTarget] = useState(0);
  const [win, setWin] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const start = () => {
    setImg(zero);
    setRandomImg(zero);
    setIsOut(false);
    setIsChasing(false);
    setRun(0);
    setTarget(0);
    setWin(false);
    setNewGame(false);
  };

  const chasing = (n) => {
    const score = computer();
    if (n === score) {
      setWin(true);
      setNewGame(true);
      return true;
    }
    setRun(score + run);
  };
  const out = (player, enemy) => {
    console.log(player, enemy);
    if (player === enemy) {
      setIsOut(true);
      setTarget(run + 1);
      setRun(0);
      setIsChasing(true);
      setIsBatting(false);
      setIsBowling(true);
    }
  };
  const computer = () => {
    const rand = (Math.floor(Math.random() * 10) % 6) + 1;

    if (rand === 1) setRandomImg(one);
    else if (rand === 2) setRandomImg(two);
    else if (rand === 3) setRandomImg(three);
    else if (rand === 4) setRandomImg(four);
    else if (rand === 5) setRandomImg(five);
    else if (rand === 6) setRandomImg(six);

    return rand;
  };
  const pressed = (n) => {
    setIsOut(false);
    if (n === 1) setImg(one);
    else if (n === 2) setImg(two);
    else if (n === 3) setImg(three);
    else if (n === 4) setImg(four);
    else if (n === 5) setImg(five);
    else if (n === 6) setImg(six);
    if (!isChasing) {
      setRun(run + n);
      let opponent = computer();
      out(n, opponent);
    } else chasing(n);
  };
  //   useEffect(() => {
  //     const room = generateRoom();
  //     setMainRoom(room);
  //     // const user = generateRoom();
  //     writeUserData(room);
  //   }, []);
  useEffect(() => {
    if (run >= target && isChasing) {
      setWin(false);
      setNewGame(true);
    }
  }, [run]);
  return (
    <LinearGradient
      // colors={["#4c00b0", "#7600bc"]}
      colors={["#152155", "#3A6187"]}
      style={styles.container}
    >
      {newGame && win && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, color: "#ffff", marginBottom: 30 }}>
            WIN!!! Keep Playing
          </Text>
          <TouchableOpacity style={{}} onPress={() => start()}>
            <LinearGradient
              colors={["#D4F1F8", "#71A6D1"]}
              style={{
                width: 150,
                height: 75,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>New Game</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate("Lobby")}
          >
            <LinearGradient
              colors={["#D4F1F8", "#71A6D1"]}
              style={{
                width: 150,
                height: 75,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 30,
              }}
            >
              <Text style={styles.text}>Lobby</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {newGame && !win && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, color: "#ffff", marginBottom: 30 }}>
            Lose!!! Keep Trying
          </Text>
          <TouchableOpacity style={{}} onPress={() => start()}>
            <LinearGradient
              colors={["#D4F1F8", "#71A6D1"]}
              style={{
                width: 150,
                height: 75,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>New Game</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate("Lobby")}
          >
            <LinearGradient
              colors={["#D4F1F8", "#71A6D1"]}
              style={{
                width: 150,
                height: 75,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 30,
              }}
            >
              <Text style={styles.text}>Lobby</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {!newGame && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LinearGradient
            colors={["#D4F1F8", "#71A6D1"]}
            // colors={["#152155", "#3A6187"]}
            style={styles.score_board}
          >
            <Text style={styles.text}>RUN: {run}</Text>
            <Text style={styles.text}>
              {target === 0 ? "1st Innings" : "Target: " + target}
            </Text>
          </LinearGradient>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={randomImg}
              style={{
                width: 120,
                height: 120,
                transform: [{ rotateY: "180deg" }, { rotateZ: "180deg" }],
                marginLeft: 50,
                paddingLeft: 10,
              }}
            />
            {!isBatting && (
              <Image
                source={require("../assets/cricket-bat.png")}
                style={{ width: 60, height: 60, marginLeft: 50 }}
              />
            )}
            {!isBowling && (
              <Image
                source={require("../assets/ball.png")}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 50,
                  paddingLeft: 10,
                }}
              />
            )}
          </View>
          {isOut && <Text style={styles.out}>OUT</Text>}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Image
              source={img}
              style={{ width: 120, height: 120, marginLeft: 50 }}
            />
            {isBatting && (
              <Image
                source={require("../assets/cricket-bat.png")}
                style={{ width: 60, height: 60, marginLeft: 50 }}
              />
            )}
            {isBowling && (
              <Image
                source={require("../assets/ball.png")}
                style={{ width: 40, height: 40, marginLeft: 50 }}
              />
            )}
          </View>
          <View style={styles.numbers}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => pressed(1)}
              disabled={newGame ? true : false}
            >
              <LinearGradient
                colors={["#D4F1F8", "#71A6D1"]}
                style={styles.box}
              >
                <Text style={styles.number}>1</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => pressed(2)}
              disabled={newGame ? true : false}
            >
              <LinearGradient
                colors={["#D4F1F8", "#71A6D1"]}
                style={styles.box}
              >
                <Text style={styles.number}>2</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => pressed(3)}
              disabled={newGame ? true : false}
            >
              <LinearGradient
                colors={["#D4F1F8", "#71A6D1"]}
                style={styles.box}
              >
                <Text style={styles.number}>3</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.numbers}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => pressed(4)}
              disabled={newGame ? true : false}
            >
              <LinearGradient
                colors={["#D4F1F8", "#71A6D1"]}
                style={styles.box}
              >
                <Text style={styles.number}>4</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => pressed(5)}
              disabled={newGame ? true : false}
            >
              <LinearGradient
                colors={["#D4F1F8", "#71A6D1"]}
                style={styles.box}
              >
                <Text style={styles.number}>5</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => pressed(6)}
              disabled={newGame ? true : false}
            >
              <LinearGradient
                colors={["#D4F1F8", "#71A6D1"]}
                style={styles.box}
              >
                <Text style={styles.number}>6</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  score_board: {
    width: "82%",
    height: 40,
    borderRadius: 5,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  numbers: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  box: {
    width: 75,
    height: 75,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  number: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3A6187",
  },
  new: {
    width: 100,
    height: 75,
    textAlign: "center",
    backgroundColor: "green",
  },
  text: {
    fontWeight: "800",
    fontSize: 20,
    color: "#3A6187",
  },
  out: {
    position: "absolute",
    zIndex: 100,
    fontSize: 50,
    fontWeight: "800",
    width: 200,
    height: 80,
    padding: 5,
    backgroundColor: "transparent",
    color: "red",
    textAlign: "center",
  },
});
