/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'

const fetchSuggestions = (query, setHits) => {
  return fetch('https://places-dsn.algolia.net/1/places/query', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
      type: 'country',
      language: 'en',
    }),
  })
    .then((response) => response.json())
    .then((json) => (json === undefined ? [] : json.hits))
    .then((hits) => setHits(hits))
}

const formatNumber = (x: string): string => {
  if (x === undefined) return ''
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function App() {
  const [FieldInput, setFieldInput] = useState('')
  const [Hits, setHits] = useState()
  const [Country, setCountry] = useState()
  const [Population, setPopulation] = useState()

  const fieldInputChanged = (event, values) => {
    setFieldInput(values)
    fetchSuggestions(values, setHits)
  }

  return (
    <React.Fragment>
      <h1>{Country}</h1>
      <h2>
        {Population === undefined
          ? ''
          : 'Population: ' + formatNumber(Population)}
      </h2>
      {Country !== '' && Country !== undefined ? (
        <Button
          variant="contained"
          onClick={() => {
            setCountry(undefined)
            setPopulation(undefined)
            setFieldInput('')
          }}
        >
          Clear
        </Button>
      ) : (
        ''
      )}
      <Autocomplete
        freeSolo
        options={
          Hits === undefined || Hits.length === 0
            ? []
            : Hits.map((hit) => hit.locale_names[0]).filter(
                (value, index, self) => self.indexOf(value) === index,
              )
        }
        inputValue={FieldInput}
        onInputChange={fieldInputChanged}
        onChange={(event, values) => {
          const hit = Hits.filter((hit) => hit.locale_names[0] === values)[0]
          if (hit !== undefined) {
            setCountry(hit.locale_names[0])
            setPopulation(hit.population)
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search here"
            margin="normal"
            variant="outlined"
          />
        )}
      />
    </React.Fragment>
  )
}
