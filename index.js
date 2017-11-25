import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Animated,
    Dimensions,
    Easing
} from 'react-native';
import {styles} from '../styles'
let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height
import * as Animatable from 'react-native-animatable';

export default class toast extends Component {

    constructor(props) {
        super(props)
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth/100)
        this.state = {
            animate:false,
            modalShown: false,
            toastColor: '#00b488',
            message: 'success!'
        }
    }

    callToast(message, type) {
        if(this.state.modalShown) return
        this.setToastType(message, type)
        this.setState({ modalShown: true })
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 350
            }).start(this.closeToast())
    }

    closeToast() {
        setTimeout(() => {
            this.setState({ modalShown: false })
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 0,
                    duration: 350
                }).start()
        }, 2000)
    }

    callXToast(message,type) {
        this.setState({animate:true})
        this.setToastType(message, type)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 350
            }).start()
        Animated.timing(
            this.animatedXValue,
            {
                toValue: windowHeight/100,
                duration: 350
            }).start(this.closeXToast())
    }

    closeXToast() {
        setTimeout(() => {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 0,
                    duration: 350
                }).start()
            Animated.timing(
                this.animatedXValue,
                {
                    toValue: -windowHeight/100,
                    duration: 350
                }).start()
            setTimeout(() => {
                this.setState({animate:false})
            },350)
        }, 2000)
    }

    setToastType(message='Success!', type='success') {
        let color
        if (type == 'danger') color = '#eb5050'
        if (type == 'primary') color = '#00a6cf'
        if (type == 'warning') color = '#ec971f'
        if (type == 'success') color = '#00b488'
        this.setState({ animate:true,toastColor: color, message: message })
    }

    render() {

        let animation = this.animatedValue.interpolate({
            inputRange: [0, .3, 1],
            outputRange: [-70, -10, 0]
        })

        return (
            <View style={{zIndex:1000}}>
                {/*<View style={styles.container}>*/}
                    {/*<Button type="success" callToast={ () => this.callToast('YOYOYO') }  />*/}
                    {/*<Button type="error" callToast={ () => this.callToast('Error toast called!', 'error') }  title="Something went wrong..." />*/}
                    {/*<Button type="warning" callToast={ () => this.callToast('Warning toast called!','warning') }  />*/}
                    {/*<Button type="primary" callToast={ () => this.callToast('Primary toast called!', 'primary') }  />*/}
                    {/*<Button type="bottom" callToast={ () => this.callXToast('Primary xtoast called!', 'primary') }  />*/}
                {/*</View>*/}

                {/*<Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>*/}
                    {/*<Text style={[styles.IRAN,{ marginRight: 10,  color: 'white',  fontSize:16, fontWeight: 'bold',textAlign: 'right' }]}>*/}
                        {/*{ this.state.message }*/}
                    {/*</Text>*/}
                {/*</Animated.View>*/}

                {/*{this.state.animate && <Animatable.View useNativeDriver onAnimationEnd={() => this.setState({animate:false})} easing='linear' style={{ transform: [{ translateY: this.animatedXValue }], height: 70, marginTop: windowHeight / 2 - 70, backgroundColor: this.state.toastColor, position: 'absolute',width: windowWidth-40, justifyContent: 'center',alignSelf:'center',borderRadius:5,opacity:this.animatedValue }}>*/}
                    {/*<Text style={[styles.IRAN,{ marginLeft: 10, color: 'white', fontSize:14, fontWeight: 'bold', textAlign: 'center' }]}>{ this.state.message }!</Text>*/}
                {/*</Animatable.View>}*/}

                {this.state.animate && <Animated.View style={{ transform: [{ translateY: this.animatedXValue }], height: 70, marginTop: windowHeight / 2 - 70, backgroundColor: this.state.toastColor, position: 'absolute',width: windowWidth-40, justifyContent: 'center',alignSelf:'center',borderRadius:5,opacity:this.animatedValue }}>
                    <Text style={[styles.IRAN,{ marginLeft: 10, color: 'white', fontSize:14, fontWeight: 'bold', textAlign: 'center' }]}>{ this.state.message }!</Text>
                </Animated.View>}

            </View>
        );
    }
}

class Button extends Component {
    render() {
        let { callToast, type } = this.props
        return (
            <View style={ styles.buttonContainer }>
                <TouchableHighlight onPress={ callToast } underlayColor="ddd" style={{ height:60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'ededed', borderWidth: 1, borderColor: 'ddd' }}>
                    <Text>Call { type } toast.</Text>
                </TouchableHighlight>
            </View>
        )
    }
}