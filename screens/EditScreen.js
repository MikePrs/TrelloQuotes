import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Label, Text, Button, Item, Input, Right, Body, Left,Thumbnail } from 'native-base';


const key = "ce948e4581baccf7e7b2151e5916c041";
const token = "6e3e3274ab75bfbc3bbecdce28e80e62edb2a373f82b93005cc42fc8069c8f40";
const board_id = "Y66vXZ3l";

export default class EditScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            author: '',
            quote: '',
            quote1: '',
            id: '',
            picture: ''
        };
    };

    componentDidMount() {
        let author = this.props.navigation.getParam("title", "");
        let image = this.props.navigation.getParam("image", "");
        let quote = this.props.navigation.getParam("body", "");
        let id = this.props.navigation.getParam("id", "");
        this.setState({ author: author, quote: quote, id: id, picture: image })

    }

    async edit(id, quote, image) {
        await fetch
            ('https://api.trello.com/1/cards/' + id + '?name=' + quote + '&desc=' + image + '&key=' + key + '&token=' + token, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                console.log(
                    `Response: ${response.status} ${response.statusText}`
                );
                return response.text();
            })
            .then(text => {

                console.log(text);
                this.props.navigation.navigate('Admin');
            })
            .catch(err => console.error(err));
    }



    render() {
        return (
            <View style={styles.container}>
                <Content style={{ marginVertical: 50 }}>
                    <Card style={{ height: 550, width: 330, borderColor: 'black', borderWidth: 1, elevation: 10 }}>
                        <CardItem header>
                            <View style={{width:'100%'}}>
                                <Thumbnail style={{ alignSelf: 'center', marginTop: 20, height: 100, width: 100 }} source={{ uri: this.state.picture }} />
                                <Label style={{ alignSelf: 'center', fontSize: 30, marginVertical: 25 }}>{this.state.author}</Label>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Label style={{ alignSelf: 'center', fontSize: 20, paddingVertical: 10 }}>Edit quote</Label>

                                <TextInput
                                    style={{ textAlign: 'center', fontSize: 20, borderColor: 'grey', borderWidth: 1, width: 260, alignSelf: 'center' }}
                                    onChangeText={text => this.setState({
                                        quote1: text
                                    })}
                                    defaultValue={this.state.quote}
                                    multiline={true}
                                    numberOfLines={7}
                                    textAlignVertical="top"
                                />
                            </Body>

                        </CardItem>
                        <View >
                            <Body>
                                <Button success
                                    onPress={() => { this.edit(this.state.id, this.state.quote1, this.state.picture) }}
                                >
                                    <Text> Edit </Text>

                                </Button>
                            </Body>
                        </View>
                    </Card>
                </Content>
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


    },
});