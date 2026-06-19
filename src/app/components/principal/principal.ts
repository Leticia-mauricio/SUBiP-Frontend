import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { Menu } from '../menu/menu';
import { Footer } from '../footer/footer';


@Component({
  selector: 'app-principal',
  imports: [RouterOutlet, Menu, Footer],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {}
