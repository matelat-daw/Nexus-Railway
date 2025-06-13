import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquesina',
  imports: [CommonModule],
  templateUrl: './marquesina.component.html',
  styleUrls: ['./marquesina.component.css']
})
export class MarquesinaComponent implements AfterViewInit {
  x = 20;
  y = 20;
  dx = 2;
  dy = 2;
  width = 0;
  height = 0;
  boxWidth = 0;
  boxHeight = 0;

  @ViewChild('marquesinaBox') box!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    this.updateWindowSize();
    this.updateBoxSize();
    this.animate();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateWindowSize();
    this.updateBoxSize();
  }

  updateWindowSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  updateBoxSize() {
    if (this.box) {
      this.boxWidth = this.box.nativeElement.offsetWidth;
      this.boxHeight = this.box.nativeElement.offsetHeight;
    }
  }

  animate() {
    setInterval(() => {
      this.updateBoxSize(); // <-- Actualiza el tamaño en cada frame

      this.x += this.dx;
      this.y += this.dy;

      // Rebote en los bordes
      if (this.x <= 0) this.dx = Math.abs(this.dx);
      if (this.x + this.boxWidth >= this.width) this.dx = -Math.abs(this.dx);

      if (this.y <= 0) this.dy = Math.abs(this.dy);
      if (this.y + this.boxHeight >= this.height) this.dy = -Math.abs(this.dy);
    }, 10);
  }
}