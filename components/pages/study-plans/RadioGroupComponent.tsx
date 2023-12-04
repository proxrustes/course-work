import { Box, FormControl, InputLabel, MenuItem, Select, Slider, Typography } from "@mui/material"
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
  }[filterState];

  const marks = [
    { value: 0, label: "Показати всі" },
    { value: 1, label: `Приховати ${title}` },
    { value: 2, label: `Тільки ${title}` }
  ];

  return (
    <FormControl size="small" fullWidth sx={{ mt: 2 }}>
      <InputLabel variant="outlined" id="demo-simple-select-label">
        {title}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filterValue}
        label={title}
        onChange={(event) => {
          const index = Number(event.target.value);
          const selectedValue = ["all", "not", "only"][index];
          dispatchFilter({
            type: actionType,
            payload: { [actionType]: selectedValue }
          });
        }}
      >
        {marks.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
