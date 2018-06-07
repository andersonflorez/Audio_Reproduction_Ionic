import { NativeAudio } from '@ionic-native/native-audio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public transfer: FileTransfer, public navCtrl: NavController, public navParams: NavParams, public nativeAudio:NativeAudio) {
  }

  downloadAudio(){
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'https://s3.amazonaws.com/audiosbiblia/PSY+-+GANGNAM+STYLE(%EA%B0%95%EB%82%A8%EC%8A%A4%ED%83%80%EC%9D%BC)+MV.ogg';
    fileTransfer.download(url, 'audio.ogg').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log('Error: '+error);
    });
  }


}
