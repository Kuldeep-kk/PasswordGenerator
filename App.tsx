import { Dimensions, Image, SafeAreaView,Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Logo from './assets/Logo.png';
import { TextInput } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RNBounceable from "@freakycoder/react-native-bounceable";
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required')
})


const App = () => {
  const { height } = Dimensions.get('window');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChar = 'abcdefghijklmnopqrstuvwxy';
    const digitChar = '0123456789';
    const specialChar = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChar;
    }
    if (lowerCase) {
      characterList += lowerCaseChar;
    }
    if (number) {
      characterList += digitChar;
    }
    if (symbols) {
      characterList += specialChar;
    }
    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setShowPassword(true);
  }
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;

  }
  const resetPassword = () => {
    setLowerCase(true);
    setNumber(false);
    setSymbols(false);
    setUpperCase(false);
    setPassword('');
    setShowPassword(false)

  }


  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <LinearGradient
          colors={['#ffffff', '#e9e9e9', '#d4d4d4', '#bfbfbf', '#aaaaaa']}
          style={{ height }}>
          <View style={[styles.mainView, { height }]}>
            <Text style={styles.mainHead}>Password Generator</Text>
            <Image source={Logo}
              style={styles.logo}
              resizeMode='contain' />


            <Formik
              initialValues={{ passwordLength: '' }}
              validationSchema={PasswordSchema}
              onSubmit={values => {
                Keyboard.dismiss();
                generatePassword(+values.passwordLength);
              }}
            >
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,

              }) => (
                <>

                  <View style={{marginBottom:30}}>
                    <TextInput
                      style={[styles.passInput, { marginTop: 15 }]}
                      label='Enter Password Length'
                      mode='outlined'
                      maxLength={2}
                      keyboardType='numeric'
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                    />
                    {touched.passwordLength && errors.passwordLength &&(
                      <Text style={{color:"red",paddingLeft:5}}>*{errors.passwordLength}</Text>
                    )}
                  </View>
                  <View style={styles.checkBlock}>
                    <Text>Include Lowercase Letter</Text>

                    <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                      size={25}
                      fillColor="#2ECC71"
                      disabled
                     
                      onPress={() => {setLowerCase(!lowerCase) }}

                    />
                  </View>
                  <View style={styles.checkBlock}>
                    <Text>Include UpperCase Letter</Text>

                    <BouncyCheckbox
                    isChecked={upperCase}
                      size={25}
                      fillColor="#F1C40F"
                      disableBuiltInState
                      onPress={() => {setUpperCase(!upperCase) }}
                    />
                  </View>
                  <View style={styles.checkBlock}>
                    <Text>Include Numbers</Text>

                    <BouncyCheckbox
                    isChecked={number}
                      size={25}
                      fillColor="#EC7063"
                      disableBuiltInState
                      onPress={() => {setNumber(!number) }}
                    />
                  </View>
                  <View style={styles.checkBlock}>
                    <Text>Include Symbols</Text>

                    <BouncyCheckbox
                    isChecked={symbols}
                      size={25}
                      fillColor="#3498DB"
                      disableBuiltInState
                      onPress={() => {setSymbols(!symbols) }}
                    />
                  </View>
                  <View style={styles.buttonGroup}>

                    <RNBounceable
                    disabled={!isValid}
                    onPress={handleSubmit}
                      style={[styles.buttons, styles.shadow]}><LinearGradient style={{ borderRadius: 10 }}
                        colors={['#fdc340', '#fec84f', '#fecc5d', '#ffd16a', '#ffd577']}><Text style={[styles.genButton, { color: 'white' }]}>Generate</Text></LinearGradient></RNBounceable>
                    <RNBounceable onPress={() =>{ 
                      handleReset(); 
                    resetPassword()}} style={[styles.buttons, styles.shadow]}><LinearGradient style={{ borderRadius: 10 }}
                      colors={['#8e8e8e', '#989898', '#a1a1a1', '#ababab', '#b5b5b5']}><Text style={[styles.genButton, { color: 'white' }]}>Reset</Text></LinearGradient></RNBounceable>
                  </View>
                </>
              )}
            </Formik>
            {showPassword &&
              <View style={[styles.passwordArea, styles.shadow]}>
                <Text selectable={true} style={styles.passText}>{password}</Text>
              </View>
            }

          </View>
          <Text style={{textAlign:"center"}}>© 2023 Developed by<Text style={{color:"#3498DB"}}> Kuldeep Kushwaha</Text></Text>
        </LinearGradient>
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
  logo: {
    marginTop: 30,
    height: 150,
    width: 300,
  },
  mainHead: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 'bold',
    color: 'gray',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5


  },
  passInput: {
    backgroundColor: "white",
    width: 250,
    textAlign: 'center',
  },
  checkBlock: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  genButton: {
    width: 130,
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGroup: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,

  },
  buttons: {
    borderRadius: 10
  },
  passwordArea: {
    height: 150,
    width:300,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",

    paddingHorizontal: 10
  },
  passText: {
    fontSize: 30,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 5,
  },
  scalingButton: {
    transform: [{ scale: 1 }],
    transition: { transform: { duration: 0.3 } },
    overflow: 'hidden',
  },

})