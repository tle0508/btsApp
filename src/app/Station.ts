import { LineStation } from "./LineStation";

export type Station = {
  id: number ;
  createdDay: string;
  updatedDay: string;
  btsStationNameTH: string;
  btsStationNameENG: string;
  idStation: number;
  lineStaionModel: LineStation;
  extension: boolean;
  activate: boolean;
  url:string;
  extensionGroupNumber :number;
};