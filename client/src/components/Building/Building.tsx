import L from 'leaflet'
import { Marker, Tooltip } from 'react-leaflet'

import pin from '../../assets/pin.ico'
import '../../styles/Building.css'

type BuildingProps = {
  marker: any[]
  name: React.Dispatch<React.SetStateAction<string>>
  address: React.Dispatch<React.SetStateAction<string>>
  description: React.Dispatch<React.SetStateAction<string>>
  img: React.Dispatch<React.SetStateAction<string>>
  year: React.Dispatch<React.SetStateAction<number>>
  style: React.Dispatch<React.SetStateAction<string>>
  links: React.Dispatch<React.SetStateAction<string[]>>
  linkNames: React.Dispatch<React.SetStateAction<string[]>>
  handleOpen: () => void
}

const Building = ({
  marker,
  name,
  address,
  description,
  img,
  year,
  style,
  links,
  linkNames,
  handleOpen,
}: BuildingProps) => {
  const markerIcon = L.icon({
    iconUrl: pin,
    iconSize: [50, 50],
  })

  return (
    <Marker
      position={[marker[0], marker[1]]}
      icon={markerIcon}
      eventHandlers={{
        click: () => {
          name(marker[2])
          address(marker[3])
          description(marker[4])
          img(marker[5])
          year(marker[6])
          style(marker[7])
          links(marker[8])
          linkNames(marker[9])
          handleOpen()
        },
      }}
    >
      <Tooltip direction="top" offset={[0, -25]}>
        {marker[2]}
      </Tooltip>
    </Marker>
  )
}

export default Building
