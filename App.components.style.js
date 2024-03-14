import { StyleSheet } from 'react-native'
import color from './contains/color';
color
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    alignContent: 'center',
    justifyContent: 'center'
  },
  body: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 18
  },
  header: {
    display: "flex",
    justifyContent: "center",
    textAlign: 'center',
    alignItems: "center",
    fontSize: 36,
    color: color.primary,
    fontWeight: 'bold',
    marginBottom: -15,
  },
  iconCss: {
    marginTop:-40,
    marginBottom: 5
  },
  colorPrimary: {
    color: color.primary,
  },
  items: {
    marginTop: 30,
    paddingHorizontal: 20,


  },
})
export default styles;