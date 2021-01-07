import { CamposFireBase } from './../interfaces/campos';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirebaseServiceService {

  data: Observable<CamposFireBase[]>

  constructor(private firestore: AngularFirestore) {
    this.data = firestore.collection('crud').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CamposFireBase;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  GetFireBase() {
    return this.data;
  }

  PostFireBase(data: CamposFireBase) {
    return this.firestore.collection('crud').add(data)
  }

  GetFireBaseID(id: string) {
    return this.firestore.doc('crud/' + id).valueChanges();
  }

  DeleteFireBase(id: string) {
    return this.firestore.doc('crud/' + id).delete();
  }

  PutFireBase(data: CamposFireBase, id: string) {
    return this.firestore.doc('crud/' + id).update(data)
  }

}
