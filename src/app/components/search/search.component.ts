import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../actions/auth.action';
import { SearchCards } from '../../models/auth.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  searchCardText: String;
  cards: any=[];
  //searchedCards = [];

  list: any = [];

   search() {
     if(this.searchCardText.length > 1) {

     console.log(this.searchCardText);
     let searchQuery = this.searchCardText;
     this.store.dispatch({ type: AuthActions.SEARCH_CARDS, payload: searchQuery});

     this.cards = [
       {"id":8,"title":"Card Title 8","image":"http://via.placeholder.com/350x150","cardText":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer","selected":false},
       {"id":9,"title":"Card Title 9","image":"http://via.placeholder.com/350x150","cardText":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer","selected":false},
       {"id":10,"title":"Card Title 10","image":"http://via.placeholder.com/350x150","cardText":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer","selected":false},
       {"id":11,"title":"Card Title 11","image":"http://via.placeholder.com/350x150","cardText":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer","selected":false}
     ];
    }
     console.log('its happening');
   }

  // constructor(public http:Http,fb: FormBuilder, private store: Store<SearchProfession>) {
  //   // this.searchTags = this.getTags();
  //   // console.log(this.searchTags);
  //
  //   //this.getTags().subscribe(val => console.log(val));
  //   this.addSkillsForm = fb.group({
  //         'profession': new FormControl(null, Validators.required)})
  //   this.searchTags = this.getTags();
  //   console.log(this.searchTags);
  //
  // }
constructor(public http:Http,private store: Store<SearchCards>){
  this.searchTags = this.getTags();
 console.log(this.searchTags);

 // generating the initial list
     this.cards = [
       {"id":1,"title":"Card Title 1","image":"http://via.placeholder.com/350x150","cardText":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer","selected":false},
       {"id":2,"title":"Card Title 2","image":"http://via.placeholder.com/350x150","cardText":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer","selected":false},
       {"id":3,"title":"Card Title 3","image":"http://via.placeholder.com/350x150","cardText":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer","selected":false},
       {"id":4,"title":"Card Title 4","image":"http://via.placeholder.com/350x150","cardText":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer","selected":false},
       {"id":5,"title":"Card Title 5","image":"http://via.placeholder.com/350x150","cardText":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer","selected":false},
       {"id":6,"title":"Card Title 6","image":"http://via.placeholder.com/350x150","cardText":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer","selected":false},
       {"id":7,"title":"Card Title 7","image":"http://via.placeholder.com/350x150","cardText":"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer","selected":false},
       ];

}
  searchTags: any;
  data: any;

  ngOnInit() {
  }

  getTags() {
    console.log('call');

    return [{
    	"name": "Dance",
    	"code": "DANCE",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/DANCE/17a44ac9-51d0-4330-8ca5-45fd9945fb35.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Music",
    	"code": "MUSIC",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/MUSIC/1b90cac7-f42a-4c41-9fdd-8288366dbd2e.png",
    	"icon_code": "music",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Graphics & Animation",
    	"code": "GRAPHICSANIMATION",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/GRAPHICSANIMATION/505e9f14-a34b-42cd-a78b-dbe9efe61c53.png",
    	"icon_code": "desktop",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Theatre",
    	"code": "THEATRE",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/THEATRE/00baed92-e20e-462c-a016-94ffb36da78d.png",
    	"icon_code": "quote-left",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Fashion",
    	"code": "FASHION",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/FASHION/12551b35-cc48-4922-9dc9-6683118557d3.png",
    	"icon_code": "diamond",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Health & Wellness",
    	"code": "HEALTHWELNESS",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/HEALTHWELNESS/d81b118c-2ca9-4afe-a96f-d111191a033e.png",
    	"icon_code": "health",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Books",
    	"code": "BOOKS",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/BOOKS/6a632bbc-9137-440f-993e-6d0617fc0f72.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Gaming",
    	"code": "GAMING",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/GAMING/be889af1-03a3-43f3-a1a1-d32e595a3468.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Radio",
    	"code": "RADIO",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/RADIO/69068fcd-2238-4181-a282-15cf5fa4afed.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Movie",
    	"code": "MOVIE",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/MOVIE/81a22208-dba9-467f-9256-5f0bf2c60fe5.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Advertising",
    	"code": "ADVERTISING",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/ADVERTISING/31dbe5ea-f298-42f3-ad41-8e13c6eabd7f.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Newspaper & Magazines",
    	"code": "NEWSPAPERMAGAZINES",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/NEWSPAPERMAGAZINES/c5bc9609-05e7-4775-a3fd-489092b8a9ba.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Architecture",
    	"code": "ARCHITECTURE",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/ARCHITECTURE/f13725dd-c5f5-493b-9762-f61bced33024.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Television",
    	"code": "TELEVISION",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/TELEVISION/ec4cb0e1-8c5d-4e9b-a29b-480ae4023a8b.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Visual Arts",
    	"code": "VISUALARTS",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/VISUALARTS/74774171-3520-4abd-bd70-46ed157f9f2c.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Performing Arts",
    	"code": "PERFORMINGARTS",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/PERFORMINGARTS/11ddc61d-0582-432a-9b89-8ff0c7ecdcd9.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Arts",
    	"code": "ARTS",
    	"background": "http://d206s58i653k1q.cloudfront.net/images/ARTS/8692d34f-e3f0-4dac-9ffb-73f63caed92a.png",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Film",
    	"code": "FILM",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"proficiencyScale": 100,
    	"industryOrProfileType": "industry",
    	"active": true
    }, {
    	"name": "Music Instruments",
    	"code": "MUSIC_INSTRUMENTS",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Fine Arts",
    	"code": "FINE_ARTS",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Photography",
    	"code": "PHOTOGRAPHY",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Exhibition entertainment",
    	"code": "EXHIBITION_ENTERTAINMENT",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Live entertainment",
    	"code": "LIVE_ENTERTAINMENT",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Mass media entertainment industry",
    	"code": "MASS_MEDIA_ENTERTAINMENT_INDUSTRY",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Electronic entertainment",
    	"code": "ELECTRONIC_ENTERTAINMENT",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Music industry",
    	"code": "MUSIC_INDUSTRY",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Animation",
    	"code": "ANIMATION",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Graphic Design Styles",
    	"code": "GRAPHIC_DESIGN_STYLES",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Fashion Styles",
    	"code": "FASHION_STYLES",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Men's Style Bloggers",
    	"code": "MEN_S_STYLE_BLOGGERS",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Seven Dimensions of Wellness",
    	"code": "SEVEN_DIMENSIONS_OF_WELLNESS",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Top Medical Assistant Schools",
    	"code": "TOP_MEDICAL_ASSISTANT_SCHOOLS",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Computer Games",
    	"code": "COMPUTER_GAMES",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Radio Station",
    	"code": "RADIO_STATION",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Book Types",
    	"code": "BOOK_TYPES",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Genres",
    	"code": "GENRES",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Games",
    	"code": "GAMES",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Radio broadcasting",
    	"code": "RADIO_BROADCASTING",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Advertisement",
    	"code": "ADVERTISEMENT",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "Beaux Arts architecture",
    	"code": "BEAUX_ARTS_ARCHITECTURE",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "newspaper or magazines",
    	"code": "NEWSPAPER_OR_MAGAZINES",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }, {
    	"name": "television or radio programme",
    	"code": "TELEVISION_OR_RADIO_PROGRAMME",
    	"background": "",
    	"icon_code": "anchor",
    	"relatedIndustries": [],
    	"isApproved": true,
    	"active": true
    }];

  }

}
