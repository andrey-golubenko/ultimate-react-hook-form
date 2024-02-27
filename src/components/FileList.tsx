import { FC } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import { InsertDriveFile, DeleteForever } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { nanoid } from 'nanoid'
import { MAX_FILE_SIZE } from '@/constants'

interface IFilesList {
  files: File[]
  handleDelete?: (name: string) => void
}

const FilesList: FC<IFilesList> = ({ files, handleDelete }) => (
  <Paper variant="outlined">
    <List sx={{ margin: '1rem 0' }}>
      {!!files?.length &&
        files.map((file) => {
          const wrongFileSize = file?.size >= MAX_FILE_SIZE
          const fileSize = (file.size / 1024)?.toFixed(1) || 0

          return (
            <ListItem
              key={nanoid()}
              secondaryAction={
                handleDelete && (
                  <IconButton
                    onClick={() => handleDelete(file?.name)}
                    edge="end"
                    aria-label="delete"
                    color="error"
                  >
                    <DeleteForever fontSize="medium" />
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
                secondary={
                  <Typography component="p" sx={{ fontSize: '1.17rem' }}>
                    {`${fileSize} Mb `}
                    {wrongFileSize && (
                      <Typography
                        component="span"
                        sx={{ color: 'red', fontSize: '1.15rem' }}
                      >
                        - The file is too large
                      </Typography>
                    )}
                  </Typography>
                }
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '1.4rem',
                    marginBottom: '.8rem'
                  }
                }}
              />
            </ListItem>
          )
        })}
    </List>
  </Paper>
)

export default FilesList
