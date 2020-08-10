import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return (
        <View>
          <Image
            source={{
              url:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
            }}
            style={{ width: 150, height: 150 }}
          />
          <TouchableOpacity onPress={this.getPermissionsAsync}>
            <Text style={{ marginTop: 100 }}>
              Requesting for camera permission
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (hasCameraPermission === false) {
      return (
        <View>
          <Text>No access to camera</Text>

          <TouchableOpacity onPress={this.getPermissionsAsync}>
            <Text style={{ marginTop: 100 }}>
              Requesting for camera permission
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (scanned === true) {
      return (
        <View>
          <Image
            source={{
              url:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
            }}
            style={{ width: 150, height: 150 }}
          />
          <TouchableOpacity onPress={() => this.setState({ scanned: false })}>
            <Text>Tap to Scan Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (scanned === false) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      );
    }
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}
