import React from 'react'
import { formatPopulation } from './formatter'
import { CountryInfoPanelProps } from './types'
import Button from '@material-ui/core/Button'

export const CountryInfoPanel = (props: CountryInfoPanelProps) => {
  return (
    <React.Fragment>
      {props.Country === '' ? (
        ''
      ) : (
        <div>
          <h1>{props.Country}</h1>
          <h2>Population: {formatPopulation(props.Population)}</h2>
          <Button variant="contained" onClick={props.clearClicked}>
            Clear
          </Button>
        </div>
      )}
    </React.Fragment>
  )
}
