/* eslint-disable jsx-a11y/alt-text */
import { Container, Grid, Slider } from '@mui/material'

import mapImage from 'assets/map.png'
import { markers } from 'assets/markers'
import Map from 'components/Map'

export default function Main() {
  const items = []
  for (let i = 0; i < markers.length; i += 1) {
    const item = new Array<Object>()
    item.push(markers[i].coords[0])
    item.push(markers[i].coords[1])
    item.push(markers[i].name)
    item.push(markers[i].address)
    item.push(markers[i].description)
    item.push(markers[i].img)
    item.push(markers[i].foundingYear)
    item.push(markers[i].archiStyle)
    item.push(markers[i].additionalLinks)
    const linkNames = []
    for (let j = 0; j < markers[i].additionalLinks.length; j += 1) {
      linkNames.push(new URL(markers[i].additionalLinks[j]).hostname)
    }
    item.push(linkNames)
    items.push(item)
  }
  return <Map image="/assets/map.png" markers={items} />
}
