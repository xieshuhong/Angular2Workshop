import { HeroService } from './../services/hero.service';
import { Hero } from './../models/hero';
import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute,Params} from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input()
  hero:Hero;
  
  constructor(private heroService:HeroService,private route:ActivatedRoute,private location:Location) { }

  ngOnInit() {
    this.route.params.switchMap((params:Params) =>
    this.heroService.getHero(+params['id']))
    .subscribe(hero => this.hero = hero);
  }

  back(){
    this.location.back();
  }

  save(){
    this.heroService.update(this.hero)
    .then(() => this.back());
  }

}
