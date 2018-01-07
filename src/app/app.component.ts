import { Component } from '@angular/core';
import { Http, Response } from '@angular/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private http: Http) {}
  apiKey ='RGAPI-e08c3bed-f1a3-4c3c-958a-ace81ef45e8f';
  summonerName = '';
  summonerNameDisplay = '';
  summonerIcon = '';
  summonerIconId = '';
  summonerId = '';
  summonerTier = '';
  summonerRank = '';
  searchSummoner(){
    this.http.get('https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+this.summonerName+'?api_key='+this.apiKey)
    .subscribe(
      (res: Response)=>{
        const summoner = res.json();
        console.log(summoner);
        this.summonerIconId = summoner.profileIconId;
        this.summonerIcon = 'http://ddragon.leagueoflegends.com/cdn/7.24.2/img/profileicon/'+this.summonerIconId+'.png'
        this.summonerNameDisplay = summoner.name;
        this.summonerId = summoner.id;
        this.http.get('https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/'+this.summonerId+'?api_key='+this.apiKey)
        .subscribe(
        (res: Response)=>{
        const summonerRank = res.json();
        console.log (summonerRank['0'].tier);
        this.summonerTier = summonerRank['0'].tier;
        this.summonerRank = summonerRank['0'].rank;
        }

        )
        
      }
      
      
    )
   
  }
  
  
  title = 'app';
}
