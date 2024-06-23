import { Price } from "./Price";
import { Station } from "./Station";

export type TripExtension = {
	id: number;
	startStation: Station;
	endStation: Station;
	priceModel: Price;
	time:String;
  };
  