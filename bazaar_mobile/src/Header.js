// import libs for component
import React from 'react';

// destructured import
import { Text, View } from 'react-native';

// make component
const Header = (props) => {
    // destructuring for including styles
    const { textStyle, viewStyle } = styles;

    // set style rule
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

// Styling for RN components done in styles object
const styles = {
    viewStyle: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'center', // denotes vert pos in container
        alignItems: 'center', // denotes horiz pos in container
        height: 60,  // px
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // shadow height/width
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        marginBottom: 150
    },
    textStyle: {
        fontSize: 20
    }
};
// make component available to other parts of app
export default Header;


// Pattern for most component files:
// 1. import
// 2. component declaration
// 3. export
