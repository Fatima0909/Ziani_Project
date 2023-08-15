import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/login/services/auth.service';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import { Image } from 'src/app/shared/model/image';
import firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
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
  private spaceAfterUpdate:  any;
  private servicesToSaveOrUpdate: Array<any>;
  private spaceToSave: any;
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
  carFromBdd: any;


  constructor(private fb: FormBuilder, private authService: AuthService,
              private spinner: NgxSpinnerService) {
  }
  onSubmit() {
    this.updateOrSaveSpace();
  }
  createDocForm(): FormGroup {
    this.isUpdateDisabled = true;
    return this.fb.group({
        spaceTitle: [{value:  '', disabled: this.isUpdateDisabled}
          , [Validators.required, Validators.minLength(3)]],
        spaceCategory: [ '', [Validators.required]],
        spaceMail: [ {value: "" , disabled: this.isUpdateDisabled} ,null],
        spaceMobileNumber: [{value: "" , disabled: this.isUpdateDisabled}, null],
        spaceFixeNumber: [{value:'', disabled: this.isUpdateDisabled}, null],
        spaceTown: [{value:  '', disabled: this.isUpdateDisabled}],
        spaceSmallTown: [{value:  '', disabled: this.isUpdateDisabled}],
        spaceManuelAddress: [{value: '', disabled: this.isUpdateDisabled }, null],
        
      });
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
    this.docForm = this.createDocForm();
    this.serviceForm = this.createServiceForm();
    this.initAboutUsInfo();
    this.initPictures();
  }

  private initAccount() {
    this.ownerFromBddId = this.authService.currentAuthKey;
    this.isHasSpeciality = false;
  }


  private initPictures() {

    this.spacePhotos = [];

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
      const image = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.spacePhotosRefs.push(e.target?.result);
      }
      reader.readAsDataURL(image);
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
      this.spacePhotos.push(image);
      this.spinner.hide();
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
    if (!this.spacePhotos || this.spacePhotos.length < 2) {
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
    this.spaceAfterUpdate = this.space;
    if (this.spaceAfterUpdate.spaceTitle !== spaceForm.spaceTitle) {
           this.spaceToSave.spaceTitle = spaceForm.spaceTitle;
           this.spaceAfterUpdate.spaceTitle = spaceForm.spaceTitle;
      }
    if (this.spaceAfterUpdate.spaceManuelAddress !== spaceForm.spaceManuelAddress) {
      this.spaceToSave.spaceManuelAddress = spaceForm.spaceManuelAddress;
      this.spaceAfterUpdate.spaceManuelAddress = spaceForm.spaceManuelAddress;
    }
    if (this.spaceAfterUpdate.spaceNearAddress !== spaceForm.spaceNearAddress) {
      this.spaceToSave.spaceNearAddress = spaceForm.spaceNearAddress;
      this.spaceAfterUpdate.spaceNearAddress = spaceForm.spaceNearAddress;
    }
         // This treatement order is to respect between category and speciality
    if (this.spaceAfterUpdate.spaceSpeciality !== spaceForm.spaceSpeciality) {
      this.spaceToSave.spaceSpeciality = spaceForm.spaceSpeciality;
      this.spaceAfterUpdate.spaceSpeciality = spaceForm.spaceSpeciality;
    }


    if (this.isCenterSpecialties &&  spaceForm.spaceSpeciality &&  spaceForm.spaceSpeciality.length > 0) {
      this.spaceToSave.centerSpecialties = spaceForm.spaceSpeciality;
      this.spaceAfterUpdate.centerSpecialties = spaceForm.spaceSpeciality;
      this.spaceToSave.spaceSpeciality = '';
      this.spaceAfterUpdate.spaceSpeciality = '';

    }
    if (this.spaceAfterUpdate.spaceCategory !== spaceForm.spaceCategory) {
      isFilterChanged = true;
      this.spaceToSave.spaceCategory = spaceForm.spaceCategory;
      this.spaceAfterUpdate.spaceCategory = spaceForm.spaceCategory;


      if (this.isCenterSpecialties &&  spaceForm.spaceSpeciality &&  spaceForm.spaceSpeciality.length > 0) {
        this.spaceToSave.centerSpecialties = spaceForm.spaceSpeciality;
        this.spaceAfterUpdate.centerSpecialties = spaceForm.spaceSpeciality;
        this.spaceToSave.spaceSpeciality = '';
        this.spaceAfterUpdate.spaceSpeciality = '';
      }  else {
        this.spaceToSave.centerSpecialties = [];
        this.spaceAfterUpdate.centerSpecialties = [];
        this.spaceToSave.spaceSpeciality = '';
        this.spaceAfterUpdate.spaceSpeciality = '';
      }
    }

    if (this.spaceAfterUpdate.spaceMail !== spaceForm.spaceMail) {
      this.spaceToSave.spaceMail = spaceForm.spaceMail;
      this.spaceAfterUpdate.spaceMail = spaceForm.spaceMail;
    }
    if (this.spaceAfterUpdate.spaceMobileNumber !== spaceForm.spaceMobileNumber) {
      this.spaceToSave.spaceMobileNumber = spaceForm.spaceMobileNumber;
      this.spaceAfterUpdate.spaceMobileNumber = spaceForm.spaceMobileNumber;
    }
    if (this.spaceAfterUpdate.spaceFixeNumber !== spaceForm.spaceFixeNumber) {
      this.spaceToSave.spaceFixeNumber = spaceForm.spaceFixeNumber;
      this.spaceAfterUpdate.spaceFixeNumber = spaceForm.spaceFixeNumber;
    }
    if (this.spaceAfterUpdate.spaceTown !== spaceForm.spaceTown) {
      isFilterChanged = true;

      this.spaceToSave.spaceTown = spaceForm.spaceTown;
      this.spaceAfterUpdate.spaceTown = spaceForm.spaceTown;
    }
    if (this.spaceAfterUpdate.spaceSmallTown !== spaceForm.spaceSmallTown) {
      this.spaceToSave.spaceSmallTown = spaceForm.spaceSmallTown;
      this.spaceAfterUpdate.spaceSmallTown = spaceForm.spaceSmallTown;
    }
    if (this.spaceAfterUpdate.spaceDescription !== this.spaceDescription) {
      this.spaceToSave.spaceDescription = this.spaceDescription;
      this.spaceAfterUpdate.spaceDescription = this.spaceDescription;
    }
    if (this.spaceAfterUpdate.spaceFacebookLink !== this.spaceFacebookLink) {
      this.spaceToSave.spaceFacebookLink = this.spaceFacebookLink;
      this.spaceAfterUpdate.spaceFacebookLink = this.spaceFacebookLink;
    }
    if (this.spaceAfterUpdate.spaceInstaLink !== this.spaceInstaLink) {
      this.spaceToSave.spaceInstaLink = this.spaceInstaLink;
      this.spaceAfterUpdate.spaceInstaLink = this.spaceInstaLink;
    }
    if (this.spaceAfterUpdate.spaceTwitterLink !== this.spaceTwitterLink) {
      this.spaceToSave.spaceTwitterLink = this.spaceTwitterLink;
      this.spaceAfterUpdate.spaceTwitterLink = this.spaceTwitterLink;
    }
    if (this.spaceAfterUpdate.spaceLinkedinLink !== this.spaceLinkedinLink) {
           this.spaceToSave.spaceLinkedinLink = this.spaceLinkedinLink;
           this.spaceAfterUpdate.spaceLinkedinLink = this.spaceLinkedinLink;
    }
         // Update space gendre for indicators only liberal (doctors, dentistes, sage-femme, ...)
    this.spaceToSave.spaceGendre = this.space.spaceGendre ? this.space.spaceGendre : 'man';
    this.spaceAfterUpdate.spaceGendre = this.space.spaceGendre ? this.space.spaceGendre : 'man';

    if (isFilterChanged) {
      const spaceCategory = this.spaceToSave.spaceCategory ? this.spaceToSave.spaceCategory : this.space.spaceCategory;
      const spaceTown = this.spaceToSave.spaceTown ? this.spaceToSave.spaceTown : this.space.spaceTown;
      const spaceSpecialty = this.spaceToSave.spaceSpeciality ? this.spaceToSave.spaceSpeciality : this.space.spaceSpeciality;
      if (spaceSpecialty && spaceSpecialty.length > 0) {
      //  this.spaceToSave.spaceFilter = this.commonService.buildFilterThree(spaceCategory, spaceTown, spaceSpecialty);
      } else {
       // this.spaceToSave.spaceFilter = this.commonService.buildFilter(spaceCategory, spaceTown);
      }
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
      this.spaceToSave.spacePhotos =  Object.assign({}, this.spacePhotos);
    } else {
      this.spaceToSave.spacePhotos =  Object.assign({}, this.spacePhotos);
    }
    this.spaceAfterUpdate.spacePhotos = this.spaceToSave.spacePhotos;
    const spaceToUpdateKey = this.ownerFromBddId;

    if (this.spaceToSave.spaceMail) {
      this.spaceToSave.spaceMail = this.spaceToSave.spaceMail.toLowerCase();
    }
    // TODO UPDATE ITEM
  }

  private setNewSpaceValues() {
    const spaceFormData = this.docForm.getRawValue();
    this.spaceToSave.spaceTitle = spaceFormData.spaceTitle;
    if (spaceFormData.spaceManuelAddress) {
      this.spaceToSave.spaceManuelAddress = spaceFormData.spaceManuelAddress;
    }
    if (spaceFormData.spaceNearAddress) {
      this.spaceToSave.spaceNearAddress = spaceFormData.spaceNearAddress;
    }
    this.spaceToSave.spaceCategory = spaceFormData.spaceCategory;
    if (spaceFormData.spaceSpeciality) {
      this.spaceToSave.spaceSpeciality = spaceFormData.spaceSpeciality;
    }
    if (spaceFormData.spaceCenterType) {
      this.spaceToSave.spaceCenterType = spaceFormData.spaceCenterType;
    }

    if (this.isCenterSpecialties) {
      this.spaceToSave.centerSpecialties = spaceFormData.spaceSpeciality;
      this.spaceToSave.spaceSpeciality = '';
    }
    this.spaceToSave.spaceTerms = true;
    this.spaceToSave.casnos = spaceFormData.casnos;
    this.spaceToSave.militaire = spaceFormData.militaire;
    this.spaceToSave.cnas = spaceFormData.cnas;
    this.spaceToSave.spaceIsvalidateMail = true;
    this.spaceToSave.spaceIsvalidatePhone = true;
    this.spaceToSave.spaceContractType  = 2;
    this.spaceToSave.spaceCreationDate = new Date().getTime();
    this.spaceToSave.spaceChecked = true;
    this.spaceToSave.spaceTown = spaceFormData.spaceTown;
    this.spaceToSave.spaceSmallTown = spaceFormData.spaceSmallTown;

    this.spaceToSave.spaceDescription = spaceFormData.spaceDescription;

    this.spaceToSave.spaceMail = spaceFormData.spaceMail;
    if(spaceFormData.spaceMobileNumber) {
      this.spaceToSave.spaceMobileNumber = spaceFormData.spaceMobileNumber;
    }
    if (spaceFormData.spaceFixeNumber) {
      this.spaceToSave.spaceFixeNumber = spaceFormData.spaceFixeNumber;
    }
    if (spaceFormData.spaceLinkedinLink) {
      this.spaceToSave.spaceLinkedinLink = spaceFormData.spaceLinkedinLink;
    }
    if (spaceFormData.spaceFacebookLink) {
      this.spaceToSave.spaceFacebookLink = spaceFormData.spaceFacebookLink;
    }
    if (spaceFormData.spaceInstaLink) {
      this.spaceToSave.spaceInstaLink = spaceFormData.spaceInstaLink;
    }
    
    if (spaceFormData.spaceTwitterLink) {
      this.spaceToSave.spaceTwitterLink = spaceFormData.spaceTwitterLink;
    }
    this.spaceToSave.spaceSeeNumber = 1;



    const date1 = new Date('1/1/2020');
    const date2 = new Date();
    this.spaceToSave.spaceIdFilter = (date2.getTime() - date1.getTime()).toString();
  
    if (this.spaceToSave.spaceSpeciality && this.spaceToSave.spaceSpeciality.length > 0) {
  //    this.spaceToSave.spaceFilter = this.commonService.buildFilterThree(this.spaceToSave.spaceCategory, this.spaceToSave.spaceTown, this.spaceToSave.spaceSpeciality);
   //   this.spaceToSave.spaceFilterUrl = this.commonService.buildFilterFour(this.spaceToSave.spaceCategory, this.spaceToSave.spaceTown, this.spaceToSave.spaceSpeciality, this.spaceToSave.spaceIdFilter);
    } else {
     // this.spaceToSave.spaceFilter = this.commonService.buildFilter(this.spaceToSave.spaceCategory, this.spaceToSave.spaceTown);
     // this.spaceToSave.spaceFilterUrl = this.commonService.buildFilterThree(this.spaceToSave.spaceCategory, this.spaceToSave.spaceTown, this.spaceToSave.spaceIdFilter);
    }

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

    this.spaceToSave.spacePhotos =  this.spacePhotos;
    

   
    this.spaceToSave.spaceMail = this.spaceToSave.spaceMail.toLowerCase();

    
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
    /*
    Swal.fire({
      title: '',
      text: message,
      icon: 'info',
      iconColor: 'red' ,
      showCancelButton: true,
      cancelButtonText: this.translate.instant('SHARED.LABELS.CANCEL'),
      confirmButtonText: this.translate.instant('SHARED.LABELS.SIGN_IN'),
      showConfirmButton: false,
      confirmButtonColor: 'transparent',
      cancelButtonColor: 'transparent',
      customClass: {
        cancelButton :  'red_swal',
      }
    });*/
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


