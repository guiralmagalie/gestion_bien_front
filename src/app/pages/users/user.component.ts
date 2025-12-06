import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  CreateUserDto, 
  UserService, 
  UserType, 
  PaginatedResponse  
} from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../components/material.module';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faUsers,
  faPlus,
  faPenToSquare,
  faTrash,
  faTruck,
  faCheckCircle,
  faClock,
  faXmark,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Ajouté
 import { StatusBooleanComponent } from '../../components/status-boolean.component';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, FaIconComponent, FontAwesomeModule, MatPaginatorModule, StatusBooleanComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: CreateUserDto[] = [];
  selectedUser: CreateUserDto = this.resetForm();
  showForm: boolean = false;
  userTypes = Object.values(UserType);
  
  // Variables pour la pagination
  currentPage: number = 0;
  pageSize: number = 20;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  icons = {
    cart: faCartShopping,
    users: faUsers,
    plus: faPlus,
    edit: faPenToSquare,
    delete: faTrash,
    truck: faTruck,
    check: faCheckCircle,
    clock: faClock,
    close: faXmark,
    search: faSearch
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  // Chargement des utilisateurs avec pagination
  loadUsers(): void {
    this.userService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (response: PaginatedResponse<CreateUserDto>) => {
        this.users = response.items;
        this.currentPage = response.currentPage;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.pageSize = response.pageSize;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erreur lors du chargement des utilisateurs');
      }
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  addUser() {
    this.selectedUser = this.resetForm();
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.selectedUser = this.resetForm();
  }

  selectUser(user: CreateUserDto) {
    this.selectedUser = { ...user };
    
    this.showForm = true;
  }

  saveUser() {
    if (this.selectedUser.userRoleID && typeof this.selectedUser.userRoleID === 'string') {
      this.selectedUser.userRoleID = (this.selectedUser.userRoleID as string)
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '');
    }

    if (!this.selectedUser.userRoleID) {
      this.selectedUser.userRoleID = [];
    }

    if (!this.selectedUser.userType) {
      this.selectedUser.userType = UserType.USER;
    }

    if (this.selectedUser.id) {
      this.userService.update(this.selectedUser.id, this.selectedUser).subscribe({
        next: () => {
          this.toastr.success('Utilisateur mis à jour !');
          this.loadUsers();
          this.cancelForm();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Erreur lors de la mise à jour');
        }
      });
    } else {
      this.userService.create(this.selectedUser).subscribe({
        next: () => {
          this.toastr.success('Utilisateur créé !');
          this.loadUsers();
          this.cancelForm();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Erreur lors de la création');
        }
      });
    }
  }

  deleteUser(id: string) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    this.userService.deleteUsers(Number(id)).subscribe({
      next: () => {
        this.toastr.success('Utilisateur supprimé !');
        this.loadUsers();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erreur lors de la suppression');
      }
    });
  }
}


  resetForm(): CreateUserDto {
    return {
      username: '',
      firstName: '',
      lastName: '',
      userCode: '',
      emailAddress: '',
      password: '',
      userType: UserType.USER, 
      userRoleID: [],
      phoneNumber: '',
      phoneCountryCode: '',
      userImage: ''
    };
  }
}