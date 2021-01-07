import { AddDataPage } from './../add-data/add-data.page';
import { FirebaseServiceService } from './../../services/firebase-service.service';
import { Component, OnInit } from '@angular/core';
import { CamposFireBase } from 'src/app/interfaces/campos';
import { AlertController, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  id: string

  Data: CamposFireBase[]

  constructor(
    private fireBaseService: FirebaseServiceService,
    private navCtrl: NavController,
    public modalController: ModalController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.fireBaseService.GetFireBase().subscribe(
      res => {
        this.Data = res
        console.log("GET:", res)
      },
      err => console.log(err))
  }

  async DeleteData() {
    let IdItem = await this.id
    console.log("ID:", IdItem)
    this.fireBaseService.DeleteFireBase(IdItem);
  }

  async openModalEditPage() {
    const modal = await this.modalController.create({
      component: AddDataPage,
      cssClass: 'modal-add-data',
      componentProps: {
        'id': this.id,
        'type' : 'edit'
      }
    });
    return await modal.present();
  }

  async openModalAddPage() {
    const modal = await this.modalController.create({
      component: AddDataPage,
      cssClass: 'modal-add-data',
    });
    return await modal.present();
  }

  goAddData() {
    this.navCtrl.navigateForward('/add-data')
  }

  async DeleteAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Deletar',
      message: 'Deseja deletar o item ?',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirm Okay');
            this.DeleteData();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

}
