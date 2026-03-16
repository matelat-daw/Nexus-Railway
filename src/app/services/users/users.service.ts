import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API_URL = 'http://localhost:8080/api/Account'

  token = signal<string | null>(sessionStorage.getItem('auth_token'));

  constructor() { }

  async getAll(): Promise<User[]> {
    const data = await fetch(`${this.API_URL}/GetUsers`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!data.ok) throw new Error(`Error fetching users: ${data.status}`);
    return data.json();
  }

  async getInfoByNick(nick: string): Promise<User> {
    const data = await fetch(`${this.API_URL}/GetUserInfo?nick=${nick}`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!data.ok) throw new Error(`Error fetching user info: ${data.status}`);
    return data.json();
  }

  async getMyProfile(): Promise<User> {
    const data = await fetch(`${this.API_URL}/Profile`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!data.ok) throw new Error(`Error fetching user profile: ${data.status}`);
    return data.json();
  }

  async addComment(comment: string, constellationId: number): Promise<boolean> {
    try {
      const user = await this.getMyProfile();
      
      const commentData = {
        userNick: user.nick,
        comment: comment,
        constellationId: constellationId,
      };
      
      const data = await fetch('http://localhost:8080/api/Account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData),
        credentials: 'include'
      });
      if (!data.ok) throw new Error(`Error fetching user comments: ${data.status}`);
      return true;
    } catch (error: any) {
      console.error('Error al añadir comentario:', error);
      throw error;
    }
  }

  async deleteComment(id: number): Promise<boolean> {
    try{
      const data = await fetch(`http://localhost:8080/api/Account/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!data.ok) {
        const errorText = await data.text();
        throw new Error(`Error eliminando comentario: ${errorText}`);
      }
      return true;
    } catch (error: any) {
      console.error('Error al eliminar comentario:', error);
      throw error;
    }
  }

  async addFavorite(id: number): Promise<boolean> {
    const data = await fetch(`${this.API_URL}/Favorites/${id}`, {
      method: 'POST',
      credentials: 'include'
    });
    if (!data.ok) throw new Error(`Error adding favorite: ${data.status}`);
    return true;
  }

  async deleteFavorite(id: number): Promise<boolean> {
    const data = await fetch(`${this.API_URL}/Favorites/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!data.ok) throw new Error(`Error deleting favorite: ${data.status}`);
    return true;
  }

  async isMyFavorite(id: number): Promise<boolean> {
    const data = await fetch(`${this.API_URL}/Favorites/${id}`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!data.ok) throw new Error(`Error checking favorite: ${data.status}`);
    const response = await data.text();
    return response === 'true';
  }

  async editProfile(profile: User, profileImageFile?: File | null): Promise<boolean> {
    const formData = new FormData();
    formData.append('Nick', profile.nick);
    formData.append('Email', profile.email);
    formData.append('Name', profile.name);
    formData.append('Surname1', profile.surname1);
    if (profile.surname2) formData.append('Surname2', profile.surname2);
    if (profile.phoneNumber) formData.append('PhoneNumber', profile.phoneNumber.toString());
    if (profile.userLocation) formData.append('UserLocation', profile.userLocation);
    if (profile.about) formData.append('About', profile.about);
    
    if (profile.bday) {
      try {
        // Convertir a formato ISO yyyy-MM-dd
        const bdayDate = new Date(profile.bday);
        if (!isNaN(bdayDate.getTime())) {
          const isoDate = bdayDate.toISOString().split('T')[0];
          formData.append('Bday', isoDate);
        }
      } catch (e) {
        console.warn('Error al formatear la fecha de nacimiento:', e);
      }
    }
    
    if (profileImageFile) {
      formData.append('ProfileImage', profileImageFile);
    }
    
    formData.append('PublicProfile', profile.publicProfile === true ? "1" : "0");

    try {
      const response = await fetch(`${this.API_URL}/Update`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error actualizando perfil: ${errorText}`);
      }
      const responseText = await response.text();
      return responseText === "Datos Actualizados.";
    } catch (error: any) {
      console.error('Error en la actualización del perfil:', error);
      throw error;
    }
  }

  async deleteMyAccount(): Promise<void> {
    const response = await fetch(`${this.API_URL}/Delete`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) throw new Error(response.statusText);
    sessionStorage.clear();
    this.token.set(null);
    window.location.reload();
  }
}