import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Content, Container, Text } from 'native-base';

export default class HomeScreen extends React.Component {


    componentDidMount = async () => {

        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>Hi!</Text>
                <Text style={{ fontSize: 20 }}>This app works with Trello API </Text>
                <Text style={{ fontSize: 20 }}>React Native and Native Base library</Text>
                <Text style={{ fontSize: 20 }}>and it's all about Famous Quotes</Text>
                <Container>
                    <Content >
                        <View style={styles.buttons}>
                            <Button success style={{ alignSelf: 'center' }}
                                onPress={() => { this.props.navigation.navigate('Admin') }}
                            ><Text> Admin  </Text></Button>
                            <Button warning style={{ alignSelf: 'center' }}
                                onPress={() => { this.props.navigation.navigate('Reader') }}
                            ><Text> Reader</Text></Button>
                        </View>
                    </Content>
                </Container>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 200
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 25,
        justifyContent: 'space-around'

    }
});