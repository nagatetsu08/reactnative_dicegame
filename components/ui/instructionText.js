import { Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

function InstructionText({ children, style }) {
  // 下部にあるstyleと親元から渡したstyleを配列で定義することでマージできる
  // 新しいプロパティ定義を追加できるし、同名のプロパティなら上書きができる
  // その場合、必ず外部のstyleを後に書くこと（でないと上書きにならない）
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});