// cours.component.ts
import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss'],
})
export class CoursComponent implements OnInit {
  cours: any[] = [];
  isLoading: boolean = false;

  constructor(private coursService: CoursService) {}

  ngOnInit() {
    this.loadCoursByIdProf();
  }

  loadCoursByIdProf() {
    this.isLoading = true;

    this.coursService.getCoursByIdProf().subscribe(
      (cours) => {
        this.cours = cours;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error while fetching cours:', error);
        this.isLoading = false;
        // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
      }
    );
  }
}
