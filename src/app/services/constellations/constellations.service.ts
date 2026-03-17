import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Constellation } from '../../models/constellation';
import { Star } from '../../models/star';
import { ConstellationLines } from '../../models/constellationlines';
import { Comments } from '../../models/comments';

@Injectable({
  providedIn: 'root'
})
export class ConstellationsService {

  constructor() { }

  async getAll(): Promise<Constellation[]> {
    const data = await fetch(API_CONFIG.CONSTELLATIONS.GET_ALL);
    if (!data.ok) throw new Error(`Error fetching constellations: ${data.status}`);
    return data.json();
  }

  async getById(id: number): Promise<Constellation> {
    const data = await fetch(API_CONFIG.CONSTELLATIONS.GET_BY_ID(id));
    if (!data.ok) throw new Error(`Error fetching constellation: ${data.status}`);
    return data.json();
  }

  async getStars(id: number): Promise<Star[]> {
    const data = await fetch(API_CONFIG.CONSTELLATIONS.GET_STARS(id));
    if (!data.ok) throw new Error(`Error fetching stars for constellation ${id}: ${data.status}`);
    return data.json();
  }

  async getConstellationLines(): Promise<ConstellationLines> {
    const data = await fetch(API_CONFIG.CONSTELLATIONS.GET_LINES);
    if (!data.ok) throw new Error(`Error fetching constellation lines: ${data.status}`);
    return data.json();
  }

  async getCommentsById(id: number): Promise<Comments[]> {
    const data = await fetch(API_CONFIG.CONSTELLATIONS.GET_COMMENTS(id));
    if (!data.ok) throw new Error(`Error fetching comments for constellation ${id}: ${data.status}`);
    return data.json();
  }
}