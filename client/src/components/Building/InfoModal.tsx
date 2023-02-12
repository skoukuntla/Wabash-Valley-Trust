import internal from 'stream'

import { Box, Modal, Typography } from '@mui/material'
import { Container, fontFamily } from '@mui/system'

import htfLogo from '../../assets/htfLogo.png'

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
        <Typography id="modal-modal-description" sx={{ mt: 2, float: 'left' }}>
          {description}
        </Typography>
        <img alt="error loading img" width="250" height="250" src={img} />
      </Container>

      <div />
    </Box>
  </Modal>
)

export default InfoModal
