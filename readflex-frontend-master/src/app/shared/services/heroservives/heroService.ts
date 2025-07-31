import { Injectable } from '@angular/core';
import { HeroInfo } from '../../models/heroInfo';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  getHeroBannerInfo(): HeroInfo[] {
    const heroInfos: HeroInfo[] = [
      {
        titre: '',
        description:
          "Prenez un moment pour vous détendre avec notre nouvelle application de streaming de messages. Laissez les mots s'écouler aussi doucement qu'une tasse de café chaude, à déguster en toute tranquillité. Découvrez une nouvelle manière de lire vos messages, dans une ambiance sereine, où chaque instant compte.",
        image: '/assets/images-herobanner/aga-putra-P_p4NGz5Cb4-unsplash.jpg',
        lien: '',
      },
      {
        titre: '',
        description:
          'Prenez une pause, respirez profondément et laissez vos messages venir à vous. Comme une tasse de café au bord de l’eau, notre application vous permet de profiter d’un moment de sérénité tout en restant connecté. Découvrez une nouvelle façon de lire vos messages, en toute tranquillité, où chaque mot est savouré à son propre rythme.',
        image:
          '/assets/images-herobanner/aaron-burden-4eWwSxaDhe4-unsplash.jpg',
        lien: '',
      },
      {
        titre: '',
        description:
          "Grâce à notre plateforme, vous pouvez accéder instantanément à ces mondes imaginaires, que vous soyez dans votre salon, en voyage ou à la pause déjeuner. Nos histoires en ligne s'adaptent à votre rythme de vie. Pas besoin de vous déplacer, d’attendre une livraison ou de stocker des livres encombrants. Avec un simple clic, le monde de la littérature s’ouvre à vous, où que vous soyez et à tout moment",
        image:
          '/assets/images-herobanner/kelly-sikkema-tp_AlXyMPdE-unsplash.jpg',
        lien: '',
      },
      {
        titre: ' Tout sur Narrotu ',
        description:
          "Nos histoires en ligne sont conçues pour plaire à tous, quel que soit votre âge. Que vous soyez un adulte à la recherche d'une intrigue complexe, un adolescent avide d'aventures palpitantes, ou que vous cherchiez des récits adaptés pour vos enfants, nous avons ce qu'il vous faut.",
        image: '/assets/images-herobanner/istockphoto-2154290498-1024x1024.jpg',
        lien: '',
      },
      {
        titre: '',
        description:
          "Que vous soyez amateur de récits épiques, de drames émouvants, de récits historiques captivants ou de mystères haletants, nous avons une sélection d’histoires faite pour vous. Laissez-vous surprendre par des auteurs talentueux qui, à travers leurs mots, vous captiveront du début à la fin. Chaque histoire est conçue pour nourrir votre imagination, éveiller votre curiosité et vous offrir des moments d'évasion précieux, sans même quitter votre maison.",
        image:
          '/assets/images-herobanner/gaelle-marcel-L8SNwGUNqbU-unsplash.jpg',
        lien: '',
      },
    ];
    return heroInfos;
  }
}
