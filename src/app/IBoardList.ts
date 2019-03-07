export interface IBoardSizeItem{
    volume: number;
    length: number;
    width: number;
    sail_min: string;
    sail_max: string;
}
export interface IBoardType{
    board_type: string;
}
export interface IBoardListItem{
    name: string;
    description?: string;
    image?: string;
    long_description?: string;
    board_types?: IBoardType[];
    sizes?: IBoardSizeItem[];
    manufacturer_logo?:string;
}
export interface IManufacturer{
    manufacturer: string;
    manufacturer_logo: string; 
    boards?: IBoardListItem[];
}

export enum FilterType{
    Manufacturer,
    BoardType,
    None
  }
export interface IFilter{
    filterName: string;
    filterType: FilterType;
    filterValues: string[];
  }
export interface IApplyFilter{
    filterType: FilterType;
    filterValue: string;
  }