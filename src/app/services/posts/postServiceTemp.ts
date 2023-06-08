import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostType } from 'src/app/models/PostTypes';

// Typescript custom enum for search types (optional)


@Injectable({
  providedIn: 'root'
})
export class PostServiceTemp {
  // use config
  url = 'https://localhost:7129/api/';
  apiKey = ''; // <-- Enter your own key here!

  /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient) { }

  /**
  * Get data from the OmdbApi 
  * map the result to return only the results that we need
  * 
  * @param {string} title Search Term
  * @param {PostType} type movie, series, episode or empty
  * @returns Observable with the search results
  */
  getPosts(userId: string, type: PostType): Observable<any> {
    return this.http.get(`${this.url}Posts/GetPosts/${userId}`);
  }

  /**
  * Get the detailed information for an ID using the "i" parameter
  * 
  * @param {string} id imdbID to retrieve information
  * @returns Observable with detailed information
  */
  //   getDetails(id: string) {
  //     return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  //   }
}