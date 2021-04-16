import React from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { Content, Card, Item, Input, Label, CardItem, Text, Button, Body } from 'native-base';


const key = "ce948e4581baccf7e7b2151e5916c041";
const token = "6e3e3274ab75bfbc3bbecdce28e80e62edb2a373f82b93005cc42fc8069c8f40";

export default class AddAuthorScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            author: '',
            quote: '',
            id: '',
            picture: ''
        };
    };

    async addAuthor(author, quote, linkPic) {
        if (author === '' || quote === '') {
            Alert.alert('Please fill nessasery fields.')
        } else {
            await fetch('https://api.trello.com/1/lists?key=' + key + '&token=' + token + '&name=' + author + '&idBoard=5fc9e2ef22929a24d287454c', {
                method: 'POST'
            })
                .then(response => {
                    console.log(
                        `Response: ${response.status} ${response.statusText}`
                    );
                    return response.json();
                })
                .then(text => {
                    console.log(text)

                    fetch('https://api.trello.com/1/cards?key=' + key + '&token=' + token + '&name=' + quote + '&desc=' + linkPic + '&idList=' + text.id, {
                        method: 'POST'
                    })
                        .then(response => {
                            console.log(
                                `Response: ${response.status} ${response.statusText}`
                            );
                            return response.text();
                        })
                        .then(text => {
                            console.log(text)
                            this.props.navigation.navigate('Admin');
                        })
                        .catch(err => console.error(err));

                })
                .catch(err => console.error(err));
        }


    }



    render() {
        return (
            <View style={styles.container}>

                <Content style={{ marginVertical: 20 }}>
                    <Card style={{ height: 530, width: 300, borderColor: 'black', borderWidth: 1, elevation: 10 }}>
                        <Label style={{ alignSelf: 'center', marginTop: 20 }}>Author Name</Label>
                        <CardItem header>
                            <Item fixedLabel >
                                <Input style={{ borderColor: 'grey', borderWidth: 1, }}
                                    onChangeText={text => this.setState({
                                        author: text
                                    })}
                                />
                            </Item>
                        </CardItem>
                        <Label style={{ alignSelf: 'center' }} >Quote</Label>
                        <CardItem>
                            <Body>
                                <TextInput
                                    style={{ textAlign: 'center', fontSize: 20, borderColor: 'grey', borderWidth: 1, width: 260, alignSelf: 'center' }}
                                    onChangeText={text => this.setState({
                                        quote: text
                                    })}
                                    multiline={true}
                                    numberOfLines={7}
                                    textAlignVertical="top"
                                />
                            </Body>

                        </CardItem>
                        <Label style={{ alignSelf: 'center', marginTop: 20 }}>Add image link</Label>
                        <CardItem header>
                            <Item fixedLabel >
                                <Input style={{ borderColor: 'grey', borderWidth: 1, }}
                                    onChangeText={text => this.setState({
                                        picture: text
                                    })}
                                />
                            </Item>
                        </CardItem>
                        <View >
                            <Body>
                                <Button success
                                    onPress={() => { this.addAuthor(this.state.author, this.state.quote, this.state.picture) }}
                                >
                                    <Text> Create </Text>
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