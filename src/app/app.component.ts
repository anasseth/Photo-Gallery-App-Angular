import { Component, VERSION, OnInit } from "@angular/core";
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PredictionEvent } from './prediction-event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  gesture: String = "Start Hand Tracking";

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
      console.log("Closing Window")
      console.log("")
      this.close()
    }
    else if (this.gesture.toLowerCase() == "open hand") {
      console.log("")
      console.log("opening Window")
      console.log("")
      this.modalOpen = true
    }
    else if (this.gesture.toLowerCase() == "two closed hands") {
      console.log("")
      console.log("opening Window")
      console.log("")
      this.startSlides.index = 1
      this.startSlides.prevIndex = 0
      this.onBeforeSlide(this.startSlides)
    }
    else if (this.gesture.toLowerCase() == "two hands pointing") {
      console.log("")
      console.log("opening Window")
      console.log("")
      this.startSlides.index = this.startSlides.index + 1
      this.startSlides.prevIndex = this.startSlides.prevIndex == 22 ? this.startSlides.prevIndex = 0 : this.startSlides.prevIndex + 1
      this.onBeforeSlide(this.startSlides)
    }
    else if (this.gesture.toLowerCase() == "hand pointing") {
      console.log("")
      console.log("opening Window")
      console.log("")
      this.startSlides.index = this.startSlides.index - 1
      this.startSlides.prevIndex = this.startSlides.prevIndex == 0 ? this.startSlides.prevIndex = 22 : this.startSlides.prevIndex - 1
      this.onBeforeSlide(this.startSlides)
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


}
