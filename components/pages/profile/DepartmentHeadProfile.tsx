import { Stack, Button } from "@mui/material";

export function DepartmentHeadProfile(){
    return(
        <Stack>
        <Button href="/study-plans">Browse Study Plans</Button>
         <Button>Format study plan</Button>
        <Button>Approve changes</Button>
        </Stack>
      
    )
}