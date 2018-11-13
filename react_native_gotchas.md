# Some initial differences between React and React Native:

## Problem : React Native doesn't have CSS.

**Solution**: For each component, define a `styles` object, then give the component a style prop.

**Example**
```javascript
const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
          {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};
```

## Problem: Images in React Native don't automatically fill entire space

**Solution**: For each image, manually define its size in a `styles` object.

**Example**
```javascript
<Image source={{ uri: image }} style={{ height: 20, width: 200 }} />
```


## Problem : React Native doesn't automatically scroll.

**Solution**: Wrap the scrollable content in a <ScrollView> tag

**Example**:
```javascript
class AlbumList extends Component {

    constructor(props) {
        super(props);
        this.state = { albums: [] };
    }

    // fires when component is about to be rendered.
    componentWillMount() {
        // console.log('cWM!');
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        .then(response => this.setState({ albums: response.data }));
    }


    renderAlbums() {
        return this.state.albums.map(album => <AlbumDetail key={album.title} album={album} />);
    }

    render() {
        console.log(this.state);
        return (
          // Make the View scrollable
          <ScrollView>
            {this.renderAlbums()}
          </ScrollView>
        );
    }
}

```

## Problem : React Native doesn't automatically render text input/ TextInput isn't visible.

**Solution**: For each TextInput, manually define its size in a `styles` object.

**Example**:
```javascript
const Input = (props) => {
  return (
    <View style={{ height: 40 }}>
      <Text style={{ fontSize: 18}}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}/>
    </View>
  );
};

export { Input };

```
## Problem: React Native Picker doesn't show up
**Solution**: Pass the Picker a style with flex:1

**Example**:
```javascript
<Picker style={{ flex: 1 }}>
```


**Explanation**: By default, Picker is specified w/ width:0





# Common Errors (solution in link text):

[React Native Not Working with Firebase](https://stackoverflow.com/a/50705232)

[React Native android build failed. SDK location not found](https://stackoverflow.com/a/32640154)

[react-native run-android DeviceException Could not create ADB Bridge](https://stackoverflow.com/a/47617645)

[Unable to load script from assets index.android.bundle on windows](https://stackoverflow.com/a/44476757)

[Remote Debugger Not Working](https://stackoverflow.com/a/49003356)

[TextInput Typed Text not appearing on android](https://stackoverflow.com/a/40667041)

[React Native FlatList not Scrolling](https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/questions/4981906)
  * Basically, if on Android, if the FlatList contents **DO NOT** overflow, no scrolling will occur. This is intended behavior.

# Course-specific
[Item in FlatList not Showing Text](https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/questions/5032010)
  * Basically, in ListItem.js, change
  ```javascript
  {this.props.library.title}
  ```
  to
  ```javascript
  {this.props.library.item.title}
  ```


[Warning: Failed Context child type...](https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/questions/5032010)

Basically, change this
```javascript
keyExtractor={(library) => library.id}
```

to

```javascript
keyExtractor={(library) => library.id.toString()}
```

Explanation: more recent versions of React Native expect keys to be strings

[LayoutAnimation not Working on Android](https://stackoverflow.com/a/47215868)

[React Native Router Native Flux Not Navigating to main page](https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/questions/3945716)

Basically, change this
```javascript
Actions.employeeList();
```

to

```javascript
// the object inside may be overkill
Actions.main({ type: 'reset' });
```


[Picker not showing up after adding style to CardSection](https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/questions/3723700)
* Fix
```javascript
// (in /src/components/EmployeeCreate.js)
<Picker
 // style={{ flex: 1 }} <-- comment this out!
 >
```
