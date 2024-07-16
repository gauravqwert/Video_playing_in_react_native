import * as React from "react";
import { View,Button,StyleSheet } from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";


export default function App() {
  const video = React.useRef(null);
  const [status,setStatus] = React.useState({});
  const[orientationIsLandscape,setOrientationIsLandscape] = React.useState(true);


  async function changeScreenOrientation(){
    if(orientationIsLandscape == true){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    else if(orientationIsLandscape==false){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
  }

  const toggleOrientation = () => {
    setOrientationIsLandscape(!orientationIsLandscape);
    changeScreenOrientation()
  }

  return(
    <View style={styles.container}>
       <Video
        ref={video}
        style={styles.video}
        source={{
          uri : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
       />
       <View style={styles.button}>
           <Button
            title={status.isPlaying ? "Pause" : "Play"}
            onPress={()=> {
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }}
           />

           <Button
            title="Change Orientation"
            onPress={toggleOrientation}
           />
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    backgroundColor :"#ecf0f1"
  },
  video:{
    alignSelf:"center",
    width:"100%",
    height:250,
  },
  button:{
    justifyContent:"center",
    alignItems:"center",
    margin:10,
  }
})