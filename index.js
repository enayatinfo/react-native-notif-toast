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
import {deviceHeight, styles} from '../styles'
let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height

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
            },380)
        }, 2000)
    }

    setToastType(message='Success!', type='success') {
        let color
        if (type == 'danger') color = this.props.colors ? this.props.colors.danger : '#eb5050'
        if (type == 'primary') color = this.props.colors ? this.props.colors.primary : '#00a6cf'
        if (type == 'warning') color = this.props.colors ? this.props.colors.warning : '#ec971f'
        if (type == 'success') color = this.props.colors ? this.props.colors.success : '#00b488'
        this.setState({ animate:true,toastColor: color, message: message })
    }

    render() {

        let animation = this.animatedValue.interpolate({
            inputRange: [0, .3, 1],
            outputRange: [-70, -10, 0]
        })
        if(this.state.animate && this.props.notification){
            return(<Animated.View  style={{zIndex:2147483647, transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
                <Text style={[styles.IRAN,{ marginRight: 10,  color: 'white',  fontSize:16, fontWeight: 'bold',textAlign: 'right' }]}>
                    { this.state.message }
                </Text>
            </Animated.View>)
        }
        if(this.state.animate && !this.props.notification){
            return(
                <Animated.View style={{zIndex:2147483647, transform: [{ translateY: this.animatedXValue }], height: 70, marginTop: windowHeight / 2 - 70, backgroundColor: this.state.toastColor, position: 'absolute',width: windowWidth-40, justifyContent: 'center',alignSelf:'center',borderRadius:5,opacity:this.animatedValue }}>
                    <Text style={[styles.IRAN,{ marginLeft: 10, color: 'white', fontSize:14, fontWeight: 'bold', textAlign: 'center' }]}>{ this.state.message }!</Text>
                </Animated.View>
            )
        }
        return false
    }
}