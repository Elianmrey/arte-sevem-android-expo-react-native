import { View, Text, StyleSheet } from 'react-native';

export default function AvaliationComments({ comments }) {
    return (
        <View style={styles.container}>
            {comments.map((comment, index) => (
                <View key={index} style={styles.comment}>
                    <Text style={styles.user}>{comment.user}</Text>
                    <Text style={styles.text}>{comment.text}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10 },
    comment: { marginBottom: 10 },
    user: { fontWeight: 'bold', fontSize: 14 },
    text: { fontSize: 14, color: '#7f8c8d' },
});
