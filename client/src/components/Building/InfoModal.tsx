import { faHeart as HeartRegular } from '@fortawesome/free-regular-svg-icons'
import {
  faXmark as CloseIcon,
  faHeart as HeartSolid,
  faTrash as TrashIcon,
} from '@fortawesome/free-solid-svg-icons'
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
  deleteLocation: any
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
  deleteLocation,
}: ModalProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [title, setTitle] = useState('')
  const [addressInput, setAddressInput] = useState('')
  const [yearInput, setYearInput] = useState(1800)
  const [styleInput, setStyleInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [linksInput, setLinksInput] = useState([''])
  const [linksIDs, setLinksIDs] = useState([0])
  const [errorMessage, setErrorMessage] = useState('')

  const handleTitle = (e: any) => {
    setTitle(e.target.value)
    setErrorMessage('')
  }

  const handleAddress = (e: any) => {
    setAddressInput(e.target.value)
    setErrorMessage('')
  }

  const handleStyle = (e: any) => {
    setStyleInput(e.target.value)
    setErrorMessage('')
  }

  const handleYear = (e: any) => {
    if (e.target.value === '') setYearInput(Number.NaN)
    else {
      setYearInput(Number(e.target.value))
    }

    setErrorMessage('')
  }

  const handleDescription = (e: any) => {
    setDescriptionInput(e.target.value)
    setErrorMessage('')
  }

  const handleImageURL = (e: any) => {
    setImageURL(e.target.value)
    setErrorMessage('')
  }

  const handleLinkURL = (e: any, i: number) => {
    const updatedLinks = [...linksInput]
    updatedLinks[i] = e.target.value
    setLinksInput(updatedLinks)
  }

  const deleteURL = (i: number) => {
    console.log('index', i)

    // filters out link to be deleted by index
    setLinksInput([...linksInput].filter((_link, j) => i !== j))
    setLinksIDs([...linksIDs].filter((_link, j) => i !== j))
  }

  const handleDeleteLocation = () => {
    deleteLocation(name)
    // TODO confirm delete
    handleClose()
  }

  const hasErrors = () => {
    if (
      title === '' ||
      addressInput === '' ||
      styleInput === '' ||
      descriptionInput === '' ||
      imageURL === ''
    ) {
      setErrorMessage('Enter information into all fields')
      return true
    }

    if (Number.isNaN(yearInput) || yearInput > 1930 || yearInput < 1820) {
      setErrorMessage('Enter a valid year between 1820 and 1930 inclusive')
      return true
    }

    return false
  }

  // placeholder until API set up
  const handleSubmit = (e: any) => {
    e.preventDefault()

    console.log('Title:', title)
    console.log('Address:', addressInput)
    console.log('Year:', yearInput)
    console.log('Style:', styleInput)
    console.log('Description:', descriptionInput)
    console.log('Image link:', imageURL)
    console.log('Links:', linksInput)
    console.log('Link IDs:', linksIDs)

    if (hasErrors()) return

    // TODO close if backend confirms successful change
    handleClose()
  }

  const handleCancel = () => {
    handleClose()
  }

  // runs whenever text gets changed, so whenever a different building modal is opened
  useEffect(() => {
    setIsFavorite(localStorage.getItem(name) === 'true')
  }, [name])

  useEffect(() => {
    setTitle(name)
    setAddressInput(address)
    setStyleInput(style)
    setYearInput(Number(year))
    setDescriptionInput(description)
    setImageURL(img)
    setLinksInput(links)
    setLinksIDs(links.map(() => Math.round(Math.random() * 100)))
  }, [name, address, style, year, description, links, img])

  const toggleFavorite = () => {
    localStorage.setItem(name, isFavorite ? 'false' : 'true')
    setIsFavorite(!isFavorite)
  }

  const addLinkField = () => {
    // adds empty link url & creates an ID for the key in the ul list
    setLinksInput(linksInput.concat(''))
    const newIDs = [...linksIDs, Math.round(Math.random() * 100)]
    setLinksIDs(newIDs)
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
      <button type="button" onClick={toggleFavorite} className="favorite icon">
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
            error={
              yearInput > 1930 || yearInput < 1820 || Number.isNaN(yearInput)
            }
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
          <TextField
            multiline
            className="field"
            label="Description"
            defaultValue={description}
            onChange={handleDescription}
          />
          <TextField
            label="Image URL"
            className="field"
            defaultValue={img}
            onChange={handleImageURL}
          />
        </Container>
        <Container sx={{ display: 'flex' }}>
          <Container
            sx={{ display: 'flex', flexDirection: 'column' }}
            disableGutters
            className="text"
          >
            <div>
              <p>Additional Links:</p>
              {linksInput.map((item, i) => (
                <div key={linksIDs[i]}>
                  <div className="urlContainer">
                    <TextField
                      className="field"
                      label="URL"
                      defaultValue={item}
                      onChange={(e) => handleLinkURL(e, i)}
                    />
                    <button
                      onClick={() => deleteURL(i)}
                      type="button"
                      className="icon"
                    >
                      <FontAwesomeIcon icon={TrashIcon} className="trashIcon" />
                    </button>
                  </div>
                </div>
              ))}
              <Button variant="outlined" onClick={addLinkField}>
                Add Link
              </Button>
            </div>
            <div className="errorMessage">{errorMessage}</div>
            <div className="buttonContainer">
              <Button type="button" variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" className="saveButton">
                Save
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="error"
                className="deleteButton"
                onClick={handleDeleteLocation}
              >
                Delete location
              </Button>
            </div>
          </Container>

          <img alt="error loading img" width="250" height="250" src={img} />
        </Container>
      </form>

      <div />
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
        <div className="closeContainer">
          <button type="button" className="close icon" onClick={handleCancel}>
            <FontAwesomeIcon icon={CloseIcon} className="closeIcon" />
          </button>
        </div>
        {window.location.href.includes('admin')
          ? adminElements
          : displayElements}
      </Box>
    </Modal>
  )
}

export default InfoModal
