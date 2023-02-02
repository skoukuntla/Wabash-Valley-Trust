import { Box, Modal, Typography } from '@mui/material'

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
  description: string
  open: boolean
  handleClose: () => void
}

const InfoModal = ({ name, description, open, handleClose }: ModalProps) => (
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
        {name}
      </Typography>

      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {description}
      </Typography>
    </Box>
  </Modal>
)

export default InfoModal
