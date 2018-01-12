import { StyleSheet } from 'react-native'
import { mainGreen } from '../../utils/colors'

const CorrectIncorrectButtonStyles = StyleSheet.create({

    questionCounterCircle: {
        width: 70,
        zIndex: 10,
        height: 70,
        bottom: -140,
        borderRadius: 35,
        alignItems: 'center',
        backgroundColor: 'rgb(233,233,239)',
    },

    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    answerButton: {
        height: 100,
        width: '100%',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: mainGreen,
    },

    defaultShadow: {
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 1, 0, 0.24)',

        shadowOffset: { width: 5, height: 7.5 }
    },

    answerButtonText: {
        fontSize: 15,
    }

})

export default CorrectIncorrectButtonStyles