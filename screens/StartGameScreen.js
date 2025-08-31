import { StyleSheet, TextInput, View, Alert } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useState } from 'react';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/instructionText';
import Colors from '../constants/colors';

function StartGameScreen({ onPickNumber }) {
    // 初期値にブランクを設定しているのはTextInputから取得時に結局文字列型になるから。
    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }
    
    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const chooseNumber = parseInt(enteredNumber);

        if(isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
            Alert.alert(
                'Invalid Number!',
                'Please enter a number between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }

        onPickNumber(chooseNumber);
    }

    return (
        <View style={styles.rootContainer}>
            <Title>Guess a Number</Title>
            <Card>
                <InstructionText>Enter a Number</InstructionText>
                <TextInput
                    style={styles.numberInput}
                    maxLength={2}
                    keyboardType='number-pad'
                    autoCapitalize='none' //文字列を勝手に大文字にするか否か否か
                    autoCorrect={false} //スペルチェックを無効にする
                    value={enteredNumber}
                    onChangeText={numberInputHandler}
                />
                {/* Flexboxコンテナ配下は以下のように細かくViewでぶった斬った方がボタンのサイズや配置を調整しやすい */}
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    }
});