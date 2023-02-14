import { url } from 'inspector'
import internal from 'stream'

import { Box, Modal, Typography } from '@mui/material'
import { Container, fontFamily } from '@mui/system'

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

type ModalProps = {
  name: string
  address: string
  description: string
  img: string
  year: number
  style: string
  links: string[]
  linkNames: string[]
  open: boolean
  handleClose: () => void
}

const InfoModal = ({
  name,
  address,
  description,
  img,
  year,
  style,
  links,
  linkNames,
  open,
  handleClose,
}: ModalProps) => (
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
      <Typography
        id="modal-modal-title"
        variant="h3"
        component="h3"
        sx={{ fontFamily: 'Impact' }}
      >
        {name}
      </Typography>
      <Typography id="modal-modal-title" variant="h6" component="h6">
        {address}
      </Typography>
      <p>Founded: {year} &nbsp;</p>
      <p>Architectural Style: {style} </p>
      <Container sx={{ float: 'left', display: 'flex' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, float: 'left' }}
          >
            {description}
          </Typography>

          <div>
            <p>Additional Links:</p>
            <ul>
              <li>
                <a href={links[0]} target="_blank" rel="noreferrer">
                  {linkNames[0]}
                </a>
              </li>
              <li>
                <a href={links[1]} target="_blank" rel="noreferrer">
                  {linkNames[1]}
                </a>
              </li>
              <li>
                <a href={links[2]} target="_blank" rel="noreferrer">
                  {linkNames[2]}
                </a>
              </li>
            </ul>
          </div>
        </Container>

        <img alt="error loading img" width="250" height="250" src={img} />
      </Container>

      <div />
    </Box>
  </Modal>
)

export default InfoModal
