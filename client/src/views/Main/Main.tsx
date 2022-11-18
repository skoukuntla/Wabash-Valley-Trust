/* eslint-disable jsx-a11y/alt-text */
import Image from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import React from 'react'
import { Link } from 'react-router-dom'

import Building from 'components/Building/Building'

const clickHandler = () => {
  console.log('main clicked')
}

export default function Main() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const style = {
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
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">Main Page</Typography>
      <Typography variant="body1">
        Welcome! Feel free to check out all the demos here!
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Demos</Typography>
        <ul>
          <li>
            <Link to="/axios">Axios</Link>
          </li>
          <li>
            <Link to="/redux">Redux</Link>
          </li>
          <li>
            <Link to="/auth">Auth</Link>
          </li>
          <Building clickHandler={clickHandler} />
        </ul>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img src="htf-logo.png" />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Container>
  )
}
