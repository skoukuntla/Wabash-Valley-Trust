/* eslint-disable jsx-a11y/alt-text */
import mapImage from 'assets/tempmap.png'
import { markers } from 'assets/tempmarkers'
import Map from 'components/Map'

export default function Main() {
  return <Map image={mapImage} markers={markers} />
}
