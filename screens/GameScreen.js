import { StyleSheet, View, Text, Alert, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/instructionText';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import GuessLogItem from '../components/game/GuessLogItem';

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

    // generateRandomBetweenは1-100までの間のランダム数値を返す。ただし、userNumberと同じ値ならuserNumberを返す
    const initialGuess = generateRandomBetween(
        1,
        100,
        userNumber
    );

    // useState
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]); //複数ラウンド記録したいので配列

    // useEffect
    useEffect(() => {
        if(currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    },[currentGuess, onGameOver, userNumber])

    // 第二引数に依存配列を格納してないので、最初の1回だけ実行される
    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

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
        // 配列などの追加してステートを更新するときは関数を使うのがルール
        // prevGuessRoundsは仮引数でこいつをスプレッド演算子で展開しつつ、newRandomNumberをマージする
        // [...prevGuessRounds, newRandomNumber]なら最後に追加。[newRandomNumber, ...prevGuessRounds]なら最後に追加
        setGuessRounds(prevGuessRounds => [newRandomNumber, ...prevGuessRounds])
    }


    return ( 
        <View style={styles.screen}>
            <Title>Opponent's Number</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={InstructionText}>High or Lower? </InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>Lower</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>Higher</PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                {/* renderItemでの引数を分割代入形式（({item})）にしているから、itemというのが使える
                  * 分割代入形式にしてない((item))と、jsは展開せずにオブジェクト（{item, index, separators}）を受け取ったと捉える。
                  * 従って、そのままitemにするとエラーになるので、この場合、(renderItem => { renderItem.item })のようにする必要がある。
                  * 分割代入にしておくと以下のようにitemを直接使える。（名前を変えてはだめ）
                  * 
                  * なお、keyExtractorの引数はkeyExtractorの仮引数は「(item, index)で、すでに分割代入されている。
                  * で、配列の場合はindexを使ってもよいが、リストが削除/追加がある場合にソートの不具合につながるらしいので、
                  * itemをそのまま使う。連想配列でid等のユニークなIDがある場合はそちらを使うのがベター。
                 */}
                <FlatList
                    data={guessRounds}
                    renderItem={({ item, index }) => (
                        <GuessLogItem
                            roundNumber={index + 1}
                            guess={item}
                        />
                    )}
                    keyExtractor={(item) => item}
                />
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
    InstructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
});