import { Stack, Typography } from "@mui/joy";

interface HeaderProps {
  title: string;
  children?: any;
}

const Header = ({ children, title }: HeaderProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
      sx={{ borderRadius: 8 }}
    >
      <Typography level="h2">{title}</Typography>

      <Stack
        direction="row"
        justifyContent="end"
        alignItems="center"
        spacing={4}
        sx={{ borderRadius: 8, p: 1 }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default Header;
