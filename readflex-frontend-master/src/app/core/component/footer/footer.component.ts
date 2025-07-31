import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Network } from '../../../shared/models/network';
import { UtilsService } from '../../../shared/services/utils/utils.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  constructor( private utilsService: UtilsService){}

  networks !: Network[] ;

  apps : Network[] = [
    {
      sourceImg : "/assets/img/android.png",
      link : "",
      name : "App store"
    },
    {
      sourceImg : "/assets/img/appstore.jpeg",
      link : "",
      name : "Android"
    }
  ]

  actLinks = [
    {
      label : "Nous contacter",
      link : "/contact"
    },
    {
      label : "Devenir un de nos partenaire",
      link : ""
    },
    {
      label : "auteur",
      link : ""
    }
  ]

  informLinks = [
    {
      label : "Accueil",
      link : ""
    },
    {
      label : "Nos programme",
      link : "/Nos-programme"
    },
    {
      label : "FAQ",
      link : "/faq"
    },
  ]

  ngOnInit(): void {
      this.getSocialMediaNetworks();
  }


  getSocialMediaNetworks(){
    this.networks = this.utilsService.getSocialMediaNetWorks();
  }


}
