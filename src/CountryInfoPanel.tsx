import React, { useContext } from 'react'
import { formatPopulation } from './formatter'
import { CountryInfoPanelProps } from './types'
import Button from '@material-ui/core/Button'
import { ThemeContext } from './theme-context'

export const CountryInfoPanel = (props: CountryInfoPanelProps) => {
  const themeContext = useContext(ThemeContext)

  return props.Country === '' ? null : (
    <div>
      <h1 style={{ color: themeContext.background }}>{props.Country}</h1>
      <h2>Population: {formatPopulation(props.Population)}</h2>
      <Button variant="contained" onClick={props.clearClicked}>
        Clear
      </Button>
    </div>
  )
}
