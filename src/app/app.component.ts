import { Component, VERSION, OnInit } from "@angular/core";
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

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

  openSm(content: any) {
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
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  openModal() {
    const buttonModal = document.getElementById("openModalButton")
    console.log('buttonModal', buttonModal)
    buttonModal?.click()
  }


}
