import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss'
})
export class ReviewsComponent {
  reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      date: 'October 12, 2025',
      rating: 5,
      comment: 'Elite Finance made my home loan process incredibly smooth. Their team guided me step-by-step, and I got a much better interest rate than my bank offered!',
      product: 'Home Loan',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=ef3c50&color=fff'
    },
    {
      id: 2,
      name: 'Rohan Gupta',
      date: 'September 28, 2025',
      rating: 5,
      comment: 'Highly professional and transparent. Rahul was fantastic in explaining all the hidden fees I should watch out for. Got my business loan approved in record time.',
      product: 'Business Loan',
      avatar: 'https://ui-avatars.com/api/?name=Rohan+Gupta&background=1f5fae&color=fff'
    },
    {
      id: 3,
      name: 'Anita Desai',
      date: 'August 15, 2025',
      rating: 4,
      comment: 'Good experience overall. The application portal is very easy to use. The only delay was from the lender\'s side, but Elite Finance kept me updated throughout.',
      product: 'Personal Loan',
      avatar: 'https://ui-avatars.com/api/?name=Anita+Desai&background=26a77b&color=fff'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      date: 'July 02, 2025',
      rating: 5,
      comment: 'I was struggling to get a car loan due to some credit history issues. Abhitej stepped in, understood my situation, and found a lender who gave me a great deal.',
      product: 'Car Loan',
      avatar: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=f39c12&color=fff'
    },
    {
      id: 5,
      name: 'Meera Patel',
      date: 'June 18, 2025',
      rating: 5,
      comment: 'The team at Elite Finance are true wizards! They secured an education loan for my daughter\'s studies abroad with zero hassle. Truly grateful.',
      product: 'Education Loan',
      avatar: 'https://ui-avatars.com/api/?name=Meera+Patel&background=8e44ad&color=fff'
    },
    {
      id: 6,
      name: 'Suresh Kumar',
      date: 'May 30, 2025',
      rating: 5,
      comment: 'Best mortgage brokers in Adelaide. I compared rates with three other brokers, and Elite Finance gave me the most competitive option without any pressure tactics.',
      product: 'Home Loan',
      avatar: 'https://ui-avatars.com/api/?name=Suresh+Kumar&background=34495e&color=fff'
    }
  ];

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Customer Reviews | Elite Finance');
    this.meta.updateTag({ name: 'description', content: 'Read what our customers have to say about Elite Finance\'s loan services.' });
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
