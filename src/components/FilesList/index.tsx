import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import DeleteIcon from '@mui/icons-material/Delete'
import { InsertDriveFile } from '@mui/icons-material'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'

interface IFilesList {
  files: File[]
  handleDelete?: (name: string) => void
}

const FilesList: FC<IFilesList> = ({ files, handleDelete }) => (
  <List sx={{ marginBottom: '3.5rem' }}>
    {!!files?.length &&
      files.map((file) => (
        <ListItem
          key={file?.name}
          secondaryAction={
            handleDelete && (
              <IconButton onClick={() => handleDelete(file?.name)} edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            )
          }
        >
          <ListItemAvatar>
            <Avatar>
              <InsertDriveFile />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={file?.name}
            secondary={`${file?.size} Mb`}
            sx={{
              '& .MuiListItemText-primary': {
                fontSize: '1.4rem',
                marginBottom: '.8rem'
              },
              '& .MuiListItemText-secondary': {
                fontSize: '1.15rem'
              }
            }}
          />
        </ListItem>
      ))}
  </List>
)

export default FilesList
