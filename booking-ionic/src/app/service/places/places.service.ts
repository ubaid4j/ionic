import {Injectable} from '@angular/core';
import {Place} from '../../model/place/place';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    private places: Place[] = [
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
    ];

    constructor(private authService: AuthService) {
    }

    public getPlaces(): Place[] {
        return [...this.places];
    }

    public find(placeId: string): Place {
        return this.places.find(place => {
            return place.id === placeId;
        });
    }
    public addPlace(title: string,
                    description: string,
                    price: number,
                    dateFrom: Date,
                    dateTo: Date): void {
        const newPlace = new Place(Math.random().toString(),
            title, description,
            'https://i0.wp.com/tripadvisor.wpengine.com/wp-content/uploads/2018/10/kenai-fords-national-park-alaska.jpg?quality=85&w=627',
            price, dateFrom, dateTo, this.authService.userId);
        this.places.push(newPlace);
    }
}
