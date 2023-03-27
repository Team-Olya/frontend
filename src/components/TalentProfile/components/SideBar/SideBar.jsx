import { Box, Avatar, Typography, Chip } from "@mui/material";
import { Links } from "./components/Links";

function SideBar({talentInfo}) {

  return (
    <Box width={"30%"} paddingTop={"7vh"}>
      <Avatar
        src={talentInfo.avatar}
        alt={talentInfo.surname}
        sx={{ width: 256, height: 256, marginBottom: 2}}
      />
      {/* { //TODO: display smth when some field is not set} */}
      <Box>
        <Typography variant="h6" component="h6" sx={{fontSize: "24px"}}>
          {`${talentInfo.name} ${talentInfo.surname}`}
        </Typography>

        <Chip sx={{
          fontSize: "20px"
        }} label={talentInfo.kind} color="primary" size="medium" />

        <Typography variant="h6" component="h6" mt={2} sx={{fontSize: "18px", color: "#888888"}}>
          {talentInfo.location}
        </Typography>

        <Typography variant="h6" component="h6" sx={{fontSize: "18px", color: "#888888"}}>
          {`${talentInfo.experience || "0"} year experience`}
        </Typography>

        <Typography variant="h6" component="h6" sx={{fontSize: "18px", color: "#888888"}}>
          {talentInfo.email} 
        </Typography>

        <Links talentLinks={talentInfo.links} />
      </Box>
    </Box>
  )
}

export { SideBar };