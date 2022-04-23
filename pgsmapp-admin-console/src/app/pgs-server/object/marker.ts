import { Coordinate } from './../../pgs-namespace/map.namespace';

export class Marker {
  _id: string;
  type: string;
  coordinate: Coordinate
  createdAt: Date;
  updatedAt: Date;
}
