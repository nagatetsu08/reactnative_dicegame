import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

import Colors from './constants/colors';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);


  // カスタムフォント
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  // カスタムフォントがロードされるまでAppLoadingコンポーネントを表示する
  if(!fontsLoaded) {

  }


  /**
   * handlerとしてまとめておくことで関数を子コンポーネントに渡した時にやっておきたい処理を 
   * グループ化できる。渡す際はhandler名を渡すだけで、引数などは呼び出し先のコンポーネント内で
   * 定義してやればいい。gameOverHandlerが一番参考になる。
   * 
   */

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setGuessRounds(0);
    setUserNumber(null);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    // 遷移先でユーザーとCPUの数が同じだった時のみ、gameOverHandlerを実行している。
    // ここでは関数を渡すだけ
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if(gameIsOver && userNumber) {
    screen = (
      <GameOverScreen 
        userNumber={userNumber} 
        roundsNumber={guessRounds} 
        onStartNewGame={startNewGameHandler} 
        />
    );
  }



  return (
    <LinearGradient 
      colors={[Colors.gradient_start, Colors.gradient_end]}
      style={styles.rootScreen}
    >
      <ImageBackground 
        source={require('./assets/images/ric-tom-e9d3Wou-PKQ-unsplash.jpg')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {/* reactNativeでは基本CSSの継承がないので、新たに囲った場合はそいつにも親のスタイルをつけてやる必要がある */}
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground> 
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,

  },
  backgroundImage: {
    opacity: 0.15,
  }
});
