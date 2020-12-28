import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import GoogleMapReact from 'google-map-react'
import { config } from './config'
import { Hit, Coordinates } from './types'
import { fetchSuggestions } from './rest'
import { CountryInfoPanel } from './CountryInfoPanel'
import { ThemeContext, themes } from './theme-context'

const defaultMapCenter: Coordinates = {
  lat: 0.0,
  lng: 0.0,
}

export default function App() {
  const [FieldInput, setFieldInput] = useState('')
  const [Hits, setHits] = useState<Hit[]>([])
  const [Country, setCountry] = useState('')
  const [Population, setPopulation] = useState(0)
  const [MapCenter, setMapCenter] = useState<Coordinates>(defaultMapCenter)

  useEffect(() => {
    fetchSuggestions(FieldInput, setHits)
  }, [FieldInput])

  const clearClicked = () => {
    setCountry('')
    setFieldInput('')
    setPopulation(0)
  }

  const onCountrySelection = (event, values) => {
    const hit = Hits.filter((hit) => hit.locale_names[0] === values)[0]
    if (hit !== undefined) {
      setCountry(hit.locale_names[0])
      setPopulation(hit.population)
      setMapCenter(hit._geoloc)
    } else {
      console.log('Failed to find hit for ' + values)
    }
  }

  return (
    <ThemeContext.Provider value={themes.dark}>
      <CountryInfoPanel
        Country={Country}
        Population={Population}
        clearClicked={clearClicked}
      />
      <Autocomplete
        freeSolo
        options={Hits.map((hit) => hit.locale_names[0]).filter(
          (value, index, self) => self.indexOf(value) === index,
        )}
        inputValue={FieldInput}
        onInputChange={(event, values) => setFieldInput(values)}
        onChange={onCountrySelection}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search here"
            margin="normal"
            variant="outlined"
          />
        )}
      />
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: config.maps_api_key }}
          defaultCenter={defaultMapCenter}
          defaultZoom={0}
          center={MapCenter}
          zoom={0}
        />
      </div>
    </ThemeContext.Provider>
  )
}
