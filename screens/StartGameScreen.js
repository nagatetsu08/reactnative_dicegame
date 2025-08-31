import { StyleSheet, TextInput, View, Button } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

function StartGameScreen() {
    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.numberInput}
                maxLength={2}
                keyboardType='number-pad'
                autoCapitalize='none' //文字列を勝手に大文字にするか否か否か
                autoCorrect={false} //スペルチェックを無効にする
            />
            {/* Flexboxコンテナ配下は以下のように細かくViewでぶった斬った方がボタンのサイズや配置を調整しやすい */}
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Confirm</PrimaryButton>
                </View>
            </View>
        </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: '#4c0428ff',
        borderRadius: 8,
        elevation: 4,                           // for-android
        shadowColor: 'black',                   //for-ios
        shadowOffset: { width: 0, height: 2 },  //for-ios
        shadowRadius: 6,                        //for-ios
        shadowOpacity: 0.25,                    //for-ios
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: '#ddb52f',
        borderBottomWidth: 2,
        color: '#ddb52f',
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