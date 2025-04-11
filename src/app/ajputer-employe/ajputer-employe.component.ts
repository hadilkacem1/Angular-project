import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employe } from 'src/models/Employe';
import { EmployeeService } from 'src/services/EmployeService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajputer-employe',
  templateUrl: './ajputer-employe.component.html',
  styleUrls: ['./ajputer-employe.component.css']
})
export class AjputerEmployeComponent implements OnInit {
  employeForm!: FormGroup; // Formulaire réactif

  constructor(
    private fb: FormBuilder, // FormBuilder pour créer le formulaire
    private employeService: EmployeeService,
    public dialogRef: MatDialogRef<AjputerEmployeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employe // Données de l'employé à modifier
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire réactif
    this.employeForm = this.fb.group({
      name: [this.data?.name || '', [Validators.required, Validators.minLength(3)]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.phone || '', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
      departement: [this.data?.departement || '', Validators.required]
    });
  }

  // Méthode pour ajouter un employé
  ajouterEmploye(): void {
    if (this.employeForm.invalid) {
      this.employeForm.markAllAsTouched(); // Marquer tous les champs comme touchés pour afficher les erreurs
      Swal.fire('Erreur', 'Veuillez remplir tous les champs correctement.', 'error');
      return;
    }

    const employe: Employe = this.employeForm.value; // Récupérer les valeurs du formulaire
    this.employeService.addEmployee(employe).subscribe({
      next: (response) => {
        Swal.fire('Succès', `Employé ${response.name} ajouté avec succès !`, 'success');
        this.dialogRef.close(response); // Fermer le modal et retourner les données
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout :', err);
        Swal.fire('Erreur', 'Impossible d\'ajouter l\'employé.', 'error');
      }
    });
  }

  // Fermer le modal sans sauvegarder
  onCancel(): void {
    this.dialogRef.close();
  }

  // Raccourci pour accéder facilement aux contrôles du formulaire
  get f() {
    return this.employeForm.controls;
  }
}