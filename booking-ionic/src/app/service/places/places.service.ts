import {Injectable} from '@angular/core';
import {Place} from '../../model/place/place';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {delay, map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

// availableFrom: "2019-10-16T00:44:37.642+05:00"
// availableTo: "2019-10-17T00:44:37.642+05:00"
// description: "The City of Flowers"
// imageURL: "https://i0.wp.com/tripadvisor.wpengine.com/wp-content/uploads/2018/10/kenai-fords-national-park-alaska.jpg?quality=85&w=627"
// price: 220
// title: "Peshawar"
// userId: "abc"

export interface ResDate {
    availableFrom: Date;
    availableTo: Date;
    description: string;
    imageURL: string;
    price: number;
    title: string;
    userId: string;
}

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    // tslint:disable-next-line:variable-name
    private _places: BehaviorSubject<Place[]> = new BehaviorSubject(
        [
            // new Place(
            //     '1',
            //     'Place 1',
            //     'This is very good place',
            //     'https://i0.wp.com/media-cdn.tripadvisor.com/media/photo-o/09/d4/1b/00/na-pali-coast.jpg?quality=85&w=627',
            //     22,
            //     new Date('2019-01-01'),
            //     new Date('2019-12-31'),
            //     this.authService.userId),
            // new Place(
            //     '2',
            //     'Place 1',
            //     'This is very good place',
            //     // tslint:disable-next-line:max-line-length
            //     'https://i0.wp.com/tripadvisor.wpengine.com
            //     /wp-content/uploads/2018/10/kenai-fords-national-park-alaska.jpg?quality=85&w=627',
            //     22,
            //     new Date('2019-01-01'),
            //     new Date('2019-12-31'),
            //     this.authService.userId
            // ),
            // new Place(
            //     '3',
            //     'Place 1',
            //     'This is very good place',
            //     'https://i0.wp.com/tripadvisor.wpengine.com/wp-content/uploads/2017/11/Viator_Shutterstock_348924.jpg?quality=85&w=627',
            //     22,
            //     new Date('2019-01-01'),
            //     new Date('2019-12-31'),
            //     this.authService.userId),
            // new Place(
            //     '4',
            //     'Place 1',
            //     'This is very good place',
            //     'https://i0.wp.com/media-cdn.tripadvisor.com/media/photo-o/11/37/54/13/pfeiffer-beach.jpg?quality=85&w=627',
            //     22,
            //     new Date('2019-01-01'),
            //     new Date('2019-12-31'),
            //     this.authService.userId
            // ),
        ]);

    constructor(private authService: AuthService,
                private http: HttpClient) {
    }

    public getPlaces(): Observable<Place[]> {
        return this.places;
    }

    public find(placeId: string): Observable<Place> {
        // return this.places.find(place => {
        //     return place.id === placeId;
        // });
        return this.places.pipe(take(1), map((places: Place[]) => {
            return places.find((p: Place) => {
                return p.id === placeId;
            });
        }));
    }

    /**
     * @param title title of the place
     * @param description of the place
     * @param price of the place
     * @param dateFrom of the place
     * @param dateTo of the place
     */
    public addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date): Observable<Place[]> {
        // create object of place
        const newPlace = new Place(Math.random().toString(), title, description,
            'https://i0.wp.com/tripadvisor.wpengine.com/wp-content/uploads/2018/10/kenai-fords-national-park-alaska.jpg?quality=85&w=627',
            price, dateFrom, dateTo, this.authService.userId);
        let generatedId: string = null;
        // post
        // this.http.post('https://root1-d3de6.firebaseio.com/offerd-places.json',
        //     {...newPlace, id: null}).pipe(tap((responseData) => {
        //         console.log(responseData);
        //         const name = 'name';
        //         generatedId = responseData[name];
        //         console.log(generatedId);
        // })).subscribe();
        return this.http.post('https://root1-d3de6.firebaseio.com/offerd-places.json',
            {newPlace, id: null}).pipe(switchMap(param => {
                console.log(param);
                const name = 'name';
                generatedId = param[name];
                return this.places;
        }), take(1), tap(places => {
            newPlace.id = generatedId;
            places.push(newPlace);
            this._places.next(places);
            // this._places.next(this._places.getValue().concat(newPlace));
        }));
        // this.places.push(newPlace);
        // we can write different methods in the pipe
        // take give param and do unsubscribe after param subscription
        // return this.places.pipe(take(1), delay(1000), tap((places: Place[]) => {
        //     this._places.next(this._places.getValue().concat(newPlace));
        // }));
    }
    public updatePlace(placeId: string, title: string, description: string): Observable<any> {
        let copyPlaces: Place[] = null;
        return this.places.pipe(take(1), switchMap((places: Place[]) => {
            if (places === undefined || places.length === 0) {
                return this.fetchPlaces();
            } else {
                return  this.places;
            }
            // const updatedPlaceIndex: number = places.findIndex((place: Place) => {
            //     return place.id === placeId;
            // });
            // copyPlaces = [...places];
            // const updatedPlace: Place = copyPlaces[updatedPlaceIndex];
            // updatedPlace.title = title;
            // updatedPlace.description = description;
            // copyPlaces[updatedPlaceIndex] = updatedPlace;
            // return  this.http.put(`https://root1-d3de6.firebaseio.com/offerd-places/${placeId}.json`,
            //     {newPlace: updatedPlace, id: null});
        }), switchMap((places: Place[]) => {
            const updatedPlaceIndex: number = places.findIndex((place: Place) => {
                return place.id === placeId;
            });
            copyPlaces = [...places];
            const updatedPlace: Place = copyPlaces[updatedPlaceIndex];
            updatedPlace.title = title;
            updatedPlace.description = description;
            copyPlaces[updatedPlaceIndex] = updatedPlace;
            return  this.http.put(`https://root1-d3de6.firebaseio.com/offerd-places/${placeId}.json`,
                {newPlace: updatedPlace, id: null});
        }), tap((res: {newPlace: ResDate}) => {
            console.log(res);
            this._places.next(copyPlaces);
        }));
        // return  this.places.pipe(take(1), delay(1000), tap((places: Place[]) => {
        //     // first find the index of place to be updated
        //     const updatedPlaceIndex: number = places.findIndex((place: Place) => {
        //         return place.id === placeId;
        //     });
        //     const copyPlaces: Place[] = [...places];
        //     const oldPlace: Place = copyPlaces[updatedPlaceIndex];
        //     copyPlaces[updatedPlaceIndex] =
        //         new Place(oldPlace.id, title, description, oldPlace.imageURL,
        //             oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
        //     this._places.next(copyPlaces);
        // }));
    }
    get places(): Observable<Place[]> {
        return this._places.asObservable();
    }
    public fetchPlaces(): Observable<Place[]> {
        // return this.http.get('https://root1-d3de6.firebaseio.com/offerd-places.json').pipe(tap((res: {[key: string]: ResDate}) => {
        //     console.log(res);
        // }));
        //        public id: string,
        //         public title: string,
        //         public description: string,
        //         public imageURL: string,
        //         public price: number,
        //         public availableFrom: Date,
        //         public availableTo: Date,
        //         public userId: string
        return this.http.get('https://root1-d3de6.firebaseio.com/offerd-places.json').pipe(map((res: {[key: string]: ResDate}) => {
            console.log(res);
            const places: Place[] = [];
            const newPlace = 'newPlace';
            for (const resKey in res) {
                if (res.hasOwnProperty(resKey)) {
                    const data: ResDate = res[resKey][newPlace];
                    const place: Place = new Place(resKey, data.title,
                        data.description, data.imageURL, data.price,
                        data.availableFrom, data.availableTo, data.userId);
                    places.push(place);
                }
            }
            return places;
        }), tap((places: Place[]) => {
            this._places.next(places);
        }));
    }
    public getPlace(id: string): Observable<Place> {
        return this.http.get(`https://root1-d3de6.firebaseio.com/offerd-places/${id}/newPlace.json`).pipe(map((data: Place) => {
            return data;
        }));
    }
}
