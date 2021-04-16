import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import ReaderScreen from './screens/ReaderScreen'; 
import EditScreen from './screens/EditScreen'; 
import UpdateScreen from './screens/UpdateScreen';
import AddScreen from './screens/AddQuoteScreen'; 
import AddAuthorScreen from './screens/AddAuthorScreen'; 
   

const MainNav = createStackNavigator(
  {
    
    Home: { screen: HomeScreen },
    Admin: { screen: AdminScreen },
    Reader: { screen: ReaderScreen },
    AddQuote: { screen: AddScreen },
    Update: { screen: UpdateScreen },
    Edit: { screen: EditScreen },
    AddAuthor: { screen: AddAuthorScreen },

  },
  {
    initialRouteName: "Home"
  }
);
const App = createAppContainer(MainNav);
export default App;