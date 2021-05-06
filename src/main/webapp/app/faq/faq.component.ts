import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FAQComponent {
  constructor(private router: Router) {}
  //
  // myFunc()  {
  //   var ans = ((document.getElementById("answer") as HTMLInputElement).value);
  //   console.log(ans);
  //
  // }
}
