import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/models/Contact ';
import { ContactService } from 'src/services/ContactService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoutercontact',
  templateUrl: './ajoutercontact.component.html',
  styleUrls: ['./ajoutercontact.component.css']
})
export class AjoutercontactComponent {
  contactForm!: FormGroup; // Formulaire réactif

  constructor(
    private fb: FormBuilder, // FormBuilder pour créer le formulaire réactif
    private contactService: ContactService, // Service pour ajouter le contact
    public dialogRef: MatDialogRef<AjoutercontactComponent>, // Référence du modal
    @Inject(MAT_DIALOG_DATA) public data: Contact // Données à utiliser si modifié
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire réactif
    this.contactForm = this.fb.group({
      nom: [this.data?.nom || '', [Validators.required, Validators.minLength(3)]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      sujet: [this.data?.sujet || '', Validators.required],
      msg: [this.data?.msg || '', Validators.required]
    });
  }

  // Méthode pour ajouter un contact
  ajouterContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // Marquer tous les champs comme touchés pour afficher les erreurs
      Swal.fire('Erreur', 'Veuillez remplir tous les champs correctement.', 'error');
      return;
    }

    const contact: Contact = this.contactForm.value; // Récupérer les valeurs du formulaire
    this.contactService.createContact(contact).subscribe({
      next: (response) => {
        Swal.fire('Succès', `Contact ajouté avec succès !`, 'success');
        this.dialogRef.close(response); // Fermer le modal et retourner les données
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du contact :', err);
        Swal.fire('Erreur', 'Impossible d\'ajouter le contact.', 'error');
      }
    });
  }

  // Fermer le modal sans sauvegarder
  onCancel(): void {
    this.dialogRef.close();
  }

  // Accéder facilement aux contrôles du formulaire
  get f() {
    return this.contactForm.controls;
  }
}
