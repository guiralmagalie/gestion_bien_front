import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateUserDto, UserService, UserType } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../components/material.module';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: CreateUserDto[] = [];
  selectedUser: CreateUserDto = this.resetForm();
  showForm: boolean = false;
  userTypes = Object.values(UserType);


  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Chargement des utilisateurs
  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (response: any) => {
        // récupérer la liste à l'intérieur de "items"
        this.users = response.items;
      },
      error: (err) => console.error(err)
    });
  }

  // Préparer la création d'un nouvel utilisateur
  addUser() {
    this.selectedUser = this.resetForm();
    this.showForm = true;
  }

  // Annuler le formulaire
  cancelForm() {
    this.showForm = false;
    this.selectedUser = this.resetForm();
  }

  // Sélectionner un utilisateur pour édition
  selectUser(user: CreateUserDto) {
    this.selectedUser = { ...user };
    this.showForm = true;
  }

  // Sauvegarder ou mettre à jour
  saveUser() {
  // Convertir userRoleID si c'est une string
  if (this.selectedUser.userRoleID && typeof this.selectedUser.userRoleID === 'string') {
    this.selectedUser.userRoleID = (this.selectedUser.userRoleID as string)
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== ''); // supprimer les éléments vides
  }

  // Si userRoleID vide ou null, envoyer tableau vide
  if (!this.selectedUser.userRoleID) {
    this.selectedUser.userRoleID = [];
  }

  if (this.selectedUser.id) {
    this.userService.update(this.selectedUser.id, this.selectedUser).subscribe(() => {
      this.toastr.success('Utilisateur mis à jour !');
      this.loadUsers();
      this.cancelForm();
    });
  } else {
    this.userService.create(this.selectedUser).subscribe(() => {
      this.toastr.success('Utilisateur créé !');
      this.loadUsers();
      this.cancelForm();
    });
  }
}


  // Supprimer un utilisateur
  deleteUser(id: string) {
    this.userService.delete(id).subscribe(() => {
      this.toastr.success('Utilisateur supprimé !');
      this.loadUsers();
    });
  }

  // Réinitialiser le formulaire
  resetForm(): CreateUserDto {
    return {
      username: '',
      firstname: '',
      lastname: '',
      usercode: '',
      email: '',
      password: '',
      userType: undefined,
      userRoleID: [],
      phoneNumber: '',
      phoneCountryCode: '',
      image: ''
    };
  }
}
