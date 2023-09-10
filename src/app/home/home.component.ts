import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Car } from '../shared/model/car';
import { CarService } from '../shared/service/car.service';

import { PictureCarouselComponent } from '../picture-carousel/picture-carousel.component';
import { Image } from '../shared/model/image';
import { MatDialog } from '@angular/material/dialog';
import { Brands } from '../shared/core/brands';
import { Energies } from '../shared/core/energies';
import { Color } from '../shared/core/color';
import { Model } from '../shared/core/model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Moment } from 'moment';
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
 
    { 
     provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {

  // Form
  labelForm: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  public navigationState: string = "initial";
  public imageUrl: string = "";

  imageUrlsPhone: string[] = [];
  public slideshowTextstate: string[] = [];
  public Titles: string[] = [];
  public subTitles: string[] = [];

  slideIndex: number = 0;
  showstates: any[] = [];
  showUpstates: string[] = [];
  pullRightstates: string[] = [];
  pullLeftstates: string[] = [];
  LoginOpened: boolean = false;

  @ViewChild('slideshow') slideshow: any;
  @ViewChild('whatSectionTitle') whatSectionTitle: any;
  @ViewChild('ourPlusTitle') ourPlusTitle: any;
  @ViewChild('messagingSubSection') messagingSubSection: any;
  @ViewChild('callsSubSection') callsSubSection: any;
  @ViewChild('videoSubSection') videoSubSection: any;
  @ViewChild('whySectionTitle') whySectionTitle: any;
  @ViewChild('securitySubSection') securitySubSection: any;
  @ViewChild('collaborationSubSection') collaborationSubSection: any;
  @ViewChild('qualitySubSection') qualitySubSection: any;
  @ViewChild('pricingSubSection') pricingSubSection: any;

  @ViewChild('companiesSectionTitle') companiesSectionTitle: any;
  @ViewChild('webPageSubSection') webPageSubSection: any;
  @ViewChild('oneAppSubSection') oneAppSubSection: any;
  @ViewChild('upSubSection') upSubSection: any;
  @ViewChild('numericSubSection') numericSubSection: any;

  @ViewChild('servicePlus') servicePlus: any;
  @ViewChild('SSO') SSO: any;
  @ViewChild('progresBars') progresBars: any;
  @ViewChild('encryption') encryption: any;
  @ViewChild('companiesContent') companiesContent: any;
  @ViewChild('contactSection') contactSection: any;
  @ViewChild('contactForm') contactForm: any;
  brandCtrl = new FormControl('');
  moteurCtrl = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });
  minYearCtrl = new FormControl();
  maxYearCtrl = new FormControl();
  energieCtrl = new FormControl('');
  transCtrl = new FormControl('');
  loaded = false;

  bestSpecialities: any;
  cars: Car[];
  filtredBrand: any;
  selectedBrands: any;
  selectedBrand: any;
  filtredEnergie: any;
  selectedEnergie: any;
  selectedEnergies: any;

  filtredColor: any;
  selectedColor: any;
  selectedColors: any;

  modelCtrl = new FormControl('', null);
  colorCtrl = new FormControl('');
  mileageCtrl = new FormControl('');
  isUpdateDisabled: boolean;
  userImage: any;
  selectedTown: string = "";
  selectedTowns = "";
  isSearchOpened: boolean = false;
  isBestSearchOpened: boolean = false;
  cgu: any;
  ppdp: any;
  instagramUrl: any;
  linkedinUrl: any;
  facebookUrl: any;
  isCategoryOpened: any;
  patientPercentValue = 0;
  todayPatientPercent = 0;
  appointmentPercent = 0;
  private selectedProUrl: any;
  isMobile: boolean = false;
  isNavActive = false;
  brands: string[];
  energies: ({ energie: string; models?: any; })[];
  selectedCars: Car[];
  colors: { name: string; hex: string; }[];
  selectedModels: any;
  selectedModel: any;
  filtredModel: Observable<any>;
  models: any;
  minYear = 1950;
  maxYear: number;
  valeurInput1: string = '';
  valeurInput2: string = '';
  valeurSelect: string = '';
  constructor(fb: FormBuilder, private dialog: MatDialog,
    private carService: CarService) {
    this.labelForm = fb.group({
      hideRequired: this.hideRequiredControl
    });
  }


  ngOnInit() {
    this.initSeo();
    this.initSpeciality();
    this.initSpecialityEnergie();
    this.initCars();
    this.initLanguage();
    this.initColors();
    this.showstates = [];
    this.showUpstates = [];
    this.pullRightstates = [];
    this.pullLeftstates = [];

    this.slideshowAnimation();
    this.maxYear = new Date().getFullYear();
  }
  champ1: string = '';
  champ2: string = '';

  verifierChamps() {
   
    
    this.champ2 = this.champ1 === '' ? '' : this.champ2;
  }

  get maxMinYear() {
    return this.maxYearCtrl.value || this.maxYear;
  }

  get minMaxYear() {
    return this.minYearCtrl.value || this.minYear;
  }

 

  toggleNav() {
    this.isNavActive = !this.isNavActive;
  }
  swipeRight() {
    this.slideIndex = this.slideshow.slideIndex;
    if (this.slideIndex === 0) {
      this.slideshowTextstate[this.slideshowTextstate.length - 1] = 'initial';
      this.slideshowTextstate[this.slideIndex] = 'active';
    } else {

      this.slideshowTextstate[this.slideIndex - 1] = 'initial';
      this.slideshowTextstate[this.slideIndex] = 'active';
    }

  }

  public scrollAnimation(ev: any) {
    const offsetY = ev.detail.scrollTop;

    if (offsetY > 15) {
      //this.commonService.setNavigationState('smaller');
    } else {
      //this.commonService.setNavigationState('initial');
    }
    if (this.showUpstates["contactForm"] === 'initial') {

      if (offsetY >= (this.whatSectionTitle.nativeElement.offsetTop + this.whatSectionTitle.nativeElement.scrollHeight / 10)) {
        this.showstates["whatTitle"] = 'active';
      }
    }
    if (offsetY >= (this.messagingSubSection.nativeElement.offsetTop + this.messagingSubSection.nativeElement.scrollHeight / 10)) {
      this.showstates["messagingIMG"] = 'active';
      this.showUpstates["messaging"] = 'active';
      this.showUpstates["messagingDescription"] = 'active';
    }
    if (offsetY >= (this.callsSubSection.nativeElement.offsetTop + this.callsSubSection.nativeElement.scrollHeight / 10)) {
      this.showstates["callsIMG"] = 'active';
      this.showUpstates["calls"] = 'active';
      this.showUpstates["callsDescription"] = 'active';
    }

    if (offsetY >= (this.videoSubSection.nativeElement.offsetTop + this.videoSubSection.nativeElement.scrollHeight / 10)) {
      this.showstates["videoIMG"] = 'active';
      this.showUpstates["video"] = 'active';
      this.showUpstates["videoDescription"] = 'active';
    }


    /* -----------------why section --------------------------*/

    if (offsetY >= (this.whySectionTitle.nativeElement.offsetTop + this.whySectionTitle.nativeElement.scrollHeight / 10)) {
      this.showstates["whyTitle"] = 'active';
    }
    if (offsetY >= (this.whySectionTitle.nativeElement.offsetTop + this.securitySubSection.nativeElement.offsetTop + this.securitySubSection.nativeElement.scrollHeight / 10)) {
      this.pullRightstates["security"] = 'active';
      this.pullRightstates["securityDescription"] = 'active';
      this.showstates["securityIMG"] = 'active';

    }
    if (offsetY >= (this.whySectionTitle.nativeElement.offsetTop + this.collaborationSubSection.nativeElement.offsetTop + this.collaborationSubSection.nativeElement.scrollHeight / 10)) {
      this.pullLeftstates["collaboration"] = 'active';
      this.pullLeftstates["collaborationDescription"] = 'active';
      this.showstates["collaborationIMG"] = 'active';
    }
    if (offsetY >= (this.whySectionTitle.nativeElement.offsetTop + this.qualitySubSection.nativeElement.offsetTop + this.qualitySubSection.nativeElement.scrollHeight / 10)) {
      this.pullLeftstates["quality"] = 'active';
      this.pullLeftstates["qualityDescription"] = 'active';
      this.showstates["qualityIMG"] = 'active';
    }
    if (offsetY >= (this.whySectionTitle.nativeElement.offsetTop + this.pricingSubSection.nativeElement.offsetTop + this.pricingSubSection.nativeElement.scrollHeight / 10)) {
      this.pullRightstates["pricing"] = 'active';
      this.pullRightstates["pricingDescription"] = 'active';
      this.showstates["pricingIMG"] = 'active';
    }

    /* ------------------ companies section --------------------*/

    if (offsetY >= (this.companiesSectionTitle.nativeElement.offsetTop + this.companiesSectionTitle.nativeElement.scrollHeight / 10)) {
      this.showstates["serviceTitle"] = 'active';
    }
    if (offsetY >= (this.companiesSectionTitle.nativeElement.offsetTop + this.webPageSubSection.nativeElement.offsetTop + +this.webPageSubSection.nativeElement.scrollHeight / 10)) {
      this.showUpstates["teamConnection"] = 'active';
      this.showUpstates["teamConnectionText"] = 'active';
      this.pullRightstates["teamConnection"] = 'active';
    }


    if (offsetY >= (this.companiesSectionTitle.nativeElement.offsetTop + this.oneAppSubSection.nativeElement.offsetTop + this.oneAppSubSection.nativeElement.scrollHeight / 10)) {
      this.showUpstates["projectManagement"] = 'active';
      this.showUpstates["projectManagementText"] = 'active';
      this.pullLeftstates["projectManagement"] = 'active';

    }
    if (offsetY >= (this.companiesSectionTitle.nativeElement.offsetTop + this.upSubSection.nativeElement.offsetTop + this.upSubSection.nativeElement.scrollHeight / 10)) {
      this.showUpstates["reporting"] = 'active';
      this.showUpstates["reportingText"] = 'active';
      this.pullRightstates["reporting"] = 'active';
    }

    if (offsetY >= (this.companiesSectionTitle.nativeElement.offsetTop + this.numericSubSection.nativeElement.offsetTop + this.numericSubSection.nativeElement.scrollHeight / 10)) {
      this.showUpstates["reporting"] = 'active';
      this.showUpstates["reportingText"] = 'active';
      this.pullRightstates["reporting"] = 'active';
    }
    if (offsetY >= (this.progresBars.nativeElement.offsetTop - this.progresBars.nativeElement.scrollHeight / 10)) {
      this.patientPercentValue = 80;
      this.todayPatientPercent = 70;
      this.appointmentPercent = 65;
    }
    if (offsetY >= (this.contactSection.nativeElement.offsetTop + (this.contactForm.nativeElement.scrollHeight / 10))) {
      this.showUpstates["contactForm"] = 'active';
    }
  }

  private slideshowAnimation() {
    this.slideIndex = 0;
    this.navigationState = 'initial';
    if (window.innerWidth > 657) {
      this.isMobile = false;
      this.imageUrl = 'assets/images/category/cover/home_web.webp';
    } else {
      this.isMobile = true;
      this.imageUrl = 'assets/images/category/cover/home_mobile.webp';
    }


    this.slideshowTextstate.push('active');
    this.slideshowTextstate.push('initial');
  }



  private initSpeciality() {

    this.brands = Brands.BRANDS;
    this.filtredBrand = this.brandCtrl.valueChanges
      .pipe(
        startWith(''),
        map(brand => brand ? this._filterSpecialities(brand) : this.brands.slice())
      );


  }

  private initColors() {

    this.colors = Color.COLOR;
    this.filtredColor = this.colorCtrl.valueChanges
      .pipe(
        startWith(''),
        map(energie => energie ? this._filterColors(energie) : this.colors.slice())
      );


  }

  private initSpecialityEnergie() {

    this.energies = Energies.ENERGIES;
    this.filtredEnergie = this.energieCtrl.valueChanges
      .pipe(
        startWith(''),
        map(energie => energie ? this._filterEnergies(energie) : this.energies.slice())
      );


  }


  private _filterSpecialities(brand: any): any {
    this.selectedBrands = [];
    return this.brands.filter(item => {
      if (item.includes(brand)) {
        this.selectedBrands.push(item);
        return true;
      };
      return false;
    })
  }
  private _filterEnergies(energie: any): any {
    this.selectedEnergies = [];
    return this.energies.filter(item => {
      if (item.energie.includes(energie)) {
        this.selectedEnergies.push(item);
        return true;
      };
      return false;
    })
  }

  private _filterColors(energie: any): any {
    this.selectedColors = [];
    return this.colors.filter(item => {
      if (item.name.includes(energie)) {
        this.selectedColors.push(item);
        return true;
      };
      return false;
    })
  }

  onBlurColor($event: any) {
    setTimeout(() => {
      if (this.selectedColors) {
        this.selectedColor = this.selectedColors[0];
        this.colorCtrl.setValue(this.selectedColor.name);
      }
    }, 200);
  }

  onBlurBrand($event: any) {
    setTimeout(() => {
      if (this.selectedBrands) {
        this.selectedBrand = this.selectedBrands[0];
        this.brandCtrl.setValue(this.selectedBrand);
        this.initModels(this.selectedBrand);
        this.modelCtrl.setValue('');
      }
    }, 200);
  }
  onBlurModel($event: FocusEvent) {
    setTimeout(() => {
      if (this.selectedModels){
        this.selectedModel = this.selectedModels[0];
        this.modelCtrl.setValue( this.selectedModel.label);
      }
    }, 200);

  }

  onBlurEnergie($event: any) {
    setTimeout(() => {
      if (this.selectedEnergies) {
        this.selectedEnergie = this.selectedEnergies[0];
        this.energieCtrl.setValue(this.selectedEnergie.energie);
      }
    }, 200);
  }

  private initModels(brand:string) {
    this.models = Model.MODELS.filter(model => model.brand.toLowerCase() === brand.toLowerCase());
    this.modelCtrl.enable();
    this.filtredModel = this.modelCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterModels(state) : this.models.slice())
      );
  }
  _filterModels(value: any): any {
    const filterValue = value?.toLowerCase();
    this.selectedModels = [];
    return this.models.filter((state: any) => {
      if (state.label.toLowerCase().indexOf(filterValue) === 0) {
        this.selectedModels.push(state);
        return true;
      }else {
        return  false;
      }
    });
  }




  private initLanguage() {

  }

  private initCars() {
    this.carService.getCars().once('value').then((res) => {
      this.cars = [];
      res.forEach(val => {
        this.cars.push(val.val());
      })
      this.filterItems();
    })
  }

  redirectToSpace(category: string) {
  }



  private initSeo() {
  }

  ngAfterViewInit(): void {
    /* window.open('https://www.esiha.net/category/medecine/generaliste/Oran', '_blank');
   
     console.log('hereIci');
     this.spaceService.findAllOwners().get().then(res => {
       res.forEach(data => {
         this.test.push(data);
       })
     //  this.setUrl(0);
     })*/
  }
  openPictures(pictures: Image[]) {
    this.dialog.open(PictureCarouselComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      panelClass: 'custom-dialog',
      data: {
        imageList: pictures,
        currentImage: pictures[0]?.imageRef,
      },
    });
  }

  filterItems() {
    this.selectedCars = this.cars.filter(car => {
      const isFiltredCar = true;
      if (this.brandCtrl.value && car.carMarque !== this.brandCtrl.value) {
        return false;
      }

      if (this.transCtrl.value && car.Transmission !== this.transCtrl.value) {
        return false;
      }

      if (this.modelCtrl.value && !car.carModel?.toLowerCase().trim().includes(this.modelCtrl.value.toLowerCase().trim())) {
        return false;
      }

      if (this.minYearCtrl.value && car.carYear < this.getYear(this.minYearCtrl.value)) {
        return false;
      }
      if (this.maxYearCtrl.value && car.carYear > this.getYear(this.maxYearCtrl.value)) {
        return false;
      }

      if (this.energieCtrl.value && car.carEnergie !== this.energieCtrl.value) {
        return false;
      }

      if (this.mileageCtrl.value && car.carMileage > this.mileageCtrl.value) {
        return false
      }

      if (this.colorCtrl.value && car.carColor !== this.colorCtrl.value) {
        return false;
      }

      return true;

    })
  }
  getYear(value: any) {
    return new Date(value).getFullYear();
  }
  chosenYearHandler(normalizedYear: any, dp: any) {
    
    dp.close();
    this.minYearCtrl.setValue(new Date(normalizedYear).getFullYear());
  }
}