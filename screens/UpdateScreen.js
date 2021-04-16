import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const key = "";
const token = "";
const board_id = "";
import { Content, Card, CardItem, Text, Button, Left, Thumbnail, Body } from 'native-base';

export default class Update extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            boards: [],
            isLoading: true
        };
    };

    componentDidMount = () => {
        this.initBoards();
    }
    removeDuplicates(arr, prop) {
        let obj = {};
        return Object.keys(arr.reduce((prev, next) => {
            if (!obj[next[prop]]) obj[next[prop]] = next;
            return obj;
        }, obj)).map((i) => obj[i]);
    }
    initBoards() {

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", async () => {

            await fetch("https://api.trello.com/1/boards/" + board_id + "/lists?cards=all&card_fields=name,desc&key=" + key + "&token=" + token, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    console.log(
                        `Response: ${response.status} ${response.statusText} ------------`
                    );
                    return response.json();
                })
                .then(text => {
                    var quotes = [];
                    text.forEach(list => {
                        for (let i = 0; i < list.cards.length; i++) {
                            quotes.push({
                                author: list.name,
                                list_id: list.id,
                                picture: list.cards[i].desc
                            })
                        }
                    })
                    quotes = this.removeDuplicates(quotes, 'author')
                    console.log(quotes)
                    this.setState({ boards: quotes, isLoading: false })

                })
                .catch(err => console.error(err));
        })
    }



    async deleteBoard(id) {

        console.log(id)
        await fetch('https://api.trello.com/1/lists/' + id + '?closed=' + true + '&key=' + key + '&token=' + token, {
            method: 'PUT'
        })
            .then(response => {
                console.log(
                    `Response: ${response.status} ${response.statusText}`
                );
                return response.text();
            })
            .then(text => {
                const filteredData = this.state.boards.filter(item => item.list_id !== id);
                this.setState({ boards: filteredData });
                console.log(text)
            })
            .catch(err => console.error(err));
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View
                    style={{ flex: 1, backgroundColor: "white", alignContent: "center", justifyContent: "center" }}
                >
                    <ActivityIndicator size="large" color="blue" />
                    <Text style={{ textAlign: "center", fontSize: 20, color: "blue" }}>
                        loading please wait..
                </Text>
                </View>
            );
        }
        return (
            <View style={{ marginBottom: 20 }}>
                <View style={{ marginTop: 10, height: '100%' }}>
                    <FlatList
                        data={this.state.boards}
                        keyExtractor={(item) => item.list_id}
                        renderItem={({ item }) => {

                            return (

                                <Content >
                                    <Card style={{}}>

                                        <CardItem>
                                            <Left>
                                                <Thumbnail source={{ uri: item.picture }} />
                                                <Body>
                                                    <Text>{item.author}</Text>
                                                </Body>
                                                <View style={styles.buttons2}>
                                                    <Button success style={{ margin: 10 }}
                                                        onPress={() => { this.props.navigation.navigate('AddQuote', { title: item.author, id: item.list_id, image: item.picture }) }}
                                                    >
                                                        <MaterialIcons style={{ padding: 10 }} name="add" size={24} color="white" />
                                                    </Button>
                                                    <Button danger style={{ margin: 10 }}
                                                        onPress={() => { this.deleteBoard(item.list_id) }}
                                                    >
                                                        <FontAwesome style={{ padding: 10 }} name="trash-o" size={24} color="white" />
                                                    </Button>
                                                </View>
                                            </Left>
                                        </CardItem>
                                        
                                    </Card>
                                </Content>
                            )
                        }}
                    >
                    </FlatList>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 25,
        justifyContent: 'space-around'
    },
    buttons2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});
