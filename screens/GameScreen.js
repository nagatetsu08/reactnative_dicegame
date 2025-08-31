import { StyleSheet, View, Text, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/instructionText';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary;
let maxBoundary;

function GameScreen({ userNumber, onGameOver }) {

    /**
     * 以下の初期化でminBoundaryとmaxBoundaryを0と100とマジックナンバーで設定しているのは、
     * 初期化のためでもあるが、ここに変数を使うとminBoundaryとmaxBoundaryはいずれかが必ず毎回変わる。
     * userNumberが変わるたびにこのコンポーネントがよばれ、上記２つの変数を使って初期化されていくが、
     * minBoundaryとmaxBoundaryが同じあたいになった時に内部のMath.floorでエラーになってしまう。
     * 本来、初期化は最初の1回だけでいいので、useMemoを使うのも手ではあるが、今回は単純にマジック変数で回避できるのでそれで対応。
     */
    const initialGuess = generateRandomBetween(
        1,
        100,
        userNumber
    );

    // useState
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    // useEffect
    useEffect(() => {
        if(currentGuess === userNumber) {
            onGameOver();
        }
    },[currentGuess, onGameOver, userNumber])

    function nextGuessHandler(direction) {
        if((direction === 'lower' && currentGuess < userNumber) || (direction === 'higher' && currentGuess > userNumber)) {
            Alert.alert(
                "Don't lie!", 
                "You know that this is wrong...", 
                [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }

        if(direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRandomNumber);
    }


    return ( 
        <View style={styles.screen}>
            <Title>Opponent's Number</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText>High or Lower? </InstructionText>
                <View>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>Lower</PrimaryButton>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>Higher</PrimaryButton>
                </View>
            </Card>
            <View>
                <Text>Log Rounds</Text>
                {/* Todo:: log component */}
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
});