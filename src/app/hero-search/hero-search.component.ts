import { HeroSearchService } from './../services/hero-search.service';
import { Router } from '@angular/router';
import { Hero } from './../models/hero';
import { Observable,Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes:Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private heroSearchService:HeroSearchService,
  private router:Router
  ) { }



  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }



 search(term:string){
   this.searchTerms.next(term);
 }

  goToDetail(hero:Hero){
    let link = ['/detail',hero.id];
    this.router.navigate(link);
  }


}
