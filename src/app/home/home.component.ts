import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({ selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.scss'],
animations: [
  trigger('Titles', [
    state('initial', style({'transform': 'translateY(-400%)', opacity: 0})),
    state('active', style({'transform': 'translateY(0%)', opacity: 1})),


    transition('initial => active', animate('1s 0s ease-in')),
    transition('active => initial', animate('1s 0s ease-in')),


  ]),
  trigger('subTitles', [
    state('initial', style({'transform': 'translateY(400%)', opacity: 0})),
    state('active', style({'transform': 'translateY(0%)', opacity: 1})),


    transition('initial => active', animate('1s 0s ease-in')),
    transition('active => initial', animate('1s 0s ease-in')),


  ]),

  trigger('show', [
    state('initial', style({opacity: 0})),
    state('active', style({opacity: 1})),


    transition('initial => active', animate('1s 0s ease-in')),
    transition('active => initial', animate('1s 0s ease-in')),


  ]),
  trigger('pullRight', [
    state('initial', style({'transform': 'translateX(-100%)', opacity: 0})),
    state('active', style({'transform': 'translateX(0%)', opacity: 1})),


    transition('initial => active', animate('1s 0s ease-in')),
    transition('active => initial', animate('1s 0s ease-in')),


  ]),
  trigger('pullLeft', [
    state('initial', style({'transform': 'translateX(200%)', opacity: 0})),
    state('active', style({'transform': 'translateX(0%)', opacity: 1})),


    transition('initial => active', animate('1s 0s ease-in')),
    transition('active => initial', animate('1s 0s ease-in')),


  ]),
  trigger('showUp', [
    state('initial', style({'transform': 'translateY(300%)', opacity: 0})),
    state('active', style({'transform': 'translateY(0%)', opacity: 1})),


    transition('initial => active', animate('1s 0s ease-out')),
    transition('active => initial', animate('1s 0s ease-out')),


  ]),
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
specialityCtrl = new FormControl('', null);
loaded = false;

bestSpecialities: any;
categories: any ;
filtredSpeciality: any;
selectedSpecialities: any;
selectedSpeciality: any;

townCtrl = new FormControl('', null);

isUpdateDisabled: any;
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

constructor (fb: FormBuilder, private router: Router, 
            ) {
  this.labelForm = fb.group({
    hideRequired: this.hideRequiredControl
  });
}


ngOnInit() {
  this.initSeo();
  this.initSpeciality();
  this.initCategories();
  this.initTowns();
  this.initLanguage();
  this.showstates = [];
  this.showUpstates = [];
  this.pullRightstates = [];
  this.pullLeftstates = [];
  this.showstates["whatTitle"] = 'initial';
  this.showstates["whyTitle"] = 'initial';
  this.showstates["serviceTitle"] = 'initial';
  this.showstates["messagingIMG"] = 'initial';
  this.showstates["callsIMG"] = 'initial';
  this.showstates["videoIMG"] = 'initial';
  this.showstates["securityIMG"] = 'initial';
  this.showstates["collaborationIMG"] = 'initial';
  this.showstates["qualityIMG"] = 'initial';
  this.showstates["pricingIMG"] = 'initial';
  this.showstates["history"] = 'initial';
  this.showstates["encryption"] = 'initial';
  this.showstates["oneClick"] = 'initial';


  this.showUpstates["whatDescription"] = 'initial';
  this.showUpstates["messaging"] = 'initial';
  this.showUpstates["messagingDescription"] = 'initial';
  this.showUpstates["calls"] = 'initial';
  this.showUpstates["callsDescription"] = 'initial';
  this.showUpstates["video"] = 'initial';
  this.showUpstates["videoDescription"] = 'initial';
  this.showUpstates["teamConnection"] = 'initial';
  this.showUpstates["teamConnectionText"] = 'initial';
  this.showUpstates["projectManagement"] = 'initial';
  this.showUpstates["projectManagementText"] = 'initial';
  this.showUpstates["reporting"] = 'initial';
  this.showUpstates["reportingText"] = 'initial';
  this.showUpstates["oneClick"] = 'initial';
  this.showUpstates["oneClickText"] = 'initial';
  this.showUpstates["history"] = 'initial';
  this.showUpstates["historyText"] = 'initial';
  this.showUpstates["encryption"] = 'initial';
  this.showUpstates["encryptionText"] = 'initial';
  this.showUpstates["contactForm"] = 'initial';

  this.pullRightstates["security"] = 'initial';
  this.pullRightstates["securityDescription"] = 'initial';
  this.pullRightstates["pricing"] = 'initial';
  this.pullRightstates["pricingDescription"] = 'initial';
  this.pullRightstates["teamConnection"] = 'initial';
  this.pullRightstates["reporting"] = 'initial';

  this.pullLeftstates["collaboration"] = 'initial';
  this.pullLeftstates["collaborationDescription"] = 'initial';
  this.pullLeftstates["quality"] = 'initial';
  this.pullLeftstates["qualityDescription"] = 'initial';
  this.pullLeftstates["projectManagement"] = 'initial';

  this.slideshowAnimation();

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
  const offsetY =  ev.detail.scrollTop;

  if (offsetY > 15) {
    //this.commonService.setNavigationState('smaller');
  } else {
    //this.commonService.setNavigationState('initial');
  }
  if (this.showUpstates["contactForm"] === 'initial') {

    if (offsetY >= (this.whatSectionTitle.nativeElement.offsetTop + this.whatSectionTitle.nativeElement.scrollHeight / 10)) {
      this.showstates["whatTitle"] = 'active';
    }}
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
  if (offsetY >= (this.whySectionTitle.nativeElement.offsetTop + this.securitySubSection.nativeElement.offsetTop  +this.securitySubSection.nativeElement.scrollHeight / 10)) {
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
  if (offsetY >= (this.progresBars.nativeElement.offsetTop - this.progresBars.nativeElement.scrollHeight/ 10)) {
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
  if(window.innerWidth > 657) {
    this.isMobile = false;
    this.imageUrl = 'assets/images/category/cover/home_web.webp';
  }else {
    this.isMobile = true;
    this.imageUrl = 'assets/images/category/cover/home_mobile.webp';
  }


  this.slideshowTextstate.push('active');
  this.slideshowTextstate.push('initial');
}



private async initSpeciality()  {
 
}

private initTowns() {
}




private initLanguage() {

}

private initCategories() {
 
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
}