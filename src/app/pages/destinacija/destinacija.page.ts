import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Destinacija } from 'src/app/service/data.service';

@Component({
  selector: 'app-destinacija',
  templateUrl: './destinacija.page.html',
  styleUrls: ['./destinacija.page.scss'],
})
export class DestinacijaPage implements OnInit {
  destinacija: Destinacija | undefined;
  destinacijaId: string | null = null;
  constructor(private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {

  }

}
