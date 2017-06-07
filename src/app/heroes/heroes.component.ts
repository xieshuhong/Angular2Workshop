import { HeroService } from './../services/hero.service';
import { Hero } from './../models/hero';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:Hero[] = [];
  selectedHero:Hero; 
  
  constructor(private heroService:HeroService,private router:Router) {}
  ngOnInit(): void {
      this.getHeroes();
    }

  getHeroes():void{
     this.heroService.getHeroes().then(heroes => this.heroes = heroes)
  }

 
 onSelect(hero:Hero):void{
    this.selectedHero = hero;
 }

 goToDetail(){
    this.router.navigate(['/detail',this.selectedHero.id])
 }

 add(name:string) {
   name = name.trim();
   if(!name){return;}
   this.heroService.create(name)
   .then( hero => {
     this.heroes.push(hero);
     this.selectedHero = null;
   })
 }

 delete(hero:Hero){
   this.heroService.delete(hero.id)
   .then(() => {
      this.heroes = this.heroes.filter(h =>h!==hero)
      if(this.selectedHero === hero){
        this.selectedHero = null;
      }
   });
 }

}