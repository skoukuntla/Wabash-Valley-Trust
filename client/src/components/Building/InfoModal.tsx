import { faHeart as HeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as HeartSolid } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  Button,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import '../../styles/InfoModal.css'

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
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
}: ModalProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [title, setTitle] = useState('')
  const [addressInput, setAddressInput] = useState('')
  const [yearInput, setYearInput] = useState(1800)
  const [styleInput, setStyleInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [linksInput, setLinksInput] = useState([''])
  const [linkNamesInput, setLinkNamesInput] = useState([''])
  // TODO setup keeping track of which link is being changed

  const handleTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const handleAddress = (e: any) => {
    setAddressInput(e.target.value)
  }

  const handleStyle = (e: any) => {
    setStyleInput(e.target.value)
  }

  const handleYear = (e: any) => {
    setYearInput(e.target.value)
  }

  const handleDescription = (e: any) => {
    setDescriptionInput(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    console.log('Title:', title)
    console.log('Address:', addressInput)
    console.log('Year:', yearInput)
    console.log('Style:', styleInput)
    console.log('Description:', descriptionInput)
  }

  // runs whenever text gets changed, so whenever a different building modal is opened
  useEffect(() => {
    setIsFavorite(localStorage.getItem(name) === 'true')
  }, [name])

  useEffect(() => {
    setTitle(name)
    setAddressInput(address)
    setStyleInput(style)
    setYearInput(year)
    setDescriptionInput(description)
    setLinksInput(links)
    setLinkNamesInput(linkNames)
  }, [name, address, style, year, description, links, linkNames])

  const toggleFavorite = () => {
    localStorage.setItem(name, isFavorite ? 'false' : 'true')
    setIsFavorite(!isFavorite)
  }

  const addLinkField = () => {
    console.log('add link', linksInput)
    setLinksInput(linksInput.concat(''))
  }

  const displayElements = (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column' }}>
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
      </Container>
      <Container sx={{ float: 'left', display: 'flex' }}>
        <Container
          sx={{ display: 'flex', flexDirection: 'column' }}
          disableGutters
          className="text"
        >
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, float: 'left' }}
          >
            {description}
          </Typography>

          <div>
            <p>Additional Links:</p>
            <ul>
              {links.map((item, i) => (
                <li key={item}>
                  <a href={item} target="_blank" rel="noreferrer">
                    {linkNames[i]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        <img alt="error loading img" width="250" height="250" src={img} />
      </Container>

      <div />
      <button type="button" onClick={toggleFavorite} className="favorite">
        {isFavorite ? (
          <FontAwesomeIcon icon={HeartSolid} className="heartIcon" />
        ) : (
          <FontAwesomeIcon icon={HeartRegular} className="heartIcon" />
        )}
      </button>
    </>
  )

  const adminElements = (
    <>
      <form onSubmit={handleSubmit}>
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            className="field"
            error={title === ''}
            label="Title"
            onChange={handleTitle}
            defaultValue={name}
          />
          <TextField
            className="field"
            error={addressInput === ''}
            label="Address"
            onChange={handleAddress}
            defaultValue={address}
          />
          <TextField
            className="field"
            label="Year Founded"
            defaultValue={year}
            onChange={handleYear}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Founded:</InputAdornment>
              ),
            }}
          />
          <TextField
            className="field"
            label="Architectural Style"
            defaultValue={style}
            onChange={handleStyle}
          />
        </Container>
        <Container sx={{ float: 'left', display: 'flex' }}>
          <Container
            sx={{ display: 'flex', flexDirection: 'column' }}
            disableGutters
            className="text"
          >
            <TextField
              multiline
              className="field"
              label="Description"
              defaultValue={description}
              onChange={handleDescription}
            />

            <div>
              <p>Additional Links:</p>
              <ul>
                {linksInput.map((item, i) => (
                  <li key={item}>
                    <TextField
                      className="field"
                      label="URL"
                      defaultValue={item}
                    />
                    <TextField
                      className="field"
                      label="Link Title"
                      defaultValue={linkNamesInput[i]}
                    />
                  </li>
                ))}
                <Button variant="outlined" onClick={addLinkField}>
                  +
                </Button>
              </ul>
            </div>
          </Container>

          <img alt="error loading img" width="250" height="250" src={img} />
        </Container>
        <Button type="submit">Save</Button>
      </form>

      <div />
      <button type="button" onClick={toggleFavorite} className="favorite">
        {isFavorite ? (
          <FontAwesomeIcon icon={HeartSolid} className="heartIcon" />
        ) : (
          <FontAwesomeIcon icon={HeartRegular} className="heartIcon" />
        )}
      </button>
    </>
  )

  return (
    <Modal
      className="InfoModal"
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
      <Box sx={modalStyle} className="box">
        {window.location.href.includes('admin')
          ? adminElements
          : displayElements}
      </Box>
    </Modal>
  )
}

export default InfoModal
