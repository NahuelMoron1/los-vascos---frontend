import { Component, inject, Input } from '@angular/core';
import { SkyWaitService } from '@skyux/indicators';
import { Feature } from 'src/app/models/Feature';
import { FeatureService } from 'src/app/services/feature.service';
import { WaitService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-add-features',
  templateUrl: './add-features.component.html',
  styleUrls: ['./add-features.component.css'],
})
export class AddFeaturesComponent {
  features: Array<Feature> = [];
  featureService = inject(FeatureService);
  waitSvc = inject(WaitService);
  featureModify: boolean = false;
  @Input() productID: string = '';
  modifyFeatures(feature: Feature, index: number) {
    this.waitSvc.displayWait(true);
    if (this.features.length > 0) {
      if (feature != undefined && feature != null) {
        this.featureModify = true;
        this.enableOrDisableFeatures(feature.name, feature.value);
        let featureName = this.getString(feature.name);
        let featureValue = this.getString(feature.value);
        if (featureName.length > 0 && featureValue.length > 0) {
          feature.name = featureName;
          feature.value = featureValue;
          this.featureService.updateOneFeature(index, feature);
          this.featureModify = false;
        } else {
          alert('No podes dejar ningun campo vacío');
        }
      } else {
        alert('Seleccione una caracteristica primero');
      }
    } else {
      alert('No hay caracteristicas para modificar');
    }
    this.waitSvc.displayWait(false);
  }
  deleteFeature(featureID: string | undefined, index: number) {
    this.waitSvc.displayWait(true);
    if (featureID != undefined) {
      this.featureService.deleteOneFeature(featureID, index);
    }
    this.waitSvc.displayWait(false);
  }
  addFeature() {
    this.waitSvc.displayWait(true);
    let featureName = this.getString('featureInp');
    let featureValue = this.getString('featureValueInp');
    if (this.productID.length > 0) {
      if (featureName.length > 0 && featureValue.length > 0) {
        let featureAux = new Feature(
          this.generateRandomId(16),
          featureName,
          featureValue,
          this.productID
        );
        this.featureService.createFeature(featureAux);
      } else {
        alert('No podes dejar ningun campo vacío');
      }
    } else {
      alert(
        'Para agregar una caracteristica primero debe completar la carga de un producto'
      );
      window.scrollTo(0, 0);
    }
    this.waitSvc.displayWait(false);
  }
  getString(name: string): string {
    //La funcion sirve para leer cada uno de los input del html, siempre y cuando sean string
    let divAux = document.getElementById(name) as HTMLInputElement;
    let miDiv = '';
    if (divAux != null && divAux != undefined) {
      miDiv = divAux.value;
    }
    return miDiv;
  }
  generateRandomId(length: number = 16): string {
    //Genera un codigo random de 16 caracteres y lo devuelve. Sirve para los ID
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  enableOrDisableFeatures(name: string, value: string) {
    const nameAux = document.getElementById(name) as HTMLInputElement;
    const valueAux = document.getElementById(value) as HTMLInputElement;
    if (this.featureModify == false) {
      nameAux.setAttribute('disabled', 'disabled');
      valueAux.setAttribute('disabled', 'disabled');
    } else {
      nameAux.removeAttribute('disabled');
      valueAux.removeAttribute('disabled');
    }
  }
}
