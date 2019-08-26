import React, {Component} from 'react';
import { Button, StyleSheet, Platform, View, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { VideoCutter, VideoPlayer } from 'video-cutter'
import Orientation from 'react-native-orientation';

export default class App extends Component {
  state = {
    videoUrl: null
  }

  componentDidMount() {
    this.setState({
      videoUrl: 'http://www.tra.org.bh/media/movie/sample2.mp4'
    });
  }

  choose = () => {
    const options = {
      title: 'Select Avatar',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      let videoUrl = Platform.OS === 'ios' ? response.uri : response.path;
      this.setState({
        videoUrl
      });

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('okokokok');
      }
    });
  }

  done = () => {
    this.videoCutter.cutVideo().then(response => {
      alert(JSON.stringify(response))
    }).catch(error => {
      alert('error')
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingTop: 30, flex: 1, width: '100%' }}>
          {
            this.state.videoUrl ?
              <VideoPlayer
                videoUrl={{uri: this.state.videoUrl}}
                cache={true}
              />
              : null
          }
        </View>
      </View>
    )
    
    return (
      <View style={styles.container}>
        {
          this.state.videoUrl ?
            <View style={{ paddingTop: 30, flex: 1, width: '100%' }}>
              <Button
                onPress={this.done}
                title="Done"
              />
              <VideoCutter
                ref={el => this.videoCutter = el}
                videoUrl={this.state.videoUrl}
                description={"Description text to appear below the video"}
              />
            </View>
            :
            <>
              <Button
                onPress={this.choose}
                title="Choose"
              />
            </>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
