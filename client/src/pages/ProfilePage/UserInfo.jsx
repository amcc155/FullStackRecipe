import { Box, Avatar, Typography} from "@mui/material"

const UserInfo = ({user})=>{

   return(

   
   <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mt: 2,
              }}
            >
              {user?.username[0]}
            </Avatar>

            <Typography variant="h2">{user?.username}</Typography>
            <Typography>Date Joined: Date</Typography>
          </Box>
   )
   }
export default UserInfo