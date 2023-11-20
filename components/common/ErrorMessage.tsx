import { Box, Typography } from "@mui/material"

interface Props {
  errorCode: number
  errorText: string
}

export function ErrorMessage(props: Props) {
  return (
    <Box
      sx={{
        my: 30
      }}
      textAlign="center"
    >
      <Typography variant="h3" color="primary">
        {props.errorCode}
      </Typography>
      <Typography variant="h6" color="primary">
        ( {props.errorText} )
      </Typography>
    </Box>
  )
}
