import { Sheet, Switch, Typography } from "@mui/joy";
import UserModel from "../../../app/home/models/UserModel";
import { useContext } from "react";
import { HistoryContext } from "../../../app/home/context/HistoryContext";

interface UserCardProps {
  user: UserModel;
}

const UserCard = (props: UserCardProps) => {
  const { service, state } = useContext(HistoryContext);

  return (
    <Sheet>
      <Typography level="h3">{props.user.name}</Typography>
      <Typography level="body-md">email: {props.user.email}</Typography>

      <Typography
        component="label"
        endDecorator={
          <Switch
            sx={{ ml: 1 }}
            data-cy="toggle-tracking"
            checked={props.user?.history_tracking}
            onChange={() => service.toggleHistoryTracking(props.user)}
          />
        }
      >
        History Tracking
      </Typography>
    </Sheet>
  );
};

export default UserCard;
