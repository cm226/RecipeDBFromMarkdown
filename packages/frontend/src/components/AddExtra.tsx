import TextField from "@mui/material/TextField";

export interface AddExtraProps {
  onNewItem: (name: string) => void;
}

export function AddExtra(props: AddExtraProps) {
  return (
    <TextField
      id="standard-basic"
      label="Extras"
      variant="standard"
      onKeyDown={(ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
          const target = ev.target as HTMLInputElement;
          props.onNewItem(target.value);
          target.value = "";
        }
      }}
    />
  );
}
