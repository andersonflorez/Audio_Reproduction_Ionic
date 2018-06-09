import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  respuesta: string = "";
  rutaAudio:string;
  mediaObject: MediaObject;
  constructor(public file: File,public transfer: FileTransfer, public navCtrl: NavController, public navParams: NavParams, public media: Media) {
  }

  downloadAudio(){


    this.respuesta = 'Descargando';
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'https://s3.amazonaws.com/audiosbiblia/PSY+-+GANGNAM+STYLE(%EA%B0%95%EB%82%A8%EC%8A%A4%ED%83%80%EC%9D%BC)+MV.ogg';
    fileTransfer.download(url, this.file.dataDirectory + 'audio.ogg').then((entry) => {
      this.respuesta = 'download complete: ' + JSON.stringify(entry);
      this.mediaObject = this.media.create(entry.nativeURL);
    }, (error) => {
      this.respuesta = 'Error: '+ JSON.stringify(error);
    });
  }

  playTrack(){
    // to listen to plugin events:

    this.mediaObject.onStatusUpdate.subscribe(status => this.respuesta = 'Cambio El estado' + JSON.stringify(status)); // fires when file status changes

    this.mediaObject.onSuccess.subscribe(() => this.respuesta = 'Carga Audio Exitosa');

    this.mediaObject.onError.subscribe(error => this.respuesta = 'Error Carga Audio'+ JSON.stringify(error));
    this.mediaObject.play();
  }

  stopTrack(){
    this.mediaObject.stop();
  }
}
