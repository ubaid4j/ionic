import {Injectable} from '@angular/core';
import {Place} from '../../model/place/place';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {delay, map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    // tslint:disable-next-line:variable-name
    private _places: BehaviorSubject<Place[]> = new BehaviorSubject(
        [
            new Place(
                '1',
                'Place 1',
                'This is very good place',
                'https://i0.wp.com/media-cdn.tripadvisor.com/media/photo-o/09/d4/1b/00/na-pali-coast.jpg?quality=85&w=627',
                22,
                new Date('2019-01-01'),
                new Date('2019-12-31'),
                this.authService.userId),
            new Place(
                '2',
                'Place 1',
                'This is very good place',
                // tslint:disable-next-line:max-line-length
                'https://i0.wp.com/tripadvisor.wpengine.com/wp-content/uploads/2018/10/kenai-fords-national-park-alaska.jpg?quality=85&w=627',
                22,
                new Date('2019-01-01'),
                new Date('2019-12-31'),
                this.authService.userId
            ),
            new Place(
                '3',
                'Place 1',
                'This is very good place',
                'https://i0.wp.com/tripadvisor.wpengine.com/wp-content/uploads/2017/11/Viator_Shutterstock_348924.jpg?quality=85&w=627',
                22,
                new Date('2019-01-01'),
                new Date('2019-12-31'),
                this.authService.userId),
            new Place(
                '4',
                'Place 1',
                'This is very good place',
                'https://i0.wp.com/media-cdn.tripadvisor.com/media/photo-o/11/37/54/13/pfeiffer-beach.jpg?quality=85&w=627',
                22,
                new Date('2019-01-01'),
                new Date('2019-12-31'),
                this.authService.userId
            ),
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
    public updatePlace(placeId: string, title: string, description: string): Observable<Place[]> {
        return  this.places.pipe(take(1), delay(1000), tap((places: Place[]) => {
            // first find the index of place to be updated
            const updatedPlaceIndex: number = places.findIndex((place: Place) => {
                return place.id === placeId;
            });
            const copyPlaces: Place[] = [...places];
            const oldPlace: Place = copyPlaces[updatedPlaceIndex];
            copyPlaces[updatedPlaceIndex] =
                new Place(oldPlace.id, title, description, oldPlace.imageURL,
                    oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
            this._places.next(copyPlaces);
        }));
    }
    get places(): Observable<Place[]> {
        return this._places.asObservable();
    }
}
