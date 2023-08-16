import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/login/services/auth.service';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import { Image } from 'src/app/shared/model/image';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Car } from 'src/app/shared/model/car';
import { CarService } from 'src/app/shared/service/car.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  [x: string]: any;
  docForm: FormGroup;
  serviceForm: FormGroup;
  categories: any;
  specialities: any;
  space: any;
  isOpen: any;
  isUpdateAutoComplete: any;
  isLinear = false;
  isOpenAddService: any;
  spacePhotosRefs: any[] = [];
  spacePhotos: any[];
  maxSpacePhotoNumber = 5;
  isUpdateDisabled: boolean;
  spacePhotoToRemove: any [] = [];
  isPlannerConnected: boolean;
  private carAfterUpdate:  Car;
  private servicesToSaveOrUpdate: Array<any>;
  private carToSave: Car;
  private lineToUpdate: any;
  private line: any;
  private isUpdateDataLine: boolean;
  private maxUrlLength = 400 ;
  private ownerFromBddId: any;
  private basePath = "storageRdvDocs";
  spaceDescription: string;
  spaceTwitterLink: string;
  spaceFacebookLink: string;
  spaceLinkedinLink: string;
  spaceInstaLink: string;
  private slashSymbol = '/';
  towns: any;
  smallTowns: any [];
  casnos: any;
  isOpenMap: boolean;
  isHasSpace: boolean;
  isCenterSpecialties: any;
  isHasSpeciality: boolean;
  carFromBdd: Car;


  constructor(private fb: FormBuilder, private authService: AuthService,
              private spinner: NgxSpinnerService,
              private carService: CarService,  private router: Router) {
  }
  onSubmit() {
     this.updateOrSaveSpace();
  }
 
  createDocForm(): FormGroup {
    this.isUpdateDisabled = true;
    return this.fb.group({
        carTitle: [{value:  this.carFromBdd ? this.carFromBdd.carTitle : '', disabled: this.isUpdateDisabled}
          , [Validators.required, Validators.minLength(3)]],
        carModel: [ {value: this.carFromBdd ? this.carFromBdd.carModel : '' , disabled: this.isUpdateDisabled} ,[Validators.required, Validators.minLength(3)]],
        carMarque: [{value: this.carFromBdd ? this.carFromBdd.carMarque : '' , disabled: this.isUpdateDisabled}, [Validators.required, Validators.minLength(3)]],
        carYear: [{value: this.carFromBdd ? this.carFromBdd.carYear : '', disabled: this.isUpdateDisabled}, [Validators.required, Validators.minLength(3)]],
        carDescription: [{value:  this.carFromBdd ? this.carFromBdd.carDescription : '', disabled: this.isUpdateDisabled}, [Validators.required, Validators.minLength(3)]]
        
      });
  }

  returnPage(){
    this.router.navigate(['/dashboard']); 
  }

  private createServiceForm() {
    return  this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      id: ['', null],
      unit: ['dinar']
    });
  }
  ngOnInit(): void {
    this.initAccount();
    this.carFromBdd = this.carService.selectedCar;
    this.docForm = this.createDocForm();
    this.carToSave = new Car();
    this.initAboutUsInfo();
    this.initPictures();
  }

  private initAccount() {
    this.ownerFromBddId = this.authService.currentAuthKey;
    this.isHasSpeciality = false;
  }


  private initPictures() {

    this.spacePhotos = [];
    if(this.carFromBdd) {
      this.carFromBdd.carPicture.forEach(image => {
        this.spacePhotos.push(image);
      })
    }

  }

  private initAboutUsInfo(){
    this.spaceDescription = this.space ? this.space.spaceDescription : '';
    this.spaceFacebookLink = this.space ? this.space.spaceFacebookLink : '';
    this.spaceTwitterLink = this.space ? this.space.spaceTwitterLink : '';
    this.spaceLinkedinLink = this.space ? this.space.spaceLinkedinLink : '';
    this.spaceInstaLink = this.space ? this.space.spaceInstaLink: '';
  }

  
  


  loadImage(input : any) {
    console.log(input);
    input.click();
  }



  public async onFileChange($event: any) {
    const target = $event.target as HTMLInputElement;
    if(target.files && target.files.length) {
      
    const image = new Image();
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        image.imageRef = e.target?.result.toString();
        this.spacePhotosRefs.push(image);
        this.spacePhotos.push(image);
        this.spinner.hide();
      }
      reader.readAsDataURL(file);
    }
    /*
    const source = CameraSource.Photos;
    Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    }).then(image => {
      this.spinner.show();
      const blobData = this.commonService.b64toBlob(image.base64String, `image/${image.format}`);
      this.compressePhoto(blobData);
    }).catch(exp => {
      if (exp.message === ScreenConstants.ACCESS_CAMERA_DENIDED) {
        this.spinner.hide();
        this.treatMsgAccess(false, true, this.translate.instant('SHARED.MSG.ACCESS_TO_STORAGE_PHOTO_ERROR'));
      }
    });*/
  }
  
  private compressePhoto(file: any) {
    /*const maxHeight: number = Constants.MAX_PHOTO_HEIGHT;
    const maxWidth: number = Constants.MAX_PHOTO_WIDTH;
    const comprass: number = Constants.MAX_PHOTO_COMPRESS;
    if (this.platform.is('capacitor') && file.type === 'image/png') {
      this.affectImage(file);
    }else {
      this.ng2ImgMaxService.resize([file], maxWidth, maxHeight).subscribe(resultResize => {
        this.ng2ImgMaxService.compress([resultResize], comprass).subscribe(resultCompress => {
            this.affectImage(resultCompress);
          }, err => {
            this.spinner.hide();
            this.treatMsgAccess(true, false, this.translate.instant('SHARED.MSG.INFO_TECHNICAL_ERROR'));

          }
        );
      }, error => {
        this.treatMsgAccess(true, false, this.translate.instant('SHARED.MSG.INFO_TECHNICAL_ERROR'));
      });
    }
*/
  }

  affectImage(file: any) {
   /* const image = new Image();
    const reader = this.commonService.getFileReader();
    reader.onload = () => {
      image.imageRef = reader.result.toString();
    
    };
    reader.readAsDataURL(file);
  */}

  public addThisPhotoToSpace(ref: string) {
    const image = new Image();
    //image.imageRef = ref;
   // this.initSpacePhotosMsg();
    if (this.spacePhotos.length < this.maxSpacePhotoNumber) {
      this.spacePhotos.push(Object.assign({}, image ));
    } else {
     // this.treatSpacePhotosMsg(ScreenMsg.SPACE_FORM_PHOTOS_MAX_INFO);
    }
  }

  updateOrSaveSpace() {
    this.docForm.markAllAsTouched();
    if(!this.docForm.valid) {

    }
    else if (!this.spacePhotos || this.spacePhotos.length < 2) {
      this.treatMsgError ("Il faut d'ajouter au moins 2")
    }else {
      this.spinner.show();
      if (this.carFromBdd != null) {
        this.buildChangedSpaceValues();
        this.updateSpacesPhotoToFireStoreThenAddToSpaceThenUpdateSpace();
      } else {
        this.setNewSpaceValues();
        this.saveSpacesPhotoToFireStoreThenAddToSpaceThenSaveSpace();
      }
    }
  }

  resetSpace() {
    this.isUpdateDisabled = true;
  }

  getDisabled() {
    return true;
  }

  removeThisPhotoFromSpace(photo: any) {
    if ((!this.isUpdateDisabled && this.space) || (!this.space)) {
      this.spacePhotoToRemove.push(photo);
      this.spacePhotos.splice(this.spacePhotos.indexOf(photo), 1);
    }
  }

  private buildChangedSpaceValues() {

    let isFilterChanged = false;
    const spaceForm = this.docForm.getRawValue();
    this.carAfterUpdate = this.space;
    if (this.carAfterUpdate.carTitle !== spaceForm.carTitle) {
           this.carToSave.carTitle = spaceForm.carTitle;
           this.carAfterUpdate.carTitle = spaceForm.carTitle;
      }
    if (this.carAfterUpdate.carMarque !== spaceForm.carMarque) {
      this.carToSave.carMarque = spaceForm.carMarque;
      this.carAfterUpdate.carMarque = spaceForm.carMarque;
    }
    if (this.carAfterUpdate.carDescription !== spaceForm.carDescription) {
      this.carToSave.carDescription = spaceForm.carDescription;
      this.carAfterUpdate.carDescription = spaceForm.carDescription;
    }
         // This treatement order is to respect between category and speciality
    if (this.carAfterUpdate.carYear !== spaceForm.carYear) {
      this.carToSave.carYear = spaceForm.carYear;
      this.carAfterUpdate.carYear = spaceForm.carYear;
    }

    if (this.carAfterUpdate.carModel !== spaceForm.carModel) {
      this.carToSave.carModel = spaceForm.carModel;
      this.carAfterUpdate.carModel = spaceForm.carModel;
    }
  }


  

  private isExistLine() {
    return false;
    // this.lines.filter(l => l.description === this.line.description && l.name === this.line.name).length > 0;

  }




  private updateSpacesPhotoToFireStoreThenAddToSpaceThenUpdateSpace() {
    const that = this;
    let photosToSave = new Array<Image>();
    photosToSave = this.spacePhotos.filter(p => p.imageRef.length > this.maxUrlLength);
    if (photosToSave && photosToSave.length > 0) {
      const savedPhotos = new Array<Image>();
      this.updatePhotos(savedPhotos, photosToSave, 0);
    } else {
      this.updateSpaceToBdd(new Array<Image>());
    }
  }
  private updatePhotos(savedPhotos: any, photosToSave: any, pointer: any) {
      const image = new Image();
      const that = this;
      const photoKey = this.authService.getRandomKeyStorage('imageKey');
      // Get a reference to the storage service, which is used to create references in your storage bucket
      const storage = firebase.storage();
      // Create a storage reference from our storage service
      const storageRef = storage.ref();
      const storageOwnerPhotoRef = storageRef.child(`${this.basePath}/${photoKey}`);
      // Delete data:image/jpeg;base64, from owner.photo

      const uploadTask = storageOwnerPhotoRef.putString(photosToSave[pointer].imageRef.toString(), 'data_url');
      uploadTask.on('state_changed', function () {
      }, function () {
      }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          image.imageRef = downloadURL;
          image.imageId = photoKey;
          savedPhotos.push(image);
          // Svae space to bdd when all photos are saved
          if (pointer === photosToSave.length - 1) {
            that.updateSpaceToBdd(savedPhotos);
          }else {
            that.updatePhotos(savedPhotos, photosToSave, pointer + 1);
          }
        });
      });
  }
  private updateSpaceToBdd(photos: Array<any>) {
    if (this.spacePhotos.length > 1 && photos.length >= 1) {
      this.spacePhotos = this.spacePhotos.filter(p => p.imageRef.length < this.maxUrlLength);
      photos.map(image => this.spacePhotos.push( Object.assign({}, image)));
      this.carToSave.carPicture =  Object.assign({}, this.spacePhotos);
    } else {
      this.carToSave.carPicture =  Object.assign({}, this.spacePhotos);
    }
    this.carAfterUpdate.carPicture = this.carToSave.carPicture;
    const spaceToUpdateKey = this.ownerFromBddId;

  }

  private setNewSpaceValues() {
    const carFormData = this.docForm.getRawValue();
    console.log('setNewSpaceValues', this.docForm.getRawValue());
    this.carToSave.carTitle = carFormData.carTitle;
    if (carFormData.carDescription) {
      this.carToSave.carDescription = carFormData.carDescription;
    }
    if (carFormData.carMarque) {
      this.carToSave.carMarque = carFormData.carMarque;
    }
    this.carToSave.carYear = carFormData.carYear;
    if (carFormData.carModel) {
      this.carToSave.carModel = carFormData.carModel;
    }
    const date1 = new Date('1/1/2020');
    const date2 = new Date();
  }

  private saveSpacesPhotoToFireStoreThenAddToSpaceThenSaveSpace() {
    const that = this;
    let photosToSave = new Array<Image>();
    photosToSave = this.spacePhotos.filter(p => p.imageRef.length > this.maxUrlLength);
    if (photosToSave && photosToSave.length > 0) {
      const savedPhotos = new Array<Image>();
      this.savePhotos(savedPhotos , photosToSave, 0);

    } else {
      that.saveSpaceToBdd(new Array<Image>());
    }
  }
  private savePhotos(savedPhotos: any, photosToSave: any, pointer: any) {
    const that = this;
    const image = new Image();
    const photoKey = this.authService.getRandomKeyStorage("test");
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = firebase.storage();
    // Create a storage reference from our storage service
    const storageRef = storage.ref();
    const storageOwnerPhotoRef = storageRef.child(`${this.basePath}/${photoKey}`);
    // Delete data:image/jpeg;base64, from owner.photo

    const uploadTask = storageOwnerPhotoRef.putString(photosToSave[pointer].imageRef.toString(), 'data_url');
    uploadTask.on('state_changed', function () {

    }, function () {
    },  () => {
      uploadTask.snapshot.ref.getDownloadURL().then( downloadURL => {
        image.imageRef = downloadURL;
        image.imageId = photoKey;
        savedPhotos.push(image);
        if (pointer === photosToSave.length - 1) {
          this.saveSpaceToBdd(savedPhotos);
        } else {
          this.savePhotos(savedPhotos, photosToSave, pointer + 1);
        }
      });
    });
  }
  private saveSpaceToBdd(photos: Array<Image>) {
    
    this.spacePhotos = this.spacePhotos.filter(p => p.imageRef.length < this.maxUrlLength);
    photos.map(image => this.spacePhotos.push(Object.assign({}, image)));

    this.carToSave.carPicture =  this.spacePhotos;
    this.spinner.show();
    this.carService.addCarData(this.carToSave).then(res => {
      Swal.fire('Les informations est bien enregistré', '', 'success');;
    }, error => {
      console.log("error", error);
    })
    
  }



  selectionChange($event: StepperSelectionEvent) {
    if ($event.selectedIndex === 1 && ! this.isOpenMap){
      this.isOpenMap = true;
    }
  }

  private getArrayFromObject(obj: any) {
    return Object.keys(obj).map((key) => [Number(key), obj[key]]);
  }

  private treatMsgError(message: string) {
    
    Swal.fire({
      title: '',
      text: message,
      icon: 'info',
      iconColor: 'red' ,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Annuler",
     
      cancelButtonColor: 'transparent',
      customClass: {
        cancelButton :  'red_swal',
      }
    });
  }

 
  private treatMsgAccess(isError: boolean, isAlert: boolean, message: any) {
/*
    const msgClass = isError ? 'red' : isAlert ? 'orange' : 'primary';
    const iconColor = msgClass !== 'primary' ? msgClass  : '#3f51b5';
    Swal.fire({
      title: '',
      text: message,
      icon: 'info',
      iconColor: iconColor ,
      showCancelButton: true,
      cancelButtonText: this.translate.instant('SHARED.LABELS.CANCEL'),
      confirmButtonText: this.translate.instant('PATIENTS.ACTIONS.EDITEUR.ORDERS.ACCESS_TO_STORAGE_BTN'),
      showConfirmButton: true,
      confirmButtonColor: 'transparent',
      cancelButtonColor: 'transparent',
      customClass: {
        cancelButton :  msgClass + '_swal',
        confirmButton: 'primary_swal'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.onFileChange();
      }});
    */}

  private sendMessagesToOwner() {
   

  }



}


