import { View, Text, StyleSheet } from 'react-native';
import InputBar from "./InputBar";

export default function({scrollToBottom, sendMessage, setInputBarText, inputBarText}){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Rapid Test Assistant</Text>
            <Text style={styles.subtitle}>
                Book a test, ask questions, or just chat — I’ve got you.
            </Text>

            <InputBar 
                onSendPressed={sendMessage} 
                onSizeChange={() => scrollToBottom(false)}
                onChangeText={setInputBarText}
                text={inputBarText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20
    }
});