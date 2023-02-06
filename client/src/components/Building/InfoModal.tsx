import { Box, Modal, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

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
  text: string
  open: boolean
  handleClose: () => void
}

const InfoModal = ({ text, open, handleClose }: ModalProps) => {
  const [isFavorite, setIsFavorite] = useState(false)

  // runs whenever text gets changed, so whenever a new building modal is opened
  useEffect(() => {
    setIsFavorite(localStorage.getItem(text) === 'true')
  }, [text])

  const toggleFavorite = () => {
    localStorage.setItem(text, isFavorite ? 'false' : 'true')
    setIsFavorite(!isFavorite)
  }

  const renderFavorite = () => {
    if (isFavorite) return <div>Favorited</div>
    return <div>Not</div>
  }

  return (
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
          {text}
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {text}
        </Typography>
        <button type="button" onClick={toggleFavorite}>
          imagine a heart icon
        </button>
        {renderFavorite()}
      </Box>
    </Modal>
  )
}

export default InfoModal
