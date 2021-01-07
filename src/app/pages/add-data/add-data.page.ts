import { FirebaseServiceService } from './../../services/firebase-service.service';
import { CamposFireBase } from './../../interfaces/campos';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.page.html',
  styleUrls: ['./add-data.page.scss'],
})
export class AddDataPage implements OnInit {

  @Input() id: string;
  @Input() type: string;

  data: CamposFireBase = {
    nome: '',
    cidade: '',
    idade: ''
  }

  editing: boolean = false

  constructor(
    public modalCtrl: ModalController,
    private fireBaseService: FirebaseServiceService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    console.log("TYPE:", this.type)

    if (this.type == 'edit') {
      this.LoadData()
    }
  }

  LoadData() {
    this.fireBaseService.GetFireBaseID(this.id).subscribe(
      res => {
        this.data = res
        this.editing = true
      }, err => {
        console.log(err)
      })
  }

  async saveData() {
    await this.fireBaseService.PostFireBase(this.data);
    this.data = {}
    this.ToastSuccess()
    this.closeModal()
  }

  async updateData() {
    await this.fireBaseService.PutFireBase(this.data, this.id);
    this.editing = false
    this.closeModal()
  }

  closeModal() {
    this.id = null
    this.data = {}

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async ToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Registro Salvo Com Sucesso...',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

}
