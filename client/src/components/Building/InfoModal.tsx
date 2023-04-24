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
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import to from 'await-to-js'
import { useEffect, useState } from 'react'

import { getLikes, like, removeLike } from 'api/buildingsApi'

import '../../styles/InfoModal.css'
import paper from '../../assets/paper.png'

type ModalProps = {
  name: string
  address: string
  description: string
  img: string
  year: number
  _id: string
  style: string
  links: string[]
  linkNames: string[]
  open: boolean
  handleClose: () => void
  deleteLocation: any
  updateLocation: any
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
  _id,
  open,
  handleClose,
  deleteLocation,
  updateLocation,
}: ModalProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(0)
  // #region editing fields states
  const [title, setTitle] = useState('')
  const [addressInput, setAddressInput] = useState('')
  const [yearInput, setYearInput] = useState(1800)
  const [styleInput, setStyleInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [linksInput, setLinksInput] = useState([''])
  const [linksIDs, setLinksIDs] = useState([0])
  const [errorMessage, setErrorMessage] = useState('')
  // #endregion
  const [likes, setLikes] = useState(0)

  // #region field onChange handlers
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
    setErrorMessage('')
  }

  // #endregion

  const deleteURL = (i: number) => {
    // console.log('index', i)

    // filters out link to be deleted by index
    setLinksInput([...linksInput].filter((_link, j) => i !== j))
    setLinksIDs([...linksIDs].filter((_link, j) => i !== j))
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

    for (let i = 0; i < linksInput.length; i += 1) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const url = new URL(linksInput[i])
        // console.log('url', url)
      } catch (err) {
        setErrorMessage(
          'Enter a valid URL into each field or delete unused ones'
        )
        return true
      }
    }

    if (Number.isNaN(yearInput) || yearInput > 1930 || yearInput < 1820) {
      setErrorMessage('Enter a valid year between 1820 and 1930 inclusive')
      return true
    }

    return false
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const buildingUpdate: BuildingUpdate = {
      name: title,
      address: addressInput,
      foundingYear: yearInput,
      archiStyle: styleInput,
      description: descriptionInput,
      img: imageURL,
      additionalLinks: linksInput,
    }

    if (hasErrors()) return

    updateLocation(_id, buildingUpdate)
    closeModal()
  }

  const handleDeleteLocation = async () => {
    if (confirmDelete === 0) {
      setConfirmDelete(1)
      return
    }

    deleteLocation(_id, name)
    closeModal()
  }

  const closeModal = () => {
    handleClose()
    setConfirmDelete(0)
    setErrorMessage('')
  }

  // runs whenever text gets changed, so whenever a different building modal is opened
  useEffect(() => {
    setIsFavorite(localStorage.getItem(name) === 'true')
  }, [name])

  useEffect(() => {
    const handleLikes = async () => {
      if (_id === '') return

      try {
        const [err, response] = await to(getLikes(_id))
        if (err) {
          console.log(err)
          return
        }

        if (response && response.data.likes !== undefined) {
          const newLikes = response.data.likes
          setLikes(newLikes)
        }
      } catch (error) {
        console.log(error)
      }
    }

    handleLikes()
  }, [_id])

  useEffect(() => {
    setTitle(name)
    setAddressInput(address)
    setStyleInput(style)
    setYearInput(Number(year))
    setDescriptionInput(description)
    setImageURL(img)
    setLinksInput(links)
    setLinksIDs(links.map(() => Math.round(Math.random() * 100)))
    setErrorMessage('')
    setConfirmDelete(0)
  }, [name, address, style, year, description, links, img, open])

  const toggleFavorite = async () => {
    localStorage.setItem(name, isFavorite ? 'false' : 'true')
    if (!isFavorite) {
      const [err] = await to(like(_id))
      if (err) {
        console.log(err)
        return
      }
      setLikes(likes + 1)
    } else {
      const [err] = await to(removeLike(_id))
      if (err) {
        console.log(err)
        return
      }
      setLikes(likes - 1)
    }
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
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
      <Container sx={{ display: 'flex' }} className="info">
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

          {links.length > 0 && (
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
          )}
        </Container>

        <img alt="error loading img" src={img} />
      </Container>
      <div />
      <IconButton type="button" onClick={toggleFavorite} className="favorite">
        {isFavorite ? (
          <FontAwesomeIcon icon={HeartSolid} className="heartIcon" />
        ) : (
          <FontAwesomeIcon icon={HeartRegular} className="heartIcon" />
        )}
      </IconButton>
      {likes}
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
            error={styleInput === ''}
          />
          <TextField
            multiline
            className="field"
            label="Description"
            defaultValue={description}
            onChange={handleDescription}
            error={descriptionInput === ''}
          />
          <TextField
            label="Image URL"
            className="field"
            defaultValue={img}
            onChange={handleImageURL}
            error={imageURL === ''}
          />
        </Container>
        <Container sx={{ display: 'flex' }} className="info">
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
                      error={linksInput[i] === ''}
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
              <Button type="button" variant="outlined" onClick={closeModal}>
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
                {confirmDelete === 0
                  ? 'Delete location'
                  : 'Click again to confirm'}
              </Button>
            </div>
          </Container>

          <img alt="error loading img" src={img} />
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
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle} className="box">
        <div className="closeContainer">
          <button type="button" className="close icon" onClick={closeModal}>
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
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  background: `url(${paper}) no-repeat center center`,
  backgroundSize: 'cover',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default InfoModal
