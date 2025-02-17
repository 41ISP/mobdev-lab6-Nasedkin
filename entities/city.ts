export interface ICityRDO {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    EnglishName: string;
    PrimaryPostalCode: string;
    Region: Region;
    Country: Region;
    AdministrativeArea: AdministrativeArea;
    TimeZone: TimeZone;
    GeoPosition: GeoPosition;
    IsAlias: boolean;
    SupplementalAdminAreas: SupplementalAdminArea[];
    DataSets: string[];
  }
  
  export interface SupplementalAdminArea {
    Level: number;
    LocalizedName: string;
    EnglishName: string;
  }
  
  export interface GeoPosition {
    Latitude: number;
    Longitude: number;
    Elevation: Elevation;
  }
  
  export interface Elevation {
    Metric: Metric;
    Imperial: Metric;
  }
  
  export interface Metric {
    Value: number;
    Unit: string;
    UnitType: number;
  }
  
  export interface TimeZone {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange?: any;
  }
  
  export interface AdministrativeArea {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    Level: number;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
  }
  
  export interface Region {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  }