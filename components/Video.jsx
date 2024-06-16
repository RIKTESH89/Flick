import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image,} from 'react-native'
import { Video } from 'expo-av';
import { CameraView,useCameraPermissions,Camera,useMicrophonePermissions } from "expo-camera";
import { useState,useRef } from "react";
import { StatusBar, Button } from 'react-native';

export default function FlickVideo({navigation}) {
    const {type,setType} = useState('back')
    const video = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [startCamera, setStartCamera] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedVideo, setCapturedVideo] = useState(null);
    const [camera,setCamera] = useState(null)
    const [micpermission, micrequestPermission] = useMicrophonePermissions();


    if(!permission || !micpermission) {
        // Camera permissions are still loading
        return <View />
    }
    if(!permission.granted ) {
        // Camera permissions are not granted yet
        return (
            <View>
                <Text>Camera permissions are not granted yet</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        )
    }
    if(!micpermission.granted ) {
        // Camera permissions are not granted yet
        return (
            <View>
                <Text>Mic permissions are not granted yet</Text>
                <Button onPress={micrequestPermission} title="grant permission" />
            </View>
        )
    }
    if(!permission.granted || !micpermission.granted) {

        return (
            <View>
                <Text>Mic permissions are not granted yet</Text>
            </View>
        )
    }

    const startVideo = async () => {
        if(permission && permission.granted && micpermission && micpermission.granted){
            console.log("Camera Started")
            setStartCamera(true)
        }
        else{
            Alert.alert('Permission denied')
        }
    }

    const toggleCameraFacing = () => {
        setType((current)=> current === "back" ? "front" : "back");
    }

    const recordVideo = async () => {
        if (camera && camera.recordAsync) {
          try {
            console.log('Starting video recording...');
            const videoRecordPromise = camera.recordAsync({
              maxDuration: 3, // Duration in seconds
            });
      
            if (videoRecordPromise) {
              const recording = await videoRecordPromise;
              console.log('Video recording finished:', recording);
              setCapturedVideo(recording.uri);
              setPreviewVisible(true);
              setStartCamera(false);
            } else {
              console.log('Video record promise is null');
            }
          } catch (error) {
            console.error('Error recording video:', error);
            Alert.alert('Error', 'Failed to record video: ' + error.message);
          }
        } else {
          console.error('Camera reference is null or recordAsync is not available');
        }
      };
      
      
     
    const stopVideo = () => {
        camera.stopRecording();
        setPreviewVisible(true);
        setStartCamera(false);
    }

    const retakeVideo = () => {
        setCapturedVideo(null)
        setPreviewVisible(false)
        startVideo()
    }

    return (
    <View style={styles.container}>
      {true ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedVideo ? (
            <VideoPreview recording={capturedVideo} retakeVideo={retakeVideo} />
          ) : (
            <CameraView
              facing={type}
              flash='off'
              mode="video"
              videoQuality="720p"
              style={{flex: 1}}
              ref={ref => setCamera(ref)}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                ></View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={recordVideo}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                    <TouchableOpacity
                      onPress={stopVideo}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#f18973'
                      }}
                    />
                  </View>
                </View>
              </View>
            </CameraView>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={startVideo}
            style={{
              width: 130,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take Video
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>

  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });
  
  
  
  
  const VideoPreview = ({recording, retakeVideo}) => {
    const [status, setStatus] = useState({});
    const video = useRef(null);

    console.log('sdsfds', recording)
    return (
      <View>
        <Video
        ref={video}
        style={{height: 680, width: 450}}
        source={{
        uri: recording.uri,
        }}
        // useNativeControls
        // resizeMode="contain"
        // isLooping
        // onPlaybackStatusUpdate={status => setStatus(() => status)}
        // />
        // <View style={styles.button}>
        //         <Button
        //         title={status.isPlaying ? 'Pause' : 'Play'}
        //         onPress={() =>
        //         status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
        // }
            />
        {/* </View> */}
        <Button
          onPress={retakeVideo}
          title="Retake"
        />
      </View>
    )
  }  















