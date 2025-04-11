import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/models/Contact ';
import { ContactService } from 'src/services/ContactService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifiercontact',
  templateUrl: './modifiercontact.component.html',
  styleUrls: ['./modifiercontact.component.css']
})
export class ModifiercontactComponent {
 contact: Contact; // Employé à modifier

  constructor(
    public dialogRef: MatDialogRef<ModifiercontactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact, // Données de l'employé à modifier
    private contactService: ContactService
  ) {
    this.contact = { ...data }; // Copie des données pour éviter la modification directe
  }

  // Fermer le modal sans sauvegarder
  onCancel(): void {
    this.dialogRef.close();
  }

  // Sauvegarder les modifications
  onSave(): void {
    // Vérifier que l'ID est défini avant de l'utiliser
    if (this.contact.id !== undefined) {
      this.contactService.updateContact(this.contact.id, this.contact).subscribe({
        next: () => {
          Swal.fire('Succès!', 'L\'employé a été modifié avec succès.', 'success');
          this.dialogRef.close(true); // Fermer le modal et indiquer que la modification a réussi
        },
        error: (error) => {
          console.error('Erreur lors de la modification de l\'employé', error);
          Swal.fire('Erreur!', 'Une erreur est survenue lors de la modification.', 'error');
        }
      });
    } else {
      // Si l'ID est undefined, afficher un message d'erreur
      Swal.fire('Erreur!', 'ID de l\'employé manquant.', 'error');
    }
  }
}
