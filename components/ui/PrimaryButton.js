import { View, Text, Pressable, StyleSheet, ImageBackgroundComponent } from 'react-native';
import Colors from '../../constants/colors';

function PrimaryButton({ children, onPress }) {

    // styleを確実に効かせるためにも、必ずViewで囲んだ方がいい
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                // 引数のpressedは、押されているか否かのboolean型のイベント
                // styleにはオブジェクトのほかに配列も指定できるので、
                // pressedが押されているときは2つのスタイルを指定することもできる
                // よくAndroidでしか効かないからIOSスタイルは別で定義する必要があるって場合に便利
                style={({pressed}) => 
                    pressed 
                        ? [styles.buttonInnerContainer, styles.pressed] 
                        : styles.buttonInnerContainer} 
                onPress={onPress}
                android_ripple={{ color: Colors.primary_ripple }} // for-android
            >
                <Text style={styles.buttonText}>
                    {children}
                </Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,     // 上下にのみ同じpaddingを取りたい
        paddingHorizontal: 16,  // 左右にのみ同じpaddingを取りたい
        elevation: 2,           // for-android
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.75,
    },
})