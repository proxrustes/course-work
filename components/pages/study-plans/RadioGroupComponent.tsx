import { Box, Slider, Typography } from "@mui/material"
import { ACTIONS, SetFilterAction } from "./FilterMenu"

interface RadioGroupComponentProps {
    title: string
    actionType: keyof typeof ACTIONS
    filterState: "all" | "not" | "only"
    dispatchFilter: React.Dispatch<SetFilterAction>
}
  
  export function RadioGroupComponent({
    title,
    actionType,
    filterState,
    dispatchFilter
  }: RadioGroupComponentProps) {
    const filterValue = {
      all: 0,
      not: 1,
      only: 2
    }[filterState]
  
    const marks = [
      { value: 0, label: "Show All" },
      { value: 1, label: `Hide ${title}` },
      { value: 2, label: `${title} Only` }
    ]
  
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography sx={{ fontWeight: 600, mt: 2 }}>{title}</Typography>
        <Slider
          aria-labelledby="demo-slider-label"
          defaultValue={filterValue}
          value={filterValue}
          step={null}
          marks={marks}
          min={0}
          max={2}
          sx={{
            width: 250,
            "& .MuiSlider-markLabel": {
              fontSize: 12,
              width: "min-width",
              fontWeight: "normal",
              whiteSpace: "normal",
              textAlign: "center"
            }
          }}
          onChange={(event, newValue) => {
            const selectedValue = ["all", "not", "only"][newValue as number]
            dispatchFilter({
              type: actionType,
              payload: { [actionType]: selectedValue }
            })
          }}
        />
      </Box>
    )
  }