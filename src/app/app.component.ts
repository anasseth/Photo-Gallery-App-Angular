import { Component, VERSION, OnInit } from "@angular/core";
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PredictionEvent } from './prediction-event';
// import { LightGallery } from 'lightgallery/lightgallery';
// import { LgQuery, lgQuery } from 'lightgallery/lgQuery';
import lightGallery from "lightgallery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  gesture: String = "Start Hand Tracking";
  optionsMenu: boolean = false;

  constructor(private modalService: NgbModal) { }

  startSlides: BeforeSlideDetail = {
    prevIndex: 22,
    index: 0,
    fromThumb: false,
    fromTouch: false
  }
  modalOpen: boolean = false;
  modalRef: any;
  closeResult?: string;
  title = 'image-gallery-test';
  name = "Angular " + VERSION.major;
  settings = {
    counter: false,
    autoplayFirstVideo: false,
    pager: true,
    galleryId: "nature",
    plugins: [lgZoom],
    mobileSettings: {
      controls: true,
      showCloseIcon: true,
      download: true,
      rotate: true
    }
  };

  ngOnInit(): void {
  }

  prediction(event: PredictionEvent) {
    this.gesture = event.getPrediction();
    console.log("Gesture", this.gesture)

    if (this.gesture.toLowerCase() == "closed hand") {
      console.log("")
      console.log("Closing Album")
      console.log("")
      this.close()
    }
    else if (this.gesture.toLowerCase() == "open hand") {
      console.log("")
      console.log("Opening Album")
      console.log("")
      this.modalOpen = true
    }
    else if (this.gesture.toLowerCase() == "two open hands") {
      console.log("")
      console.log("Opening Album")
      console.log("")
      this.openGallery();
    }
    else if (this.gesture.toLowerCase() == "two closed hands") {
      console.log("")
      console.log("Close Gallery")
      console.log("")
      this.closeSlide()
    }
    else if (this.gesture.toLowerCase() == "two hands pointing") {
      console.log("")
      console.log("Previous Slide")
      console.log("")
      this.prevSlide()
    }
    else if (this.gesture.toLowerCase() == "hand pointing") {
      console.log("")
      console.log("Next Slide")
      console.log("")
      this.nextSlide()
    }
    else if (this.gesture.toLowerCase() == "one pointed & one open hand") {
      console.log("")
      console.log("Next Slide")
      console.log("")
      this.toggleOptionsView()
    }
    else if (this.gesture.toLowerCase() == "one pointed & one closed hand") {
      console.log("")
      console.log("Next Slide")
      console.log("")
    }
  }


  openSm(content: any) {
    console.log(content)
    this.modalOpen = true
    // this.modalRef = this.modalService.open(content, { backdrop: false, size: 'xl', scrollable: true, centered: true });
  }

  close() {
    // this.modalRef.close("Success");
    this.modalOpen = false
    console.log(this.modalOpen)
  }
  open() {
    this.modalOpen = true
  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    console.log(detail)
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  openModal() {
    const buttonModal = document.getElementById("openModalButton")
    console.log('buttonModal', buttonModal)
    buttonModal?.click()
  }

  nextSlide() {
    const lg2 = document.getElementById('lg-next-1') as HTMLElement;
    lg2.click()
  }
  prevSlide() {
    const lg2 = document.getElementById('lg-prev-1') as HTMLElement;
    lg2.click()
  }
  closeSlide() {
    const lg2 = document.getElementById('lg-close-1') as HTMLElement;
    lg2.click()
  }
  openGallery() {
    const lg2 = document.getElementsByClassName("gallery-item")[0] as HTMLElement;
    lg2.click();
  }
  toggleOptionsView() {
    this.optionsMenu = !this.optionsMenu
  }


}
