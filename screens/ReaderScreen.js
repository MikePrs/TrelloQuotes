import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Text, Body, Left } from 'native-base';


const key = "";
const token = "";
const board_id = "";


export default class ReaderScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            boards: [],
            cards: [],
            isLoading: true
        };
    };

    componentDidMount = () => {
        this.initBoards();
    }

    initBoards() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {


            fetch("https://api.trello.com/1/boards/" + board_id + "/lists?cards=all&card_fields=name,desc&key=" + key + "&token=" + token, {
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
                                id: list.cards[i].id,
                                list_id: list.id,
                                quote: list.cards[i].name,
                                picture: list.cards[i].desc
                            })

                        }

                        console.log(quotes)
                        this.setState({ boards: quotes, isLoading: false })
                    })
                        .catch(err => console.error(err));
                })
        })
    }





    deleteBoard(id) {
        console.log(id)

        fetch('https://api.trello.com/1/cards/' + id + '?key=' + key + '&token=' + token, {
            method: 'DELETE'
        })
            .then(response => {
                console.log(
                    `Response: ${response.status} ${response.statusText}`
                );

                return response.text();
            })
            .then(text => {
                const filteredData = this.state.boards.filter(item => item.id !== id);
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
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {

                            return (

                                <Content >
                                    <Card style={{ padding: 20 }}>
                                        <CardItem>
                                            <Left>
                                                <Thumbnail source={{ uri: item.picture }} />
                                                <Body>
                                                    <Text>{item.author}</Text>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <Text style={{ textAlign: 'center', fontSize: 25 }}> {item.quote}</Text>
                                            </Body>
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



