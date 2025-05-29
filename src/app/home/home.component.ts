import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  imagenes: string[] = [
    'assets/img2.jpg',
    'assets/img3.jpg',
    'assets/img4.jpg'
  ];
  
  indiceActual: number = 0;
  
  anterior() {
    this.indiceActual = (this.indiceActual - 1 + this.imagenes.length) % this.imagenes.length;
  }
  
  siguiente() {
    this.indiceActual = (this.indiceActual + 1) % this.imagenes.length;
  }
  
}
