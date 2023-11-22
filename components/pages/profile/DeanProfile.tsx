import { Stack, Button } from "@mui/material";

export function DeanProfile(){
    return(
        <Stack>
        <Button href="/study-plans">Browse Study Plans</Button>
        <Button>Approve requested changes</Button>
        <Button>Add study plan</Button>
        </Stack>
      
    )
}