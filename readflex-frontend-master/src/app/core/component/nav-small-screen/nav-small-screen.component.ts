import { NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Network } from '../../../shared/models/network';
import { UtilsService } from '../../../shared/services/utils/utils.service';

@Component({
  selector: 'app-nav-small-screen',
  templateUrl: './nav-small-screen.component.html',
  styleUrls: ['./nav-small-screen.component.scss'],
  standalone : true,
  imports : [
    RouterLinkActive,
    RouterLink,
    NgFor
  ]
})
export class NavSmallScreenComponent implements OnInit {

  @Output() onNavigationOnSmallScreenEvent = new EventEmitter<boolean>();
  networks !: Network[] ;
  
  constructor( private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getSocialMediaNetworks();
  }

  getSocialMediaNetworks(){
    this.networks = this.utilsService.getSocialMediaNetWorks();
  }

  onNavigationClicked(){
    this.onNavigationOnSmallScreenEvent.emit(false);
  }

}
