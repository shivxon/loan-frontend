import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  standalone: true,
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class TeamComponent {
  team = [
    // { 
    //   name: 'Vinay Vashishtha', 
    //   role: 'Director & Mortgage Broker', 
    //   image: 'https://ui-avatars.com/api/?name=Abhitej+Malhotra&background=0D8ABC&color=fff&size=200' 
    // },
    {
      name: 'Vinay Vashishtha',
      role: 'Mortgage Broker',
      description: 'Negotiating with banks and credit lenders to find the best loan solution for the client',
      image: 'https://ui-avatars.com/api/?name=Vinay+Vashishtha&background=0D8ABC&color=fff&size=200'
    },
  ];
}
