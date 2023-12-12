import { List, ListItem, IconButton, ListItemText } from "@mui/material";
import { user } from "@prisma/client";
import DeleteIcon from "@mui/icons-material/Delete";
import { plan_change } from "@/app/api/study-plan/[id]/changes/route";
import Cookies from "js-cookie"
export function PlanChanges(props: {
  changes: plan_change[];
  planId: number;
  user: user | null;
  fetchChanges: Function;
}) {
  function handleDelete(n: number) {
    fetch(`/api/plan-change/${n}`, {
      headers: {
        "Content-Type": "application/json",
        "token": Cookies.get("currentUser") ?? ''
      },
      method: "DELETE",
    }).then(() => {
      props.fetchChanges();
    });
  }

  return (
    <>
      <List>
        {props.changes.length > 0 &&
          props.changes.map((change) => (
            <ListItem
              secondaryAction={
                props.user?.access_level && props.user.access_level > 2 ? (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(change.change_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <></>
                )
              }
            >
              <ListItemText
                primary={change.change_description}
                secondary={`${
                  change.user.name
                }: ${change.change_date.toString()}`}
              />
            </ListItem>
          ))}
      </List>
    </>
  );
}
