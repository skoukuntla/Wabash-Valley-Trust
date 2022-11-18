import { Box, Modal, Typography } from '@mui/material'
import L, { CRS } from 'leaflet'
import { useState } from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { ImageOverlay, MapContainer, Marker } from 'react-leaflet'

import htfLogo from '../../assets/htfLogo.png'
import Building from '../Building/Building'

type MapProps = {
  image: string
  markers: Array<Array<any>>
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function Map({ image, markers }: MapProps) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <MapContainer
        style={{ height: '500px' }}
        center={[380, 306]}
        zoom={1}
        crs={CRS.Simple}
        maxZoom={4}
      >
        <ImageOverlay
          url={image}
          bounds={[
            [0, 0],
            [628, 1024],
          ]}
          zIndex={10}
        />
        {markers.map((marker) => (
          <Marker
            position={[marker[0], marker[1]]}
            icon={L.divIcon({
              className: 'custom icon',
              html: ReactDOMServer.renderToString(<Building />),
            })}
            eventHandlers={{
              click: () => {
                handleOpen()
              },
            }}
          />
        ))}
      </MapContainer>
      <Modal
        open={open}
        onClose={handleClose}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleClose()
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <img src={htfLogo} alt="logo" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Map
