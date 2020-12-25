export type Hit = {
  locale_names: string[]
  population: number
  _geoloc: Coordinates
}

export type Coordinates = {
  lat: number
  lng: number
}

export type CountryInfoPanelProps = {
  Country: string
  Population: number
  clearClicked: () => void
}
