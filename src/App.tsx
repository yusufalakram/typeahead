/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const hitsDeserializer = (data) => {
  if (data === undefined) return []
  return data.hits
}

const defaultCountryDeserializer = (hits): string[] => {
  if (hits.length === 0) return []
  console.log(hits)
  return hits
    .map((hit) => hit.locale_names[0])
    .filter((value, index, self) => self.indexOf(value) === index)
}

export default function App() {
  const [FieldInput, setFieldInput] = useState('')
  const [Suggestions, setSuggestions] = useState([])

  const fieldInputChanged = (event, values) => {
    setFieldInput(values)
    fetch('https://places-dsn.algolia.net/1/places/query', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        query: values,
        type: 'country',
        language: 'en',
      }),
    })
      .then((response) => response.json())
      .then((data) => hitsDeserializer(data))
      .then((hits) => defaultCountryDeserializer(hits))
      .then((countries) => setSuggestions(countries))
  }

  return (
    <div>
      <Autocomplete
        freeSolo
        options={Suggestions}
        inputValue={FieldInput}
        onInputChange={fieldInputChanged}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search here"
            margin="normal"
            variant="outlined"
          />
        )}
      />
    </div>
  )
}
