import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from './components/Background'
import Logo from './components/Logo'
import Header from './components/Header'
import Button from './components/Button'
import TextInput from './components/TextInput'
import BackButton from './components/BackButton'
import { theme } from './core/theme'
import { emailValidator } from './validators/emailValidator'
import { passwordValidator } from './validators/passwordValidator'
import { nameValidator } from './validators/nameValidator'
import { TelnoValidator } from './validators/TelnoValidator'

export default function RegisterScreen({ navigation }) {
  const [firstname, setFirstname] = useState({value:'', error:''})
  const [lastname, setLastname] = useState({value:'', error:''})
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [telno, setTelno] = useState({value:'', error:''})

  const onSignUpPressed = () => {
    const firstnameError = nameValidator(firstname.value)
    const lastnameError = nameValidator(lastname.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const telnoError = TelnoValidator(telno.value)
    if (emailError || passwordError || firstnameError|| lastnameError || telnoError) {
      setFirstname({ ...firstname, error: firstnameError })
      setLastname({...lastname, error: lastnameError})
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setTelno({...telno, error: telnoError})
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="First Name"
        returnKeyType="next"
        value={firstname.value}
        onChangeText={(text) => setFirstname({ value: text, error: '' })}
        error={!!firstname.error}
        errorText={firstname.error}
      />
      <TextInput
        label="last name"
        returnKeyType="next"
        value={lastname.value}
        onChangeText={(text) => setLastname({ value: text, error: '' })}
        error={!!lastname.error}
        errorText={lastname.error}
      />
      
      <TextInput
        label="Telephone Number"
        returnKeyType="next"
        value={telno.value}
        onChangeText={(text) => setTelno({ value: text, error: '' })}
        error={!!telno.error}
        errorText={telno.error}
        autoCapitalize="none"
        placeholder="telephone number"
        keyboardType="numeric"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
