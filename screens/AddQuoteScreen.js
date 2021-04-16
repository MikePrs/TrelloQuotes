import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Container, Header, Content, Card, Item, Input, Label, CardItem, Text, Button, Thumbnail, Icon, Right, Body, Left } from 'native-base';


const key = "";
const token = "";
const board_id = "";

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

    componentDidMount() {
        let author = this.props.navigation.getParam("title", "");
        let image = this.props.navigation.getParam("image", "");
        let id = this.props.navigation.getParam("id", "");
        this.setState({ id: id, author: author, picture: image })

    }

    async add(quote, id, image) {

        if (quote === '') {
            Alert.alert('Please fill nessesary fields.')
        } else {
            await fetch('https://api.trello.com/1/cards?key=' + key + '&token=' + token + '&name=' + quote + '&desc=' + image + '&idList=' + id, {
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

        }

    }



    render() {
        return (
            <View style={styles.container}>

                <Content style={{ marginVertical: 50 }}>
                    <Card style={{ height: 550, width: 330, borderColor: 'black', borderWidth: 1, elevation: 10 }}>
                        <View style={{marginTop:30}}>
                            <Thumbnail style={{ alignSelf: 'center', marginTop: 20, height: 100, width: 100 }} source={{ uri: this.state.picture }} />
                            <Label style={{ alignSelf: 'center', fontSize: 30, marginVertical: 25 }}>{this.state.author}</Label>
                        </View>
                        <CardItem>
                            <Body>
                                <Label style={{ alignSelf: 'center',fontSize:20,  paddingVertical: 10 }}>Add quote</Label>
                                <TextInput
                                    style={{ textAlign: 'center', fontSize: 20, borderColor: 'grey', borderWidth: 1, width: 300, alignSelf: 'center' }}
                                    onChangeText={text => this.setState({
                                        quote: text
                                    })}
                                    multiline={true}
                                    numberOfLines={7}
                                    textAlignVertical="top"
                                />
                            </Body>

                        </CardItem>
                       
                        <View >
                            <Body>
                                <Button success
                                    onPress={() => { this.add(this.state.quote, this.state.id, this.state.picture) }}
                                >
                                    <Text> Add </Text>
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
