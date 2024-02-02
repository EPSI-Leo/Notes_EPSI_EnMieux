// cours.component.ts
import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/models/cours';
import { CoursService } from 'src/app/services/cours.service';


@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.scss'],
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
        //TODO Gérer l'erreur, par exemple, afficher un message à l'utilisateur
      }
    );
  }


  onDeleteClick(courId: number) {
   this.coursService.removeCours(courId).subscribe(
    (cours) => {
      this.cours = cours;
      this.isLoading = false;
      this.loadCoursByIdProf();
    },
    (error) => {
      console.error('Error while fetching cours:', error);
      this.isLoading = false;
      //TODO Gérer l'erreur, par exemple, afficher un message à l'utilisateur
    }
  );

  }

  onAddClick() {

  }

}
