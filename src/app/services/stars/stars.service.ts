import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Star } from '../../models/star';

@Injectable({
  providedIn: 'root'
})
export class StarsService {

  constructor() { }

  async getAll(): Promise<Star[]> {
    const data = await fetch(API_CONFIG.STARS.GET_ALL);
    if (!data.ok) throw new Error(`Error fetching stars: ${data.status}`);
    return data.json();
  }

  async getById(id: number): Promise<Star> {
    const data = await fetch(API_CONFIG.STARS.GET_BY_ID(id));
    if (!data.ok) throw new Error(`Error fetching star ${id}: ${data.status}`);
    return data.json();
  }

}
