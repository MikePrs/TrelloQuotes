import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';


const key = "ce948e4581baccf7e7b2151e5916c041";
const token = "6e3e3274ab75bfbc3bbecdce28e80e62edb2a373f82b93005cc42fc8069c8f40";
const board_id = "Y66vXZ3l";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Right, Body, Left } from 'native-base';

export default class AdminScreen extends React.Component {



    constructor(props) {
        super(props)

        this.state = {
            boards: [],
            cards: [],
            isLoading: true
        };
    };

zzz

    componentDidMount = () => {
        this.initCards();
    }

     initCards() {

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", async() => {


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
                    console.log(text)
                    var quotes = [];
                    var cards = [];
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





    async deleteCard(id) {
        console.log(id)

        await fetch('https://api.trello.com/1/cards/' + id + '?key=' + key + '&token=' + token, {
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
            <View >


                <View style={{ height: '100%' }}>
                    <FlatList
                        ListFooterComponent={<View style={{ height: 60 }}></View>}
                        data={this.state.boards}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Content >
                                    <Card >
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
                                                <Text style={{ textAlign: 'center', fontSize: 20 }}> {item.quote}</Text>
                                            </Body>
                                        </CardItem>
                                        <CardItem>
                                            <View style={styles.buttons}>

                                                <Button bordered primary
                                                    style={{ alignItem: 'center' }}
                                                    onPress={() => { this.props.navigation.navigate("Edit", { title: item.author, body: item.quote, id: item.id, image: item.picture }), this.setState({ isLoading: true }) }}
                                                >
                                                    <Text>Edit Card</Text>
                                                </Button>
                                                <Button bordered danger
                                                    style={{ alignItem: 'center' }}
                                                    onPress={() => { this.deleteCard(item.id) }}
                                                >
                                                    <Text>Remove Card</Text>
                                                </Button>

                                            </View>
                                        </CardItem>
                                    </Card>
                                </Content>

                            )

                        }}

                    >

                    </FlatList>
                </View>


                <View style={styles.buttons2}>
                    <Button rounded success
                        onPress={() => { this.props.navigation.navigate("AddAuthor"), this.setState({ isLoading: true }) }}
                    >
                        <Text>Add new author</Text>
                    </Button>
                    <Button rounded
                        onPress={() => { this.props.navigation.navigate("Update"), this.setState({ isLoading: true }) }}
                    >
                        <Text>Update author </Text>
                    </Button>

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
        bottom: 1,
        marginBottom: 10,
        height: 70,
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 25,
        justifyContent: 'space-around',
        position: 'absolute',
        elevation: 10

    }
});