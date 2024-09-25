import { Hit } from "instantsearch.js";
import { DocumentSnapshot, SnapshotOptions } from "firebase/firestore";


export type CityHit = {
  name: string;
} & Hit;


export class City {
  name: string;
  
  constructor(
    name: string,
  ) {
    this.name = name;
    
  }
}


export const cityConverter = {
  toFirestore: (movie: City) => {
    return {
      name: movie.name,
    };
    },
    
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return new City(
      data!.name,    
    );
    },
  
};