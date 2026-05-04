declare module 'react-simple-maps' {
  import * as React from 'react';

  export interface ComposableMapProps {
    projection?: string | Function;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
      parallels?: [number, number];
      clipAngle?: number;
      clipExtent?: [[number, number], [number, number]];
      precision?: number;
    };
    width?: number;
    height?: number;
    viewBox?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;

  export interface GeographiesProps {
    geography?: string | object | string[];
    children?: (data: { geographies: any[]; outline: any; borders: any }) => React.ReactNode;
    parseGeographies?: (geos: any[]) => any[];
    className?: string;
    style?: React.CSSProperties;
  }

  export const Geographies: React.FC<GeographiesProps>;

  export interface GeographyProps {
    geography?: any;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onClick?: React.MouseEventHandler;
    onBlur?: React.FocusEventHandler;
    onFocus?: React.FocusEventHandler;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    className?: string;
    rsmKey?: string;
  }

  export const Geography: React.FC<GeographyProps>;

  export interface MarkerProps {
    coordinates?: [number, number];
    children?: React.ReactNode;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onClick?: React.MouseEventHandler;
    onBlur?: React.FocusEventHandler;
    onFocus?: React.FocusEventHandler;
    className?: string;
    style?: React.CSSProperties;
  }

  export const Marker: React.FC<MarkerProps>;

  export const Annotation: React.FC<any>;
  export const ZoomableGroup: React.FC<any>;
  export const Line: React.FC<any>;
  export const Sphere: React.FC<any>;
  export const Graticule: React.FC<any>;
}
